import React, { useState, useEffect } from "react";
import "./App.css"; // Import the CSS file
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
import EducationalResources from "../components/EducationalResources";
import GlobalData from "../components/Dataset_Visualize/GlobalData";

import MyArea from "../components/Dataset_Visualize/MyArea";
import AccountInfo from "../components/Basics/AccountInfo";
import LoginSignupPage from "../components/Separate_Pages/LoginSignupPage";

import AboutUs from "../components/Separate_Pages/AboutUs";
import ContactUs from "../components/Basics/ContactUs";
import MiCASAFluxComparison from "../components/MiCasa_Carbon_Flux/MiCASAFluxComparison";
import CH4FluxComparison from "../components/CH4/CH4FluxComparison";
import Graph from "../components/Dataset_Visualize/Graph";
import Map from "../components/Dataset_Visualize/Map";
import Statistics from "../components/Dataset_Visualize/Statistics";
import CH4MapWithDataPage from "../components/CH4/CH4MapWithDataPage";
import MethaneFluxGlobe from "../components/CH4/MethaneFluxGlobe";
import NasaData from "../components/Separate_Pages/NasaData";
import MiCasaMapWithDataPage from "../components/MiCasa_Carbon_Flux/MiCasaMapWithDataPage";
import AirSeaCO2FluxComparison from "../components/AirSeaCO2/AirSeaCO2FluxComparison";

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const savedLoginStatus = localStorage.getItem("isLoggedIn");
    return savedLoginStatus === "true";
  });

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn.toString());
  }, [isLoggedIn]);

  const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    if (!isLoggedIn) {
      return <Navigate to="/" />;
    }
    return children;
  };

  return (
    <Router>
      <div className="app-container">
        <div className="main-content">
          <Topbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          <Routes>
            <Route
              path="/"
              element={
                <Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
              }
            />
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
              path="/my-area"
              element={
                <ProtectedRoute>
                  <MyArea />
                </ProtectedRoute>
              }
            />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/account-info" element={<AccountInfo />} />
            <Route
              path="/air-sea-co2-comparison"
              element={<AirSeaCO2FluxComparison />}
            />
            <Route
              path="/carbon-micasa-comparison"
              element={<MiCASAFluxComparison />}
            />
            <Route
              path="/micasa-map-with-data"
              element={<MiCasaMapWithDataPage />}
            />
            <Route
              path="/ch4-flux-comparison"
              element={<CH4FluxComparison />}
            />
            <Route path="/ch4-map-with-data" element={<CH4MapWithDataPage />} />

            <Route path="/methane-flux-globe" element={<MethaneFluxGlobe />} />
            <Route path="/nasa-data" element={<NasaData />} />
          </Routes>
          <Character currentPath={window.location.pathname} />
          <Footer />
        </div>
      </div>
    </Router>
  );
};

export default App;
