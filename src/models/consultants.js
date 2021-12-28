'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Consultants extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Consultants.hasOne(models.ckeditor_consultants, { foreignKey: 'id' });
    }
  };
  Consultants.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    contentHTMLconsultants: DataTypes.TEXT('long'),
    image: DataTypes.BLOB('long'),


    // phải định nghĩa song song với thg migrations
  }, {
    sequelize,
    modelName: 'Consultants',
  });
  return Consultants;
};