const Discord = require('discord.js')

/**
 * Module to add captcha verification.
 * @param {Message} trigger The message that triggered the command
 * @param {Client} client The bot's Discord client
 */
exports.send = (trigger, client) => {
  var captcha = require('simple-captcha').create({width: 100, height: 40})
  
  captcha.generate()
  trigger.channel.send('Text in captcha?',
                       new Discord.Attachment(captcha.stream('jpeg')))

  client.on('message',
    message => testAgainstCaptcha(client, message, trigger, captcha))
}

/**
 * Tests user message against the captcha.
 * @param {Client} client The bot's Discord client
 * @param {Message} message The message that triggered verification
 * @param {Message} trigger The message that triggered this function
 * @param {Object} captcha The captcha for testing against
 */
function testAgainstCaptcha(client, message, trigger, captcha) {
  if (message.author === trigger.author) {
    if(message.content === captcha.text()) {
      message.channel.send('Pass')
      client.removeListener('message', testAgainstCaptcha)
    } else {
      message.channel.send('Fail')
    }
  }
}
