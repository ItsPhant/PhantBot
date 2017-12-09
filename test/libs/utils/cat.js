const assert = require('assert');
const mock = require('../mockdiscord.js')

const Cat = require('../../../libs/utils/cat.js')

describe('Cat', function() {
  describe('#send()', function() {
    it('returns exactly what was given.', function() {
      var message = new mock.Message('!cat AAAAA')
      Cat.send(message, 'cat AAAAA')
      assert.equal(message.channel.result, 'AAAAA')
    })
  })
})
