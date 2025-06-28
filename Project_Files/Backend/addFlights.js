const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  seatNumber: String,
  isBooked: { type: Boolean, default: false }
});

const flightSchema = new mongoose.Schema({
  airline: String,
  flightNumber: String,
  from: String,
  to: String,
  departure: Date,
  arrival: Date,
  price: Number,
  seatsAvailable: Number,
  seats: [seatSchema] // <-- Add this line
});

const Flight = mongoose.model('Flight', flightSchema);

// Helper to generate seat numbers (e.g., 1A, 1B, ..., 5F)
function generateSeats(count) {
  const seats = [];
  const rows = Math.ceil(count / 6);
  const cols = ['A', 'B', 'C', 'D', 'E', 'F'];
  let seatCount = 0;
  for (let r = 1; r <= rows && seatCount < count; r++) {
    for (let c of cols) {
      if (seatCount < count) {
        seats.push({ seatNumber: `${r}${c}`, isBooked: false });
        seatCount++;
      }
    }
  }
  return seats;
}

const flights = [
  {
    airline: "IndiGo",
    flightNumber: "6E-101",
    from: "Mumbai",
    to: "Bangalore",
    departure: new Date("2025-07-02T07:00:00.000Z"),
    arrival: new Date("2025-07-02T09:00:00.000Z"),
    price: 3999,
    seatsAvailable: 25
  },
  {
    airline: "Air India",
    flightNumber: "AI-202",
    from: "Hyderabad",
    to: "Chennai",
    departure: new Date("2025-07-03T11:00:00.000Z"),
    arrival: new Date("2025-07-03T12:30:00.000Z"),
    price: 2999,
    seatsAvailable: 15
  },
  {
    airline: "SpiceJet",
    flightNumber: "SG-303",
    from: "Kolkata",
    to: "Delhi",
    departure: "2025-07-04T14:30:00.000Z",
    arrival: "2025-07-04T17:00:00.000Z",
    price: 4599,
    seatsAvailable: 18
  },
  {
    airline: "Vistara",
    flightNumber: "UK-404",
    from: "Pune",
    to: "Goa",
    departure: "2025-07-05T09:30:00.000Z",
    arrival: "2025-07-05T10:45:00.000Z",
    price: 2799,
    seatsAvailable: 10
  },
  {
    airline: "IndiGo",
    flightNumber: "6E-505",
    from: "Bangalore",
    to: "Hyderabad",
    departure: "2025-07-06T06:00:00.000Z",
    arrival: "2025-07-06T07:15:00.000Z",
    price: 2499,
    seatsAvailable: 30
  },
  {
    airline: "Air India",
    flightNumber: "AI-606",
    from: "Delhi",
    to: "Kolkata",
    departure: "2025-07-07T16:00:00.000Z",
    arrival: "2025-07-07T18:30:00.000Z",
    price: 4699,
    seatsAvailable: 22
  },
  {
    airline: "SpiceJet",
    flightNumber: "SG-707",
    from: "Mumbai",
    to: "Jaipur",
    departure: "2025-07-08T10:00:00.000Z",
    arrival: "2025-07-08T12:00:00.000Z",
    price: 3899,
    seatsAvailable: 20
  },
  {
    airline: "SpiceJet",
    flightNumber: "SG-708",
    from: "Jaipur",
    to: "Mumbai",
    departure: "2025-07-12T18:00:00.000Z",
    arrival: "2025-07-12T20:00:00.000Z",
    price: 3899,
    seatsAvailable: 20
  },
  {
    airline: "Vistara",
    flightNumber: "UK-909",
    from: "Delhi",
    to: "Bangalore",
    departure: "2025-07-09T08:00:00.000Z",
    arrival: "2025-07-09T10:30:00.000Z",
    price: 4999,
    seatsAvailable: 12
  },
  {
    airline: "Vistara",
    flightNumber: "UK-910",
    from: "Bangalore",
    to: "Delhi",
    departure: "2025-07-13T19:00:00.000Z",
    arrival: "2025-07-13T21:30:00.000Z",
    price: 4999,
    seatsAvailable: 12
  },
  // ✅ User custom batch (your requested pairs)
  {
    airline: "IndiGo",
    flightNumber: "6E-123",
    from: "Mumbai",
    to: "Chennai",
    departure: "2025-07-02T06:00:00.000Z",
    arrival: "2025-07-02T08:30:00.000Z",
    price: 4599,
    seatsAvailable: 25
  },
  {
    airline: "Air India",
    flightNumber: "AI-456",
    from: "Hyderabad",
    to: "Kolkata",
    departure: "2025-07-03T09:00:00.000Z",
    arrival: "2025-07-03T11:45:00.000Z",
    price: 4999,
    seatsAvailable: 20
  },
  {
    airline: "Vistara",
    flightNumber: "UK-789",
    from: "Lucknow",
    to: "Bangalore",
    departure: "2025-07-04T15:00:00.000Z",
    arrival: "2025-07-04T18:00:00.000Z",
    price: 5299,
    seatsAvailable: 18
  },
  {
    airline: "SpiceJet",
    flightNumber: "SG-321",
    from: "Pune",
    to: "Jaipur",
    departure: "2025-07-05T07:30:00.000Z",
    arrival: "2025-07-05T09:30:00.000Z",
    price: 3899,
    seatsAvailable: 22
  },
  {
    airline: "IndiGo",
    flightNumber: "6E-654",
    from: "Ahmedabad",
    to: "Delhi",
    departure: "2025-07-06T12:00:00.000Z",
    arrival: "2025-07-06T14:00:00.000Z",
    price: 4199,
    seatsAvailable: 30
  },
  {
    airline: "Air India",
    flightNumber: "AI-987",
    from: "Bhopal",
    to: "Nagpur",
    departure: "2025-07-07T10:00:00.000Z",
    arrival: "2025-07-07T11:00:00.000Z",
    price: 2599,
    seatsAvailable: 15
  },
  {
    airline: "Air India",
    flightNumber: "AI-988",
    from: "Nagpur",
    to: "Bhopal",
    departure: "2025-07-10T17:00:00.000Z",
    arrival: "2025-07-10T18:00:00.000Z",
    price: 2599,
    seatsAvailable: 15
  },
  {
    airline: "SpiceJet",
    flightNumber: "SG-555",
    from: "Guwahati",
    to: "Patna",
    departure: "2025-07-08T13:00:00.000Z",
    arrival: "2025-07-08T14:30:00.000Z",
    price: 3499,
    seatsAvailable: 12
  },
  {
    airline: "SpiceJet",
    flightNumber: "SG-556",
    from: "Patna",
    to: "Guwahati",
    departure: "2025-07-12T08:00:00.000Z",
    arrival: "2025-07-12T09:30:00.000Z",
    price: 3499,
    seatsAvailable: 12
  },
  {
    airline: "Vistara",
    flightNumber: "UK-432",
    from: "Noida",
    to: "Varanasi",
    departure: "2025-07-09T16:00:00.000Z",
    arrival: "2025-07-09T18:00:00.000Z",
    price: 3199,
    seatsAvailable: 20
  },
  // ✅ Vijayawada special batch
  {
    airline: "IndiGo",
    flightNumber: "6E-2001",
    from: "Vijayawada",
    to: "Hyderabad",
    departure: "2025-07-02T08:00:00.000Z",
    arrival: "2025-07-02T09:00:00.000Z",
    price: 2299,
    seatsAvailable: 30
  },
  {
    airline: "Air India",
    flightNumber: "AI-2002",
    from: "Vijayawada",
    to: "Bangalore",
    departure: "2025-07-03T12:30:00.000Z",
    arrival: "2025-07-03T14:00:00.000Z",
    price: 3199,
    seatsAvailable: 25
  },
  {
    airline: "SpiceJet",
    flightNumber: "SG-2003",
    from: "Chennai",
    to: "Vijayawada",
    departure: "2025-07-04T10:00:00.000Z",
    arrival: "2025-07-04T11:10:00.000Z",
    price: 1999,
    seatsAvailable: 20
  },
  {
    airline: "Vistara",
    flightNumber: "UK-2004",
    from: "Vijayawada",
    to: "Delhi",
    departure: "2025-07-05T15:00:00.000Z",
    arrival: "2025-07-05T17:45:00.000Z",
    price: 5499,
    seatsAvailable: 18
  },
  {
    airline: "IndiGo",
    flightNumber: "6E-2005",
    from: "Mumbai",
    to: "Vijayawada",
    departure: "2025-07-06T07:30:00.000Z",
    arrival: "2025-07-06T09:30:00.000Z",
    price: 4999,
    seatsAvailable: 22
  },
  {
    airline: "Air India",
    flightNumber: "AI-303",
    from: "Mangalore",
    to: "Bangalore",
    departure: "2025-07-05T08:30:00.000Z",
    arrival: "2025-07-05T09:45:00.000Z",
    price: 2999,
    seatsAvailable: 25
  },
  {
    airline: "IndiGo",
    flightNumber: "6E-504",
    from: "Mangalore",
    to: "Mumbai",
    departure: "2025-07-05T11:15:00.000Z",
    arrival: "2025-07-05T13:00:00.000Z",
    price: 3999,
    seatsAvailable: 20
  },
  {
    airline: "SpiceJet",
    flightNumber: "SG-1207",
    from: "Mangalore",
    to: "Hyderabad",
    departure: "2025-07-05T17:00:00.000Z",
    arrival: "2025-07-05T19:00:00.000Z",
    price: 3599,
    seatsAvailable: 15
  },
  {
    airline: "Vistara",
    flightNumber: "UK-2201",
    from: "Mangalore",
    to: "Delhi",
    departure: "2025-07-05T20:30:00.000Z",
    arrival: "2025-07-05T23:45:00.000Z",
    price: 5999,
    seatsAvailable: 18
  },
  {
    airline: "Vistara",
    flightNumber: "UK-2201",
    from: "Vijayawada",
    to: "Mangalore",
    departure: "2025-07-05T20:30:00.000Z",
    arrival: "2025-07-05T23:45:00.000Z",
    price: 5999,
    seatsAvailable: 18
  }
];

// Add seats array to each flight
for (let flight of flights) {
  flight.seats = generateSeats(flight.seatsAvailable || 30);
}

mongoose.connect('mongodb://localhost:27017/flightfinder', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    await Flight.deleteMany({});
    await Flight.insertMany(flights);
    console.log("Flights added successfully!");
    mongoose.connection.close();
  })
  .catch(err => {
    console.error(err);
    mongoose.connection.close();
  });