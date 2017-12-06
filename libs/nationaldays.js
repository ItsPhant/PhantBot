const request = require('request')
const $ = require('cheerio')

const nationalUrl = 'http://nationaldaycalendar.com/latest-posts/'

exports.getMessage = (success, failure) => {
  request(nationalUrl, function(err, res, body) {
    if (!err && res.statusCode == 200) {
      var today = $('.post', body).first()
      var days = $('h2.entry-title a', today).text().split(' – ')
      days.shift()

      var _days = arrayToSentence(days) 

      var message = 'Happy ' + _days + '!'

      return success(message)

    } else {
      return failure()
    }
  })
}

function toTitleCase(phrase) {
  return phrase
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function arrayToSentence(arr) {
  var last = toTitleCase(arr.pop())

  if (arr.length > 0) {
    return arr.map(x => toTitleCase(x)).join(', ') + ', and ' + last
  } else {
    return last
  }
}
