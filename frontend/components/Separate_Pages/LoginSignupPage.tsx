import React, { useState } from "react";
import { FaUser, FaTimes } from "react-icons/fa";
import "../../css/LoginSignup.css";
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
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState(""); // Only for sign up
  const [fullName, setFullName] = useState(""); // Only for sign up
  const [city, setCity] = useState(""); // Only for sign up
  const [phoneNumber, setPhoneNumber] = useState(""); // Only for sign up
  const navigate = useNavigate();

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFullName(""); // Reset fields when toggling
    setRetypePassword("");
    setCity("");
    setPhoneNumber("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (isLogin) {
        // Handle login logic
        const data = { email, password };
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
        if (password !== retypePassword) {
          alert("Passwords do not match!");
          return;
        }

        const signupData = { email, password, fullName, city, phoneNumber };
        const response = await axios.post(
          `http://localhost:8000/api/signup/`,
          signupData
        );
        console.log(response.data.message); // Log success message
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");
        onClose();
        navigate("/dashboard");
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
        {!isLogin && (
          <>
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required={!isLogin}
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                placeholder="Enter your city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required={!isLogin}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required={!isLogin}
              />
            </div>
          </>
        )}

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
            <label htmlFor="retypePassword">Retype Password</label>
            <input
              type="password"
              id="retypePassword"
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
