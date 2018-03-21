/**
 * PhantBot is a free multipurpose bot made for Discord.
 * Copyright (C) 2018  Ellie Phant
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

const fs = require('fs')

let guilds = {}

function readFile () {
  fs.readFile('./config/roles.json', 'utf8', function onRead (err, data) {
    if (err) {
      console.error(err.message)
    }

    guilds = JSON.parse(data)
  })
}

readFile()

function get (useCache) {
  if (!useCache) {
    readFile()
  }
  return guilds
}

function write (contents) {
  fs.writeFile('./config/roles.json', JSON.stringify(contents, null, 2), 'utf8', (err) => {
    if (err) {
      console.error(err.message)
    }
  })
  guilds = contents
}

module.exports = {
  get: get,
  write: write
}
