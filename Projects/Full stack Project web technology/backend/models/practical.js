module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Practical', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    practicalNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    labId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });
};
