'use strict'

import Vue from 'vue'
import vuetify from './plugins/vuetify'
import router from './plugins/router'

import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
