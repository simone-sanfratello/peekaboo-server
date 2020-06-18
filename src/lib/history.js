'use strict'

const fs = require('fs').promises

const history = {
  read: async function (file) {
    const data = await fs.readFile(file, 'utf8')
    const content = JSON.parse(data)

    for (const i of ['request', 'response']) {
      if (content[i] && content[i].body && typeof content[i].body === 'string') {
        try {
          content[i].body = JSON.parse(content[i].body)
        } catch (error) {}
      }
    }
    return content
  }
}

module.exports = history
