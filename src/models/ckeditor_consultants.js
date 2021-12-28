'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Ckeditor_consultants extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            
            Ckeditor_consultants.belongsTo(models.Account_users, { foreignKey: 'doctorId' });

            Ckeditor_consultants.belongsTo(models.Consultants, {foreignKey: 'consultantId'});
 
            // nếu mà tìm theo consultantId thì thg consultants sẽ phụ thuộc vào ckedit_con
            // và sẽ tìm trong db của thg ckeditor_con 
            // muốn tìm id trong "cosultants" bằng thằng consultantId thì thằng
            // models consultant sẽ phụ thuộc vào models ckeditor_con 
            // nên sẽ có belongsTo ở đây còn bên kia sẽ là hasOne
            // belongsTo ở đâu thì sẽ tìm trong db thằng đó
        }
    };
    Ckeditor_consultants.init({
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
        consultantId: DataTypes.INTEGER,
        clinicId: DataTypes.INTEGER,

        // phải định nghĩa song song với thg migrations
    }, {
        sequelize,
        modelName: 'Ckeditor_consultants',
    });
    return Ckeditor_consultants;
};