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

const Help = require('../services/help')

Help.document({
  name: 'poll',
  use: 'Poll users to run an administrative command',
  syntax: '<command>',
  type: 'moderation'
})

/**
 * Tallies emoji for poll.
 * @param {Object} tallies Tally object to append to
 * @param {Object} a Tally option a
 * @param {Object} b Tally option b
 * @param {string} id ID of user to test against
 * @returns {void}
 */
function tallyEmoji (tallies, a, b, id) {
  if (!tallies[a].includes(id)) {
    if (tallies[b].includes(id)) {
      tallies[b] = tallies[b].filter(x => x !== id)
    }
    tallies[a].push(id)
  }
}

/**
 * Collects emoji in poll for tally.
 * @param {ReactionEmoji} react The emoji being collected
 * @param {User} author The bot's user
 * @param {Object} tallies Vote tallies
 * @returns {void}
 */
function collectEmoji (react, author, tallies) {
  react.users.forEach(user => {
    if (user.id !== author.id) {
      react.remove(user.id)
      if (react.emoji.name === '👍') {
        tallyEmoji(tallies, 'yea', 'nay', user.id)
      } else if (react.emoji.name === '👎') {
        tallyEmoji(tallies, 'nay', 'yea', user.id)
      }
    }
  })
}

/**
 * Calculates poll result.
 * @param {Object} a Number of yeas
 * @param {Object} b Number of nays
 * @returns {string} Result
 */
function getResult (a, b) {
  if (a.length > b.length) {
    return ':thumbsup:'
  } else {
    return ':thumbsdown:'
  }
}

/**
 * Finishes poll and sends results.
 * @param {Object} collected Reaction emoji collected
 * @param {string} suffix The command to be executed
 * @param {Object} tallies Vote tallies
 * @param {Message} message Message that started the poll
 * @returns {void}
 */
function endPoll (collected, suffix, tallies, message) {
  message.channel.send(
    `:thumbsup:: ${tallies.yea.length}\n\n` +
    `:thumbsdown:: ${tallies.nay.length}\n\n` +
    `**result**: ${getResult(tallies.yea, tallies.nay)}`)
}

/**
 * Module to create polls for executing bot commands.
 * @param {Message} message The message that triggered this command
 * @param {string} suffix The part of the message after the bot's prefix
 * @returns {void}
 */
exports.startPoll = (message, suffix) => {
  message.channel.send(`**Execute ${suffix}?**`)
    .then(message => {
      message.react('👍').then(() => message.react('👎'))
      let reacts = message.createReactionCollector(
        (reaction, user) => user.id !== message.author.id,
        {time: 15 * 60 * 1000}
      )

      let tallies = {yea: [], nay: []}
      reacts.on('collect', react => collectEmoji(react,
                                                 message.author,
                                                 tallies))
      reacts.on('end', collected => endPoll(collected, suffix,
                                            tallies, message))
    })
}
