import { DataTypes } from 'sequelize';
import sequelize from '../repository/db.js';
const PromptReview = sequelize.define('PromptReview', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  promptId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Prompts', // Ensure that this matches the model name defined elsewhere
      key: 'id',
    },
  },
  reviewerId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users', // Ensure that this matches the model name defined elsewhere
      key: 'id',
    },
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  comments: {
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
}, {
  timestamps: true,
});

// Define associations
PromptReview.associate = (models) => {
  PromptReview.belongsTo(models.Prompts, { 
    foreignKey: 'promptId',
    as: 'prompt',
  });
  PromptReview.belongsTo(models.Users, { 
    foreignKey: 'reviewerId',
    as: 'reviewer',
  });
};

export default PromptReview;
