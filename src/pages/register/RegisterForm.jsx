import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import classnames from "classnames";
import shortid from 'shortid';

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
    this.props.history.push("/");
    this.props.flash.flashAdd({
      id: shortid.generate(),
      type: "success",
      text: "登录成功",
    });
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
