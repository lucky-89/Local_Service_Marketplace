const express= require('express');
const cors= require('cors');
const mongoose= require('mongoose');
require('dotenv').config();
const AuthRoutes= require('./Routes/AuthRoutes');
const app=express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.use('/api', AuthRoutes);


const Port=process.env.PORT || 5000;
app.listen(Port, ()=> console.log(`Server running on port ${Port}`));