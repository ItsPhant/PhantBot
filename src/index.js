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
'use strict'

/**
 * Requires
 */
const Discord = require('discord.js')
const fs = require('fs')

/**
 * Modules
 */
const Services = require('./services/')
const Moderation = require('./moderation/')

let prefix = ''
let client
let config = {}
let commands = {
  addrank: {
    process: function process (message, suffix, config, client) {
      Modules.Ranks.addRank(message, suffix, config, client)
    }
  },
  bechdel: {
    process: function process (message, suffix) {
      Services.Bechdel.send(message, suffix)
    }
  },
  cat: {
    process: function process (message, suffix) {
      Services.Cat.send(message, suffix)
    }
  },
  captcha: {
    process: function process (message, suffix, config, client) {
      Moderation.Captcha.send(message, client)
    }
  },
  convert: {
    process: function process (message, suffix) {
      Services.Convert.send(message, suffix)
    }
  },
  define: {
    process: function process (message, suffix) {
      Services.Define.send(message, suffix)
    }
  },
  delrank: {
    process: function process (message, suffix, config, client) {
      Modules.Ranks.delRank(message, suffix, config, client)
    }
  },
  help: {
    process: function process (message, suffix) {
      Services.Help.send(message, suffix)
    }
  },
  mute: {
    process: function process (message, suffix) {
      Moderation.Mute.send(message, suffix)
    }
  },
  nationalday: {
    process: function process (message) {
      Services.NationalDays.send(message)
    }
  },
  obscuresorrow: {
    process: function process (message) {
      Services.Tumblr.getRandomPost('dictionaryofobscuresorrows', post => {
        message.channel.send(post)
      })
    }
  },
  obscuwesowwow: {
    process: function process (message) {
      Services.Tumblr.getRandomPost('dictionaryofobscuresorrows', post => {
        message.channel.send(post.replace(/([lr])/gi, 'w'))
      })
    }
  },
  ping: {
    process: function process (message, suffix, config, client) {
      Services.Ping.send(message, client.ping)
    }
  },
  poll: {
    process: function process (message, suffix) {
      Moderation.Poll.startPoll(message, suffix.substring(5))
    }
  },
  rank: {
    process: function process (message, suffix, config, client) {
      Modules.Ranks.rank(message, suffix, config, client)
    }
  },
  ranks: {
    process: function process (message, suffix, config) {
      Moderation.Ranks.ranks(message, suffix, config)
    }
  }
  warn: {
    process: function process (message, suffix) {
      Moderation.Warn.send(message, suffix)
    }
  }
}

/**
 * Parses messages for bot commands.
 * @param {Message} message Message to check for commands
 * @returns {void}
 */
function parseMessage (message) {
  if (message.content.startsWith(prefix)) {
    let suffix = message.content.toLowerCase().substring(prefix.length)
    let cmd = message.content.split(' ')[0].substring(prefix.length)

    if (commands[cmd]) {
      commands[cmd].process(message, suffix, config, client)
    }
  }
}

/**
 * Register events for bot's client.
 * @returns {void}
 */
function registerEvents () {
  client.on('ready', function onReady () {
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
fs.readFile('./config/bot.json', 'utf8', function onRead (err, data) {
  if (err) {
    console.error(err.message)
  }

  config = JSON.parse(data)
  prefix = config.bot.prefix

  client = new Discord.Client({
    disabledEvents: config.bot.disabledEvents
  })

  client.login(config.bot.token)

  registerEvents()
})
