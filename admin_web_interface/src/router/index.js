import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '../store'

import PrivateFrame from '../views/PrivateFrame.vue'
import PublicFrame from '../views/PublicFrame.vue'

Vue.use(VueRouter)

function checkAuthentication(to, from, next, publicFacing = false) {
  // BUG: from is empty on redirect
  // console.log(to, from)
  if (from.name) return next()

  fetch('http://localhost:8000/authenticated', {
    credentials: 'include',
  })
    .then(res => {
      if (res.status === 200) {
        res
          .json()
          .then(json => {
            store.commit('storeAuthentication', json)

            if (publicFacing) next({ name: 'home' }) // TODO: Redirect based on redirect parameter from the URL
            else next()
          })
      } else {
        if (publicFacing) next()
        else next({ name: 'login' }) // TODO: Append redirect parameter to the URL
      }
    })
    .catch(() => {
      if (publicFacing) next()
      else next({ name: 'login' }) // TODO: Append redirect parameter to the URL
    })
}

const routes = [
  {
    path: '/',
    component: PrivateFrame,
    beforeEnter: (to, from, next) => {
      checkAuthentication(to, from, next)
    },
    children: [
      {
        path: '',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
      }
    ]
  },
  {
    path: '/signup',
    component: PublicFrame,
    beforeEnter: (to, from, next) => {
      checkAuthentication(to, from, next, true)
    },
    children: [
      {
        path: '',
        name: 'signup',
        component: () => import(/* webpackChunkName: "signup" */ '../views/Signup.vue'),
      }
    ],
  },
  {
    path: '/login',
    component: PublicFrame,
    beforeEnter: (to, from, next) => {
      checkAuthentication(to, from, next, true)
    },
    children: [
      {
        path: '',
        name: 'login',
        component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
      }
    ],
  },
  {
    path: '/password-reset',
    component: PublicFrame,
    beforeEnter: (to, from, next) => {
      checkAuthentication(to, from, next, true)
    },
    children: [
      {
        path: '',
        name: 'password-reset',
        component: () => import(/* webpackChunkName: "password-reset" */ '../views/PasswordReset.vue'),
      }
    ]
  },
  {
    path: '/set-new-password',
    component: PublicFrame,
    beforeEnter: (to, from, next) => {
      checkAuthentication(to, from, next, true)
    },
    children: [
      {
        path: '',
        name: 'set-new-password',
        component: () => import(/* webpackChunkName: "set-new-password" */ '../views/SetNewPassword.vue'),
      }
    ]
  },
  {
    path: '/users',
    component: PrivateFrame,
    beforeEnter: (to, from, next) => {
      checkAuthentication(to, from, next)
    },
    children: [
      {
        path: '',
        name: 'users',
        component: () => import(/* webpackChunkName: "users" */ '../views/Users.vue'),
      }
    ]
  },
  {
    path: '/sessions',
    component: PrivateFrame,
    beforeEnter: (to, from, next) => {
      checkAuthentication(to, from, next)
    },
    children: [
      {
        path: '',
        name: 'sessions',
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
