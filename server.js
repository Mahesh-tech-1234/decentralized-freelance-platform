const express = require('express'); 
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');

const app = express();
app.use(express.json());
app.use(express.static('public')); // Serve static files like HTML, CSS, etc.

mongoose.connect('mongodb://localhost:27017/freelanceDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Define User model
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    skills: [String],
    portfolio: String, // Path to portfolio file
});
const User = mongoose.model('User', userSchema);

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Registration endpoint
app.post('/register', upload.single('portfolio'), async (req, res) => {
    const { username, email, password, skills } = req.body;
    const portfolio = req.file ? req.file.path : null;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user in the database
    const newUser = new User({
        username,
        email,
        password: hashedPassword,
        skills: JSON.parse(skills),
        portfolio,
    });

    try {
        await newUser.save();
        res.json({ success: true });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Registration failed.' });
    }
});

// Login endpoint
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Find user by username
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ success: false, message: 'User not found.' });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: 'Invalid credentials.' });

    // Create JWT token
    const token = jwt.sign({ userId: user._id }, 'secret_key', { expiresIn: '1h' });
    res.json({ success: true, user: { username: user.username, email: user.email, skills: user.skills }, token });
});

// Start server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});