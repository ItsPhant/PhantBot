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

const http = require('http')
const response = require('../utilities/response')

const Help = require('./help.js')

Help.document({
  name: 'bechdel',
  use: 'Gets the Bechdel Test score for a movie.',
  syntax: '<movie>',
  type: 'service'
})

/**
 * Parses site rating into easier to understand form.
 * @param {string|number} rating Rating of movie
 * @returns {string} Human-readable form of movie rating
 */
function parseRating (rating) {
  let text = ''
  switch (rating) {
    case '0':
      text = 'Less than two named women.'
      break
    case '1':
      text = 'Two women never speak to each other.'
      break
    case '2':
      text = 'Two women only speak about a man.'
      break
    case '3':
      text = 'Passes.'
      break
  }
  return text
}

/**
 * Parses data received from request.
 * @param {string} rawData Data to parse
 * @param {function} onSuccess Callback function for successful query
 * @param {function} onError Callback function for error
 * @returns {void}
 */
function onEnd (rawData, onSuccess, onError) {
  try {
    let movies = '```diff\n'
    const parsedData = JSON.parse(rawData)
    parsedData.forEach(movie => {
      movies += `+ ${movie.title}: ${parseRating(movie.rating)}\n`
    })
    return onSuccess(movies += '```')
  } catch (e) {
    console.error(e.message)
    return onError()
  }
}

/**
 * Gets result for movie title search.
 * @param {string} query Title to search for
 * @param {function} onSuccess Callback function for successful query
 * @param {function} onError Callback function run on error
 * @returns {string} Results
 */
function search (query, onSuccess, onError) {
  let url = `http://bechdeltest.com/api/v1/getMoviesByTitle?title=${encodeURIComponent(query)}`

  http.get(url, function onRequest (res) {
    const {statusCode} = res

    let error = response.isValid(res,
                                 statusCode !== 404,
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

    res.on('end', () => onEnd(rawData, onSuccess, onError))
  }).on('error', function onError (e) {
    console.error(`Got error: ${e.message}`)
    return onError()
  })
}

/**
 * Queries the bechdeltest.com api for a given movie's rating.
 * @param {Message} message The message that triggered this command
 * @param {string} suffix The part of the message after the bot's prefix
 * @param {function} cb Callback function to run after request
 * @returns {void}
 */
exports.send = (message, suffix, cb) => {
  if (!cb) {
    cb = () => {

    }
  }

  search(suffix.substring(8), result => {
    message.channel.send(result)
    cb()
  }, () => {
    message.channel.send('Error getting movie.')
    cb()
  })
}
