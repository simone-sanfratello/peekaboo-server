'use strict'

import Vue from 'vue'
import Vuex from 'vuex'

import cache from './modules/cache'
import dataset from './modules/dataset'
import history from './modules/history'
import server from './modules/server'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    history,
    cache,
    dataset,
    server
  }
})
