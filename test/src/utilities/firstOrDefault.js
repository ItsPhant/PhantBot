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
const firstOrDefault = require('../../../src/utilities/firstOrDefault')

describe('firstOrDefault', function() {
  it('returns first object', function() {
    const obj = {
      first: "first",
      second: "second",
      third: "third"
    }

    assert.equal(firstOrDefault(obj, obj.second), obj.first)
  })
  it('returns default object', function() {
    assert.ok(firstOrDefault(null, 10) === 10)
  })
})
