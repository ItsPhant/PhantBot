const Help = require('./help.js')

Help.document({
  name:   'spoiler',
  use:    'Hide text in a gif (desktop only)',
  syntax: '/o<topic>:spoiler:<content>',
  onlySyntax: true
})

/**
 * Module to show help for spoiler command.
 * @param {Message} message The message that triggered this command
 */
exports.send = message => {
  message.channel.send('```\n<topic>:spoiler:<content>\n```')
}
