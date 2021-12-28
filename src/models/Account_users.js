'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account_users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Account_users ở dưới là tên của Model chứ không phải table trong database
      
      Account_users.belongsTo(models.Allcodes, { foreignKey: 'positionid', targetKey: 'keyMap', as: 'positionData' })
      Account_users.belongsTo(models.Allcodes, { foreignKey: 'gender', targetKey: 'keyMap', as: 'genderData' })

      Account_users.hasOne(models.Ckeditors, { foreignKey: 'doctorId' });

      Account_users.hasOne(models.Ckeditor_consultants, { foreignKey: 'doctorId' });
    }
  };
  Account_users.init({
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
    modelName: 'Account_users',
  });
  return Account_users;
};