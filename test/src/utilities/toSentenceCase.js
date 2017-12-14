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
const toSentenceCase = require('../../../src/utilities/toSentenceCase')

describe('toSentenceCase', function() {
  it('Returns error on invalid string', function() {
    assert.equal(toSentenceCase(null), 'Error parsing string.')
  })
  it('Applies sentence case', function() {
    assert.equal(
      toSentenceCase('the quick BROWN fox jumps over the lazy dog.'),
      'The quick brown fox jumps over the lazy dog.')
  })
})
