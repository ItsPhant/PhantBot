/**
 * Javascript version of C#'s FirstOrDefault.
 * @param {Object} object Object to get child from
 * @param {Object} defaultObj Default object to return
 * @returns {Object} The first element of a sequence, or a default value
 */
module.exports = function firstOrDefault(object, defaultObj) {
  for (const i in object) {
    if (object.hasOwnProperty(i)) {
      return object[i]
    }
  }
  return defaultObj
}
