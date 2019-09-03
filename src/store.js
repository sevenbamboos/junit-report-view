export const store = {
  projects: []
}

const mockProjects = [
  {
    id: 101,
    name: 'project-1'
  },
  {
    id: 102,
    name: 'project-2'
  },
  {
    id: 103,
    name: 'project-3'
  },
]

function loadMockProjects() {
  return new Promise(resolve => {
    //console.log(`[${new Date().toLocaleString()}] mock to loading projects from server`);
    setTimeout( () => {resolve(mockProjects)}, 1500);
  });
}

export async function searchProjects(term) {

  store.projects.splice(0, store.projects.length);

  const dataSource = await loadMockProjects();

  const result = term ? dataSource.filter(p => p.name.indexOf(term) !== -1) : dataSource;

  result.forEach( p => store.projects.push(p) );

  return result;
}
