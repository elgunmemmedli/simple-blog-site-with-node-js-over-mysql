const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-publisist', 'root', '', {
    dialect : 'mysql',
    host : 'localhost'
});

module.exports = sequelize;