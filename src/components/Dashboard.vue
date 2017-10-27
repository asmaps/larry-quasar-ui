<template>
  <div>
    <uploads-list url="/uploads">
    </uploads-list>
  </div>
</template>

<script>
  import {
    QBtn,
  } from 'quasar'
  import UploadsList from './UploadsList.vue'

  export default {
    components: {
      UploadsList,
      QBtn,
    },
    data () {
      return {
      }
    },
  }
</script>

<style lang="styl" type="text/stylus" scoped>
</style>
