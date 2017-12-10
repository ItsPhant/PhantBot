const assert = require('assert');
const Message = require('../../mock/discord.js/structures/Message')

var message = new Message('!nationaldays')
const NationalDays = require('../../../libs/utils/nationaldays.js')

describe('NationalDays', function() {
  describe('#send()', function() {
    before(function(done) {
      NationalDays.send(message, done)
    })

    it('does not return an error', function() {
      assert.notEqual(message.channel.response,
                      'Error getting national days.')
    })

    it('does not return nothing', function() {
      assert.notEqual(message.channel.response, '')
    })
  })
})
