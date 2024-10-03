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


// Import the combined CH4 map and data component
import CH4MapWithDataPage from "../components/CH4/CH4MapWithDataPage"; // Combined CH4 map and data page component
// import CH4MapComponent from "../components/CH4/CH4MapComponent"; // Import your CH4MapComponent
// import CH4DataPage from "../components/CH4/CH4DataPage"; // Import your CH4DataPage
import MethaneFluxGlobe from "../components/CH4/MethaneFluxGlobe"; // Import your MethaneFluxGlobe
import NasaData from "../components/Separate_Pages/NasaData"; // Import your NasaData


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
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/account-info" element={<AccountInfo />} />
            <Route
              path="/carbon-data-visualization"
              element={<CarbonDataVisualization />}
            />
            <Route
              path="/ch4-flux-comparison"
              element={<CH4FluxComparison />}
            />

            {/* New unified CH4 map and data page */}
            <Route path="/ch4-map-with-data" element={<CH4MapWithDataPage />} />
            {/* <Route path="/ch4-map" element={<CH4MapComponent />} />
            <Route path="/ch4-data-show" element={<CH4DataPage />} /> */}
            <Route path="/methane-flux-globe" element={<MethaneFluxGlobe />} />
            <Route path="nasa-data" element={<NasaData />} />

          </Routes>
          <Character currentPath={window.location.pathname} />
          <Footer />
        </div>
      </div>
    </Router>
  );
};

export default App;
