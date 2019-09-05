//import {TestCaseStatus} from './model'
import { mockProjects } from './seeds'

export const store = {
  projects: [],

  loadMockProjects() {
    return new Promise(resolve => {
      //console.log(`[${new Date().toLocaleString()}] mock to loading projects from server`);
      setTimeout( () => {resolve(mockProjects)}, 1000);
    });
  },

  async searchProjects(term) {

    store.projects.splice(0, store.projects.length);

    const dataSource = await this.loadMockProjects();

    const result = term ? dataSource.filter(p => p.name.indexOf(term) !== -1) : dataSource;

    result.forEach( p => store.projects.push(p) );

    return result;
    //throw "server is down"
  }
}
