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

const Cat = require('../../../src/services/cat')

describe('Cat', function() {
  describe('#send()', function() {
    it('returns exactly what was given.', function() {
      var message = new Message('!cat AAAAA')
      Cat.send(message, 'cat AAAAA')
      assert.equal(message.channel.result, 'AAAAA')
    })
  })
})
