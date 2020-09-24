import Vue from 'vue'
import VueRouter from 'vue-router'

import Dashboard from '../components/pages/Dashboard'
import Cache from '../components/pages/Cache'
import Dataset from '../components/pages/Dataset'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Dashboard },
  { path: '/cache', component: Cache },
  { path: '/dataset', component: Dataset }
]

const router = new VueRouter({
  routes
})

export default router
