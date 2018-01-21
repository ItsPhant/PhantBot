/**
 * PhantBot is a free multipurpose bot made for Discord.
 * Copyright (C) 2018  Ellie Phant
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

const http = require('http')
const response = require('../utilities/response')
const firstOrDefault = require('../utilities/firstOrDefault')
const toSentenceCase = require('../utilities/toSentenceCase')

const Help = require('./help.js')

Help.document({
  name: 'define',
  use: 'Define a word using the Pearson english dictionary.',
  syntax: '<word>',
  type: 'service'
})

let baseurl = 'http://api.pearson.com/v2/dictionaries/entries?headword='

/**
 * Parses response's body into human-readable form.
 * @param {Object} body Response object
 * @returns {string} Human-readable definition
 */
function parseBody (body) {
  let definition = JSON.parse(body)
    .results[0]
    .senses[0]
    .definition

  if (typeof definition === 'string') {
    return toSentenceCase(definition)
  } else {
    return toSentenceCase(firstOrDefault(definition))
  }
}

/**
 * Parses data received from request.
 * @param {string} rawData Data to parse
 * @param {Message} message The message that triggered this command
 * @returns {void}
 */
function onEnd (rawData, message) {
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
    function onRequest (res) {
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
      res.on('data', function onData (chunk) {
        rawData += chunk
      })

      res.on('end', () => onEnd(rawData, message))
    }).on('error', function onError (e) {
      console.error(`Got error: ${e.message}`)
    })
}
