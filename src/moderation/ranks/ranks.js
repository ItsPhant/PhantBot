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
const Discord = require('discord.js')
const pad = require('../../utilities/pad')
const _config = require('./config')

Help.document({
  name: 'ranks',
  use: 'List available ranks.',
  syntax: ''
})

function membersWithRole (guild, roleid) {
  return guild.members.filter(member => {
    return member.roles.has(roleid)
  }).size
}

function getList (guild, roles) {
  let list = []
  let nameLength = 2
  let countDigits = 1
  roles.forEach(role => {
    let roleName = guild.roles.get(role).name
    let roleLength = roleName.length
    if (roleLength > nameLength) {
      nameLength = roleLength
    }

    let memberCount = membersWithRole(guild, role)
    let digits = memberCount.toString().length
    if (digits > countDigits) {
      countDigits = digits
    }

    list.push({roleName, memberCount})
  })

  return list.map(item => {
    return '`' + pad(item.roleName, nameLength + 2) +
           pad(item.memberCount, countDigits + 2) + 'members`\n'
  })
}

function makeList (guild, roles, embed) {
  let list = getList(guild, roles)
  let limit = 2048
  let title = '\u200B' // Blank unicode character

  while (list.length !== 0) {
    let content = ''
    let full = false
    while (!full) {
      let item = list.shift()
      if (item === undefined) {
        break
      }

      if (content.length + item.length > limit) {
        list.unshift(item)
        full = true
        break
      }
      content += item
    }

    if (limit === 2048) {
      embed.description = content
      limit = 1024
    } else {
      embed.addField(title, content, false)
    }
  }
}

module.exports = (message, suffix, config) => {
  let guild = message.guild
  let roles = []
  let guilds = _config.get(true)
  if (guilds.list.hasOwnProperty(guild.id)) {
    roles = guilds.list[message.guild.id]
  } else {
    guilds.list[guild.id] = []
    _config.write(guilds)
  }

  if (roles.length === 0) {
    message.channel.send('No ranks available.')
  } else {
    let embed = new Discord.RichEmbed()
      .setColor(0xbdb727)
      .setFooter(`Use the ${config.bot.prefix} rank command to join a rank`)
      .setTitle('Ranks')

    makeList(guild, roles, embed)

    message.channel.send('', embed)
  }
}
