/**
 * Represents a guild text channel on Discord.
 */
class Channel {
  constructor(id, name) {
    if (id !== undefined)
      this.id = id
    else
      this.id = '123456789'

    if (name !== undefined)
      this.name = name
    else
      this.name = 'Mock Channel'
    this.result = '' 
  }

  send(content) {
    this.result = content
  }
}

module.exports = Channel
