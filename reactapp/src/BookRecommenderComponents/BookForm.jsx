import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../apiConfig';
import BookRecommenderNavbar from './BookRecommenderNavbar';
import BookRecommenderNavbarFooter from './BookRecommenderNavbarFooter';

const BookForm = ({ mode = "add" }) => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [formData, setFormData] = useState({
        title: '',
        author: '',
        publishedDate: '',
        genre: '',
        coverImage: '',
    });

    const [formErrors, setFormErrors] = useState({});
    const [formError, setFormError] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
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
        }
    };

    const handleBack = () => {
        navigate("/viewbook");
    };

    return (
        <div>
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
                        <button type="submit">{mode === "add" ? "Add Book" : "Update Book"}</button>
                        <button type="button" onClick={handleBack}>Back</button>
                    </form>
                )}
                {successMessage && <p className="text-success">{successMessage}</p>}
            </div>
            <BookRecommenderNavbarFooter />
        </div>
    );
};

export default BookForm;