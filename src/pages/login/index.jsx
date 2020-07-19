import React, { Component } from "react";

export default class Login extends Component {
  render() {
    return (
      <div className="row mt-3">
        <div className="col-md-12">
          <form>
            <div className="form-group">
              <label htmlFor="username">用户名</label>
              <input name="username" type="username" className="form-control" id="username" />
              <small className="form-text text-muted">
                We'll never share your username with anyone else.
              </small>
            </div>
            <div className="form-group">
              <label htmlFor="password">密码</label>
              <input name="password" type="password" className="form-control" id="password" />
              <small className="form-text text-muted">
                We'll never share your password with anyone else.
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
