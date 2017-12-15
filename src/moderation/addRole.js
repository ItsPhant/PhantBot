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
 * @returns {void}
 */
function addRole(user, roles) {
  if (roles.isArray) {
    for (const role in roles) {
      try {
        guildMembers[user].addRole(role)
      } catch (e) {
        console.error(`Error assigning role ${role}: ${e.message}`)
      }
    }
  } else {
    try {
      guildMembers[user].addRole(roles)
    } catch (e) {
      console.error(`Error assigning role ${roles}: ${e.message}`)
    }
  }
}

exports.AddRole = addRole
