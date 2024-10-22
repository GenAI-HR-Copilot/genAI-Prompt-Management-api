// QuickReplyService.js
import { QuickReplyTemplate, QuickReplyOption } from "../model/associations.js";

class QuickReplyService {
  static async createTemplate(templateData) {
    try {
      const template = await QuickReplyTemplate.create(templateData);
      return template;
    } catch (error) {
      console.error("Failed to create template:", error);
      throw new Error(`Failed to create template: ${error.message}`);
    }
  }

  static async getAllTemplates() {
    try {
      const templates = await QuickReplyTemplate.findAll({
        include: [{ model: QuickReplyOption, order: [["orderIndex", "ASC"]] }],
      });
      return templates;
    } catch (error) {
      console.error("Failed to retrieve templates:", error);
      throw new Error(`Failed to retrieve templates: ${error.message}`);
    }
  }

  static async updateTemplate(id, updateData) {
    try {
      const template = await QuickReplyTemplate.findByPk(id);
      if (!template) {
        throw new Error(`Template with id ${id} not found`);
      }
      const updatedTemplate = await template.update(updateData);
      return updatedTemplate;
    } catch (error) {
      console.error("Failed to update template:", error);
      throw new Error(`Failed to update template: ${error.message}`);
    }
  }

  static async deleteTemplate(id) {
    try {
      const template = await QuickReplyTemplate.findByPk(id);
      if (!template) {
        throw new Error(`Template with id ${id} not found`);
      }
      await template.destroy();
      return template;
    } catch (error) {
      console.error("Failed to delete template:", error);
      throw new Error(`Failed to delete template: ${error.message}`);
    }
  }

  static async getTemplateById(id) {
    try {
      const template = await QuickReplyTemplate.findByPk(id, {
        include: [{ model: QuickReplyOption, order: [["orderIndex", "ASC"]] }],
      });
      if (!template) {
        throw new Error(`Template with id ${id} not found`);
      }
      return template;
    } catch (error) {
      console.error("Failed to retrieve template:", error);
      throw new Error(`Failed to retrieve template: ${error.message}`);
    }
  }

  static async addOptionToTemplate(templateId, optionData) {
    try {
      const template = await QuickReplyTemplate.findByPk(templateId, {
        include: [QuickReplyOption],
      });
      if (!template) {
        throw new Error(`Template with id ${templateId} not found`);
      }
      // Ensure text is provided, or fallback to existing payload
      if (!optionData.text) {
        throw new Error("Text is required to create an option");
      }
      // Generate orderIndex if not provided
      const orderIndex =
        optionData.orderIndex || (template.QuickReplyOptions.length || 0) + 1;

      // Generate payload if not provided
      let payload;
      if (optionData.payload) {
        // If payload is provided, use it
        payload = optionData.payload;
      } else if (optionData.text) {
        // If text is provided but payload is not, generate payload from text
        payload = this.generatePayload(optionData.text);
      }
      const option = await QuickReplyOption.create({
        ...optionData,
        templateId,
        orderIndex,
        payload,
      });

      return option;
    } catch (error) {
      console.error("Failed to add option to template:", error);
      throw new Error(`Failed to add option to template: ${error.message}`);
    }
  }

  static async updateOption(id, updateData) {
    try {
      const option = await QuickReplyOption.findByPk(id);
      if (!option) {
        throw new Error(`Option with id ${id} not found`);
      }

      // If payload is not provided, generate it from the text
      if (!updateData.payload && updateData.text) {
        updateData.payload = this.generatePayload(updateData.text);
      }

      const updatedOption = await option.update(updateData);
      return updatedOption;
    } catch (error) {
      console.error("Failed to update option:", error);
      throw new Error(`Failed to update option: ${error.message}`);
    }
  }
  static async getOptionsByTemplateId(templateId) {
    try {
        if (!templateId) {
            throw new Error("Template ID is required to fetch options");
        }

        const templateIdNumber = Number(templateId);
        if (isNaN(templateIdNumber)) {
            throw new Error("Invalid Template ID");
        }
  
      const options = await QuickReplyOption.findAll({
        where: { templateId: templateId },
        order: [['orderIndex', 'ASC']]
      });
  
      return options;
    } catch (error) {
      console.error("Failed to fetch options:", error);
      throw new Error(`Failed to fetch options: ${error.message}`);
    }
  }



  static generatePayload(text) {
    if (!text || typeof text !== "string") {
      throw new Error("Invalid text provided for generating payload");
    }
    return text.toUpperCase().replace(/\s+/g, "_").slice(0, 20);
  }
  static async deleteOption(id) {
    try {
      const option = await QuickReplyOption.findByPk(id);
      if (!option) {
        throw new Error(`Option with id ${id} not found`);
      }
      await option.destroy();
      return option;
    } catch (error) {
      console.error("Failed to delete option:", error);
      throw new Error(`Failed to delete option: ${error.message}`);
    }
  }
}

export default QuickReplyService;
