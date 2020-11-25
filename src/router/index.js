import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/primos', component: () => import('../views/Primos') },
  { path: '/json', component: () => import('../views/JSON') },
  { path: '/marvel', component: () => import('../views/Marvel') },
  { path: '/', redirect: '/primos' },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
