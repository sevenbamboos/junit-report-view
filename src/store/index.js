import Vue from 'vue'
import Vuex from 'vuex'
import projects from './projects'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    projects: {
      ...projects,
      namespaced: true
    }
  }
})
