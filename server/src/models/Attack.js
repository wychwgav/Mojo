const db = require('../db/config');
const { DataTypes } = require('sequelize');

const Attack = db.define('Attack', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  mojoCost: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  stamina: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Attack;