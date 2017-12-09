const Help = require('./help.js')

Help.document({
  name:   'ping',
  use:    'Pong!',
  syntax: ''
})

/**
 * Module for getting bot's connection ping.
 * @param {Message} message The message that triggered this command
 * @param {string} suffix The part of the message after the bot's prefix
 * @param {Object} config The bot's config
 * @param {Client} client The bot's Discord client
 */
exports.send = (message, suffix, config, client) => {
  message.channel.send(`pong! (${Math.floor(client.ping)}ms)`)
}
