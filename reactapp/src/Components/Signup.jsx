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
    <div className="signup-page d-flex justify-content-center align-items-center">
       <div className="signup-container d-flex">
      <div className="signup-left d-flex flex-column justify-content-center align-items-center">
     
        <h1>BookFinder</h1>
        <p>
       An app to discover, explore, and
        recommend books tailored to your
         reading preferences.
        </p>
      </div>
      <div className="signup-right" >
      <div className="signup-card p-2 pt-4 shadow-lg">
      <h2 className="text-center mb-2">Signup</h2>
      {formError && <div className="alert alert-danger">{formError}</div>}
      {successMessage && <div className="alert alert success">{successMessage}</div>}
      <form onSubmit={handleSubmit}>
        {[
          { label: "User Name", name: "username", type: "text" },
          { label: "Email", name: "email", type: "email" },
          { label: "Mobile Number", name: "mobileNumber", type: "tel" },
          { label: "Password", name: "password", type: "password" },
          { label: "Confirm Password", name: "confirmPassword", type: "password" }
        ].map(({ label, name, type }) => (
          <div className="mb-2" key={name}>
            <label htmlFor={name} className="form-label">{label}<span className="astrik"> *</span></label>
            <input id={name} name={name} type={type} onChange={handleChange} placeholder={errors[name]||label}
              className={`form-control ${errors[name] ? 'error-placeholder' : ''}`}/>
          {errors[name] && <span className="text-danger"> {errors[name]}</span>}
          </div>
        ))}
        <div className="mb-3">
          <label htmlFor="role" className="form-label">Role<span className="astrik"> *</span></label>
          <select id="role" name="userRole" onChange={handleChange} className="form-select">
            <option value="">{errors.userRole && <span className="error-user text-danger text-muted ">{errors.userRole}</span>||<span>Select Role</span>}</option>
            <option value="BookRecommender">Admin</option>
            <option value="BookReader">User</option>
          </select>
         
        {/*  */}
        </div>
        <button type="submit" className="btn btn-primary w-100">Submit</button>
      </form>
     
      <p className="mt-2 text-center">Already have an account? <a href="/login">Login</a></p>
      {showModal && (
        <div className="modal fade show d-block">
          <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
            <h3 className="modal-title">Registration Successful!</h3>
            <button type="button" className="btn-close" onClick={handleModalClose}></button>
            </div>
            <div className="modal-body">
            <p>User Registration is Successful! Click OK to proceed to the login page.</p>
            </div>
            <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={handleModalClose}>OK</button>
          </div>
        </div>
        </div>
        </div>
      )}
    </div>
    </div>
    </div>
    </div>
   
  );
};
 
export default Signup;
 