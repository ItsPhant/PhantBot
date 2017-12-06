var assert = require('assert');

var Spoiler = require('../../../libs/utils/spoiler.js')

var message = {
  response: '',
  channel: {
    send: function(res) {
      message.response = res
    }
  }
}

describe('Spoiler', function() {
  describe('#send()', function() {
    it('returns the usage for the spoiler command.', function() {
      Spoiler.send(message)
      assert.equal(message.response, '```\n<topic>:spoiler:<content>\n```')
    })
  })
})
