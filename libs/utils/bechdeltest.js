const fs = require('fs');
const request = require('request');

exports.search = (query, success, error) => {
  let url = `http://bechdeltest.com/api/v1/getMoviesByTitle?title=${encodeURIComponent(query)}`

  request.get({ url:url }, function(err, res, body) {
    if (!err && res.statuscode !== 404) {
      let movies = `\`\`\`diff
`
      JSON.parse(body).forEach((movie) => {
        try {
          movies += `+ ${movie.title}: ${parseRating(movie.rating)}\n`
        } catch(e) {
          return error()
        }
      })
      return success(movies += '\`\`\`')
    } else {
      return error()
    }
  })
}

function parseRating(rating) {
  var text
  switch(rating) {
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
