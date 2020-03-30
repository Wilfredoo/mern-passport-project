import React, { Component } from "react";
import axios from "axios";

class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    errors: {}
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const newUser = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    };
    axios
      .post(`/api/users/register`, newUser)
      .then(res => this.props.history.push("/login"))
      .catch(err => {
        console.log("error bandido", err.response.data);
        this.setState({
          errors: err.response.data
        });
      });
  };

  render() {
    const { username, email, password, errors } = this.state;
    return (
      <React.Fragment>
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h2 className="mt-5 text-center mb-0">Register</h2>
              <p className="text-center text-lead">Create your account here</p>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    name="username"
                    value={username}
                    onChange={this.handleChange}
                    className={
                      errors.type === "username"
                        ? "is-invalid form-control"
                        : "form-control"
                    }
                    placeholder="Enter your username"
                  />
                </div>

                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={this.handleChange}
                    className="form-control"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="form-group">
                  <input
                    type="pasword"
                    name="password"
                    value={password}
                    onChange={this.handleChange}
                    className="form-control"
                    placeholder="Enter your password"
                  />
                </div>
                <input
                  type="submit"
                  className="btn btn-primary justify-content-center d-flex w-100"
                  value="Register"
                />
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Register;
