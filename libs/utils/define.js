const http = require('http')
const response = require('../response')

const Help = require('./help.js')

Help.document({
  name:   'define',
  use:    'Define a word using the Pearson english dictionary.',
  syntax: '<word>'
})

let baseurl = 'http://api.pearson.com/v2/dictionaries/entries?headword='

/**
 * Applies sentence case to string.
 * @param {string} str String to apply case to
 * @returns {string} Sentence cased string
 */
function applySentenceCase(str) {
  if (!str) {
    return 'Error parsing string.'
  }

  let rg = /(^\w{1}|\.\s*\w{1})/gi
  return str.replace(rg, function filter(toReplace) {
    return toReplace.toUpperCase()
  })
}

/**
 * Javascript version of c#'s firstOrDefault.
 * @param {Object} obj Object to get child from
 * @param {Object} d Default object to return
 * @returns {Object} The first element of a sequence, or a default value
 */
function firstOrDefault(obj, d) {
  for (const i in obj) {
    if (obj.hasOwnProperty(i)) {
      return obj[i]
    }
  }
  return d
}

/**
 * Parses response's body into human-readable form.
 * @param {Object} body Response object
 * @returns {string} Human-readable definition
 */
function parseBody(body) {
  let definition = JSON.parse(body)
    .results[0]
    .senses[0]
    .definition

  if (typeof definition === 'string') {
    return applySentenceCase(definition)
  } else {
    return applySentenceCase(firstOrDefault(definition))
  }
}

/**
 * Parses data received from request.
 * @param {string} rawData Data to parse
 * @param {Message} message The message that triggered this command
 * @returns {void}
 */
function onEnd(rawData, message) {
  try {
    message.channel.send(parseBody(rawData))
  } catch (e) {
    console.error(e.message)
    message.channel.send('Error getting definition.')
  }
}

/**
 * Module for defining words using pearson api.
 * @param {Message} message The message that triggered this command
 * @param {string} suffix The part of the message after the bot's prefix
 * @returns {void}
 */
exports.send = (message, suffix) => {
  let word = suffix.substring(7).trim()

  http.get(
    encodeURI(baseurl + encodeURIComponent(word)),
    function onRequest(res) {
      const {statusCode} = res

      let error = response.isValid(res,
                                   statusCode === 200,
                                   'application/json')

      if (error) {
        console.error(error.message)
        res.resume()
        return
      }

      res.setEncoding('utf8')
      let rawData = ''
      res.on('data', function onData(chunk) {
        rawData += chunk
      })

      res.on('end', () => onEnd(rawData, message))
    }).on('error', function onError(e) {
    console.error(`Got error: ${e.message}`)
  })
}
