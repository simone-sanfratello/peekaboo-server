'use strict'

const path = require('path')
const default_ = require('../bin/settings/default')

module.exports = function (settings) {
  default_(settings)
  settings.log.level = 'info'
  settings.log.pretty = true

  /*
  settings.server.https: {
    key: fs.readFileSync(path.join(__dirname, '../../cert/key.pem')),
    cert: fs.readFileSync(path.join(__dirname, '../../cert/cert.pem'))
  }
  */

  function fixErrorResponses(request, response) {
    const [url] = request.raw.url.split('?')
    // known broken responses (uat)
    return (
      (url.endsWith('/rtl/bacheca/items') && response.statusCode == 400) ||
      (url.endsWith('/bank-profiles/search') && response.statusCode == 403) ||
      (url.endsWith('/projects/summary') && response.statusCode == 400) ||
      (url.endsWith('/getCardDetails') && response.statusCode == 500) ||
      (url.endsWith('/PromoCode/GetPromoCode') && response.statusCode == 404) ||
      (url.endsWith('/user-id/balances') && response.statusCode == 404) ||
      (url.endsWith('/insights/stats/static') && response.statusCode == 400) ||
      (url.endsWith('/stats/expense-analysis') && response.statusCode == 400) ||
      (url.endsWith('/movements/recurrent') && response.statusCode == 400)
    )
  }

  settings.relay.response.rewrite = (request, response) => {
    response.headers['access-control-allow-headers'] = 'Origin,X-Requested-With,Content-Type,Accept,X-Cnctr-Device-Id,X-Cnctr-Channel-Id,X-Cnctr-Bio,X-Cnctr-Fast,cache-control,X-Cnctr-OAuth-Token,cd_channel,X-Cnctr-OAuth-Channel,cd_access_key,set-cookie,x-csrf-token,Authorization,expires,docOne,accessToken,X-Cnctr-Oauth-Token,cd-access-key,X-CSRF-TOKEN,username,clientId,requestId,sessionId,userId,userType,x-ma-sid,x-ma-bid,uniqueid,nbTransactionName,User-Agent,Referer,Accept-Content,Accept-Language,cookie,X-Redirect-Uri,X-Tpp-Redirect-Preferred,X-User-Trace-Id,X-Tx-Trace-Id,X-Server-Session-Trace-Id,X-Client-Session-Trace-Id,client-platform,client-version,X-Nok-Redirect-Uri,X-Bank-Environment,x-bank-service-code'
    response.headers['access-control-allow-methods'] = 'GET,PUT,POST,DELETE,OPTIONS,PATCH'
    response.headers['access-control-expose-headers'] = 'Origin,X-Requested-With,Content-Type,Accept,X-Cnctr-Device-Id,X-Cnctr-Channel-Id,X-Cnctr-Bio,X-Cnctr-Fast,cache-control,X-Cnctr-OAuth-Token,cd_channel,X-Cnctr-OAuth-Channel,cd_access_key,set-cookie,x-csrf-token,Authorization,expires,docOne,accessToken,X-Cnctr-Oauth-Token,cd-access-key,X-CSRF-TOKEN,x-ma-sid,x-ma-bid,uniqueid,cookie,X-Tx-Trace-Id,X-Server-Session-Trace-Id,X-Client-Session-Trace-Id,maintenance,must-update,should-update,X-User-Trace-Id,x-clt'
    response.headers['access-control-max-age'] = 172800
    response.headers['access-control-allow-credentials'] = 'true'
    response.headers['access-control-allow-origin'] = request.headers.origin

    response.headers.vary = 'Accept-Encoding' 

    // mask session expire error
    if ((response.statusCode === 401 || response.statusCode === 403) && !request.raw.url.includes('/all/sca/login')) {
      response.statusCode = 404
    } else if (response.statusCode > 399 && fixErrorResponses(request, response)) {
      // mask errors that break frontend
      response.body = JSON.stringify({
        maskedResponse: true,
        originalResponse: {
          code: response.statusCode,
          body: response.body
        }
      })
      response.statusCode = 209
    }
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
          route: /^\/url\/.+\/all\/sca\/(login|otp)/,
        },
        response: {
          status: (status) => status == 200
        }
      },
      // cache all without body
      {
        request: {
          methods: '*',
          route: /^\/url/,
          // body: true,
          query: true
        },
        response: {
          status: (status) => status > 199 && status < 501
        }
      },
      // @todo special body?
    ],
    storage: {
      mode: 'fs',
      config: { path: path.join(__dirname, '../cache/peekaboo') }
    }
  }
}
