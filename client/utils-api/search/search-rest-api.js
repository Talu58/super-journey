import axios from 'axios';

export function getIndustryMatchesRequest(industryName) {
  return axios.get('/projects/match/' + industryName);
};

export function getAllProjects() {
  return axios.get('/projects/all');
}



