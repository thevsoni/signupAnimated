const express = require('express');
const router = express.Router();

const Room = require('../models/room');

router.get('/getAllRooms', async (req, res) => {
    try {
        const rooms = await Room.find({});
        return res.send(rooms); // if do res.json(rooms({rooms})) then ye array answer ko ek object ke ander daal kr dega
    } catch (error) {
        return res.status(400).json({ message: error });
    }
})

module.exports = router;