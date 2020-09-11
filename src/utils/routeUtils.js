import React from 'react';
import { Redirect, Route, withRouter } from 'react-router-dom';



const protectedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    localStorage.getItem("token")
      ? <Component {...props} {...rest} />
      : <Redirect to='/login' />
  )} />
)


const authRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    localStorage.getItem("token")
      ? <Redirect to='/' />
      : <Component {...props} />
  )} />
)

export const ProtectedRoute = withRouter(protectedRoute);
export const AuthRoute = withRouter(authRoute);

