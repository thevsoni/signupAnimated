const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({
    name: { type: String, required: true },
    maxCount: { type: Number, required: true },
    phoneNumber: { type: Number, required: true },
    rentPerDay: { type: Number, required: true },
    imageUrls: [],
    currentBookings: [],
    type: { type: String, required: true },
    description: { type: String, required: true },
}, {
    timestamps: true
})

const roomModel = mongoose.model('rooms', roomSchema);

module.exports = roomModel;



/*
if want to make a type of array with required
tags : {
  type     : Array,
  required : true,
  validate : {
    validator : function(array) {
      return array.every((v) => typeof v === 'string');
    }
  }
}
*/