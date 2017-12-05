const Help = require('./help.js')

Help.document({
  name:   '/hcat',
  use:    'Repeats and deletes original message.',
  syntax: '<message>'
})

exports.send = (Msg, message) => {
  message.channel.send(Msg.substring(4))
  message.delete()
}
