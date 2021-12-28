'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Ckeditors extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

            Ckeditors.belongsTo(models.Account_users, { foreignKey: 'doctorId' });
        }
    };
    Ckeditors.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        contentHTML: DataTypes.TEXT('long'),
        contentCKEditor: DataTypes.TEXT('long'),
        description: DataTypes.TEXT('long'),
        doctorId: DataTypes.INTEGER,
        specialtyId: DataTypes.INTEGER,
        clinicId: DataTypes.INTEGER,

        // phải định nghĩa song song với thg migrations
    }, {
        sequelize,
        modelName: 'Ckeditors',
    });
    return Ckeditors;
};