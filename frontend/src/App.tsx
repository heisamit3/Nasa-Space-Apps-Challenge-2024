import React, { useState, useEffect } from "react";
import "./App.css"; // Import the CSS file
// import backgroundImage from "../images/frontimage.jpg"; // Background image import
import Topbar from "../components/Basics/Topbar"; // Topbar component
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "../components/Basics/Home";
import Dashboard from "../components/Separate_Pages/Dashboard";
import Footer from "../components/Basics/Footer";
import Character from "../components/Basics/Character";
import EducationalResources from "../components/Separate_Pages/EducationalResources";
import GlobalData from "../components/Dataset_Visualize/GlobalData";
import SectorsResponsible from "../components/Separate_Pages/SectorsResponsible";
import MyArea from "../components/Dataset_Visualize/MyArea";
import AccountInfo from "../components/Basics/AccountInfo";
import LoginSignupPage from "../components/Separate_Pages/LoginSignupPage"; // Import LoginSignupPage
import SignUpPage from "../components/Basics/SignUpPage"; // Import SignUpPage
import AboutUs from "../components/Separate_Pages/AboutUs"; // Import AboutUs
import ContactUs from "../components/Basics/ContactUs"; // Import ContactUs
import CarbonDataVisualization from "../components/MiCasa_Carbon_Flux/CarbonDataVisualization"; // Import CarbonDataVisualization
import CH4FluxComparison from "../components/CH4/CH4FluxComparison";
import Graph from "../components/Dataset_Visualize/Graph";
import Map from "../components/Dataset_Visualize/Map";
import Statistics from "../components/Dataset_Visualize/Statistics";

import CH4MapComponent from "../components/CH4/CH4MapComponent"; // Import your CH4MapComponent
import CH4DataPage from "../components/CH4/CH4DataPage"; // Import your CH4DataPage
import MethaneFluxGlobe from "../components/CH4/MethaneFluxGlobe"; // Import your MethaneFluxGlobe

const App: React.FC = () => {
  // Initialize the login state from localStorage, defaulting to false if not found
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const savedLoginStatus = localStorage.getItem("isLoggedIn");
    return savedLoginStatus === "true"; // Returns true if 'isLoggedIn' in localStorage is "true", otherwise false
  });

  // Effect to update localStorage whenever the login state changes
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn.toString());
  }, [isLoggedIn]);

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
          <Topbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />{" "}
          {/* Topbar component */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={
                <LoginSignupPage
                  onClose={() => {}}
                  setIsLoggedIn={setIsLoggedIn}
                />
              }
            />
            <Route
              path="/signup-preferences"
              element={<SignUpPage setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/global-data" element={<GlobalData />} />
            <Route path="/graph" element={<Graph />} />
            <Route path="/map" element={<Map />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route
              path="/educational-resources"
              element={<EducationalResources />}
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
            <Route path="/contact-us" element={<ContactUs />} />
            {/* Route for Contact Us */}
            <Route path="/account-info" element={<AccountInfo />} />
            <Route
              path="/carbon-data-visualization"
              element={<CarbonDataVisualization />}
            />{" "}
            {/* Add the route for carbon data */}
            {/* Route for Contact Us */}
            {/* Add the new CH4 Flux Comparison route */}
            <Route
              path="/ch4-flux-comparison"
              element={<CH4FluxComparison />}
            />
            <Route path="/ch4-map" element={<CH4MapComponent />} />
            <Route path="/ch4-data-show" element={<CH4DataPage />} />
            <Route path="/methane-flux-globe" element={<MethaneFluxGlobe />} />
          </Routes>
          <Character currentPath={window.location.pathname} />
          <Footer /> {/* Footer component */}
        </div>
      </div>
    </Router>
  );
};

export default App;
