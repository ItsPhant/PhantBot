exports.startPoll = (command, message) => {
  message.channel.send(`**Execute ${command}?**`)
    .then(message => {
      message.react('👍').then(() => message.react('👎'))
      let reacts = message.createReactionCollector(
        (reaction, user) => user.id !== message.author.id,
        { time: 15 * 60 * 1000 }
      )

      let tallies = { yea: [], nay: [] }
      reacts.on('collect', r => {
        r.users.forEach(user => {
          if (user.id !== message.author.id) {
            r.remove(user.id)
            if (r.emoji.name === '👍') {
              if (!tallies.yea.includes(user.id)) {
                if (tallies.nay.includes(user.id)) {
                  tallies.nay = tallies.nay.filter(x => x!== user.id)
                }
                tallies.yea.push(user.id)
              }
            } else if (r.emoji.name === '👎') {
              if (!tallies.nay.includes(user.id)) {
                if (tallies.yea.includes(user.id)) {
                  tallies.yea = tallies.yea.filter(x => x !== user.id)
                }
                tallies.nay.push(user.id)
              }
            }
          }
        })
      })

      reacts.on('end', collected => {
        message.channel.send(`:thumbsup:: ${tallies.yea.length}

:thumbsdown:: ${tallies.nay.length}

**result**: ${tallies.yea.length > tallies.nay.length ? ':thumbsup:' : ':thumbsdown:'}`)
        message.delete(1000)
      })
    })
}
