import { DataTypes } from 'sequelize';
import sequelize from '../repository/db.js';
const PromptTag = sequelize.define(
  "PromptTag",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      unique: true,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "PromptTag",
    timestamps: true, 
    createdAt: "createdAt",
    updatedAt: "updatedAt",
  }
);

export default PromptTag;
