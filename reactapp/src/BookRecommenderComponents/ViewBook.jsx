import React, { useState, useEffect } from 'react';
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
    setLoading(true);
    axios
      .get(`API_BASE_URL/books`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load books");
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`${API_BASE_URL}/books/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        setSuccessMessage("Book successfully deleted");
        fetchBooks();
        setTimeout(() => setSuccessMessage(""), 1000);
      })
      .catch(() => {
        setError("Failed to delete book");
        setTimeout(() => setError(""), 1000);
      });
  };

  const handleEditClick = (bookId) => {
    navigate(`/bookform/${bookId}`);
  };

  return (
    <div className="view-books-container">
      <BookRecommenderNavbar />
      <h2>Books</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      {successMessage && <p className="text-success">{successMessage}</p>}
      {!loading && !error && books.length === 0 && <p className="no-records">Oops! No records found.</p>}
      {!loading && !error && books.length > 0 && (
        <table className="book-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>PublishedDate</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.bookId}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>{book.publishedDate}</td>
                <td>
                  <button onClick={() => handleEditClick(book.bookId)}>Edit</button>
                  <button onClick={() => handleDelete(book.bookId)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <BookRecommenderNavbarFooter/>
    </div>
  );
};

export default ViewBooks;