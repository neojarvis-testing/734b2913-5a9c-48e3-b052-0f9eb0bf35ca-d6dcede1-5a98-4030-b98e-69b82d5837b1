import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookRecommenderNavbarFooter from './BookRecommenderNavbarFooter';
import ViewBook from './ViewBook.jsx';

const BookRecommenderNavbar = ({ username, role }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const handleBookHover = () => {
    setShowDropdown(true);
  };

  const handleBookLeave = () => {
    setShowDropdown(false);
  };

  const handleAddBookClick = () => {
    navigate('/bookform'); // Navigates to BookForm component for adding a new book
  };

  const handleViewBookClick = () => {
    navigate('/viewbooks'); // Navigates to ViewBooks component displaying books in a table
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true); // Show logout confirmation modal
  };

  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    navigate('/login'); // Navigates to Login component after logout confirmation
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand">BookFinder</div>
        <div className="navbar-links">
          <a href="/">Home</a>
          <div 
            className="book-dropdown" 
            onMouseEnter={handleBookHover} 
            onMouseLeave={handleBookLeave}
          >
            <a href="#">Book</a>
            {showDropdown && (
              <div className="dropdown-menu">
                <a href="#" onClick={handleAddBookClick}>Add Book</a>
                <a href="#" onClick={handleViewBookClick}>View Book</a>
              </div>
            )}
          </div>
          <a href="#" onClick={handleLogoutClick}>Logout</a>
        </div>
        <div className="navbar-user">
          {username} / {role}
        </div>
      </nav>

      {showLogoutModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you sure you want to logout?</p>
            <button onClick={handleConfirmLogout}>Yes, Logout</button>
            <button onClick={() => setShowLogoutModal(false)}>Cancel</button>
          </div>
        </div>
      )}
      <ViewBook/>
      <BookRecommenderNavbarFooter/>
    </div>
  );
};

export default BookRecommenderNavbar;
