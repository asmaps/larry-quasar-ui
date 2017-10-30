import Vuex from 'vuex'
import Vue from 'vue'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { LocalStorage } from 'quasar'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    authToken: null,
    decodedToken: {},
  },
  getters: {
    loggedIn: state => Boolean(state.decodedToken.username),
  },
  mutations: {
    setAuthToken (state, { authToken }) {
      state.authToken = authToken
      state.decodedToken = jwtDecode(authToken)
      axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`
      LocalStorage.set('authToken', authToken)
    },
    logout (state) {
      state.authToken = null
      state.decodedToken = {}
      delete axios.defaults.headers.common['Authorization']
      LocalStorage.remove('authToken')
    }
  }
})
