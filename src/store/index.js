import Vue from 'vue'
import Vuex from 'vuex'
import projects from './projects'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    breadcrumbs: []
  },
  mutations: {
    pushBreadCrumb(state, payload) {
      state.breadcrumbs.push(payload);
    },

    popBreadCrumb(state, payload) {
      let index = -1;
      if (payload) {
        index = state.breadcrumbs.findIndex(x => x.name === payload);
      } else {
        index = state.breadcrumbs.length - 1
      }
      if (index > 0) {
        const len = state.breadcrumbs.length;
        state.breadcrumbs.splice(index+1, len-index-1);
      }
    }
  },
  actions: {
    pushBreadCrumbForProjectList(context) {
      context.commit('pushBreadCrumb', {name: 'Projects', url: '/project-list'});
    },
    pushBreadCrumbForProject(context, project) {
      context.commit('pushBreadCrumb', {name: project.name, url: `/project/${project.id}`});
    },
    pushBreadCrumbForReport(context, report) {
      context.commit('pushBreadCrumb', {name: report.name, url: `/report/${report.id}`});
    },
    popBreadCrumb(context, breadcrumbName) {
      context.commit('popBreadCrumb', breadcrumbName);
    }
  },
  getters: {
    breadcrumbs: state => state.breadcrumbs
  },
  modules: {
    projects: {
      ...projects,
      namespaced: true
    }
  }
})
