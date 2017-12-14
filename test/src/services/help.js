/**
 * PhantBot is a free multipurpose bot made for Discord.
 * Copyright (C) 2017  Ellie Phant
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

const assert = require('assert');
const Message = require('../../mock/discord.js/structures/Message')
const config = require('../../../config.json')

const Help = require('../../../src/services/help')

describe('Help', function() {
  describe('#send()', function() {
    it('when not given a command', function() {
      var message = new Message('!help')
      Help.send(message, 'help')
      assert.ok(message.channel.result.includes(
        Help.pad('help:') + 
        ' Display this message, or help for a command.'
      ))
    })
    it('when given a command', function() {
      test = {
        name:   'test',
        use:    'Test Help#getCommandHelp()',
        syntax: ''
      }

      Help.document(test)

      var message = new Message('!help test')

      Help.send(message, 'help test')
      assert.equal(`\`\`\`${test.name}: ${test.use}\n\n` +
                   `usage: ${config.bot.prefix + test.name} \`\`\``,
                   message.channel.result)
    })
    it('when given an invalid command', function() {
      var message = new Message('!help foo')
      Help.send(message, 'help foo')
      assert.equal(message.channel.result, 'Unknown command foo.')
    })
    it('when given a syntax based command', function() {
      test = {
        name:   'foo',
        use:    'bar',
        syntax: 'baz',
        onlySyntax: true
      }

      var message = new Message('!help foo')
      Help.document(test)
      Help.send(message, 'help foo')

      assert.equal(`\`\`\`${test.name}:` +
                   ` ${test.use}\n\n` +
                   `usage: ${test.syntax}\`\`\``, message.channel.result)
    })
  })
})
