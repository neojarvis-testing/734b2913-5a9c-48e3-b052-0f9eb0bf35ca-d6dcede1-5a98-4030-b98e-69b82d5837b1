import React from 'react';
import { Link } from 'react-router-dom';
import './ErrorPage.css';

const ErrorPage = () => {
    return (
        <div className="error-container">
            <img src="./alert.png" alt="Error Icon" className="error-icon" />
            <h1 className="error-heading">Oops! Something Went Wrong</h1>
            <p className="error-subtext">We couldn't find the page you're looking for.</p>
            <Link to="/" className="error-home-btn">
                Return to HomePage
            </Link>
        </div>
    );
};

export default ErrorPage;