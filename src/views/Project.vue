<template>
  <div class="project">
    <router-link to="/project-list">Back</router-link> |
    <h1>Project: {{ projectId }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Project',
  props: {
    msg: String
  },

  computed: {
    projectId () {
      return this.$route.params.id
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
