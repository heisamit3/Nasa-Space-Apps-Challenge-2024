import React, { useState } from 'react';
import axios from 'axios'; // If you prefer fetch, you can use it instead

const MessageForm: React.FC = () => {
  const [message, setMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Send POST request to the Django backend
      const response = await axios.post('http://localhost:8000/api/message/', {
        message: message,
      });

      // Update the response message state with the data received from the backend
      setResponseMessage(response.data.message);
    } catch (error) {
      console.error('Error sending message:', error);
      setResponseMessage('Failed to send message.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message"
        />
        <button type="submit">Send Message</button>
      </form>
      <div>
        <h3>Response from Backend:</h3>
        <p>{responseMessage}</p>
      </div>
    </div>
  );
};

export default MessageForm;
