'use strict'

const { request, server } = require('../helper')

// TODO sent invalid content length and/or content type but still forward request
// curl http://localhost:8080/url/https://braceslab.com -X POST -H "content-length: 100" -H "content-type: aaa" --data "ciao"
// content-type: json

describe('relay service', () => {
  beforeAll(async () => {
    await server.setup()
  })

  afterAll(async () => {
    await server.teardown()
  })

  describe('basic', () => {
    const gets = [
      { url: 'https://braceslab.com', content: /simone sanfratello/i, options: { responseType: 'text' } },
      { url: 'https://twitter.com', content: /twitter/, options: { responseType: 'text' } },
      { url: 'https://google.com', content: /google/, options: { responseType: 'text' } }
    ]
    for (const get of gets) {
      test('GET /url/' + get.url, async () => {
        const response = await request({
          path: '/url/' + get.url,
          ...get.options
        })

        expect(response.statusCode).toBe(200)
        expect(response.headers['content-type']).toContain('text/html')
        expect(response.body).toMatch(get.content)
      })
    }

    const posts = [
      {
        url: 'https://postman-echo.com/post',
        json: { ciao: 'bau' },
        response: {
          type: 'application/json',
          content: { data: { ciao: 'bau' } }
        }
      },
      {
        url: 'https://postman-echo.com/post',
        form: { ciao: 'bau' },
        response: {
          type: 'application/json',
          content: { data: { ciao: 'bau' } }
        }
      },
      {
        url: 'https://postman-echo.com/post',
        form: { ciao: 'bau' },
        response: {
          type: 'application/json',
          content: { data: { ciao: 'bau' } }
        }
      },
      {
        url: 'https://postman-echo.com/post?a=b',
        headers: {
          'content-type': 'application/json'
        },
        json: { ciao: 'bau' },
        response: {
          type: 'application/json',
          content: { json: { ciao: 'bau' } }
        }
      },
      {
        url: 'https://postman-echo.com/post?a=b',
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        form: { ciao: 'xbau' },
        response: {
          type: 'application/json',
          content: { json: { ciao: 'xbau' } }
        }
      }
    ]
    for (const post of posts) {
      test('POST /url/' + post.url, async () => {
        const response = await request({
          method: 'post',
          path: '/url/' + post.url,
          body: post.body,
          form: post.form,
          json: post.json,
          ...post.options
        })

        expect(response.statusCode).toBe(200)
        expect(response.headers['content-type']).toContain(post.response.type)
        expect(response.body).toEqual(expect.objectContaining(post.response.content))
      })
    }
  })

  describe('options', () => {
    test('GET /url/https://google.com rewrite request', async () => {
      const settings = server.settings()
      settings.relay.request.rewrite = (request, forward) => {
        if (forward.url === 'https://postman-echo.com/post' && forward.method === 'POST') {
          forward.headers['x-trace'] = 'peekaboo'
        }
      }
      await server.setup(settings)

      const response = await request({
        method: 'post',
        path: '/url/https://postman-echo.com/post',
        type: 'application/json',
        json: { ciao: 'bau' }
      })

      expect(response.statusCode).toBe(200)
      expect(response.body.headers['x-trace']).toBe('peekaboo')

      await server.teardown()
    })

    test('GET /url/https://braceslab.com/ timeout', async () => {
      const settings = server.settings()
      settings.relay.timeout = 100
      await server.setup(settings)

      const response = await request({
        method: 'get',
        path: '/url/https://braceslab.com/img/logo.webp',
        responseType: 'text'
      })

      expect(response.statusCode).toBe(504)
      expect(response.body).toBe('ENDPOINT_ERROR_TIMEOUT')

      await server.teardown()
    })
  })
})
