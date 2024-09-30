import React from "react";
import "../css/AboutUs.css"; // Assuming you have some CSS for styling

const AboutUs: React.FC = () => {
  return (
    <div className="about-us-container">
      <h1>About SunClimate Chronicles</h1>
      <p>
        Welcome to <strong>SunClimate Chronicles</strong>! We are a passionate
        team of innovators and storytellers participating in the prestigious
        NASA Space Apps Challenge.
      </p>
      <div className="divider"></div>
      <h2>Our Mission</h2>
      <p>
        Our mission is to harness the power of data and storytelling to address
        the most pressing climate issues facing our planet today.
      </p>
      <p>
        Through <strong>SunClimate Chronicles</strong>, we strive to engage
        communities with powerful narratives that inform and inspire action on
        climate change.
      </p>
      <div className="divider"></div>
      <h2>Our Vision</h2>
      <p>
        We believe that technology and data can empower communities to make a
        positive difference in the fight against climate change.
      </p>
    </div>
  );
};

export default AboutUs;
