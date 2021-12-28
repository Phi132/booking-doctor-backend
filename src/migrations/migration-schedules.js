'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Schedules', {
            // phải định nghĩa song song với thằng user ở models
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            currentmember: {
                type: Sequelize.INTEGER
            },
            maxnumber: {
                type: Sequelize.INTEGER
            },
            appointment: {
                type: Sequelize.STRING
            },
            timetype: {
                type: Sequelize.STRING
            },
            timestamp: {
                type: Sequelize.STRING
            },
            doctorid: {
                type: Sequelize.INTEGER
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
        await queryInterface.dropTable('Schedules');
    }
};