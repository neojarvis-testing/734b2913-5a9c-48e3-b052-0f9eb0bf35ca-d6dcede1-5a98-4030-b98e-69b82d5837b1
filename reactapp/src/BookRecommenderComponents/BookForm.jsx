import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const BookForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const bookData = location.state || {};

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    publishedDate: ''
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (bookData.title) {
      setFormData(bookData);
    }
  }, [bookData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = {};

    if (!formData.title) validationErrors.title = "Title is required";
    if (!formData.author) validationErrors.author = "Author is required";
    if (!formData.publishedDate) validationErrors.publishedDate = "Published Date is required";

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setShowSuccessModal(true);
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    setShowDeleteModal(false);
    navigate('/viewbooks'); // Redirects to ViewBooks after deletion
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    navigate('/viewbooks'); // Redirects to ViewBooks after successful update
  };

  return (
    <div className="book-form-container">
      <h2>{bookData.title ? "Edit Book" : "Add Book"}</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Title *</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} />
          {errors.title && <span className="error-message">{errors.title}</span>}
        </div>
        <div className="input-group">
          <label>Author *</label>
          <input type="text" name="author" value={formData.author} onChange={handleChange} />
          {errors.author && <span className="error-message">{errors.author}</span>}
        </div>
        <div className="input-group">
          <label>Published Date *</label>
          <input type="date" name="publishedDate" value={formData.publishedDate} onChange={handleChange} />
          {errors.publishedDate && <span className="error-message">{errors.publishedDate}</span>}
        </div>
        <div className="input-group">
          <label>Genre</label>
          <input type="text" name="genre" value={formData.genre} onChange={handleChange} />
        </div>
        <button type="submit">{bookData.title ? "Update Book" : "Add Book"}</button>
        {bookData.title && <button type="button" onClick={handleDeleteClick}>Delete</button>}
      </form>

      {showSuccessModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Book updated successfully!</p>
            <button onClick={handleModalClose}>Close</button>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Are you sure you want to delete this book?</p>
            <button onClick={handleConfirmDelete}>Yes</button>
            <button onClick={() => setShowDeleteModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookForm;
