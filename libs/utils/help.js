const config = require('../../config.json')

let commands = {default: 'Unknown command'}

/**
 * Documents a bot command.
 * @param {Object} entry The command's help information
 * @returns {void}
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
 * Creates the padding after each command based on length.
 * @param {string} str Command name to compare to
 * @returns {string} Padded string
 */
function pad(str) {
  let length = 0

  for (const c in commands) {
    if (c !== 'default' && commands[c].name.length > length - 2) {
      length = commands[c].name.length + 2
    }
  }

  let pad = Array(length).join(' ')

  return (str + pad).substring(0, pad.length)
}

exports.pad = pad

/**
 * Lists commands as documented in each module.
 * @returns {string} List of commands
 */
function getCommands() {
  let pjson = require('../../package.json')

  let list = '\`\`\`\n'
  for (const c in commands) {
    if (c !== 'default' && !commands[c].hidden) {
      list += `${pad(commands[c].name+':')}` +
              ` ${commands[c].use}\n`
    }
  }

  return list + `\nPhantBot Version ${pjson.version}\n\`\`\``
}

/**
 * Fetches help for given command.
 * @param {string} c The command for which help information is obtained
 * @param {Object} config The bot's config
 * @returns {string} Help for specified command
 */
function getCommandHelp(c, config) {
  if (Object.keys(commands).includes(c)) {
    let begin = `\`\`\`${commands[c].name}:` +
                ` ${commands[c].use}\n\n`
    let end = `usage: ${config.bot.prefix}${commands[c].name}` +
              ` ${commands[c].syntax}\`\`\``

    if (commands[c].onlySyntax) {
      return begin +
        `usage: ${commands[c].syntax}\`\`\``
    } else {
      return begin + end
    }
  } else {
    return `${commands.default} ${c}.`
  }
}

/**
 * Module to show help information for bot commands.
 * @param {Message} message The message that triggered this command
 * @param {string} suffix The part of the message after the bot's prefix
 * @returns {void}
 */
exports.send = (message, suffix) => {
  if (suffix === 'help') {
    message.channel.send(getCommands())
  } else {
    message.channel.send(getCommandHelp(suffix.substring(5), config))
  }
}
