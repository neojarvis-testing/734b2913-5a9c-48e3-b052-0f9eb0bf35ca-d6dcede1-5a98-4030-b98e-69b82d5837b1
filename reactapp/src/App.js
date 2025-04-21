import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ErrorPage from './Components/ErrorPage';
import HomePage from './Components/HomePage';
import Login from './Components/Login';
import Signup from './Components/Signup';
import BookForm from './BookRecommenderComponents/BookForm'; 
import BookReaderViewBook from './BookReaderComponents/BookReaderViewBook';
import ViewBook from './BookRecommenderComponents/ViewBook';
import PrivateRoute from './Components/PrivateRoute';



const App = () => {
  return (
    <Router>
      <div>
        <Routes>
        <Route path ="/readerviewbook" element={<BookReaderViewBook/>}/>
        <Route path ="/" element={<HomePage />} />
        <Route path ="*" element={< ErrorPage/>} />
        <Route path ="/login" element={<Login />} />
        <Route path ="/signup" element={<Signup />} />
        <Route path ="/bookform" element={<PrivateRoute requiredRole="BookRecommender"><BookForm/></PrivateRoute>}/>
        <Route path ="/viewbook" element={<PrivateRoute requiredRole="BookRecommender"><ViewBook/></PrivateRoute>}/>
        <Route path ="/bookform/:id" element={<PrivateRoute requiredRole="BookRecommender"><BookForm mode = 'edit'/></PrivateRoute>} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
