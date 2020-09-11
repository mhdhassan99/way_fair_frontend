import React, { Component } from 'react';
import {Alert} from 'react-bootstrap';


import '../../styles/authStyles.css'

export default class Signup extends Component {
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
    fetch('http://localhost:3001/users', {
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
      .then(res => {
        if (res.error) {
          this.setState({
            alertMessage: res.error[0],
            isAlertOn: true
          });
          return false;
        }
        localStorage.setItem('token', res.jwt)
        this.props.handleLogin(res);
        this.props.history.push('/browse');
      })

    // axios
    //   .post("http://localhost:3001/users", { user }, { withCredentials: true })
    //   .then((response) => {
    //     if (response.data.status === "created") {
    //       this.props.handleLogin(response.data);
    //       this.redirect();
    //     } else {
    //       this.setState({
    //         errors: response.data.errors,
    //       });
    //     }
    //   })
    //   .catch((error) => console.log("api errors:", error));
  };

  redirect = () => {
    this.props.history.push("/");
  };
  handleErrors = () => {
    return (
      <div>
        <ul>{this.state.errors.map((error) => {
          return <li key={error}>{error}</li>
        })}
        </ul>
      </div>
    )
  }
  render() {
    return (
      <div>
        <div className="loginPageContainer">
          <h3 className="loginHeader">
            Create an account!
          </h3>
          <form onSubmit={this.handleSubmit} className="authPageForm">
            <input
              className="loginUsername"
              placeholder="username"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
              type="text"
            />
            <input
              className="loginPassword"
              placeholder="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
            {this.state.isAlertOn &&
              <Alert variant="danger">
                {this.state.alertMessage}
              </Alert>
            }
            <input
              type="submit"
              value="Sign Up"
              className="loginSubmitButton"
            />
          </form>
        </div>
      </div>
    )
  }
}


{/* <h1>Sign Up</h1>
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
