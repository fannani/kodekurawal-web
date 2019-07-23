import axios from 'axios';
import { API_URL } from '../config/config';

const q = query => {
  return axios({
    url: API_URL,
    method: 'post',
    data: {
      query,
    },
  }).then(response => {
    return response;
  });
};

const query = query => {
  return q(`{${query}}`);
};
const mutation = query => {
  return q(`mutation{${query}}`);
};
export default {
  query,
  mutation,
};
