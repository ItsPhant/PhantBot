/**
 * PhantBot is a free multipurpose bot made for Discord.
 * Copyright (C) 2017  Ellie Phant
 *
 * PhantBot is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * PhantBot is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with PhantBot.  If not, see <https://www.gnu.org/licenses/>.
 */

const https = require('https')
const response = require('../utilities/response')
const toTitleCase = require('../utilities/toTitleCase')
const $ = require('cheerio')

const Help = require('./help.js')

Help.document({
  name:   'nationalday',
  use:    'Display today\'s "National Days".',
  syntax: ''
})

const nationalUrl = 'https://nationaldaycalendar.com/latest-posts/'

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
 * Parses data received from request.
 * @param {string} rawData Data to parse
 * @param {function} success Callback function for successful query
 * @param {function} failure Callback function for failure
 * @returns {void}
 */
function onEnd(rawData, success, failure) {
  try {
    let today = $('.post', rawData).first()
    let days = $('h2.entry-title a', today).text().split(' – ')
    days.shift()

    let _days = arrayToSentence(days)

    let message = 'Happy ' + _days + '!'

    return success(message)
  } catch (e) {
    console.error(e.message)
    return failure()
  }
}

/**
 * Gets and parses national day information.
 * @param {function} success Callback to run on success
 * @param {function} failure Callback to run on failure
 * @returns {string} Result
 */
function getMessage(success, failure) {
  https.get(nationalUrl, function onRequest(res) {
    const {statusCode} = res

    let error = response.isValid(res,
                                 statusCode === 200,
                                 'text/html')

    if (error) {
      console.error(error.message)
      res.resume()
      return failure()
    }

    res.setEncoding('utf8')
    let rawData = ''
    res.on('data', function onData(chunk) {
      rawData += chunk
    })

    res.on('end', () => onEnd(rawData, success, failure) )
  }).on('error', function onError(e) {
    console.error(`Got error: ${e.message}`)
    return failure()
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
