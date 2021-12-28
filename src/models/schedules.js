'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Schedules extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Schedules.belongsTo(models.allcodes, {foreignKey: 'timetype', targetKey: 'keyMap',})
    }
  };
  Schedules.init({
    id:{
        type:  DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    currentmember: DataTypes.INTEGER,
    maxnumber: DataTypes.INTEGER,
    appointment: DataTypes.STRING,
    timetype: DataTypes.STRING,
    timestamp: DataTypes.STRING,
    doctorid: DataTypes.INTEGER,
    
    // phải định nghĩa song song với thg migrations
  }, {
    sequelize,
    modelName: 'Schedules',
  });
  return Schedules;
};