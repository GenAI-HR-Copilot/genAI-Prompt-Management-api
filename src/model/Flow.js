import { DataTypes } from "sequelize";
import sequelize from "../repository/db.js";

// Define the Flow model
const Flow = sequelize.define(
  "Flow",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    flowId: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    flowType: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    startNode: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    nodes: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    domain: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    subdomain: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    business_process: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    target_audience: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    complexity_level: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 1,
        max: 5,
      },
    },
    tags: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    collections: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  },
  {
    tableName: "Flows",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default Flow;
