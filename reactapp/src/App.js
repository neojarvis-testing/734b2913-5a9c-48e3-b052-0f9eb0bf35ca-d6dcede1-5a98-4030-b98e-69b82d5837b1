
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ErrorPage from './Components/ErrorPage';
import HomePage from './Components/HomePage';
import Login from './Components/Login';
import Signup from './Components/Signup';
import BookForm from './BookRecommenderComponents/BookForm'; 
import BookRecommenderNavbar from './BookRecommenderComponents/BookRecommenderNavbar';
import ViewBook from './BookRecommenderComponents/ViewBook';
import BookReaderViewBook from './BookReaderComponents/BookReaderViewBook';


const App = () => {
  return (
    <Router>
      <div>
        <Routes>
        <Route path ="/" element={<BookReaderViewBook />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App