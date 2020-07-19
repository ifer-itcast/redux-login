## 初始化项目

```
npx create-react-app redux-login
```

`src/index.js`

```javascript
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
ReactDOM.render(<App />, document.querySelector("#root"));
```

`src/App.jsx`

```javascript
import React, { Component } from "react";

export default class App extends Component {
  render() {
    return <div>hello world</div>;
  }
}
```

## App.jsx 中加入导航，配置注册、登录、首页路由

```
npm i react-router-dom
```

`src/App.jsx`

```javascript
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

export default class App extends Component {
  render() {
    return (
      <Router>
        {/* 永存 */}
        <Navigator />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
        </Switch>
      </Router>
    );
  }
}
```

`src/pages/register/index.jsx`

```javascript
import React, { Component } from "react";

export default class Register extends Component {
  render() {
    return (
      <div className="row mt-3">
        <div className="col-md-12">
          <form>
            <div className="form-group">
              <label htmlFor="username">用户名</label>
              <input type="username" className="form-control" id="username" />
              <small className="form-text text-muted">
                We'll never share your username with anyone else.
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="email">邮箱</label>
              <input type="email" className="form-control" id="email" />
              <small className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="password">密码</label>
              <input type="password" className="form-control" id="password" />
              <small className="form-text text-muted">
                We'll never share your password with anyone else.
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="passwordConfirm">密码确认</label>
              <input
                type="passwordConfirm"
                className="form-control"
                id="passwordConfirm"
              />
              <small className="form-text text-muted">
                We'll never share your passwordConfirm with anyone else.
              </small>
            </div>
            <button type="submit" className="btn btn-primary">
              注册
            </button>
          </form>
        </div>
      </div>
    );
  }
}
```

`src/pages/navigator/index.jsx`

```javascript
import React, { Component } from "react";
import { Link } from "react-router-dom";
import me from "./me.webp";

export default class Navigator extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to="/" className="navbar-brand">
          <img
            src={me}
            alt=""
            width="20px"
            style={{ position: "relative", top: "-2px" }}
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                登录
              </Link>
            </li>
            <li className="nav-item active">
              <Link to="/register" className="nav-link">
                注册
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
```

`src/pages/home/index.jsx`

```javascript
import React, { Component } from "react";

export default class Home extends Component {
  render() {
    return (
      <div className="jumbotron mt-3">
        <h1>Hello ~</h1>
      </div>
    );
  }
}
```

`public/index.html`

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/4.5.0/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.js"></script>
    <script src="https://cdn.bootcdn.net/ajax/libs/twitter-bootstrap/4.5.0/js/bootstrap.min.js"></script>
</head>

<body>
    <div id="root" class="container"></div>
</body>

</html>
```

## 收集数据到 state

==后续几部做的都是发起请求的工作==

```javascript
export default class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
  };
  render() {
    return (
      <div className="row mt-3"></div>
    );
  }
}
```

## 配置 Redux

```
npm i redux react-redux redux-thunk redux-logger
```

### src/pages/register

`src/pages/register/index.jsx`

```javascript
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "./store";
import RegisterFrom from "./RegisterForm";

class Register extends Component {
  render() {
    return <RegisterFrom register={this.props.register} />;
  }
}

const mapStateToProps = state => {
  return {
    register: state.register,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    /* register: function() {
      dispatch(registerActionCreator());
    } */
    register: bindActionCreators(actionCreators, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
```

`src/pages/register/RegisterForm.jsx`

```javascript
import React, { Component } from "react";

export default class RegisterForm extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.register.registerActionCreator();
  };
  render() {
    return (
      <div className="row mt-3">
        <div className="col-md-12">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">用户名</label>
              <input
                name="username"
                type="username"
                className="form-control"
                id="username"
                onChange={this.handleChange}
              />
              <small className="form-text text-muted">
                We'll never share your username with anyone else.
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="email">邮箱</label>
              <input
                name="email"
                type="email"
                className="form-control"
                id="email"
                onChange={this.handleChange}
              />
              <small className="form-text text-muted">
                We'll never share your email with anyone else.
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="password">密码</label>
              <input
                name="password"
                type="password"
                className="form-control"
                id="password"
                onChange={this.handleChange}
              />
              <small className="form-text text-muted">
                We'll never share your password with anyone else.
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="passwordConfirm">密码确认</label>
              <input
                name="passwordConfirm"
                type="passwordConfirm"
                className="form-control"
                id="passwordConfirm"
                onChange={this.handleChange}
              />
              <small className="form-text text-muted">
                We'll never share your passwordConfirm with anyone else.
              </small>
            </div>
            <button type="submit" className="btn btn-primary">
              注册
            </button>
          </form>
        </div>
      </div>
    );
  }
}
```

`src/pages/register/store/index.js`

```javascript
import * as actionTypes from './actionTypes';
import * as actionCreators from './actionCreators';
import reducer from './reducer';

export { actionTypes, actionCreators, reducer };
```

`src/pages/register/store/actionCreators.js`

```javascript
import axios from 'axios';

export const registerActionCreator = user => {
  return dispatch => {
    // 不一定要 dispatch 到 redux 里面
    return axios.post('/api/register', user);
  };
};
```

`src/pages/register/store/reducer.js`

```javascript
const reducer = (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
export default reducer;
```

### src/store

`src/store/reducer.js`

```javascript
import { combineReducers } from 'redux';
import { reducer as registerReducer } from '../pages/register/store';

export default combineReducers({
  register: registerReducer 
});
```

`src/store/index.js`

```javascript
import { createStore, compose, applyMiddleware } from 'redux';
import reducer from './reducer';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
const composeEnhancers = (typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
export default createStore(reducer, composeEnhancers(applyMiddleware(logger, thunk)));
```

## 配置 axios

`src/utils/request.js`

```javascript
import axios from 'axios';
export default axios;
```

## 配置代理

https://www.html.cn/create-react-app/docs/proxying-api-requests-in-development/

https://www.npmjs.com/package/http-proxy-middleware

```
npm install http-proxy-middleware
```

`src/setupProxy.js`

```javascript
const {
  createProxyMiddleware
} = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8888',
      changeOrigin: true
    })
  )
};
```

## 后端准备接口并校验数据

https://www.npmjs.com/package/validator

~~npm i validator~~

https://hapi.dev/module/joi/#introduction

```
npm i @hapi/joi
```

`server/app.js`

```javascript
const express = require('express');
const app = express();
const Joi = require('@hapi/joi');

app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());

app.use('/api', require('./routes/register'));

app.use((err, req, res, next) => {
  if (err instanceof Joi.ValidationError) {
    err = [err.details[0].context.label, err.details[0].message];
  }
  res.send({
    status: 1,
    msg: err.message || err
  });
});

app.listen(8888, () => console.log('Server running on http://localhost:8888'));
```

`server/routes/register.js`

```javascript
const express = require('express');
const router = express.Router();
const checkData = require('../middleware/checkData');
const { registerSchema } = require('../schema/register');

router.post('/register', checkData(registerSchema), require('../routesHandler/register'));

module.exports = router;
```

`server/middleware/checkData.js`

```javascript
const joi = require('@hapi/joi');
module.exports = schemas => (req, res, next) => {
  ['body', 'query', 'params'].forEach(item => {
    // 如果当前循环的这一项 schema 没有提供，则不执行对应的校验
    if (!schemas[item]) return;
    // 执行校验，规则，数据
    // const { error } = joi.object(data.body).validate(req.body);
    const schema = joi.object(schemas[item]);
    const {
      error
    } = schema.validate(req[item]);
    if (error) {
      throw error;
    }
  });
  next();
};
```

`server/schema/register.js`

```javascript
const Joi = require('@hapi/joi');

const registerSchema = {
  body: {
    username: Joi.string().required().error(new Error('用户名不符合规范')),
    email: Joi.string().email().required().error(new Error('邮箱不符合规范')),
    password: Joi.string().required().error(new Error('密码不符合规范')),
    passwordConfirm: Joi.ref('password')
  }
};
module.exports = {
  registerSchema
};
```

`server/routesHandler/register.js`

```javascript
module.exports = (req, res) => {
  res.send({
    status: 0,
    msg: '注册成功'
  });
};
```

## 前端错误提示

`src/pages/register/RegisterForm.jsx`

```javascript
import React, { Component } from "react";
import classnames from "classnames";

export default class RegisterForm extends Component {
  state = {
    userInfo: {
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
    errorMsg: [],
  };
  handleChange = e => {
    this.setState({
      userInfo: {
        ...this.state.userInfo,
        [e.target.name]: e.target.value,
      },
    });
  };
  handleSubmit = async e => {
    e.preventDefault();
    this.setState({ errorMsg: [] });
    const { data } = await this.props.register.registerActionCreator(
      this.state.userInfo
    );
    this.setState({ errorMsg: data.msg });
  };
  render() {
    const { errorMsg, userInfo } = this.state;
    return (
      <div className="row mt-3">
        <div className="col-md-12">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                name="username"
                type="username"
                id="username"
                defaultValue={userInfo.username}
                className={classnames("form-control", {
                  "is-invalid": errorMsg[0] === "username",
                })}
                onChange={this.handleChange}
              />
              <small className="form-text text-muted">
                {errorMsg[0] === "username" && errorMsg[1]}
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                name="email"
                type="email"
                id="email"
                defaultValue={userInfo.email}
                className={classnames("form-control", {
                  "is-invalid": errorMsg[0] === "email",
                })}
                onChange={this.handleChange}
              />
              <small className="form-text text-muted">
                {errorMsg[0] === "email" && errorMsg[1]}
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                name="password"
                type="password"
                id="password"
                defaultValue={userInfo.password}
                className={classnames("form-control", {
                  "is-invalid": errorMsg[0] === "password",
                })}
                onChange={this.handleChange}
              />
              <small className="form-text text-muted">
                {errorMsg[0] === "password" && errorMsg[1]}
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="passwordConfirm">Password Confirm</label>
              <input
                name="passwordConfirm"
                type="passwordConfirm"
                id="passwordConfirm"
                defaultValue={userInfo.passwordConfirm}
                className={classnames("form-control", {
                  "is-invalid": errorMsg[0] === "passwordConfirm",
                })}
                onChange={this.handleChange}
              />
              <small className="form-text text-muted">
                {errorMsg[0] === "passwordConfirm" && errorMsg[1]}
              </small>
            </div>
            <button type="submit" className="btn btn-primary">
              Sign up for HM
            </button>
          </form>
        </div>
      </div>
    );
  }
}
```