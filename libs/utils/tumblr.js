const tumblr = require('tumblr.js');
const he = require('he');

var config = require('../../config.json')
const Help = require('./help.js')

Help.document({
    name:   'obscuresorrow',
    use:    'Get a random entry from the Dictionary of Obscure Sorrows.',
    syntax: ''
})

Help.document({
    name:   '/hobscuwesowwow',
    use:    'Get a wandom entwy fwom the Dictionawy of Obscuwe Sowwows.',
    syntax: ''
})

var client = tumblr.createClient({
  consumer_key: config.bot.tumblr.consumer_key,
  consumer_secret: config.bot.tumblr.consumer_secret,
})

exports.getRandomPost = (blogName, callback) => {
  client.blogInfo(blogName, (err, resp) => {
    let offset = Math.floor(Math.random() *
      (resp.blog.posts - 1) + 1)
    client.blogPosts(blogName, { offset: offset }, (err, blog) => {
      let post = blog.posts[0]
      if (post.type === 'video') {
        return callback(parsePost(post.title, post.caption))
      } else {
        return callback(parsePost(post.title, post.body))
      }
    })
  })
}

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
