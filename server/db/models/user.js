const Sequelize = require('sequelize');

const db = require('../_db');

const User = db.define('user', {
  name: Sequelize.STRING,
  photo: {
    type: Sequelize.STRING,
    defaultValue: '/images/default-photo.jpg'
  },
  phone: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: Sequelize.STRING,
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
}, {
  scopes: {
    populated: () => ({
      include: [{
        model: db.model('story'),
        attributes: {exclude: ['paragraphs']}
      }]
    })
  }
});

module.exports = User;
