var assert = require('assert');
var config = require('../../../config.json')
var Help = require('../../../libs/utils/help.js')

describe('Help', function() {
  describe('#parseMessage()', function() {
    it('when not given a command', function() {
      console.log(Help.parseMessage('help'))
      assert.ok(Help.parseMessage('help').includes(
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

      assert.equal(`\`\`\`${test.name}: ${test.use}\n\n` +
                   `usage: ${config.bot.prefix + test.name} \`\`\``,
                   Help.parseMessage('help test'))
    })
  })
})
