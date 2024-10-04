import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import axios from "axios"; // Import Axios
import "../../css/MyArea.css";
Chart.register(...registerables);

const MyArea: React.FC = () => {
  const co2Data = {
    labels: [
      "2000",
      "2001",
      "2002",
      "2003",
      "2004",
      "2005",
      "2006",
      "2007",
      "2008",
      "2009",
      "2010",
      "2011",
      "2012",
      "2013",
      "2014",
      "2015",
      "2016",
      "2017",
      "2018",
      "2019",
      "2020",
      "2021",
      "2022",
      "2023",
    ],
    datasets: [
      {
        label: "CO2 Levels (ppm)",
        data: [
          368, 370, 375, 378, 381, 384, 387, 390, 393, 396, 400, 404, 408, 412,
          416, 420, 424, 428, 432, 436, 440, 444, 448,
        ],
        borderColor: "rgba(255, 165, 0, 1)",
        backgroundColor: "rgba(255, 165, 0, 0.2)",
        fill: true,
        tension: 0.3,
      },
      {
        label: "Heat Rise (°C)",
        data: [
          14.5, 14.6, 14.7, 14.8, 14.9, 15.0, 15.1, 15.2, 15.3, 15.4, 15.5,
          15.6, 15.7, 15.8, 15.9, 16.0, 16.1, 16.2, 16.3, 16.4, 16.5, 16.6,
          16.7,
        ],
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const [stories, setStories] = useState<string[]>([
    "The first story about climate change...",
    "Another user's inspiring story...",
  ]);
  const [newStory, setNewStory] = useState<string>("");
  const [showStories, setShowStories] = useState<boolean>(false);
  const [showTextArea, setShowTextArea] = useState<boolean>(false);

  const handleShareStory = () => {
    setShowTextArea(true); // Show the textarea
  };

  const handleSubmitStory = () => {
    if (newStory.trim()) {
      setStories([...stories, newStory]);
      setNewStory("");
      setShowTextArea(false); // Hide the textarea after submission
    } else {
      alert("Please write something before submitting.");
      setShowTextArea(false); // Hide the textarea if it's empty
    }
  };

  const toggleStories = () => {
    setShowStories(!showStories);
  };

  const [showAlertForm, setShowAlertForm] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [recipients, setRecipients] = useState<string>("");
  const [users, setUsers] = useState<string[]>([]);
  const [loadingUsers, setLoadingUsers] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/users/");
        const usersList = response.data.map(
          (user: { email: string }) => user.email
        );
        setUsers(usersList);
        setRecipients(usersList.join(", ")); // Set default recipients
        setLoadingUsers(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoadingUsers(false);
      }
    };
    fetchUsers();
  }, []);

  const handleAlertSubmit = async () => {
    if (!recipients.trim()) {
      alert("Please enter at least one recipient.");
      return; // Stop execution if no recipients
    }
    if (email.trim() && subject.trim() && message.trim()) {
      try {
        const response = await axios.post("/api/send-email", {
          subject,
          message,
          recipients: recipients
            .split(",")
            .map((recipient) => recipient.trim()),
          email,
        });

        if (response.status === 200) {
          alert("Email alert sent successfully!");
        }
      } catch (error) {
        console.error("Error sending email alert", error);
        alert("Failed to send email alert. Please try again.");
      }
      setShowAlertForm(false);
      setEmail("");
      setSubject("");
      setMessage("");
      setRecipients("");
    } else {
      alert("Please fill in all fields before submitting.");
    }
  };

  return (
    <div className="enhanced-container">
      <h1 className="enhanced-header">Welcome to My Enhanced Area</h1>

      {/* Graph Section */}
      <div className="enhanced-graph-container">
        <h2>CO2 Levels and Heat Rise (2000 - 2023)</h2>
        <Line data={co2Data} options={{ responsive: true }} />
      </div>

      {/* Climate Stories Section */}
      <div className="enhanced-stories-section">
        <div className="enhanced-stories-container">
          <button className="enhanced-button" onClick={toggleStories}>
            {showStories ? "Hide Stories" : "View Climate Stories"}
          </button>

          {showStories && (
            <div className="enhanced-existing-stories">
              <h3>Climate Stories</h3>
              <ul>
                {stories.map((story, index) => (
                  <li key={index}>{story}</li>
                ))}
              </ul>
            </div>
          )}

          {!showTextArea && (
            <button
              className="enhanced-button"
              onClick={handleShareStory}
              style={{ marginTop: "10px" }}
            >
              Share Your Climate Story
            </button>
          )}

          {showTextArea && (
            <div className="enhanced-share-story">
              <textarea
                value={newStory}
                onChange={(e) => setNewStory(e.target.value)}
                style={{ margin: "10px" }}
                placeholder="Write your story..."
              />
              <button className="enhanced-button" onClick={handleSubmitStory}>
                Submit Story
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Climate Alert Section */}
      <div className="enhanced-alert-section">
        <button
          onClick={() => setShowAlertForm(!showAlertForm)}
          className="enhanced-button"
          style={{ margin: "10px" }}
        >
          {showAlertForm ? "Cancel Climate Alert" : "Send Climate Alert"}
        </button>

        {showAlertForm && (
          <div className="enhanced-alert-form">
            <div>
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                style={{ marginBottom: "10px", display: "block" }}
              />
            </div>
            <div>
              <label>Subject:</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter subject"
                style={{ marginBottom: "10px", display: "block" }}
              />
            </div>
            <div>
              <label>Message:</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message..."
                style={{ marginBottom: "10px", display: "block" }}
              />
            </div>
            <div>
              <label>Recipients:</label>
              <input
                type="text"
                value={recipients || users.join(", ")} // Default to all users' emails
                onChange={(e) => setRecipients(e.target.value)}
                placeholder="Recipients (default: all)"
                style={{ marginBottom: "10px", display: "block" }}
              />
            </div>

            <button className="enhanced-button" onClick={handleAlertSubmit}>
              Send Alert
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyArea;
