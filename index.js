'use strict'

/**
 * Requires
 **/

const SpoilerBot = require('discord-spoiler-bot');
const Discord = require('discord.js');
const fs = require('fs');

/**
 * Modules
 **/

const Bechdel       = require('./libs/utils/bechdel.js')
const Cat           = require('./libs/utils/cat.js')
const Dictionary    = require('./libs/utils/define.js')
const Help          = require('./libs/utils/help.js')
const NationalDays  = require('./libs/utils/nationaldays.js')
const NaughtyOrNice = require('./libs/utils/naughtyornice.js')
const Ping          = require('./libs/utils/ping.js')
const Tumblr        = require('./libs/utils/tumblr.js')

const Mute          = require('./libs/moderation/mute.js')
const Poll          = require('./libs/moderation/poll.js')

var prefix,
    client,
    spoilerbot,
    config

fs.readFile('./config.json', 'utf8', function(err, data) {
  config = JSON.parse(data)
  prefix = config.bot.prefix

  client = new Discord.Client({
    disabledEvents: config.bot.disabledEvents
  })

  client.login(config.bot.token)

  spoilerbot = new SpoilerBot({client: client})
  spoilerbot.connect()
  
  registerEvents()
})

function registerEvents() {
  client.on('ready', function() {
    console.log('Logged in as %s - %s\n', client.user.username, client.user.id)
    client.user.setPresence({
      game: {
        name: `${prefix.toUpperCase()}help`,
        type: 0
      }
    })
  })

  client.on('message', message => parseMessage(message))
}

function parseMessage(message) {
  if (message.content.toLowerCase().startsWith(prefix)) {
    let msg = message.content
      .toLowerCase()
      .substring(prefix.length)
    let Msg = message.content.substring(prefix.length)

    if (msg.startsWith('bechdel')) {
      Bechdel.send(message, msg)
    }

    if (msg.startsWith('cat')) {
      Cat.send(Msg, message)
    }

    if (msg.startsWith('define')) {
      Define.send(msg, message)
    }

    if (msg.startsWith('help')) {
      Help.send(message, msg, config)
    }

    if (msg === 'nationalday') {
      NationalDays.send(message)
    }

    if (msg.startsWith('obscuresorrow')) {
      Tumblr.getRandomPost('dictionaryofobscuresorrows', (post) => {
        message.channel.send(post)
      })
    }

    if (msg.startsWith('obscuwesowwow')) {
      Tumblr.getRandomPost('dictionaryofobscuresorrows', (post) => {
        message.channel.send(post.replace('l', 'w').replace('r', 'w'))
      })
    }

    if (msg === 'ping') {
      Ping.send(message)
    }

    if (msg.startsWith('poll ')) {
      Poll.startPoll(msg.substring(5), message)
    }

    if (msg === 'spoiler') {
      Spoiler.send(message)
    }

  /*if (msg.startsWith('naughtyornice ')) {
      let re = new RegExp('^naughtyornice <@!([0-9]+)>')
      console.log("\nMessage:")
      console.log(msg)
      console.log("Matched:")
      console.log(re.exec(msg))
      console.log()
      message.channel.send(
        NaughtyOrNice.getInsights(message.guild,
                                  re.exec(msg)[1]))
    }*/
  }
}
