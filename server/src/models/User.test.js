const { describe, it, expect, beforeAll, afterAll } = require("@jest/globals");
const { User } = require(".");
const db = require("../db/config");

// clear db before tests
beforeAll(async () => {
  await db.sync({ force: true });
});

// close db after tests
afterAll(async () => {
  await db.close();
});

describe('User', () => {
  it('has an id', async () => {
    const user = await User.create({ username: 'gandalf' });
    expect(user).toHaveProperty('id');
  });

  it('has the correct username', async () => {
    const user = await User.create({ username: 'gandalf' });
    expect(user.username).toBe('gandalf');
  });

  it('throws an error if username is missing', async () => {
    await expect(User.create({})).rejects.toThrow();
  });

  it('auto-increments id', async () => {
    const user1 = await User.create({ username: 'frodo' });
    const user2 = await User.create({ username: 'sam' });
    expect(user2.id).toBe(user1.id + 1);
  });

  it('does not allow duplicate usernames', async () => {
    await User.create({ username: 'gandalf' });
    await expect(User.create({ username: 'gandalf' })).rejects.toThrow();
  });

  it('rejects non-string usernames', async () => {
    await expect(User.create({ username: 12345 })).rejects.toThrow();
  });
});




