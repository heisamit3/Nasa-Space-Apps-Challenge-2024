// import React, { useState, useEffect } from "react";
// import "./App.css"; // Import the CSS file
// // import backgroundImage from "../images/frontimage.jpg"; // Background image import
// import Sidebar from "../components/Sidebar"; // Sidebar component
// import Topbar from "../components/Topbar"; // Topbar component
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// import Home from "../components/Home";
// import Dashboard from "../components/Dashboard";
// import Footer from "../components/Footer";
// import Character from "../components/Character";
// import EducationalResources from "../components/EducationalResources";
// import GlobalData from "../components/GlobalData";
// import SectorsResponsible from "../components/SectorsResponsible";
// import MyArea from "../components/MyArea";

// const App: React.FC = () => {
//   // Initialize the login state from localStorage, defaulting to false if not found
//   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
//     const savedLoginStatus = localStorage.getItem("isLoggedIn");
//     return savedLoginStatus === "true"; // Returns true if 'isLoggedIn' in localStorage is "true", otherwise false
//   });

//   // Effect to update localStorage whenever the login state changes
//   useEffect(() => {
//     localStorage.setItem("isLoggedIn", isLoggedIn.toString());
//   }, [isLoggedIn]);

//   const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
//     if (!isLoggedIn) {
//       // If the user is not logged in, navigate to the homepage
//       return <Navigate to="/" />;
//     }

//     return children; // If logged in, allow access to the route
//   };

//   return (
//     <Router>
//       <div
//         className="app-container"
//         // style={{ backgroundImage: `url(${backgroundImage})` }}
//       >
//         <div className="main-content">
//           <Topbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />{" "}
//           {/* Topbar component */}
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route
//               path="/dashboard"
//               element={
//                 <ProtectedRoute>
//                   <Dashboard />
//                 </ProtectedRoute>
//               }
//             />
//             <Route path="/global-data" element={<GlobalData />} />
//             <Route
//               path="/educational-resources"
//               element={<EducationalResources />}
//             />
//             <Route
//               path="/sectors-responsible"
//               element={<SectorsResponsible />}
//             />
//             <Route
//               path="/my-area"
//               element={
//                 <ProtectedRoute>
//                   <MyArea />
//                 </ProtectedRoute>
//               }
//             />
//           </Routes>
//           <Character currentPath={window.location.pathname} />
//           <Footer /> {/* Footer component */}
//         </div>
//       </div>
//     </Router>
//   );
// };

// export default App;
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
import GlobalData from "../components/Separate_Pages/GlobalData";
import SectorsResponsible from "../components/Separate_Pages/SectorsResponsible";
import MyArea from "../components/Separate_Pages/MyArea";
import AccountInfo from "../components/Basics/AccountInfo";
import LoginSignupPage from "../components/Separate_Pages/LoginSignupPage"; // Import LoginSignupPage
import SignUpPage from "../components/Basics/SignUpPage"; // Import SignUpPage
import AboutUs from "../components/Separate_Pages/AboutUs"; // Import AboutUs
import ContactUs from "../components/Basics/ContactUs"; // Import ContactUs
import CarbonDataVisualization from "../components/MiCasa_Carbon_Flux/CarbonDataVisualization"; // Import CarbonDataVisualization
import CH4FluxComparison from "../components/CH4/CH4FluxComparison"; // Import CH4FluxComparison
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
          </Routes>
          <Character currentPath={window.location.pathname} />
          <Footer /> {/* Footer component */}
        </div>
      </div>
    </Router>
  );
};

export default App;
