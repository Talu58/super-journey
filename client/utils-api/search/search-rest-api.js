import axios from 'axios';

export function getIndustryMatchesRequest(industryName) {
  return axios.get('/organizations/match/' + industryName);
};

export function getAllOrganizations() {
  return axios.get('/organizations/all');
}



