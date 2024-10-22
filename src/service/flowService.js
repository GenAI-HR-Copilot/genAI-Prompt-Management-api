import Flow from '../model/Flow.js';


class FlowService {
  // Create a new flow
  static async createFlow(flowData) {
    try {
      const flow = await Flow.create(flowData);
      return flow;
    } catch (error) {
      throw new Error(`Error creating flow: ${error.message}`);
    }
  }

  // Retrieve a flow by ID
  static async getFlowById(id) {
    try {
      const flow = await Flow.findByPk(id);
      if (!flow) {
        throw new Error('Flow not found');
      }
      return flow;
    } catch (error) {
      throw new Error(`Error retrieving flow: ${error.message}`);
    }
  
  }

  // Retrieve all flows
  static async getAllFlows() {
    try {
      const flows = await Flow.findAll();
      return flows;
    } catch (error) {
      throw new Error(`Error retrieving flows: ${error.message}`);
    }
  }

  // Update a flow by ID
  static async updateFlow(id, updateData) {
    try {
      const [updated] = await Flow.update(updateData, {
        where: { id },
      });
      if (!updated) {
        throw new Error('Flow not found or not updated');
      }
      return await Flow.findByPk(id);
    } catch (error) {
      throw new Error(`Error updating flow: ${error.message}`);
    }
  }

  // Delete a flow by ID
  static async deleteFlow(id) {
    try {
      const deleted = await Flow.destroy({
        where: { id },
      });
      if (!deleted) {
        throw new Error('Flow not found or not deleted');
      }
      return true;
    } catch (error) {
      throw new Error(`Error deleting flow: ${error.message}`);
    }
  }
}

export default FlowService;
