const request = require('request')
const $ = require('cheerio')

const Help = require('./help.js')

Help.document({
  name:   'nationalday',
  use:    'Display today\'s "National Days".',
  syntax: ''
})

const nationalUrl = 'http://nationaldaycalendar.com/latest-posts/'

/**
 * Converts string to title case.
 * @param {string} phrase String to convert
 * @returns {string} Converted string
 */
function toTitleCase(phrase) {
  return phrase
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * Joins results into single sentence.
 * @param {array} arr Array of national days
 * @returns {string} National day message
 */
function arrayToSentence(arr) {
  let last = toTitleCase(arr.pop())

  if (arr.length > 0) {
    return arr.map(x => toTitleCase(x)).join(', ') + ', and ' + last
  } else {
    return last
  }
}

/**
 * Gets and parses national day information.
 * @param {function} success Callback to run on success
 * @param {function} failure Callback to run on failure
 * @returns {string} Result
 */
function getMessage(success, failure) {
  request(nationalUrl, function onRequest(err, res, body) {
    if (!err && res.statusCode === 200) {
      let today = $('.post', body).first()
      let days = $('h2.entry-title a', today).text().split(' – ')
      days.shift()

      let _days = arrayToSentence(days)

      let message = 'Happy ' + _days + '!'

      return success(message)

    } else {
      return failure()
    }
  })
}

/**
 * Module for getting the national day from nationaldaycalendar.com.
 * @param {Message} message The message that triggered this command
 * @param {function} cb Callback function to run after request
 * @returns {void}
 */
exports.send = (message, cb) => {
  if (!cb) {
    cb = () => {
      return
    }
  }

  getMessage(
    days => {
      cb(message.channel.send(days))
    }, () => {
      cb(message.channel.send('Error getting national days.'))
    }
  )
}
