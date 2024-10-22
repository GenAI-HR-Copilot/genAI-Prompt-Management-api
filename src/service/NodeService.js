import { Sequelize } from 'sequelize';
import Node from '../model/Node.js';
import RootParentNode from '../model/RootParentNode.js';

class NodeService {
  // Create a new root parent node
  static async createRootParentNode(rootData) {
    return await RootParentNode.create(rootData);
  }
 // Method to update a root parent node
 static async updateRootParentNode(id, updateData) {
  try {
    const rootNode = await RootParentNode.findByPk(id);
    if (!rootNode) {
      throw new Error(`RootParentNode with id ${id} not found`);
    }

    // Update the node with new data
    await rootNode.update(updateData);
    return rootNode;
  } catch (error) {
    throw new Error(`Error updating root parent node: ${error.message}`);
  }
}
  // Create a new node (child or root node)
  static async createNode(nodeData) {
    return await Node.create(nodeData);
  }

  // Get all nodes, including parent-child relationships
//   static async getAllNodes() {
//     return await Node.findAll({
//       include: [
//         {
//           model: Node,
//           as: 'Parent', 
//         },
//         {
//           model: RootParentNode,
//           as: 'RootParent',
//         },
//       ],
//     });
//   }
  static async getAllNodes() {
    return await Node.findAll({
      include: [
        {
          model: Node,
          as: 'Parent', // Self-referencing parent relationship
          include: [
            {
              model: Node,
              as: 'Children', // Grandchildren nodes if needed
            },
          ],
        },
        {
          model: RootParentNode,
          as: 'RootParent', // Root parent relationship
        },
      ],
    });
  }
  // Get a single node by ID
  static async getNodeById(id) {
    return await Node.findByPk(id, {
      include: [
        {
          model: Node,
          as: 'Parent', // Include parent if it's a child node
        },
        {
          model: RootParentNode,
          as: 'RootParent', // Include root parent if it exists
        },
      ],
    });
  }

  // Update a node by ID
  static async updateNode(id, nodeData) {
    const node = await Node.findByPk(id);
    if (!node) throw new Error('Node not found');
    return await node.update(nodeData);
  }

  // Delete a node by ID
  static async deleteNode(id) {
    const node = await Node.findByPk(id);
    if (!node) throw new Error('Node not found');
    return await node.destroy();
  }

  // Fetch all root parent nodes with their associated child nodes

static async getAllRootParentNodes() {
    return await RootParentNode.findAll({
        include: [
            {
                model: Node,
                as: 'ChildrenNodes', // This will fetch all nodes with no parent (root nodes)
                required: false,
                where: { parentId: null }, // Only fetch root-level nodes
                include: [
                    {
                        model: Node,
                        as: 'Children', // Fetch the children of the current root node
                        required: false,
                        include: [
                            {
                                model: Node,
                                as: 'Children', // Fetch the grandchildren
                                required: false,
                                // No need for additional `where` clauses since the associations already handle it
                            },
                        ],
                    },
                ],
            },
        ],
    });
}

static async getParentNodeById(rootNodeId) {
    return await RootParentNode.findOne({
        where: { id: rootNodeId }, // Filter by the root parent node's ID
        include: [
            {
                model: Node,
                as: 'ChildrenNodes', // Fetch the immediate child nodes of the root node
                where: { parentId: null }, // Fetch only root-level child nodes
                include: [
                    {
                        model: Node,
                        as: 'Children', // Fetch the children of the child nodes
                        include: [
                            {
                                model: Node,
                                as: 'Children', // Fetch the grandchildren
                            },
                        ],
                    },
                ],
            },
        ],
    });
}

static async getNodeHierarchy(rootNodeId) {
    const rootNode = await RootParentNode.findByPk(rootNodeId, {
      include: [
        {
          model: Node,
          as: 'ChildrenNodes',
          where: { parentId: null },
          include: [
            {
              model: Node,
              as: 'Children',
              include: [
                {
                  model: Node,
                  as: 'Children',
                  // This creates a recursive structure, adjust the depth as needed
                },
              ],
            },
          ],
        },
      ],
    });

    if (!rootNode) {
      throw new Error('Root node not found');
    }

    return rootNode;
  }
}
export default NodeService;
