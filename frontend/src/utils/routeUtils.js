import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export const ProtectedRoute = props => {
  const { isLoggedIn } = props;
  if (!isLoggedIn) {
    return <Redirect to="/login" />
  }
  return <Route {...props} />
};
