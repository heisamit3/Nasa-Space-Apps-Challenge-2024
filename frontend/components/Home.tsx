// HomePage.tsx
import React from "react";
import SpinningEarth from "./SpinningEarth"; // Adjust the path as necessary
import MessageForm from "./MessageForm"; // Adjust the path as necessary
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const handleButtonClick = (path: string) => {
    navigate(path); // Redirect to the specified path
  };

  return (
    <div className="content-area">
      <h1>Spinning Earth - Climate Change Awareness</h1>
      <SpinningEarth />
      <MessageForm />
    </div>
  );
};

export default HomePage;
