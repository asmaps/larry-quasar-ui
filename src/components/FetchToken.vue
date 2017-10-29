<template>
  <div>
    <div v-if="!tokenValid">
      <h6 class="text-negative">Received an invalid token!</h6>
      <p>{{ tokenData.message }}</p>
      <p>{{ $store.state.authToken }}</p>
    </div>
    <div v-else>
      <pre>{{ JSON.stringify(tokenData, null, 2) }}</pre>
    </div>
  </div>
</template>

<script>
  import jwtDecode from 'jwt-decode'

  export default {
    components: {
    },
    data () {
      return {
        tokenValid: false,
      }
    },
    computed: {
      routeToken () {
        return this.$route.params.token
      },
      tokenData () {
        try {
          return jwtDecode(this.routeToken)
        }
        catch (e) {
          return {
            invalid: true,
            message: e.message
          }
        }
      },
    },
    watch: {
      tokenData: {
        handler: function (val, oldVal) {
          if (val !== oldVal) {
            if (val.invalid || !val.username) {
              this.tokenValid = false
            }
            else {
              let that = this
              this.$http.get('/uploads', {headers: {Authorization: `Bearer ${this.routeToken}`}}).then(response => {
                that.tokenValid = true
              }).catch(error => {
                console.warn(error)
                that.tokenValid = false
              })
            }
          }
        },
        immediate: true,
      },
    }
  }
</script>

<style lang="styl" type="text/stylus" scoped>
</style>
