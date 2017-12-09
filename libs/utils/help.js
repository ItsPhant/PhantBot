const config = require('../../config.json')

var commands = { default: 'Unknown command' }

/**
 * Documents a bot command.
 * @param {Object} entry The command's help information
 */
function document(entry) {
  commands[entry.name] = entry
}

exports.document = document

document({
  name:   'help',
  use:    'Display this message, or help for a command.',
  syntax: '[command]'
})

/**
 * Module to show help information for bot commands.
 * @param {Message} message The message that triggered this command
 * @param {string} suffix The part of the message after the bot's prefix
 */
exports.send = (message, suffix) => {
  if (suffix === 'help')
    message.channel.send(getCommands())
  else
    message.channel.send(getCommandHelp(suffix.substring(5), config))
}

/**
 * Lists commands as documented in each module.
 * @returns {string}
 */
function getCommands() {
  let pjson = require('../../package.json')

  var list = '\`\`\`\n'
  for(var c in commands) {
    if(c !== 'default' && !commands[c].hidden)
      list += `${pad(commands[c].name+':')}` +
              ` ${commands[c].use}\n`
  }

  return list + `\nPhantBot Version ${pjson.version}\n\`\`\``
}

/**
 * Creates the padding after each command based on length.
 * @param {string} str Command name to compare to
 */
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

/**
 * Fetches help for given command.
 * @param {string} c The command for which help information is obtained
 * @param {Object} config The bot's config
 * @returns {string}
 */
function getCommandHelp(c, config) {
  if (Object.keys(commands).includes(c)) {
    let begin = `\`\`\`${commands[c].name}:` +
                ` ${commands[c].use}\n\n`
    let end = `usage: ${config.bot.prefix}${commands[c].name}` +
              ` ${commands[c].syntax}\`\`\``

    if (commands[c].onlySyntax)
      return begin + 
        `usage: ${commands[c].syntax}\`\`\``
    else
      return begin + end
  } else {
    return `${commands.default} ${c}.`
  }
}
