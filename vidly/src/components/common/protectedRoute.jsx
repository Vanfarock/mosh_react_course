import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from '../../services/authService';

const ProtectedRoute = ({ path, component: Component, render, ...other }) => {
  return (
    <Route
      {...other}
      render={(props) => {
        if (auth.getCurrentUser()) {
          return Component ? <Component {...props} /> : render(props);
        }
        return <Redirect to={{
          pathname: '/login',
          state: { from: props.location }
        }} />;
      }}
    />
  );
}
 
export default ProtectedRoute;