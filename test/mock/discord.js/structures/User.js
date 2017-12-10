/**
 * Represents a user on Discord.
 */
class User {
  constructor(id) {
    if (id !== undefined)
      this.id = id
    else
      this.id = '1234567890'
  }
}

module.exports = User
