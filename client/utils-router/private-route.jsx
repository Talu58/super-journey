import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({component, isAuth, ...rest}) => (
    <Route {...rest} render={props => (
      isAuth ? (
        React.createElement(component, props)
      ) : (
      <Redirect to="/signup"/>
      )
    )} 
    />
);

export default PrivateRoute;