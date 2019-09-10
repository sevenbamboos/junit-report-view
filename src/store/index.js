import Vue from 'vue'
import Vuex from 'vuex'
import projectList from './project-list'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    projectList: {
      ...projectList,
      namespaced: true
    }
  }
})
