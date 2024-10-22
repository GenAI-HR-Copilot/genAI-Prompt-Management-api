import PromptTag from "../model/PromptTag.js";

class TagService {
  static async createTag(tagData) {
    try {
      const tag = await PromptTag.create(tagData);
      return tag;
    } catch (error) {
      console.error("Failed to create tag:", error);
      throw new Error(`Failed to create tag: ${error.message}`);
    }
  }

  static async getAllTags() {
    try {
      const tags = await PromptTag.findAll();
      return tags;
    } catch (error) {
      console.error("Failed to retrieve tags:", error);
      throw new Error(`Failed to retrieve tags: ${error.message}`);
    }
  }

  static async updateTag(id, updateData) {
    try {
      const tag = await PromptTag.findByPk(id);
      if (!tag) {
        throw new Error(`Tag with id ${id} not found`);
      }

      const updatedTag = await tag.update(updateData);
      return updatedTag;
    } catch (error) {
      console.error("Failed to update tag:", error);
      throw new Error(`Failed to update tag: ${error.message}`);
    }
  }

  static async deleteTag(id) {
    try {
      const tag = await PromptTag.findByPk(id);
      if (!tag) {
        throw new Error(`Tag with id ${id} not found`);
      }

      await tag.destroy();
      return tag;
    } catch (error) {
      console.error("Failed to delete tag:", error);
      throw new Error(`Failed to delete tag: ${error.message}`);
    }
  }

  static async getTagById(id) {
    try {
      const tag = await PromptTag.findByPk(id);
      if (!tag) {
        throw new Error(`Tag with id ${id} not found`);
      }
      return tag;
    } catch (error) {
      console.error("Failed to retrieve tag:", error);
      throw new Error(`Failed to retrieve tag: ${error.message}`);
    }
  }
}

export default TagService;
