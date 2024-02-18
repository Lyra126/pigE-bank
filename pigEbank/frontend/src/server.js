const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose'); // Import mongoose for MongoDB connection
const cors = require('cors'); // Import cors middleware if needed
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors()); // Use cors middleware if you need to enable cross-origin requests

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/your-database-name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define MongoDB schema and models if needed
// For example:
// const userSchema = new mongoose.Schema({
//   username: String,
//   password: String,
// });

// const User = mongoose.model('User', userSchema);

// Your login route
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Example code to validate username and password
  // Replace this with your own logic to check against MongoDB
  // const user = await User.findOne({ username, password });

  // if (!user) {
  //   return res.status(401).json({ message: 'Invalid username or password' });
  // }

  // Generate JWT token
  const token = jwt.sign({ username }, 'your-secret-key', { expiresIn: '1h' });

  // Set the token in a cookie
  res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); // 1 hour expiration time

  // Send response
  res.json({ success: true, message: 'Logged in successfully.' });
});

// Example route to verify token
app.get('/verifyToken', (req, res) => {
  // Get token from cookies
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Verify token
  jwt.verify(token, 'your-secret-key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Token is valid
    res.json({ message: 'Token verified' });
  });
});

// Start the server
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
