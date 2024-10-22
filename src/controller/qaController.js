import qaService from '../service/qaService.js';
import ResponseHandler from "../utils/responseHandler.js";

class QAController {
  static async createQAPair(req, res) {
    const { question, answer, category, tags } = req.body;

    try {
      const data = await qaService.createQAPair({ question, answer, category, tags });
      await ResponseHandler.handelServerDataCreated(res, data);
    } catch (error) {
      console.error('Error creating QA pair:', error);
      await ResponseHandler.handelDataInvalid(res, error.message);
    }
  }

  static async getAllQAPairs(req, res) {
    try {
      const data = await qaService.getAllQAPairs();
      if (data && data.length > 0) {
        await ResponseHandler.handelServerDataGet(res, data);
      } else {
        await ResponseHandler.handelDataNotFound(res);
      }
    } catch (error) {
      console.error('Error fetching QA pairs:', error);
      await ResponseHandler.handelDataInvalid(res, error.message);
    }
  }

  static async updateQAPair(req, res) {
    const { id } = req.params;
    const { question, answer, category, tags } = req.body;

    try {
      const updatedQAPair = await qaService.updateQAPair(id, { question, answer, category, tags });
      if (updatedQAPair) {
        await ResponseHandler.handelServerDataCreated(res, updatedQAPair);
      } else {
        await ResponseHandler.handelDataNotFound(res);
      }
    } catch (error) {
      console.error('Error updating QA pair:', error);
      await ResponseHandler.handelDataInvalid(res, error.message);
    }
  }

  static async deleteQAPair(req, res) {
    const { id } = req.params;

    try {
      const deletedQAPair = await qaService.deleteQAPair(id);
      if (deletedQAPair) {
        await ResponseHandler.handelServerDataGet(res, deletedQAPair);
      } else {
        await ResponseHandler.handelDataNotFound(res);
      }
    } catch (error) {
      console.error('Error deleting QA pair:', error);
      await ResponseHandler.handelDataInvalid(res, error.message);
    }
  }

  static async getQAPairById(req, res) {
    const { id } = req.params;

    try {
      const qaPair = await qaService.getQAPairById(id);
      if (qaPair) {
        await ResponseHandler.handelServerDataGet(res, qaPair);
      } else {
        await ResponseHandler.handelDataNotFound(res);
      }
    } catch (error) {
      console.error('Error fetching QA pair by ID:', error);
      await ResponseHandler.handelDataInvalid(res, error.message);
    }
  }
}

export default QAController;