import { DataTypes } from 'sequelize';
import sequelize from '../repository/db.js';

const RootParentNode = sequelize.define(
  "RootParentNode",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    rootNodeName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("draft", "approved"),
      allowNull: false,
      defaultValue: "draft",
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
    tableName: "RootParentNodes",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default RootParentNode;
