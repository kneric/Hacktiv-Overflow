import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import swal from 'sweetalert'

const xAxios = axios.create({
  baseURL: 'http://localhost:3000'
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
  },
  mutations: {
    addToken (state, payload) {
      state.token = payload
    },
    removeToken (state) {
      state.token = null
    }
  },
  actions: {
    checkToken ({commit}){
      if (localStorage.getItem('token')){
        commit('addToken',localStorage.getItem('token'))
      }
    },
    register ({commit}, payload){
      xAxios({
        method: 'post',
        url: '/signup',
        data: payload
      })
        .then(({data}) => {
          localStorage.setItem('token', data.token);
          localStorage.setItem('name', data.name);
          commit('addToken',localStorage.getItem('token'))
        })
        .catch(err =>{
          let messages = []
            for (let i in err.response.data.errors) {
              messages.push((err.response.data.errors[i].message))
            }
          swal(
            'validation error:',
            messages.join('\n'),
            'error'
          )
        })
    },
    login ({commit}, payload){
      xAxios({
        method: 'post',
        url: '/signin',
        data: payload
      })
        .then(({data}) => {
          localStorage.setItem('token', data.token);
          localStorage.setItem('name', data.name);
          commit('addToken',localStorage.getItem('token'))
        })
        .catch(err =>{
          let messages = []
            for (let i in err.response.data.errors) {
              messages.push((err.response.data.errors[i].message))
            }
          swal(
            err.response.data.message,
            '',
            'error'
          )
        })
    },
    logout ({commit}){
      localStorage.removeItem('token');
      localStorage.removeItem('name');
      commit('removeToken')
      swal(
        'You are now logged out!',
        '',
        'success'
      )
    }
  }
})
