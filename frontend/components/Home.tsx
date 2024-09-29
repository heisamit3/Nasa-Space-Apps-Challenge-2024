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
      <div className="button-container">
        <div
          className="button"
          onClick={() => handleButtonClick("/global-data")}
        >
          <h3>Global Data</h3>
        </div>
        <div
          className="button"
          onClick={() => handleButtonClick("/educational-resources")}
        >
          <h3>Educational Resources</h3>
        </div>
        <div
          className="button"
          onClick={() => handleButtonClick("/sectors-responsible")}
        >
          <h3>Sectors Responsible</h3>
        </div>
      </div>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
      consectetur, turpis eget ultricies tincidunt, ipsum sapien consectetur
      nunc, id ultricies nunc odio sit amet justo. Nulla facilisi. Sed nec enim
      non ex tincidunt tristique. Sed et consectetur mi. Phasellus nec erat nec
      purus ultricies condimentum. Nullam et dui et Lorem ipsum dolor sit amet,
      consectetur adipiscing elit. Nullam consectetur, turpis eget ultricies
      tincidunt, ipsum sapien consectetur nunc, id ultricies nunc odio sit amet
      justo. Nulla facilisi. Sed nec enim non ex tincidunt tristique. Sed et
      consectetur mi. Phasellus nec erat nec purus ultricies condimentum. Nullam
      et dui et Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
      consectetur, turpis eget ultricies tincidunt, ipsum sapien consectetur
      nunc, id ultricies nunc odio sit amet justo. Nulla facilisi. Sed nec enim
      non ex tincidunt tristique. Sed et consectetur mi. Phasellus nec erat nec
      purus ultricies condimentum. Nullam et dui et Lorem ipsum dolor sit amet,
      consectetur adipiscing elit. Nullam consectetur, turpis eget ultricies
      tincidunt, ipsum sapien consectetur nunc, id ultricies nunc odio sit amet
      justo. Nulla facilisi. Sed nec enim non ex tincidunt tristique. Sed et
      consectetur mi. Phasellus nec erat nec purus ultricies condimentum. Nullam
      et dui et Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
      consectetur, turpis eget ultricies tincidunt, ipsum sapien consectetur
      nunc, id ultricies nunc odio sit amet justo. Nulla facilisi. Sed nec enim
      non ex tincidunt tristique. Sed et consectetur mi. Phasellus nec erat nec
      purus ultricies condimentum. Nullam et dui et Lorem ipsum dolor sit amet,
      consectetur adipiscing elit. Nullam consectetur, turpis eget ultricies
      tincidunt, ipsum sapien consectetur nunc, id ultricies nunc odio sit amet
      justo. Nulla facilisi. Sed nec enim non ex tincidunt tristique. Sed et
      consectetur mi. Phasellus nec erat nec purus ultricies condimentum. Nullam
      et dui et Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
      consectetur, turpis eget ultricies tincidunt, ipsum sapien consectetur
      nunc, id ultricies nunc odio sit amet justo. Nulla facilisi. Sed nec enim
      non ex tincidunt tristique. Sed et consectetur mi. Phasellus nec erat nec
      purus ultricies condimentum. Nullam et dui et Lorem ipsum dolor sit amet,
      consectetur adipiscing elit. Nullam consectetur, turpis eget ultricies
      tincidunt, ipsum sapien consectetur nunc, id ultricies nunc odio sit amet
      justo. Nulla facilisi. Sed nec enim non ex tincidunt tristique. Sed et
      consectetur mi. Phasellus nec erat nec purus ultricies condimentum. Nullam
      et dui et Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
      consectetur, turpis eget ultricies tincidunt, ipsum sapien consectetur
      nunc, id ultricies nunc odio sit amet justo. Nulla facilisi. Sed nec enim
      non ex tincidunt tristique. Sed et consectetur mi. Phasellus nec erat nec
      purus ultricies condimentum. Nullam et dui et Lorem ipsum dolor sit amet,
      consectetur adipiscing elit. Nullam consectetur, turpis eget ultricies
      tincidunt, ipsum sapien consectetur nunc, id ultricies nunc odio sit amet
      justo. Nulla facilisi. Sed nec enim non ex tincidunt tristique. Sed et
      consectetur mi. Phasellus nec erat nec purus ultricies condimentum. Nullam
      et dui et Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
      consectetur, turpis eget ultricies tincidunt, ipsum sapien consectetur
      nunc, id ultricies nunc odio sit amet justo. Nulla facilisi. Sed nec enim
      non ex tincidunt tristique. Sed et consectetur mi. Phasellus nec erat nec
      purus ultricies condimentum. Nullam et dui et Lorem ipsum dolor sit amet,
      consectetur adipiscing elit. Nullam consectetur, turpis eget ultricies
      tincidunt, ipsum sapien consectetur nunc, id ultricies nunc odio sit amet
      justo. Nulla facilisi. Sed nec enim non ex tincidunt tristique. Sed et
      consectetur mi. Phasellus nec erat nec purus ultricies condimentum. Nullam
      et dui et Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
      consectetur, turpis eget ultricies tincidunt, ipsum sapien consectetur
      nunc, id ultricies nunc odio sit amet justo. Nulla facilisi. Sed nec enim
      non ex tincidunt tristique. Sed et consectetur mi. Phasellus nec erat nec
      purus ultricies condimentum. Nullam et dui et Lorem ipsum dolor sit amet,
      consectetur adipiscing elit. Nullam consectetur, turpis eget ultricies
      tincidunt, ipsum sapien consectetur nunc, id ultricies nunc odio sit amet
      justo. Nulla facilisi. Sed nec enim non ex tincidunt tristique. Sed et
      consectetur mi. Phasellus nec erat nec purus ultricies condimentum. Nullam
      et dui et Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
      consectetur, turpis eget ultricies tincidunt, ipsum sapien consectetur
      nunc, id ultricies nunc odio sit amet justo. Nulla facilisi. Sed nec enim
      non ex tincidunt tristique. Sed et consectetur mi. Phasellus nec erat nec
      purus ultricies condimentum. Nullam et dui et
    </div>
  );
};

export default HomePage;
