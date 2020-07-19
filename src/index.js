import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import store from './store';
import { Provider } from 'react-redux';
import { setUserInfo } from './pages/login/store/actionCreators';

const tk = localStorage.getItem('TOKEN');
if (tk) store.dispatch(setUserInfo(tk));

ReactDOM.render(<Provider store={store}>
  <App />
</Provider>, document.querySelector("#root"));
