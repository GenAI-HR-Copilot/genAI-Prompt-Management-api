module.exports = (sequelize, DataTypes) => {
  const PromptUsageStat = sequelize.define("PromptUsageStat", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    promptId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Prompts",
        key: "id",
      },
    },
    usageCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    averageLatency: {
      type: DataTypes.FLOAT,
    },
    successRate: {
      type: DataTypes.FLOAT,
    },
    lastUsedAt: {
      type: DataTypes.DATE,
    },
  });
  PromptUsageStat.associate = (models) => {
    PromptUsageStat.belongsTo(models.Prompt, {
      foreignKey: "promptId",
      as: "prompt",
    });
  };

  return PromptUsageStat;
};
