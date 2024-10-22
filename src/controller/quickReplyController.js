// quickReplyController.js
import quickReplyService from '../service/quickReplyService.js';
import ResponseHandler from "../utils/responseHandler.js";

class QuickReplyController {
  static async createTemplate(req, res) {
    const { title, description } = req.body;
    try {
      const data = await quickReplyService.createTemplate({ title, description });
      await ResponseHandler.handelServerDataCreated(res, data);
    } catch (error) {
      console.error('Error creating template:', error);
      await ResponseHandler.handelDataInvalid(res, error.message);
    }
  }

  static async getAllTemplates(req, res) {
    try {
      const data = await quickReplyService.getAllTemplates();
      if (data && data.length > 0) {
        await ResponseHandler.handelServerDataGet(res, data);
      } else {
        await ResponseHandler.handelDataNotFound(res);
      }
    } catch (error) {
      console.error('Error fetching templates:', error);
      await ResponseHandler.handelDataInvalid(res, error.message);
    }
  }

  static async updateTemplate(req, res) {
    const { id } = req.params;
    const { title, description } = req.body;
    try {
      const updatedTemplate = await quickReplyService.updateTemplate(id, { title, description });
      await ResponseHandler.handelServerDataCreated(res, updatedTemplate);
    } catch (error) {
      console.error('Error updating template:', error);
      await ResponseHandler.handelDataInvalid(res, error.message);
    }
  }

  static async deleteTemplate(req, res) {
    const { id } = req.params;
    try {
      const deletedTemplate = await quickReplyService.deleteTemplate(id);
      await ResponseHandler.handelServerDataGet(res, deletedTemplate);
    } catch (error) {
      console.error('Error deleting template:', error);
      await ResponseHandler.handelDataInvalid(res, error.message);
    }
  }

  static async getTemplateById(req, res) {
    const { id } = req.params;
    try {
      const template = await quickReplyService.getTemplateById(id);
      await ResponseHandler.handelServerDataGet(res, template);
    } catch (error) {
      console.error('Error fetching template by ID:', error);
      await ResponseHandler.handelDataInvalid(res, error.message);
    }
  }

  static async addOptionToTemplate(req, res) {
    const { templateId } = req.params;
    const { options } = req.body;
  
    try {
      const template = await quickReplyService.getTemplateById(templateId);
      if (!template) {
        throw new Error(`Template with id ${templateId} not found`);
      }
  
      const existingOptions = template.QuickReplyOptions || [];
      let currentOrderIndex = existingOptions.length;
  
      const newOptions = await Promise.all(
        options.map(async (optionData) => {
          const { text, payload, orderIndex } = optionData;
  
          // Use provided orderIndex or calculate the next one
          const calculatedOrderIndex = orderIndex || ++currentOrderIndex;
  
          const newOption = await quickReplyService.addOptionToTemplate(templateId, {
            text,
            payload,
            orderIndex: calculatedOrderIndex,
          });
  
          return newOption;
        })
      );
  
      await ResponseHandler.handelServerDataCreated(res, newOptions);
    } catch (error) {
      console.error('Error adding option to template:', error);
      await ResponseHandler.handelDataInvalid(res, error.message);
    }
  }
  

  static async updateOption(req, res) {
    const { templateId } = req.params; // The ID of the template containing the options
    const { optionData } = req.body; // Array of options to update or create
  
    try {
        if (!templateId) {
            throw new Error("Template ID is required");
        }

        // Convert templateId to a number if it's a string
        const templateIdNumber = Number(templateId);
        if (isNaN(templateIdNumber)) {
            throw new Error("Invalid Template ID");
        }
      if (!optionData || !Array.isArray(optionData) || optionData.length === 0) {
        throw new Error("Option data is required to update options");
      }
  
      // Fetch existing options for the template
      const existingOptions = await quickReplyService.getOptionsByTemplateId(templateIdNumber);
  
      const updatedOptions = [];
  
      for (let i = 0; i < optionData.length; i++) {
        const data = optionData[i];
        const existingOption = existingOptions[i];
  
        if (existingOption) {
          // Update existing option
          const updatedOption = await quickReplyService.updateOption(existingOption.id, {
            text: data.text,
            payload: data.payload,
            orderIndex: i + 1 // Update order based on array index
          });
          updatedOptions.push(updatedOption);
        } else {
          // Create new option
          const newOption = await quickReplyService.addOptionToTemplate(templateId, {
            text: data.text,
            payload: data.payload,
            orderIndex: i + 1
          });
          updatedOptions.push(newOption);
        }
      }
  
      // If there are more existing options than provided in the payload, delete the excess
      if (existingOptions.length > optionData.length) {
        for (let i = optionData.length; i < existingOptions.length; i++) {
          await quickReplyService.deleteOption(existingOptions[i].id);
        }
      }
  
      // Fetch the updated template with all options
      const updatedTemplate = await quickReplyService.getTemplateById(templateId);
  
      await ResponseHandler.handelServerDataCreated(res, {
        template: updatedTemplate,
        updatedOptions: updatedOptions
      });
    } catch (error) {
      console.error('Error updating options:', error);
      await ResponseHandler.handelDataInvalid(res, error.message);
    }
  }


  static async deleteOption(req, res) {
    const { id } = req.params;
    try {
      const deletedOption = await quickReplyService.deleteOption(id);
      await ResponseHandler.handelServerDataGet(res, deletedOption);
    } catch (error) {
      console.error('Error deleting option:', error);
      await ResponseHandler.handelDataInvalid(res, error.message);
    }
  }
}

export default QuickReplyController;