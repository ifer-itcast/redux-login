import axios from 'axios';

export const registerActionCreator = user => {
  return dispatch => {
    // 不一定要 dispatch 到 redux 里面
    return axios.post('/api/register', user);
  };
};