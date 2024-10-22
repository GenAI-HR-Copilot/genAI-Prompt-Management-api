import NodeService from '../service/NodeService.js';
import ResponseHandler from '../utils/responseHandler.js';

class NodeController {
  // Create a new root parent node
  static async createRootParentNode(req, res) {
    const { rootNodeName, description } = req.body;
    const rootData = {
      rootNodeName,
      description,
      status: 'draft',
    };

    try {
      const rootNode = await NodeService.createRootParentNode(rootData);
      await ResponseHandler.handelServerDataCreated(res, rootNode);
    } catch (error) {
      console.error('Error creating root parent node:', error);
      await ResponseHandler.handelDataInvalid(res, error.message);
    }
  }

  // Method to update a root parent node
  static async updateRootParentNode(req, res) {
    const { id } = req.params;
    const { rootNodeName, description, status } = req.body;

    const updateData = {
      rootNodeName,
      description,
      status,
    };

    try {
      // Call the service to update the root parent node
      const updatedNode = await NodeService.updateRootParentNode(id, updateData);
      // Handle successful response
      await ResponseHandler.handelServerDataCreated(res, updatedNode);
    } catch (error) {
      console.error('Error updating root parent node:', error);
      // Handle error response
      await ResponseHandler.handelDataInvalid(res, error.message);
    }
  }
  // Create a new node (child or root-level node)
  static async createNode(req, res) {
    const { nodeName, description, data, parentId, rootParentId } = req.body;

    const nodeData = {
      nodeName,
      description,
      data,
      parentId: parentId || null, // Null for root node
      rootParentId: rootParentId || null, // Null if it's a child node
      status: 'draft',
    };

    try {
      const node = await NodeService.createNode(nodeData);
      await ResponseHandler.handelServerDataCreated(res, node);
    } catch (error) {
      console.error('Error creating node:', error);
      await ResponseHandler.handelDataInvalid(res, error.message);
    }
  }

  // Get all nodes
  static async getAllNodes(req, res) {
    try {
      const nodes = await NodeService.getAllNodes();
      if (nodes && nodes.length > 0) {
        await ResponseHandler.handelServerDataGet(res, nodes);
      } else {
        await ResponseHandler.handelDataNotFound(res);
      }
    } catch (error) {
      console.error('Error fetching nodes:', error);
      await ResponseHandler.handelDataInvalid(res, error.message);
    }
  }

  // Get a single node by ID
  static async getNodeById(req, res) {
    const { id } = req.params;
    try {
      const node = await NodeService.getNodeById(id);
      if (node) {
        await ResponseHandler.handelServerDataGet(res, node);
      } else {
        await ResponseHandler.handelDataNotFound(res);
      }
    } catch (error) {
      console.error('Error fetching node:', error);
      await ResponseHandler.handelDataInvalid(res, error.message);
    }
  }

  // Update a node
  static async updateNode(req, res) {
    const { id } = req.params;
    const { nodeName, description, data, status, parentId } = req.body;

    const nodeData = {
      nodeName,
      description,
      data,
      status,
      parentId,
    };

    try {
      const updatedNode = await NodeService.updateNode(id, nodeData);
      await ResponseHandler.handelServerDataGet(res, updatedNode);
    } catch (error) {
      console.error('Error updating node:', error);
      await ResponseHandler.handelDataInvalid(res, error.message);
    }
  }

  // Delete a node
  static async deleteNode(req, res) {
    const { id } = req.params;
    try {
      await NodeService.deleteNode(id);
      await ResponseHandler.handelServerDataGet(res, { message: 'Node deleted successfully' });
    } catch (error) {
      console.error('Error deleting node:', error);
      await ResponseHandler.handelDataInvalid(res, error.message);
    }
  }
// Get a specific root parent node by its ID with its child nodes
static async getParentNodeById(req, res) {
    const { rootNodeId } = req.params;
    try {
        const parentNode = await NodeService.getParentNodeById(rootNodeId);
        if (parentNode) {
            
            await ResponseHandler.handelServerDataGet(res, [parentNode]);
        } else {
            await ResponseHandler.handelDataNotFound(res);
        }
    } catch (error) {
        console.error('Error fetching root parent node:', error);
        await ResponseHandler.handelDataInvalid(res, error.message);
    }
}

  // Get all root parent nodes with their child nodes
  static async getAllRootParentNodes(req, res) {
    try {
      const parentNodes = await NodeService.getAllRootParentNodes();
      if (parentNodes && parentNodes.length > 0) {
        await ResponseHandler.handelServerDataGet(res, parentNodes);
      } else {
        await ResponseHandler.handelDataNotFound(res);
      }
    } catch (error) {
      console.error('Error fetching root parent nodes:', error);
      await ResponseHandler.handelDataInvalid(res, error.message);
    }
  }
  static async getNodeHierarchy(req, res) {
    const { rootNodeId } = req.params;
    try {
      const hierarchy = await NodeService.getNodeHierarchy(rootNodeId);
      await ResponseHandler.handelServerDataGet(res, hierarchy);
    } catch (error) {
      console.error('Error fetching node hierarchy:', error);
      await ResponseHandler.handelDataInvalid(res, error.message);
    }
  }
}

export default NodeController;
