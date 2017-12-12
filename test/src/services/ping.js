const assert = require('assert');
const Message = require('../../mock/discord.js/structures/Message')

const Ping = require('../../../src/services/ping')

var client = {
  ping: "86"
}

describe('Ping', function() {
  describe('#send()', function() {
    it('Returns client#ping', function() {
      var message = new Message('!ping')
      Ping.send(message, 'ping', {}, client)
      assert.equal(`pong! (${client.ping}ms)`, message.channel.result)
    })
  })
})
