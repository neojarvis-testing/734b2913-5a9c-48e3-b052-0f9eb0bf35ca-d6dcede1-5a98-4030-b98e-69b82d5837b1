import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../apiConfig';
import { useNavigate } from 'react-router-dom';
import './Signup.css'; // Ensure this file contains the glassmorphism styles
import "bootstrap/dist/css/bootstrap.min.css";

const Signup = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'light' ? false : true;
  });

  // Apply the theme on load
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.style.setProperty('--background-gradient', 'linear-gradient(135deg, #1e1e2f, #2a2a3b)'); // Dark mode gradient
      root.style.setProperty('--text-color', '#ffffff'); // Dark mode text color
      root.style.setProperty('--text-color-mild', 'rgba(255, 255, 255, 0.7)'); // Dark mode mild text color
    } else {
      root.style.setProperty('--background-gradient', 'linear-gradient(135deg, #f6f6ff, #c0e9ff)'); // Light mode gradient
      root.style.setProperty('--text-color', '#000000'); // Light mode text color
      root.style.setProperty('--text-color-mild', 'rgba(0, 0, 0, 0.7)'); // Light mode mild text color
    }
  }, [isDarkMode]);

  // Toggle theme and save to localStorage
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('theme', newMode ? 'dark' : 'light'); // Save theme to localStorage
      return newMode;
    });
  };
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobileNumber: '',
    userRole: ''
  });

  const [errors, setErrors] = useState({});
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
    } else if (!validEmail.test(formData.email)) {
      formErrors.email = "Invalid email format";
    }
    if (!formData.mobileNumber) {
      formErrors.mobileNumber = "Mobile number is required";
    } else if (!validMobile.test(formData.mobileNumber)) {
      formErrors.mobileNumber = "Invalid mobile number";
    }
    if (!formData.password) {
      formErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      formErrors.password = "Password must be at least 6 characters long";
    }
    if (!formData.confirmPassword) {
      formErrors.confirmPassword = "Confirm Password is required";
    } else if (formData.password !== formData.confirmPassword) {
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
        redirectToLogin();
      } catch (error) {
        console.error("Signup failed:", error.response?.data || error.message);
        const errorMessage = error.response?.data?.message || "Signup failed. Please try again.";
        setErrors({ apiError: errorMessage });
      }
    }
  };

  const redirectToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="signup-page d-flex align-items-center justify-content-center vh-100">
      <div className="glass-container p-5">
        <h2 className="text-center mb-4">Signup</h2>
        <form onSubmit={handleSubmit}>
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

        <p className="mt-3 text-center">
          Already have an account? <span style={{ color: 'blue', cursor: 'pointer' }} onClick={redirectToLogin}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default Signup;