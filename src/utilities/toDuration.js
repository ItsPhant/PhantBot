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

const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const DAY = 24 * HOUR
const MONTH = 30.4375 * DAY

/**
 * Converts filter's length of time to milliseconds.
 * @param {Object} time Time object from filter settings
 * @returns {Number} Milliseconds the time is equal to.
 */
function toDuration (time) {
  let months = 0
  let days = 0
  let hours = 0
  let minutes = 0
  let seconds = 0
  let milliseconds = 0

  try {
    ({months, days, hours, minutes, seconds, milliseconds} = time)
  } catch (e) {
    console.log(`Error: ${e.message}`)
  }

  let length = months * MONTH +
               days * DAY +
               hours * HOUR +
               minutes * MINUTE +
               seconds * SECOND +
               milliseconds

  return length
}

module.exports = toDuration
