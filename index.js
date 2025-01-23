require('dotenv').config();
const express = require('express');
const connectDB = require('./db/connection');
const contactRoutes = require('./routes/contacts');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Root Route (to handle GET /)
app.get('/', (req, res) => {
    res.send('Welcome to the Contacts API!');
});

// API Routes
app.use('/api/contacts', contactRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
