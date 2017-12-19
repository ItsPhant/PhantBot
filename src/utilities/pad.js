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
 * Adds padding to string
 * @param {string} word String to pad
 * @param {Number} length Length of pad
 * @param {string} character Character to pad with
 * @returns {string} Padded string
 */
module.exports = function pad (word, length, character) {
  if (word === undefined) {
    return
  }

  if (length === undefined) {
    return word
  }

  if (character === undefined) {
    character = ' '
  }

  let pad = Array(length).join(character)

  return (word + pad).substring(0, pad.length)
}
