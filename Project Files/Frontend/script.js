const cities = [
    "Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Ahmedabad", "Chennai",
    "Kolkata", "Pune", "Jaipur", "Surat", "Lucknow", "Kanpur",
    "Nagpur", "Indore", "Thane", "Bhopal", "Visakhapatnam", "Patna",
    "Vadodara", "Ghaziabad", "Ludhiana", "Agra", "Nashik", "Faridabad",
    "Meerut", "Rajkot", "Kalyan-Dombivali", "Vasai-Virar", "Varanasi",
    "Srinagar", "Aurangabad", "Dhanbad", "Amritsar", "Navi Mumbai",
    "Allahabad", "Ranchi", "Howrah", "Coimbatore", "Jabalpur",
    "Gwalior", "Vijayawada", "Jodhpur", "Madurai", "Raipur",
    "Kota", "Guwahati", "Chandigarh", "Solapur", "Hubballi-Dharwad",
    "Mysuru", "Tiruchirappalli", "Bareilly", "Aligarh", "Moradabad",
    "Gurgaon", "Noida", "Bhilai", "Salem", "Warangal", "Guntur",
    "Bhiwandi", "Saharanpur", "Gorakhpur", "Bikaner","Mangalore"
  ];
    // Autocomplete function
    function autocomplete(inp, arr) {
      let currentFocus;
      inp.addEventListener("input", function(e) {
        let a, b, i, val = this.value;
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(a);
        for (i = 0; i < arr.length; i++) {
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            b = document.createElement("DIV");
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            b.addEventListener("click", function(e) {
              inp.value = this.getElementsByTagName("input")[0].value;
              closeAllLists();
            });
            a.appendChild(b);
          }
        }
      });

      inp.addEventListener("keydown", function(e) {
        let x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          currentFocus++;
          addActive(x);
        } else if (e.keyCode == 38) {
          currentFocus--;
          addActive(x);
        } else if (e.keyCode == 13) {
          e.preventDefault();
          if (currentFocus > -1) {
            if (x) x[currentFocus].click();
          }
        }
      });

      function addActive(x) {
        if (!x) return false;
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        x[currentFocus].classList.add("autocomplete-active");
      }

      function removeActive(x) {
        for (let i = 0; i < x.length; i++) {
          x[i].classList.remove("autocomplete-active");
        }
      }

      function closeAllLists(elmnt) {
        const x = document.getElementsByClassName("autocomplete-items");
        for (let i = 0; i < x.length; i++) {
          if (elmnt != x[i] && elmnt != inp) {
            x[i].parentNode.removeChild(x[i]);
          }
        }
      }

      document.addEventListener("click", function (e) {
        closeAllLists(e.target);
      });
    }

    autocomplete(document.getElementById("from"), cities);
    autocomplete(document.getElementById("to"), cities);

    //Upcoming holidays
const holidays = [
  {
    name: "Independence Day",
    date: "August 15, 2025 (Friday)",
    ideas: "Goa, Manali, Andaman"
  },
  {
    name: "Ganesh Chaturthi",
    date: "August 29, 2025 (Friday)",
    ideas: "Mumbai, Pune, Lonavala"
  },
  {
    name: "Gandhi Jayanti",
    date: "October 2, 2025 (Thursday)",
    ideas: "Jaipur, Udaipur, Agra"
  },
  {
    name: "Diwali",
    date: "October 20, 2025 (Monday)",
    ideas: "Varanasi, Amritsar, Delhi"
  },
  {
    name: "Christmas",
    date: "December 25, 2025 (Thursday)",
    ideas: "Shimla, Ooty, Kerala"
  }
];

// Render holidays dynamically
const holidaysGrid = document.getElementById('holidays-grid');
if (holidaysGrid) {
  holidaysGrid.innerHTML = holidays.map(holiday => `
    <div class="holiday-card">
      <h3>${holiday.name}</h3>
      <p>${holiday.date}</p>
      <span class="getaway-idea">Perfect for: ${holiday.ideas}</span>
    </div>
  `).join('');
}

// Example: Replace this with a fetch('/api/faqs') call in production
const faqs = [
  { question: "How do I book a flight?", answer: "Simply use our search form, select your flight, and follow the booking steps." },
  { question: "Can I cancel or change my booking?", answer: "Yes, you can manage your booking from your account or contact our support." },
  { question: "Are there any hidden charges?", answer: "No, all charges are shown upfront before you confirm your booking." }
];

const faqList = document.getElementById('faq-list');
if (faqList) {
  faqList.innerHTML = faqs.map(faq => `
    <div class="faq-item">
      <div class="faq-question">${faq.question}</div>
      <div class="faq-answer">${faq.answer}</div>
    </div>
  `).join('');
}

// Example: Replace this with a fetch('/api/reviews') call in production
const reviews = [
  { text: "Booking was super easy and I got the best deal!", author: "Priya S., Mumbai", rating: 5 },
  { text: "Excellent support and smooth experience.", author: "Rahul K., Delhi", rating: 4 },
  { text: "Loved the getaway ideas for the holidays!", author: "Amit P., Pune", rating: 5 }
];

const reviewsGrid = document.getElementById('reviews-grid');
if (reviewsGrid) {
  reviewsGrid.innerHTML = reviews.map(review => `
    <div class="review-card">
      <div class="review-rating">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
      <div class="review-text">"${review.text}"</div>
      <div class="review-author">- ${review.author}</div>
    </div>
  `).join('');
}

// Example: Fetch flights from backend and log them
fetch('http://localhost:5000/api/flights')
  .then(res => res.json())
  .then(data => {
    console.log(data); // Replace this with code to display flights on your page
  })
  .catch(err => {
    console.error('Error fetching flights:', err);
  });

// flight search form
window.addEventListener('DOMContentLoaded', async function() {
  // Get search parameters from the URL
  const params = new URLSearchParams(window.location.search);
  const from = params.get('from');
  const to = params.get('to');
  const date = params.get('date');

  // Fetch flights from backend
  const res = await fetch(`http://localhost:5000/api/flights/search?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${encodeURIComponent(date)}`);
  const flights = await res.json();

  // Display flights
  const resultsDiv = document.getElementById('flightResults');
  if (flights.length === 0) {
    resultsDiv.innerHTML = '<p>No flights found.</p>';
  } else {
    resultsDiv.innerHTML = flights.map(f =>
      `<div>
        <strong>${f.airline} ${f.flightNumber}</strong><br>
        ${f.from} → ${f.to}<br>
        Departure: ${new Date(f.departure).toLocaleString()}<br>
        Arrival: ${new Date(f.arrival).toLocaleString()}<br>
        Price: $${f.price}
      </div><hr>`
    ).join('');
  }
});
// Profile dropdown and logout functionality
window.addEventListener('DOMContentLoaded', function() {
  const token = localStorage.getItem('token');
  const authButtons = document.querySelector('.auth-buttons');
  if (token && authButtons) {
    // Replace auth buttons with a profile dropdown or icon
    authButtons.innerHTML = `
      <div class="profile-menu">
        <span class="profile-icon" style="font-size:22px;vertical-align:middle;cursor:pointer;">👤</span>
        <div class="profile-dropdown" style="display:none;position:absolute;right:0;background:#fff;border:1px solid #eee;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.08);padding:10px 0;min-width:120px;z-index:100;">
          <a href="profile.html" style="display:block;padding:8px 18px;color:#222;text-decoration:none;">My Profile</a>
          <a href="mybookings.html" style="display:block;padding:8px 18px;color:#222;text-decoration:none;">My Bookings</a>
          <a href="#" id="logoutBtn" style="display:block;padding:8px 18px;color:#ff6b35;text-decoration:none;">Logout</a>
        </div>
      </div>
    `;

    // Show/hide dropdown on icon click
    const profileMenu = authButtons.querySelector('.profile-menu');
    const dropdown = authButtons.querySelector('.profile-dropdown');
    profileMenu.addEventListener('click', function(e) {
      e.stopPropagation();
      dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    });
    // Hide dropdown when clicking outside
    document.addEventListener('click', function() {
      dropdown.style.display = 'none';
    });
    // Logout functionality
    document.getElementById('logoutBtn').addEventListener('click', function(e) {
      e.preventDefault();
      localStorage.removeItem('token');
      window.location.reload();
    });
  }
});
