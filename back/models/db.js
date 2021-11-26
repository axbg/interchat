const Sequelize = require('sequelize');
const properties = require('../properties');

const sequelize = new Sequelize(properties.DB_URI);

module.exports = sequelize;

