import React, { useRef } from "react";
import "../styles/Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" />
            </div>
            <input type="submit" value="Login" className="btnn solid" />
            <p className="social-text">Or Sign in with social platforms</p>
            <div className="social-media">
              <a href="#" className="social-icon">
                <i className="fab fa-facebook-f"></i>
              </a>

              <a href="#" className="social-icon">
                <i className="fab fa-google"></i>
              </a>
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
