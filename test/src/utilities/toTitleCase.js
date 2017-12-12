const assert = require('assert')
const toTitleCase = require('../../../src/utilities/toTitleCase')

describe('toTitleCase', function() {
  it('Returns error on invalid string', function() {
    assert.equal(toTitleCase(null), 'Error parsing string.')
  })
  it('Applies title case', function() {
    assert.equal(
      toTitleCase('the quick BROWN fox jumps over the lazy dog.'),
      'The Quick Brown Fox Jumps Over The Lazy Dog.')
  })
})

