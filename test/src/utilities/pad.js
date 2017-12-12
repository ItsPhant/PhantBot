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
