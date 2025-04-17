import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../apiConfig';
import BookRecommenderNavbar from './BookRecommenderNavbar';
import BookRecommenderNavbarFooter from './BookRecommenderNavbarFooter';


const BookForm = ({ mode = "add" }) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishedDate, setPublishedDate] = useState('');
    const [genre, setGenre] = useState('');
    const [coverImage, setcoverImage] = useState('');

    const [titleError, setTitleError] = useState(null);
    const [authorError, setAuthorError] = useState(null);
    const [publishedDateError, setPublishedDateError] = useState(null);
    const [genreError, setGenreError] = useState(null);
    const [coverImageError, setcoverImageError] = useState(null);
    const [formError, setFormError] = useState(null);

    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        if (mode === "edit" && id) {
            console.log(id);
            setLoading(true);
            axios
                .get(`${API_BASE_URL}/books/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                .then((response) => {
                    const bookdata = response.data;
                    setTitle(bookdata.title);
                    setAuthor(bookdata.author);
                    setPublishedDate(bookdata.publishedDate);
                    setGenre(bookdata.genre);
                    setcoverImage(bookdata.coverImage);
                    setLoading(false);
                })
                .catch(() => {
                    setFormError("Error fetching book data");
                    setLoading(false);
                });

        }
    }, [mode, id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        setTitleError(false);
        setAuthorError(false);
        setPublishedDateError(false);
        setGenreError(false);
        setcoverImageError(false);

        let hasError = false;
        if (!title.trim()) {
            setTitleError(true);
            hasError = true;
        }
        if (!author.trim()) {
            setAuthorError(true);
            hasError = true;
        }
        if (!publishedDate.trim()) {
            setPublishedDateError(true);
            hasError = true;
        }
        if (!genre.trim()) {
            setGenreError(true);
            hasError = true;
        }
        if (!coverImage.trim()) {
            setcoverImageError(true);
            hasError = true;
        }
        if (hasError) {
            return;
        }

        const bookData = { title, author, genre, publishedDate, coverImage };

        if (mode === "add") {
            console.log(mode);
            //bookData.publishedDate = bookData.publishedDate.toString;
            console.log(bookData);
            axios
                .post(`${API_BASE_URL}/books`, bookData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                .then(() => {
                    setSuccessMessage("Book added successfully!");
                    setTimeout(() => navigate("/viewbook"), 3000);
                })
                .catch(() => {
                    setFormError("Error creating book");
                });
        }
        else if (mode === "edit") {
            console.log(mode);

            axios
                .put(`${API_BASE_URL}/${id}`, bookData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                })
                .then(() => {
                    setSuccessMessage("Book updated successfully");
                    setTimeout(() => navigate("/viewbook"), 3000);
                })
                .catch(() => {
                    setFormError("Error updating book");
                });
        }
    };

    const handleBack = () => {
        navigate("/viewbook");
    };

    return (
        <div>
            <BookRecommenderNavbar/>
            <div className="container mt-4">
                <h2>{mode === "add" ? "Create New Book" : "Edit Book"}</h2>
                {formError && <p>{formError}</p>}
                {loading && <p>Loading....</p>}
                {!loading && (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label"><b>Title*</b></label>
                            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                            {titleError && <p>Title is required</p>}
                        </div>
                        <div>
                            <label className="form-label"><b>Author*</b></label>
                            <textarea placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
                            {authorError && <p>Author is required</p>}
                        </div>
                        <div>
                            <label className="form-label"><b>Published Date*</b></label>
                            <input type="date" value={publishedDate} onChange={(e) => setPublishedDate(e.target.value)} />
                            {publishedDateError && <p>Published Date is required</p>}
                        </div>
                        <div>
                            <label className="form-label"><b>Genre*</b></label>
                            <input type="text" placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} />
                            {genreError && <p>Genre is required</p>}<br />
                        </div>
                        <div>
                            <label className="form-label"><b>Cover Image*</b></label>
                            <input type="text" placeholder="Cover Page" value={coverImage} onChange={(e) => setcoverImage(e.target.value)} />
                            {coverImageError && <p>Cover Page  is required</p>}<br />
                        </div>
                        <button type="submit">{mode === "add" ? "Add Book" : "Update Book"}</button>
                        <button type="button" onClick={handleBack}>Back</button>
                    </form>
                )}

                {successMessage && <p>{successMessage}</p>}

            </div>
            <BookRecommenderNavbarFooter />
        </div>
    )
}

export default BookForm




