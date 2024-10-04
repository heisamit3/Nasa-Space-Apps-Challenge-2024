import React, { useState, useEffect } from "react";
import "../../css/Character.css"; // Import the CSS file

interface CharacterProps {
  currentPath: string; // The current route path
}

const characterImages = {
  neutral: "../images/octocat-1727571511027.png", // Replace with actual image paths
  talking: "../images/octocat-1727571511027.png", // Update this path
};

// Instructions for different routes
const instructions: Record<string, string> = {
  "/": "Welcome to the Sunclimate Chronicles!", // Custom message
  "/dashboard": "Here you can view your stats and manage your profile.",
  // Add more instructions as needed
};

const Character: React.FC<CharacterProps> = ({ currentPath }) => {
  const [isTalking, setIsTalking] = useState(false);
  const [selectedVoice, setSelectedVoice] =
    useState<SpeechSynthesisVoice | null>(null);

  // This function is responsible for text-to-speech
  const speak = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);

      // Set the selected voice (US English female)
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      utterance.rate = 1; // Speed of speech
      utterance.pitch = 1; // Pitch of voice
      utterance.volume = 1; // Volume level

      // Start speaking
      window.speechSynthesis.speak(utterance);
    } else {
      console.error("Text-to-speech not supported in this browser.");
    }
  };

  // Get available voices and set the preferred US English female voice
  const setVoice = () => {
    const voices = window.speechSynthesis.getVoices();

    // Try to find a US English female voice based on known female voice names and characteristics
    const femaleVoice = voices.find(
      (voice) =>
        voice.lang === "en-US" &&
        (voice.name.includes("Female") ||
          voice.name.includes("Google US English") ||
          voice.name.includes("Zira") || // Windows voice
          voice.name.includes("Samantha") || // Apple's voice
          voice.name.includes("Karen")) // Another common voice for some systems
    );

    if (femaleVoice) {
      setSelectedVoice(femaleVoice);
      console.log("Selected female voice:", femaleVoice.name); // Log the selected voice
    } else {
      console.warn("Female US English voice not found. Using default voice.");
    }
  };

  useEffect(() => {
    // Load voices when they are ready
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = setVoice;
    }

    // Set voice initially if voices are already available
    setVoice();
  }, []);

  // Play the voice automatically on first visit to the page
  useEffect(() => {
    setIsTalking(true); // Start talking
    speak(instructions[currentPath]); // Narrate the instruction based on the route

    const timer = setTimeout(() => {
      setIsTalking(false);
    }, 3000); // Duration should match the speech length

    return () => clearTimeout(timer); // Cleanup on unmount
  }, [currentPath, selectedVoice]);

  // Function to manually trigger the voice via the play button
  const handlePlay = () => {
    setIsTalking(true);
    console.log(currentPath); // Print currentPath for debugging
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
