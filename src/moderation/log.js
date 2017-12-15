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

const Discord = require('discord.js')
const formatConfigString = require('../utilities/formatConfigString')

/**
 * Send log for action.
 * @param {Object} filter Content filter object
 * @param {Message} message Message that had a match
 * @returns {void}
 */
function log(filter, message) {
  message.channel.send(formatConfigString(
    message.content, message.author, message.channel))

  let channel = new Discord.Channel(settings.logChannel)
  channel.send(`Rule ${rule} triggered in ${message.channel} by ` +
               `${message.author.name} with message: ${message.content}`)

}

exports.Log = log
