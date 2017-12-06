const config = require('../../config.json')

var commands = { default: 'Unknown command' }

function document(entry) {
  commands[entry.name] = entry
}

exports.document = document

document({
  name:   'help',
  use:    'Display this message, or help for a command.',
  syntax: '[command]'
})

exports.send = (message, msg) => {
  message.channel.send(parseMessage(msg))
}

function parseMessage(message) {
  if (message === 'help')
    return getCommands()
  else
    return getCommandHelp(message.substring(5), config)
}

exports.parseMessage = parseMessage

function getCommands() {
  let pjson = require('../../package.json')

  var list = '\`\`\`\n'
  for(var c in commands) {
    if(c !== 'default' && !commands[c].name.startsWith('/h'))
      list += `${pad(commands[c].name+':')}` +
              ` ${commands[c].use}\n`
  }

  return list + `\nPhantBot Version ${pjson.version}\n\`\`\``
}

exports.getCommands = getCommands

function pad(str) {
  let length = 0

  for(var c in commands)
    if(c !== 'default' &&
       commands[c].name.length > length - 2)
      length = commands[c].name.length + 2

  let pad = Array(length).join(' ')

  return (str + pad).substring(0, pad.length);
}

exports.pad = pad

function getCommandHelp(c, config) {
  if (Object.keys(commands).includes(c)) {
    let begin = `\`\`\`${commands[c].name}:` +
                ` ${commands[c].use}\n\n`
    let end = `usage: ${config.bot.prefix}${commands[c].name}` +
              ` ${commands[c].syntax}\`\`\``

    if (commands[c].syntax.startsWith('/o'))
      return begin + 
        `usage: ${commands[c].syntax.substring(2)}\`\`\``
    else if (commands[c].name.startsWith('/h'))
      return `\`\`\`${commands[c].name.substring(2)}:` +
             ` ${commands[c].use}\n\n${end}`
    else
      return begin + end
  } else {
    return `${commands.default} ${c}.`
  }
}

exports.getCommandHelp = getCommandHelp
