const express = require('express');
const app = express();
const port = 7777;
const router = require('./ROUTER/router');
const cookieParser = require('cookie-parser');
const { createServer } = require('node:http');
const cors = require('cors');
const path = require('path');
const mysocket = require('./BUSINESS/socket');
const server = createServer(app);
const mongoose = require('mongoose');

// Static file serving
app.use('/humpydumpy', express.static(path.join(__dirname, 'public', 'humpydumpy')));

// CORS middleware (allow requests only from your frontend)
app.use(cors({
    origin: 'https://mydrive-ruby.vercel.app', // Replace with your frontend URL
    credentials: true // Allow credentials like cookies
}));

// Cookie parser middleware
app.use(cookieParser());

// MongoDB connection setup
const uri = 'mongodb+srv://hiamsolo:passwordshouldbestrong@cluster0.ar0v8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(uri)
    .then(() => {
        console.log('Successfully connected to MongoDB');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB', err);
    });

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to DB');
});

mongoose.connection.on('error', err => {
    console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

// Parse incoming JSON requests
app.use(express.json());

// Socket.IO integration
mysocket(server);

// Set up routes
app.use('/', router);

// Start the server
server.listen(port, () => {
    console.log('Server started on port', port);
});

