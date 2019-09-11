import axios from 'axios';

export async function searchProjects(term) {
  const response = await axios.get(`http://localhost:3000/projects?q=${term}`);
  return response.data;
}

export async function getProject(id) {
  // return new Promise((resolve, reject) => {
  //   setTimeout(async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:3000/projects/${id}`);
  //       resolve(response.data);
  //     } catch (error) {
  //       reject(error);
  //     }
  //   }, 3000);
  // });
  const response = await axios.get(`http://localhost:3000/projects/${id}`);
  return response.data;
}