# FlightFinder

**FlightFinder** is a modern, responsive web application for searching, booking, and managing flights. It features a beautiful glassmorphism UI, Indian popular destinations, secure authentication, and a complete booking backend with MongoDB.

## Features

- 🔍 **Smart Flight Search**: Find flights by route and date with real-time results.
- ✈️ **Popular Indian Destinations**: Scrollable cards for top cities.
- 🛡️ **Secure Authentication**: JWT-based sign up/sign in.
- 💳 **Booking & Payment**: Book flights, apply offers, and manage your bookings.
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile.
- 🧑 **Profile & My Bookings**: View your profile and all your bookings.
- 🏦 **MongoDB Backend**: All data is stored securely in MongoDB.
- 🛠️ **Admin Panel**: Manage flights, bookings, and more.

## Tech Stack

- **Frontend**: HTML, CSS (glassmorphism, responsive), JavaScript
- **Backend**: Node.js, Express.js, MongoDB (Mongoose)
- **Authentication**: JWT

## Project Documentation

Documentation for ideation phase, project planning, and the final report is available in the following Google Drive folder:

[Project Documentation (Google Drive)](https://drive.google.com/drive/folders/1aR2JAxJjbCmPphugUMOcVuGwxhKTJ_ZD?usp=sharing)


## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- MongoDB (local or Atlas)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/sudabathulasiri/FlightFinder-Navigating-Your-Air-Travel-Options.git
   cd "project_file"   # or cd FlightFinder if that's your folder name
   ```

2. **Set up the backend:**
   ```sh
   cd Backend
   npm install
   ```

3. **Set up environment variables:**
   - Create a `.env` file inside the `Backend` folder:
     ```
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     PORT=5000
     ```

4. **Start the backend server:**
   ```sh
   npm run dev
   ```
   The backend will run on [http://localhost:5000](http://localhost:5000).

5. **Open the frontend:**
   - Open any HTML file (like `app.html` or `admin.html`) from the `Frontend` folder in your browser.
   - Or use a local server (like VS Code Live Server) to serve the `Frontend` folder.

### Folder Structure

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

## Usage

- **Sign up or sign in** to your account.
- **Search for flights** and book your preferred option.
- **View your bookings** in the "My Bookings" section.
- **Manage your profile** and logout securely.
- **Admins:** Log in via `admin-login.html` to access the admin panel.

## Media

### Screenshots

![Home Page](https://github.com/sudabathulasiri/FlightFinder-Navigating-Your-Air-Travel-Options/blob/main/Project_Files/media/Home.png)
![Signin Page](https://github.com/sudabathulasiri/FlightFinder-Navigating-Your-Air-Travel-Options/blob/main/Project_Files/media/Signin.png)
![Signup Page](https://github.com/sudabathulasiri/FlightFinder-Navigating-Your-Air-Travel-Options/blob/main/Project_Files/media/Signup.png)
![Flights Page](https://github.com/sudabathulasiri/FlightFinder-Navigating-Your-Air-Travel-Options/blob/main/Project_Files/media/Flights.png)

---

*Access detailed reports, planning documents, and additional resources here.*

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## Team

- S. Srinija
- T. Lakshmi Sravani
- M. Subhash
- S. Madhu Pavan

## How to Make a User an Admin

To grant admin privileges to a user, follow these steps after registering the user via the app:

### Using MongoDB Compass (GUI):
1. Open MongoDB Compass and connect to your database.
2. Go to the `users` collection.
3. Find the user you want to promote (search by email).
4. Click the **Edit** (pencil) icon.
5. Change the `role` field from `"user"` to `"admin"`.
6. Save the changes.

### Using MongoDB Shell:
1. Open your terminal and start the MongoDB shell:
   ```sh
   mongosh
   ```
2. Connect to your database:
   ```sh
   use your_database_name
   ```
3. Update the user role:
   ```sh
   db.users.updateOne({ email: "user_email" }, { $set: { role: "admin" } })
   ```
   Replace `your_database_name` with the name of your database and `user_email` with the email of the user.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

**Made with ❤️ for travelers worldwide.**
