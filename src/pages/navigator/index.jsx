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
