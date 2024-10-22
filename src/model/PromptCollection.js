module.exports = (sequelize, DataTypes) => {
    const PromptCollection = sequelize.define('PromptCollection', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      createdBy: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users', 
          key: 'id',
        },
      },
    }, {
      timestamps: false,
    });
  
    PromptCollection.associate = (models) => {
      PromptCollection.belongsTo(models.User, {
        foreignKey: 'createdBy',
        as: 'creator', 
      });
    };
  
    return PromptCollection;
  };
  