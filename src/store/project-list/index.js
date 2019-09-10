import actions from './actions'

const projectListModule = {
  state: {
    projects: [],
  },
  mutations: {
    updateProjects(state, payload) {
      state.projects = payload;
    }
  },
  actions,
  getters: {
    projects: state => state.projects,
    projectCount: state => state.projects.length
  }
};

export default projectListModule;