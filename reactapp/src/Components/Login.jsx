import React, { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; 
import API_BASE_URL from '../apiConfig';
import { useNavigate } from 'react-router-dom';
import './Login.css';


const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const Errors = {};

    if (!formData.email) {
      Errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      Errors.email = "Invalid email format";
    }

    if (!formData.password) {
      Errors.password = "Password is required";
    }

    setErrors(Errors);

    if (Object.keys(Errors).length === 0) {
      setLoading(true);
      setFormError(null);
      try {
        const res = await axios.post(`${API_BASE_URL}/login`, formData);
        const fetchedToken = res.data.token;
        localStorage.setItem("token", fetchedToken);
        const decoded = jwtDecode(fetchedToken);
        localStorage.setItem("role", decoded.role);
        localStorage.setItem("username", decoded.name);
        navigate(decoded.role === "BookReader" ? "/readerviewbook" : "/viewbook");
        console.log(decoded);
      } catch (error) {
        setFormError("Error logging in");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="container login-page">
      <div className="row align-items-center justify-content-center">
        {/* Left Section - BookFinder Info */}
        <div className="col-md-6 left-section">
          <h1 className="fw-bold">BookFinder</h1>
          <p className="fs-5">An app to discover, explore, and recommend books tailored to your reading preferences.</p>
        </div>

       
        <div className="col-md-6 right-section">
          <h2 className="text-dark text-center mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email *</label>
              <input type="email" className="form-control" id="email" name="email" onChange={handleChange} />
              {errors.email && <div className="text-danger">{errors.email}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password *</label>
              <input type="password" className="form-control" id="password" name="password" onChange={handleChange} />
              {errors.password && <div className="text-danger">{errors.password}</div>}
            </div>

            {formError && <div className="text-danger mb-3">{formError}</div>}

            {/* Blue Login Button */}
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center mt-3">Don't have an account? <a href="/signup">Sign Up</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
