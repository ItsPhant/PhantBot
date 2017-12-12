/**
 * Module to mute given user.
 * @param {Message} message The message that triggered this command
 * @returns {void}
 */
exports.muteUser = message => {
  let re = /<@!*(\d+)/g
  let id = re.exec(message.content.substring(5))[1]
  if (id) {
    guild.roles.forEach((value, key) => {
      if (value.name === 'mute' || value.name === 'muted') {
        guild.members.get(id).addRole(key)
      } else {
        message.channel.send('Unable to find mute role (incorrect name).')
      }
    })
  } else {
    message.channel.send('No user was mentioned.')
  }
}
