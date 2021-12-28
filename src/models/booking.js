'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  booking.init({
    id:{
        type:  DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    statusid: DataTypes.STRING,
    doctorid: DataTypes.INTEGER,
    patientid: DataTypes.INTEGER,
    date: DataTypes.STRING,
    timetype: DataTypes.STRING,
    token: DataTypes.STRING,
    
    // phải định nghĩa song song với thg migrations
  }, {
    sequelize,
    modelName: 'bookings',
  });
  return booking;
};