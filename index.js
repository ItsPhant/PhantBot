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
const Captcha       = require('./libs/utils/captcha.js')
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
    console.log(
      `Logged in as ${client.user.username} - ${client.user.id}\n`)
    client.user.setPresence({
      game: {
        name: `${prefix.toUpperCase()}help`,
        type: 0
      }
    })
  })

  client.on('message', message => parseMessage(message))
}

var commands = {
  'bechdel': {
    process: function(message, suffix) {
      Bechdel.send(message, suffix)
    }
  },
  'cat': {
    process: function(message, suffix) {
      Cat.send(message, suffix)
    }
  },
  'captcha': {
    process: function(message, suffix, config, client) {
      Captcha.send(message, client)
    }
  },
  'define': {
    process: function(message, suffix) {
      Define.send(message, suffix)
    }
  },
  'help': {
    process: function(message, suffix) {
      Help.send(message, suffix)
    }
  },
  'nationalday': {
    process: function(message) {
      NationalDays.send(message)
    }
  },
  'obscuresorrow': {
    process: function(message) {
      Tumblr.getRandomPost('dictionaryofobscuresorrows', (post) => {
        message.channel.send(post)
      })
    }
  },
  'obscuwesowwow': {
    process: function(message) {
      Tumblr.getRandomPost('dictionaryofobscuresorrows', (post) => {
        message.channel.send(post.replace(/([lr])/gi, 'w'))
      })
    }
  },
  'ping': {
    process: function(message, suffix, config, client) {
      Ping.send(message, client)
    }
  },
  'poll': {
    process: function(message, suffix) {
      Poll.startPoll(message, suffix.substring(5))
    }
  },
  'spoiler': {
    process: function(message) {
      Spoiler.send(message)
    }
  }
}

function parseMessage(message) {
  if (message.content.startsWith(prefix)) {
    let msg = message.content.toLowerCase().substring(prefix.length)
    let cmd = message.content.split(' ')[0].substring(prefix.length)

    if (commands[cmd])
      commands[cmd].process(message, msg, config, client)
  }
}
