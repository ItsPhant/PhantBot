/**
 * Javascript version of C#'s FirstOrDefault.
 * @param {Object} object Object to get child from
 * @param {Object} defaultValue Default value to return
 * @returns {Object} The first element of a sequence, or a default value
 */
module.exports = function firstOrDefault(object, defaultValue) {
  if (defaultValue === undefined) {
    defaultValue = null
  }

  let value
  let found = false
  for (const i in object) {
    value = i
    found = true
    break
  }

  return (!found) ?
    defaultValue :
    value
}
