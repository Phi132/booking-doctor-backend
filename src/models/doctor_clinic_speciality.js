'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class doctor_clinic_speciality extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  doctor_clinic_speciality.init({
    id:{
        type:  DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    doctorid: DataTypes.INTEGER,
    clinicid: DataTypes.INTEGER,
    specialityid: DataTypes.INTEGER,
    
    // phải định nghĩa song song với thg migrations
  }, {
    sequelize,
    modelName: 'doctor_clinic_speciality',
  });
  return doctor_clinic_speciality;
};