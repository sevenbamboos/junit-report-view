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
          <div class="level">
            <div class="level-left">
              <div v-if="previousReport">
                <a class="button" @click="goToPreviousReport">Previous</a>
              </div>
              <div v-else>
                <a class="button" disabled>No Previous</a>
              </div>
            </div>
            <div class="summary">
              <report-brief :report="report" />
            </div>
            <div class="level-right">
              <div v-if="nextReport">
                <a class="button" @click="goToNextReport">Next</a>
              </div>
              <div v-else>
                <a class="button" disabled>No Next</a>
              </div>
            </div>
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
      reloadPrev: false,
      reloadNext: false,
      collapseFailed: false,
      collapseIgnore: true,
      collapsePassed: true
    };
  },

  computed: {
    ...Vuex.mapGetters({
      report: 'projects/report',
      reports: 'projects/reports',
      tests: 'projects/tests',
    }),
    reportId() {
      return this.$route.params.id
    },
    previousReport() {
      if (this.report) {
        const reportId = this.report.id;
        const reportInProject = this.reports.find(x => x.id === reportId);
        if (reportInProject) {
          return reportInProject.previousReport;
        } else {
          throw "Can't load reportInProject, reportId:" + this.report.id;
        }
      } else {
        return undefined;
      }
    },
    nextReport() {
      if (this.report) {
        const reportId = this.report.id;
        const reportInProject = this.reports.find(x => x.id === reportId);
        if (reportInProject) {
          return reportInProject.nextReport;
        } else {
          throw "Can't load reportInProject, reportId:" + this.report.id;
        }
      } else {
        return undefined;
      }
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
      if (this.reloadPrev) {
        await this.$store.dispatch('projects/getReport', this.previousReport.id);
      } else if (this.reloadNext) {
        await this.$store.dispatch('projects/getReport', this.nextReport.id);
      } else {
        await this.$store.dispatch('projects/getReport', this.reportId);
      }
      await this.$store.dispatch('replaceBreadCrumbForReport', this.report);
    },
    goToPreviousReport() {
      if (this.previousReport) {
        this.reloadPrev = true;
        this.reloadNext = false;
        this.$router.push(`/report/${this.previousReport.id}`);
        this.reload = new Date();
      }
    },
    goToNextReport() {
      if (this.nextReport) {
        this.reloadPrev = false;
        this.reloadNext = true;
        this.$router.push(`/report/${this.nextReport.id}`);
        this.reload = new Date();
      }
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
