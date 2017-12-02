var PersonalityInsightsV3 = require('watson-developer-cloud/personality-insights/v3');

var personality_insights = new PersonalityInsightsV3(
  require('../config.json').bot.watsonDeveloperCloud)

exports.getInsights = (guild, userID) => {
  guild.channels.forEach((value, key, map) => {
    return getInsights(value.messages.filter((message) => {
      message.author.id === userID
    }))
  })
}

constructContentItems = (messages) => {
  contentItems = []
  return messages.forEach(function(message) {
    contentItems.push({
      'content': message.content,
      'contenttype': 'text/plain',
      'created': message.createdAt.valueOf(),
      'id': message.id,
      'language': 'en'
    })
  })
}

getInsights = (messages) => {
  params = {
    content_items: constructContentItems(messages),
    consumption_preferences: true,
    raw_scores: true,
    headers: {
      'accept-language': 'en',
      'accept': 'application/json'
    }
  }

  personality_insights.profile(params, function(error, response) {
    if (error)
      console.log('Error:', error)
    else
      console.log(JSON.stringify(response, null, 2))
      return `\`\`\`\nJSON.stringify(response, null, 2)\n\`\`\``
    }
  )
}

