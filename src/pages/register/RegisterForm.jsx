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
