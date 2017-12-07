var assert = require('assert');
var config = require('../../../config.json')
var Help = require('../../../libs/utils/help.js')

var message = {
  result: "",
  channel: {
    send: function(contents) {
      message.result = contents
    }
  }
}

describe('Help', function() {
  describe('#send()', function() {
    it('when not given a command', function() {
      Help.send(message, 'help')
      assert.ok(message.result.includes(
        Help.pad('help:') + ' Display this message, or help for a command.'
      ))
    })
    it('when given a command', function() {
      test = {
        name:   'test',
        use:    'Test Help#getCommandHelp()',
        syntax: ''
      }

      Help.document(test)

      Help.send(message, 'help test')
      assert.equal(`\`\`\`${test.name}: ${test.use}\n\n` +
                   `usage: ${config.bot.prefix + test.name} \`\`\``,
                   message.result)
    })
    it('when given an invalid command', function() {
      Help.send(message, 'help foo')
      assert.equal(message.result, 'Unknown command foo.')
    })
    it('when given a syntax based command', function() {
      test = {
        name:   'foo',
        use:    'bar',
        syntax: 'baz',
        onlySyntax: true
      }

      Help.document(test)
      Help.send(message, 'help foo')

      assert.equal(`\`\`\`${test.name}:` +
                   ` ${test.use}\n\n` +
                   `usage: ${test.syntax}\`\`\``, message.result)
    })
  })
})
