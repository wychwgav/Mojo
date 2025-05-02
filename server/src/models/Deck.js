const db = require('../db/config');
const { DataTypes } = require('sequelize');

const Deck = db.define('Deck', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  xp: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Deck;