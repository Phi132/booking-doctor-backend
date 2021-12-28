const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('dktmrfbrues8i', 'zbyzxelmjhtjqy',
    '2031eaee356898ce6bacc81608142da00d5c8cf6d9742a91b8c4222def6e745c', {
    host: 'ec2-54-147-76-191.compute-1.amazonaws.com',
    dialect: 'postgres',
    logging: false,
    query: {
        raw: true
    },
    timezone: '+07:00',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}


module.exports = connectDB;
