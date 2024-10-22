
import * as prompts from "langchain/hub";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import dotenv from "dotenv";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { Runnable } from "@langchain/core/runnables"; 
import { Client } from "langsmith"; 
dotenv.config();
// const API_KEY = process.env.LANGCHAIN_API_KEY;
const API_KEY = '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';
console.log(API_KEY)
const client = new Client({ apiKey: API_KEY });
// gemini model
const model = new ChatGoogleGenerativeAI({
    model: "gemini-pro",
    maxOutputTokens: 2048,
    apiKey: "AIzaSyClqHJyabNAO-KWqtY34WoM62Xyn_rhkNw",
  });
// 1. Define and push the prompt with a model to LangChain Hub
const promptWithModel = ChatPromptTemplate.fromTemplate("tell me a joke about {topic}");
const chainWithModel = promptWithModel.pipe(model);

// const prompt = ChatPromptTemplate.fromTemplate("tell me cricket history about {topic}");

async function pushPromptWithModel() {
    try {
        const url = await prompts.push("joke-generator-with-model",{ prompt: promptWithModel, model: model }, { apiKey: API_KEY });
        console.log("Prompt with model pushed successfully. View it here:", url);
    } catch (error) {
        console.error("Error pushing the prompt with model:", error);
    }
}
// 2. Define and push a separate prompt without a model to LangChain Hub
const promptWithoutModel = ChatPromptTemplate.fromTemplate("tell me cricket history about {topic}");

async function pushPromptWithoutModel() {
    try {
        const url = await prompts.push("cricket-expert-without-model", promptWithoutModel, { apiKey: API_KEY });
        console.log("Prompt without model pushed successfully. View it here:", url);
    } catch (error) {
        console.error("Error pushing the prompt without model:", error);
    }
}

// 3. Pull and invoke a prompt with a model from LangChain Hub
async function invokePromptWithModel() {
    try {
        const promptId = "cricket-expert-without-model"; // ID for prompt without model
        const commitId = "27ed54d8"; // Commit ID to pull specific version

        // Pull the prompt
        const prompt = await prompts.pull(promptId, { commitId,apiKey: API_KEY });
        
        // Ensure the prompt is a Runnable or similar type that supports invocation
        if (prompt instanceof Runnable) {
            const result = await prompt.invoke({ topic: "cats" });
            console.log("Result from invoked prompt with model:", result);
        } else {
            console.error("Retrieved object is not a Runnable instance:", prompt);
        }
    } catch (error) {
        console.error("Error invoking the prompt with model:", error);
    }
}
async function listAllPrompts() {
    try {
        const prompts = client.listPrompts();
        for await (const prompt of prompts) {
            console.log(prompt);
        }
    } catch (error) {
        console.error("Error listing prompts:", error);
    }
}
// 5. List private prompts that include "joke"
async function listPrivateJokePrompts() {
    try {
        const privateJokePrompts = client.listPrompts({
            query: "joke",
            isPublic: false,
        });
        for await (const prompt of privateJokePrompts) {
            console.log("Private joke prompt:", prompt);
        }
    } catch (error) {
        console.error("Error listing private joke prompts:", error);
    }
}

// 6. Delete a prompt
async function deletePrompt(promptId) {
    try {
        await client.deletePrompt(promptId);
        console.log(`Prompt ${promptId} deleted successfully.`);
    } catch (error) {
        console.error(`Error deleting prompt ${promptId}:`, error);
    }
}

// 7. Like a prompt
async function likePrompt(promptId) {
    try {
        await client.likePrompt(promptId);
        console.log(`Prompt ${promptId} liked successfully.`);
    } catch (error) {
        console.error(`Error liking prompt ${promptId}:`, error);
    }
}

// 8. Unlike a prompt
async function unlikePrompt(promptId) {
    try {
        await client.unlikePrompt(promptId);
        console.log(`Prompt ${promptId} unliked successfully.`);
    } catch (error) {
        console.error(`Error unliking prompt ${promptId}:`, error);
    }
}

// Execute the functions
(async () => {
    // await pushPromptWithModel();
    // await pushPromptWithoutModel();
    // await invokePromptWithModel();
    // await listAllPrompts();
    // await listPrivateJokePrompts();
    // await deletePrompt("joke-generator");
    await likePrompt("cricket-expert-without-model");
    // await unlikePrompt("efriis/my-first-prompt");
})();