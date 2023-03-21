const express = require('express');

const app = express();

//connect to mongodb
const dbconfig = require('./db');

//to collect request and its body
app.use(express.json());

//connect with routes
app.use('/api/rooms', require('./routes/roomsRoute'));


const port = 5000;
// const port = process.env.PORT || 5000;   //doubt how it takes


app.listen(port, () => {
    console.log(`The Room app listening on port ${port} and site at http://localhost:${port}`)
})
