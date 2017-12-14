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

const assert = require('assert')
const pad = require('../../../src/utilities/pad')

describe('pad', function() {
  it('pads strings', function() {
    assert.equal(pad('cat', 7, '+'), 'cat+++')
    assert.equal(pad('dog', 12, '*'), 'dog********')
    assert.equal(pad('cow', 4, ' '), 'cow')
  })
  it('returns original string if not given length', function() {
    assert.equal(pad('test'), 'test')
  })

  it('uses space if not given character', function() {
    assert.equal(pad('test', 9), 'test    ')
  })
})
