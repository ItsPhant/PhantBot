var assert = require('assert');
var Ping = require('../../../libs/utils/ping.js')

var message = {
  response: "",
  channel: {
    send: function(res) {
      message.response = res
    }
  }
}

var client = {
  ping: "86"
}

describe('Ping', function() {
  describe('#send()', function() {
    it('Returns client#ping', function() {
      Ping.send(message, client)
      assert.equal(`pong! (${client.ping}ms)`, message.response)
    })
  })
})
