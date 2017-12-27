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
 * Add all roles in role array to user.
 * @param {User} user User to add roles to
 * @param {Object} roles Role ids to add
 * @param {Guild} guild Relevant guild
 * @returns {void}
 */
function addRole (user, roles, guild) {
  try {
    if (roles.isArray) {
      guild.members.get(user.id).addRoles(roles)
    } else {
      guild.members.get(user.id).addRole(roles)
    }
  } catch (e) {
    console.error(`Error assigning role ${roles}: ${e.message}`)
  }
}

/**
 * Add given role to user that sent message.
 * @param {Message} message Message to parse and act on
 * @param {string} prefix The bot's command prefix
 * @returns {void}
 */
function addRoleToSelf (message, prefix) {
  let guild = message.guild
  addRole(message.author,
    guild.roles.get('name', message.content.substring(prefix.length + 5)),
    guild)
}

/**
 * Add given role to given user.
 * @param {Message} message Message to parse and act on
 * @returns {void}
 */
function addRoleToUser (message) {
  let parts = message.content.split(' ')
  let guild = message.guild

  if (parts[2]) {
    let userid = parts[2].match(/<[@!]{1,2}([\d]+)>/)
    if (userid) {
      addRole(userid,
        guild.roles.get('name', parts[1]),
        guild)
    } else {
      message.channel.send(`Could not assign role ${parts[1]} to user.`)
    }
  } else {
    message.channel.send(`Could not assign role ${parts[1]} to user.`)
  }
}

/**
 * Removes all roles in role array from user.
 * @param {User} user User to remove roles from
 * @param {object} roles Role ids to add
 * @param {Guild} guild Relevant guild
 * @returns {void}
 */
function removeRole (user, roles, guild) {
  try {
    if (roles.isArray) {
      guild.members.get(user.id).removeRoles(roles)
    } else {
      guild.members.get(user.id).removeRole(roles)
    }
  } catch (e) {
    console.error(`Error removing role ${roles}: ${e.message}`)
  }
}

/**
 * Remove given role to user that sent message.
 * @param {Message} message Message to parse and act on
 * @param {string} prefix The bot's command prefix
 * @returns {void}
 */
function removeRoleFromSelf (message, prefix) {
  let guild = message.guild
  removeRole(message.author,
    guild.roles.get('name', message.content.substring(prefix.length + 5)),
    guild)
}

/**
 * Remove given role from given user.
 * @param {Message} message Message to parse and act on
 * @returns {void}
 */
function removeRoleFromUser (message) {
  let parts = message.content.split(' ')
  let guild = message.guild

  if (parts[2]) {
    let userid = parts[2].match(/<[@!]{1,2}([\d]+)>/)
    if (userid) {
      removeRole(userid,
        guild.roles.get('name', parts[1]),
        guild)
    } else {
      message.channel.send(`Could not remove role ${parts[1]} from user.`)
    }
  } else {
    message.channel.send(`Could not remove role ${parts[1]} from user.`)
  }
}

module.exports = {
  addRole: addRole,
  addRoleToSelf: addRoleToSelf,
  addRoleToUser: addRoleToUser,
  removeRole: removeRole,
  removeRoleFromSelf: removeRoleFromSelf,
  removeRoleFromUser: removeRoleFromUser
}
