'use strict'

/**
 * Requires
 */
const SpoilerBot = require('discord-spoiler-bot');
const Discord = require('discord.js');
const fs = require('fs');

/**
 * Modules
 */
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

/**
 * Read config and initialize bot.
 */
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

/**
 * Register events for bot's client.
 */
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

/**
 * List of commands to evaluate.
 */
var commands = {
  bechdel: {
    /**
     * Processes bechdel test command
     * @see Bechdel#send()
     */
    process: function(message, suffix) {
      Bechdel.send(message, suffix)
    }
  },
  cat: {
    /**
     * Processes cat command
     * @see Cat#send()
     */
    process: function(message, suffix) {
      Cat.send(message, suffix)
    }
  },
  captcha: {
    /**
     * Processes captcha command
     * @see Captcha#send()
     */
    process: function(message, suffix, config, client) {
      Captcha.send(message, client)
    }
  },
  define: {
    /**
     * Processes define command
     * @see Define#send()
     */
    process: function(message, suffix) {
      Define.send(message, suffix)
    }
  },
  help: {
    /**
     * Processes help command
     * @see Help#send()
     */
    process: function(message, suffix) {
      Help.send(message, suffix)
    }
  },
  mute: {
    /**
     * Processes mute command
     * @see Mute#send()
     */
    process: function(message, suffix) {
      Mute.send(message, suffix)
    }
  }
  nationalday: {
    /**
     * Processes national day command
     * @see NationalDays#send()
     */
    process: function(message) {
      NationalDays.send(message)
    }
  },
  obscuresorrow: {
    /**
     * Processes obscure sorrow command
     * @see Tumblr#send()
     */
    process: function(message) {
      Tumblr.getRandomPost('dictionaryofobscuresorrows', (post) => {
        message.channel.send(post)
      })
    }
  },
  obscuwesowwow: {
    /**
     * Pwocesses obscuwe sowwow command
     * @see Tumblr#send()
     */
    process: function(message) {
      Tumblr.getRandomPost('dictionaryofobscuresorrows', (post) => {
        message.channel.send(post.replace(/([lr])/gi, 'w'))
      })
    }
  },
  ping: {
    /**
     * Processes ping command
     * @see Ping#send()
     */
    process: function(message, suffix, config, client) {
      Ping.send(message, client)
    }
  },
  poll: {
    /**
     * Processes poll command
     * @see Poll#startPoll()
     */
    process: function(message, suffix) {
      Poll.startPoll(message, suffix.substring(5))
    }
  },
  spoiler: {
    /**
     * Processes spoiler command
     * @see Spoiler#send()
     */
    process: function(message) {
      Spoiler.send(message)
    }
  }
}

/**
 * Parses messages for bot commands.
 * @param {Message} message Message to check for commands
 */
function parseMessage(message) {
  if (message.content.startsWith(prefix)) {
    let msg = message.content.toLowerCase().substring(prefix.length)
    let cmd = message.content.split(' ')[0].substring(prefix.length)

    if (commands[cmd])
      commands[cmd].process(message, msg, config, client)
  }
}
