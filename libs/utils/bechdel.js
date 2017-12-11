const request = require('request')

const Help = require('./help.js')

Help.document({
  name:   'bechdel',
  use:    'Gets the Bechdel Test score for a movie.',
  syntax: '<movie>'
})

/**
 * Parses site rating into easier to understand form.
 * @param {string|number} rating Rating of movie
 * @returns {string} Human-readable form of movie rating
 */
function parseRating(rating) {
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
 * Gets result for movie title search.
 * @param {string} query Title to search for
 * @param {function} success Callback function for successful query
 * @param {function} error Callback function run on error
 * @returns {string} Results
 */
function search(query, success, error) {
  let url = `http://bechdeltest.com/api/v1/getMoviesByTitle?title=${encodeURIComponent(query)}`

  request.get({url:url}, function onRequest(err, res, body) {
    if (!err && res.statuscode !== 404) {
      let movies = '\`\`\`diff\n'
      JSON.parse(body).forEach((movie) => {
        try {
          movies += `+ ${movie.title}: ${parseRating(movie.rating)}\n`
        } catch (e) {
          return error()
        }
      })
      return success(movies += '\`\`\`')
    } else {
      return error()
    }
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
      return
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
