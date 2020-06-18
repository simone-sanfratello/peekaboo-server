'use strict'

const helper = require('../test/helper')

async function debug () {
  const settings = helper.server.settings()
  settings.relay.request.rewrite = (request, forward) => {
    if (forward.url === 'https://postman-echo.com/post' && forward.method === 'POST') {
      request.body = { fuffi: 'miao' }
    }
  }
  await helper.server.setup(settings)

  const response = await helper.request({
    method: 'post',
    path: '/url/https://postman-echo.com/post',
    form: { ciao: 'bau' }
  })

  console.log(response.statusCode)
  console.log(response.body)

  await helper.server.teardown()
}

debug()
