import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
  },
  mutations: {
    addToken (state, payload) {
      state.token = payload
    }
  },
  actions: {
    checkToken ({commit}){
      if (localStorage.getItem('token')){
        commit('addToken',localStorage.getItem('token'))
      }
    }
  }
})
