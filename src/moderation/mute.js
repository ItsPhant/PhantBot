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

const formatConfigString = require('../utilities/formatConfigString')

/**
 * Mutes user given in command.
 * @param {Message} message The message that triggered this command
 * @returns {void}
 */
function muteUser(message) {
  let re = /<@!*(\d+)/g
  let id = re.exec(message.content.substring(5))[1]
  if (id) {
    guild.roles.forEach((value, key) => {
      if (value.name === 'mute' || value.name === 'muted') {
        guild.members.get(id).addRole(key)
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
function mute(filter, message) {
  message.channel.send(formatConfigString(
    message.content, message.author, message.channel))

  let duration
  try {
    duration = toDuration(filter.punishments.muteTime)
  } catch (e) {
    duration = 0
  }

  if (filter.onMatch.mute.assignRole) {
    addRoleArray(filter.onMatch.mute.assignRole)
  } else {
    // Try detecting mute role
  }

  if (duration !== 0) {
    // Store date for unmute
  }
}

module.exports = {
  MuteUser: muteUser,
  Mute: mute
}
