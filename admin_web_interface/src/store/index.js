import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authentication: null,
    verifyEmail: null,
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
  },
  actions: {
  },
  modules: {
  },
})
