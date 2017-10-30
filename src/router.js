import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function load (component) {
  // '@' is aliased to src/components
  return () => import(`@/${component}.vue`)
}

export default new VueRouter({
  /*
   * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
   * it is only to be used only for websites.
   *
   * If you decide to go with "history" mode, please also open /config/index.js
   * and set "build.publicPath" to something other than an empty string.
   * Example: '/' instead of current ''
   *
   * If switching back to default "hash" mode, don't forget to set the
   * build publicPath back to '' so Cordova builds work again.
   */

  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),

  routes: [
    {
      path: '/',
      component: load('Index'),
      redirect: {name: 'upload-list'},
      children: [
        {
          path: 'uploads',
          name: 'upload-list',
          component: load('UploadList'),
          children: [
            {
              path: ':uploadId',
              name: 'upload-detail',
              component: load('UploadDetail'),
            },
          ]
        },
        {
          path: 'upload-create',
          name: 'upload-create',
          component: load('UploadCreate'),
        },
        {
          path: 'receive-token/:token',
          name: 'receive-token',
          component: load('FetchToken'),
        },
      ]
    },

    // Always leave this last one
    { path: '*', component: load('Error404') } // Not found
  ]
})
