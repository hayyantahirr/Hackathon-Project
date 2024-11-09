import React, { useRef, useState } from "react";
import "../styles/Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { google } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { auth, provider } from "../config/firebase";
import GoogleButton from "../components/GoogleButton";
function Login() {
  const containerRef = useRef(null);

  const handleSignUpClick = () => {
    containerRef.current.classList.add("sign-up-mode");
  };

  const handleSignInClick = () => {
    containerRef.current.classList.remove("sign-up-mode");
  };

  return (
    <div className="containerr" ref={containerRef}>
      <div className="forms-container">
        <div className="signin-signup">
          {/* Sign In Form */}
          <form action="#" className="sign-in-form">
            <h2 className="title">Sign in</h2>

            <p className="social-text"> Sign in with social platforms</p>
            <div className="social-media">
              <GoogleButton />
            </div>
          </form>

          {/* Sign Up Form */}
        </div>
      </div>

      {/* Panels Container */}
      <div className="panels-container">
        {/* Left Panel */}
        <div className="panel left-panel">
          <div className="content">
            <h3>Sign in now!</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!
            </p>
          </div>
          <img src="/public/log.svg" className="image" alt="Log Illustration" />
        </div>

        {/* Right Panel */}
      </div>
    </div>
  );
}

export default Login;
