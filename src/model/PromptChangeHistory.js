import { DataTypes } from 'sequelize';
import sequelize from '../repository/db.js';

const PromptChangeHistory = sequelize.define('PromptChangeHistory', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  promptId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Prompts',
      key: 'id',
    },
    allowNull: false,
  },
  changedBy: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users', 
      key: 'id',
    },
    allowNull: false,
  },
  changeType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  oldValue: {
    type: DataTypes.JSONB,
  },
  newValue: {
    type: DataTypes.JSONB,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: "PromptChangeHistory",
  timestamps: false,
  createdAt: "created_at",
});

PromptChangeHistory.associate = models => {
  PromptChangeHistory.belongsTo(models.Prompts, {
    foreignKey: 'promptId',
    as: 'prompt',
  });
  PromptChangeHistory.belongsTo(models.Users, {
    foreignKey: 'changedBy',
    as: 'changer',
  });
};

export default PromptChangeHistory;
