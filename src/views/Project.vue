<template>
  <div class="project">
    <a @click="backToProjects">Back</a>
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
          <div class="level" v-for="report of reports" :key="report.id">
            <div class="level-left">
              <a @click="goToReport(report)">{{ report.name }}</a>
            </div>
            <div class="level-right">
              {{ report.time | localeDate }}
            </div>
          </div>
        </div>
      </template>
    </Async>
  </div>
</template>

<script>

import Vuex from 'vuex'

export default {
  name: 'Project',

  data() {
    return {
      reload: undefined
    };
  },

  computed: {
    ...Vuex.mapGetters({
      project: 'projects/project',
      reports: 'projects/reports',
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
    },
    backToProjects() {
      this.$store.dispatch('popBreadCrumb');
      this.$router.push('/project-list');
    },
    goToReport(report) {
      this.$store.dispatch('pushBreadCrumbForReport', report);
      this.$router.push(`/report/${report.id}`);
    }    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
