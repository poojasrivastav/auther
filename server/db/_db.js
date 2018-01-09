const Sequelize = require('sequelize');

const databaseURI = 'postgres://localhost:5432/auth';

const db = new Sequelize(databaseURI, {
  define: {
    timestamps: false,
    underscored: true
  },
  logging: false
});

module.exports = db;
