'use strict'

const fs = require('fs').promises
const path = require('path')
const { request, server, cache } = require('../helper')

beforeAll(async () => {
  await server.setup()
})

afterAll(async () => {
  await server.teardown()
})

describe('history service', () => {
  beforeEach(async () => {
    const requests = [
      { url: 'https://braceslab.com', options: { responseType: 'text' } },
      { url: 'https://twitter.com', options: { responseType: 'text' } },
      { url: 'https://google.com', options: { responseType: 'text' } }
    ]
    await cache.setup(requests)
  })

  test('GET /history', async () => {
    // add useless dir inside history
    await fs.mkdir(path.join(server.settings().history.path, 'na'))

    const response = await request({
      method: 'get',
      path: '/history'
    })

    expect(response.statusCode).toBe(200)
    expect(response.headers['content-type']).toContain('application/json')
    expect(response.body.length).toBe(3)
    expect(response.body[0].id).toMatch(/^\d{13}$/)
  })

  test('GET /history/:id', async () => {
    let response = await request({ method: 'get', path: '/history' })

    response = await request({
      method: 'get',
      path: '/history/' + response.body[0].id
    })

    expect(response.statusCode).toBe(200)
    expect(response.headers['content-type']).toContain('application/json')
    expect(response.body).toEqual(expect.objectContaining({
      request: expect.any(Object),
      response: expect.any(Object),
      summary: expect.any(Object)
    }))
  })

  test('GET /history/none', async () => {
    const response = await request({
      method: 'get',
      path: '/history/none'
    })

    expect(response.statusCode).toBe(500)
    expect(response.headers['content-type']).toContain('application/json')
    expect(response.body.error).toContain('Error: ENOENT:')
  })

  test('DELETE /history/:id', async () => {
    let response = await request({ method: 'get', path: '/history' })
    const id = response.body[0].id

    await request({ method: 'delete', path: '/history/' + id })
    response = await request({ method: 'get', path: '/history' })

    expect(response.statusCode).toBe(200)
    expect(response.headers['content-type']).toContain('application/json')
    expect(response.body.map(entry => entry.id)).not.toContain(id)
  })

  test('DELETE /history/none', async () => {
    const response = await request({ method: 'delete', path: '/history/none' })

    expect(response.statusCode).toBe(500)
    expect(response.headers['content-type']).toContain('application/json')
    expect(response.body).toEqual({})
  })

  test('DELETE /history', async () => {
    await request({
      method: 'delete',
      path: '/history'
    })

    const response = await request({
      method: 'get',
      path: '/history'
    })

    expect(response.statusCode).toBe(200)
    expect(response.headers['content-type']).toContain('application/json')
    expect(response.body.length).toBe(0)
  })
})
