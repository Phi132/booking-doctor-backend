'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PatientAccs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // PatientAccs ở dưới là tên của Model chứ không phải table trong database
      
      PatientAccs.belongsTo(models.Allcodes, { foreignKey: 'positionid', targetKey: 'keyMap', as: 'positionData' })
      PatientAccs.belongsTo(models.Allcodes, { foreignKey: 'gender', targetKey: 'keyMap', as: 'genderData' })

      PatientAccs.hasOne(models.Ckeditors, { foreignKey: 'doctorId' });
    
    }
  };
  PatientAccs.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    address: DataTypes.STRING,
    phonenumber: DataTypes.STRING,
    positionid: DataTypes.STRING,
    image: DataTypes.STRING,
    gender: DataTypes.STRING,
    roleid: DataTypes.STRING
    // phải định nghĩa song song với thg migrations
  }, {
    sequelize,
    modelName: 'PatientAccs',
  });
  return PatientAccs;
};