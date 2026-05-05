module.exports = (sequelize, DataTypes) => {
  return sequelize.define('LabStudent', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
  });
};
