'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Allcodes extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // Allcodes.hasMany(models.Users, { foreignKey: 'positionid', as: 'positionData' })
            // Allcodes.hasMany(models.Users, { foreignKey: 'gender', as: 'genderData' })

            // Allcodes.hasOne(models.schedules, { foreignKey: 'timetype' })
        }
    };
    Allcodes.init({
        keyMap: DataTypes.STRING,
        type: DataTypes.STRING,
        valueEn: DataTypes.STRING,
        valueVi: DataTypes.STRING,

        // phải định nghĩa song song với thg migrations
    }, {
        sequelize,
        modelName: 'Allcodes',
    });
    return Allcodes;
};