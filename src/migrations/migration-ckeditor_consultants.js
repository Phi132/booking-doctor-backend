'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Ckeditor_consultants', {
            // phải định nghĩa song song với thằng user ở models
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            contentHTML: { type: Sequelize.TEXT('long') },
            contentCKEditor: { type: Sequelize.TEXT('long') },
            description: { type: Sequelize.TEXT('long') },
            doctorId: { type: Sequelize.INTEGER },
            consultantId: { type: Sequelize.INTEGER },
            clinicId: { type: Sequelize.INTEGER },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Ckeditor_consultants');
    }
};