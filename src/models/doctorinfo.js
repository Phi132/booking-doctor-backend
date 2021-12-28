'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class doctorinfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  doctorinfo.init({
    id:{
        type:  DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    doctorid: DataTypes.INTEGER,
    priceid: DataTypes.INTEGER,
    provinceid: DataTypes.INTEGER,
    paymentid: DataTypes.INTEGER,
    addressclinic: DataTypes.STRING,
    nameclinic: DataTypes.STRING,
    note: DataTypes.STRING,
    count: DataTypes.INTEGER
    // phải định nghĩa song song với thg migrations
  }, {
    sequelize,
    modelName: 'doctorinfo',
  });
  return doctorinfo;
};