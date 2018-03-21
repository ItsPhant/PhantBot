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

const Help = require('../../services/help')
const _config = require('./config')
const caseInsensitiveFind = require('../../utilities/caseInsensitiveFind')

Help.document({
  name: 'addRank',
  use: 'Make role available for users.',
  syntax: ''
})

module.exports = (message, suffix, config, client) => {
  let guild = message.guild
  let botMember = guild.members.get(client.user.id)
  let userMember = message.member
  let roleName = message.content.split(' ').slice(2).join(' ')
  let guilds = _config.get(true)

  if (userMember.hasPermission('MANAGE_ROLES', false, true, true)) {
    if (botMember.hasPermission('MANAGE_ROLES', false, true, true)) {
      try {
        let role = caseInsensitiveFind(guild.roles, 'name', roleName)
        if (guilds.list[guild.id].includes(role.id)) {
          message.channel.send('Rank already added.')
        } else {
          guilds.list[guild.id].push(role.id)
          _config.write(guilds)
          message.channel.send('Rank successfully added.')
        }
      } catch (ex) {
        message.channel.send('Error adding rank.')
      }
    } else {
      message.channel.send('PhantBot lacks the "Manage Roles" permission.')
    }
  } else {
    message.channel.send('You lack permission for this.')
  }
}
