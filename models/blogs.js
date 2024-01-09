const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Blogs = sequelize.define('blogs', {
    id : {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true
    },
    title : Sequelize.STRING,
    imageUrl : {
        type : Sequelize.STRING,
        allowNull : false
    },
    content : {
        type : Sequelize.TEXT,
        allowNull : false
    },
    status: {
        type: Sequelize.ENUM('active', 'inactive'), 
        allowNull: false,
        defaultValue: 'inactive' 
    }
});

module.exports = Blogs;