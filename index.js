'use strict'

/**
 * Requires
 */
const SpoilerBot = require('discord-spoiler-bot')
const Discord = require('discord.js')
const fs = require('fs')

/**
 * Modules
 */
const utils = require('./libs/utils/')
const moderation = require('./libs/moderation/')

let prefix = ''
let client
let spoilerbot
let config = {}
let commands = {
  bechdel: {
    /**
     * Processes bechdel test command
     * @see Bechdel#send()
     * @param {string} message The message that triggered the command
     * @param {string} suffix The command without the bot's prefix
     * @returns {void}
     */
    process: function process(message, suffix) {
      utils.Bechdel.send(message, suffix)
    }
  },
  cat: {
    /**
     * Processes cat command
     * @see Cat#send()
     * @param {string} message The message that triggered the command
     * @param {string} suffix The command without the bot's prefix
     * @returns {void}
     */
    process: function process(message, suffix) {
      utils.Cat.send(message, suffix)
    }
  },
  captcha: {
    /**
     * Processes captcha command
     * @see Captcha#send()
     * @param {string} message The message that triggered the command
     * @param {string} suffix The command without the bot's prefix
     * @param {Object} config The bot's config
     * @param {Client} client The bot's Discord client
     * @returns {void}
     */
    process: function process(message, suffix, config, client) {
      moderation.Captcha.send(message, client)
    }
  },
  define: {
    /**
     * Processes define command
     * @see Define#send()
     * @param {string} message The message that triggered the command
     * @param {string} suffix The command without the bot's prefix
     * @returns {void}
     */
    process: function process(message, suffix) {
      utils.Define.send(message, suffix)
    }
  },
  help: {
    /**
     * Processes help command
     * @see Help#send()
     * @param {string} message The message that triggered the command
     * @param {string} suffix The command without the bot's prefix
     * @returns {void}
     */
    process: function process(message, suffix) {
      utils.Help.send(message, suffix)
    }
  },
  mute: {
    /**
     * Processes mute command
     * @see Mute#send()
     * @param {string} message The message that triggered the command
     * @param {string} suffix The command without the bot's prefix
     * @returns {void}
     */
    process: function process(message, suffix) {
      moderation.Mute.send(message, suffix)
    }
  },
  nationalday: {
    /**
     * Processes national day command
     * @see NationalDays#send()
     * @param {string} message The message that triggered the command
     * @returns {void}
     */
    process: function process(message) {
      utils.NationalDays.send(message)
    }
  },
  obscuresorrow: {
    /**
     * Processes obscure sorrow command
     * @see Tumblr#send()
     * @param {string} message The message that triggered the command
     * @returns {void}
     */
    process: function process(message) {
      utils.Tumblr.getRandomPost('dictionaryofobscuresorrows', (post) => {
        message.channel.send(post)
      })
    }
  },
  obscuwesowwow: {
    /**
     * Pwocesses obscuwe sowwow command
     * @see Tumblr#send()
     * @param {string} message The message that triggered the command
     * @returns {void}
     */
    process: function process(message) {
      utils.Tumblr.getRandomPost('dictionaryofobscuresorrows', (post) => {
        message.channel.send(post.replace(/([lr])/gi, 'w'))
      })
    }
  },
  ping: {
    /**
     * Processes ping command
     * @see Ping#send()
     * @param {string} message The message that triggered the command
     * @param {string} suffix The command without the bot's prefix
     * @param {Object} config The bot's config
     * @param {Client} client The bot's Discord client
     * @returns {void}
     */
    process: function process(message, suffix, config, client) {
      utils.Ping.send(message, client)
    }
  },
  poll: {
    /**
     * Processes poll command
     * @see Poll#startPoll()
     * @param {string} message The message that triggered the command
     * @param {string} suffix The command without the bot's prefix
     * @returns {void}
     */
    process: function process(message, suffix) {
      moderation.Poll.startPoll(message, suffix.substring(5))
    }
  },
  spoiler: {
    /**
     * Processes spoiler command
     * @see Spoiler#send()
     * @param {string} message The message that triggered the command
     * @returns {void}
     */
    process: function process(message) {
      utils.Spoiler.send(message)
    }
  }
}

/**
 * Parses messages for bot commands.
 * @param {Message} message Message to check for commands
 * @returns {void}
 */
function parseMessage(message) {
  if (message.content.startsWith(prefix)) {
    let msg = message.content.toLowerCase().substring(prefix.length)
    let cmd = message.content.split(' ')[0].substring(prefix.length)

    if (commands[cmd]) {
      commands[cmd].process(message, msg, config, client)
    }
  }
}

/**
 * Register events for bot's client.
 * @returns {void}
 */
function registerEvents() {
  client.on('ready', function onReady() {
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
 * Read config and initialize bot.
 */
fs.readFile('./config.json', 'utf8', function onRead(err, data) {
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
