import React from 'react'

const BookRecommenderNavbar = () => {
  return (

<nav className="navbar">

    <div className="navbar-brand">BookFinder</div>   

    <div className="navbar-links">
      <a href="#">Home</a>
      <a href="#">Book</a>
      <a href="#">Logout</a>
    </div>
    
    <div className="navbar-user">DemoAdmin / BookRecommender</div>

    </nav>
  );
}

export default BookRecommenderNavbar