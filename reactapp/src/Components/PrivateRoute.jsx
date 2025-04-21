import React from 'react';
import {jwtDecode} from 'jwt-decode';
import AccessDeniedPage from './AccessDeniedPage'; 
import ErrorPage from './ErrorPage';
const PrivateRoute = ({ children, requiredRole }) => {
  const role = localStorage.getItem('role');
  const isTokenExpired = () => {
    const token = localStorage.getItem('token');
    if (!token) return true; 
  
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      if(decodedToken.exp < currentTime || true)
      return <ErrorPage mode='expiry'/>;
    } catch (error) {
      console.error('Error decoding token:', error);
      return true;
    }
  };
  if (!role) {
    return <ErrorPage mode="expiry" />;
  }

  if (role !== requiredRole) {
    return <AccessDeniedPage />;
  }
  if (isTokenExpired()) {
    return <ErrorPage mode='accessdenied'/>;
  }

  return children;
};

export default PrivateRoute;