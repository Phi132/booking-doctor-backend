'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class patientAccs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // patientAccs ở dưới là tên của Model chứ không phải table trong database
      patientAccs.belongsTo(models.allcodes, { foreignKey: 'positionid', targetKey: 'keyMap', as: 'positionData' })
      patientAccs.belongsTo(models.allcodes, { foreignKey: 'gender', targetKey: 'keyMap', as: 'genderData' })

      patientAccs.hasOne(models.ckeditors, { foreignKey: 'doctorId' });
    }
  };
  patientAccs.init({
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
    modelName: 'patientAccs',
  });
  return patientAccs;
};