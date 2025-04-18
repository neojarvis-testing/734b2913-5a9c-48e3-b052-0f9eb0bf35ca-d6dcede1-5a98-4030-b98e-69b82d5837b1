import React, { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../apiConfig';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

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
  const [formError, setFormError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const validators = {
    username: (value) => value.trim() ? '' : "User Name is required",
    email: (value) => !value.trim() ? "Email is required" : /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) ? '' : "Invalid email format",
    mobileNumber: (value) => !value ? "Mobile number is required" : /^[6-9]\d{9}$/.test(value) ? '' : "Invalid mobile number",
    password: (value) => value.trim() ? '' : "Password is required",
    confirmPassword: (value) => {
      if (!value.trim()) return "Confirm Password is required";
      if (value !== formData.password) return "Passwords do not match";
      return '';
    },
    userRole: (value) => value.trim() ? '' : "Role is required"
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = Object.keys(validators).reduce((acc, key) => {
      const error = validators[key](formData[key]);
      if (error) acc[key] = error;
      return acc;
    }, {});

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        await axios
          .post(`${API_BASE_URL}/register`, formData)
          .then((res) => {
            setSuccessMessage("Registration successful!");
            setShowModal(true);
            navigate("/login");
          })
      } catch (error) {
        setFormError("An error occurred during registration. Please try again.");
      }
    };
  }

  const handleModalClose = () => {
    setShowModal(false);
    navigate("/login");
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      {formError && <div className="error-message">{formError}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      <form onSubmit={handleSubmit}>
        {[
          { label: "User Name", name: "username", type: "text" },
          { label: "Email", name: "email", type: "email" },
          { label: "Mobile Number", name: "mobileNumber", type: "tel" },
          { label: "Password", name: "password", type: "password" },
          { label: "Confirm Password", name: "confirmPassword", type: "password" }
        ].map(({ label, name, type }) => (
          <div className="input-group" key={name}>
            <label htmlFor={name}>{label} *</label>
            <input id={name} name={name} type={type} onChange={handleChange} placeholder={label} />
            {errors[name] && <span className="error-message">{errors[name]}</span>}
          </div>
        ))}
        <div className="input-group">
          <label htmlFor="role">Role *</label>
          <select id="role" name="userRole" onChange={handleChange}>
            <option value="">Select Role</option>
            <option value="BookRecommender">Admin</option>
            <option value="BookReader">User</option>
          </select>
          {errors.userRole && <span className="error-message">{errors.userRole}</span>}
        </div>
        <button type="submit">Submit</button>
      </form>
      <p>Already have an account? <a href="/login">Login</a></p>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Registration Successful!</h3>
            <p>User Registration is Successful! Click OK to proceed to the login page.</p>
            <button onClick={handleModalClose}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;