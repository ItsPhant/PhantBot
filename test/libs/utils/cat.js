var assert = require('assert');
var Cat = require('../../../libs/utils/cat.js')

var message = {
  result: "",
  channel: {
    send: function(contents) {
      message.result = contents
    }
  },
  delete: function() {
    return 0
  }
}

describe('Cat', function() {
  describe('#send()', function() {
    it('returns exactly what was given.', function() {
      Cat.send(message, 'cat AAAAA')
      assert.equal(message.result, 'AAAAA')
    })
  })
})
