module.exports = (sequelize, DataTypes) => {
    const PromptsTags = sequelize.define('PromptsTags', {
      promptId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Prompts',
          key: 'id',
        },
      },
      tagId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'PromptTag',
          key: 'id',
        },
      },
    });
  
    return PromptsTags;
  };
  