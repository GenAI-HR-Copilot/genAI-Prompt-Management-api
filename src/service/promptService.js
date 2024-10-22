import Prompts from "../model/Prompts.js";
import PromptChangeHistory from "../model/PromptChangeHistory.js";

import fs from "fs";
import path from "path";
import * as Minio from "minio";
import { config } from "../config/config.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Create a path to the new 'files' folder
const filesDir = path.join(__dirname, '..', 'files');

// Ensure the 'files' directory exists
if (!fs.existsSync(filesDir)) {
  fs.mkdirSync(filesDir, { recursive: true });
}
const bucketConfig = config.cloudeConfig;
class promptService {
  static async createPrompt(promptData) {
    console.log(promptData);
    try {
      const prompt = await Prompts.create(promptData);

      // Store in MinIO
      const bucketName = "prompt-management";
      const objectName = `prompt_${prompt.id}.json`;
      const jsonString = JSON.stringify(promptData, null, 2);
      console.log("JSON String:", jsonString);

      // Create temporary file path
      // const tempFilePath = path.join(__dirname, `temp_${prompt.id}.json`);
// Create file path in the 'files' directory
const filePath = path.join(filesDir, `temp_${prompt.id}.json`);

      // Write JSON data to the temporary file
      fs.writeFileSync(filePath, jsonString);
      console.log(`Temporary file created at: ${filePath}`);

      // Convert file to buffer for MinIO upload
      const fileBuffer = fs.readFileSync(filePath);
      console.log(`File buffer size: ${fileBuffer.length} bytes`);

      const minioClient = new Minio.Client(bucketConfig);

      // Check if bucket exists, create if it doesn't
      const bucketExists = await minioClient.bucketExists(bucketName);
      if (!bucketExists) {
        console.log(`Bucket ${bucketName} does not exist. Creating...`);
        await minioClient.makeBucket(bucketName);
        console.log(`Bucket ${bucketName} created successfully.`);
      }

      // Store object in MinIO
      console.log(
        `Attempting to store object ${objectName} in bucket ${bucketName}`
      );

      try {
        const response = await minioClient.putObject(
          bucketName,
          objectName,
          fileBuffer,
          {
            "Content-Type": "application/json",
          }
        );
        console.log("Upload response:", response);
 // Optional: Delete the temporary file after successful upload
//  fs.unlinkSync(filePath);
//  console.log(`Temporary file deleted: ${filePath}`);
        // Check if response has an etag, which indicates success
        if (!response.etag) {
          throw new Error("Failed to upload file. No etag returned.");
        }
        console.log(`Object ${objectName} stored successfully in MinIO`);
      } catch (uploadError) {
        console.error("Upload error:", uploadError);
        throw new Error(
          `Failed to upload file to MinIO: ${uploadError.message}`
        );
      }

      console.log(prompt);
      return prompt;
    } catch (error) {
      console.error("Error:", error);
      throw new Error(`Failed to create prompt: ${error.message}`);
    }
  }
  static async getPromptById(id) {
    try {
      const prompt = await Prompts.findByPk(id);

      if (!prompt) {
        throw new Error(`Prompt with id ${id} not found`);
      }

      return prompt;
    } catch (error) {
      console.log(error);
      throw new Error(`Failed to retrieve prompt: ${error.message}`);
    }
  }

  static async getAllPrompts() {
    try {
      const prompts = await Prompts.findAll();
      return prompts;
    } catch (error) {
      console.log(error);
      throw new Error(`Failed to retrieve prompts: ${error.message}`);
    }
  }
  static async updatePrompt(id, updateData) {
    try {
      console.log("updateData", updateData);
      console.log("id", id);
      const prompt = await Prompts.findByPk(id);
      console.log(prompt);
      if (!prompt) {
        throw new Error(`Prompt with id ${id} not found`);
      }

      const oldValues = prompt.toJSON();

      const updatedPrompt = await prompt.update(updateData);

      const newValues = updatedPrompt.toJSON();
      console.log(updatedPrompt);
      await PromptChangeHistory.create({
        promptId: id,
        changedBy: updateData.updated_by,
        changeType: "update",
        oldValue: oldValues,
        newValue: newValues,
        createdAt: new Date(),
      });
      return updatedPrompt;
    } catch (error) {
      console.log(error);
      throw new Error(`Failed to update prompt: ${error.message}`);
    }
  }
  static async getEditHistory(promptId) {
    try {
      const history = await PromptChangeHistory.findAll({
        where: { promptId },
        order: [["createdAt", "DESC"]],
      });

      if (!history || history.length === 0) {
        throw new Error(`No edit history found for prompt with id ${promptId}`);
      }

      return history;
    } catch (error) {
      console.log(error);
      throw new Error(`Failed to retrieve edit history: ${error.message}`);
    }
  }
}

export default promptService;
