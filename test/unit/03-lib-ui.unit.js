'use strict'

const fs = require('fs').promises
const ui = require('../../src/lib/ui')

describe('lib.ui', () => {
  test('ui.setup', async () => {
    const cases = [
      {
        settings: {
          hostname: 'localhost',
          server: {
            https: true,
            port: 9999
          }
        },
        content: 'const server = {\n' +
          '  host: \'https://localhost:9999\',\n' +
          '  realtime: \'wss://localhost:9999/realtime\'\n' +
          '}\n' +
          'module.exports = server\n'
      },
      {
        settings: {
          hostname: 'localhost',
          server: {
            https: false,
            port: 80
          }
        },
        content: 'const server = {\n' +
          '  host: \'http://localhost\',\n' +
          '  realtime: \'ws://localhost/realtime\'\n' +
          '}\n' +
          'module.exports = server\n'
      },
      {
        settings: {
          hostname: 'localhost',
          server: {
            https: {},
            port: 443
          }
        },
        content: 'const server = {\n' +
            '  host: \'https://localhost\',\n' +
            '  realtime: \'wss://localhost/realtime\'\n' +
            '}\n' +
            'module.exports = server\n'
      }
    ]

    for (let i = 0; i < cases.length; i++) {
      await ui.setup(cases[i].settings, '/tmp/peekaboo-test-ui-setup')
      const content = await fs.readFile('/tmp/peekaboo-test-ui-setup', 'utf8')
      expect(content).toBe(cases[i].content)
    }
  })
})
