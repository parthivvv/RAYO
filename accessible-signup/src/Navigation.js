import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navigation.css';

function Navigation({isLoggedIn, setIsLoggedIn}) {
  let location = useLocation();
  let navigate = useNavigate();
  console.error(isLoggedIn);

  const speakWithDelay = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.cancel(); // Clear any previously scheduled speech synthesis
      setTimeout(() => {
        speechSynthesis.speak(utterance); // Delayed speech synthesis
      }, 100);
    } else {
      console.error("Your browser does not support speech synthesis.");
    }
  };

  const handleLogout = () => {
    speakWithDelay("Logging out"); // Provide audible feedback
    localStorage.removeItem('userName'); // Clear user-related storage indicating logged out
    navigate('/signin'); // Navigate to the sign-in page
    setIsLoggedIn(false);
  };

  return (
    <div className="navigation-container">
      {isLoggedIn ? (
        location.pathname !== '/signin' && location.pathname !== '/signup' && (
          <button onClick={handleLogout} className="logout-button"  aria-label="Log out" onMouseEnter={() => speakWithDelay("Log out")} onFocus={() => speakWithDelay("Click to Log out")}>
            Logout
          </button>
        )
      ) : (
        <nav>
          <ul>
            <li>
              <Link
                to="/signup"
                onMouseEnter={() => speakWithDelay("Go to sign up")}
                onFocus={() => speakWithDelay("Go to sign up.")}
                aria-label="Sign up for a new account"
                role="link"
                style={{ color: 'white' }}
              >
                SIGN UP
              </Link>
            </li>
            <li>
              <Link
                to="/signin"
                onMouseEnter={() => speakWithDelay("Go to sign in")}
                onFocus={() => speakWithDelay("Go to sign in.")}
                aria-label="Sign in to your account"
                role="link"
                style={{ color: 'white' }}
              >
                SIGN IN
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}

export default Navigation;
