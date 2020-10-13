'use strict'

const path = require('path')

module.exports = function (settings) {
  settings.log = {
    level: 'info',
    pretty: false,
    version: settings.version
  }

  settings.hostname = 'localhost'

  // @see https://www.fastify.io/docs/latest/Server/
  settings.server = {
    port: 8080,
    host: '0.0.0.0',
    /*
    https: {
      key: fs.readFileSync(path.join(__dirname, '../../cert/key.pem')),
      cert: fs.readFileSync(path.join(__dirname, '../../cert/cert.pem'))
    }
    */
  }

  settings.request = {
    // purpose: fix if content-length is provided but body size is less than content-length
    // wait 500 ms from last received pack, then go on
    idle: 500
  }

  settings.cors = {
    origin: true,
    credentials: true,
    methods: 'GET,PUT,POST,DELETE,OPTIONS,PATCH'
  }

  settings.ws = {
    options: {
      maxPayload: 1024 * 1024 // 1 MiB
    }
  }

  settings.history = {
    path: path.join(process.cwd(), 'cache/history')
  }

  settings.relay = {
    timeout: 20000,
    response: {
      // rewrite: (request, response) => { }
    },
    request: {
      // rewrite: (request, forward) => { }
    }
  }

  settings.cache = {
    expire: 365 * 24 * 60 * 60 * 1000, // 1y
    rules: [
      {
        request: {
          methods: '*',
          route: /^\/url/,
          body: true,
          query: true
        },
        response: {
          status: (status) => status > 199 && status < 501
        }
      }
    ],
    storage: {
      mode: 'fs',
      config: { path: path.join(process.cwd(), 'cache/peekaboo') }
    }
  }
}
