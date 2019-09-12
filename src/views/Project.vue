<template>
  <div class="project">
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
          <div class="level" v-for="report of sortedReports" :key="report.id">
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
    projectId() {
      return this.$route.params.id
    },
    sortedReports() {
      return [...this.reports].sort((a, b) => {
        const timeA = new Date(a.time).getTime();
        const timeB = new Date(b.time).getTime();
        return timeB - timeA;
      });
    }
  },

  mounted() {
    this.reload = new Date();
  },

  methods: {
    async doGetProject() {
      await this.$store.dispatch('projects/getProject', this.projectId);
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
