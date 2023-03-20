const express = require('express');

const app = express();

const dbconfig = require('./db');
//connect to mongodb


const port = 5000;
// const port = process.env.PORT || 5000;   //doubt how it takes


app.listen(port, () => {
    console.log(`The Room app listening on port ${port} and site at http://localhost:${port}`)
})
