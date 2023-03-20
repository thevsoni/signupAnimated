const mongoose = require('mongoose');
var mongoURL = 'mongodb+srv://thevsoni:Vishal2828@cluster0.zl56non.mongodb.net/TheHotel'; //compass 

// var mongoURL = 'mongodb+srv://thevsoni:Vishal2828@cluster0.zl56non.mongodb.net/?retryWrites=true&w=majority'; //application link
// //i have to add this type of secure things inside .env file 


// // now i have to connect this mongoose with data base atlas,in case of development part we can use 
// //mongodb atlas connection url link else we need application connection link


mongoose.connect(mongoURL,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });

var connection = mongoose.connection

connection.on('error', (error) => {
    console.log("db connection failed");
})

connection.on('connected', () => {
    console.log("db connection successful")
})

module.exports = mongoose;


// mongoose.connect(mongoURL,
//     {
//         useUnifiedTopology: true,
//         useNewUrlParser: true
//     }).then(() => console.log("success connection")).catch(() => { console.log("failed connection") })
// module.exports = mongoose;
//this will also work

