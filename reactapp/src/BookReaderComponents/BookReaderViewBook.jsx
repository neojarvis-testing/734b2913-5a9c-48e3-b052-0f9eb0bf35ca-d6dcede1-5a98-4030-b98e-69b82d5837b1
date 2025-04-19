import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import API_BASE_URL from '../apiConfig';
import { useNavigate } from 'react-router-dom';
import BookReaderNavbar from '../BookReaderComponents/BookReaderNavbar';
 
const BookReaderViewBook = () => {
    const [Books, setBooks] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true); // For spinner
    const navigate = useNavigate();

 
    // Fetch books from API
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const token = localStorage.getItem('token');
                // Retrieve token from localStorage
                const response = await axios.get(`${API_BASE_URL}/books`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Add Authorization header
                    },
                });
                setBooks(response.data);
            } catch (err) {
                console.error('Error fetching Books:', err);
                if (err.response && err.response.status === 401) {
                    setError('Unauthorized access. Please log in again.');
                    localStorage.removeItem('token');
                    navigate('/'); // Redirect to login page
                } else {
                    setError('Failed to fetch Books. Please try again later.');
                }
            } finally {
                setLoading(false); // Stop loading spinner
            }
        };
        fetchBooks();
    }, [navigate]);
    return (
      <div>
        <nav><BookReaderNavbar /></nav>
        <div className="container1">
            
            <div className="d-flex justify-content-center align-items-center mb-4">
                <h2 className="text-center">Available Books</h2>
            </div>
 
            {/* Display Error */}
            {error && <p className="text-danger text-center">{error}</p>}
 
            {/* Display Spinner */}
            {loading && (
                <div className="text-center">
                    <div className="spinner-border text-primary mb-2" role="status" aria-hidden="true"></div>
                    <div className="mt-2">Loading...</div>
                </div>
            )}
            <table className="table table-bordered table-striped text-center">
                <thead className="thead-dark">
                    <tr>
                        <th>Cover Image</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Publication Date</th>
                        <th>Genre</th>
                    </tr>
                </thead>
                <tbody>
                    {Books.length === 0 && !loading && !error && (
                        <tr>
                            <td colSpan="6" className="text-center text-muted">
                                <i>Oops! No Books found.</i>
                            </td>
                        </tr>
                    )}
                    {Books.map((book) => (
                        <tr key={book.bookId}>
                            <td>
                                <img
                                    src={book.coverImage}
                                    alt={book.name || 'book Image'}
                                    style={{ height: '100px', objectFit: 'cover' }}
                                />
                            </td>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.publishedDate}</td>
                            <td>{book.genre}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        
        </div>
    );
};
 
export default BookReaderViewBook;