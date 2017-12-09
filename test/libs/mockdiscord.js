class Message {
  constructor(content) {
    this.channel = new Channel()
    this.content = content
    this.author = new User()
  }

  delete() {
    return 0;
  }
}

class User {
  constructor(id) {
    if (id !== undefined)
      this.id = id
    else
      this.id = "1234567890"
  }
}

class Channel {
  constructor(id, name) {
    if (id !== undefined)
      this.id = id
    else
      this.id = "123456789"

    if (name !== undefined)
      this.name = name
    else
      this.name = "Mock Channel"
    this.result = '' 
  }

  send(content) {
    this.result = content
  }
}

module.exports = {
  Message: Message,
  Channel: Channel,
  User: User
}
