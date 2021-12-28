'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class history extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  history.init({
    id:{
        type:  DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    patientid: DataTypes.INTEGER,
    doctorid: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    files: DataTypes.TEXT,
    
    // phải định nghĩa song song với thg migrations
  }, {
    sequelize,
    modelName: 'history',
  });
  return history;
};