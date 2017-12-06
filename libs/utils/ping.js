const Help = require('./help.js')

Help.document({
  name:   'ping',
  use:    'Pong!',
  syntax: ''
})

exports.send = message => {
  message.channel.send(`pong! (${client.ping}ms)`)
}
