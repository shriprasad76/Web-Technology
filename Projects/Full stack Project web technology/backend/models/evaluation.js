module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Evaluation', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    attendance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    journal: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    performance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    viva1: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    viva2: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    viva3: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    finalScore: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    labId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });
};
