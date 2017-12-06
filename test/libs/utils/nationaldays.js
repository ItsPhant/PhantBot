var assert = require('assert');
var NationalDays = require('../../../libs/utils/nationaldays.js')

var message = {
  response: '',
  channel: {
    send: function(contents) {
      message.response = contents
    }
  }
}

describe('NationalDays', function() {
  describe('#send()', function() {
    before(function(done) {
      NationalDays.send(message, done)
    })

    it('does not return an error', function() {
      assert.notEqual(message.response, 'Error getting national days.')
    })

    it('does not return nothing', function() {
      assert.notEqual(message.response, '')
    })
  })
})
