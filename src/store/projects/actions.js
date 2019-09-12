import { searchProjects as searchProjectsFromAPI, getProject as getProjectFromAPI, getReports, getReport as getReportFromAPI, getTests } from '../../api-client'

const actions = {
  async searchProjects(context, payload) {
    const result = await searchProjectsFromAPI(payload);
    if (result) {
      context.commit('updateProjects', result);
    } else {
      console.warn('No result from searchProjects');
    }
  },

  async getProject(context, payload) {
    const result = await getProjectFromAPI(payload);
    if (result) {
      context.commit('updateProject', result);
      const reports = await getReports(result.id);
      if (reports) {

        const reportMap = reports.reduce((accu, curr) => {
          accu[curr.id] = curr;
          return accu;
        }, {});

        reports.forEach((re, index) => {
          if (re.previousReportId) {
            re.previousReport = reportMap[re.previousReportId];
            re.previousReport.nextReport = re;
          }
        });

        context.commit('updateReports', reports);
      }

    } else {
      console.warn('No result from getProject');
    }
  },

  async getReport(context, payload) {
    const report = await getReportFromAPI(payload);
    if (report) {

      report.statusFromPrevious = {fixed: 0, newCase: 0, newFailed: 0};

      const previousReportId = report.previousReportId;
      const tests = await getTests(report.id);

      if (previousReportId && tests) {
        const previousTests = await getTests(previousReportId);
        const prevTestMap = previousTests.reduce((accu, curr) => {
          accu[curr.name] = curr.status;
          return accu;
        }, {});

        tests.forEach(test => {
          updateTestFromPreviousStatus(report, test, prevTestMap[test.name]);
        });
      }

      context.commit('updateTests', tests);
      context.commit('updateReport', report);

    } else {
      console.warn('No result from getReport');
    }
  }
};

function updateTestFromPreviousStatus(report, test, previousStatus) {
  if (test.status === 'passed') {
    if (previousStatus === 'failed') {
      test.statusFromPrevious = 'fixed';
      report.statusFromPrevious.fixed += 1;

    } else if (!previousStatus || previousStatus === 'ignore') {
      test.statusFromPrevious = 'new case';
      report.statusFromPrevious.newCase += 1;
    }

  } else if (test.status === 'failed') {
    if (!previousStatus || previousStatus === 'passed' || previousStatus === 'ignore') {
      test.statusFromPrevious = 'new failed';
      report.statusFromPrevious.newFailed += 1;
    }

  } else if (test.status === 'ignore') {

  } else {
    throw "Unknown status " + test.status;
  }
}

export default actions;
