import React from 'react';
import './ErrorPage.css';

const ErrorPage = () => {
    return (
        <div className="container">
            <h1 className="heading">Oops! Something Went Wrong</h1>
            <p className="sub">Please try again later.</p>
            <img src='./alert.png' alt="Error Icon" className="eicon" /> 
            <Link to="/home">Return to HomePage</Link>
        </div>
    );
};

export default ErrorPage;
