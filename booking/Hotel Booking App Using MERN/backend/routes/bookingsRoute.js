const express = require('express');
const router = express.Router();
const Booking = require('../models/booking');
const Room = require('../models/room');
const moment = require('moment');

router.post('/bookroom', async (req, res) => {

    const {
        room,
        userid,
        fromdate,
        todate,
        totalamount,
        totaldays
    } = req.body;

    try {
        const newbooking = new Booking({

            room: room.name,
            roomid: room._id,
            userid,
            fromdate,
            todate,
            //if in database ,our date will not store in dd-mm-yyyy form then 
            //install moment in backend also 
            // fromdate: moment(fromdate).format('MM-DD-YYYY'),
            // todate: moment(todate).format('MM-DD-YYYY'),
            totalamount,
            totaldays,
            transactionid: "12345",

        })
        const booking = await newbooking.save()

        //updating currentbooking field in room model
        const roomtemp = await Room.findOne({ _id: room._id })

        roomtemp.currentbookings.push({ bookingid: booking._id, fromdate, todate, userid, status: booking.status })
        // roomtemp.currentbookings.push({ bookingid: booking._id, fromdate: fromdate, todate: todate, userid: userid, status: booking.status })
        //both things works

        // console.log(roomtemp.currentbookings);
        // await roomtemp.save(); //updating this roomtemp but this is not working and giving error

        //so lets use something else
        await Room.findByIdAndUpdate({ _id: room._id }, { $set: roomtemp }, { new: true });

        /*
        await Room.findByIdAndUpdate({ _id: room._id }, {
            $set: {
                currentbookings: currentbookings.push({ bookingid: booking._id, fromdate, todate, userid, status: booking.status })
            }
        }, { new: true });

        //it is not working ,i have to check why it is not working bcs isse 2 bar search krna pad raha hai
        */



        return res.status(200).send("success on bookingRoute")
    } catch (error) {
        return res.status(400).json({ where: "failed on bookingRoute", message: error })
    }

})

module.exports = router; 