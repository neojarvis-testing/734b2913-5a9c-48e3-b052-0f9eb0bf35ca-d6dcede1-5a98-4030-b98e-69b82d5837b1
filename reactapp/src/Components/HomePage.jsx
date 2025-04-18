import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import BookRecommenderNavbar from '../BookRecommenderComponents/BookRecommenderNavbar';


const HomePage = () => {
  return (
    <div>
      <BookRecommenderNavbar/>
      <div className="container text-center">
        <div className="position-relative mb-4">
        <img src='./bookfindercoverimage.jpeg' alt="BookFinder" width="500" height="600" className="img-fluid rounded" />
          <h1 className="position-absolute top-50 start-50 translate-middle w-100 bg-white text-dark">BookFinder</h1>
        </div>
        <div className='w-60 bg-white text-dark'>
        <span className="lead ">An app to discover, explore, and recommend books tailored to your reading preferences.</span>
        </div>
        <div className='w-100 text-center'>
          
        <footer className="bg-dark text-white p-3 mt-4 text-center d-flex flex-column">
          <span className="font-weight-bold ">Contact Us</span>
          <span>Email: <a href="mailto:telos@support.com" className="text-white">telos@support.com</a></span>
          <span>Phone: 007</span>
        </footer>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
