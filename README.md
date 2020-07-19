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

## 前端登录错误提示和登录成功后跳转

`src/pages/register/RegisterForm.jsx`

```javascript
import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import classnames from "classnames";

class RegisterForm extends Component {
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
    if (data.status === 1) {
      return this.setState({ errorMsg: data.msg });
    }
    this.props.history.push('/');
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

export default withRouter(RegisterForm);
```

## 登录成功后的提示和删除

`src/pages/register/RegisterForm.jsx`

```javascript
handleSubmit = async e => {
  // ...
  this.props.flash.flashAdd({ id: shortid.generate(), type: "success", text: "登录成功", });
};
```

`src/pages/flash/index.jsx`

```javascript
import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import FlashItem from "./FlashItem";
import { flashDel } from './store/actionCreators'

class Flash extends Component {
  render() {
    return <Fragment>
      {
        this.props.flash.map(item => {
          return <FlashItem {...item} key={item.id} flashDel={this.props.flashDel}/>;
        })
      }
    </Fragment>;
  }
}

const mapStateToProps = state => {
  return {
    flash: state.flash
  };
};
const mapDispatchToProps = dispatch => {
  return {
    flashDel: (id) => {
      dispatch(flashDel(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Flash);
```

`src/pages/flash/FlashItem.jsx`

```javascript
import React, { Component } from "react";
import classnames from "classnames";

export default class FlashItem extends Component {
  onClick = () => {
    this.props.flashDel(this.props.id);
  };
  render() {
    const { type, text } = this.props;
    return (
      <div
        className={classnames("alert mt-3", {
          "alert-success": type === "success",
          "alert-danger": type === "danger",
        })}
      >
        {text}
        <button onClick={this.onClick} className="close">
          &times;
        </button>
      </div>
    );
  }
}
```

`src/pages/flash/store/index.js`

```javascript
import * as actionTypes from './actionTypes';
import * as actionCreators from './actionCreators';
import reducer from './reducer';
export { actionTypes, actionCreators, reducer };
```

`src/pages/flash/store/reducer.js`

```javascript
import * as actionTypes from './actionTypes';
import findIndex from 'lodash/findIndex';

export default (state = [], action) => {
  switch (action.type) {
    case actionTypes.ADD_FLASH:
      return [
        ...state,
        action.payload
      ];
    case actionTypes.DELETE_FLASH:
      const idx = findIndex(state, {
        id: action.payload
      });
      return [
        ...state.slice(0, idx),
        ...state.slice(idx + 1)
      ];
    default:
      return state;
  }
};
```

`src/pages/flash/store/actionCreators.js`

```javascript
import * as actionTypes from './actionTypes';

export const flashAdd = data => {
  return {
    type: actionTypes.ADD_FLASH,
    payload: data
  }
};

export const flashDel = id => {
  return {
    type: actionTypes.DELETE_FLASH,
    payload: id
  };
};
```

`src/pages/flash/store/actionTypes.js`

```javascript
export const ADD_FLASH = 'ADD_FLASH';
export const DELETE_FLASH = 'DELETE_FLASH';
```

`src/store/reducer.js`

```javascript
import { combineReducers } from 'redux';
import { reducer as registerReducer } from '../pages/register/store';
import { reducer as flashReducer } from '../pages/flash/store';

export default combineReducers({
  register: registerReducer,
  flash: flashReducer
});
```

## 注册信息同步到数据库

```
npm i mysql
```

`server/db/index.js`

```javascript
const mysql = require('mysql');
const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'admin123',
  database: 'react_redux'
});
module.exports = (sql, arr, callback) => {
  db.query(sql, arr, function (error, result) {
    if (error) {
      return console.log(new Error(error));
    }
    callback(result);
  });
};
```

`server/routesHandler/register.js`

```javascript
const dbFn = require('../db');

module.exports = (req, res) => {
  const sql = 'insert into user values (null, ?, ?, ?, ?)';
  // 注意数组中的顺序要和数据库对应
  const arr = [req.body.email, req.body.username, req.body.password, req.body.passwordConfirm];
  dbFn(sql, arr, data => {
    if (data.affectedRows === 1) {
      res.send({
        status: 0,
        msg: '注册成功'
      });
    } else {
      res.send({
        status: 1,
        msg: '注册失败'
      });
    }
  });
};
```

## 登录功能

### 前端

`src/pages/login/index.jsx`

```javascript
import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LoginForm from './LoginForm';
import * as loginActionCreators from './store/actionCreators';

class Login extends Component {
  render() {
    return (
      <LoginForm loginData={this.props.loginData} loginFn={this.props.loginFn}/>
    );
  }
}

const mapStateToProps = state => {
  return {
    loginData: state.login
  };
};
const mapDispatchToProps = dispatch => {
  return {
    loginFn: bindActionCreators(loginActionCreators, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
```

`src/pages/login/LoginForm.jsx`

```javascript
import React, { Component } from "react";

export default class LoginForm extends Component {
  state = {
    username: '',
    password: ''
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  handleSubmit = async e => {
    e.preventDefault();
    const { data } = await this.props.loginFn.loginCreator(this.state);
    console.log(data);
  }
  render() {
    const { username, password } = this.state;
    return (
      <div className="row mt-3">
        <div className="col-md-12">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">用户名</label>
              <input
                name="username"
                type="text"
                className="form-control"
                id="username"
                defaultValue={username}
                onChange={this.handleChange}
              />
              <small className="form-text text-muted">
                We'll never share your username with anyone else.
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="password">密码</label>
              <input
                name="password"
                type="password"
                className="form-control"
                id="password"
                defaultValue={password}
                onChange={this.handleChange}
              />
              <small className="form-text text-muted">
                We'll never share your password with anyone else.
              </small>
            </div>
            <button type="submit" className="btn btn-primary">
              Sign in
            </button>
          </form>
        </div>
      </div>
    );
  }
}
```

`src/pages/login/store/index.js`

```javascript
import * as actionTypes from './actionTypes';
import * as actionCreators from './actionCreators';
import reducer from './reducer';

export { actionTypes, actionCreators, reducer };
```

`src/pages/login/store/actionCreators.js`

```javascript
import axios from '../../../utils/request';

export const loginCreator = data => {
  return diapatch => {
    return axios.post('/api/login', data);
  };
};
```

`src/pages/login/store/actionTypes.js`

```javascript
export const LOGIN = 'LOGIN';
```

`src/pages/login/store/reducer.js`

```javascript
export default (state = {}, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
```

`src/store/reducer.js`

```javascript
import { combineReducers } from 'redux';
import { reducer as registerReducer } from '../pages/register/store';
import { reducer as flashReducer } from '../pages/flash/store';
import { reducer as loginReducer } from '../pages/login/store';

export default combineReducers({
  register: registerReducer,
  flash: flashReducer,
  login: loginReducer
});
```

### 后端

```
npm i jsonwebtoken
```

`server/routes/login.js`

```javascript
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const dbFn = require('../db');
const config = require('../config');

router.post('/login', (req, res) => {
  const sql = 'select * from user where username=? and password=?';
  dbFn(sql, [req.body.username, req.body.password], data => {
    if (data.length) {
      const token = jwt.sign({
        id: data[0].id,
        username: data[0].username
      }, config.jwtSecret);
      // 直接返回 token
      return res.send(token);
    }
    res.send({
      status: 1,
      msg: '登录失败'
    });
  });
});

module.exports = router;
```

## Token 处理

### 请求头携带 Token

`src/utils/request.js`

```javascript
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
```

### 登录成功后前端存储 token，解析 token 信息并同步到 Redux

```
npm i jwt-decode
```

`src/pages/login/LoginForm.jsx`

```javascript
handleSubmit = async e => {
  e.preventDefault();
  const { data } = await this.props.loginFn.loginCreator(this.state);
  if (data.status === 0) {
    // 设置 token
    localStorage.setItem('TOKEN', data.token);
    // 解析 token 到 redux
    this.props.loginFn.setUserInfo(jwtDecode(data.token));
  }
}
```

`src/pages/login/store/reducer.js`

```javascript
import * as actionTypes from './actionTypes';
import isEmpty from 'lodash/isEmpty';

const initState = {
  isAuth: false,
  user: {}
};
export default (state = initState, action) => {
  switch (action.type) {
    case actionTypes.SET_USERINFO:
      return {
        isAuth: !isEmpty(action.payload),
        user: action.payload
      }
    default:
      return state;
  }
};
```

`src/pages/login/store/actionCreators.js`

```javascript
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
```

`src/pages/login/store/actionTypes.js`

```javascript
export const LOGIN = 'LOGIN';
export const SET_USERINFO = 'SET_USERINFO';
```

刷新是解析 token 并同步到 Redux

`src/index.js`

```javascript
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
```

## 退出

`src/pages/login/store/actionCreators.js`

```javascript
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
```

`src/pages/navigator/index.jsx`

```javascript
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../login/store/actionCreators";
import me from "./me.webp";

class Navigator extends Component {
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
          {this.props.login.isAuth
            ? <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="###"
                    onClick={this.props.logout}
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            : <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Sign in
                  </Link>
                </li>
                <li className="nav-item active">
                  <Link to="/register" className="nav-link">
                    Sign up
                  </Link>
                </li>
              </ul>}
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => {
  return {
    login: state.login,
  };
};

export default connect(mapStateToProps, { logout })(Navigator);
```

## 思考

发起异步请求的操作都写在 actionCreator 里还是组件里，还是两者结合起来（then 返回的也是 Promise 可以继续在组件中写）