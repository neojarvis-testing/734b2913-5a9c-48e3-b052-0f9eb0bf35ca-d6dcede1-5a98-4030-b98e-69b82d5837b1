
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ErrorPage from './Components/ErrorPage';
import HomePage from './Components/HomePage';
import Login from './Components/Login';
import Signup from './Components/Signup';
import BookForm from './BookRecommenderComponents/BookForm'; // Import BookForm component
import BookRecommenderNavbar from './BookRecommenderComponents/BookRecommenderNavbar';
import ViewBook from './BookRecommenderComponents/ViewBook';

const App = () => {
  return (
    <Router>
      <BookRecommenderNavbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/bookform" element={<BookForm />} />
        <Route path="/bookform/:id" element={<BookForm />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/viewbooks" element={<ViewBook />} />

      </Routes>
    </Router>
  );
};
export default App;
