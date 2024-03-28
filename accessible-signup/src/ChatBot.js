import React, { useState, useEffect, useRef } from 'react';
import './ChatBot.css';
import responses from './test.json'; // Adjust the import path as necessary


function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const messagesEndRef = useRef(null);
  const chatLiveRegionRef = useRef(null); // Ref for the live region to announce updates

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
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8; // Adjust the speaking rate; lower values mean slower speech
      speechSynthesis.speak(utterance);
    }
  };

  const handleUserInput = (event) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!userInput.trim()) return;

    const newUserMessage = { text: userInput, author: 'user' };
    setMessages([...messages, newUserMessage]);
    setUserInput('');
    // Optionally, speak the user's message
    // speak(`You said: ${newUserMessage.text}`);
    respondToUserInput(newUserMessage.text);
  };

  const respondToUserInput = (input) => {
    const matchedResponse = responses.find(response => input.trim().toLowerCase() === response.Query.toLowerCase());
    const botResponseText = matchedResponse ? matchedResponse.Response : "Sorry, I don't understand that.";
  
    setTimeout(() => {
      setMessages(messages => [...messages, { text: botResponseText, author: 'bot' }]);
      speak(botResponseText); // This should trigger the speech synthesis
    }, 500);
  };
  

  return (
    <div className="cb-chatbot" aria-live="polite" aria-atomic="true">
      <div className="cb-messages" ref={chatLiveRegionRef} aria-relevant="additions" aria-live="assertive">
        {messages.map((message, index) => (
          <div key={index} className={`cb-message cb-${message.author}`} tabIndex="0">
            {message.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="cb-form">
        <input
          onMouseEnter={() => speakWithDelay("Click to talk to the chatbot")}
          onFocus={() => speakWithDelay("Type in your query and press enter")}
          className="cb-input"
          type="text"
          value={userInput}
          onChange={handleUserInput}
          placeholder="Ask me something..."
          aria-label="Type your message here"
        />
          <button
            onMouseEnter={() => speakWithDelay("Click to send")}
            onFocus={() => speakWithDelay("Press enter to send")}
            type="submit"
            className="cb-button"
            style={{
              padding: '0px 12px', 
              height: '60px', 
              width: 'auto', 
              marginLeft: '5px',
            }}
          >
            SEND
          </button>
      </form>
    </div>
  );
}

export default ChatBot;
