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
