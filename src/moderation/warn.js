/**
 * PhantBot is a free multipurpose bot made for Discord.
 * Copyright (C) 2018  Ellie Phant
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

const Help = require('../services/help')

Help.document({
  name: 'warn',
  use: 'Warn user for something.',
  syntax: '<user> [reason]',
  type: 'moderation'
})

const formatConfigString = require('../utilities/formatConfigString')

/**
 * Send warning for action.
 * @param {Object} filter Content filter object
 * @param {Message} message Message that had a match
 * @returns {void}
 */
function warn (filter, message) {
  message.channel.send(formatConfigString(
    message.content, message.author, message.channel))
}

/**
 * Warn mentioned user.
 * @param {Message} message Message to respond to
 * @param {string} suffix Command without prefix
 * @returns {void}
 */
function send (message, suffix) {
  let parts = suffix.split(' ')
  let mention = parts[1]
  let reason = ''

  if (parts[2]) {
    reason = parts.slice(2).join(' ')
  }

  if (reason !== '') {
    message.channel.send(`${mention}, you have been warned by ` +
                         `<@!${message.author.id}> for ${reason}.`)
  } else {
    message.channel.send(`${mention}, you have been warned by ` +
                         `<@!${message.author.id}>.`)
  }
}

module.exports = {
  Warn: warn,
  send: send
}
