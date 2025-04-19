import React from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const getUserRole = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.role; // Assuming the role is stored in the 'role' field
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
};

const PrivateRoute = ({ children, requiredRole }) => {
  const role = getUserRole();

  if (!role) {
    return <Navigate to="/login" />;
  }

  if (role !== requiredRole) {
    return <Navigate to="/*" />;
  }

  return children;
};

export default PrivateRoute;
