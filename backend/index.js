const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const AuthRoutes = require('./Routes/AuthRoutes');
require("./cronJobs");
const app = express();
app.use(cors());
app.use(express.json());
const admin=require('./Routes/admin');


mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.use('/api', AuthRoutes);
app.use('/api/admin',admin);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

