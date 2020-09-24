'use strict'

const store = require('../../lib/store')
const server = require('../../lib/server')

const state = () => ({
  status: store.status.SUCCESS,
  entries: {},
  current: null,
  default: null
})

const actions = {
  load ({ commit, state }) {
    commit('set', { status: store.status.LOADING })

    const backup = state.entries
    window.fetch(`${server.host}/dataset`, { method: 'GET' })
      .then(response => response.json())
      .then(data => commit('set', { status: store.status.SUCCESS, ...data }))
      .catch(error => commit('set', { ...backup, status: store.status.FAIL, error }))
  },

  create ({ commit, state }, { name }) {
    commit('set', { status: store.status.LOADING })

    const backup = state.entries
    window.fetch(`${server.host}/dataset`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    })
      .then(response => response.json())
      .then(data => commit('create', { status: store.status.SUCCESS, id: data.id, name }))
      .catch(error => commit('set', { ...backup, status: store.status.FAIL, error }))
  },

  update ({ commit, state }, { id, name }) {
    commit('set', { status: store.status.LOADING })

    const backup = state.entries
    window.fetch(`${server.host}/dataset/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    })
      .then(response => response.json())
      .then(data => commit('update', { status: store.status.SUCCESS, id, name }))
      .catch(error => commit('set', { ...backup, status: store.status.FAIL, error }))
  },

  remove ({ commit, state }, { id }) {
    commit('set', { status: store.status.LOADING })

    const backup = state
    window.fetch(`${server.host}/dataset/${id}`, { method: 'DELETE' })
      .then(response => response.json())
      .then(data => commit('remove', { status: store.status.SUCCESS, id }))
      .catch(error => commit('set', { ...backup, status: store.status.FAIL, error }))
  },

  // set current
  set ({ commit, state }, { id }) {
    commit('set', { status: store.status.LOADING })

    const backup = state
    window.fetch(`${server.host}/dataset/set`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })
      .then(response => response.json())
      .then(data => commit('set', { status: store.status.SUCCESS, current: id }))
      .catch(error => commit('set', { ...backup, status: store.status.FAIL, error }))
  }
}

const mutations = {
  set (state, { status, entries, current, default: default_ }) {
    state.status = status
    if (status != store.status.SUCCESS) {
      state.entries = { ...state.entries }
      state.current = state.current
      state.default = state.default
      return
    }
    if (entries) {
      state.entries = { ...entries }
    }
    if (current) {
      state.current = current
    }
    if (default_) {
      state.default = default_
    }
  },

  create (state, { id, name }) {
    state.status = status
    state.entries = {
      ...state.entries,
      [id]: name
    }
  },

  update (state, { id, name }) {
    const entries = { ...state.entries }
    entries[id] = name
    state.entries = entries
  },

  remove (state, { id }) {
    const entries = { ...state.entries }
    delete entries[id]
    state.entries = entries
    if (state.current == id) {
      state.current = state.default
    }
  },

  current (state, { id }) {
    const entries = { ...state.entries }
    delete entries[id]
    state.entries = entries
    if (state.current == id) {
      state.current = state.default
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
