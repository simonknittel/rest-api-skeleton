import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authentication: null,
    verifyEmail: null,
    users: [],
    usersLoading: false,
  },
  mutations: {
    storeAuthentication (state, payload) {
      state.authentication = payload
    },
    clearAuthentication (state) {
      state.authentication = null
    },
    showVerifyEmail (state, payload) {
      state.verifyEmail = payload
    },
    hideVerifyEmail (state) {
      state.verifyEmail = null
    },
    usersRequest(state) {
      state.usersLoading = true
    },
    usersRequestSuccess(state, payload) {
      state.users = payload
      state.usersLoading = false
    },
  },
  actions: {
    fetchUsers({ commit }) {
      fetch(process.env.VUE_APP_API_HOST + '/users')
        .then(res => {
          if (res.status !== 200) {
            console.error(res)
            return
          }

          return res.json()
        })
        .then(json => {
          commit('usersRequestSuccess', json)
        })
        .catch(err => {
          console.error(err)
        })
    },
  },
  modules: {
  },
})
