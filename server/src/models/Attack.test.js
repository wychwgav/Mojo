const { describe, it, expect, beforeAll, afterAll } = require('@jest/globals');
const Attack = require('./Attack');
const db = require('../db/config');

beforeAll(async () => {
  await db.sync({ force: true });
});

afterAll(async () => {
  await db.close();
});

describe('Attack', () => {
  it('creates an Attack with all required fields', async () => {
    const attack = await Attack.create({
      title: 'Fireball',
      mojoCost: 10,
      stamina: 5
    });
    expect(attack).toHaveProperty('id');
    expect(attack.title).toBe('Fireball');
    expect(attack.mojoCost).toBe(10);
    expect(attack.stamina).toBe(5);
  });

  it('throws an error if title is missing', async () => {
    await expect(
      Attack.create({ mojoCost: 10, stamina: 5 })
    ).rejects.toThrow();
  });

  it('throws an error if mojoCost is missing', async () => {
    await expect(
      Attack.create({ title: 'Fireball', stamina: 5 })
    ).rejects.toThrow();
  });

  it('throws an error if stamina is missing', async () => {
    await expect(
      Attack.create({ title: 'Fireball', mojoCost: 10 })
    ).rejects.toThrow();
  });

  it('throws an error if mojoCost is not an integer', async () => {
    await expect(
      Attack.create({ title: 'Fireball', mojoCost: 'ten', stamina: 5 })
    ).rejects.toThrow();
  });

  it('throws an error if stamina is not an integer', async () => {
    await expect(
      Attack.create({ title: 'Fireball', mojoCost: 10, stamina: 'five' })
    ).rejects.toThrow();
  });

  it('auto-increments id', async () => {
    const attack1 = await Attack.create({ title: 'Slash', mojoCost: 2, stamina: 1 });
    const attack2 = await Attack.create({ title: 'Bash', mojoCost: 3, stamina: 1 });
    expect(attack2.id).toBe(attack1.id + 1);
  });

  it('does not allow negative mojoCost', async () => {
    await expect(
      Attack.create({ title: 'Curse', mojoCost: -1, stamina: 2 })
    ).rejects.toThrow();
  });

  it('does not allow blank titles', async () => {
    await expect(
      Attack.create({ title: '', mojoCost: 1, stamina: 1 })
    ).rejects.toThrow();
  });
});