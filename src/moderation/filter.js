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

const ban = require('./ban').Ban
const tempBan = require('./ban').TempBan
const partialBan = require('./ban').PartialBan
const deleteMsg = require('./delete').Delete
const log = require('./log').Log
const mute = require('./mute').Mute
const warn = require('./warn').Warn
const toDuration = require('../utilities/toDuration')
const matchRegexes = require('../utilities/matchRegexes')

let settings
let users

/**
 * Procedure for what to do if a match is found.
 * @param {string} filter The filter that the message matched
 * @param {Message} message The message that had a match
 * @returns {void}
 */
function onMatch (filter, message) {
  if (filter.onMatch.log.enabled) {
    log(filter, message)
  }

  if (filter.onMatch.warn.enabled) {
    warn(filter, message)
  }

  if (filter.onMatch.delete.enabled) {
    deleteMsg(filter, message)
  }

  if (filter.onMatch.mute.enabled) {
    mute(filter, message)
  }

  if (filter.onMatch.partialBan.enabled) {
    partialBan(filter, message)
  }

  if (filter.onMatch.tempBan.enabled) {
    tempBan(filter, message)
  }

  if (filter.onMatch.ban.enabled) {
    ban(filter, message)
  }
}

/**
 * Act on matching regexes.
 * @param {Object} filter Filter object
 * @param {Message} message Message to act on
 * @param {User} user User data to modify
 * @returns {void}
 */
function actOnMatches (filter, message, user) {
  for (const m in matchRegexes(filter.regexp, message.content)) {
    if (filter.allowedMatches.enabled &&
        filter.allowedMatches.list[m]) {
      continue
    } else if (filter.allowedMatches.enabled) {
      user.lastMatch = Date.now()
      onMatch(filter, message)
      break
    } else if (filter.blockedMatches.enabled &&
      !filter.blockedMatches.list[m]) {
      continue
    } else if (filter.rateLimit.enabled &&
               m.length < filter.rateLimit.max &&
               user.lastMatch + toDuration(filter.rateLimit.reset) <
               Date.now()) {
      break
    } else {
      user.lastMatch = Date.now()
      onMatch(filter, message)
      break
    }
  }
}

/**
 * Check message for matching rules.
 * @param {Message} message Message to check
 * @returns {bool} Whether or not a match was found.
 */
function match (message) {
  let author = message.author.id
  let user = users[author]
  let guild = message.author.guild
  let roles = guild.members.get(author).roles

  for (const filter in settings.contentFilters) {
    // Only use the filter if it is enabled.
    if (!filter.enabled ||
      // Skip ignored users.
      (filter.ignoredUsers.enabled &&
       filter.ignoredUsers.list[author]) ||
      // Skip ignored roles.
      (filter.ignoredRoles.enabled &&
       filter.ignoredRoles.list[roles]) ||
      // Skip ignored channels.
      (filter.ignoredChannels.enabled &&
       filter.ignoredChannels.list[message.channel]) ||
      // Skip channels not in active list if it is enabled.
      (filter.activeChannels.enabled &&
      !filter.activeChannels.list[message.channel])) {
      continue
    } else {
      actOnMatches(filter, message, user)
    }
  }
}

/**
 * Checks message for filter matches.
 * @param {Message} message The message to check
 * @returns {void}
 */
function filter (message) {
  match(message.content)
}

exports.filter = filter
