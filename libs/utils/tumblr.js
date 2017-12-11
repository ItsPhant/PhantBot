const https = require('https')
const he = require('he')
const response = require('../response')

const config = require('../../config.json')
const Help = require('./help.js')

Help.document({
  name:   'obscuresorrow',
  use:    'Get a random entry from the Dictionary of Obscure Sorrows.',
  syntax: ''
})

Help.document({
  name:   'obscuwesowwow',
  use:    'Get a wandom entwy fwom the Dictionawy of Obscuwe Sowwows.',
  syntax: '',
  hidden: true
})

const apikey = config.bot.tumblr.apikey

/**
 * Replaces html formatting in post with markdown version.
 * @param {string} title The title of the post
 * @param {string} body The body of the post
 * @returns {string} Formatted post
 */
function parsePost(title, body) {
  let parsed = `**${title}:**\n\n`

  let text = he.decode(body)
  text = text.replace('<p>', '').replace('</p>', '')
  text = text.replace('<em>', '***').replace('</em>', '***')
  text = text.replace('<i>', '***').replace('</i>', '***')
  text = text.replace('<br/>', '\n').replace('<br />', '\n')
  text = text.replace('<span>', '').replace('</span>', '')

  return parsed + text
}

/**
 * Parses blog info recieved from request.
 * @param {string} rawData Data to parse
 * @param {function} callback Callback function for info
 * @returns {Number} Random post to get
 */
function onEndInfo(rawData, callback) {
  try {
    const parsedData = JSON.parse(rawData)
    return callback(Math.floor(Math.random() *
                    (parsedData.response.blog.posts - 1) + 1))
  } catch (e) {
    console.error(`Got error: ${e.message}`)
  }
}

/**
 * Gets blog info.
 * @param {string} url Url to query
 * @param {function} callback Called after info retrieved
 * @returns {void}
 */
function getInfo(url, callback) {
  https.get(`${url}/info?api_key=${apikey}`, function onRequest(res) {
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

    res.on('end', () => onEndInfo(rawData, callback))
  }).on('error', function onError(e) {
    console.error(`Got error: ${e.message}`)
    return onError()
  })
}

/**
 * Parses data received from request.
 * @param {string} rawData Data to parse
 * @param {function} callback Callback function for query
 * @returns {void}
 */
function onEndPost(rawData, callback) {
  try {
    let parsedData = JSON.parse(rawData)
    let post = parsedData.response.posts[0]
    if (post.type === 'video') {
      return callback(parsePost(post.title, post.caption))
    } else {
      return callback(parsePost(post.title, post.body))
    }
  } catch (e) {
    let msg = `Got error: ${e.message}`
    console.error(msg)
    return callback(msg)
  }
}

/**
 * Gets blog random post.
 * @param {string} url Blog url to query
 * @param {Number} post Random post to get
 * @param {function} callback Called after post retrieved
 * @returns {void}
 */
function getPost(url, post, callback) {
  let fullurl = `${url}/posts?api_key=${apikey}&offset=${post}`
  https.get(fullurl, function onRequest(res) {
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

    res.on('end', () => onEndPost(rawData, callback))
  }).on('error', function onError(e) {
    console.error(`Got error: ${e.message}`)
    return onError()
  })
}

/**
 * Module to get posts from tumblr blogs.
 * @param {string} blogName The blog to fetch data from
 * @param {function} callback Callback function to run after request
 * @returns {string} Retrieved post
 */
exports.getRandomPost = (blogName, callback) => {
  let baseurl = `https://api.tumblr.com/v2/blog/${blogName}.tumblr.com`

  getInfo(baseurl, function onInfo(postNum) {
    getPost(baseurl, postNum, content => {
      return callback(content)
    })
  })
}
