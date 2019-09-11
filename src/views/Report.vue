<template>
  <div class="report">
    <a @click="backToProject">Back</a>
    <Async 
      v-slot="slotProps" 
      :func="doGetReport" 
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
          <div>
            <h1 @click="toggleCollapseFailed">Failed Tests ({{ failedTests.length }})</h1>
            <div class="level failed" :style="collapseFailedStyle" v-for="test of failedTests" :key="test.id">
              <div class="level-left">
                {{ test.name }}
              </div>
            </div>
          </div>
          <div>
            <h1 @click="toggleCollapseIgnore">Ignore Tests ({{ ignoreTests.length }})</h1>
            <div class="level ignore" :style="collapseIgnoreStyle" v-for="test of ignoreTests" :key="test.id">
              <div class="level-left">
                {{ test.name }}
              </div>
            </div>
          </div>
          <div>
            <h1 @click="toggleCollapsePassed">Passed Tests ({{ passedTests.length }})</h1>
            <div class="level" :style="collapsePassedStyle" v-for="test of passedTests" :key="test.id">
              <div class="level-left">
                {{ test.name }}
              </div>
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
  name: 'Report',

  data() {
    return {
      reload: undefined,
      collapseFailed: false,
      collapseIgnore: true,
      collapsePassed: true
    };
  },

  computed: {
    ...Vuex.mapGetters({
      report: 'projects/report',
      tests: 'projects/tests',
    }),
    reportId() {
      return this.$route.params.id
    },
    failedTests() {
      return this.tests.filter(t => t.status === 'failed');
    },
    ignoreTests() {
      return this.tests.filter(t => t.status === 'ignore');
    },
    passedTests() {
      return this.tests.filter(t => t.status === 'passed');
    },
    collapseFailedStyle() {
      return {display: this.collapseFailed ? 'none' : 'block'}
    },
    collapseIgnoreStyle() {
      return {display: this.collapseIgnore ? 'none' : 'block'}
    },
    collapsePassedStyle() {
      return {display: this.collapsePassed ? 'none' : 'block'}
    }
  },

  mounted() {
    this.reload = new Date();
  },

  methods: {
    async doGetReport() {
      await this.$store.dispatch('projects/getReport', this.reportId);
    },
    backToProject() {
      this.$store.dispatch('popBreadCrumb');
      this.$router.push(`/project/${this.report.projectId}`);
    },
    toggleCollapseFailed() {
      this.collapseFailed = !this.collapseFailed;
    },
    toggleCollapseIgnore() {
      this.collapseIgnore = !this.collapseIgnore;
    },
    toggleCollapsePassed() {
      this.collapsePassed = !this.collapsePassed;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  text-align: left;
  text-decoration-line: underline;
}
.failed {
  color: red;
}
.ignore {
  background: grey;
}
</style>
