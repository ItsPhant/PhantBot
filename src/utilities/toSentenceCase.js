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
 * Applies sentence case to string.
 * @param {string} string String to apply case to
 * @returns {string} Sentence cased string
 */
module.exports = function toSentenceCase(string) {
  if (!string) {
    return 'Error parsing string.'
  }

  string = string.toLowerCase()
  let rg = /(^\w{1}|\.\s*\w{1})/gi
  return string.replace(rg, function filter(toReplace) {
    return toReplace.toUpperCase()
  })
}
