const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

const authRoute = require('./routes/authRoute');

mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('Error connecting to MongoDB: ', err));

app.use(express.json());

app.use('/auth', authRoute);

module.exports = app;