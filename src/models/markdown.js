'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class markdown extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  markdown.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    doctorid: DataTypes.INTEGER,
    clinicid: DataTypes.INTEGER,
    specialityid: DataTypes.INTEGER,
    contenthtml: DataTypes.STRING,
    contentmarkdown: DataTypes.STRING,
    description: DataTypes.TEXT

    // phải định nghĩa song song với thg migrations
  }, {
    sequelize,
    modelName: 'markdown',
  });
  return markdown;
};