// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
// require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
require(`quasar/dist/quasar.${__THEME}.css`)
// ==============================

// Uncomment the following lines if you need IE11/Edge support
// require(`quasar/dist/quasar.ie`)
// require(`quasar/dist/quasar.ie.${__THEME}.css`)

import Vue from 'vue'
import axios from 'axios'
import Quasar from 'quasar'
import router from './router'
import VueMoment from 'vue-moment'

Vue.config.productionTip = false
Vue.use(Quasar) // Install Quasar Framework
Vue.use(VueMoment)

if (__THEME === 'mat') {
  require('quasar-extras/roboto-font')
}
import 'quasar-extras/material-icons'
// import 'quasar-extras/ionicons'
import 'quasar-extras/fontawesome'
import 'quasar-extras/animate'
import { store } from './store/'

if (DEV) {
  axios.defaults.baseURL = 'https://frustrum.pictor.uberspace.de/larry/api'
}
else {
  axios.defaults.baseURL = 'https://frustrum.pictor.uberspace.de/larry/api'
}

// let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJleGFtcGxlIiwiZW1haWwiOiJjbG9ua3Nwb3RAYXNtYXBzLmRlIiwiZXhwIjoxNTA5MTQ3NjYxLCJpYXQiOjE1MDkwNjEyNjEsImlzcyI6ImNsb25rc3BvdCIsImp0aSI6IjNkYzMyYTdmYzAwN2VlMjYyNmJlYjAyNzUzNTljNmY2Iiwic3ViIjoiTmF0aXZlRXhjZXB0aW9uIn0.ayfXVNvmwF9a7bQE7ZnLUDkClvhrf65aYgqA3Q0pBKA'
// axios.defaults.headers.common['Authorization'] = 'Bearer ' + token

Object.defineProperty(Vue.prototype, '$http', { value: axios })

Quasar.start(() => {
  /* eslint-disable no-new */
  new Vue({
    el: '#q-app',
    store,
    router,
    render: h => h(require('./App').default)
  })
})
