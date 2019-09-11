import actions from './actions'

const projectsModule = {
  state: {
    projects: [],
    project: undefined,
    reports: [],
    report: undefined,
    tests: []
  },
  mutations: {
    updateProjects(state, payload) {
      state.projects = payload;
    },

    updateProject(state, payload) {
      state.project = payload;
    },

    updateReports(state, payload) {
      state.reports = payload;
    },

    updateReport(state, payload) {
      state.report = payload;
    },

    updateTests(state, payload) {
      state.tests = payload;
    }
  },
  actions,
  getters: {
    projects: state => state.projects,
    projectCount: state => state.projects.length,
    project: state => state.project,
    reports: state => state.reports,
    report: state => state.report,
    tests: state => state.tests,
  }
};

export default projectsModule;