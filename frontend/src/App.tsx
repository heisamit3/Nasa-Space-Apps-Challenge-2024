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
import Sidebar from "../components/Sidebar"; // Sidebar component
import Topbar from "../components/Topbar"; // Topbar component
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
import LoginSignupPage from "../components/LoginSignupPage"; // Import LoginSignupPage
import SignUpPage from "../components/SignUpPage"; // Import SignUpPage

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
              element={<LoginSignupPage onClose={() => {}} setIsLoggedIn={setIsLoggedIn} />}
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
          </Routes>
          <Character currentPath={window.location.pathname} />
          <Footer /> {/* Footer component */}
        </div>
      </div>
    </Router>
  );
};

export default App;
