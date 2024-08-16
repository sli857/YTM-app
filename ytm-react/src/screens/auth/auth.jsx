import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { encrypt } from "./encrypt";

import "./auth.css";

function Auth({ setAuth }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate;

  const handleSignup = async () => {};
  const handelLogin = async () => {
    setAuth(true);
    navigate("/");
  };

  return (
    <div className="login-page">
      <img src="/YTM-logo.png" alt="YTM Logo" className="logo" />
      <h1>{isSignup ? "Sign Up" : "Login"}</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />{" "}
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      {isSignup && (
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      )}
      {!isSignup && (
        <div>
          <label>
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className=""
            ></input>
            Remember this device
          </label>
        </div>
      )}
      {error && <label className="">{error}</label>}
      <div className="" onClick={() => setIsSignup(!isSignup)}>
        {isSignup ? "Switch to login" : "Switch to sign up"}
      </div>
      <div
        className="login-btn"
        onClick={isSignup ? handleSignup : handelLogin}
      >
        {isSignup ? "Sign Up" : "Login"}
      </div>
    </div>
  );
}

Auth.propTypes = {
  setAuth: PropTypes.func.isRequired,
};
export default Auth;
