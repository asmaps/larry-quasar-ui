<template>
  <q-layout
    ref="layout"
    view="lHh Lpr fff"
    :left-class="{'bg-grey-2': true}"
  >
    <q-toolbar slot="header">
      <q-btn
        v-if="false"
        flat
        @click="$refs.layout.toggleLeft()"
      >
        <q-icon name="menu" />
      </q-btn>

      <q-toolbar-title>
        Larry Web
        <div slot="subtitle">Official source of mods for OpenClonk</div>
      </q-toolbar-title>
    </q-toolbar>

    <q-tabs slot="navigation">
      <q-route-tab slot="title" icon="fa-list" :to="{name: 'upload-list'}" replace hide="icon" label="Uploads list" />
      <q-route-tab slot="title" icon="fa-upload" :to="{name: 'upload-scenario'}" replace hide="icon" label="New Upload" />
    </q-tabs>

    <div slot="left" v-if="false">
      <q-list no-border link inset-delimiter>
        <q-list-header>Essential Links</q-list-header>
        <q-item @click="launch('http://www.openclonk.org')">
          <q-item-side icon="school" />
          <q-item-main label="OpenClonk Homepage" sublabel="openclonk.org" />
        </q-item>
      </q-list>
    </div>

    <!--
      Replace following <div> with
      <router-view /> component
      if using subRoutes
    -->

    <div class="layout-padding">
      <div class="flex row items-end reverse-wrap group">
        <div class="col">
          <router-view></router-view>
        </div>
        <div class="col-auto">
          <api-auth></api-auth>
        </div>
      </div>
    </div>
  </q-layout>
</template>

<script>
import {
  openURL,
  QLayout,
  QToolbar,
  QToolbarTitle,
  QBtn,
  QIcon,
  QList,
  QListHeader,
  QItem,
  QItemSide,
  QItemMain,
  QTabs,
  QRouteTab,
} from 'quasar'

import ApiAuth from './ApiAuth'

export default {
  name: 'index',
  components: {
    ApiAuth,
    QLayout,
    QToolbar,
    QToolbarTitle,
    QBtn,
    QIcon,
    QList,
    QListHeader,
    QItem,
    QItemSide,
    QItemMain,
    QTabs,
    QRouteTab,
  },
  data () {
    return {
    }
  },
  methods: {
    launch (url) {
      openURL(url)
    },
  },
}
</script>

<style lang="styl" type="text/stylus" scoped>
</style>
