const express = require('express');
const router = express.Router();
const Flight = require('../models/Flight');
const { v4: uuidv4 } = require('uuid');
const auth = require('../middleware/auth');
const adminOnly = require('../middleware/admin');

// Search flights (public)
router.get('/search', async (req, res) => {
  const { from, to, date } = req.query;
  const query = {};
  if (from && from.trim()) query.from = new RegExp(`^${from.trim()}$`, 'i');
  if (to && to.trim()) query.to = new RegExp(`^${to.trim()}$`, 'i');
  if (date && date.trim()) {
    const start = new Date(date + 'T00:00:00.000Z');
    const end = new Date(start);
    end.setUTCDate(end.getUTCDate() + 1);
    query.departure = { $gte: start, $lt: end };
  }
  try {
    const flights = await Flight.find(query);
    res.json(flights);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all flights (public)
router.get('/all-public', async (req, res) => {
  try {
    const flights = await Flight.find({});
    res.json(flights);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all flights (admin only)
router.get('/all', auth, adminOnly, async (req, res) => {
  try {
    const flights = await Flight.find({});
    res.json(flights);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get flight by ID (public)
router.get('/:id', async (req, res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    if (!flight) return res.status(404).json({ message: 'Flight not found' });
    res.json(flight);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Reserve seats temporarily (user)
router.post('/:flightId/reserve-seats', auth, async (req, res) => {
  const { seatNumbers } = req.body;
  const { flightId } = req.params;
  const reservationId = uuidv4();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now

  const flight = await Flight.findById(flightId);
  if (!flight) return res.status(404).json({ message: 'Flight not found' });

  for (let seatNum of seatNumbers) {
    const seat = flight.seats.find(s => s.seatNumber.trim().toUpperCase() === seatNum.trim().toUpperCase());
    if (!seat || seat.isBooked || (seat.reservedUntil && seat.reservedUntil > new Date())) {
      return res.status(400).json({ message: `Seat ${seatNum} is not available` });
    }
    seat.reservedUntil = expiresAt;
    seat.reservationId = reservationId;
  }
  await flight.save();
  res.json({ success: true, reservationId, expiresAt });
});

// Verify seat availability (user)
router.post('/:flightId/verify-seats', auth, async (req, res) => {
  const { selectedSeats, reservationId } = req.body;
  const { flightId } = req.params;

  const flight = await Flight.findById(flightId);
  if (!flight) return res.status(404).json({ message: 'Flight not found' });

  let unavailableSeats = [];
  for (let seatNum of selectedSeats) {
    const seat = flight.seats.find(s => s.seatNumber.trim().toUpperCase() === seatNum.trim().toUpperCase());
    if (!seat || seat.isBooked || (seat.reservedUntil && seat.reservedUntil > new Date() && seat.reservationId !== reservationId)) {
      unavailableSeats.push(seatNum);
    }
  }
  res.json({ available: unavailableSeats.length === 0, unavailableSeats });
});

// Get real-time seat data (user)
router.get('/:flightId/seats', auth, async (req, res) => {
  const { flightId } = req.params;
  const flight = await Flight.findById(flightId);
  if (!flight) return res.status(404).json({ message: 'Flight not found' });
  res.json({ seats: flight.seats });
});

// Add a new flight (admin only)
router.post('/', auth, adminOnly, async (req, res) => {
  try {
    const { airline, flightNumber, from, to, departure, arrival, price, seatsAvailable } = req.body;
    // Generate seats
    const seats = [];
    const rows = Math.ceil(seatsAvailable / 6);
    const cols = ['A', 'B', 'C', 'D', 'E', 'F'];
    let seatCount = 0;
    for (let r = 1; r <= rows && seatCount < seatsAvailable; r++) {
      for (let c of cols) {
        if (seatCount < seatsAvailable) {
          seats.push({ seatNumber: `${r}${c}`, isBooked: false });
          seatCount++;
        }
      }
    }
    const flight = new Flight({
      airline, flightNumber, from, to,
      departure, arrival, price, seatsAvailable, seats
    });
    await flight.save();
    res.json({ success: true, flight });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Delete a flight (admin only)
router.delete('/:flightId', auth, adminOnly, async (req, res) => {
  try {
    await Flight.findByIdAndDelete(req.params.flightId);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Reset all seats for a flight (admin only)
router.post('/:flightId/reset-seats', auth, adminOnly, async (req, res) => {
  const { flightId } = req.params;
  const flight = await Flight.findById(flightId);
  if (!flight) return res.status(404).json({ message: 'Flight not found' });
  flight.seats.forEach(seat => {
    seat.isBooked = false;
    seat.reservedUntil = null;
    seat.reservationId = null;
  });
  await flight.save();
  res.json({ success: true });
});

module.exports = router;