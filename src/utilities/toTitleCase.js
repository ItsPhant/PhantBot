/**
 * Converts string to title case.
 * @param {string} string String to convert
 * @returns {string} Converted string
 */
module.exports = function toTitleCase(string) {
  return string
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
