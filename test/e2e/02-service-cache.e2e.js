'use strict'

const { request, server, cache } = require('../helper')

beforeAll(async () => {
  await server.setup()
})

afterAll(async () => {
  await server.teardown()
})

describe('cache service', () => {
  beforeEach(async () => {
    const requests = [
      { url: 'https://braceslab.com', options: { responseType: 'text' } },
      { url: 'https://twitter.com', options: { responseType: 'text' } },
      { url: 'https://google.com', options: { responseType: 'text' } }
    ]
    await cache.setup(requests)
  })

  test('GET /cache', async () => {
    const response = await request({
      method: 'get',
      path: '/cache'
    })

    expect(response.statusCode).toBe(200)
    expect(response.headers['content-type']).toContain('application/json')
    expect(response.body.length).toBe(3)
    expect(response.body[0]).toMatch(/^[0-9a-f]{64}$/)
  })

  test('GET /cache/summary', async () => {
    const response = await request({
      method: 'get',
      path: '/cache/summary'
    })

    expect(response.statusCode).toBe(200)
    expect(response.headers['content-type']).toContain('application/json')
    expect(response.body[0].hash).toBeDefined()
    expect(response.body[0].summary).toEqual(expect.objectContaining({
      info: {
        created: expect.any(Number),
        rule: expect.any(String)
      },
      request: {
        method: expect.any(String),
        query: expect.any(String),
        route: expect.any(String),
        headers: expect.any(Object)
      }
    }))
  })

  test('GET /cache/:hash', async () => {
    let response = await request({ method: 'get', path: '/cache' })

    response = await request({
      method: 'get',
      path: '/cache/' + response.body[0]
    })

    expect(response.statusCode).toBe(200)
    expect(response.headers['content-type']).toContain('application/json')
    expect(response.body).toEqual(expect.objectContaining({
      expire: expect.any(Number),
      info: {
        created: expect.any(Number),
        rule: expect.any(String)
      },
      request: {
        method: expect.any(String),
        query: expect.any(String),
        route: expect.any(String),
        headers: expect.any(Object)
      },
      response: {
        body: expect.any(String),
        headers: expect.any(Object),
        status: expect.any(Number)
      }
    }))
  })

  test('PUT /cache/:hash/response', async () => {
    const new_ = {
      body: 'a',
      headers: {},
      status: 201
    }
    let response = await request({ method: 'get', path: '/cache' })
    await request({
      method: 'put',
      path: '/cache/' + response.body[0] + '/response',
      json: new_
    })

    response = await request({
      method: 'get',
      path: '/cache/' + response.body[0]
    })

    expect(response.statusCode).toBe(200)
    expect(response.headers['content-type']).toContain('application/json')
    expect(response.body.response).toEqual(new_)
  })

  test('DELETE /cache/:hash', async () => {
    let response = await request({ method: 'get', path: '/cache' })

    await request({ method: 'delete', path: '/cache/' + response.body[0] })
    response = await request({ method: 'get', path: '/cache' })

    expect(response.statusCode).toBe(200)
    expect(response.headers['content-type']).toContain('application/json')
    expect(response.body.length).toBe(2)
  })

  test('DELETE /cache', async () => {
    await request({
      method: 'delete',
      path: '/cache'
    })

    const response = await request({
      method: 'get',
      path: '/cache'
    })

    expect(response.statusCode).toBe(200)
    expect(response.headers['content-type']).toContain('application/json')
    expect(response.body.length).toBe(0)
  })
})
