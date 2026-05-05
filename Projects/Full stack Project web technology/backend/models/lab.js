module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Lab', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    totalPracticals: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 12,
    },
  });
};
