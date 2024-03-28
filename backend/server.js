require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Define a User model
const userSchema = new mongoose.Schema({
  name: String, // Adding name as per your requirement
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true } // Remember to hash passwords in production
});
const User = mongoose.model('User', userSchema);

// Middleware
app.use(cors({ origin: 'http://localhost:3000' })); // Configure CORS to allow requests from your frontend
app.use(express.json()); // Parse JSON bodies

// Modified /signup route to send JSON response
app.post('/signup', async (req, res) => {
    try {
      const newUser = new User(req.body); // Directly saving without hashing for simplicity as requested
      await newUser.save();
      res.status(201).json({ message: 'User created' }); // Send JSON response
    } catch (error) {
      console.error(error); // Log error for debugging
      res.status(400).json({ error: error.message }); // Send JSON error
    }
  });
  
  // Similarly, modify the /signin route
  app.post('/signin', async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email, password: req.body.password });
      if (!user) {
        return res.status(401).json({ message: 'Authentication failed' });
      }
      res.status(200).json({ message: 'User authenticated' });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message });
    }
  });
  
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
