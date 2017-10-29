<template>
  <div class="flex row items-start">
    <q-card class="col-3" v-for="upload of uploads" :key="upload._id">
      <q-card-title class="bg-positive text-white">
        {{ upload.title }}
        <span slot="subtitle" class="text-light">by {{ upload.author.username }}</span>
        <span slot="right" class="text-light" style="margin-left: 3rem">updated {{ upload.updatedAt | moment("from") }}</span>
      </q-card-title>
      <q-card-separator />
      <q-card-main>
        <p class="text-faded description">
          <truncate clamp="... read more" :length="140" less="show less" :text="upload.description"></truncate>
        </p>
        <div>ID: {{ upload._id }}</div>
        <div v-if="upload.dependency.length === 0">
          No dependencies.
        </div>
        <div v-else>
          Depends on:
          <ul>
            <li v-for="dependency of upload.dependency">{{ dependency }}</li>
          </ul>
        </div>
      </q-card-main>
      <q-card-actions>
        <q-btn v-if="$store.state.decodedToken.username === upload.author.username" flat color="negative" icon="fa-trash" @click="deleteUpload(upload)"></q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
  import {
    QBtn,
    QCard,
    QCardTitle,
    QCardSeparator,
    QCardMain,
    QCardActions,
  } from 'quasar'
  import Truncate from 'vue-truncate-collapsed'

  export default {
    components: {
      QBtn,
      QCard,
      QCardTitle,
      QCardSeparator,
      QCardMain,
      QCardActions,
      Truncate,
    },
    props: {
      url: String,
    },
    mounted () {
      this.refresh()
    },
    data () {
      return {
        response: {},
        uploads: [],
      }
    },
    methods: {
      refresh () {
        let that = this
        this.$http.get(this.url).then((response) => {
          that.response = response
          that.uploads = response.data.uploads
        })
      },
      deleteUpload (upload) {
        let that = this
        this.$http.delete(`/uploads/${upload._id}`).then(response => that.refresh())
      },
    },
  }
</script>

<style lang="styl" type="text/stylus" scoped>
  .description
    max-width: 400px
</style>
