var assert = require('assert');

var Bechdel = require('../../../libs/utils/bechdel.js')

var message = {
  responses: [],
  channel: {
    send: function(contents, cb) {
      message.responses.push(contents)
    }
  }
}

describe('Bechdel', function() {
  describe('#send()', function() {
    it('returns correct zero string', function() {
      // 0/3
      Bechdel.send(message, 'bechdel a boy and his dog', () => {
        assert.ok(message.responses[0].includes(
          'Less than two named women.'))
      })
    })
    it('returns correct one string', function() {
      // 1/3
      Bechdel.send(message, 'bechdel santa clause is', () => {
        assert.ok(message.responses[1].includes(
          'Two women never speak to each other.'))
      })
    })
    it('returns correct two string', function() {
      // 2/3
      Bechdel.send(message, 'bechdel animal house', () => {
        assert.ok(message.responses[2].includes(
          'Two women only speak about a man.'))
      })
    })
    it('returns correct three string', function() {
      // 3/3
      Bechdel.send(message, 'bechdel wiz, the', () => {
        assert.ok(message.responses[3].includes(
          'Passes.'))
      })
    })
  })
})
