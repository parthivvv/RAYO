import React, { useEffect } from 'react';
import ChatBot from './ChatBot';

function WelcomePage() {
  useEffect(() => {
    // Function to speak text
    const speak = (text) => {
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        speechSynthesis.cancel(); // Cancel any previous speech
        speechSynthesis.speak(utterance);
      }
    };

    // Speak welcome message once when the component mounts
    speak("Welcome to the chatbot, press tab to begin chatting with the bot and press enter to ask the question");

  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <div>
<h1
  style={{
    fontSize: '50px', // Makes the font larger
    color: '#1f76ff', // A pleasing blue; adjust the color as you like
    textAlign: 'center', // Centers the text
    fontFamily: '"Segoe UI", Arial, sans-serif', // Uses a modern, clean font-family
    textShadow: '2px 2px 4px #000000', // Adds a subtle shadow for depth
    marginBottom: '20px', 
    marginTop:'-15px'
  }}
>
  RAYO CHATBOT
</h1>
      <ChatBot />    
      </div>
  );
}

export default WelcomePage;
