import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ViewBooks = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchedBooks = [
      { id: 1, title: "Book Title 1", author: "Author 1", genre: "Fiction" },
      { id: 2, title: "Book Title 2", author: "Author 2", genre: "Non-Fiction" }
    ];
    setBooks(fetchedBooks);
  }, []);

  const handleEditClick = (book) => {
    navigate(`/bookform/${book.id}`, { state: book }); // Passes book details to BookForm
  };

  return (
    <div className="view-books-container">
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
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>
                  <button onClick={() => handleEditClick(book)}>Edit</button>
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
