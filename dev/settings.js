'use strict'

const path = require('path')
const fs = require('fs')
const http = require('../src/lib/http')
const default_ = require('../bin/settings/default')

module.exports = function (settings) {
  default_(settings)
  settings.hostname = 'myapp.localhost'
  settings.log.level = 'info'
  settings.log.pretty = true

  settings.server.port = 8080
  /*
  settings.server.https = {
    key: fs.readFileSync(path.join(__dirname, '../cert/myapp.localhost-key.pem')),
    cert: fs.readFileSync(path.join(__dirname, '../cert/myapp.localhost.pem'))
  }
  */

  settings.relay.response.rewrite = (request, response) => {
    response.headers = http.adjustResponseCookies(request, response, { fixChars: true, replaceDomain: '.' + settings.hostname })

    response.headers['access-control-allow-headers'] = 'Origin,X-Requested-With,Content-Type,Accept,X-Cnctr-Device-Id,X-Cnctr-Channel-Id,X-Cnctr-Bio,X-Cnctr-Fast,cache-control,X-Cnctr-OAuth-Token,cd_channel,X-Cnctr-OAuth-Channel,cd_access_key,set-cookie,x-csrf-token,Authorization,expires,docOne,accessToken,X-Cnctr-Oauth-Token,cd-access-key,X-CSRF-TOKEN,username,clientId,requestId,sessionId,userId,userType,x-ma-sid,x-ma-bid,uniqueid,nbTransactionName,User-Agent,Referer,Accept-Content,Accept-Language,cookie,X-Redirect-Uri,X-Tpp-Redirect-Preferred,X-User-Trace-Id,X-Tx-Trace-Id,X-Server-Session-Trace-Id,X-Client-Session-Trace-Id,client-platform,client-version,X-Nok-Redirect-Uri,X-Bank-Environment,x-bank-service-code'
    response.headers['access-control-allow-methods'] = 'GET,PUT,POST,DELETE,OPTIONS,PATCH'
    response.headers['access-control-expose-headers'] = 'Origin,X-Requested-With,Content-Type,Accept,X-Cnctr-Device-Id,X-Cnctr-Channel-Id,X-Cnctr-Bio,X-Cnctr-Fast,cache-control,X-Cnctr-OAuth-Token,cd_channel,X-Cnctr-OAuth-Channel,cd_access_key,set-cookie,x-csrf-token,Authorization,expires,docOne,accessToken,X-Cnctr-Oauth-Token,cd-access-key,X-CSRF-TOKEN,x-ma-sid,x-ma-bid,uniqueid,cookie,X-Tx-Trace-Id,X-Server-Session-Trace-Id,X-Client-Session-Trace-Id,maintenance,must-update,should-update,X-User-Trace-Id,x-clt'
    response.headers['access-control-max-age'] = 172800
    response.headers['access-control-allow-credentials'] = 'true'
    response.headers['access-control-allow-origin'] = request.headers.origin
    response.headers.vary = 'Accept-Encoding'

    /*
    // mask session expire error to prevent logout
    if ((response.statusCode === 401 || response.statusCode === 403) && !request.raw.url.includes('/login') && !request.raw.url.endsWith('/logout')) {
      response.statusCode = 404
    }
    */
  }

  settings.history = {
    path: path.join(__dirname, '../cache/history')
  }

  settings.cache = {
    expire: 365 * 24 * 60 * 60 * 1000, // 1y
    rules: [
      // cache login/otp without body only success
      {
        request: {
          methods: 'post',
          route: /^\/url\/.+\/all\/sca\/(login|otp)/
        },
        response: {
          status: (status) => status === 200
        }
      },
      // cache all without body
      {
        request: {
          methods: '*',
          route: /^\/url/
          // body: true,
          // query: true
        },
        response: {
          status: (status) => status > 199 && status < 501
        }
      }
    ],
    storage: {
      mode: 'fs',
      config: { path: path.join(__dirname, '../cache/peekaboo') }
    }
  }
}
