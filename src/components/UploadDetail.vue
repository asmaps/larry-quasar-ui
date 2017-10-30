<template>
  <div>
    <q-btn @click="$router.push({name: 'upload-list'})" outline icon="fa-list">Back to list</q-btn>
    <q-transition enter="bounceInUp">
      <div v-if="upload">
        <q-card>
          <q-card-media v-if="upload.pic" overlay-position="top">
            <q-card-title slot="overlay">
              {{ upload.title }}
              <span slot="subtitle">by {{ upload.author.username }}</span>
              <span slot="right" class="text-white" style="margin-left: 3rem">updated {{ upload.updatedAt | moment("from") }}</span>
            </q-card-title>
            <img :src="`${$http.defaults.baseURL}/media/${upload.pic}`">
          </q-card-media>
          <q-card-title class="bg-positive text-white" v-else>
            {{ upload.title }}
            <span slot="subtitle" class="text-light">by {{ upload.author.username }}</span>
            <span slot="right" class="text-light" style="margin-left: 3rem">updated {{ upload.updatedAt | moment("from") }}</span>
          </q-card-title>
          <q-card-separator />
          <q-card-main>
            <div class="group">
              <p class="text-faded description">
                {{ upload.description }}
              </p>
              <upload-voter :upload="upload" @voted="refresh"></upload-voter>
              <p>ID: {{ upload._id }}</p>
              <p v-if="upload.dependency.length === 0">
                No dependencies.
              </p>
              <div v-else>
                <h6>Dependencies</h6>
                <div class="group">
                  <q-btn v-for="did of upload.dependency"
                         :key="did"
                         @click="$router.push({name: 'upload-detail', params: {uploadId: did}})"
                         v-if="dependencies[did]">
                    {{ dependencies[did].title }}
                  </q-btn>
                </div>
              </div>
            </div>
          </q-card-main>
          <q-card-actions>
            <q-btn v-if="$store.state.decodedToken.username === upload.author.username" flat color="negative" icon="fa-trash" @click="deleteUpload(upload)"></q-btn>
          </q-card-actions>
        </q-card>
      </div>
      <div v-else key="loader">
        <q-spinner size="50"></q-spinner> Loading scenario data...
      </div>
    </q-transition>
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
    QCardMedia,
    QIcon,
    QTransition,
    QSpinner
  } from 'quasar'
  import UploadVoter from './UploadVoter'

  export default {
    components: {
      QBtn,
      QCard,
      QCardTitle,
      QCardSeparator,
      QCardMain,
      QCardMedia,
      QCardActions,
      QIcon,
      QTransition,
      QSpinner,
      UploadVoter,
    },
    computed: {
      routeId () {
        return this.$route.params.uploadId
      },
    },
    watch: {
      routeId: {
        handler (val, oldVal) {
          if (val && val !== oldVal) {
            this.refresh()
          }
        },
        immediate: true,
      },
      upload: {
        handler (val, oldVal) {
          let that = this
          if (val && val !== oldVal) {
            for (let d of val.dependency) {
              this.$http.get(`/uploads/${d}`).then(response => {
                let upload = response.data
                that.$set(that.dependencies, d, upload)
              })
            }
          }
        },
        immediate: true,
      },
    },
    data () {
      return {
        upload: null,
        dependencies: {},
      }
    },
    methods: {
      refresh () {
        let that = this
        this.$http.get(`/uploads/${this.routeId}`).then(response => {
          that.upload = response.data
        })
      },
      deleteUpload () {
        let that = this
        this.$http.delete(`/uploads/${this.routeId}`).then(response => that.$router.push({name: 'detail-list'}))
      },
    }
  }
</script>

<style lang="styl" type="text/stylus" scoped>
</style>
