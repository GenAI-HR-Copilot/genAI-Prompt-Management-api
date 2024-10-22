import PromptReview from "../model/PromptReview.js";
import Prompts from "../model/Prompts.js";
import Users from "../model/User.js";

class PromptReviewService {
  // Create a new prompt review
  static async createPromptReview(promptReviewData) {
    console.log(promptReviewData);
    try {
      const promptReview = await PromptReview.create(promptReviewData);
      console.log(promptReview);
      return promptReview;
    } catch (error) {
      console.log(error);
      throw new Error(`Failed to create prompt review: ${error.message}`);
    }
  }

  // Get all prompt reviews
  static async getAllPromptReviews() {
    return await PromptReview.findAll();
  }

  // Get a single prompt review by ID
  static async getPromptReviewById(promptId) {
    try {
      const promptReviews = await PromptReview.findAll({
        where: { promptId },
      });

      // Check if the review exists
      if (!promptReviews.length) {
        throw new Error(`PromptReview with id ${promptId} not found`);
      }

      // Return the data in the specified format
      return promptReviews;
    } catch (error) {
      // Handle any errors that occur during the fetch
      console.log(error);
      return {
        data: [],
        statusCode: 500,
        status: false,
        message: `Failed to retrieve prompt review: ${error.message}`,
      };
    }
  }

  // Update a prompt review by ID
  static async updatePromptReview(id, promptReviewData) {
    const promptReview = await PromptReview.findByPk(id);
    if (!promptReview) throw new Error("Prompt review not found");
    return await promptReview.update(promptReviewData);
  }

  // Delete a prompt review by ID (soft delete by setting a status to 'inactive')
  static async deletePromptReview(id) {
    const promptReview = await PromptReview.findByPk(id);
    if (!promptReview) throw new Error("Prompt review not found");
    return await promptReview.update({ status: "inactive" });
  }
}

export default PromptReviewService;
