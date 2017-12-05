const request = require('request');

const Help = require('./help.js')

Help.document({
  name:   'define',
  use:    'Define a word using the Pearson english dictionary.',
  syntax: '<word>'
})

let baseurl = 'http://api.pearson.com/v2/dictionaries/entries?headword='

//word success failure
exports.send = (msg, message) => {

  let word = msg.substring(7).trim()

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

//https://stackoverflow.com/a/19089667
function applySentenceCase(str) {
  if (!str)
    return "Error parsing string."

  var rg = /(^\w{1}|\.\s*\w{1})/gi
  return str.replace(rg, function(toReplace) {
    return toReplace.toUpperCase()
  })
}

//https://stackoverflow.com/a/19544945
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
