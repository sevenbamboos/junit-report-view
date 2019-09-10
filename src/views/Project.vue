<template>
  <div class="project">
    <router-link to="/project-list">Back</router-link> |
    <h1>Project: {{ projectId }}</h1>

    <template v-if="error">
      ERROR: {{ error }}
    </template>
    <template v-else-if="loading">
      loading...
    </template>
    <template v-else>
      {{ project.name }}
    </template>

  </div>
</template>

<script>

import Vuex from 'vuex'

export default {
  name: 'Project',
  props: {
    msg: String
  },

  data() {
    return {
      loading: false,
      error: undefined
    };
  },

  computed: {
    ...Vuex.mapGetters({
      project: 'projects/project'
    }),
    projectId () {
      return this.$route.params.id
    }
  },

  mounted() {
    this.doGetProject().then(() => console.log("Finished getProject"));
  },

  methods: {
    async doGetProject() {
      this.loading = true;
      try {
        this.$store.dispatch('projects/getProject', this.projectId);
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
