import React, { useState } from "react";
import "./LoginPage.css";
import * as axios from 'axios'
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter your email id");
      return;
    }
    if (!password) {
      setError("Please fill your password");
      return;
    }

    try {
      // Make API request
      const response = await axios.default.post('http://192.168.139.111:8000/api/login/', {
        username: email,
        password: password
      });

      if (response.status === 200) {
        // Assuming response contains tokens and user info
        const { access, refresh, user } = response.data;

        // Store tokens and user info in localStorage
        localStorage.setItem('accessToken', access);
        localStorage.setItem('refreshToken', refresh);
        localStorage.setItem('user', JSON.stringify(user));

        // Redirect to the dashboard
        navigate("/dashboard");
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred during login. Please try again.");
    }
  };
  return (
    <>
      <div className="container">
        {/* Left half (Login form) */}
        <div className="left-half">
        <div className="header-text">
        Post<span className="trucker">Trucker</span>
      </div>
          <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>

              <div className="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </div>

              {error && <p className="error-message">{error}</p>}

              <button type="submit" className="login-button">
                Login
              </button>

              <a href="#" className="forgot-password">
                Forgot your password?
              </a>
            </form>
          </div>
        </div>

        {/* Right half (Image) */}
        <div className="right-half"></div>
      </div>
    </>
  );
};

export default LoginPage;