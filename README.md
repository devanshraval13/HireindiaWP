# 🇮🇳 Hire India — Job Portal Web Application

> India's modern job portal connecting talented professionals with top companies — built entirely with HTML, CSS & Vanilla JavaScript.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

---

## 📌 Table of Contents

- [About the Project](#about-the-project)
- [Live Demo](#live-demo)
- [Features](#features)
- [Pages Overview](#pages-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [How It Works](#how-it-works)
- [Screenshots](#screenshots)
- [Authentication Flow](#authentication-flow)
- [LocalStorage Schema](#localstorage-schema)
- [Responsive Design](#responsive-design)
- [Future Improvements](#future-improvements)
- [References](#references)
- [License](#license)

---

## 📖 About the Project

**Hire India** is a fully functional, multi-page job portal web application. It was built as an academic project to demonstrate real-world front-end development skills including:

- Semantic HTML5 structure
- Advanced CSS3 layouts (Flexbox & Grid)
- Vanilla JavaScript (ES6+) for interactivity
- Client-side authentication using LocalStorage
- Real-time search and filter functionality
- Interactive maps using Leaflet.js

The project simulates a production-grade job portal inspired by platforms like Naukri, LinkedIn, and Indeed — tailored for the Indian market.

---

## 🌐 Live Demo

```
Open index.html in any modern web browser — no server required.
```

Or host on GitHub Pages:

```
https://username.github.io/hire-india/
```

> Replace `username` with your actual GitHub username.

---

## ✨ Features

### For Job Seekers
- ✅ Free account registration with role selection (Job Seeker / Employer)
- ✅ Secure login with session persistence
- ✅ Browse 50,000+ job listings (12 demo jobs included)
- ✅ Search by keyword, location, job type, and salary range
- ✅ Filter sidebar — industry, experience level, salary slider
- ✅ One-click job application with duplicate prevention
- ✅ Save/bookmark jobs for later
- ✅ Track all applied jobs
- ✅ Export/import saved job data as JSON

### For Employers
- ✅ Register as Employer role
- ✅ Browse company listings (12 top companies)
- ✅ Filter companies by industry type

### General
- ✅ Fully responsive — works on mobile, tablet, and desktop
- ✅ Sticky header with active navigation state
- ✅ Toast notifications for all user actions
- ✅ Live Leaflet.js map with geolocation on Contact page
- ✅ Nearby jobs shown based on user location
- ✅ Collapsible FAQ section
- ✅ Password strength meter on signup
- ✅ Duplicate email detection during registration
- ✅ Form validation on all pages

---

## 📄 Pages Overview

| File | Page | Description |
|------|------|-------------|
| `index.html` | Homepage | Hero search, featured jobs, categories, CTA, testimonials |
| `login.html` | Login | Email/password login, session creation, redirect handling |
| `signup.html` | Register | Full registration form, role picker, password strength |
| `job.html` | Jobs | 12 jobs, search/filter, apply, save, sidebar filters |
| `company.html` | Companies | 12 companies, tab filters, view jobs redirect |
| `about.html` | About | Team, values, impact stats, mission |
| `contact.html` | Contact | Form, Leaflet map, geolocation, nearby jobs, FAQ |

---

## 🛠️ Tech Stack

| Technology | Usage |
|------------|-------|
| **HTML5** | Semantic page structure, forms, accessibility |
| **CSS3** | Flexbox, Grid, animations, gradients, responsive breakpoints |
| **Vanilla JavaScript (ES6+)** | DOM manipulation, events, closures, constructors |
| **LocalStorage API** | User accounts, sessions, saved jobs, applications |
| **Leaflet.js** | Interactive map on contact page |
| **OpenStreetMap** | Free map tile source for Leaflet |
| **Google Fonts** | Syne (headings) + DM Sans (body) typefaces |
| **CSS Custom Properties** | Design token system (colors, spacing) |

> **No frameworks. No build tools. No dependencies beyond CDN links.**

---

## 📁 Project Structure

```
hire-india/
│
├── index.html          # Homepage
├── login.html          # Login page
├── signup.html         # Registration page
├── job.html            # Job listings page
├── company.html        # Companies page
├── about.html          # About us page
├── contact.html        # Contact page
│
├── README.md           # This file
│
└── assets/             # (optional — if you add images/icons)
    └── logo.png
```

> All CSS is embedded within each HTML file using `<style>` tags.  
> All JavaScript is embedded within each HTML file using `<script>` tags.  
> No external `.css` or `.js` files are required.

---

## 🚀 Getting Started

### Prerequisites

- Any modern browser (Chrome, Firefox, Edge, Safari)
- No Node.js, no npm, no server needed

### Installation

**Option 1 — Open directly**

```bash
# Clone the repo
git clone https://github.com/username/hire-india.git

# Navigate into the folder
cd hire-india

# Open in browser
open index.html         # macOS
start index.html        # Windows
xdg-open index.html     # Linux
```

**Option 2 — VS Code Live Server**

1. Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension
2. Right-click `index.html` → **Open with Live Server**

**Option 3 — GitHub Pages**

1. Push the repository to GitHub
2. Go to **Settings → Pages**
3. Set source to `main` branch, root `/`
4. Visit `https://username.github.io/hire-india/`

---

## ⚙️ How It Works

### User Registration

1. User fills in the signup form at `signup.html`
2. On submit, JavaScript validates all fields client-side
3. User object is created and pushed to the `hi_users` array in LocalStorage
4. Session is stored in `hi_user` key
5. User is redirected to `index.html`

```javascript
// User object schema
{
  id: 1713000000000,
  name: "Ravi Kumar",
  firstName: "Ravi",
  lastName: "Kumar",
  email: "ravi@example.com",
  mobile: "9876543210",
  password: "mypassword",
  role: "Job Seeker",
  joined: "22/06/2026",
  avatar: "R"
}
```

### Job Application

1. User clicks **Apply Now** on any job card
2. JavaScript checks if user is logged in (reads `hi_user` from LocalStorage)
3. If not logged in → shows toast → redirects to `login.html?redirect=job.html`
4. If logged in → checks for duplicate application
5. Application record is saved to `hi_applications` in LocalStorage
6. Button updates to "✅ Applied"

### Job Search & Filtering

```javascript
// URL parameter support — jobs page reads these on load
job.html?q=Frontend Developer&loc=Bengaluru

// Filtering logic
filtered = ALL_JOBS.filter(job => {
  if (search && !job.title.includes(search)) return false;
  if (location && job.location !== location) return false;
  if (type && job.type !== type) return false;
  if (job.salary > maxSalary) return false;
  return true;
});
```

---

## 📸 Screenshots

| Page | Preview |
|------|---------|
| Homepage | Hero section with search, trust stats, featured jobs |
| Login | Split layout — features sidebar + login form |
| Register | Green sidebar with steps + 6-field registration form |
| Jobs | Filter sidebar + 12 job cards with Apply/Save buttons |
| Companies | 9 company cards with stats and View Jobs buttons |
| About | Mission, values, impact stats, team section |
| Contact | Form + Leaflet map with HQ marker + nearby jobs |

> See `HireIndia_Website.pdf` for full-page screenshots of every page.

---

## 🔐 Authentication Flow

```
[Visit any page]
      │
      ├─ hi_user in LocalStorage?
      │         │
      │       YES → Show user avatar + name + Logout button
      │        NO → Show Login + Register buttons
      │
[Click Apply Now]
      │
      ├─ Logged in?
      │       NO  → Toast: "Please login" → redirect to login.html
      │       YES → Already applied? → Toast: "Already applied"
      │                          NO  → Save to hi_applications → Toast: "Applied!"
      │
[Click Logout]
      │
      └─ Remove hi_user from LocalStorage → Reload page
```

---

## 💾 LocalStorage Schema

| Key | Type | Description |
|-----|------|-------------|
| `hi_users` | Array | All registered user accounts |
| `hi_user` | Object | Currently logged-in user session |
| `hi_applications` | Array | All job applications across all users |
| `hi_saved_jobs` | Array | Jobs saved/bookmarked by current user |

```javascript
// hi_applications entry
{
  jobId: 1,
  job: "Frontend Developer",
  company: "Google",
  email: "user@example.com",
  date: "22/06/2026, 10:30:00 AM",
  status: "Under Review"
}

// hi_saved_jobs entry
{
  id: 1,
  title: "Frontend Developer",
  company: "Google",
  location: "Bengaluru",
  salary: 16,
  savedDate: "22/06/2026, 10:30:00 AM"
}
```

---

## 📱 Responsive Design

The project uses CSS media queries to support all screen sizes:

| Breakpoint | Layout |
|------------|--------|
| `> 1024px` | Full desktop — multi-column grids, side panels |
| `768px – 1024px` | Tablet — single column hero, collapsed sidebars |
| `< 768px` | Mobile — stacked layouts, hamburger nav hidden (CSS only) |

Key CSS techniques used:

```css
/* CSS Grid for job cards */
display: grid;
grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));

/* Flexbox for header */
display: flex;
justify-content: space-between;
align-items: center;

/* CSS Custom Properties */
:root {
  --navy: #0a1628;
  --blue: #1a56db;
  --accent: #f59e0b;
}
```

---

## 🔮 Future Improvements

- [ ] Backend integration (Node.js + Express + MongoDB)
- [ ] Real JWT-based authentication
- [ ] Resume upload and parsing
- [ ] Email notifications for applications
- [ ] Employer dashboard to post and manage jobs
- [ ] AI-powered job recommendation engine
- [ ] Chat between employers and candidates
- [ ] Dark mode toggle
- [ ] PWA (Progressive Web App) support
- [ ] Internationalisation (Hindi, Tamil, etc.)

---

## 📚 References

| # | Resource | URL |
|---|----------|-----|
| 1 | MDN Web Docs — HTML, CSS, JS reference | https://developer.mozilla.org |
| 2 | W3Schools — Web tutorials | https://www.w3schools.com |
| 3 | Leaflet.js — Interactive maps | https://leafletjs.com |
| 4 | Google Fonts — Syne & DM Sans | https://fonts.google.com |
| 5 | LocalStorage API — MDN | https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage |
| 6 | OpenStreetMap — Map tiles | https://www.openstreetmap.org |
| 7 | CSS-Tricks — Flexbox & Grid guides | https://css-tricks.com |
| 8 | Naukri.com — UX design inspiration | https://www.naukri.com |
| 9 | LinkedIn Jobs — UI design reference | https://www.linkedin.com/jobs |
| 10 | Can I Use — Browser compatibility | https://caniuse.com |

---

## 👨‍💻 Author

**Your Name**  
B.Tech / BCA / BSc Computer Science  
Roll No: XXXXXXX  
Institution: Your College Name

---

## 📝 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2026 Hire India

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

---

<div align="center">
  Made with ❤️ in India &nbsp;·&nbsp; © 2026 Hire India.com
</div>
