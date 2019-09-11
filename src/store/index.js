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

    popBreadCrumb(state) {
      state.breadcrumbs.pop();
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
    popBreadCrumb(context) {
      context.commit('popBreadCrumb');
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
