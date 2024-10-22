module.exports = (sequelize, DataTypes) => {
    const UserIntent = sequelize.define('UserIntent', {
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
    }, {
      timestamps: false, 
    });
  
    return UserIntent;
  };
  