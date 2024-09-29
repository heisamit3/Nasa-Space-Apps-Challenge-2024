import React, { useState, useEffect } from 'react';
import '../css/Character.css'; // Import the CSS file

interface CharacterProps {
  currentPath: string; // The current route path
}

const characterImages = {
  neutral: '../images/octocat-1727571511027.png', // Replace with actual image paths
  talking: '../images/octocat-1727571511027.png', // Update this path
};

const instructions: Record<string, string> = {
  '/': "Welcome! Click on the button to start.",
  '/dashboard': "Here you can view your stats and manage your profile.",
  // Add more instructions as needed
};

const Character: React.FC<CharacterProps> = ({ currentPath }) => {
  const [isTalking, setIsTalking] = useState(false);

  // This function is responsible for text-to-speech
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1; // Speed of speech
      utterance.pitch = 1; // Pitch of voice
      utterance.volume = 1; // Volume level

      // Start speaking
      window.speechSynthesis.speak(utterance);
    } else {
      console.error("Text-to-speech not supported in this browser.");
    }
  };

  // Play the voice automatically on first visit to the page
  useEffect(() => {
    setIsTalking(true); // Start talking
    speak(instructions[currentPath]); // Narrate the instruction based on the route

    // Stop talking after a short delay
    const timer = setTimeout(() => {
      setIsTalking(false);
    }, 3000); // Duration should match the speech length

    return () => clearTimeout(timer); // Cleanup on unmount
  }, [currentPath]);

  // Function to manually trigger the voice via the play button
  const handlePlay = () => {
    setIsTalking(true);
    
    //print currentPath
    console.log(currentPath);
    speak(instructions[currentPath]);

    const timer = setTimeout(() => {
      setIsTalking(false);
    }, 3000);

    return () => clearTimeout(timer);
  };

  return (
    <div className="character-container">
      <img
        src={isTalking ? characterImages.talking : characterImages.neutral}
        alt="Character"
        className="character-image"
      />

      {/* Play button to manually trigger the voice */}
      <button onClick={handlePlay} className="play-button">
        Play Voice
      </button>
    </div>
  );
};

export default Character;
