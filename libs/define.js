const request = require('request');

let baseurl = 'http://api.pearson.com/v2/dictionaries/entries?headword='

exports.define = (word, success, failure) => {
  request.get(
    { url:encodeURI(baseurl + encodeURIComponent(word.trim())) },
    function(err, res, body) {
    if(!err & res.statusCode == 200) {
      try {
        return success(parseBody(body))
      } catch (e) {
        return failure(404)
      }
    } else {
      return failure(res.statusCode)
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

//https://stackoverflow.com/a/19544945
var firstOrDefault = function(obj, d) { 
  for (var i in obj)
  {
    if (obj.hasOwnProperty(i))
    {
      return obj[i]
    }
  }
  return d
}
