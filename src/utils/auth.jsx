import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import shortid from 'shortid';
import { flashAdd } from "../pages/flash/store/actionCreators";

export default function(Comp) {
  class Auth extends React.Component {
    componentWillMount() {
      // false
      if (!this.props.isAuth) {
        // 没登录呗
        this.props.flashAdd({
          id: shortid.generate(),
          type: "danger",
          text: "请登录",
        });
        this.props.history.push("/login");
      }
    }
    // 为什么是这个？例如退出时要回到登录界面
    componentWillUpdate(nextProps) {
      // isAuth 有更新也时要处理
      if (!nextProps.isAuth) {
        this.props.history.push("/login");
      }
    }
    render() {
      return <Comp {...this.props} />;
    }
  }
  const mapStateToProps = state => {
    return {
      isAuth: state.login.isAuth
    };
  };
  return withRouter(connect(mapStateToProps, { flashAdd })(Auth));
}
