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