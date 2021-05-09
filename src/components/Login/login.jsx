import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { postData } from "../../utils/fetch";
import { saveToken } from "../../redux/actions";
import { withRouter } from "react-router";

import "./login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      password: "",
      email: null,
      age: null,
    };
  }
  callLogin = async () => {
    try {
      const response = await postData("/users/login", {
        email: this.state.email,
        password: this.state.password,
        noAuth: true,
      });
      this.props.history.push("/dashboard");
      sessionStorage.setItem("token", response.token);
      this.props.saveToken(response.token);
    } catch (error) {
      this.setState({
        error:
          (error.response && error.response.data.message) ||
          "Password or Email is incorrect !",
      });
    }
  };
  toggleRegistration = () => {
    this.setState({ showRegsitration: !this.state.showRegsitration });
  };
  callRegister = async () => {
    const { name, password, email, age } = this.state;
    try {
      if (name && password && email && age) {
        await postData("/users", {
          name,
          password,
          email,
          age,
        });
        this.callLogin();
      } else {
        this.setState({ error: "All fiels are mandatory" });
      }
    } catch (error) {
      this.setState({
        error:
          (error.response && error.response.data.message) ||
          "Registeration failed, try again",
      });
    }
  };
  render() {
    return (
      <div
        style={{ display: "flex", alignItems: "center" }}
        className="login-wrapper"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flexGrow: "1",
            background: "white",
            minHeight: "34%",
            paddingTop: "2%",
            opacity: "0.9",
          }}
        >
          <div style={{ display: "flex", marginTop: "10px" }}>
            {" "}
            <input
              type="text"
              placeholder="Email"
              onBlur={(event) => {
                this.setState({ email: event.target.value });
              }}
            />
          </div>
          {this.state.showRegsitration && (
            <>
              <div style={{ display: "flex", marginTop: "10px" }}>
                <input
                  type="text"
                  placeholder="Name"
                  onBlur={(event) => {
                    this.setState({ name: event.target.value });
                  }}
                />
              </div>
              <div style={{ display: "flex", marginTop: "10px" }}>
                <input
                  type="text"
                  placeholder="Age"
                  onBlur={(event) => {
                    this.setState({ age: event.target.value });
                  }}
                />
              </div>
            </>
          )}
          <div style={{ display: "flex", marginTop: "10px" }}>
            <input
              type="password"
              placeholder="Password"
              onBlur={(event) => {
                this.setState({ password: event.target.value });
              }}
            />
          </div>
          {this.state.showRegsitration && (
            <div style={{ display: "flex", marginTop: "10px" }}>
              <button onClick={this.callRegister}>Register</button>
              <button
                style={{
                  marginLeft: "5px",
                  color: "black",
                  background: "silver",
                }}
                onClick={this.toggleRegistration}
              >
                Cancel
              </button>
            </div>
          )}
          {!this.state.showRegsitration && (
            <>
              <div style={{ display: "flex", marginTop: "10px" }}>
                <button style={{background:'green'}} onClick={this.callLogin}>Login</button>
              </div>

              <div
                style={{
                  display: "flex",
                  marginTop: "10px",
                  cursor: "pointer",
                  color: "blue",
                }}
                onClick={this.toggleRegistration}
              >
                <i>or Register</i>
              </div>
            </>
          )}
          {this.state.error && (
            <p style={{ color: "red" }}> {this.state.error}</p>
          )}
        </div>
      </div>
    );
  }
}
export default compose(withRouter, connect(null, { saveToken }))(Login);
