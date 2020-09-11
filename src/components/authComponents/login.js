import React, { Component } from 'react';
import {Alert} from 'react-bootstrap';

import '../../styles/authStyles.css';

export default class Login extends Component {
  state = {
    username: "",
    password: "",
    errors: "",
    isAlertOn: false,
    alertMessage: ''
  };

  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.props.history.push('/browse')
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.isLoggedIn !== prevProps.isLoggedIn) {
      if (this.props.isLoggedIn) {
        this.props.history.push('/browse')
      }
    }
  }

  handleChange = (e) => {
    console.log(e);
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    let user = {
      username: username,
      password: password
    };

      //   axios
      // .post("http://localhost:3001/login", { user }, { withCredentials: false})
      // .then((response) => {
      //     console.log(response.data)
      //     this.props.handleLogin(response.data);
      //     this.redirect();
      // })
      // .catch((error) => console.log("api errors:", error));

    fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        user: {
          username: this.state.username,
          password: this.state.password
        }
      })
    })
      .then(r => r.json())
      .then(data => {
        if (data.error) {
          this.setState({
            alertMessage: data.error,
            isAlertOn: true
          });
          return false;
        }
        localStorage.setItem('token', data.jwt)
        this.props.handleLogin(data);
        this.props.history.push('/browse');
      })
  };
  redirect = () => {
    this.props.history.push("/");
  };
  handleErrors = () => {
    return (
      <div>
        <ul>
          {this.state.errors.map((error) => {
            return <li key={error}>{error}</li>;
          })}
        </ul>
      </div>
    );
  };
  render() {
    return (
      <div>
        <div className="loginPageContainer">
          <h3 className="loginHeader">
            Welcome Back!
          </h3>
          <form onSubmit={this.handleSubmit} className="authPageForm">
            <input
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
              className="loginUsername"
              placeholder="username"
              type="text" />
            <input
              className="loginPassword"
              placeholder="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              type="password" />
              {this.state.isAlertOn &&
                <Alert variant="danger">
                  {this.state.alertMessage}
                </Alert>
             }
            <input
              type="submit"
              value="Log In"
              className="loginSubmitButton"
            />
          </form>

        </div>
      </div>
    )
  }
}


{/* <h1>Log In</h1>
<form onSubmit={this.handleSubmit}>
  <input
    placeholder="username"
    type="text"
    name="username"
    value={this.state.username}
    onChange={this.handleChange}
  />
  <input
    placeholder="password"
    type="password"
    name="password"
    value={this.state.password}
    onChange={this.handleChange}
  />
  <button placeholder="submit" type="submit">
    Log In
  </button>
  <div>
    or <Link to="/signup">sign up</Link>
  </div>
</form> */}
