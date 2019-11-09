import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authentication: null,
  },
  mutations: {
    storeAuthentication (state, payload) {
      state.authentication = payload
    },
    clearAuthentication (state) {
      state.authentication = null
    }
  },
  actions: {
  },
  modules: {
  },
})
