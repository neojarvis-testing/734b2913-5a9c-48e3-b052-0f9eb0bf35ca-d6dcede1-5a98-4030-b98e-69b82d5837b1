import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import API_BASE_URL from '../apiConfig';
import { useNavigate } from 'react-router-dom';
import BookReaderNavbar from '../BookReaderComponents/BookReaderNavbar';

const BookReaderViewBook = () => {
    const [Books, setBooks] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${API_BASE_URL}/books`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setBooks(response.data);
            } catch (err) {
                console.error('Error fetching Books:', err);
                if (err.response && err.response.status === 401) {
                    setError('Unauthorized access. Please log in again.');
                    localStorage.removeItem('token');
                    navigate('/');
                } else {
                    setError('Failed to fetch Books. Please try again later.');
                }
            } finally {
                setLoading(false);
            }
        };
        fetchBooks();
    }, [navigate]);


    return (
        <div className="page-container">
            <nav><BookReaderNavbar /></nav><br/>
            <div className="books-section">
                <div className="book-list-container">
                    <h2 className="book-list-title">Available Books</h2>

                    {error && <p className="error-text">{error}</p>}

                    {loading && (
                        <div className="text-center">
                            <div className="spinner-border text-primary mb-2" role="status" aria-hidden="true"></div>
                            <div className="mt-2">Loading...</div>
                        </div>
                    )}

                    <div className="table-responsive table-wrapper">
                        <table className="book-table">
                            <thead>
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
                                        <td colSpan="5" className="text-center text-muted">
                                            <i>Oops! No Books found.</i>
                                            <img src='./no_records_found.png' alt="Error Icon" className="eicon" /> 
                                        </td>
                                    </tr>
                                )}
                                {Books.map((book) => (
                                    <tr key={book.bookId}>
                                        <td>
                                            <img
                                                src={book.coverImage}
                                                alt={book.name || 'book Image'}
                                                className="book-cover"
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
            </div>
        </div>
    );
};

export default BookReaderViewBook;
