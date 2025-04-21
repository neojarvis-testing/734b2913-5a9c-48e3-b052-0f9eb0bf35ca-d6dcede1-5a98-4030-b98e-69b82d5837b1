import React from 'react';
import { Link } from 'react-router-dom';
import './ErrorPage.css';

const ErrorPage = () => {
    // Generate 50 stars with random position, animation delay, and duration
    const stars = Array.from({ length: 50 }, (_, index) => (
        <div
            key={index}
            className="star"
            style={{
                top: `${Math.random() * 100}vh`,
                left: `${Math.random() * 100}vw`,
                animationDuration: `${Math.random() * 3 + 2}s`,
                animationDelay: `${Math.random() * 2}s`,
            }}
        ></div>
    ));

    return (
        <div className='errorpage'>
            <div className="error-page-container">
                {stars}

                <div className="text">
                    <div>Oops! Something went wrong.</div>
                    <h1>404</h1>
                    <div>Please try again later.</div>
                    <Link to="/" className="home-link">Go to Homepage</Link>
                </div>

                <div className="astronaut">
                    <img
                        src="https://images.vexels.com/media/users/3/152639/isolated/preview/506b575739e90613428cdb399175e2c8-space-astronaut-cartoon-by-vexels.png"
                        alt="Astronaut"
                    />
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;