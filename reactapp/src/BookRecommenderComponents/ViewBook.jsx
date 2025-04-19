import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import API_BASE_URL from '../apiConfig';
import BookRecommenderNavbar from './BookRecommenderNavbar';
import BookRecommenderNavbarFooter from './BookRecommenderNavbarFooter';
import { useNavigate } from 'react-router-dom';
 
const ViewBook = () => {
    const [Books, setBooks] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true); // For spinner
    const [showDeleteModal, setShowDeleteModal] = useState(false); // For delete confirmation modal
    const [selectedbookId, setSelectedbookId] = useState(null); // Store the book ID to delete
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
 
    // Handle Add book Button
    const handleAddbook = () => {
        navigate('/bookform'); // Navigate to bookForm in "add" mode
    };
 
    // Handle Edit Button
    const handleEdit = (book) => {
        if (!book.bookId) {
            alert('Invalid book selected for editing.');
            return;
        }
        navigate(`/bookform/${book.bookId}`); // Navigate to bookForm in "edit" mode with book ID
    };
 
    // Open Delete Confirmation Modal
    const openDeleteModal = (bookId) => {
        setSelectedbookId(bookId); // Set the selected book ID
        setShowDeleteModal(true); // Show the delete confirmation modal
    };
 
    // Close Delete Confirmation Modal
    const closeDeleteModal = () => {
        setSelectedbookId(null); // Clear the selected book ID
        setShowDeleteModal(false); // Hide the delete confirmation modal
    };
 
    // Handle Delete Confirmation
    const confirmDelete = async () => {
        if (!selectedbookId) {
            alert('Invalid book selected for deletion.');
            return;
        }
 
        try {
            const token = localStorage.getItem('token'); // Retrieve token from localStorage
            await axios.delete(`${API_BASE_URL}/books/${selectedbookId}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Add Authorization header
                },
            });
            setBooks(Books.filter((book) => book.bookId !== selectedbookId)); // Remove deleted book from state
           
        } catch (err) {
            console.error('Error deleting book:', err);
            if (err.response && err.response.status === 401) {
                alert('Unauthorized access. Please log in again.');
                localStorage.removeItem('token');
                navigate('/'); // Redirect to login page
            } else {
                alert('Failed to delete the book. Please try again later.');
            }
        } finally {
            closeDeleteModal(); // Close the delete confirmation modal
        }
    };
 
    return (
      <div>
        <div className="container1">
            <BookRecommenderNavbar/>
            <div className="d-flex justify-content-center align-items-center mb-4">
                <h2 className="text-center">Books</h2>
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
                        <th>Action</th>
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
                                    style={{ height: '50px', objectFit: 'cover' }}
                                />
                            </td>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.publishedDate}</td>
                            <td>{book.genre}</td>
                            <td>
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
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
 
            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content shadow-sm border-0">
                            <div className="modal-header bg-danger text-white">
                                <h5 className="modal-title mx-auto">Are you sure you want to delete this book?</h5>
                            </div>
                            <div className="modal-footer justify-content-center">
                                <button
                                    type="button"
                                    className="btn btn-danger px-4"
                                    onClick={confirmDelete}
                                >
                                    Yes, Delete
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-secondary px-4"
                                    onClick={closeDeleteModal}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
        <BookRecommenderNavbarFooter/>
        </div>
    );
};
 
export default ViewBook;