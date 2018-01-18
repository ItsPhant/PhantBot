/**
 * PhantBot is a free multipurpose bot made for Discord.
 * Copyright (C) 2017  Ellie Phant
 *
 * PhantBot is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * PhantBot is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with PhantBot.  If not, see <https://www.gnu.org/licenses/>.
 */

const config = require('../../config.json')

let commands = {default: 'Unknown command'}

/**
 * Documents a bot command.
 * @param {Object} entry The command's help information
 * @returns {void}
 */
function document (entry) {
  commands[entry.name] = entry
}

exports.document = document

document({
  name: 'help',
  use: 'Display this message, or help for a command.',
  syntax: '[command]',
  type: 'service'
})

/**
 * Creates the padding after each command based on length.
 * @param {string} str Command name to compare to
 * @returns {string} Padded string
 */
function pad (str) {
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

function sortCommands (commands) {
  return commands.split('\n').sort().join('\n')
}

/**
 * Lists commands as documented in each module.
 * @returns {string} List of commands
 */
function getCommands () {
  let pjson = require('../../package.json')

  let list = {
    moderation: '',
    service: '',
    other: ''
  }

  for (const c in commands) {
    if (c !== 'default' && !commands[c].hidden) {
      let entry = `${pad(commands[c].name + ':')}` +
                  ` ${commands[c].use}\n`

      switch (commands[c].type) {
        case 'service':
          list.service += entry
          break
        case 'moderation':
          list.moderation += entry
          break
        default:
          list.other += entry
      }
    }
  }

  list.forEach(entry => sortCommands(entry))

  let output = '```\n' +
    `Service Commands:\n\n ${list.service}\n` +
    `Moderation Commands:\n\n ${list.moderation}\n` +
    list.other === '' ? '' : `Other Commands:\n\n ${list.other}` +
    `\n\nPhantBot Version ${pjson.version}\n\`\`\``

  return output
}

/**
 * Fetches help for given command.
 * @param {string} c The command for which help information is obtained
 * @param {Object} config The bot's config
 * @returns {string} Help for specified command
 */
function getCommandHelp (c, config) {
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
