import React, { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../apiConfig';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import "bootstrap/dist/css/bootstrap.min.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobileNumber: '',
    userRole: ''
  });

  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const validate = () => {
    const validEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    const validMobile = /^\d{10}$/;
    let formErrors = {};

    if (!formData.username) {
      formErrors.username = "User Name is required";
    }
    if (!formData.email) {
      formErrors.email = "Email is required";
    }
    else if (!validEmail.test(formData.email)) {
      formErrors.email = "Invalid email format";
    }
    if (!formData.mobileNumber) {
      formErrors.mobileNumber = "Mobile number is required";
    }
    else if (!validMobile.test(formData.mobileNumber)) {
      formErrors.mobileNumber = "Invalid mobile number";
    }
    if (!formData.password) {
      formErrors.password = "Password is required";
    }
    else if (formData.password.length < 8) {
      formErrors.password = "Password must be at least 8 characters long";
    }
    if (!formData.confirmPassword) {
      formErrors.confirmPassword = "Confirm Password is required";
    }
    else if (formData.password !== formData.confirmPassword) {
      formErrors.confirmPassword = "Passwords do not match";
    }
    if (!formData.userRole) {
      formErrors.userRole = "Please select a role";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const { confirmPassword, ...payload } = formData;

        const response = await axios.post(
          `${API_BASE_URL}/register`,
          payload
        );
        console.log("Signup successful:", response.data);
        setSuccessMessage(true); // Show success modal
      } catch (error) {
        console.error("Signup failed:", error.response?.data || error.message);
        setErrors({ apiError: error.response?.data || "Signup failed. Please try again." });
      }
    }
  };

  const redirectToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="container-fluid vh-100 d-flex">
      <div className="row w-100">
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center bg-primary text-white p-5">
          <h1 className="fw-bold">BookFinder</h1>
          <p className="fs-5 text-center">An app to discover, explore, and recommend books tailored to your reading preferences.</p>
        </div>
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center bg-light p-5">
          <h2>Signup</h2>
          <form onSubmit={handleSubmit} className="w-75">
            <div className="form-group mb-3">
              <label>Username:</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="form-control"
                placeholder="Username"
              />
              {errors.username && <span className="text-danger">{errors.username}</span>}
            </div>
            <div className="form-group mb-3">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                placeholder="Email"
              />
              {errors.email && <span className="text-danger">{errors.email}</span>}
            </div>
            <div className="form-group mb-3">
              <label>Mobile Number:</label>
              <input
                type="text"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                className="form-control"
                placeholder="Mobile Number"
              />
              {errors.mobileNumber && <span className="text-danger">{errors.mobileNumber}</span>}
            </div>
            <div className="form-group mb-3">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-control"
                placeholder="Password"
              />
              {errors.password && <span className="text-danger">{errors.password}</span>}
            </div>
            <div className="form-group mb-3">
              <label>Confirm Password:</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="form-control"
                placeholder="Confirm Password"
              />
              {errors.confirmPassword && <span className="text-danger">{errors.confirmPassword}</span>}
            </div>
            <div className="form-group mb-3">
              <label>Role:</label>
              <select
                name="userRole"
                value={formData.userRole}
                onChange={handleChange}
                className="form-control"
              >
                <option value="">Select a Role</option>
                <option value="BookRecommender">Recommender</option>
                <option value="BookReader">Reader</option>
              </select>
              {errors.userRole && <span className="text-danger">{errors.userRole}</span>}
            </div>
            {errors.apiError && <span className="text-danger">{errors.apiError}</span>}
            <button type="submit" className="btn btn-primary w-100">Submit</button>
          </form>

          {/* Success Modal */}
          {successMessage && (
            <div className="modal show d-block" tabIndex="-1" role="dialog">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Signup Successful</h5>
                  </div>
                  <div className="modal-body">
                    <p>Your account has been created successfully!</p>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={redirectToLogin}
                    >
                      Ok
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <p className="mt-3">
            Already have an account? <span style={{ color: 'blue', cursor: 'pointer' }} onClick={redirectToLogin}>Login</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;