<template>
  <div>
    <q-transition :enter="showList ? 'fadeInLeft' : 'fadeInRight'" :leave="showList ? 'fadeOutRight' : 'fadeOutLeft'" mode="out-in" duration="500">
      <div v-if="showList">
        <h4>Uploads</h4>
        <q-data-table
          :data="uploads"
          :config="tableConfig"
          :columns="tableColumns"
          @refresh="refresh">
          <template slot='col-action' slot-scope='cell'>
            <q-btn color="primary"
                   small
                   icon="fa-info-circle"
                   @click="$router.push({name: 'upload-detail', params: {uploadId: cell.row._id}})">
              Show</q-btn>
          </template>
        </q-data-table>
      </div>
      <router-view></router-view>
    </q-transition>
  </div>
</template>

<script>
  import {
    QBtn,
    QDataTable,
    QTransition,
  } from 'quasar'
  import Truncate from 'vue-truncate-collapsed'
  import moment from 'moment'

  export default {
    components: {
      QBtn,
      QDataTable,
      QTransition,
      Truncate,
    },
    mounted () {
      this.refresh()
    },
    computed: {
      showList () {
        return this.$route.name === 'upload-list'
      }
    },
    data () {
      return {
        response: {},
        uploads: [],
        tableConfig: {
          refresh: true,
          leftStickyColumns: 1,
          rightStickyColumns: 3,
          rowHeight: '60px',
        },
        tableColumns: [
          {label: 'Title', field: 'title', width: '100px'},
          {label: 'Description', field: 'description', width: '500px'},
          {label: 'Author', field: 'author', width: '100px', format: el => el.username},
          {label: 'Last update', field: 'updatedAt', width: '100px', format: el => moment(el).from()},
          {label: 'Actions', field: 'action', width: '100px'},
        ],
      }
    },
    methods: {
      refresh (done) {
        let that = this
        this.$http.get('/uploads').then((response) => {
          that.response = response
          that.uploads = response.data.uploads
          if (done) {
            done()
          }
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