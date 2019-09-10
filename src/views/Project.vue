<template>
  <div class="project">
    <router-link to="/project-list">Back</router-link> |
    <Async 
      v-slot="slotProps" 
      :func="doGetProject" 
      :reload="reload"
    >
      <template v-if="slotProps.error">
        ERROR: {{ slotProps.error }}
      </template>
      <template v-else-if="slotProps.isPending">
        loading...
      </template>
      <template v-else>
        <div>
          <h1>Project: {{ projectId }}</h1>
          {{ project.name }}
        </div>
      </template>
    </Async>
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
      reload: undefined
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
    this.reload = new Date();
  },

  methods: {
    async doGetProject() {
      await this.$store.dispatch('projects/getProject', this.projectId);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
