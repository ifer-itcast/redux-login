import axios from 'axios';

axios.interceptors.request.use(config => {
  const tk = localStorage.getItem('TOKEN');
  const {
    url
  } = config;
  const passUrl = ['/api/register', '/api/login'];
  // 登录、注册无需携带 token
  if (passUrl.includes(url)) return config;
  if (tk) {
    config.headers.Authorization = tk;
  } else {
    delete config.headers.Authorization;
  }
  return config;
});

axios.interceptors.response.use(response => {
  const { status } = response.data;
  // 和后端确定 token 失效的返回信息，统一删除 token
	if (status === 400) {
		// 此时，说明 token 失效，直接移除 token 即可
		// 删除 token
	}
	return response;
});

export default axios;