import axios from '../../../utils/request';

export const loginCreator = data => {
  return diapatch => {
    return axios.post('/api/login', data);
  };
};