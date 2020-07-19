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
