/**
 * PhantBot is a free multipurpose bot made for Discord.
 * Copyright (C) 2017  Ellie Phant
 *
 * PhantBot is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * PhantBot is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with PhantBot.  If not, see <https://www.gnu.org/licenses/>.
 */

const assert = require('assert');
const Message = require('../../mock/discord.js/structures/Message')

const Bechdel = require('../../../src/services/bechdel')

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
