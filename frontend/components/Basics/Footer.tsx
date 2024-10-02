// Footer.tsx
import React from "react";
import "../../css/Footer.css"; // Import your CSS file for styling

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <p>
        © {new Date().getFullYear()} SunClimate Chronicles. All Rights Reserved.
      </p>
      <p>
        Follow us on:
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          {" "}
          Twitter
        </a>{" "}
        |
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          Facebook
        </a>{" "}
        |
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          Instagram
        </a>
      </p>
    </footer>
  );
};

export default Footer;
