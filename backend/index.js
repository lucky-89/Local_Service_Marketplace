const express= require('express');
const cors= require('cors');
const mongoose= require('mongoose');
require('dotenv').config();
const AuthRoutes= require('./Routes/AuthRoutes');
const admin = require("firebase-admin");

const app = express();
app.use(cors());


app.use(express.json()); 

const serviceAccount = JSON.parse(process.env.FIREBASE_CREDENTIALS);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

mongoose.connect(process.env.MONGO_URI).then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.use('/api', AuthRoutes);


const Port=process.env.PORT || 5000;
app.listen(Port, ()=> console.log(`Server running on port ${Port}`));