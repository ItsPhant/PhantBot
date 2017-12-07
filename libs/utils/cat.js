const Help = require('./help.js')

Help.document({
  name:   '/hcat',
  use:    'Repeats and deletes original message.',
  syntax: '<message>',
  hidden: true
})

exports.send = (message, suffix) => {
  message.channel.send(suffix.substring(4))
  message.delete()
}
