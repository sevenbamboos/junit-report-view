import Vue from 'vue'
import Vuex from 'vuex'
import { searchProjects } from './api-client'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    projects: [],
  },
  mutations: {
    updateProjects(state, payload) {
      state.projects = payload;
    }
  },
  actions: {
    async searchProjects(context, payload) {
      const result = await searchProjects(payload);
      context.commit('updateProjects', result);
    }
  },
  getters: {
    projects: state => state.projects
  }
})
