import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '../store'

import PrivateFrame from '../views/PrivateFrame.vue'
import PublicFrame from '../views/PublicFrame.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: PrivateFrame,
    beforeEnter: (to, from, next) => {
      if (!store.state.me) next('/login')
      else next()
    },
    children: [
      {
        path: '',
        component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
      }
    ]
  },
  {
    path: '/signup',
    name: 'signup',
    component: PublicFrame,
    beforeEnter: (to, from, next) => {
      if (store.state.me) next('/')
      else next()
    },
    children: [
      {
        path: '',
        component: () => import(/* webpackChunkName: "signup" */ '../views/Signup.vue'),
      }
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: PublicFrame,
    beforeEnter: (to, from, next) => {
      if (store.state.me) next('/')
      else next()
    },
    children: [
      {
        path: '',
        component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
      }
    ],
  },
  {
    path: '/password-reset',
    name: 'password-reset',
    component: PublicFrame,
    beforeEnter: (to, from, next) => {
      if (store.state.me) next('/')
      else next()
    },
    children: [
      {
        path: '',
        component: () => import(/* webpackChunkName: "password-reset" */ '../views/PasswordReset.vue'),
      }
    ]
  },
  {
    path: '/set-new-password',
    name: 'set-new-password',
    component: PublicFrame,
    beforeEnter: (to, from, next) => {
      if (store.state.me) next('/')
      else next()
    },
    children: [
      {
        path: '',
        component: () => import(/* webpackChunkName: "set-new-password" */ '../views/SetNewPassword.vue'),
      }
    ]
  },
  {
    path: '/users',
    name: 'users',
    component: PrivateFrame,
    beforeEnter: (to, from, next) => {
      if (!store.state.me) next('/login')
      else next()
    },
    children: [
      {
        path: '',
        component: () => import(/* webpackChunkName: "users" */ '../views/Users.vue'),
      }
    ]
  },
  {
    path: '/sessions',
    name: 'sessions',
    component: PrivateFrame,
    beforeEnter: (to, from, next) => {
      if (!store.state.me) next('/login')
      else next()
    },
    children: [
      {
        path: '',
        component: () => import(/* webpackChunkName: "sessions" */ '../views/Sessions.vue'),
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
