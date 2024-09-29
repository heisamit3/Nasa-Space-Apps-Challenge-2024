// HomePage.tsx
import React from "react";
import SpinningEarth from "./SpinningEarth"; // Adjust the path as necessary
import MessageForm from "./MessageForm"; // Adjust the path as necessary

const HomePage: React.FC = () => {
  return (
    <div className="content-area">
      <h1>Spinning Earth - Climate Change Awareness</h1>
      <SpinningEarth />
      <MessageForm />
    </div>
  );
};

export default HomePage;
