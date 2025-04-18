import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../apiConfig';
import BookReaderNavbar from './BookReaderNavbar'
import BookRecommenderNavbar from '../BookRecommenderComponents/BookRecommenderNavbar';


export const BookReaderViewBook = () => {

    const [books, setBook] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const fetchBooks= async ()=>{
        console.log(localStorage.getItem("token"))
        try{
        await axios.get(`${API_BASE_URL}/books`,{
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },}
            ).then((response)=>{setBook(response.data);})
        }catch(error){
            setErrorMessage("Failed");
        }
        
    }

    useEffect(() => {
        fetchBooks();
    },[]);
  return (
    <div className="container">
        <BookReaderNavbar/>
        <h1 className="book">Available Books</h1>
        {successMessage && <p className = "success">{successMessage}</p>}
        {errorMessage && <p className="danger">{errorMessage}</p>}

        <ul>
            <table>
                <thead>
                    <tr>
                        <th>Cover Image</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Publication Date</th>
                        <th>Genre</th>
                    </tr>
                </thead>
            
        {books.length === 0 ? (<p className="nocourse">No course available</p>
        ) : ( 
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
            )}
            </table>
        </ul>
        <BookRecommenderNavbar/>
    </div>
  );
  
};

export default BookReaderViewBook;
