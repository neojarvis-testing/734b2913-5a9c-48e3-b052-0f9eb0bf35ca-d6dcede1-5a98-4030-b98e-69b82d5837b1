import React from 'react'
import './BookReaderNavbar.css'
import BookReaderViewBook from './BookReaderViewBook';

const BookRecommenderNavbar = () => {
  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand">BookFinder</div>   
        <div className="navbar-links">
          <p>DemoReader / BookReader</p>
          <a href="/home">Home</a>
          <a href="/">Book</a>
          <a href="/login">Logout</a>
          </div>
      </nav>
      <BookReaderViewBook />
    </div>
    
  );
}

export default BookRecommenderNavbar