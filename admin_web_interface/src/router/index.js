import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
  },
  {
    path: '/password-reset',
    name: 'password-reset',
    component: () => import(/* webpackChunkName: "password-reset" */ '../views/PasswordReset.vue'),
  },
  {
    path: '/set-new-password',
    name: 'set-new-password',
    component: () => import(/* webpackChunkName: "set-new-password" */ '../views/SetNewPassword.vue'),
  },
  {
    path: '/users',
    name: 'users',
    component: () => import(/* webpackChunkName: "users" */ '../views/Users.vue'),
  },
  {
    path: '/sessions',
    name: 'sessions',
    component: () => import(/* webpackChunkName: "sessions" */ '../views/Sessions.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
