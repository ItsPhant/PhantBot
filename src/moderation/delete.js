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

/**
 * Delete message.
 * @param {Object} filter Content filter object
 * @param {Message} message Message that had a match
 * @returns {void}
 */
function deleteMessage (filter, message) {
  message.channel.send(formatConfigString(
    message.content, message.author, message.channel))
  message.delete()
}

exports.Delete = deleteMessage
