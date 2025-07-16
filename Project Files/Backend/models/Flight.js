const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  seatNumber: String,
  isBooked: { type: Boolean, default: false },
  reservedUntil: { type: Date, default: null },
  reservationId: { type: String, default: null }
});

const flightSchema = new mongoose.Schema({
  airline: String,
  flightNumber: String,
  from: String,
  to: String,
  departure: Date,
  arrival: Date,
  price: Number,
  seats: [seatSchema],
  seatsAvailable: { type: Number, default: 0 }
});

module.exports = mongoose.model('Flight', flightSchema);