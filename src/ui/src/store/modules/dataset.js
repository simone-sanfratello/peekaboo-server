'use strict'

const store = require('../../lib/store')
const server = require('../../lib/server')

const DEFAULT_VALUE = 1

const state = () => ({
  entries: { status: store.status.SUCCESS, values: [] },
  current: { status: store.status.SUCCESS, value: null }
})

const actions = {
  load({ commit, state }) {
    commit('set', { status: store.status.LOADING })

    const backup = state.entries
    window.fetch(`${server.host}/settings/dataset`, { method: 'GET' })
      .then(response => response.json())
      .then(data => commit('set', { status: store.status.SUCCESS, entries: data.values, current: data.current }))
      .catch(error => commit('set', { ...backup, status: store.status.FAIL, error }))
  },

  create({ commit, state }, name) {
    commit('set', { status: store.status.LOADING })

    const backup = state.entries
    window.fetch(`${server.host}/settings/dataset`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    })
      .then(response => response.json())
      .then(data => commit('create', { id: data.id, name }))
      .catch(error => commit('set', { ...backup, status: store.status.FAIL, error }))
  },

  update({ commit, state }, id, name) {
    commit('set', { status: store.status.LOADING })

    const backup = state.entries
    window.fetch(`${server.host}/settings/dataset/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    })
      .then(response => response.json())
      .then(data => commit('update', { id, name }))
      .catch(error => commit('set', { ...backup, status: store.status.FAIL, error }))
  },

  remove({ commit, state }, id) {
    if (id == DEFAULT_VALUE) {
      // @todo error message: cant delete default dataset
      return
    }
    commit('set', { status: store.status.LOADING })

    const backup = state
    window.fetch(`${server.host}/settings/dataset/${id}`, { method: 'DELETE' })
      .then(response => response.json())
      .then(data => commit('remove', id))
      .catch(error => commit('set', { ...backup, status: store.status.FAIL, error }))
  },

  // set current
  current({ commit, state }, id) {
    commit('set', { status: store.status.LOADING })

    const backup = state.entries
    window.fetch(`${server.host}/settings/dataset/current`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })
      .then(response => response.json())
      .then(data => commit('current', { id }))
      .catch(error => commit('set', { ...backup, status: store.status.FAIL, error }))
  },
}

const mutations = {
  set(state, { status, entries, current }) {
    if (status != store.status.SUCCESS) {
      state.entries = { ...state.entries, status }
      state.current = { ...state.current, status }
      return
    }
    if (entries) {
      state.entries = { status, values: entries }
    }
    if (current) {
      state.current = { status, value: current }
    }
  },

  create(state, { id, name }) {
    state.entries = {
      status: store.status.SUCCESS, values: [...entries, { id, name }]
    }
  },

  update(state, { id, name }) {
    const entries = [...state.entries]
    const replace = entries.findIndex(entry => entry.id == id)
    entries[replace] = { id, name }
    state.entries = { status: store.status.SUCCESS, values: entries }
  },

  remove(state, { id }) {
    state.entries = { status: store.status.SUCCESS, values: entries.splice(entries.findIndex(entry => entry.id == id), 1) }
    if (state.current == id) {
      state.current = { status: store.status.SUCCESS, value: DEFAULT_VALUE }
    }
  }
}

const getters = {}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
