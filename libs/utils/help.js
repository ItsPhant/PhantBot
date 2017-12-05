var commands = { default: 'Unknown command' }

exports.document = document

function document(entry) {
  commands[entry.name] = entry
}

document({
  name:   'help',
  use:    'Display this message, or help for a command.',
  syntax: '[command]'
})

exports.send = (message, msg, config) => {
  if (msg === 'help') {
    message.channel.send(getCommands())
  } else {
    message.channel.send(getCommandHelp(msg.substring(5), config))
  }
}

function getCommands() {
  let pjson = require('../package.json')

  var list = '\`\`\`\n'
  Object.keys(commands).sort().forEach((element) => {
    if(element !== 'default' && !commands[element][0].startsWith('/h'))
      list += `${pad(commands[element][0]+':')} ${commands[element][1]}\n`
  })
  return list + `\nPhantBot Version ${pjson.version}\n\`\`\``
}

exports.getCommands = getCommands

function pad(str) {
  let length = 0

  for(var command in commands)
    if(commands[command].name.length > length - 2)
      length = commands[command].name.length + 2

  let pad = Array(length).join(' ')

  return (str + pad).substring(0, pad.length);
}

function getCommandHelp(command, config) {
  if (Object.keys(commands).includes(command)) {
    let begin = `\`\`\`${commands[command][0]}: ${commands[command][1]}\n\n`
    let end = `usage: ${config.bot.prefix}${commands[command][0]} ${commands[command][2]}\`\`\``

    if (commands[command][2].startsWith('/o'))
      return begin + `usage: ${commands[command][2].substring(2)}\`\`\``
    else if (commands[command][0].startsWith('/h'))
      return `\`\`\`${commands[command][0].substring(2)}: ${commands[command][1]}\n\n${end}`
    else
      return begin + end
  } else {
    return `${commands.default} ${command}.`
  }
}

exports.getCommandHelp = getCommandHelp
