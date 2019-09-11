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
        context.commit('updateReports', reports);
      }

    } else {
      console.warn('No result from getProject');
    }
  },

  async getReport(context, payload) {
    const result = await getReportFromAPI(payload);
    if (result) {
      context.commit('updateReport', result);
      const tests = await getTests(result.id);
      if (tests) {
        context.commit('updateTests', tests);
      }

    } else {
      console.warn('No result from getReport');
    }
  }
};

export default actions;
