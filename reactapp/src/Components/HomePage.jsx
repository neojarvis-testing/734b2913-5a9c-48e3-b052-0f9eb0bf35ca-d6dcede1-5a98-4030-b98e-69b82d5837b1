import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import BookRecommenderNavbar from '../BookRecommenderComponents/BookRecommenderNavbar';
import './HomePage.css';

const HomePage = () => {
  return (
    <div>
      <BookRecommenderNavbar/><br/>
      <div className="container text-center">
        <div className="position-relative mb-4" style={{ 
          backgroundImage: "url('/bookbgimage.jpg')", 
          backgroundSize: 'cover', 
          backgroundPosition: 'center', 
          minHeight: '50vh' 
        }}>
          <div>
            <img src='./bookimage.jpg' alt="BookFinder" width="500" height="700" className="img-fluid rounded" />
            <h1 className="blur-background ">BookFinder</h1>
          </div><br/>
          <div className='w-60 bg-white text-dark'>
            <span className="w-50 lead">An app to discover, explore, and recommend books tailored to your reading preferences.</span>
          </div>
          <div className='w-100 text-center'>
            <footer className="bg-dark text-white p-3 mt-4 text-center d-flex flex-column">
              <span className="font-weight-bold">Contact Us</span>
              <span>Email: <a href="mailto:telos@support.com" className="text-white">telos@support.com</a></span>
              <span>Phone: 007</span>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
