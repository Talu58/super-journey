import axios from 'axios';

export function getIndustryMatchesRequest(industryName) {
  return axios.get('/matches/' + industryName);
}