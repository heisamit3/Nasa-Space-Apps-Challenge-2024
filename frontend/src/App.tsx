import React from "react";
import "./App.css";
import backgroundImage from "../images/frontimage.jpg";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const App: React.FC = () => {
  return (
    <div
      className="background"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Sidebar />
      <div className="main-content">
        <Topbar />
        <div className="content-area">
          <h1>Welcome to SunClimate Chronicles</h1>
          <p>An all-in-one app to understand climate change</p>
          <h2>See what you can do..</h2>
        </div>
      </div>
    </div>
  );
};

export default App;