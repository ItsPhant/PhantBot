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

const formatConfigString = require('../utilities/formatConfigString')
const addRole = require('./role').addRole
const toDuration = require('../utilities/toDuration')
const Help = require('../services/help')

Help.document({
  name: 'mute',
  use: 'Mute user.',
  syntax: '<user> [reason]',
  type: 'moderation'
})

/**
 * Mutes user given in command.
 * @param {Message} message The message that triggered this command
 * @returns {void}
 */
function muteUser (message, suffix, reason) {
  let re = /<@!*(\d+)/g
  let id = re.exec(suffix.substring(5))[1]
  let guild = message.author.guild
  if (id) {
    guild.roles.forEach((value, key) => {
      if (value.name === 'mute' || value.name === 'muted') {
        guild.members.get(id).addRole(key)
        if (reason === '') {
          message.channel.send(`<@!${id}>, you have been muted by ` +
                               `<@!${message.author.id}> for ${reason}.`)
        } else {
          message.channel.send(`<@!${id}>, you have been muted by ` +
                               `<@!${message.author.id}>.`)
        }
      } else {
        message.channel.send('Unable to find mute role.')
      }
    })
  } else {
    message.channel.send('No user was mentioned.')
  }
}

/**
 * Mute user that sent message.
 * @param {Object} filter Content filter object
 * @param {Message} message Message that had a match
 * @returns {void}
 */
function mute (filter, message) {
  message.channel.send(formatConfigString(
    message.content, message.author, message.channel))

  let duration
  try {
    duration = toDuration(filter.punishments.muteTime)
  } catch (e) {
    duration = 0
  }

  if (filter.onMatch.mute.assignRole) {
    addRole(message.author, filter.onMatch.mute.assignRole)
  } else {
    // Try detecting mute role
  }

  if (duration !== 0) {
    // Store date for unmute
  }
}

/**
 * Mute mentioned user.
 * @param {Message} message Message to respond to
 * @param {string} suffix Command without prefix
 * @returns {void}
 */
function send (message, suffix) {
  let parts = suffix.split(' ')
  let reason = ''

  if (parts[2]) {
    reason = parts.slice(2).join(' ')
  }

  muteUser(message, suffix, reason)
}

module.exports = {
  MuteUser: muteUser,
  Mute: mute,
  send: send
}
