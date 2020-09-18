'use strict'

const store = require('../../lib/store')
const server = require('../../lib/server')

let socket

const state = () => ({
  connection: 'disconnected',
  entries: {
    status: store.status.LOADING,
    value: []
  }
})

const actions = {
  connect ({ commit }) {
    commit('connect', 'connecting')
    socket = new window.WebSocket(server.realtime)

    socket.onopen = () => {
      commit('connect', 'connected')
    }

    socket.onmessage = message => {
      const data = JSON.parse(message.data)
      commit('set', { id: data.content.id, status: store.status.SUCCESS, value: { summary: data.content } })
    }

    socket.onclose = () => {
      commit('connect', 'disconnected')
    }
  },
  disconnect () {
    socket.close()
    socket = new window.WebSocket(server.realtime)
  },
  // sendMessage() { socket.send() }
  list ({ commit }) {
    commit('list', { status: store.status.LOADING, value: null })

    window.fetch(`${server.host}/history`, { method: 'GET' })
      .then(response => response.json())
      .then(data => commit('list', { status: store.status.SUCCESS, value: data }))
      .catch(error => commit('list', { status: store.status.FAIL, value: null, error }))
  },
  get ({ commit }, id) {
    // @todo check if id entry already exists
    commit('set', { id, status: store.status.LOADING, value: null })

    window.fetch(`${server.host}/history/${id}`, { method: 'GET' })
      .then(response => response.json())
      .then(data => commit('set', { id, status: store.status.SUCCESS, value: data }))
      .catch(error => commit('set', { id, status: store.status.FAIL, value: null, error }))
  },
  clear ({ commit }) {
    // @todo restore current if fail
    commit('clear', { status: store.status.LOADING })

    window.fetch(`${server.host}/history`, { method: 'DELETE' })
      .then(response => response.json())
      .then(data => commit('clear', { status: store.status.SUCCESS }))
      .catch(error => commit('clear', { status: store.status.FAIL, error }))
  }
}

const mutations = {
  connect (state, connection) {
    state.connection = connection
  },
  list (state, entries) {
    state.entries.status = entries.status
    if (entries.status !== store.status.SUCCESS) {
      return
    }
    state.entries.value = entries.value.map(e => ({ summary: e }))
  },
  set (state, entry) {
    if (entry.status !== store.status.SUCCESS) {
      return
    }
    state.entries.value = [...state.entries.value]
    const i = state.entries.value.findIndex(e => e.summary.id === entry.id)
    if (i !== -1) {
      state.entries.value[i] = entry.value
    } else {
      state.entries.value.unshift(entry.value)
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
  get: (state) => (id) => {
    return state.entries.value.find(entry => entry.summary.id === id)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}