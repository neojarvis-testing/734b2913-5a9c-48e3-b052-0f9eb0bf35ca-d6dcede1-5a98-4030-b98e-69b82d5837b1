import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../apiConfig';
import BookRecommenderNavbar from './BookRecommenderNavbar';
import BookRecommenderNavbarFooter from './BookRecommenderNavbarFooter';

const BookForm = ({ mode = "add" }) => {
    const navigate = useNavigate();
    const { id } = useParams();
<<<<<<< HEAD
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishedDate, setPublishedDate] = useState('');
    const [genre, setGenre] = useState('');
    const [coverPage, setCoverpage] = useState('');

    const [titleError, setTitleError] = useState(null);
    const [authorError, setAuthorError] = useState(null);
    const [publishedDateError, setPublishedDateError] = useState(null);
    const [genreError, setGenreError] = useState(null);
    const [coverPageError, setCoverpageError] = useState(null);
    const [formError, setFormError] = useState(null);

=======

    const [formData, setFormData] = useState({
        title: '',
        author: '',
        publishedDate: '',
        genre: '',
        coverImage: '',
    });

    const [formErrors, setFormErrors] = useState({});
    const [formError, setFormError] = useState(null);
>>>>>>> f3976cdf688b569d1dc7f17c22158069c1c94e49
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
<<<<<<< HEAD
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
                    setTitle(bookdata.Title);
                    setAuthor(bookdata.Author);
                    setPublishedDate(bookdata.PublishedDate);
                    setGenre(bookdata.Genre);
                    setCoverpage(bookdata.CoverPage);
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
        setCoverpageError(false);

        let hasError = false;
        if (!title.trim()) {
            setTitleError(true);
            hasError = true;
        }
        if (!author.trim()) {
            setAuthorError(true);// Corrected line
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
        if (!coverPage.trim()) {
            setCoverpageError(true);
            hasError = true;
        }
        if (hasError) {
            return;
        }

        const bookData = { title, author, publishedDate, genre, coverPage };

        if (mode === "add") {
            console.log(mode);

            axios
                .post(`${API_BASE_URL}/books`, bookData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                .then(() => {
                    setSuccessMessage("Book added successfully!");
                    setTimeout(() => navigate("/viewbooks"), 3000);
                })
                .catch(() => {
                    setFormError("Error creating book");
                });
        } else if (mode === "edit") {
            console.log(mode);

            axios
                .put(`${API_BASE_URL}/books/${id}`, bookData, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } // Corrected line
                })
                .then(() => {
                    setSuccessMessage("Book updated successfully");
                    setTimeout(() => navigate("/viewbooks"), 3000);
                })
                .catch(() => {
                    setFormError("Error updating book");
                });
=======
        const fetchBookData = async () => {
            if (mode === "edit" && id) {
                setLoading(true);
                try {
                    const response = await axios.get(`${API_BASE_URL}/books/${id}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    });
                    setFormData(response.data);
                } catch (error) {
                    setFormError("Error fetching book data");
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchBookData();
    }, [mode, id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.title.trim()) errors.title = "Title is required";
        if (!formData.author.trim()) errors.author = "Author is required";
        if (!formData.publishedDate.trim()) errors.publishedDate = "Published Date is required";
        if (!formData.genre.trim()) errors.genre = "Genre is required";
        if (!formData.coverImage.trim()) errors.coverImage = "Cover Image is required";
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = validateForm();
        setFormErrors(errors);

        if (Object.keys(errors).length > 0) return;

        try {
            if (mode === "add") {
                await axios.post(`${API_BASE_URL}/books`, formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setSuccessMessage("Book added successfully!");
                setTimeout(() => navigate("/viewbook"), 3000);
            } else if (mode === "edit") {
                await axios.put(`${API_BASE_URL}/books/${id}`, formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setSuccessMessage("Book updated successfully!");
                setTimeout(() => navigate("/viewbook"), 3000);
            }
        } catch (error) {
            setFormError(mode === "add" ? "Error creating book" : "Error updating book");
>>>>>>> f3976cdf688b569d1dc7f17c22158069c1c94e49
        }
    };

    const handleBack = () => {
<<<<<<< HEAD
        navigate("/viewbooks");
=======
        navigate("/viewbook");
>>>>>>> f3976cdf688b569d1dc7f17c22158069c1c94e49
    };

    return (
        <div>
<<<<<<< HEAD
            <div className="container mt-4">
                <h2>{mode === "add" ? "CREATE NEW BOOK" : "EDIT BOOK"}</h2>
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
                            <label className="form-label"><b>Cover Page*</b></label>
                            <input type="text" placeholder="Cover Page" value={coverPage} onChange={(e) => setCoverpage(e.target.value)} />
                            {coverPageError && <p>Cover Page is required</p>}<br />
                        </div>
=======
            <BookRecommenderNavbar />
            <div className="container mt-4">
                <h2>{mode === "add" ? "Create New Book" : "Edit Book"}</h2>
                {formError && <p className="text-danger">{formError}</p>}
                {loading && <p>Loading...</p>}
                {!loading && (
                    <form onSubmit={handleSubmit}>
                        {[
                            { label: "Title", name: "title", type: "text", placeholder: "Title" },
                            { label: "Author", name: "author", type: "text", placeholder: "Author" },
                            { label: "Published Date", name: "publishedDate", type: "date" },
                            { label: "Genre", name: "genre", type: "text", placeholder: "Genre" },
                            { label: "Cover Image", name: "coverImage", type: "text", placeholder: "Cover Image" },
                        ].map(({ label, name, type, placeholder }) => (
                            <div className="mb-3" key={name}>
                                <label className="form-label"><b>{label}*</b></label>
                                <input
                                    type={type}
                                    name={name}
                                    placeholder={placeholder}
                                    value={formData[name]}
                                    onChange={handleChange}
                                />
                                {formErrors[name] && <p className="text-danger">{formErrors[name]}</p>}
                            </div>
                        ))}
>>>>>>> f3976cdf688b569d1dc7f17c22158069c1c94e49
                        <button type="submit">{mode === "add" ? "Add Book" : "Update Book"}</button>
                        <button type="button" onClick={handleBack}>Back</button>
                    </form>
                )}
<<<<<<< HEAD
                {successMessage && <p>{successMessage}</p>}
            </div>
        </div>
    );
}

export default BookForm;
=======
                {successMessage && <p className="text-success">{successMessage}</p>}
            </div>
            <BookRecommenderNavbarFooter />
        </div>
    );
};

export default BookForm;
>>>>>>> f3976cdf688b569d1dc7f17c22158069c1c94e49
