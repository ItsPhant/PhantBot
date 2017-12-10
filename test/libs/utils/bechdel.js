const assert = require('assert');
const Message = require('../../mock/discord.js/structures/Message')

const Bechdel = require('../../../libs/utils/bechdel.js')

describe('Bechdel', function() {
  describe('#send()', function() {
    it('returns correct zero string', function() {
      // 0/3
      var suffix = 'bechdel a boy and his dog'
      var message = new Message(`!${suffix}`)
      Bechdel.send(message, suffix, () => {
        assert.ok(message.channel.response.includes(
          'Less than two named women.'))
      })
    })
    it('returns correct one string', function() {
      // 1/3
      var suffix = 'bechdel santa clause is'
      var message = new Message(`!${suffix}`)
      Bechdel.send(message, suffix, () => {
        assert.ok(message.channel.response.includes(
          'Two women never speak to each other.'))
      })
    })
    it('returns correct two string', function() {
      // 2/3
      var suffix = 'bechdel animal house'
      var message = new Message(`!${suffix}`)
      Bechdel.send(message, suffix, () => {
        assert.ok(message.channel.response.includes(
          'Two women only speak about a man.'))
      })
    })
    it('returns correct three string', function() {
      // 3/3
      var suffix = 'bechdel wiz, the'
      var message = new Message(`!${suffix}`)
      Bechdel.send(message, suffix, () => {
        assert.ok(message.channel.response.includes(
          'Passes.'))
      })
    })
  })
})
