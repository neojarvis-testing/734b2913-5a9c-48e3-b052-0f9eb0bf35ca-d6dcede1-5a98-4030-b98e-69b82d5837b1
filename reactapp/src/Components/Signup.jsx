import React, { useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../apiConfig';
import {useNavigate} from 'react-router-dom'

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    mobileNumber: '',
    userRole: ''
  });

  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [formError,setFormError]=useState(null);
  const [successMessage,setSuccessMessage]=useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validateMobile = (mobileNumber) => {
    const mobileRegex = /^[6-9]\d{9}$/;
    return mobileRegex.test(mobileNumber);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = {};

    if (!formData.username.trim()) validationErrors.username = "User Name is required";
    if (!formData.email.trim()) validationErrors.email = "Email is required";
    else if (!validateEmail(formData.email)) validationErrors.email = "Invalid email format";

    if (!formData.mobileNumber) validationErrors.mobileNumber = "Mobile Number is required";
    else if (!validateMobile(formData.mobileNumber)) validationErrors.mobileNumber = "Invalid mobile number";

    if (!formData.password.trim()) validationErrors.password = "Password is required";
    // if (!formData.confirmPassword.trim()) validationErrors.confirmPassword = "Confirm Password is required";
    // else if (formData.password !== formData.confirmPassword) 
    // {
    //   validationErrors.confirmPassword = "Passwords do not match";
    // }

    if (!formData.userRole.trim()) 
    {
      validationErrors.userRole = "Role is required";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0)
    {
      axios 
          .post(`${API_BASE_URL}/register`,formData)
           .then((res)=>{
            console.log(res.data);
            setSuccessMessage("Registration successful!");
            setShowModal(true);
            navigate("/login");

           })
           .catch(()=>{
            setFormError("An error occured during registartion. Please try again.");
           });
    }
  };
      
  const handleModalClose = () => {
    setShowModal(false);
    navigate("/login");
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
          <input type="tel" id="mobile" name="mobileNumber" onChange={handleChange} />
          {errors.mobileNumber && <span className="error-message">{errors.mobileNumber}</span>}
        </div>
        <div className="input-group">
          <label htmlFor="password">Password *</label>
          <input type="password" id="password" name="password" onChange={handleChange} />
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>
        {/* <div className="input-group">
          <label htmlFor="confirmPassword">Confirm Password *</label>
          <input type="password" id="confirmPassword" name="confirmPassword" onChange={handleChange} />
          {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
        </div> */}
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



