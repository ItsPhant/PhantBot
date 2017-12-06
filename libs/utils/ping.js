const Help = require('./help.js')

Help.document({
  name:   'ping',
  use:    'Pong!',
  syntax: ''
})

exports.send = (message, client) => {
  message.channel.send(`pong! (${client.ping}ms)`)
}
