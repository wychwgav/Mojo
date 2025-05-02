const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals');
const Deck = require('./Deck');
const db = require('../db/config');

beforeAll(async () => { await db.sync({ force: true }); });
afterAll(async () => { await db.close(); });

describe('Deck', () => {
  it('creates a Deck with all fields', async () => {
    const deck = await Deck.create({ name: 'Starter', xp: 100 });
    expect(deck).toHaveProperty('id');
    expect(deck.name).toBe('Starter');
    expect(deck.xp).toBe(100);
  });

  it('throws an error if name is missing', async () => {
    await expect(Deck.create({ xp: 50 })).rejects.toThrow();
  });

  it('throws an error if xp is missing', async () => {
    await expect(Deck.create({ name: 'Advanced' })).rejects.toThrow();
  });

  it('throws an error if xp is not an integer', async () => {
    await expect(Deck.create({ name: 'Advanced', xp: 'a lot' })).rejects.toThrow();
  });

  it('auto-increments id', async () => {
    const deck1 = await Deck.create({ name: 'Novice', xp: 10 });
    const deck2 = await Deck.create({ name: 'Expert', xp: 20 });
    expect(deck2.id).toBe(deck1.id + 1);
  });
});