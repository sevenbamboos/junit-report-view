import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/project-list',
      name: 'project-list',
      component: () => import(/* webpackChunkName: "project-list" */ './views/ProjectList.vue')
    },
    {
      path: '/project/:id',
      name: 'project',
      component: () => import(/* webpackChunkName: "project" */ './views/Project.vue')
    }
  ]
})
