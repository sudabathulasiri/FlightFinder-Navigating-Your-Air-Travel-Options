# Project Report: FlightFinder

## 1. Introduction

**FlightFinder** is a full-stack web application designed to simplify the process of searching, booking, and managing flights. The platform provides a seamless experience for both users and administrators, featuring secure authentication, a modern UI, and robust backend management.

---

## 2. Objectives

- Enable users to search for flights by route and date.
- Allow users to book flights, select seats, and manage their bookings.
- Provide an admin panel for managing flights, bookings, and users.
- Ensure secure authentication and data management.
- Deliver a responsive and user-friendly interface.

---

## 3. Tech Stack

- **Frontend:** HTML, CSS, JavaScript (Vanilla)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (with Mongoose ODM)
- **Authentication:** JWT (JSON Web Tokens)
- **Email Service:** Nodemailer (for password reset)

---

## 4. Project Structure

```
project file/
├── Backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── node_modules/
│   ├── .env
│   ├── server.js
│   └── ...other backend files
├── Frontend/
│   ├── app.html
│   ├── admin.html
│   ├── admin-login.html
│   ├── bookings.html
│   ├── flights.html
│   ├── offers.html
│   ├── profile.html
│   ├── script.js
│   ├── selectedseats.html
│   ├── signin.html
│   ├── signup.html
│   ├── support.html
│   ├── transaction.html
│   ├── about.html
│   ├── forgot-password.html
│   ├── reset-password.html
│   └── ...other frontend files
├── .gitignore
├── README.md
└── LICENSE
```

---

## 5. Features

### User Features
- **Sign Up / Sign In:** Secure registration and login with JWT authentication.
- **Flight Search:** Search for flights by route, date, and other criteria.
- **Booking:** Book flights, select seats, and make payments.
- **My Bookings:** View and manage current and past bookings, including cancellation.
- **Profile Management:** Update personal information and reset password.
- **Password Reset:** Request a reset code via email and set a new password.

### Admin Features
- **Admin Login:** Secure admin authentication.
- **Flight Management:** Add, update, or delete flights.
- **Booking Management:** View and manage all user bookings.
- **User Management:** Monitor and manage user accounts.

---

## 6. Application Flow

### User
1. Register or log in.
2. Search for flights.
3. Book a flight and select seats.
4. Make payment and confirm booking.
5. View or cancel bookings as needed.

### Admin
1. Log in to the admin panel.
2. Add or update flight details.
3. View and manage all bookings and users.

---

## 7. Database Design

- **User:** Stores user details, hashed passwords, role (user/admin), and reset tokens.
- **Flight:** Stores flight details, seat availability, and pricing.
- **Booking:** Stores booking details, user reference, flight reference, seat selection, and status.

---

## 8. Security

- Passwords are hashed using bcrypt.
- JWT is used for authentication and authorization.
- Sensitive data (like JWT secret, DB URI, email credentials) is stored in `.env` and not committed to version control.
- Admin routes are protected and only accessible to users with the admin role.

---

## 9. How to Make a User an Admin

To promote a user to admin, update their `role` field in the database to `"admin"` using MongoDB Compass or the shell.  
(See the README for detailed steps.)

---

## 10. Conclusion

FlightFinder provides a robust, secure, and user-friendly platform for flight booking and management. The modular structure and clear separation of frontend and backend make it easy to maintain and extend.

---

## 11. Team

- S. Srinija
- T. Lakshmi Sravani
- M. Subhash
- S. Madhu Pavan

---

**Made with ❤️ by Team FlightFinder**