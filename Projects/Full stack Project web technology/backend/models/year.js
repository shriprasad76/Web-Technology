module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Year', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    label: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
