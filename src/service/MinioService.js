import * as Minio from "minio";
import { config } from "../config/config.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filesDir = path.join(__dirname, '..', 'files');

class MinioService {
  constructor() {
    this.minioClient = new Minio.Client(config.cloudeConfig);
    this.bucketName = "prompt-management";
  }

  async getJsonFile(objectName) {
    try {
      const dataStream = await this.minioClient.getObject(this.bucketName, objectName);
      return new Promise((resolve, reject) => {
        let fileContent = '';
        dataStream.on('data', chunk => fileContent += chunk.toString());
        dataStream.on('end', () => resolve(JSON.parse(fileContent)));
        dataStream.on('error', reject);
      });
    } catch (error) {
      console.error("Error getting JSON file:", error);
      throw error;
    }
  }

  async updateJsonFile(objectName, jsonData) {
    try {
      const tempFilePath = path.join(filesDir, `temp_${objectName}`);
      const jsonString = JSON.stringify(jsonData, null, 2);
      fs.writeFileSync(tempFilePath, jsonString);

      await this.minioClient.fPutObject(this.bucketName, objectName, tempFilePath, {
        'Content-Type': 'application/json',
      });

      fs.unlinkSync(tempFilePath);
      return true;
    } catch (error) {
      console.error("Error updating JSON file:", error);
      throw error;
    }
  }

  async deleteJsonFile(objectName) {
    try {
      await this.minioClient.removeObject(this.bucketName, objectName);
      return true;
    } catch (error) {
      console.error("Error deleting JSON file:", error);
      throw error;
    }
  }

  async listJsonFiles() {
    try {
      const objectsList = await this.minioClient.listObjects(this.bucketName, '', true);
      return new Promise((resolve, reject) => {
        const objects = [];
        objectsList.on('data', obj => objects.push(obj));
        objectsList.on('end', () => resolve(objects));
        objectsList.on('error', reject);
      });
    } catch (error) {
      console.error("Error listing JSON files:", error);
      throw error;
    }
  }
}

export default new MinioService();