// QuickReplyTemplate.js
import { DataTypes } from 'sequelize';
import sequelize from '../repository/db.js';

const QuickReplyTemplate = sequelize.define(
  "QuickReplyTemplate",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
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
    tableName: "quick_reply_templates",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default QuickReplyTemplate;