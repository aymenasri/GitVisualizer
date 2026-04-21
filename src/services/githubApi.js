import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.github.com',
});

export const getUserData = (username) => api.get(`/users/${username}`);
export const getUserRepos = (username) => api.get(`/users/${username}/repos?sort=updated&per_page=10`);