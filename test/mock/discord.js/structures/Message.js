const Channel = require('./Channel')
const User = require('./User')

/**
 * Represents a message on Discord.
 */
class Message {
  constructor(content) {
    this.channel = new Channel()
    this.content = content
    this.author = new User()
  }

  delete() {
    return 0;
  }
}

module.exports = Message
