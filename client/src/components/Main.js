import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { logoutUser } from "../actions/authActions";

class Main extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    return (
      <div>
        <h1>Main</h1>
        <Link to="/api/usersAuth/login">Log in</Link>
        <br />
        <Link to="/api/usersAuth/register">Register</Link>
        <br />
        <Link onClick={this.onLogoutClick} to="/">
          Logout
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(Main));
