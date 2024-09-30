import React, { useState } from "react";
import "./App.css"; // Import the CSS file
import Sidebar from "../components/Sidebar"; // Sidebar component
import Topbar from "../components/Topbar"; // Topbar component
import MessageForm from "../components/MessageForm";
import SpinningEarth from "../components/SpinningEarth"; // SpinningEarth component
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "../components/Home";
import Dashboard from "../components/Dashboard";
import Footer from "../components/Footer";
import Character from "../components/Character";
import EducationalResources from "../components/EducationalResources";
import GlobalData from "../components/GlobalData";
import SectorsResponsible from "../components/SectorsResponsible";
import MyArea from "../components/MyArea";
import AboutUs from "../components/AboutUs"; // Import AboutUs component

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
      <div className="app-container">
        <div className="main-content">
          <Topbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          {/* Topbar component */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/global-data" element={<GlobalData />} />
            <Route
              path="/educational-resources"
              element={<EducationalResources />} // Add route for Educational Resources page
            />
            <Route
              path="/sectors-responsible"
              element={<SectorsResponsible />}
            />
            <Route
              path="/my-area"
              element={
                <ProtectedRoute>
                  <MyArea />
                </ProtectedRoute>
              }
            />
            <Route path="/about-us" element={<AboutUs />} />
            {/* Route for About Us */}
          </Routes>
          <Character currentPath={window.location.pathname} />
          <Footer /> {/* Footer component */}
        </div>
      </div>
    </Router>
  );
};

export default App;
