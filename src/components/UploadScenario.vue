<template>
  <div class="flex row">
    <div class="col" v-if="authToken">
      <div v-if="savedScenario">
        <h6 class="text-positive">
          Successfully saved your scenario with the id {{ savedScenario._id }}
        </h6>
        <q-btn color="warning" icon="fa-refresh" @click="reset">Start over</q-btn>
      </div>
      <div v-else>
        <h5>1. Enter scenario data</h5>
        <div class="indent">
          <div class="row flex">
            <div class="col-6 group">
              <div class="text-negative" v-if="error.message && !error.errors.title && !error.errors.description">
                {{ error.message }}
              </div>
              <q-field :error="error.errors.title" :error-label="(error.errors.title || {}).message" >
                <q-input v-model="title" float-label="Title" />
              </q-field>
              <q-field :error="error.errors.description" :error-label="(error.errors.description || {}).message" >
                <q-input v-model="description" type="textarea" float-label="Description" />
              </q-field>
            </div>
          </div>
        </div>
        <h5>2. upload the file belonging to your scenario</h5>
        <div class="indent">
          <dropzone id="fileDropzone"
                    ref="dropzone"
                    :url="$http.defaults.baseURL + '/media'"
                    paramName="media"
                    :headers="{ Authorization: `Bearer ${$store.state.authToken}` }"
                    @vdropzone-success="uploadSuccess"
                    acceptedFileTypes=".ocs,.ocf,.ocd,.ocg,.ocr,.c4d,.c4g,.c4f,.c4r,.c4s,c4v">
          </dropzone>
          <div>
            <h6>Select a file to associate with your scenario:</h6>
            <h6 class="text-warning" v-if="files.length === 0">Please upload some files first</h6>
          </div>
          <table class="q-table horizontal-separator">
            <tr v-for="file, idx of files" :key="file._id">
              <td><q-radio v-model="selectedFile" :val="file._id" :label="file.filename" /></td>
              <td>ID: {{ file._id }}</td>
              <td>uploaded {{ file.uploadDate|moment("from") }}</td>
              <td><q-btn round color="negative" small icon="fa-trash" @click="files.splice(idx, 1)"></q-btn></td>
            </tr>
          </table>
        </div>
        <h5>3. Save scenario</h5>
        <div class="indent">
          <q-btn color="positive" icon="fa-save" @click="postUpload" :disabled="files.length === 0">Save Scenario</q-btn>
        </div>
      </div>
    </div>
    <div v-else>
      Please log in first
    </div>
  </div>
</template>

<script>
  import Dropzone from 'vue2-dropzone'
  import { QBtn, QField, QInput, QRadio, QSlideTransition, LocalStorage } from 'quasar'

  export default {
    components: {
      Dropzone,
      QBtn,
      QField,
      QInput,
      QSlideTransition,
      QRadio,
    },
    data () {
      return {
        files: [],
        title: '',
        description: '',
        slug: '',
        error: {errors: {}},
        savedScenario: null,
        selectedFile: null,
      }
    },
    mounted () {
      this.files = LocalStorage.get.item('uploadedFiles') || []
    },
    computed: {
      authToken () {
        return this.$store.state.authToken
      },
    },
    watch: {
      files (val, oldVal) {
        if (!oldVal || val.length !== oldVal.length) {
          LocalStorage.set('uploadedFiles', this.files)
        }
      },
    },
    methods: {
      uploadSuccess (file, xhr) {
        console.log({success: file, xhr})
        this.files.push(xhr)
        this.$refs.dropzone.removeFile(file)
      },
      postUpload () {
        let that = this
        if (!this.selectedFile) {
          this.error = {errors: {}, message: 'Please select a file'}
          return
        }
        let params = {
          upload: {
            title: this.title,
            description: this.description,
            file: this.selectedFile,
          },
        }
        this.$http.post('/uploads', params)
          .then((response) => {
            that.savedScenario = response.data
            that.files = that.files.filter(el => el._id !== that.selectedFile)
          })
          .catch((error) => {
            console.warn({error})
            that.error = error.response.data.error || {errors: {}}
          })
      },
      reset () {
        this.title = ''
        this.description = ''
        this.savedScenario = ''
      },
    },
  }
</script>

<style lang="styl" type="text/stylus" scoped>
  .indent
    margin: 1rem 3rem 2rem 3rem
</style>
