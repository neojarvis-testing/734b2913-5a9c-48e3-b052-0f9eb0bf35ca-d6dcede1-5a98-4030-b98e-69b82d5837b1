import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../apiConfig';
import BookRecommenderNavbar from './BookRecommenderNavbar';
import BookRecommenderNavbarFooter from './BookRecommenderNavbarFooter';
import 'bootstrap/dist/css/bootstrap.min.css';

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


    const validateForm = () => {
        const errors = {};
        if (!formData.title.trim()) errors.title = "Title is required";
        if (!formData.author.trim()) errors.author = "Author is required";
        if (!formData.publishedDate.trim()) errors.publishedDate = "Published Date is required";
        if (!formData.genre.trim()) errors.genre = "Genre is required";
        if (!formData.coverImage.trim()) errors.coverImage = "Cover Image is required";
        return errors;
    };
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files && files.length > 0) {
            // Remove or comment out: setFileName(file.name);
            const file = files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    [name]: reader.result, // Stores the base64-encoded image
                }));
            };
            reader.readAsDataURL(file);
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = validateForm();
        setFormErrors(errors);

        if (Object.keys(errors).length > 0) return;

        try {
            if (mode === "add") {
                console.log(formData);
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
                <h2 className="text-center">{mode === "add" ? "Create New Book" : "Edit Book"}</h2>
                {formError && <p className="text-danger">{formError}</p>}
                {loading && <p>Loading...</p>}
                {!loading && (
                    <form onSubmit={handleSubmit}>
                        {[
                            { label: "Title", name: "title", type: "text", placeholder: "Title" },
                            { label: "Author", name: "author", type: "text", placeholder: "Author" },
                            { label: "Published Date", name: "publishedDate", type: "date" },
                            { label: "Genre", name: "genre", type: "text", placeholder: "Genre" },

                        ].map(({ label, name, type, placeholder }) => (
                            <div className="mb-3" key={name}>
                                <label className="form-label"><b>{label}*</b></label>
                                <input
                                    type={type}
                                    className="form-control w-100"
                                    name={name}
                                    placeholder={placeholder}
                                    value={formData[name]}
                                    onChange={handleChange}
                                />
                                {formErrors[name] && <p className="text-danger">{formErrors[name]}</p>}
                            </div>
                        ))}

                        <div className="mb-3">
                            <label className="form-label"><b>Cover Image*</b></label>
                            <input
                                type="file"
                                accept="image/*"
                                name="coverImage"
                                onChange={handleChange}
                            />
                            {formErrors.coverImage && <p className="text-danger">{formErrors.coverImage}</p>}
                        </div>
                        <div>
                            <img src={formData.coverImage} alt="preview" style={{width:"200px", maxHeight:"200px", objectFit:"cover"}}/>
                        </div>
                        <div className="d-flex justify-content-between">
                            <button type="submit" className="btn btn-primary">{mode === "add" ? "Add Book" : "Update Book"}</button>
                            <button type="button" className="btn btn-primary" onClick={handleBack}>Back</button>
                        </div>
                    </form>
                )}
                {successMessage && <p className="text-success">{successMessage}</p>}
            </div>
            <BookRecommenderNavbarFooter />
        </div>
    );
};

export default BookForm;
