'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Users ở dưới là tên của Model chứ không phải table trong database
      Users.belongsTo(models.allcodes, { foreignKey: 'positionid', targetKey: 'keyMap', as: 'positionData' })
      Users.belongsTo(models.allcodes, { foreignKey: 'gender', targetKey: 'keyMap', as: 'genderData' })

      Users.hasOne(models.ckeditors, { foreignKey: 'doctorId' });

      Users.hasOne(models.ckeditor_consultants, { foreignKey: 'doctorId' });
    }
  };
  Users.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    address: DataTypes.STRING,
    phonenumber: DataTypes.STRING,
    positionid: DataTypes.STRING,
    image: DataTypes.BLOB('long'),
    gender: DataTypes.STRING,
    roleid: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    // phải định nghĩa song song với thg migrations
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};