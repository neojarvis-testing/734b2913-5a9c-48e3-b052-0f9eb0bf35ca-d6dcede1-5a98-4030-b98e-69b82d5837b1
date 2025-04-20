import React from 'react';
import { Navigate } from 'react-router-dom';

import AccessDeniedPage from './AccessDeniedPage'; // Import the Access Denied page

const PrivateRoute = ({ children, requiredRole }) => {
  const role = localStorage.getItem('role');

  if (!role) {
    return <Navigate to="/login" />;
  }

  if (role !== requiredRole) {
    return <AccessDeniedPage />;
  }

  return children;
};

export default PrivateRoute;