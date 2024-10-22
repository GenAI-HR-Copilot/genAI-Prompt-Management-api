import MinioService from "../service/MinioService.js";
import ResponseHandler from "../utils/responseHandler.js";

class MinioController {
  static async getJsonFile(req, res) {
    const { objectName } = req.params;
    try {
      const data = await MinioService.getJsonFile(objectName);
      await ResponseHandler.handelServerDataGet(res, data);
    } catch (error) {
      console.error("Error fetching JSON file:", error);
      await ResponseHandler.handelDataInvalid(res, error.message);
    }
  }

  static async updateJsonFile(req, res) {
    const { objectName } = req.params;
    const jsonData = req.body;
    try {
      await MinioService.updateJsonFile(objectName, jsonData);
      await ResponseHandler.handelServerDataCreated(res, { message: "JSON file updated successfully" });
    } catch (error) {
      console.error("Error updating JSON file:", error);
      await ResponseHandler.handelDataInvalid(res, error.message);
    }
  }

  static async deleteJsonFile(req, res) {
    const { objectName } = req.params;
    try {
      await MinioService.deleteJsonFile(objectName);
      await ResponseHandler.handelServerDataDeleted(res, { message: "JSON file deleted successfully" });
    } catch (error) {
      console.error("Error deleting JSON file:", error);
      await ResponseHandler.handelDataInvalid(res, error.message);
    }
  }

  static async listJsonFiles(req, res) {
    try {
      const files = await MinioService.listJsonFiles();
      await ResponseHandler.handelServerDataGet(res, files);
    } catch (error) {
      console.error("Error listing JSON files:", error);
      await ResponseHandler.handelDataInvalid(res, error.message);
    }
  }
}

export default MinioController;