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
 * Check message for matching regexes.
 * @param {Array} regexp Regex strings to check
 * @param {string} text Text from message
 * @returns {Array} Matched regexes in message text.
 */
function matchRegexes (regexp, text) {
  let matches = []
  if (regexp.isArray) {
    regexp.forEach(r => {
      matches = [...matches, ...text.match(r).slice(1)]
    })
  } else {
    matches = text.match(regexp).slice(1)
  }

  return matches
}

module.exports = matchRegexes
