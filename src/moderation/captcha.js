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

/**
 * Tests user message against the captcha.
 * @param {Client} client The bot's Discord client
 * @param {Message} message The message that triggered verification
 * @param {Message} trigger The message that triggered this function
 * @param {Object} captcha The captcha for testing against
 * @returns {void}
 */
function testAgainstCaptcha(client, message, trigger, captcha) {
  if (message.author === trigger.author) {
    if (message.content === captcha.text()) {
      message.channel.send('Pass')
      client.removeListener('message', testAgainstCaptcha)
    } else {
      message.channel.send('Fail')
    }
  }
}

/**
 * Module to add captcha verification.
 * @param {Message} trigger The message that triggered the command
 * @param {Client} client The bot's Discord client
 * @returns {void}
 */
exports.send = (trigger, client) => {
  let captcha = require('simple-captcha').create({width: 100, height: 40})

  captcha.generate()
  trigger.channel.send('Text in captcha?',
                       new Discord.Attachment(captcha.stream('jpeg')))

  client.on('message',
            message => testAgainstCaptcha(client, message,
                                          trigger, captcha))
}
