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

function endPoll(collected, suffix) {
  message.channel.send(
    `:thumbsup:: ${tallies.yea.length}\n\n` +
    `:thumbsdown:: ${tallies.nay.length}\n\n` +
    `**result**: ${getResult(tallies.yea, tallies.nay)}`)

  parseMessage(suffix)
}

function getResult(a, b) {
  if (a.length > b.length)
    return ':thumbsup:'
  else
    return ':thumbsdown:'
}

function tallyEmoji(tallies, a, b, id) {
  if (!tallies[a]includes(id)) {
    if (tallies[b]includes(id)) {
      tallies[b] = tallies[b].filter(x => x !== id)
    }
    tallies[a].push(id)
  }
}
