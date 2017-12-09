const request = require('request');

const Help = require('./help.js')

Help.document({
  name:   'define',
  use:    'Define a word using the Pearson english dictionary.',
  syntax: '<word>'
})

let baseurl = 'http://api.pearson.com/v2/dictionaries/entries?headword='

/**
 * Module for defining words using pearson api.
 * @param {Message} message The message that triggered this command
 * @param {string} suffix The part of the message after the bot's prefix
 */
exports.send = (message, suffix) => {

  let word = suffix.substring(7).trim()

  request.get(
    { url:encodeURI(baseurl + encodeURIComponent(word)) },
    function(err, res, body) {
    if(!err & res.statusCode == 200) {
      try {
        return message.channel.send(parseBody(body))
      } catch (e) {
        return message.channel.send('Error getting definition.')
      }
    } else {
      return message.channel.send('Error getting definition.')
    }
  })
}

/**
 * Applies sentence case to string.
 * @param {string} str String to apply case to
 * @returns {string}
 */
function applySentenceCase(str) {
  if (!str)
    return 'Error parsing string.'

  var rg = /(^\w{1}|\.\s*\w{1})/gi
  return str.replace(rg, function(toReplace) {
    return toReplace.toUpperCase()
  })
}

/**
 * Javascript version of c#'s firstOrDefault.
 * @param {Object} obj Object to get child from
 * @param {Object} d Default object to return
 * @returns {Object}
 */
function firstOrDefault(obj, d) { 
  for (var i in obj)
  {
    if (obj.hasOwnProperty(i))
    {
      return obj[i]
    }
  }
  return d
}

/**
 * Parses response's body into human-readable form.
 * @param {Object} body Response object
 * @returns {string}
 */
function parseBody(body) {
  let definition = JSON.parse(body)
    .results[0]
    .senses[0]
    .definition

  if (typeof definition === 'string')
    return applySentenceCase(definition)
  else
    return applySentenceCase(firstOrDefault(definition))
}
