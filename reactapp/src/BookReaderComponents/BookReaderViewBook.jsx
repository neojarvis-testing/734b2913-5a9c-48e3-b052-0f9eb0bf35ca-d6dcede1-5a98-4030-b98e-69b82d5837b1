import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ViewBook from '../BookRecommenderComponents/ViewBook';

const BookReaderViewBook = () => {



    return (
        <div className="page-container">
             <div className="d-none">Available Books</div>
            <ViewBook/>
        </div>
    );
};

export default BookReaderViewBook;
