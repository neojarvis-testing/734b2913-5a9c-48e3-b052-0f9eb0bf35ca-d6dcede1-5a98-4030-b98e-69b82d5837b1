import React, { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../apiConfig';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    role: ''
  });

  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [formError,setFormError]=useState(null);
  const [successMessage,setSuccessMessage]=useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validateMobile = (mobile) => {
    const mobileRegex = /^[6-9]\d{9}$/;
    return mobileRegex.test(mobile);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = {};

    if (!formData.username.trim())
    {
     validationErrors.username = "User Name is required";
    }
    if (!formData.email.trim())
    {
     validationErrors.email = "Email is required";
    }
    else if (!validateEmail(formData.email))
    {
     validationErrors.email = "Invalid email format";
    }

    if (!formData.mobile) 
    {
      validationErrors.mobile = "Mobile Number is required";
    }
    else if (!validateMobile(formData.mobile)) 
    {
      validationErrors.mobile = "Invalid mobile number";
    }

    if (!formData.password.trim()) 
    {
    validationErrors.password = "Password is required";
    }
    if (!formData.confirmPassword.trim())
    {
      validationErrors.confirmPassword = "Confirm Password is required";
    }
    else if (formData.password !== formData.confirmPassword) 
    {
      validationErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.role.trim()) 
    {
      validationErrors.role = "Role is required";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0)
    {
      axios 
          .post(API_BASE_URL,formData)
           .then(()=>{
            setSuccessMessage("Registration successful!");
            setShowModal(true);
           })
           .catch(()=>{
            setFormError("An error occured during registartion. Please try again.");
           });
    }
  };
      
  const handleModalClose = () => {
    setShowModal(false);
    window.location.href = "/login";
  };

  return (
    <div className="signup-container">
      <h2>Sign Up for Book Finder Project</h2>
      {formError && <div className="error-message">{formError}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="username">User Name *</label>
          <input type="text" id="username" name="username" onChange={handleChange} />
          {errors.username && <span className="error-message">{errors.username}</span>}
        </div>
        <div className="input-group">
          <label htmlFor="email">Email *</label>
          <input type="email" id="email" name="email" onChange={handleChange} />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>
        <div className="input-group">
          <label htmlFor="mobile">Mobile Number *</label>
          <input type="tel" id="mobile" name="mobile" onChange={handleChange} />
          {errors.mobile && <span className="error-message">{errors.mobile}</span>}
        </div>
        <div className="input-group">
          <label htmlFor="password">Password *</label>
          <input type="password" id="password" name="password" onChange={handleChange} />
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>
        <div className="input-group">
          <label htmlFor="confirmPassword">Confirm Password *</label>
          <input type="password" id="confirmPassword" name="confirmPassword" onChange={handleChange} />
          {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
        </div>
        <div className="input-group">
          <label htmlFor="role">Role *</label>
          <select id="role" name="role" onChange={handleChange}>
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
          {errors.role && <span className="error-message">{errors.role}</span>}
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



