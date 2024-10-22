import tagService from '../service/tagService.js';
import ResponseHandler from "../utils/responseHandler.js";


class TagController {
  static async createTag(req, res) {
    const { name } = req.body;

    try {
      const data = await tagService.createTag({ name });
      console.log(data);
      await ResponseHandler.handelServerDataCreated(res, data);
    } catch (error) {
      console.error('Error creating tag:', error);
      await ResponseHandler.handelDataInvalid(res, error.message);
    }
  }

  static async getAllTags(req, res) {
    try {
      const data = await tagService.getAllTags();
      if (data && data.length > 0) {
        await ResponseHandler.handelServerDataGet(res, data);
      } else {
        await ResponseHandler.handelDataNotFound(res);
      }
    } catch (error) {
      console.error('Error fetching tags:', error);
      await ResponseHandler.handelDataInvalid(res, error.message);
    }
  }

  static async updateTag(req, res) {
    const { id } = req.params;
    const { name } = req.body;

    try {
      const updatedTag = await tagService.updateTag(id, { name });
      if (updatedTag) {
        await ResponseHandler.handelServerDataCreated(res, updatedTag);
      } else {
        await ResponseHandler.handelDataNotFound(res);
      }
    } catch (error) {
      console.error('Error updating tag:', error);
      await ResponseHandler.handelDataInvalid(res, error.message);
    }
  }

  static async deleteTag(req, res) {
    const { id } = req.params;

    try {
      const deletedTag = await tagService.deleteTag(id);
      if (deletedTag) {
        await ResponseHandler.handelServerDataGet(res, deletedTag);
      } else {
        await ResponseHandler.handelDataNotFound(res);
      }
    } catch (error) {
      console.error('Error deleting tag:', error);
      await ResponseHandler.handelDataInvalid(res, error.message);
    }
  }

  static async getTagById(req, res) {
    const { id } = req.params;

    try {
      const tag = await tagService.getTagById(id);
      if (tag) {
        await ResponseHandler.handelServerDataGet(res, tag);
      } else {
        await ResponseHandler.handelDataNotFound(res);
      }
    } catch (error) {
      console.error('Error fetching tag by ID:', error);
      await ResponseHandler.handelDataInvalid(res, error.message);
    }
  }
}

export default TagController;
