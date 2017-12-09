const assert = require('assert');
const mock = new require('../mockdiscord.js')

const Ping = require('../../../libs/utils/ping.js')

var client = {
  ping: "86"
}

describe('Ping', function() {
  describe('#send()', function() {
    it('Returns client#ping', function() {
      var message = new mock.Message('!ping')
      Ping.send(message, 'ping', {}, client)
      assert.equal(`pong! (${client.ping}ms)`, message.channel.result)
    })
  })
})
