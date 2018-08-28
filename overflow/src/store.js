import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: 'a',
    tes: 'TES'
  },
  mutations: {
    addToken (state, payload) {
      state.token = payload
    }
  },
  actions: {
    addToken ({commit}){
      if (localStorage.getItem('token')){
        commit('addToken',localStorage.getItem('token'))
      }
    }
  }
})
