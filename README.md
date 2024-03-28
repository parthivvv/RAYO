# Accessible Sign-Up Form and Chatbot

This project aims to provide an accessible web application that includes a sign-up and sign-in form meeting WCAG (Web Content Accessibility Guidelines) standards, and an interactive chatbot for immediate user engagement. The project emphasizes accessibility features, such as keyboard navigation, screen reader support, and high contrast mode, to ensure usability for all users, including those with disabilities.

## Features

- **Accessible Sign-Up and Sign-In Forms:** Forms are designed with accessibility in mind, including proper labeling, focus management, and error handling.
- **Interactive Chatbot:** Engage with users through a simple chatbot that responds to user input.
- **High Contrast Mode:** A toggle-able high contrast mode to enhance readability for users with visual impairments.
- **Responsive Design:** Ensures that the application is usable on various devices and screen sizes.

## Technology Stack

- **Frontend:** React.js
- **Styling:** CSS
- **Backend:** Node.js with Express
- **Database:** MongoDB
- **Accessibility Tools:** ARIA (Accessible Rich Internet Applications) labels, WCAG standards

## Local Development

To set up this project locally, follow these steps:

Install Dependencies:
For the frontend:


cd accessible-signup
npm install

For the backend:

cd backend
npm install

Environment Variables:
Ensure you have the necessary environment variables set up in a .env file in the server directory.

Start the Development Server:
For the frontend:
npm start


For the backend:
node server,js

Visit the Application:
Open http://localhost:3000 in your browser.

Usage
To sign up or sign in, navigate to /signup or /signin respectively and enter the required information.
Once signed in, interact with the chatbot on the welcome page.
Toggle high contrast mode using the button provided for better visibility.
