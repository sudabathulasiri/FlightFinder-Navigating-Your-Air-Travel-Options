const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Flight = require('../models/Flight');
const auth = require('../middleware/auth'); // JWT middleware
const adminOnly = require('../middleware/admin'); // <-- Add this line

// Book a flight
router.post('/', auth, async (req, res) => {
  try {
    const { flightId, seats, selectedSeats } = req.body;
    const userId = req.user.id;

    const flight = await Flight.findById(flightId);
    if (!flight) return res.status(404).json({ message: 'Flight not found' });

    // Check seat availability
    if (selectedSeats && selectedSeats.length > 0) {
      for (let seatNum of selectedSeats) {
        const seat = flight.seats.find(
          s => s.seatNumber.trim().toUpperCase() === seatNum.trim().toUpperCase()
        );
        if (!seat || seat.isBooked) {
          return res.status(400).json({ message: `Seat ${seatNum} is not available` });
        }
      }
    } else {
      return res.status(400).json({ message: 'No seats selected' });
    }

    // Mark seats as booked
    for (let seatNum of selectedSeats) {
      const seat = flight.seats.find(s => s.seatNumber === seatNum);
      seat.isBooked = true;
    }
    flight.seatsAvailable -= selectedSeats.length;
    await flight.save();

    // Save booking (add selectedSeats)
    const booking = new Booking({
      user: userId,
      flight: flightId,
      seats: selectedSeats.length,
      selectedSeats
    });
    await booking.save();

    res.json({ message: 'Booking successful', booking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/bookings/my - Get bookings for the logged-in user
router.get('/my', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('flight');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get bookings for a specific flight (admin only)
router.get('/flight/:flightId', auth, adminOnly, async (req, res) => {
  try {
    const bookings = await Booking.find({ flight: req.params.flightId })
      .populate('user', 'email')
      .populate('flight', 'flightNumber');
    res.json({ bookings });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all bookings (admin only)
router.get('/all', auth, adminOnly, async (req, res) => {
  const bookings = await Booking.find().populate('user').populate('flight');
  res.json({ bookings });
});

// Delete a booking (admin only)
router.delete('/:bookingId', auth, adminOnly, async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.bookingId);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Cancel a booking
router.post('/:id/cancel', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found.' });

    // Optional: Only allow the user who made the booking to cancel it
    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized.' });
    }

    booking.status = 'cancelled'; // or remove the booking if you prefer
    await booking.save();

    // Optionally, update flight seat availability here

    res.json({ success: true, message: 'Booking cancelled.' });
  } catch (err) {
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;