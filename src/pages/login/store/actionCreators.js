import * as actionTypes from './actionTypes';
import axios from '../../../utils/request';

export const loginCreator = data => {
  return diapatch => {
    // 也可以直接在这里的 then 里存储 token 到本地，解析 token 到 redux
    // then 的返回值也是 Promise
    return axios.post('/api/login', data);
  };
};

export const setUserInfo = data => {
  return {
    type: actionTypes.SET_USERINFO,
    payload: data
  }
};

export const logout = () => {
  return dispatch => {
    // 利用 redux-thunk 可以写函数的特性，可以在里面进行逻辑处理
    // #1
    localStorage.removeItem('TOKEN');
    // #2 删除请求头
    // # 清除 Redux 中的数据
    dispatch(setUserInfo({}));
  };
};