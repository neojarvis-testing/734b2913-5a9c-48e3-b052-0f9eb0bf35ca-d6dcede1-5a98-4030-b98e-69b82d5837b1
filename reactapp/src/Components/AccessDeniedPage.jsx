import React from 'react';
import { Link } from 'react-router-dom';
import './AccessDeniedPage.css';

const AccessDeniedPage = () => {
  return (
    <div className="access-denied-container">
      <img src="./alert.png" alt="Access Denied Icon" className="access-denied-icon" />
      <h1 className="access-denied-heading">Access Denied</h1>
      <p className="access-denied-subtext">You do not have permission to view this page.</p>
      <Link to="/" className="access-denied-home-btn">
        Return to HomePage
      </Link>
    </div>
  );
};

export default AccessDeniedPage;