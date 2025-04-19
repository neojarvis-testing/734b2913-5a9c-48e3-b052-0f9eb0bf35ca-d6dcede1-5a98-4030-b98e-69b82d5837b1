import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './BookRecommenderNavbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const BookRecommenderNavbar = () => {
  const username = localStorage.getItem('username') || 'Guest';
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showBookOptions, setShowBookOptions] = useState(false); // Toggle for Add/View Book

  const navigate = useNavigate();

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
    localStorage.clear(); // Clear all localStorage data
    setShowLogoutModal(false);
    navigate('/login');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleToggleBooks = () => {
    setShowBookOptions((prev) => !prev);
  };

  return (
    <div>
      <nav className="navbar glass-navbar">
        <div className="navbar-brand">BookFinder</div>
        <div className="navbar-links">
          <b>
            <p className="username">
              {username}
              {localStorage.getItem("role") === 'BookReader' ? (
                <span> ~ Reader</span>
              ) : (
                <span> ~ Recommender</span>
              )}
            </p>
          </b>
          <b><Link to="/" className="nav-link">Home</Link></b>

          {/* Books Section for Admin */}
          {localStorage.getItem("role") === 'BookRecommender' && (
            <div className="books-section">
              <button onClick={handleToggleBooks} className="books-btn">Books ▼</button>
              {showBookOptions && (
                <div className="book-actions">
                  <button className="view-book-btn" onClick={() => navigate('/viewbook')}>View Books</button>
                  <button className="add-book-btn" onClick={() => navigate('/bookform')}>Add Book</button>
                </div>
              )}
            </div>
          )}

          {/* Logout/Login Button */}
          {localStorage.getItem("token") ? (
            <button onClick={handleLogoutClick} className="btn btn-primary btn-block">Logout</button>
          ) : (
            <button onClick={handleLogin} className="btn btn-primary btn-block">Login</button>
          )}
        </div>
      </nav>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="modal-overlay">
          <div className="glass-modal">
            <p className="modal-text">Are you sure you want to logout?</p>
            <div className="modal-buttons">
              <button onClick={handleConfirmLogout} className="btn btn-danger w-100 mb-2">Yes, Logout</button>
              <button onClick={() => setShowLogoutModal(false)} className="btn btn-secondary w-100">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookRecommenderNavbar;