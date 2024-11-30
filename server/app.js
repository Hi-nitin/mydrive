const express = require('express');
const app = express();
const port = 7777;
const router = require('./ROUTER/router');
const cookieParser = require('cookie-parser');
const { createServer } = require('node:http');
const cors = require('cors');
const path = require('path');
const mysocket=require('./BUSINESS/socket')
const server = createServer(app);
const urii=require('./BUSINESS/url')


app.use('/humpydumpy', express.static(path.join(__dirname, 'public', 'humpydumpy')));

app.use(cors({
    origin: urii,
    methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use(cookieParser())

const mongoose = require('mongoose');
// const uri = 'mongodb://localhost:27017/cloud';

const uri='mongodb+srv://hiamsolo:passwordshouldbestrong@cluster0.ar0v8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
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


app.use(express.json())

mysocket(server)
app.use('/', router)

server.listen(port, () => {
    console.log('SERVER STARTED')
})
