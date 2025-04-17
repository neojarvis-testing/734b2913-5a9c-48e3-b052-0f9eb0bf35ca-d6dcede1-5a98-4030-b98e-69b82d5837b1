import React, { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../apiConfig';
import BookRecommenderNavbar from './BookRecommenderNavbar.jsx';

const ViewBooks = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [successMessage, setSuccessMessage] = useState(""); 
  const fetchBooks = () => {
    setLoading(true);
    axios
      .get(`${API_BASE_URL}/books`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },})
      .then((response) => {
        setBooks(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load books");
        setLoading(false);
      });
  };

  useEffect(()=>{
    fetchBooks();

  }, []);


  const handleDelete = (id) => {
    axios
      .delete(`${API_BASE_URL}/${id}`) 
      .then(() => {
        setSuccessMessage("Book successfully deleted");
        setBooks((prevBooks) => prevBooks.filter((book) => book.BookId !== id));
        setTimeout(() => setSuccessMessage(""), 1000);
      })
      .catch(() => {
        setError("Failed to delete book");
        setTimeout(() => setError(""), 1000);
      });
  };

  const handleEditClick = (book) => {
    navigate(`/bookform/${book.BookId}`, { state: book }); // Passes book details to BookForm
  };

  return (
    <div className="view-books-container">
      {loading && <p>Loading...</p>}
      {!loading && !error && <p>{error}</p>}
      {successMessage && <p className="text-success">{successMessage}</p>}
      {error && <p className="text-danger">{error}</p>}
      <h2>View Books</h2>
      {books.length === 0 ? (
        <p className="no-records">Oops! No records found.</p>
      ) : (
        <table className="book-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Action</th>
              <th>PublishedDate</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.BookId}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>{book.publishedDate}</td>
                <td>
                  <button onClick={() => handleEditClick(book.bookId)}>Edit</button>
                  <button onClick={()=>handleDelete(book.bookId)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewBooks;


              
