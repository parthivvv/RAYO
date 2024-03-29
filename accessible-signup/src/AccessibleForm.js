import React, { useState, useEffect } from 'react';
import './AccessibleForm.css';
import { useNavigate } from 'react-router-dom';


const AccessibleForm = ({ formType, setIsLoggedIn}) => {

  useEffect(() => {
    // Check if the welcome message has already been played
    const hasPlayedWelcomeMessage = localStorage.getItem('hasPlayedWelcomeMessage');
  
    const speak = (text) => {
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.8; // Adjust the speaking rate; lower values mean slower speech
        speechSynthesis.cancel(); // Cancel any previous speech
        speechSynthesis.speak(utterance);
      }
    };
  
    if (!hasPlayedWelcomeMessage) {
      // Speak welcome message once when the component mounts for the first time
      speak("Welcome, you may use tab to navigate around or hover over using your mouse for information about the page. You are currently in the sign up page");
      // Mark the welcome message as played
      localStorage.setItem('hasPlayedWelcomeMessage', 'true');
    }
  }, []);
  
  

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
  // Clear form data and errors when formType changes
  useEffect(() => {
    // Reset form data, errors, and submission state when formType changes
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    setFormErrors({});
    setIsSubmitting(false); // Reset isSubmitting to false on form type change
  }, [formType]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validate(formData);
    setFormErrors(errors);
  
    if (Object.keys(errors).length === 0) {
      setIsSubmitting(true);
      // Simulate a successful login/signup without actual network request
      localStorage.setItem('userName', formData.name || 'User'); // Use formData.name or a placeholder
      setIsLoggedIn(true);
      speak(formType === 'signup' ? "Sign Up Successful" : "Sign In Successful");
      navigate('/welcome');
      setIsSubmitting(false);
    } else {
      const firstErrorField = Object.keys(errors)[0];
      document.getElementById(firstErrorField)?.focus();
      speakWithDelay(errors[firstErrorField]);
    }
  };
  

  
  

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      // Handle form submission logic here
      setIsSubmitting(false);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    if (formType === 'signup') {
      if (!values.name) errors.name = 'Name is required';
    }
    if (!values.email) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'Email is invalid';
    if (!values.password) errors.password = 'Password is required';
    if (formType === 'signup' && values.password !== values.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    return errors;
  };

  
  const speak = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    } else {
      console.error("Your browser does not support speech synthesis.");
    }
  };
  

  useEffect(() => {
    if (isSubmitting) {
      const firstErrorField = Object.keys(formErrors)[0];
      if (firstErrorField) {
        document.getElementById(firstErrorField).focus();
      }
    }
  }, [formErrors, isSubmitting]);

  return (
    <form onSubmit={handleSubmit} aria-labelledby="formHeading" noValidate>
      <h1 id="formHeading">{formType === 'signup' ? 'SIGN UP' : 'SIGN IN'}</h1>
      {formType === 'signup' && (
        <div>
          <label htmlFor="name">Name</label>
          <input
            onMouseEnter={() => speakWithDelay("Click to enter your name")}
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onFocus={() => speak("Please enter your name.")}
            aria-describedby="nameError"
            aria-invalid={!!formErrors.name}
            required
          />
          {formErrors.name && (
            <div id="nameError" className="form__error">
              {formErrors.name}
            </div>
          )}
        </div>
      )}
      <div>
        <label htmlFor="email">Email</label>
        <input
          onMouseEnter={() => speakWithDelay("Click to enter your email")}
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onFocus={() => speak("Please enter your email.")}
          aria-describedby="emailError"
          aria-invalid={!!formErrors.email}
          required
        />
        {formErrors.email && (
          <div id="emailError" className="form__error">
            {formErrors.email}
          </div>
        )}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          onMouseEnter={() => speakWithDelay("Click to enter your password")}
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          onFocus={() => speak("Please enter your password.")}
          aria-describedby="passwordError"
          aria-invalid={!!formErrors.password}
          required
        />
        {formErrors.password && (
          <div id="passwordError" className="form__error">
            {formErrors.password}
          </div>
        )}
      </div>
      {formType === 'signup' && (
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input            
            onMouseEnter={() => speakWithDelay("Click to confirm your password")}
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            onFocus={() => speak("Please enter your password again for confirmation.")}
            aria-describedby="confirmPasswordError"
            aria-invalid={!!formErrors.confirmPassword}
            required
          />
          {formErrors.confirmPassword && (
            <div id="confirmPasswordError" className="form__error">
              {formErrors.confirmPassword}
            </div>
          )}
        </div>
      )}
      <button
        onFocus={() => speakWithDelay("Click to confirm.")}
        onMouseEnter={() => speakWithDelay("Do you want to confirm sign up")}
        type="submit">{formType === 'signup' ? 'SIGN UP' : 'SIGN IN'}</button>
    </form>
  );
};

export default AccessibleForm;
