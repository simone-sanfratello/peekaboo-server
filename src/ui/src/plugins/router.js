import Vue from 'vue'
import VueRouter from 'vue-router'

import Dashboard from '../components/pages/Dashboard'
import Cache from '../components/pages/Cache'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Dashboard },
  { path: '/cache', component: Cache },
]

const router = new VueRouter({
  routes
})

export default router
