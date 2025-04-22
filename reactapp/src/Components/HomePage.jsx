import React, { useState, useEffect, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import BookRecommenderNavbarFooter from '../BookRecommenderComponents/BookRecommenderNavbarFooter';
import BookRecommenderNavbar from '../BookRecommenderComponents/BookRecommenderNavbar';
import BookReaderNavbar from '../BookReaderComponents/BookReaderNavbar';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  
  const quotes = [
    {
      line: "A room without books is like a body without a soul.",
      author: "Marcus Tullius Cicero",
    },
    {
      line: "So many books, so little time.",
      author: "Frank Zappa",
    },
    {
      line: "The only thing that you absolutely have to know, is the location of the library.",
      author: "Albert Einstein",
    },
    {
      line: "If you only read the books that everyone else is reading, you can only think what everyone else is thinking.",
      author: "Haruki Murakami",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  
  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % quotes.length);
  }, [quotes.length]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext(); 
    }, 5000); 
    return () => clearInterval(interval); 
  }, [currentIndex, handleNext]);


 
  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? quotes.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="homepage-container">
      
      {role !== "BookReader" ? (
        <BookRecommenderNavbar />
      ) : (
        <BookReaderNavbar />
      )}

      
      <div className="slider-section">
        <div className="quote-slide">
          <p className="quote-line">"{quotes[currentIndex].line}"</p>
          <p className="quote-author">- {quotes[currentIndex].author}</p>
        </div>
        
        <div className="slider-controls">
          <button className="slider-btn prev-btn" onClick={handlePrev}>
            &#8592;
          </button>
          <button className="slider-btn next-btn" onClick={handleNext}>
            &#8594;
          </button>
        </div>
      </div>
      <div className="button-section mt-4">
      {(role===null || token==null)&&(<button
          className="btn btn-primary"
          onClick={() => navigate('/login')}
        >
          Try Logging in
        </button>)}
       
        {(role ==="BookRecommender" || role==="BookReader") && token && (
        <button
          className="btn btn-primary me-3"
          onClick={() => navigate(role === "BookReader" ? "/readerviewbook" : "/viewbook")}
        >
          View Books
        </button>
        )}
        
        {role === "BookRecommender"&& token && (
          <button
            className="btn btn-secondary"
            onClick={() => navigate('/bookform')}
          >
            Add Book
          </button>
        )}
      </div>

      
      <BookRecommenderNavbarFooter/>
    </div>
  );
};

export default HomePage;