import React, { useState } from "react";
import axios from "axios";
import API_BASE_URL from '../apiConfig';

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState(null);

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
        .post(API_BASE_URL,formData)
        .then(() => {
          alert("Login successful!");
          setLoading(false);
          window.location.href = "/dashboard";
        })
        .catch(() => {
          setFormError("Error logging in");
          setLoading(false);
        });
    }
  };

  return (
    <div className="login-container">
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
