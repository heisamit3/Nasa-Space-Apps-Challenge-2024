import React, {useState} from "react";
import "./App.css"; // Import the CSS file
// import backgroundImage from "../images/frontimage.jpg"; // Background image import
import Sidebar from "../components/Sidebar"; // Sidebar component
import Topbar from "../components/Topbar"; // Topbar component
import MessageForm from "../components/MessageForm";
import SpinningEarth from "../components/SpinningEarth"; // SpinningEarth component
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "../components/Home";
import Dashboard from "../components/Dashboard";
import Footer from "../components/Footer";
import Character from "../components/Character";


const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    if (!isLoggedIn) {
      // If the user is not logged in, navigate to the homepage
      return <Navigate to="/" />;
    }

    return children; // If logged in, allow access to the route
  };

  return (
    <Router>
      <div
        className="app-container"
        // style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="main-content">
          <Topbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} /> {/* Topbar component */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          </Routes>

          <Character currentPath={window.location.pathname} /> 


          <Footer /> {/* Footer component */}
        </div>
      </div>
    </Router>
  );
};

export default App;
