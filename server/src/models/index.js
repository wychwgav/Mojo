const User = require('./User');
const Deck = require('./Deck');
const Card = require('./Card');
const Attack = require('./Attack');

User.hasOne(Deck)
Deck.belongsTo(User)

Deck.hasMany(Card)
Card.belongsTo(Deck)

Card.belongsTo(Attack, { through: `CardAttacks`})
Attack.belongsToMany(Card, { through: `CardAttacks`})

module.exports = { User, Deck, Card, Attack };