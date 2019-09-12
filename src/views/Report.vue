<template>
  <div class="report">
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
          <div v-if="report.previousReportId">
            <a class="button" @click="goToPreviousReport()">Previous Report</a>
          </div>
          <div class="summary">
            <report-brief :report="report" />
          </div>
          <div>
            <h1 @click="toggleCollapseFailed">Failed Tests ({{ failedTests.length }})</h1>
            <div class="level" :style="collapseFailedStyle" v-for="test of failedTests" :key="test.id">
              <div class="level-left">
                <a class="button is-danger" :title="test.statusFromPrevious">{{ test.name }}</a>
                <div class="statusFromPrevious" v-html="statusFromPreviousIcon(test.statusFromPrevious)">
                </div>
              </div>
            </div>
          </div>
          <div>
            <h1 @click="toggleCollapseIgnore">Ignore Tests ({{ ignoreTests.length }})</h1>
            <div class="level" :style="collapseIgnoreStyle" v-for="test of ignoreTests" :key="test.id">
              <div class="level-left">
                <a class="button is-warning" :title="test.statusFromPrevious">{{ test.name }}</a>
                <div class="statusFromPrevious" v-html="statusFromPreviousIcon(test.statusFromPrevious)">
                </div>
              </div>
            </div>
          </div>
          <div>
            <h1 @click="toggleCollapsePassed">Passed Tests ({{ passedTests.length }})</h1>
            <div class="level" :style="collapsePassedStyle" v-for="test of passedTests" :key="test.id">
              <div class="level-left">
                <a class="button is-success" :title="test.statusFromPrevious">{{ test.name }}</a>
                <div class="statusFromPrevious" v-html="statusFromPreviousIcon(test.statusFromPrevious)">
                </div>
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
import ReportBrief from '../components/ReportBrief.vue'
import { alphaCompare } from '../common'

export default {
  name: 'Report',

  components: {
    'report-brief': ReportBrief,
  },

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
      return this.tests.filter(t => t.status === 'failed').sort(alphaCompare(t => t.name.toUpperCase()));
    },
    ignoreTests() {
      return this.tests.filter(t => t.status === 'ignore').sort(alphaCompare(t => t.name.toUpperCase()));
    },
    passedTests() {
      return this.tests.filter(t => t.status === 'passed').sort(alphaCompare(t => t.name.toUpperCase()));
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
    goToPreviousReport() {
      this.$store.dispatch('popBreadCrumb');
      this.$router.push(`/report/${this.report.previousReportId}`);
    },
    toggleCollapseFailed() {
      this.collapseFailed = !this.collapseFailed;
    },
    toggleCollapseIgnore() {
      this.collapseIgnore = !this.collapseIgnore;
    },
    toggleCollapsePassed() {
      this.collapsePassed = !this.collapsePassed;
    },
    statusFromPreviousIcon(status) {
      if (status === 'fixed') {
        return `<i class="fas fa-check"></i>`;
      } else if (status === 'new case') {
        return `<i class="fas fa-plus"></i>`;
      } else if (status === 'new failed') {
        return `<i class="fas fa-car-crash"></i>`;
      } else {
        return '';
      }
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

.statusFromPrevious {
  padding: 0.5em;
}

.summary {
  width: 50%;
  padding: 2em;
}
</style>
