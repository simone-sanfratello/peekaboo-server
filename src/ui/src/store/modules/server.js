'use strict'

const store = require('../../lib/store')
const server = require('../../lib/server')

const state = () => ({
  mode: { status: store.status.SUCCESS, value: 'memoize' }
})

const actions = {
  getMode ({ commit, state }) {
    commit('setMode', { status: store.status.LOADING, value: state.mode })

    window.fetch(`${server.host}/settings/mode`, { method: 'GET' })
      .then(response => response.json())
      .then(data => commit('setMode', { status: store.status.SUCCESS, value: data.mode }))
      .catch(error => commit('setMode', { status: store.status.FAIL, value: state.mode, error }))
  },
  setMode ({ commit, state }, value) {
    commit('setMode', { status: store.status.LOADING, value: state.mode })

    const backup = state.mode
    window.fetch(`${server.host}/settings/mode`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mode: value })
    })
      .then(response => response.json())
      .then(() => commit('setMode', { status: store.status.SUCCESS, value }))
      .catch(error => commit('setMode', { status: store.status.FAIL, value: backup, error }))
  }
}

const mutations = {
  setMode (state, mode) {
    state.mode = mode
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
