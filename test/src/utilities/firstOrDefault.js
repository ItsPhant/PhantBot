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
