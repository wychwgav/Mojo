const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals');
const db = require('../db/config');
const { User, Deck, Card, Attack } = require('./index');

beforeAll(async () => {
  await db.sync({ force: true });
});
afterAll(async () => {
  await db.close();
});

describe('Model Associations', () => {
  it('User can be loaded with its Deck', async () => {
    const user = await User.create({ username: 'alice' });
    const deck = await Deck.create({ name: 'Alice Deck', xp: 10, userId: user.id });

    const userWithDeck = await User.findOne({ where: { id: user.id }, include: Deck });
    expect(userWithDeck.Deck).toBeDefined();
    expect(userWithDeck.Deck.name).toBe('Alice Deck');
  });

  it('Deck can be loaded with its Cards', async () => {
    const deck = await Deck.create({ name: 'Battle', xp: 20 });
    await Card.create({ name: 'Orc', mojo: 5, stamina: 2, imgURL: 'orc.png', deckId: deck.id });
    await Card.create({ name: 'Elf', mojo: 7, stamina: 3, imgURL: 'elf.png', deckId: deck.id });

    const deckWithCards = await Deck.findOne({ where: { id: deck.id }, include: Card });
    expect(deckWithCards.Cards.length).toBe(2);
    expect(deckWithCards.Cards[0].name).toBeDefined();
  });

  it('Cards can be loaded with their Attacks', async () => {
    const card = await Card.create({ name: 'Mage', mojo: 10, stamina: 8, imgURL: 'mage.png' });
    const attack1 = await Attack.create({ title: 'Fireball', mojoCost: 3, stamina: 2 });
    const attack2 = await Attack.create({ title: 'Ice Shard', mojoCost: 2, stamina: 1 });

    await card.addAttack(attack1);
    await card.addAttack(attack2);

    const cardWithAttacks = await Card.findOne({ where: { id: card.id }, include: Attack });
    expect(cardWithAttacks.Attacks.length).toBe(2);
    expect(cardWithAttacks.Attacks[0].title).toBeDefined();
  });
});