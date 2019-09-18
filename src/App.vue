<template>

  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span v-for="(breadcrumb, index) of breadcrumbs" :key="breadcrumb.name">
          <template v-if="index < breadcrumbs.length-1">
            <a class="button is-link" @click="onClickBreadcrumb(breadcrumb)">
              {{ breadcrumb.name }}
            </a> / 
          </template>
          <template v-else>
            <a class="button is-link">
              {{ breadcrumb.name }}
            </a> 
          </template>
        </span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>

</template>
<script>

import Vuex from 'vuex'

export default {
  name: 'App',

  computed: {
    ...Vuex.mapGetters({
      breadcrumbs: 'breadcrumbs'
    }),
    projectId () {
      return this.$route.params.id
    }
  },

  created() {
    this.$store.dispatch('pushBreadCrumbForProjectList');
  },

  methods: {
    onClickBreadcrumb(breadcrumb) {
      this.$store.dispatch('popBreadCrumb', breadcrumb.name);
      this.$router.push(breadcrumb.url); 
    }
  }
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  padding: 2em;
}
#nav {
  text-align: left;
}
</style>
