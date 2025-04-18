import React from 'react'
import './BookReaderNavbar.css'
import { Link } from 'react-router-dom';
import BookReaderViewBook from './BookReaderViewBook';
const BookRecommenderNavbar = () => {
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand">BookFinder</div>   
        <div className="navbar-links">
          <p>DemoReader / BookReader</p>
          <Link to="/home">Home</Link>
          <Link to="/">Book</Link> 
          <Link to="/login">Logout</Link> 
          </div>
      </nav>
      <BookReaderViewBook />
    </div>
    
  );
}

export default BookRecommenderNavbar