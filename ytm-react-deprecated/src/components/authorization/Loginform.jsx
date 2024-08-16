import React, { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

import "./Loginform.css";
import { encrypt } from "../../encrypt/encrypt";
import { SERVERURL } from "../../../config/secret";
import { useNavigate } from "react-router-dom";

function Loginform({ setAuth }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSwitchForm = () => {
    setIsSignup(!isSignup);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Both username and password are required.");
      return;
    }
    const encrypted = encrypt(password);
    var form = {
      name: username,
      secret: encrypted,
      remember: remember,
    };

    axios
      .post(`${SERVERURL}/login`, form)
      .then((res) => {
        if (res.status === 200) {
          setAuth(true);
          navigate("/explore");
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setAuth(false);
          navigate("/login");
          setError("Invalid login. Please try again");
        }
      });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!username || !password || !confirmPassword) {
      setError("Both username and password are required.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Password does not match.");
    }
    const encrypted = encrypt(password);
    var form = {
      name: username,
      secret: encrypted,
    };
    console.log("Signup form:", form);
    //TODO: post signup
    axios
      .post(`${SERVERURL}/signup`, form)
      .then((res) => {
        if (res.status === 201) {
          setAuth(true);
          navigate("/explore");
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          setAuth(false);
          navigate("/login");
          setError("Username exists. Please try again");
        }
        console.log(err);
      });
  };

  return (
    <div className="page">
      <div className="cover">
        <h1>{isSignup ? "Sign Up" : "Login"}</h1>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />{" "}
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />{" "}
        {isSignup && (
          <>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />{" "}
            <br />
          </>
        )}
        <br />
        {!isSignup && (
          <div className="remember">
            <label>
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="custom-checkbox"
              />
              Remember this device
            </label>
          </div>
        )}
        {error && <label className="error-label">{error}</label>}
        <div
          className="login-btn"
          onClick={isSignup ? handleSignup : handleLogin}
        >
          {isSignup ? "Signup" : "Login"}
        </div>
        <div className="switch-btn" onClick={handleSwitchForm}>
          {isSignup ? "Switch to Login" : "Switch to Signup"}
        </div>
      </div>
    </div>
  );
}

Loginform.propTypes = {
  setAuth: PropTypes.func.isRequired,
};

export default Loginform;
