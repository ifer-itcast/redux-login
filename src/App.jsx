import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// 导航
import Navigator from "./pages/navigator";
// 注册
import Register from "./pages/register";
// 首页
import Home from "./pages/home";
// 登录
import Login from "./pages/login";
// 提示
import Flash from "./pages/flash";
// 用户
import User from './pages/user';
// 权限
import Auth from './utils/auth';

export default class App extends Component {
  render() {
    return (
      <Router>
        {/* 永存 */}
        <Navigator />
        <Flash/>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/user" component={Auth(User)} />
        </Switch>
      </Router>
    );
  }
}
