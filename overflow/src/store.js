import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import swal from 'sweetalert'

const xAxios = axios.create({
  baseURL: 'http://35.240.195.13'
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    name: null,
    allQs: []
  },
  mutations: {
    addToken (state, payload) {
      state.token = payload
    },
    removeToken (state) {
      state.token = null
    },
    addName (state, payload){
      state.name = payload
    },
    removeName (state) {
      state.name = null
    },
    setAllQ (state, payload){
      state.allQs = payload
    }
  },
  actions: {
    checkUser ({commit}){
      if (localStorage.getItem('token')){
        commit('addToken',localStorage.getItem('token'))
        commit('addName',localStorage.getItem('name'))
      }
    },
    register ({commit}, payload){
      xAxios({
        method: 'post',
        url: '/signup',
        data: payload
      })
        .then(({data}) => {
          // localStorage.setItem('token', data.token);
          // localStorage.setItem('name', data.name);
          // commit('addToken',data.token)
          // commit('addName',data.name)
          console.log(data.url);
          window.open(`"${data.url}"`)
          swal(
            'You are now registered!',
            'Please login to continue',
            'success'
          )
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
          commit('addToken',data.token)
          commit('addName',data.name)
        })
        .catch(err =>{
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
      commit('removeName')
      swal(
        'You are now logged out!',
        '',
        'success'
      )
    },
    getAllQs ({commit}){
      xAxios({
        method: 'get',
        url: '/question'
      })
        .then(({data}) => {
          commit('setAllQ', data)
        })
        .catch(err => {
          console.log(err);
        })
    }
  }
})
