import { QAPair, Tag } from "../model/associations.js";

// import QAPair from "../model/QaPairs";
// import Tag from "../model/tag";

class QAService {
  static async createQAPair(qaPairData) {
    try {
      const { question, answer, category, tags } = qaPairData;
      const qaPair = await QAPair.create({ question, answer, category });

      if (tags && tags.length > 0) {
        const tagInstances = await Promise.all(
          tags.map((tagName) => Tag.findOrCreate({ where: { name: tagName } }))
        );
        await qaPair.setTags(tagInstances.map(([tag]) => tag));
      }

      return qaPair;
    } catch (error) {
      console.error("Failed to create QA pair:", error);
      throw new Error(`Failed to create QA pair: ${error.message}`);
    }
  }

  static async getAllQAPairs() {
    try {
      const qaPairs = await QAPair.findAll({
        include: [{ model: Tag, through: { attributes: [] } }],
      });
      return qaPairs;
    } catch (error) {
      console.error("Failed to retrieve QA pairs:", error);
      throw new Error(`Failed to retrieve QA pairs: ${error.message}`);
    }
  }

  static async updateQAPair(id, updateData) {
    try {
      const qaPair = await QAPair.findByPk(id);
      if (!qaPair) {
        throw new Error(`QA pair with id ${id} not found`);
      }

      const { question, answer, category, tags } = updateData;
      await qaPair.update({ question, answer, category });

      if (tags) {
        const tagInstances = await Promise.all(
          tags.map((tagName) => Tag.findOrCreate({ where: { name: tagName } }))
        );
        await qaPair.setTags(tagInstances.map(([tag]) => tag));
      }

      const updatedQAPair = await QAPair.findByPk(id, {
        include: [{ model: Tag, through: { attributes: [] } }],
      });
      return updatedQAPair;
    } catch (error) {
      console.error("Failed to update QA pair:", error);
      throw new Error(`Failed to update QA pair: ${error.message}`);
    }
  }

  static async deleteQAPair(id) {
    try {
      const qaPair = await QAPair.findByPk(id);
      if (!qaPair) {
        throw new Error(`QA pair with id ${id} not found`);
      }

      await qaPair.destroy();
      return qaPair;
    } catch (error) {
      console.error("Failed to delete QA pair:", error);
      throw new Error(`Failed to delete QA pair: ${error.message}`);
    }
  }

  static async getQAPairById(id) {
    try {
      const qaPair = await QAPair.findByPk(id, {
        include: [{ model: Tag, through: { attributes: [] } }],
      });
      if (!qaPair) {
        throw new Error(`QA pair with id ${id} not found`);
      }
      return qaPair;
    } catch (error) {
      console.error("Failed to retrieve QA pair:", error);
      throw new Error(`Failed to retrieve QA pair: ${error.message}`);
    }
  }
}

export default QAService;
