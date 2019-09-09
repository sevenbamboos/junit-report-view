//import {TestCaseStatus} from './model'
import { mockProjects } from './seeds'

export const store = {
  projects: [],
  inactiveProjects: [],

  loadMockProjects() {
    return new Promise(resolve => {
      //console.log(`[${new Date().toLocaleString()}] mock to loading projects from server`);
      setTimeout( () => {resolve(mockProjects)}, 1000);
    });
  },

  hideProject(projectId) {
    let changed = false;
    for (let proj of this.projects) {
      if (proj.id === projectId) {
        this.inactiveProjects.push(projectId);
        changed = true;
      }
    }

    return changed;
  },

  async searchProjects(term) {

    store.projects.splice(0, store.projects.length);

    const dataSource = await this.loadMockProjects();

    const result = term ? dataSource.filter(p => p.name.indexOf(term) !== -1) : dataSource;

    result.forEach( p => {
      if (this.inactiveProjects.indexOf(p.id) === -1) {
        store.projects.push(p);
      }
    });

    return store.projects;
    //throw "server is down"
  }
}
