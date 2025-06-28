const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const flightRoutes = require('./routes/flightRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const cors = require('cors');
const path = require('path');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Serve frontend static files (adjust path if you move to /frontend)
app.use(express.static(path.join(__dirname, '..', 'Frontend')));

app.use('/api/auth', authRoutes);
app.use('/api/flights', flightRoutes);
app.use('/api/bookings', bookingRoutes);

// Fallback to index.html for SPA routes (optional)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'Frontend', 'app.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));