import React, { useState } from 'react';
// eslint-disable-next-line import/extensions
import Navbar from './Navbar.js';
import './SignIn.css';
// eslint-disable-next-line import/order
import { Link } from 'react-router-dom';
// import Signup from "./Signup.js";
// import {Route} from "react-router-dom";

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailChange(event) {
    setEmail(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Check email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert('Please enter a valid email address');
      return;
    }

    // Check password
    if (password.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }

    // If email and password are valid, submit the form
    alert(`Email: ${email}\nPassword: ${password}`);
  }

  return (
      <div>
          <header className="header">
              <Navbar />
          </header>
          <div className="first_label">
              <div className="left">
                  <h1>Sign in</h1>
                  <br />
                  <form onSubmit={handleSubmit}>
                      <label htmlFor="signup_email">
                          Enter your email:
                          <input type="text" name="signup_email" value={email} onChange={handleEmailChange} required />
                      </label>
                      <label htmlFor="signup_password">
                          Enter password:
                          <input className="password" type="password" name="signup_password" value={password} onChange={handlePasswordChange} required />
                      </label>
                      <input type="submit" name="signup" value="Sign in" />
                  </form>
                  <br />
                  <br />
                  {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                  <label htmlFor="signup">
                      New user? Sign up
                      <Link to="/Signup">Here</Link>
                  </label>
              </div>

              <div className="right">
                  <span className="loginwith">Sign in with social network</span>
                  <button type="button" className="social-signin facebook">Log in with Facebook</button>
                  <button type="button" className="social-signin twitter">Log in with Twitter</button>
                  <button type="button" className="social-signin google">Log in with Google+</button>
              </div>

              <div className="or">OR</div>
          </div>
      </div>
  );
}

export default SignIn;