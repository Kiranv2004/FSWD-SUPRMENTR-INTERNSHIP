const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');

const usersFilePath = path.join(__dirname, '..', 'data', 'users.json');

class User {
  static async getAll() {
    try {
      const raw = await fs.readFile(usersFilePath, 'utf-8');
      return JSON.parse(raw);
    } catch (error) {
      if (error.code === 'ENOENT') {
        return [];
      }
      throw error;
    }
  }

  static async saveAll(users) {
    const dir = path.dirname(usersFilePath);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));
  }

  static async findByEmail(email) {
    const users = await User.getAll();
    return users.find((user) => user.email === email.toLowerCase()) || null;
  }

  static async create({ fullName, email, passwordHash }) {
    const users = await User.getAll();
    const newUser = {
      id: crypto.randomUUID(),
      fullName,
      email: email.toLowerCase(),
      passwordHash,
      createdAt: new Date().toISOString(),
      emailVerified: false
    };

    users.push(newUser);
    await User.saveAll(users);

    return newUser;
  }
}

module.exports = User;
