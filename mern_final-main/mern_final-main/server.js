const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3001;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mern_ecommerce', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a schema for the user data
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

app.use(bodyParser.json());

// Endpoint for registering a user
app.post('/register', async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;
    const newUser = new User({ name, email, mobile, password });
    await newUser.save();
    res.json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
