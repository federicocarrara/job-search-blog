import React, { Component } from "react";

export default class Register extends Component {
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
    console.log({
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    });
  };
  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            type="name"
            name="name"
            value={this.state.name}
            onChange={this.onChange}
          />
          <input
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.onChange}
          />
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
          />
          <input
            type="password2"
            name="password2"
            value={this.state.password2}
            onChange={this.onChange}
          />
          <button>Sign up</button>
        </form>
      </div>
    );
  }
}
