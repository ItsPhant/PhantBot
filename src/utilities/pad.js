/**
 * Adds padding to string
 * @param {string} word String to pad
 * @param {Number} length Length of pad
 * @param {string} character Character to pad with
 * @returns {string} Padded string
 */
module.exports = function pad(word, length, character) {
  if (word === undefined) {
    return
  }

  if (length === undefined) {
    return word
  }

  if (character === undefined) {
    character = ' '
  }

  let pad = Array(length).join(character)

  return (word + pad).substring(0, pad.length)
}
