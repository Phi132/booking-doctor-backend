'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('markdown', {
            // phải định nghĩa song song với thằng user ở models
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            doctorid: {
                type: Sequelize.INTEGER
            },
            clinicid: {
                type: Sequelize.INTEGER
            },
            specialityid: {
                type: Sequelize.INTEGER
            },
            contenthtml: {
                type: Sequelize.STRING
            },
            contentmarkdown: {
                type: Sequelize.STRING
            },
            description: {
                type: Sequelize.TEXT
            },
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
        await queryInterface.dropTable('markdown');
    }
};