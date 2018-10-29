import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { registerUser } from "../actions/authActions";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: ""
    };
  }
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.registerUser(newUser, this.props.history);
  };
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <label>name</label>
          <input name="name" value={this.state.name} onChange={this.onChange} />
          <label>email</label>
          <input
            name="email"
            value={this.state.email}
            onChange={this.onChange}
          />
          <label>password</label>
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
          />
          <label>verify password</label>
          <input
            type="password"
            name="password2"
            value={this.state.password2}
            onChange={this.onChange}
          />
          <button type="submit">Sign up</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
