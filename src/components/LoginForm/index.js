import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import Cookies from 'js-cookie';
import './index.css';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showSubmitError, setShowSubmitError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const onSubmitSuccess = () => {
    // Store the JWT token in localStorage
    localStorage.setItem('jwt_token', 'sample_jwt_token');
    navigate('/'); // Redirect to the homepage or desired route
  };
  
  const onSubmitFailure = (message) => {
    setShowSubmitError(true);
    setErrorMsg(message);
  };
  
  const submitForm = (event) => {
    event.preventDefault();
  
    // Retrieve user data from localStorage
    const storedUserDetails = JSON.parse(localStorage.getItem('userDetails'));
  
    // Check if the user details already exist in local storage
    if (!storedUserDetails) {
      // If not, store the new user details in local storage
      const userDetails = { username, password }; // Assume username and password are from form inputs
      localStorage.setItem('userDetails', JSON.stringify(userDetails));
      onSubmitSuccess(); // Proceed with successful login
    } else {
      // If they exist, check if they match the input values
      if (storedUserDetails.username === username && storedUserDetails.password === password) {
        onSubmitSuccess(); // Proceed with successful login
      } else {
        onSubmitFailure('Invalid username or password'); // Handle failure
      }
    }
  };
  
  

  return (
    <div className="login-form-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
        className="login-website-logo-mobile-img"
        alt="website logo"
      />
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
        className="login-img"
        alt="website login"
      />
      <form className="form-container" onSubmit={submitForm}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
          className="login-website-logo-desktop-img"
          alt="website logo"
        />
        <div className="input-container">
          <label className="input-label" htmlFor="username">
            USERNAME
          </label>
          <input
            type="text"
            id="username"
            className="username-input-field"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
        </div>
        <div className="input-container">
          <label className="input-label" htmlFor="password">
            PASSWORD
          </label>
          <input
            type="password"
            id="password"
            className="password-input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
        {showSubmitError && <p className="error-message">*{errorMsg}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
