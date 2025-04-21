import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ViewBook.css";
import API_BASE_URL from "../apiConfig";
import BookRecommenderNavbar from "./BookRecommenderNavbar";
import BookRecommenderNavbarFooter from "./BookRecommenderNavbarFooter";

import { useNavigate } from "react-router-dom";

const ViewBook = () => {
  const [Books, setBooks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_BASE_URL}/books`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBooks(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        console.error("Error fetching books:", err);
        if (err.response?.status === 401) {
          setError("Unauthorized access. Please log in again.");
          localStorage.removeItem("token");
          navigate("/");
        } else {
          setError("Failed to fetch books. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [navigate]);


  const handleEdit = (book) => {
    if (!book.bookId) {
      alert("Invalid book selected for editing.");
      return;
    }
    navigate(`/bookform/${book.bookId}`);
  };


  const openDeleteModal = (bookId) => {
    setSelectedBookId(bookId);
    setShowDeleteModal(true);
  };


  const closeDeleteModal = () => {
    setSelectedBookId(null);
    setShowDeleteModal(false);
  };


  const confirmDelete = async () => {
    if (!selectedBookId) {
      alert("Invalid book selected for deletion.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_BASE_URL}/books/${selectedBookId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBooks((prevBooks) =>
        prevBooks.filter((book) => book.bookId !== selectedBookId)
      );
    } catch (err) {
      console.error("Error deleting book:", err);
      if (err.response && err.response.status === 401) {
        alert("Unauthorized access. Please log in again.");
        localStorage.removeItem("token");
        navigate("/");
      } else {
        alert("Failed to delete the book. Please try again later.");
      }
    } finally {
      closeDeleteModal();
    }
  };


  const filteredBooks = Books.filter((book) => {
    return (
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="page-container">
      <BookRecommenderNavbar />

      <div className="book-list-container container mt-4">
      <div class="background-text">{loading && (<pre>Book Finder</pre>)}</div>

        <h2 className="book-list-title text-center">{localStorage.getItem('role')==='BookReader'? 'Available Books':'Books'}</h2>


        <div className="glass-search-bar mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Title or Author"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {error && <p className="error-text text-danger">{error}</p>}




        <div className="glass-table">
          <div className="table-container">
            
            <table className="table">
              <thead>
                <tr>
                  <th>Cover Image</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Publication Date</th>
                  <th>Genre</th>
                  {localStorage.getItem('role') === 'BookRecommender' && (
                    <th>Action</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan="6" className="text-center">
                      <div className="loading-container">
                        <div className="loader"></div>
                        <div>Loading...</div>
                      </div>
                    </td>
                  </tr>
                )}
                {filteredBooks.length === 0 && !loading && !error && (
                  <tr>
                    <td colSpan="6" className="text-center text-muted">
                      <i>Oops! No Books found.</i>
                    </td>
                  </tr>
                )}
                {filteredBooks.map((book) => (
                  <tr key={book.bookId}>
                    <td className="centre-text">
                      <img
                        src={book.coverImage}
                        alt={book.name || "Book Image"}
                        style={{ height: "150px", objectFit: "cover" }}
                      />
                    </td>
                    <td className="centre-text">{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.publishedDate}</td>
                    <td>{book.genre}</td>
                    {localStorage.getItem('role') === 'BookRecommender' && (<td>
                      <button
                        className="btn btn-primary btn-sm me-2"
                        onClick={() => handleEdit(book)}
                        aria-label={`Edit ${book.name}`}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => openDeleteModal(book.bookId)}
                        aria-label={`Delete ${book.name}`}
                      >
                        Delete
                      </button>
                    </td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>


        {showDeleteModal && (
          <div className="modal-overlay">
            <div className="glass-modal">
              <p className="modal-text">Are you sure you want to delete this book?</p>
              <div className="modal-buttons">
                <button
                  type="button"
                  className="btn btn-danger w-100 mb-2"
                  onClick={confirmDelete}
                >
                  Yes, Delete
                </button>
                <button
                  type="button"
                  className="btn btn-secondary w-100"
                  onClick={closeDeleteModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <BookRecommenderNavbarFooter />
    </div>
  );
};

export default ViewBook;