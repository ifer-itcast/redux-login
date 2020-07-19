import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators as registerActionCreators } from "./store";
import { actionCreators as flashActionCreators } from '../flash/store';
import RegisterFrom from "./RegisterForm";

class Register extends Component {
  render() {
    return <RegisterFrom register={this.props.register} flash={this.props.flash} />;
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
    register: bindActionCreators(registerActionCreators, dispatch),
    flash: bindActionCreators(flashActionCreators, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
