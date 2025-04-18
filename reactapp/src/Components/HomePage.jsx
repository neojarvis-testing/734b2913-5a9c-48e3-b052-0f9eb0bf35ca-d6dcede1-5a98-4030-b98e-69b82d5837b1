import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import BookRecommenderNavbar from '../BookRecommenderComponents/BookRecommenderNavbar';


const HomePage = () => {
  return (
    <div>
      <BookRecommenderNavbar/>
      <div className="container text-center">
        <div className="position-relative mb-4">
          <img src='./bookfindercoverimage.jpeg' alt="BookFinder" className="img-fluid rounded" />
          <h1 className="position-absolute top-50 start-50 translate-middle text-white">BookFinder</h1>
        </div>
        <p className="lead">An app to discover, explore, and recommend books tailored to your reading preferences.</p>
        <div>
          
        <footer className="bg-dark text-white p-3 mt-4 text-center">
          <p className="font-weight-bold">Contact Us</p>
          <p>Email: <a href="mailto:telos@support.com" className="text-white">telos@support.com</a></p>
          <p>Phone: 007</p>
        </footer>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
