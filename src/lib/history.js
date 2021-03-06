'use strict'

const fs = require('fs').promises
const curl = require('request-as-curl')

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
  },
  curl: function (request, https) {
    let _curl = curl(request.raw)
    if (https) {
      _curl = _curl.replace('curl \'http://', 'curl \'https://')
    }
    return _curl
  }
}

module.exports = history
