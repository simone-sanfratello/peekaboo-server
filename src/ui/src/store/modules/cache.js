'use strict'

const store = require('../../lib/store')
const server = require('../../lib/server')

const state = () => ({
  entries: {
    status: store.status.LOADING,
    value: {}
  },
  summary: {
    status: store.status.LOADING,
    value: []
  }
})

const actions = {
  list ({ commit }) {
    commit('list', { status: store.status.LOADING, value: null })

    window.fetch(`${server.host}/cache`, { method: 'GET' })
      .then(response => response.json())
      .then(data => commit('list', { status: store.status.SUCCESS, value: data }))
      .catch(error => commit('list', { status: store.status.FAIL, value: null, error }))
  },
  summary ({ commit }) {
    commit('summary', { status: store.status.LOADING, value: null })

    window.fetch(`${server.host}/cache/summary`, { method: 'GET' })
      .then(response => response.json())
      .then(data => commit('summary', { status: store.status.SUCCESS, value: data }))
      .catch(error => commit('summary', { status: store.status.FAIL, value: null, error }))
  },
  get ({ commit }, hash) {
    commit('set', { hash, status: store.status.LOADING, value: null })

    window.fetch(`${server.host}/cache/${hash}`, { method: 'GET' })
      .then(response => response.json())
      .then(data => commit('set', { hash, status: store.status.SUCCESS, value: data }))
      .catch(error => commit('set', { hash, status: store.status.FAIL, value: null, error }))
  },
  clear ({ commit }) {
    commit('clear', { status: store.status.LOADING })

    window.fetch(`${server.host}/cache`, { method: 'DELETE' })
      .then(response => response.json())
      .then(data => commit('clear', { status: store.status.SUCCESS }))
      .catch(error => commit('clear', { status: store.status.FAIL, error }))
  },
  remove ({ commit }, hash) {
    // @todo restore on error
    commit('rm', { hash, status: store.status.LOADING })

    window.fetch(`${server.host}/cache/${hash}`, { method: 'DELETE' })
      .then(response => response.json())
      .then(data => commit('rm', { hash, status: store.status.SUCCESS }))
      .catch(error => commit('rm', { hash, status: store.status.FAIL, error }))
  },
  // response must be a valid json.stringify string
  setResponse ({ commit, state }, { hash, response }) {
    // @todo rollback if fail
    const current = state.entries.value[hash]
    const entry = { ...current, response: JSON.parse(response) }
    commit('set', { hash, status: store.status.LOADING, value: entry })

    window.fetch(`${server.host}/cache/${hash}/response`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: response
    })
      .then(response => response.json())
      .then(() => commit('set', { hash, status: store.status.SUCCESS, value: entry }))
      .catch(error => commit('set', { hash, status: store.status.FAIL, value: current, error }))
  }
}

const mutations = {
  list (state, entries) {
    state.entries.status = entries.status
    if (entries.status !== store.status.SUCCESS) {
      return
    }
    state.entries.value = entries.value
  },
  summary (state, summary) {
    state.summary.status = summary.status
    if (summary.status !== store.status.SUCCESS) {
      return
    }
    state.summary.value = summary.value
  },
  set (state, entry) {
    state.entries.value = { ...state.entries.value }
    if (!state.entries.value[entry.hash]) {
      state.entries.value[entry.hash] = {}
    }
    state.entries.value[entry.hash] = entry.value
  },
  rm (state, entry) {
    if (entry.status !== store.status.SUCCESS) {
      return
    }
    state.entries.value = { ...state.entries.value }
    delete state.entries.value[entry.hash]
    const i = state.summary.value.findIndex(e => e.hash === entry.hash)
    if (i !== -1) {
      state.summary.value = [...state.summary.value]
      state.summary.value.splice(i, 1)
    }
  },
  clear (state, entries) {
    state.entries.status = entries.status
    if (entries.status !== store.status.SUCCESS) {
      return
    }
    state.entries.value = []
  }
}

const getters = {
  get: (state) => (hash) => {
    return state.entries.value[hash]
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
