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
