// import React from "react";
// import {
//   FaUser,
//   FaMapMarkerAlt,
//   FaPhone,
//   FaCalendarAlt,
//   FaEnvelope,
// } from "react-icons/fa"; // Importing icons
// import "../../css/AccountInfo.css"; // Import CSS file for styling

// interface UserInfo {
//   fullName: string;
//   city: string;
//   age: number;
//   phoneNumber: string;
//   email: string; // Add email field
// }

// const AccountInfo: React.FC = () => {
//   // Sample user information data (this could be fetched from an API in a real application)
//   const userInfo: UserInfo = {
//     fullName: "John Doe",
//     city: "New York",
//     age: 30,
//     phoneNumber: "(123) 456-7890",
//     email: "john.doe@example.com", // Add sample email
//   };

//   return (
//     <div className="account-info-container">
//       {/* Header section */}
//       <div className="header-section">
//         <FaUser className="user-icon" />
//         <h2>{userInfo.fullName}'s Information</h2>
//       </div>

//       {/* Information cards */}
//       <div className="info-card">
//         <FaMapMarkerAlt className="info-icon" />
//         <div className="info-details">
//           <h3>Location</h3>
//           <p>
//             {userInfo.city}
//           </p>
//         </div>
//       </div>

//       <div className="info-card">
//         <FaCalendarAlt className="info-icon" />
//         <div className="info-details">
//           <h3>Age</h3>
//           <p>{userInfo.age} years</p>
//         </div>
//       </div>

//       <div className="info-card">
//         <FaPhone className="info-icon" />
//         <div className="info-details">
//           <h3>Phone Number</h3>
//           <p>{userInfo.phoneNumber}</p>
//         </div>
//       </div>

//       {/* Email section */}
//       <div className="info-card">
//         <FaEnvelope className="info-icon" />
//         <div className="info-details">
//           <h3>Email</h3>
//           <p>{userInfo.email}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AccountInfo;
// import React, { useEffect, useState } from "react";
// import {
//   FaUser,
//   FaMapMarkerAlt,
//   FaPhone,
//   FaCalendarAlt,
//   FaEnvelope,
// } from "react-icons/fa"; // Importing icons
// import "../../css/AccountInfo.css"; // Import CSS file for styling

// interface UserInfo {
//   fullName: string;
//   city: string;
//   age: number;
//   phoneNumber: string;
//   email: string; // Add email field
// }

// interface AccountInfoProps {
//   email: string; // Prop to receive email
// }

// const AccountInfo: React.FC<AccountInfoProps> = ({ email }) => {
//   const [userInfo, setUserInfo] = useState<UserInfo | null>(null); // State for user info

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await fetch(`/api/users?email=${email}`); // Adjust the API endpoint as needed
//         if (!response.ok) {
//           throw new Error("Failed to fetch user data");
//         }
//         const data = await response.json();
//         setUserInfo(data); // Set the user info received from the backend
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     if (email) {
//       fetchUserData(); // Fetch data only if email is provided
//     }
//   }, [email]);

//   // Fallback if user info is not loaded yet
//   if (!userInfo) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="account-info-container">
//       {/* Header section */}
//       <div className="header-section">
//         <FaUser className="user-icon" />
//         <h2>{userInfo.fullName}'s Information</h2>
//       </div>

//       {/* Information cards */}
//       <div className="info-card">
//         <FaMapMarkerAlt className="info-icon" />
//         <div className="info-details">
//           <h3>Location</h3>
//           <p>{userInfo.city}</p>
//         </div>
//       </div>

//       <div className="info-card">
//         <FaCalendarAlt className="info-icon" />
//         <div className="info-details">
//           <h3>Age</h3>
//           <p>{userInfo.age} years</p>
//         </div>
//       </div>

//       <div className="info-card">
//         <FaPhone className="info-icon" />
//         <div className="info-details">
//           <h3>Phone Number</h3>
//           <p>{userInfo.phoneNumber}</p>
//         </div>
//       </div>

//       {/* Email section */}
//       <div className="info-card">
//         <FaEnvelope className="info-icon" />
//         <div className="info-details">
//           <h3>Email</h3>
//           <p>{userInfo.email}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AccountInfo;

import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaMapMarkerAlt,
  FaPhone,
  FaCalendarAlt,
  FaEnvelope,
} from "react-icons/fa"; // Importing icons
import "../../css/AccountInfo.css"; // Import CSS file for styling

interface UserInfo {
  full_name: string;
  city: string;
  age: number;
  phone_number: string;
  email: string; // Add email field
}

interface AccountInfoProps {
  email: string; // Prop to receive email
}

const AccountInfo: React.FC<AccountInfoProps> = ({ email }) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null); // State for user info

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log(email);
        console.log("bhai");
        const response = await fetch(`http://localhost:8000/api/userprofile/`, {
          method: 'POST', // Change to POST request
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }), // Send email in the request body
        });
        console.log(email);
        console.log(response);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUserInfo(data); // Set the user info received from the backend
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (email) {
      fetchUserData(); // Fetch data only if email is provided
    }
  }, [email]);

  // Fallback if user info is not loaded yet
  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="account-info-container">
      {/* Header section */}
      <div className="header-section">
        <FaUser className="user-icon" />
        <h2>{userInfo.full_name}'s Information</h2>
      </div>

      {/* Information cards */}
      <div className="info-card">
        <FaMapMarkerAlt className="info-icon" />
        <div className="info-details">
          <h3>Location</h3>
          <p>{userInfo.city}</p>
        </div>
      </div>

      <div className="info-card">
        <FaPhone className="info-icon" />
        <div className="info-details">
          <h3>Phone Number</h3>
          <p>{userInfo.phone_number}</p>
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
