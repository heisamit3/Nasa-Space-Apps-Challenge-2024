import React from "react";
import "./App.css";
import backgroundImage from "../images/frontimage.jpg";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import SlideShow from "../components/SlideShow";
import MessageForm from "../components/MessageForm"; // Import MessageForm

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
          <h2>Welcome to SunClimate Chronicles</h2>
          <p>An all-in-one app to understand climate change</p>

          {/* Integrating the MessageForm component here */}
          <MessageForm />

          <SlideShow />
        </div>
      </div>
    </div>
  );
};

export default App;
