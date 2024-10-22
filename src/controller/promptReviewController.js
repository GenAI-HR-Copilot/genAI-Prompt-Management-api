import PromptReviewService from '../service/promptReviewService.js';
import ResponseHandler from "../utils/responseHandler.js";

class PromptReviewController {
  // Create a new prompt review
  static async createPromptReview(req, res) {
    const { promptId, reviewerId, status, comments } = req.body;

    const promptReviewData = {
      promptId,
      reviewerId,
      status,
      comments,
    };

    try {
      const data = await PromptReviewService.createPromptReview(promptReviewData);
      console.log(data);
      await ResponseHandler.handelServerDataCreated(res, data);
    } catch (error) {
      console.error('Error creating prompt review:', error);
      await ResponseHandler.handelDataInvalid(res, error.message);
    }
  }

  // Get all prompt reviews
  static async getAllPromptReviews(req, res) {
    try {
      const data = await PromptReviewService.getAllPromptReviews();
      if (data && data.length > 0) {
        await ResponseHandler.handelServerDataGet(res, data);
      } else {
        await ResponseHandler.handelDataNotFound(res);
      }
    } catch (error) {
      console.error('Error fetching prompt reviews:', error);
      await ResponseHandler.handelDataInvalid(res, error.message);
    }
  }

  // Get a single prompt review by ID
  static async getPromptReviewById(req, res) {
    const { id } = req.params;
    try {
      const data = await PromptReviewService.getPromptReviewById(id);
      if (data) {
        await ResponseHandler.handelServerDataGet(res, data);
      } else {
        await ResponseHandler.handelDataNotFound(res);
      }
    } catch (error) {
      console.error('Error fetching prompt review:', error);
      await ResponseHandler.handelDataInvalid(res, error.message);
    }
  }

  // Update a prompt review by ID
  static async updatePromptReview(req, res) {
    const { id } = req.params;
    const { promptId, reviewerId, status, comments } = req.body;

    const promptReviewData = {
      promptId,
      reviewerId,
      status,
      comments,
    };

    try {
      const data = await PromptReviewService.updatePromptReview(id, promptReviewData);
      await ResponseHandler.handelServerDataGet(res, data);
    } catch (error) {
      console.error('Error updating prompt review:', error);
      await ResponseHandler.handelDataInvalid(res, error.message);
    }
  }

  // Delete a prompt review by ID
  static async deletePromptReview(req, res) {
    const { id } = req.params;
    try {
      await PromptReviewService.deletePromptReview(id);
      await ResponseHandler.handelServerDataGet(res, { message: 'Prompt review deleted successfully' });
    } catch (error) {
      console.error('Error deleting prompt review:', error);
      await ResponseHandler.handelDataInvalid(res, error.message);
    }
  }
}

export default PromptReviewController;
