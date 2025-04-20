import React, { useState } from 'react';
import './BookReaderNavbar.css';
import BookRecommenderNavbar from '../BookRecommenderComponents/BookRecommenderNavbar';
import { Link, useNavigate } from 'react-router-dom';
const BookReaderNavbar = () => {
//   const username = localStorage.getItem('username') || 'Guest';
//   const [showLogoutModal, setShowLogoutModal] = useState(false);
//   const navigate = useNavigate();

//   const handleLogoutClick = () => {
//     setShowLogoutModal(true);
//   };

//   const handleConfirmLogout = () => {
//     setShowLogoutModal(false);
//     navigate('/login');
//   };
  return (
    <div>
      <BookRecommenderNavbar/>
      {/* <nav className="navbar">
        <div className="navbar-brand">BookFinder</div>   
        <div className="navbar-links">
        <b><p>{username}~Reader</p></b>
          <Link to="/">Home</Link>
          <button onClick={handleLogoutClick} className="btn btn-primary btn-block">Logout</button>
          {/* {localStorage.getItem("token")!=null?(
             <button onClick={handleLogoutClick} className="btn btn-primary btn-block">Logout</button>
             ):(
               <button onClick={handleLogin} className="btn btn-primary btn-block">Login</button>
               )} *//*}
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
)} */}
    </div>
  );
}

export default BookReaderNavbar