import React from "react";
import "./App.css"; // Import the CSS file
// import backgroundImage from "../images/frontimage.jpg"; // Background image import
import Sidebar from "../components/Sidebar"; // Sidebar component
import Topbar from "../components/Topbar"; // Topbar component
import MessageForm from "../components/MessageForm";
const App: React.FC = () => {
  return (
    <div
      className="app-container"
      // style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Sidebar /> {/* Sidebar remains the same */}
      <div className="main-content">
        <Topbar /> {/* Topbar component */}
        <div className="content-area">
          <h1>Welcome to SunClimate Chronicles</h1>
          <p>An all-in-one app to understand climate change</p>
          <h2>See what you can do..</h2>
          <MessageForm />
        </div>
      </div>
    </div>
  );
};

export default App;
