const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
  class PromptVersion extends Model {}

  PromptVersion.init({
    prompt_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Prompts',  
        key: 'id',
      },
    },
    version_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    content: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    metadata: {
      type: DataTypes.JSONB,
    },
    created_by: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users', 
          key: 'id',
        },
        allowNull: false,
      },
      updated_by: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
  }, {
    sequelize,
    modelName: 'PromptVersion',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
        {
          unique: true,
          fields: ['prompt_id', 'version_number'],
        },
      ],
  
  });

  return PromptVersion;
};
