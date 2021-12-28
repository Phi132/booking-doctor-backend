'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Clinics extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Clinics.init({
    id:{
        type:  DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    address: DataTypes.STRING,
    description: DataTypes.TEXT,
    image: DataTypes.STRING,
    name: DataTypes.STRING,
    
    // phải định nghĩa song song với thg migrations
  }, {
    sequelize,
    modelName: 'Clinics',
  });
  return Clinics;
};