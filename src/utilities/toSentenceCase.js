/**
 * Applies sentence case to string.
 * @param {string} string String to apply case to
 * @returns {string} Sentence cased string
 */
module.exports = function applySentenceCase(string) {
  if (!string) {
    return 'Error parsing string.'
  }

  let rg = /(^\w{1}|\.\s*\w{1})/gi
  return string.replace(rg, function filter(toReplace) {
    return toReplace.toUpperCase()
  })
}
