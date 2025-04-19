import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './BookRecommenderNavbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const BookRecommenderNavbar = () => {
  const username = localStorage.getItem('username') || 'Guest';
  const [showLogoutModal, setShowLogoutModal] = useState(false);
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

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand">BookFinder</div>
        <div className="navbar-links">
          <b><a>{username}~Recommender</a></b>
          <b><Link to="/">Home</Link></b>
          
          <div>
            <select onChange={(e) => {
              if (e.target.value === 'add') handleAddBook();
              if (e.target.value === 'view') handleViewBook();
            }}>
              <option value="">Books</option>
              <option value="add">Add Book</option>
              <option value="view">View Book</option>
            </select>
          </div>
          {localStorage.getItem("token")!=null?(
             <button onClick={handleLogoutClick} className="btn btn-primary btn-block">Logout</button>
             ):(
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
