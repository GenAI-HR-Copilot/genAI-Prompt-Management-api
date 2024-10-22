// QuickReplyOption.js
import { DataTypes } from 'sequelize';
import sequelize from '../repository/db.js';

const QuickReplyOption = sequelize.define(
  "QuickReplyOption",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    templateId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'quick_reply_templates',
        key: 'id',
      },
    },
    text: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    payload: {
      type: DataTypes.STRING(255),
    },
    orderIndex: {
      type: DataTypes.INTEGER,
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
    tableName: "quick_reply_options",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    indexes: [
      {
        name: 'idx_quick_reply_options_template_id',
        fields: ['templateId'],
      },
    ],
  }
);

export default QuickReplyOption;