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
          <b><p>{username}{localStorage.getItem("role")==='BookReader'?(<span> ~ Reader</span>):(<span> ~ Recommender</span>)}</p></b>
          <b><Link to="/">Home</Link></b>
           {/* {localStorage.getItem("token")!=null?(
             <button onClick={handleLogoutClick} className="btn btn-primary btn-block">Logout</button>
             ):(
               <button onClick={handleLogin} className="btn btn-primary btn-block">Login</button>
               )}
          */}

            <div className="books-section">
                <button onClick={handleToggleBooks} className="books-btn">Books ▼</button>
                {showBookOptions && (
                    <div className="book-actions">
                        <button className="view-book-btn" onClick={() => navigate('/viewbook')}>View Book</button>
                        <button className="add-book-btn" onClick={() => navigate('/bookform')}>Add Book</button>
                    </div>
                )}
            </div>
          {localStorage.getItem("token") ? (
            <button onClick={handleLogoutClick} className="btn btn-primary btn-block">Logout</button>
          ) : (
            <button onClick={handleLogin} className="btn btn-primary btn-block">Login</button>
          )}
        </div>
      </nav>

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
