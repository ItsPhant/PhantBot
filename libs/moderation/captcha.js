const Discord = require('discord.js')

exports.send = (trigger, client) => {
  var captcha = require('simple-captcha').create({width: 100, height: 40})
  
  captcha.generate()
  trigger.channel.send('Text in captcha?',
                       new Discord.Attachment(captcha.stream('jpeg')))

  client.on('message',
    message => testAgainstCaptcha(client, message, trigger, captcha))
}

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
