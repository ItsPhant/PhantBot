const assert = require('assert');
const mock = new require('../mockdiscord.js')

const Spoiler = require('../../../libs/utils/spoiler.js')

describe('Spoiler', function() {
  describe('#send()', function() {
    it('returns the usage for the spoiler command.', function() {
      var message = new mock.Message('!spoiler')
      Spoiler.send(message)
      assert.equal(message.channel.result,
                   '```\n<topic>:spoiler:<content>\n```')
    })
  })
})
