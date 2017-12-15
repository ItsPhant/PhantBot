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
 * Substitutes variable markup in string with values.
 * @param {Object} string String to replace text in
 * @param {User} author Author to use for substitution
 * @param {Channel} channel Channel to use for substitution
 * @returns {string} String with replaced variables.
 */
function formatConfigString(string, author, channel) {
  string = string
    .replace('<Author>',`<@${author.id}>`)
    .replace('<author>',`${author.username}`)
    .replace('<channel>',`${channel.name}`)
    .replace('\\<', '<')
    .replace('\\>', '>')

  return string
}

module.exports = formatConfigString
