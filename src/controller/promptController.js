import promptService from "../service/promptService.js";
import ResponseHandler from "../utils/responseHandler.js";

class PromptController {
  static async createPrompt(req, res) {
    const {
      name,
      description,
      type,
      status,
      domain,
      subdomain,
      context_setting,
      task_description,
      input_variables,
      output_instructions,
      constraints,
      business_process,
      target_audience,
      complexity_level,
      tags,
      collections,
    } = req.body;
    
    const content = {
      context_setting,
      task_description,
      input_variables,
      output_instructions,
      constraints,
    };
    const metadata = {
      tags,
      collections,
    };
    const staticUserId = 1;
    const promptData = {
      name,
      description,
      type,
      status: status || "draft",
      content,
      metadata,
      domain,
      subdomain,
      business_process,
      target_audience,
      complexity_level: parseInt(complexity_level, 10),
      created_by: staticUserId,
      updated_by: staticUserId,
    };
    
    try {
      const data = await promptService.createPrompt(promptData);
      console.log(data);
      await ResponseHandler.handelServerDataCreated(res, data);
    } catch (error) {
      console.error("Error creating prompt:", error);
      await ResponseHandler.handelDataInvalid(res, error.message);
    }
  }

  static async getAllPrompts(req, res) {
    try {
      const data = await promptService.getAllPrompts();
      if (data && data.length > 0) {
        await ResponseHandler.handelServerDataGet(res, data);
      } else {
        await ResponseHandler.handelDataNotFound(res);
      }
    } catch (error) {
      console.error("Error fetching prompts:", error);
      await ResponseHandler.handelDataInvalid(res, error.message);
    }
  }

  static async updatePrompt(req, res) {
    const { id } = req.params;
    const {
      name,
      description,
      type,
      status,
      domain,
      subdomain,
      context_setting,
      task_description,
      input_variables,
      output_instructions,
      constraints,
      business_process,
      target_audience,
      complexity_level,
      tags,
      collections,
    } = req.body;

    const content = {
      context_setting,
      task_description,
      input_variables,
      output_instructions,
      constraints,
    };
    const metadata = {
      tags,
      collections,
    };
    const staticUserId = 1;

    const updateData = {
      name,
      description,
      type,
      status,
      content,
      metadata,
      domain,
      subdomain,
      business_process,
      target_audience,
      complexity_level: parseInt(complexity_level, 10),
      updated_by: staticUserId,
    };

    try {
      const updatedPrompt = await promptService.updatePrompt(id, updateData);
      if (updatedPrompt) {
        await ResponseHandler.handelServerDataCreated(res, updatedPrompt);
      } else {
        await ResponseHandler.handelDataNotFound(res);
      }
    } catch (error) {
      console.error("Error updating prompt:", error);
      await ResponseHandler.handelDataInvalid(res, error.message);
    }
  }

  static async deletePrompt(req, res) {
    // Implementation here
  }

  static async getEditHistoryById(req, res) {
    const { id } = req.params;
    try {
      const prompt = await promptService.getEditHistory(id);
      if (prompt) {
        await ResponseHandler.handelServerDataGet(res, prompt);
      } else {
        await ResponseHandler.handelDataNotFound(res);
      }
    } catch (error) {
      console.log("Error is", error);
    }
  }

  static async getPromptById(req, res) {
    const { id } = req.params;

    try {
      const prompt = await promptService.getPromptById(id);
      if (prompt) {
        await ResponseHandler.handelServerDataGet(res, prompt);
      } else {
        await ResponseHandler.handelDataNotFound(res);
      }
    } catch (error) {
      console.error("Error fetching prompt by ID:", error);
      await ResponseHandler.handelDataInvalid(res, error.message);
    }
  }
}

export default PromptController;
