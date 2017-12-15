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

const addRole = require('./addRole').AddRole
const formatConfigString = require('../utilities/formatConfigString')

/**
 * Ban user that sent message.
 * @param {Object} filter Content filter object
 * @param {Message} message Message that had a match
 * @returns {void}
 */
function partialBan(filter, message) {
  message.channel.send(formatConfigString(
    message.content, message.author, message.channel))

  let duration = 0
  try {
    duration = toDuration(filter.punishments.partialBanTime)
  } catch (e) {

  }

  /**
   * Not sure how this would be set up yet, I was thinking it would be to
   * remove from some channels, maybe just the channel the message was from.
   */
  if (filter.onMatch.partialBan.assignRole) {
    addRole(filter.onMatch.partialBan.assignRole)
  } else {
    // Outta luck for now
  }

  if (duration !== 0) {

  }
}

/**
 * Ban user temporarily that sent message.
 * @param {Object} filter Content filter object
 * @param {Message} message Message that had a match
 * @returns {void}
 */
function tempBan(filter, message) {
  sendMatchMessage(filter.onMatch.tempBan, message)
  let duration = 0
  try {
    duration = toDuration(filter.punishments.tempBanTime)
  } catch (e) {

  }

  let days = 0
  if (filter.onMatch.tempBan.days) {
    days = filter.onMatch.tempBan.days
  }

  try {
    guildMembers[message.author].ban(days)
  } catch (e) {

  }
  if (duration !== 0) {

  }
}

/**
 * Ban user that sent message.
 * @param {Object} filter Content filter object
 * @param {Message} message Message that had a match
 * @returns {void}
 */
function ban(filter, message) {
  sendMatchMessage(filter.onMatch.ban, message)

  let days = 0
  if (filter.onMatch.ban.days) {
    days = filter.onMatch.ban.days
  }

  try {
    guildMembers[message.author].ban(days)
  } catch (e) {

  }
}

module.exports = {
  Ban: ban,
  TempBan: tempBan,
  PartialBan: partialBan
}
