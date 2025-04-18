import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../apiConfig';
import BookRecommenderNavbar from './BookRecommenderNavbar.jsx';
import BookRecommenderNavbarFooter from './BookRecommenderNavbarFooter.jsx';

const ViewBooks = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/books`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setBooks(response.data);
      setLoading(false);
    } catch (error) {
      setError("Failed to load books");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/books/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setSuccessMessage("Book successfully deleted");
      fetchBooks();
      setTimeout(() => setSuccessMessage(""), 1000);
    } catch (error) {
      setError("Failed to delete book");
    }
  };

  const handleEditClick = (bookId) => {
    navigate(`/bookform/${bookId}`);
  };

  return (
    <div className="container mt-4">
      <BookRecommenderNavbar />
      <h2 className="text-center mt-4 mb-4">Available Books</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      {successMessage && <p className="text-success">{successMessage}</p>}
      {!loading && !error && books.length === 0 && <p className="no-records">Oops! No records found.</p>}
      <table className="table table-bordered table-striped text-center">
        <thead className="thead-dark">
          <tr>
            <th>Cover Image</th>
            <th>Title</th>
            <th>Author</th>
            <th>Publication Date</th>
            <th>Genre</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.bookId}>
              <td>
                <img src={book.coverImage} alt={book.title} style={{ width: '100px', height: '50px', objectFit: 'cover' }} />
              </td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.publicationDate}</td>
              <td>{book.genre}</td>
              <td>
                <button className="btn btn-primary btn-sm mr-2" onClick={() => handleEditClick(book.bookId)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(book.bookId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <BookRecommenderNavbarFooter />
    </div>
  );
};

export default ViewBooks;
