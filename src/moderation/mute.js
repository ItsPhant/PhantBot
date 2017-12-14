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

/**
 * Module to mute given user.
 * @param {Message} message The message that triggered this command
 * @returns {void}
 */
exports.muteUser = message => {
  let re = /<@!*(\d+)/g
  let id = re.exec(message.content.substring(5))[1]
  if (id) {
    guild.roles.forEach((value, key) => {
      if (value.name === 'mute' || value.name === 'muted') {
        guild.members.get(id).addRole(key)
      } else {
        message.channel.send('Unable to find mute role (incorrect name).')
      }
    })
  } else {
    message.channel.send('No user was mentioned.')
  }
}
