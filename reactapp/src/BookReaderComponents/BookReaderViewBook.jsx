import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import baseUrl from '../apiConfig';
import BookRecommenderNavbar from './BookReaderNavbar';


export const BookReaderViewBook = () => {

    const [books, setBook] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const fetchBooks=()=>{
        axios.get(`${baseUrl}/books`).then((response)=>{setBook(response.data);})
        .catch(()=>{
            setErrorMessage("Failed");
        })
    }

    useEffect(() => {
        fetchBooks();
    },[]);


  return (
    <div className="container">
        <h1 className="book">Available List</h1>
        {successMessage && <p className = "success">{successMessage}</p>}
        {errorMessage && <p className="danger">{errorMessage}</p>}
        {books.length === 0 ? (<p className="nocourse">No course available</p>
        ) : ( 

        <ul>
            <table>
                <thead>
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
            {books.map(book => (
                <tr key = {book.BookId || book.Title}>
                    
                    <td><img src={book.coverImage} alt={book.Title} style={{ width: '50px', height: 'auto' }} /></td>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.genre}</td>
                    <td>{book.publishedDate}</td>
                </tr>
            ))}
            </tbody>
            </table>
        </ul>
        )}
    </div>
  );
  
};

export default BookReaderViewBook;
