import actions from './actions'

const projectsModule = {
  state: {
    projects: [],
    project: undefined
  },
  mutations: {
    updateProjects(state, payload) {
      state.projects = payload;
    },

    updateProject(state, payload) {
      state.project = payload;
    }
  },
  actions,
  getters: {
    projects: state => state.projects,
    projectCount: state => state.projects.length,
    project: state => state.project,
  }
};

export default projectsModule;