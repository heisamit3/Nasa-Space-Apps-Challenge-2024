import React from "react";
import {
  FaUser,
  FaMapMarkerAlt,
  FaPhone,
  FaHeart,
  FaCalendarAlt,
  FaEnvelope,
} from "react-icons/fa"; // Importing icons
import "../../css/AccountInfo.css"; // Import CSS file for styling

interface UserInfo {
  fullName: string;
  location: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  interests: string[];
  age: number;
  phoneNumber: string;
  email: string; // Add email field
}

const AccountInfo: React.FC = () => {
  // Sample user information data (this could be fetched from an API in a real application)
  const userInfo: UserInfo = {
    fullName: "John Doe",
    location: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      country: "USA",
      postalCode: "10001",
    },
    interests: ["Energy", "Agriculture"],
    age: 30,
    phoneNumber: "(123) 456-7890",
    email: "john.doe@example.com", // Add sample email
  };

  return (
    <div className="account-info-container">
      {/* Header section */}
      <div className="header-section">
        <FaUser className="user-icon" />
        <h2>{userInfo.fullName}'s Information</h2>
      </div>

      {/* Information cards */}
      <div className="info-card">
        <FaMapMarkerAlt className="info-icon" />
        <div className="info-details">
          <h3>Location</h3>
          <p>
            {userInfo.location.street}, {userInfo.location.city},{" "}
            {userInfo.location.state}, {userInfo.location.country} -{" "}
            {userInfo.location.postalCode}
          </p>
        </div>
      </div>

      <div className="info-card">
        <FaHeart className="info-icon" />
        <div className="info-details">
          <h3>Interests</h3>
          <p>{userInfo.interests.join(", ")}</p>
        </div>
      </div>

      <div className="info-card">
        <FaCalendarAlt className="info-icon" />
        <div className="info-details">
          <h3>Age</h3>
          <p>{userInfo.age} years</p>
        </div>
      </div>

      <div className="info-card">
        <FaPhone className="info-icon" />
        <div className="info-details">
          <h3>Phone Number</h3>
          <p>{userInfo.phoneNumber}</p>
        </div>
      </div>

      {/* Email section */}
      <div className="info-card">
        <FaEnvelope className="info-icon" />
        <div className="info-details">
          <h3>Email</h3>
          <p>{userInfo.email}</p>
        </div>
      </div>
    </div>
  );
};

export default AccountInfo;
