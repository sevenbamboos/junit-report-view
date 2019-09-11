<template>
  <div 
    id="app" 
    class="container"
  >
    <div id="nav">
      <!-- <router-link 
        to="/project-list"
      >
        Projects
      </router-link> -->
      <span v-for="breadcrumb of breadcrumbs" :key="breadcrumb.name">
        <router-link :to="breadcrumb.url">
          {{ breadcrumb.name }}
        </router-link>
        >>
      </span>
    </div>
    <router-view />
  </div>
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

}
#nav {
  text-align: left;
}
</style>
