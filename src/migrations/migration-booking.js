'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('bookings', {
            // phải định nghĩa song song với thằng user ở models
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            statusid: {
                type: Sequelize.STRING
            },
            doctorid: {
                type: Sequelize.INTEGER
            },
            patientid: {
                type: Sequelize.INTEGER
            },
            date: {
                type: Sequelize.STRING
            },
            timetype: {
                type: Sequelize.STRING
            },
            token: {
                type: Sequelize.STRING
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
        await queryInterface.dropTable('bookings');
    }
};