const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals');
const Card = require('./Card');
const db = require('../db/config');

beforeAll(async () => { await db.sync({ force: true }); });
afterAll(async () => { await db.close(); });

describe('Card', () => {
  it('creates a Card with all fields', async () => {
    const card = await Card.create({
      name: 'Dragon',
      mojo: 20,
      stamina: 15,
      imgURL: 'http://example.com/dragon.png'
    });
    expect(card).toHaveProperty('id');
    expect(card.name).toBe('Dragon');
    expect(card.mojo).toBe(20);
    expect(card.stamina).toBe(15);
    expect(card.imgURL).toBe('http://example.com/dragon.png');
  });

  it('throws an error if name is missing', async () => {
    await expect(Card.create({ mojo: 20, stamina: 15, imgURL: 'img.png' })).rejects.toThrow();
  });

  it('throws an error if mojo is not an integer', async () => {
    await expect(Card.create({ name: 'Elf', mojo: 'twenty', stamina: 15, imgURL: 'img.png' })).rejects.toThrow();
  });

  it('throws an error if imgURL is missing', async () => {
    await expect(Card.create({ name: 'Knight', mojo: 10, stamina: 10 })).rejects.toThrow();
  });

  it('auto-increments id', async () => {
    const card1 = await Card.create({ name: 'Goblin', mojo: 5, stamina: 3, imgURL: 'goblin.png' });
    const card2 = await Card.create({ name: 'Orc', mojo: 6, stamina: 4, imgURL: 'orc.png' });
    expect(card2.id).toBe(card1.id + 1);
  });
});