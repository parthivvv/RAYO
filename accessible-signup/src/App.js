import React, { useState, useEffect } from 'react';
import AccessibleForm from './AccessibleForm';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import WelcomePage from './WelcomePage'; 
import Navigation from './Navigation'; 
import './App.css';


function App() {
  localStorage.removeItem('userName');

  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('userName'));
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    // Create a function to handle storage events
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem('userName'));
    };

    // Add event listener for local storage changes
    window.addEventListener('storage', handleStorageChange);

    // Clean up event listener
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('high-contrast', highContrast);
  }, [highContrast]);

  const handleClick = () => {
    // Toggle contrast mode
    setHighContrast(!highContrast);

    // Speak the current contrast mode
    const contrastMode = highContrast ? 'Disable High Contrast' : 'Enable High Contrast';
    speakWithDelay(contrastMode);
  };

  
  const speakWithDelay = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.cancel(); // Clear any previously scheduled speech synthesis
      setTimeout(() => {
        speechSynthesis.speak(utterance); // Delayed speech synthesis
      }, 100); // Adjust the delay time as needed
    } else {
      console.error("Your browser does not support speech synthesis.");
    }
  };

  return (
    <Router>
      <div className="App">
      <Navigation isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route path="/" element={<AccessibleForm formType="signup" setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/signup" element={<AccessibleForm formType="signup" setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/signin" element={<AccessibleForm formType="signin" setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/welcome" element={<WelcomePage />} />
        </Routes>

        <button
          onMouseEnter={() => speakWithDelay("Toggle Contrast")}
          onFocus={() => speakWithDelay("Click to toggle contrast.")}
          className="toggle-contrast"
          onClick={handleClick}
          aria-pressed={highContrast}
          aria-label="Toggle high contrast mode"
        >
          {highContrast ? 'Disable High Contrast' : 'Enable High Contrast'}
        </button>
      </div>
    </Router>
  );
}

export default App;
