"use strict";
const { Model, DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  class Cars extends Model {
    static associate(models) {
      // Define associations here
    }
  }
  Cars.init(
    {
      name: DataTypes.STRING,
      rentPrice: DataTypes.INTEGER,
      type: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Cars",
    }
  );
  return Cars;
};
