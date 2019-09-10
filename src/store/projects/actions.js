import { searchProjects as searchProjectsFromAPI, getProject as getProjectFromAPI } from '../../api-client'

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
    } else {
      console.warn('No result from getProject');
    }
  }
};

export default actions;
