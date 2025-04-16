import React from 'react'
import './BookReaderNavbar.css'

const BookRecommenderNavbar = () => {
  return (

<nav className="navbar">

    <div className="navbar-brand">BookFinder</div>   

    <div className="navbar-links">
        <p>DemoReader / BookReader</p>
      <a href="#">Home</a>
      <a href="#">Book</a>
      <a href="#">Logout</a>
    </div>
    
    

    </nav>
  );
}

export default BookRecommenderNavbar