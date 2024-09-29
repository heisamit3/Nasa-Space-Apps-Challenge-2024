import React, { useState } from "react";
import { FaUser, FaTimes } from "react-icons/fa"; // Import close icon
import "../css/LoginSignup.css"; // Import your CSS here
import { useNavigate } from "react-router-dom";

interface LoginSignupPageProps {
  onClose: () => void;
  setIsLoggedIn: (loggedIn: boolean) => void; // Add setIsLoggedIn prop
}

const LoginSignupPage: React.FC<LoginSignupPageProps> = ({ onClose, setIsLoggedIn }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const navigate = useNavigate();

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLogin) {
      // Handle login logic here
      console.log("Logging in with:", {
        email: event.currentTarget.email.value,
        password,
      });

      // Set isLoggedIn to true
      setIsLoggedIn(true);
      onClose();
      navigate("/dashboard");
    } else {
      // Handle signup logic here
      if (password === retypePassword) {
        console.log("Signing up with:", {
          email: event.currentTarget.email.value,
          password,
        });
      } else {
        alert("Passwords do not match!");
      }
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
          <>
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
          </>
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
