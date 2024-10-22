module.exports = (sequelize, DataTypes) => {
    const Entity = sequelize.define('Entity', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      examples: {
        type: DataTypes.JSONB,
      },
    }, {
      timestamps: false, 
    });
  
    return Entity;
  };
  