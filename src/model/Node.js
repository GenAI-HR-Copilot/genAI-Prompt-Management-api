import { DataTypes } from 'sequelize';
import sequelize from '../repository/db.js';
import RootParentNode from './RootParentNode.js';

const Node = sequelize.define(
  "Node",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nodeName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    data: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("draft", "approved"),
      allowNull: false,
      defaultValue: "draft",
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    rootParentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: RootParentNode,
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "Nodes",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

// Define associations
Node.belongsTo(RootParentNode, { foreignKey: "rootParentId", as: "RootParent" });
RootParentNode.hasMany(Node, { foreignKey: "rootParentId", as: "ChildrenNodes" });

Node.hasMany(Node, { as: "Children", foreignKey: "parentId" });
Node.belongsTo(Node, { as: "Parent", foreignKey: "parentId" });

export default Node;
