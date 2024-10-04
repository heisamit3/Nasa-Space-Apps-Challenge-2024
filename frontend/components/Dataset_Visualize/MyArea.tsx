// import React, { useState, useEffect } from "react";
// import { Line } from "react-chartjs-2";
// import { Chart, registerables } from "chart.js";
// import axios from "axios"; // Import Axios
// import "../../css/MyArea.css";
// Chart.register(...registerables);

// interface MyAreaProps {
//   email: string; // Receive email as prop from parent component
// }

// const MyArea: React.FC<MyAreaProps> = ({ email }) => {
//   const [stories, setStories] = useState<string[]>([
//     "The first story about climate change...",
//     "Another user's inspiring story...",
//   ]);
//   const [newStory, setNewStory] = useState<string>("");
//   const [showStories, setShowStories] = useState<boolean>(false);
//   const [showTextArea, setShowTextArea] = useState<boolean>(false);

//   // Fetch stories when the component mounts
//   useEffect(() => {
//     const fetchStories = async () => {
//       try {
//         const response = await axios.post(`http://localhost:8000/api/getstories/`, { email });
//         if (response.status === 200) {
//           const storiesData = response.data.stories.map(
//             (story: { profile_name: string; text: string; city: string }) =>
//               `${story.profile_name} from ${story.city}: ${story.text}`
//           );
//           setStories(storiesData); // Update the state with fetched stories
//         }
//       } catch (error) {
//         console.error("Error fetching stories:", error);
//       }
//     };

//     fetchStories();
//   }, [email]);

//   // Handle story submission
//   const handleSubmitStory = async () => {
//     if (newStory.trim()) {
//       console.log("Submitting story:", newStory);
//       try {
//         const response = await axios.post(`http://localhost:8000/api/setstory/`, {
//           email, // Use actual user's email
//           text: newStory,
//         });
//         console.log({email});
//         console.log(response);
//         if (response.status === 201) {
//           alert("Story created successfully!");
//           setStories([...stories, newStory]); // Add the new story to the list
//           setNewStory("");
//           setShowTextArea(false); // Hide the textarea after submission
//         }
//       } catch (error) {
//         console.error("Error creating story:", error);
//         alert("Failed to submit story. Please try again.");
//       }
//     } else {
//       alert("Please write something before submitting.");
//     }
//   };

//   // Toggle stories visibility
//   const toggleStories = () => {
//     setShowStories(!showStories);
//   };

//   // States for alert form inputs
//   const [showAlertForm, setShowAlertForm] = useState<boolean>(false);
//   const [subject, setSubject] = useState<string>("");
//   const [message, setMessage] = useState<string>("");
//   const [recipients, setRecipients] = useState<string>("");
//   const [users, setUsers] = useState<string[]>([]);
//   const [loadingUsers, setLoadingUsers] = useState<boolean>(true);
//   const [showAlerts, setShowAlerts] = useState(false);
//   const [alertText, setAlertText] = useState("");  
//   const [alerts, setAlerts] = useState<string[]>([]);
  

//   // Fetch users from backend
//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await axios.get("/api/users/");
//         const usersList = response.data.map(
//           (user: { email: string }) => user.email
//         );
//         setUsers(usersList);
//         setRecipients(usersList.join(", ")); // Set default recipients to all users
//         setLoadingUsers(false);
//       } catch (error) {
//         console.error("Error fetching users:", error);
//         setLoadingUsers(false);
//       }
//     };

//     fetchUsers();
//   }, []);
//   const fetchAlerts = async () => {
//     try {
//       const response = await axios.post("http://localhost:8000/api/get_alerts/", { email });
//       if (response.status === 200) {
//         const alertsData = response.data.alerts.map(
//           (alert: { sender_name: string; text: string; city: string }) =>
//             `${alert.sender_name} from ${alert.city}: ${alert.text}`
//         );
//         setAlerts(alertsData);
//       }
//     } catch (error) {
//       console.error("Error fetching alerts:", error);
//     }
//   };
//   // Handle email alert submission
//   const handleAlertSubmit = async () => {
//     if (alertText.trim()) {
//       try {
//         const response = await axios.post("http://localhost:8000/api/set_alert/", {
//           email,
//           text: alertText,
//         });
//         if (response.status === 201) {
//           alert("Alert created successfully!");
//           setAlertText(""); // Clear the alert text after submission
//         }
//       } catch (error) {
//         console.error("Error creating alert:", error);
//         alert("Failed to create alert. Please try again.");
//       }
//     } else {
//       alert("Please write an alert before submitting.");
//     }
//   };

//   return (
//     <div>
//       <h1>Welcome to My Area</h1>

//       <div className="stories-section">
//         <div className="stories-container">
//           <button className="button" onClick={toggleStories}>
//             {showStories ? "Hide Stories" : "See Other Stories"}
//           </button>

//           {showStories && (
//             <div className="existing-stories">
//               <h3>Stories</h3>
//               <ul>
//                 {stories.map((story, index) => (
//                   <li key={index}>{story}</li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {/* Share Story Section */}
//           {!showTextArea && (
//             <button
//               className="button"
//               onClick={() => setShowTextArea(true)}
//               style={{ marginTop: "10px" }}
//             >
//               Share Your Story
//             </button>
//           )}

//           {showTextArea && (
//             <div className="share-story">
//               <textarea
//                 value={newStory}
//                 onChange={(e) => setNewStory(e.target.value)}
//                 style={{ margin: "10px" }}
//                 placeholder="Write your story..."
//               />
//               <button className="button" onClick={handleSubmitStory}>
//                 Submit
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//           {/* Alerts Section */}
//       <div className="alert-section">
//         <button
//           onClick={() => {
//             fetchAlerts();
//             setShowAlerts(!showAlerts);
//           }}
//           className="button"
//           style={{ margin: "10px" }}
//         >
//           {showAlerts ? "Hide Alerts" : "Get Alerts"}
//         </button>

//         {showAlerts && (
//           <div className="alerts-list">
//             <h3>Alerts:</h3>
//             <ul>
//               {alerts.map((alert, index) => (
//                 <li key={index}>{alert}</li>
//               ))}
//             </ul>

//             {/* Alert Submission Section */}
//             <div className="alert-form">
//               <textarea
//                 value={alertText}
//                 onChange={(e) => setAlertText(e.target.value)}
//                 placeholder="Write your alert..."
//                 style={{ marginBottom: "10px", display: "block" }}
//               />
//               <button className="button" onClick={handleAlertSubmit}>
//                 Submit Alert
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
      
//     </div>
//   );
// };

// export default MyArea;
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/MyArea.css";

interface MyAreaProps {
  email: string; // Receive email as prop from parent component
}

const MyArea: React.FC<MyAreaProps> = ({ email }) => {
  const [stories, setStories] = useState<string[]>([]);
  const [newStory, setNewStory] = useState<string>("");
  const [showStories, setShowStories] = useState<boolean>(false);
  const [showTextArea, setShowTextArea] = useState<boolean>(false);
  const [alerts, setAlerts] = useState<string[]>([]);
  const [showAlerts, setShowAlerts] = useState(false);
  const [alertText, setAlertText] = useState("");

  // Function to clear the previous session and refresh data when email changes
  const refreshData = () => {
    setStories([]); // Clear stories
    setAlerts([]); // Clear alerts
  };

  // UseEffect to detect when the logged-in email changes and refresh automatically
  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    console.log({ storedEmail, email });
    // Detect if the user email has changed and refresh data
    if (storedEmail && storedEmail !== email) {
      refreshData();
      console.log({ storedEmail, email });
      localStorage.setItem("email", email); // Update email in localStorage
    } else if (!storedEmail) {
      // If no email was previously stored, set the current email
      localStorage.setItem("email", email);
    }

    // Fetch new data (stories and alerts) after email has been detected/changed
    fetchStories();
    fetchAlerts();
  }, [email]); // Re-run this effect whenever the email prop changes

  // Function to fetch stories
  const fetchStories = async () => {
    try {
      const response = await axios.post(`http://localhost:8000/api/getstories/`, { email });
      if (response.status === 200) {
        const storiesData = response.data.stories.map(
          (story: { profile_name: string; text: string; city: string }) =>
            `${story.profile_name} from ${story.city}: ${story.text}`
        );
        setStories(storiesData);
      }
    } catch (error) {
      console.error("Error fetching stories:", error);
    }
  };

  // Function to fetch alerts
  const fetchAlerts = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/get_alerts/", { email });
      if (response.status === 200) {
        const alertsData = response.data.alerts.map(
          (alert: { sender_name: string; text: string; city: string }) =>
            `${alert.sender_name} from ${alert.city}: ${alert.text}`
        );
        setAlerts(alertsData);
      }
    } catch (error) {
      console.error("Error fetching alerts:", error);
    }
  };

  // Handle story submission
  const handleSubmitStory = async () => {
    if (newStory.trim()) {
      try {
        const response = await axios.post(`http://localhost:8000/api/setstory/`, {
          email,
          text: newStory,
        });
        if (response.status === 201) {
          alert("Story created successfully!");
          setStories([...stories, newStory]); // Add new story to the list
          setNewStory("");
          setShowTextArea(false); // Hide the textarea after submission
        }
      } catch (error) {
        console.error("Error creating story:", error);
        alert("Failed to submit story. Please try again.");
      }
    } else {
      alert("Please write something before submitting.");
    }
  };

  // Handle alert submission
  const handleAlertSubmit = async () => {
    if (alertText.trim()) {
      try {
        const response = await axios.post("http://localhost:8000/api/set_alert/", {
          email,
          text: alertText,
        });
        if (response.status === 201) {
          alert("Alert created successfully!");
          setAlertText(""); // Clear the alert text after submission
        }
      } catch (error) {
        console.error("Error creating alert:", error);
        alert("Failed to create alert. Please try again.");
      }
    } else {
      alert("Please write an alert before submitting.");
    }
  };

  return (
    <div>
      <h1>Welcome to My Area</h1>

      {/* Stories Section */}
      <div className="stories-section">
        <button className="button" onClick={() => setShowStories(!showStories)}>
          {showStories ? "Hide Stories" : "See Other Stories"}
        </button>

        {showStories && (
          <div className="existing-stories">
            <h3>Stories</h3>
            <ul>
              {stories.map((story, index) => (
                <li key={index}>{story}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Share Story Section */}
        {!showTextArea && (
          <button
            className="button"
            onClick={() => setShowTextArea(true)}
            style={{ marginTop: "10px" }}
          >
            Share Your Story
          </button>
        )}

        {showTextArea && (
          <div className="share-story">
            <textarea
              value={newStory}
              onChange={(e) => setNewStory(e.target.value)}
              style={{ margin: "10px" }}
              placeholder="Write your story..."
            />
            <button className="button" onClick={handleSubmitStory}>
              Submit
            </button>
          </div>
        )}
      </div>

      {/* Alerts Section */}
      <div className="alert-section">
        <button
          onClick={() => setShowAlerts(!showAlerts)}
          className="button"
          style={{ margin: "10px" }}
        >
          {showAlerts ? "Hide Alerts" : "Get Alerts"}
        </button>

        {showAlerts && (
          <div className="alerts-list">
            <h3>Alerts:</h3>
            <ul>
              {alerts.map((alert, index) => (
                <li key={index}>{alert}</li>
              ))}
            </ul>

            {/* Alert Submission Section */}
            <div className="alert-form">
              <textarea
                value={alertText}
                onChange={(e) => setAlertText(e.target.value)}
                placeholder="Write your alert..."
                style={{ marginBottom: "10px", display: "block" }}
              />
              <button className="button" onClick={handleAlertSubmit}>
                Submit Alert
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyArea;
