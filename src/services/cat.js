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

const Help = require('./help.js')

Help.document({
  name: '/hcat',
  use: 'Repeats and deletes original message.',
  syntax: '<message>',
  type: 'service',
  hidden: true
})

/**
 * Module for repeating user messages.
 * @param {Message} message The message that triggered this command
 * @param {string} suffix The part of the message after the bot's prefix
 * @returns {void}
 */
exports.send = (message, suffix) => {
  message.channel.send(suffix.substring(4))
  message.delete()
}
