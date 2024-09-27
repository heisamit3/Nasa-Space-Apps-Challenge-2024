import React, { useState } from 'react';
import { FaUser, FaTimes } from 'react-icons/fa'; // Import close icon
import '../css/LoginSignup.css'; // Optional: Add your CSS here

interface LoginSignupPageProps {
  onClose: () => void; // Prop to handle closing the page
}

const LoginSignupPage: React.FC<LoginSignupPageProps> = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="container">
      <FaTimes className="close-icon" onClick={onClose} /> {/* Move close button here */}
      <div className="header">
        <FaUser className="icon" />
        <h2>{isLogin ? 'Sign In' : 'Sign Up'}</h2>
      </div>

      <form className="form">
        {!isLogin && (
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="Enter your name" />
          </div>
        )}
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Enter your email" />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="Enter your password" />
        </div>

        <button type="submit" className="btn">
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
      </form>

      <div className="footer">
        <p>
          {isLogin ? 'Don\'t have an account?' : 'Already have an account?'}{' '}
          <span onClick={toggleMode} className="toggle-link">
            {isLogin ? 'Sign Up' : 'Login'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginSignupPage;
