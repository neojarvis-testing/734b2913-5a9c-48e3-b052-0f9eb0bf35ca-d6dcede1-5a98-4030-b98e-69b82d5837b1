import React, { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; 
import API_BASE_URL from '../apiConfig';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState(null);
  const navigate = useNavigate();
  const [decodedToken, setDecodedToken] = useState(null); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const Errors = {};

    if (!formData.email) {
      Errors.email = "Email is required";
    } 
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      Errors.email = "Invalid email format";
    }

    if (!formData.password) {
      Errors.password = "Password is required";
    }

    setErrors(Errors);

    if (Object.keys(Errors).length === 0) {
      setLoading(true);
      setFormError(null);

      axios
        .post(`${API_BASE_URL}/login`, formData)
        .then((res) => {
          console.log(res);
          const fetchedToken = res.data.token;
          const decoded = jwtDecode(fetchedToken);
          console.log("Decoded Token:", decoded);
          setDecodedToken(decoded.role);
          navigate(decoded.role==='BookReader'?"/readerviewbook":"/viewbook");
          setLoading(false);
        })
        .catch(() => {
          setFormError("Error logging in");
          setLoading(false);
        });
        
    }
  };

  return (
    <div className="login-container">
      <h1>BookFinder</h1>
      <p>BookFinder—an app to discover, explore, and recommend books tailored to your reading preferences.</p>

      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="email">Email *</label>
          <input type="email" id="email" name="email" onChange={handleChange} />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>
        <div className="input-group">
          <label htmlFor="password">Password *</label>
          <input type="password" id="password" name="password" onChange={handleChange} />
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>
        {formError && <span className="error-message">{formError}</span>}
        <button type="submit" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
      </form>
      <p>Don't have an account? <a href="/signup">Sign Up</a></p>
    </div>
  );
};

export default Login;