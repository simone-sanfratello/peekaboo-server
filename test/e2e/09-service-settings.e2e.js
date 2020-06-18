'use strict'

const { request, server } = require('../helper')

beforeAll(async () => {
  await server.setup()
})

afterAll(async () => {
  await server.teardown()
})

describe('settings service', () => {
  test('GET /settings', async () => {
    await request({
      method: 'put',
      path: '/settings/mode',
      json: { mode: 'stock' }
    })

    const response = await request({
      method: 'get',
      path: '/settings/mode'
    })

    expect(response.statusCode).toBe(200)
    expect(response.headers['content-type']).toContain('application/json')
    expect(response.body).toEqual({ mode: 'stock' })
  })

  test('PUT /settings', async () => {
    const response = await request({
      method: 'put',
      path: '/settings/mode',
      json: { mode: 'off' }
    })

    expect(response.statusCode).toBe(200)
    expect(response.headers['content-type']).toContain('application/json')
    expect(response.body).toEqual({ mode: 'off' })
  })
})
