const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

const connectDB = require('./config/db');
connectDB();

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const journalRoutes = require('./routes/journal');
app.use('/api/journal', journalRoutes);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

