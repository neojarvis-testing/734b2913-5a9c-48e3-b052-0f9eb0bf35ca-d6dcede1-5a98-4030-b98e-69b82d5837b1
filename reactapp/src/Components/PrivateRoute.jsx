import React from 'react';
import {jwtDecode} from 'jwt-decode';
import ErrorPage from './ErrorPage';
const PrivateRoute = ({ children, requiredRole }) => {
  const role = localStorage.getItem('role');
  console.log(role);
  if (!role) {
    return <ErrorPage mode="error" />;
  }

  if (role !== requiredRole) {
    return <ErrorPage mode="accessdenied" />;
  }
  return children;
};

export default PrivateRoute;