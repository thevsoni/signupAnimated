const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use('/api/auth', userRoutes);

PORT = 5000
MONGO_URL = "mongodb+srv://thevsoni:Vishal2828@cluster0.ijgzmnf.mongodb.net/chat"

// process.env.PORT process.env.MONGO_URL is not working ,doubt ,i think with concurrently , we cant use this 

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("DB connection successfully")
}).catch((error) => {
    console.log("error in db connection ", error);
})

const server = app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});