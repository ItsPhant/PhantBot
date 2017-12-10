const assert = require('assert');
const Message = require('../../mock/discord.js/structures/Message')

const Spoiler = require('../../../libs/utils/spoiler.js')

describe('Spoiler', function() {
  describe('#send()', function() {
    it('returns the usage for the spoiler command.', function() {
      var message = new Message('!spoiler')
      Spoiler.send(message)
      assert.equal(message.channel.result,
                   '```\n<topic>:spoiler:<content>\n```')
    })
  })
})
