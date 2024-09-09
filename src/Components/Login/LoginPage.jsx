import React, { useState } from "react";
import * as axios from "axios"; 
import './LoginPage.css';
import { useNavigate } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";

const LoginPage = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

    const handleLogin = (e) => {
      e.preventDefault();
      if (!email) {
        setError("Please enter your email id");
        return
      }
      else if(!password){
        setError("Please fill your password");
        return
      }else{
        return navigate("/dashboard")
      }
      
    // axios.default.post('/skill',{email : email, password: password}).then(res => {
    //     if(res.status === 404){
    //         setError("Skill Issue")
    //     }
    // }).catch(err => setError("Another sill Isssue"))
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
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

        <a href="#" className="forgot-password">Forgot your password?</a>
      </form>
    </div>
  );
};

export default LoginPage;
