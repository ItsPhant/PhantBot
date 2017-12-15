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

let settings
let users

const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR   = 60 * MINUTE
const DAY    = 24 * HOUR
const MONTH  = 30.4375 * DAY
/**
 * Converts filter's length of time to milliseconds.
 * @param {Object} time Time object from filter settings
 * @returns {Number} Milliseconds the time is equal to.
 */
function toDuration(time) {
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

  let length = months  * MONTH +
               days    * DAY +
               hours   * HOUR +
               minutes * MINUTE +
               seconds * SECOND +
               milliseconds

  return length
}

/**
 * Send message for action taken if configured.
 * @param {Object} match The match object in the filter
 * @param {Message} message The message that had a match
 * @returns {void}
 */
function sendMatchMessage(match, message) {
  if (match.message !== '') {
    let matchMessage = match.message
    matchMessage.replace('<Author>',`<@${message.author.id}>`)
    matchMessage.replace('<author>',`${message.author.username}`)
    matchMessage.replace('<channel>',`${message.channel.name}`)
    message.channel.send(matchMessage)
  }
}

/**
 * Add all roles in role array to user.
 * @param {User} user User to add roles to
 * @param {Object} roles Role ids to add
 * @returns {void}
 */
function addRoleArray(user, roles) {
  if (roles.isArray) {
    for (const role in roles) {
      try {
        guildMembers[user].addRole(role)
      } catch (e) {
        console.error(`Error assigning role ${role}: ${e.message}`)
      }
    }
  } else {
    try {
      guildMembers[user].addRole(roles)
    } catch (e) {
      console.error(`Error assigning role ${roles}: ${e.message}`)
    }
  }
}

/**
 * Send log for action.
 * @param {Object} filter Content filter object
 * @param {Message} message Message that had a match
 * @returns {void}
 */
function log(filter, message) {
  sendMatchMessage(filter.onMatch.log, message)

  let channel = new Discord.Channel(settings.logChannel)
  channel.send(`Rule ${rule} triggered in ${message.channel} by ` +
               `${message.author.name} with message: ${message.content}`)

}

/**
 * Send warning for action.
 * @param {Object} filter Content filter object
 * @param {Message} message Message that had a match
 * @returns {void}
 */
function warn(filter, message) {
  sendMatchMessage(filter.onMatch.warn, message)
}

/**
 * Delete message.
 * @param {Object} filter Content filter object
 * @param {Message} message Message that had a match
 * @returns {void}
 */
function deleteMessage(filter, message) {
  sendMatchMessage(filter.onMatch.delete, message)
  message.delete()
}

/**
 * Mute user that sent message.
 * @param {Object} filter Content filter object
 * @param {Message} message Message that had a match
 * @returns {void}
 */
function mute(filter, message) {
  sendMatchMessage(filter.onMatch.mute, message)
  let duration
  try {
    duration = toDuration(filter.punishments.muteTime)
  } catch (e) {
    duration = 0
  }

  if (filter.onMatch.mute.assignRole) {
    addRoleArray(filter.onMatch.mute.assignRole)
  } else {
    // Try detecting mute role
  }

  if (duration !== 0) {
    // Store date for unmute
  }
}

/**
 * Ban user that sent message.
 * @param {Object} filter Content filter object
 * @param {Message} message Message that had a match
 * @returns {void}
 */
function partialBan(filter, message) {
  sendMatchMessage(filter.onMatch.partialBan, message)
  let duration
  try {
    duration = toDuration(filter.punishments.partialBanTime)
  } catch (e) {
    duration = 0
  }

  /**
   * Not sure how this would be set up yet, I was thinking it would be to
   * remove from some channels, maybe just the channel the message was from.
   */
  if (filter.onMatch.partialBan.assignRole) {
    addRoleArray(filter.onMatch.partialBan.assignRole)
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

/**
 * Procedure for what to do if a match is found.
 * @param {string} filter The filter that the message matched
 * @param {Message} message The message that had a match
 * @returns {void}
 */
function onMatch(filter, message) {
  if (filter.onMatch.log.enabled) {
    log(filter, message)
  }

  if (filter.onMatch.warn.enabled) {
    warn(filter, message)
  }

  if (filter.onMatch.delete.enabled) {
    deleteMessage(filter, message)
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
 * Check message for matching regexes.
 * @param {Array} regexp Regex strings to check
 * @param {string} text Text from message
 * @returns {Array} Matched regexes in message text.
 */
function matchRegexes(regexp, text) {
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

/**
 * Act on matching regexes.
 * @param {Object} filter Filter object
 * @param {Message} message Message to act on
 * @param {User} user User data to modify
 * @returns {void}
 */
function actOnMatches(filter, message, user) {
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
               matches.length < filter.rateLimit.max &&
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
function match(message) {
  let author = message.author.id
  let user = users[author]

  for (const filter in settings.contentFilters) {
    // Only use the filter if it is enabled.
    if (!filter.enabled ||
      // Skip ignored users.
      (filter.ignoredUsers.enabled &&
       filter.ignoredUsers.list[author]) ||
      // Skip ignored roles.
      (filter.ignoredRoles.enabled &&
       filter.ignoredRoles.list[rolesByUser[author]]) ||
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
function filter(message) {
  match(message.content)
}

exports.filter = filter
