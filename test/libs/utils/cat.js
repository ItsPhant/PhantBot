const assert = require('assert');
const Message = require('../../mock/discord.js/structures/Message')

const Cat = require('../../../libs/utils/cat.js')

describe('Cat', function() {
  describe('#send()', function() {
    it('returns exactly what was given.', function() {
      var message = new Message('!cat AAAAA')
      Cat.send(message, 'cat AAAAA')
      assert.equal(message.channel.result, 'AAAAA')
    })
  })
})
