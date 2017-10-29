<template>
  <div>
    <div v-if="!$store.state.decodedToken.username">
      <div>
        <h5>Clonkspot</h5>
        <q-btn color="positive" @click="clonkspotLogin">Clonkspot login</q-btn>
        <p class="text-negative" v-if="authFailed">Oups, something went wrong. Please try again</p>
      </div>
      <hr>
      <div>
        <h5>Larry Login</h5>
        <q-input @keyup.enter="larryLogin" v-model="email" name="user" float-label="Email" />
        <q-input @keyup.enter="larryLogin" v-model="password" name="pass" type="password" float-label="Password" />
        <q-btn color="positive" @click="larryLogin" icon="fa-sign-in">Larry login</q-btn>
      </div>
    </div>
    <div v-else>
      <p>Hi {{ $store.state.decodedToken.username }}</p>
      <p>You have successfully logged in!</p>
      <q-btn color="negative" outline small icon="fa-sign-out" @click="$store.commit('logout')">Logout</q-btn>
    </div>
  </div>
</template>

<script>
  import { QInput, QBtn, LocalStorage, openURL } from 'quasar'

  export default {
    components: {
      QInput,
      QBtn,
    },
    data () {
      return {
        email: '',
        password: '',
        token: null,
        authWindow: null,
        authFailed: false,
      }
    },
    mounted () {
      let token = LocalStorage.get.item('authToken')
      if (token) {
        this.$store.commit('setAuthToken', { authToken: token })
      }
    },
    methods: {
      clonkspotLogin () {
        this.authWindow = openURL(`${this.$http.defaults.baseURL}/auth/clonkspot`)
        this.checkTokenLoop()
      },
      larryLogin () {
        let that = this
        let params = {
          user: {
            email: this.email,
            password: this.password,
          }
        }
        this.$http.post('/auth/login', params).then((response) => {
          that.$store.commit('setAuthToken', { authToken: response.data.user.token })
          that.email = ''
          that.password = ''
        }).catch((error) => { console.error(error) })
      },
      checkTokenLoop () {
        let token = LocalStorage.get.item('authToken')
        console.log({token})
        if (token) {
          this.$store.commit('setAuthToken', { authToken: token })
          this.authWindow = null
        }
        else {
          setTimeout(this.checkTokenLoop, 500)
        }
      },
    },
  }
</script>

<style lang="styl" type="text/stylus" scoped>
</style>
