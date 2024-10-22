import ResponseHandler from '../utils/responseHandler.js';
import FlowService from '../service/flowService.js';

class FlowController {
  // Create a new flow
  static async createFlow(req, res) {
    const {
      flowId, flowType, startNode, nodes, type, status,
      domain, subdomain, business_process, target_audience,
      complexity_level, tags, collections
    } = req.body;

    // Validate required fields
    if (!flowId || !startNode || !nodes || !flowType) {
      return ResponseHandler.handelDataInvalid(res, 'Missing required fields');
    }

    try {
      const flow = await FlowService.createFlow({
        flowId, flowType, startNode, nodes, type, status,
        domain, subdomain, business_process, target_audience,
        complexity_level, tags, collections
      });
      return ResponseHandler.handelServerDataCreated(res, flow);
    } catch (error) {
      console.error('Error creating flow:', error);
      return ResponseHandler.handelDataInvalid(res, error.message);
    }
}

  // Retrieve a flow by ID
  static async getFlowById(req, res) {
    const { id } = req.params;

    try {
      const flow = await FlowService.getFlowById(id);
      await ResponseHandler.handelServerSuccess(res, [flow]);
    } catch (error) {
      console.error('Error retrieving flow:', error);
      await ResponseHandler.handelDataNotFound(res, error.message);
    }
  
  }

  // Retrieve all flows
  static async getAllFlows(req, res) {
    try {
      const flows = await FlowService.getAllFlows();
      await ResponseHandler.handelServerSuccess(res, flows);
    } catch (error) {
      console.error('Error retrieving flows:', error);
      await ResponseHandler.handelDataInvalid(res, error.message);
    }
  }

  // Update a flow by ID
  static async updateFlow(req, res) {
    const { id } = req.params;
    const updateData = req.body;

    try {
      const updatedFlow = await FlowService.updateFlow(id, updateData);
      await ResponseHandler.handelServerSuccess(res, updatedFlow);
    } catch (error) {
      console.error('Error updating flow:', error);
      await ResponseHandler.handelDataInvalid(res, error.message);
    }
  }

  // Delete a flow by ID
  static async deleteFlow(req, res) {
    const { id } = req.params;

    try {
      await FlowService.deleteFlow(id);
      await ResponseHandler.handelServerSuccess(res, { message: 'Flow deleted successfully' });
    } catch (error) {
      console.error('Error deleting flow:', error);
      await ResponseHandler.handelDataInvalid(res, error.message);
    }
  }
}

export default FlowController;
