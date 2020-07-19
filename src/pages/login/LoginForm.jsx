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
