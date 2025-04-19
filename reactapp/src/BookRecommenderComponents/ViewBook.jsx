import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ViewBook.css"; // Ensure correct import
import API_BASE_URL from "../apiConfig";
import BookRecommenderNavbar from "./BookRecommenderNavbar";
import BookRecommenderNavbarFooter from "./BookRecommenderNavbarFooter";
import { useNavigate } from "react-router-dom";

const ViewBook = () => {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showBookOptions, setShowBookOptions] = useState(false); // ✅ Toggle buttons for View/Add Book
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
    }, []);

    const handleToggleBooks = () => {
        setShowBookOptions((prev) => !prev); // ✅ Toggle View/Add Book buttons visibility
    };

    return (
        <div className="page-container">
            <BookRecommenderNavbar />

            <div className="books-section">
                <button onClick={handleToggleBooks} className="books-btn">Books ▼</button>
                {showBookOptions && (
                    <div className="book-actions">
                        <button className="view-book-btn" onClick={() => navigate('/viewbook')}>View Book</button>
                        <button className="add-book-btn" onClick={() => navigate('/bookform')}>Add Book</button>
                    </div>
                )}
            </div>

            <div className="book-list-container">
                <h2 className="book-list-title">📚 Book List</h2>

                {error && <p className="error-text">{error}</p>}

                {loading ? (
                    <div className="loading-container">
                        <div className="spinner-border text-primary" role="status"></div>
                        <p>Loading...</p>
                    </div>
                ) : (
                    <div className="table-responsive">
                        <table className="book-table">
                            <thead>
                                <tr>
                                    <th className="blue-highlight">Cover</th>
                                    <th className="blue-highlight">Title</th>
                                    <th className="blue-highlight">Author</th>
                                    <th className="blue-highlight">Publication Date</th>
                                    <th className="blue-highlight">Genre</th>
                                    <th className="blue-highlight">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {books.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="empty-message">
                                            <i>Oops! No Books Found.</i>
                                        </td>
                                    </tr>
                                ) : (
                                    books.map((book) => (
                                        <tr key={book.bookId}>
                                            <td>
                                                <img src={book.coverImage} alt={book.title} className="book-cover" />
                                            </td>
                                            <td>{book.title}</td>
                                            <td>{book.author}</td>
                                            <td>{book.publishedDate}</td>
                                            <td>{book.genre}</td>
                                            <td>
                                                <button className="edit-btn" onClick={() => navigate(`/bookform/${book.bookId}`)}>✏ Edit</button>
                                                <button className="delete-btn" onClick={() => navigate(`/deletebook/${book.bookId}`)}>🗑 Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <BookRecommenderNavbarFooter />
        </div>
    );
};

export default ViewBook;
