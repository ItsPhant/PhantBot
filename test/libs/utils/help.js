const assert = require('assert');
const Message = require('../../mock/discord.js/structures/Message')
const config = require('../../../config.json')

const Help = require('../../../libs/utils/help.js')

describe('Help', function() {
  describe('#send()', function() {
    it('when not given a command', function() {
      var message = new Message('!help')
      Help.send(message, 'help')
      assert.ok(message.channel.result.includes(
        Help.pad('help:') + 
        ' Display this message, or help for a command.'
      ))
    })
    it('when given a command', function() {
      test = {
        name:   'test',
        use:    'Test Help#getCommandHelp()',
        syntax: ''
      }

      Help.document(test)

      var message = new Message('!help test')

      Help.send(message, 'help test')
      assert.equal(`\`\`\`${test.name}: ${test.use}\n\n` +
                   `usage: ${config.bot.prefix + test.name} \`\`\``,
                   message.channel.result)
    })
    it('when given an invalid command', function() {
      var message = new Message('!help foo')
      Help.send(message, 'help foo')
      assert.equal(message.channel.result, 'Unknown command foo.')
    })
    it('when given a syntax based command', function() {
      test = {
        name:   'foo',
        use:    'bar',
        syntax: 'baz',
        onlySyntax: true
      }

      var message = new Message('!help foo')
      Help.document(test)
      Help.send(message, 'help foo')

      assert.equal(`\`\`\`${test.name}:` +
                   ` ${test.use}\n\n` +
                   `usage: ${test.syntax}\`\`\``, message.channel.result)
    })
  })
})
