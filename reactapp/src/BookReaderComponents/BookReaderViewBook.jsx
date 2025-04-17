import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import baseUrl from '../apiConfig';


export const BookReaderViewBook = () => {
    const [books, setBook] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const fetchCourses=()=>{
        axios.get(`${baseUrl}/books`).then((response)=>{setBook(response.data);})
        .catch(()=>{
            setErrorMessage("Failed");
        })
    }

    useEffect(() => {
        fetchCourses();
    },[]);


    const handleDelete = (id) =>{
        console.log('delete book with ID:',id);
        axios.delete(`${baseUrl}/books/${id}`)
        .then(()=>{console.log('deleted');
        setBook(books.filter((book) => book.BookId !== id));
        setSuccessMessage('Book deleted successfully')
        setTimeout(()=>{setSuccessMessage('');},2000)
        })
        .catch(()=>{setErrorMessage('Failed to delete course.');
});
        
    };
    const handleEdit = (id)=>{
        navigate(`/edit-course/${id}`);
    }


  
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
                    <td><img src={book.coverImage} alt={book.title} style={{ width: '50px', height: 'auto' }} /></td>
                    <td>{book.Title}</td>
                    <td>{book.Author}</td>
                    <td>{book.Genre}</td>
                    <td>{book.PublishedDate}</td>
                    <td>
                    <button className="edit-btn" onClick={()=>handleEdit(book.BookId)}>Edit</button>
                    <button className="delete-btn" onClick = {()=>handleDelete(book.BookId)}>Delete</button>
                    </td>
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
