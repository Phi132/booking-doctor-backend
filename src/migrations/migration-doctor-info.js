'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('doctorinfo', {
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
            priceid: {
                type: Sequelize.INTEGER
            },
            provinceid: {
                type: Sequelize.INTEGER
            },
            paymentid: {
                type: Sequelize.INTEGER
            },
            addressclinic: {
                type: Sequelize.STRING
            },
            nameclinic: {
                type: Sequelize.STRING
            },
            note: {
                type: Sequelize.STRING
            },
            count: {
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
        await queryInterface.dropTable('doctorinfo');
    }
};