module.exports = (sequelize, DataTypes) => {
    const PromptsCollections = sequelize.define('PromptsCollections', {
      promptId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Prompts', 
          key: 'id',
        },
        primaryKey: true, 
      },
      collectionId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'PromptCollections',
          key: 'id',
        },
        primaryKey: true, 
      },
    }, {
      timestamps: false, 
    });
  
    
    PromptsCollections.associate = (models) => {
      PromptsCollections.belongsTo(models.Prompt, {
        foreignKey: 'promptId',
        as: 'prompt',
      });
      PromptsCollections.belongsTo(models.PromptCollection, {
        foreignKey: 'collectionId',
        as: 'collection',
      });
    };
  
    return PromptsCollections;
  };
  