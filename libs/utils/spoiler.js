const Help = require('./help.js')

Help.document({
  name:   'spoiler',
  use:    'Hide text in a gif (desktop only)',
  syntax: '/o<topic>:spoiler:<content>'
})

exports.send = message => {
  message.channel.send('```\n<topic>:spoiler:<content>\n```')
}
