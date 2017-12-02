const commands = {
  define:        [ 'define', 'Define a word using the Pearson english dictionary.', '<word>' ],
  help:          [ 'help', 'Display this message, or help for a command.', '[command]' ],
  nationalday:   [ 'nationalday', 'Display today\'s "National Days".', ''],
  ping:          [ 'ping', 'Pong!', ''],
  spoiler:       [ 'spoiler', 'Hide text in a gif (desktop only)', '/o<topic>:spoiler:<content>'],
  bechdel:       [ 'bechdel', 'Gets the Bechdel Test score for a movie.', '<movie>'],
  obscuresorrow: [ 'obscuresorrow', 'Get a random entry from the Dictionary of Obscure Sorrows.', ''],
  cat:           [ '/hcat', 'repeats and deletes original message', '<message>'],
  default: 'Unknown command'
}

exports.getCommands = () => {
  let pjson = require('../package.json')

  var list = '\`\`\`\n'
  Object.keys(commands).sort().forEach((element) => {
    if(element !== 'default' && !commands[element][0].startsWith('/h'))
      list += `${pad(commands[element][0]+':')} ${commands[element][1]}\n`
  })
  return list + `\nPhantBot Version ${pjson.version}\n\`\`\``
}

function pad(str) {
  let length = 0

  for(const prop in commands)
    if(commands[prop][0].length > length - 2)
      length = commands[prop][0].length + 2

  let pad = Array(length).join(' ')

  return (str + pad).substring(0, pad.length);
}

exports.getCommandHelp = (command, config) => {
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
