/**
 * Module to create polls for executing bot commands.
 * @param {Message} message The message that triggered this command
 * @param {string} suffix The part of the message after the bot's prefix
 */
exports.startPoll = (message, suffix) => {
  message.channel.send(`**Execute ${suffix}?**`)
    .then(message => {
      message.react('👍').then(() => message.react('👎'))
      let reacts = message.createReactionCollector(
        (reaction, user) => user.id !== message.author.id,
        { time: 15 * 60 * 1000 }
      )

      let tallies = { yea: [], nay: [] }
      reacts.on('collect', react => collectEmoji(react, message.author))
      reacts.on('end', collected => endPoll(collected))
    })
}

/**
 * Collects emoji in poll for tally.
 * @param {ReactionEmoji} react The emoji being collected
 * @param {User} author The bot's user
 */
function collectEmoji(react, author) {
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
 * Finishes poll and sends results.
 * @param {Object} collected Reaction emoji collected
 * @param {string} suffix The command to be executed
 */
function endPoll(collected, suffix) {
  message.channel.send(
    `:thumbsup:: ${tallies.yea.length}\n\n` +
    `:thumbsdown:: ${tallies.nay.length}\n\n` +
    `**result**: ${getResult(tallies.yea, tallies.nay)}`)

  parseMessage(suffix)
}

/**
 * Calculates poll result.
 * @param {Object} a Number of yeas
 * @param {Object} b Number of nays
 * @returns {string} Result
 */
function getResult(a, b) {
  if (a.length > b.length)
    return ':thumbsup:'
  else
    return ':thumbsdown:'
}

/**
 * Tallies emoji for poll.
 * @param {Object} tallies Tally object to append to
 * @param {Object} a Tally option a
 * @param {Object} b Tally option b
 * @param {string} id ID of user to test against
 */
function tallyEmoji(tallies, a, b, id) {
  if (!tallies[a].includes(id)) {
    if (tallies[b].includes(id)) {
      tallies[b] = tallies[b].filter(x => x !== id)
    }
    tallies[a].push(id)
  }
}
