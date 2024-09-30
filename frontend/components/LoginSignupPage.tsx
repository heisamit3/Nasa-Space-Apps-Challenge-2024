import React, { useState } from "react";
import { FaUser, FaTimes } from "react-icons/fa";
import "../css/LoginSignup.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface LoginSignupPageProps {
  onClose: () => void;
  setIsLoggedIn: (loggedIn: boolean) => void;
}

const LoginSignupPage: React.FC<LoginSignupPageProps> = ({
  onClose,
  setIsLoggedIn,
}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [useEmail, setUseEmail] = useState(true); // We can keep this for toggling, but only use email in requests
  const navigate = useNavigate();

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const data = { email, password }; // Payload for login/signup

      if (isLogin) {
        // Handle login logic
        const response = await axios.post(
          `http://localhost:8000/api/login/`,
          data
        );
        console.log(response.data.message); // Log success message
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");
        onClose();
        navigate("/dashboard");
      } else {
        // Handle signup logic
        if (password === retypePassword) {
          const signupData = {
            email,
            password,
            confirm_password: retypePassword,
          }; // Ensure you match the backend expected format
          const response = await axios.post(
            `http://localhost:8000/api/signup/`,
            signupData
          );
          console.log(response.data.message); // Log success message
          setIsLoggedIn(true);
          localStorage.setItem("isLoggedIn", "true");
          onClose();
          navigate("/dashboard");
        } else {
          alert("Passwords do not match!");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container">
      <FaTimes className="close-icon" onClick={onClose} />
      <div className="header">
        <FaUser className="icon" />
        <h2>{isLogin ? "Sign In" : "Sign Up"}</h2>
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {!isLogin && (
          <div className="form-group">
            <label htmlFor="retype-password">Retype Password</label>
            <input
              type="password"
              id="retype-password"
              placeholder="Retype your password"
              value={retypePassword}
              onChange={(e) => setRetypePassword(e.target.value)}
              required
            />
          </div>
        )}

        <button type="submit" className="btn">
          {isLogin ? "Login" : "Sign Up"}
        </button>
      </form>

      <div className="footer-login">
        <p>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span onClick={toggleMode} className="toggle-link">
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginSignupPage;
