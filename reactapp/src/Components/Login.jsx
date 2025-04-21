import React, { useState ,useEffect } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode"; 
import API_BASE_URL from "../apiConfig";
import { useNavigate } from "react-router-dom";
import "./Login.css"; 

const Login = () => {
  const isDarkMode = localStorage.getItem('theme')  === 'light' ? false : true;

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
        navigate("/");
      } catch (error) {
        setFormError("Error logging in");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="login-page d-flex align-items-center justify-content-center vh-100">
      <div class="background-text-signing"><pre>Book  Finder</pre></div>

      <div className="glass-container p-5">
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="email" className="form-label">Email *</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              onChange={handleChange}
              placeholder="Enter your email"
            />
            {errors.email && <div className="text-danger">{errors.email}</div>}
          </div>

          <div className="form-group mb-3">
            <label htmlFor="password" className="form-label">Password *</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              onChange={handleChange}
              placeholder="Enter your password"
            />
            {errors.password && <div className="text-danger">{errors.password}</div>}
          </div>

          {formError && <div className="text-danger mb-3">{formError}</div>}

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-3">
          Don't have an account? <a href="/signup" className="text-primary">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;