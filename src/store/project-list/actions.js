import { searchProjects as searchProjectsFromAPI } from '../../api-client'

const actions = {
  async searchProjects(context, payload) {
    const result = await searchProjectsFromAPI(payload);
    if (result) {
      context.commit('updateProjects', result);
    } else {
      console.warn('No result from searchProjects');
    }
  }
};

export default actions;
