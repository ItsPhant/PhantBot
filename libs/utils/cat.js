const Help = require('./help.js')

Help.document({
  name:   '/hcat',
  use:    'Repeats and deletes original message.',
  syntax: '<message>',
  hidden: true
})

/**
 * Module for repeating user messages.
 * @param {Message} message The message that triggered this command
 * @param {string} suffix The part of the message after the bot's prefix
 */
exports.send = (message, suffix) => {
  message.channel.send(suffix.substring(4))
  message.delete()
}
