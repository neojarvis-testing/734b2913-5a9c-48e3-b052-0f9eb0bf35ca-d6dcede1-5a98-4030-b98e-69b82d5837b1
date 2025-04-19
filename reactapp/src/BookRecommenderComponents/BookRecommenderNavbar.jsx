import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './BookRecommenderNavbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const BookRecommenderNavbar = () => {
  const username = localStorage.getItem('username') || 'Guest';
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showBookOptions, setShowBookOptions] = useState(false); // Toggle for Add/View Book
  const navigate = useNavigate();

  const handleAddBook = () => {
    navigate('/bookform');
  };

  const handleViewBook = () => {
    navigate('/viewbook');
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleConfirmLogout = () => {
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
      <nav className="navbar">
        <div className="navbar-brand">BookFinder</div>
        <div className="navbar-links">
          <b><a>{username}{localStorage.getItem("role")==='BookReader'?(<span> ~ Reader</span>):(<span> ~ Recommender</span>)}</a></b>
          <b><Link to="/">Home</Link></b>

          {/* Books Toggle (NO DROPDOWN) */}
          <button onClick={handleToggleBooks} className="btn btn-outline-dark fw-bold">Books</button>

          {localStorage.getItem("token") ? (
            <button onClick={handleLogoutClick} className="btn btn-primary btn-block">Logout</button>
          ) : (
            <button onClick={handleLogin} className="btn btn-primary btn-block">Login</button>
          )}
        </div>
      </nav>

      {/* Directly Showing Add Book & View Book Buttons Below Navbar */}
      {showBookOptions && (
        <div className="text-center mt-3">
          <button className="btn btn-primary mx-2" onClick={handleViewBook}>View Book</button>
          <button className="btn btn-secondary mx-2" onClick={handleAddBook}>Add Book</button>
        </div>
      )}

      {showLogoutModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you sure you want to logout?</p>
            <button onClick={handleConfirmLogout} className="btn btn-danger">Yes, Logout</button>
            <button onClick={() => setShowLogoutModal(false)} className="btn btn-secondary">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookRecommenderNavbar;
