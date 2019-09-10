import axios from 'axios';

export async function searchProjects(term) {
  const response = await axios.get(`http://localhost:3000/projects?q=${term}`);
  return response.data;
}