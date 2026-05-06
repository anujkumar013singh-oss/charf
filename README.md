# QAMS Global - ISO Certification Website

A production-grade Single Page Application (SPA) for QAMS Global — a professional ISO certification, audit, and training body based in Noida, India.

## Features

- **Single Page Application** with smooth scroll navigation
- **16 Responsive Sections**: Hero, Services, Certifications, About, Mission, Contact, and more
- **Premium Design**: Deep navy + gold palette with fluid typography
- **Advanced Animations**: GSAP ScrollTrigger, Framer Motion, Lenis smooth scroll
- **Interactive Components**: Certificate search, contact form, FAQ accordion
- **Backend API**: Node.js + Express + MongoDB for form submissions and certificate verification

## Tech Stack

### Frontend
- React.js with Vite
- Tailwind CSS v3
- GSAP + ScrollTrigger
- Framer Motion
- Lenis (smooth scroll)
- Swiper.js (hero slider)
- Lucide React (icons)

### Backend
- Node.js v20
- Express.js v4
- MongoDB Atlas
- Mongoose ODM
- Nodemailer (email notifications)

## Project Structure

```
qams-global/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/    # Navbar, Footer
│   │   │   ├── sections/  # All page sections
│   │   │   └── ui/        # Reusable UI components
│   │   ├── context/       # LenisContext
│   │   ├── hooks/         # Custom React hooks
│   │   ├── styles/        # Global CSS
│   │   └── utils/         # API utilities
│   └── public/
│
└── server/                 # Express backend
    ├── index.js
    ├── routes/            # API routes
    ├── models/            # Mongoose models
    └── middleware/        # Error handlers
```

## Getting Started

### Prerequisites
- Node.js v20+
- MongoDB (local or Atlas)

### Installation

1. **Clone and navigate to the project:**
   ```bash
   cd qams-global
   ```

2. **Install frontend dependencies:**
   ```bash
   cd client
   npm install
   ```

3. **Install backend dependencies:**
   ```bash
   cd ../server
   npm install
   ```

4. **Set up environment variables:**
   
   Create `/server/.env`:
   ```
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/qams
   CLIENT_URL=http://localhost:5173
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   ```

### Development

1. **Start the backend server:**
   ```bash
   cd server
   npm run dev
   ```

2. **Start the frontend dev server:**
   ```bash
   cd client
   npm run dev
   ```

3. **Seed sample certificates (optional):**
   ```bash
   curl -X POST http://localhost:5000/api/search/seed
   ```

4. **Open the website:**
   Navigate to `http://localhost:5173`

### Production Build

1. **Build the frontend:**
   ```bash
   cd client
   npm run build
   ```

2. **Start the production server:**
   ```bash
   cd ../server
   npm start
   ```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/contact` | Submit contact form |
| GET | `/api/search?cert=XXX` | Search certificate |
| POST | `/api/search/seed` | Seed sample certificates |
| GET | `/api/health` | Health check |

## Sample Certificate Numbers

For testing the certificate verification:
- `QAMS-ISO9001-2024-0001`
- `QAMS-ISO14001-2024-0002`
- `QAMS-ISO45001-2024-0003`

## Sections Overview

1. **Hero Slider** - Full-screen image carousel with GSAP animations
2. **Trust Bar** - Infinite scrolling accreditation ticker
3. **Statistics** - Animated counters with CountUp
4. **Services** - 3 service cards with hover effects
5. **How It Works** - 4-step timeline with drawing animation
6. **Certifications** - Filterable grid of 15+ ISO standards
7. **Industries** - 12 industry cards on navy background
8. **About Us** - 2-column layout with image
9. **Mission** - Text generate effect + core values
10. **Search Certificate** - Certificate verification tool
11. **Testimonials** - Auto-cycling testimonial carousel
12. **FAQ** - 5-question accordion
13. **Policy** - 5-tab policy content
14. **CTA Banner** - Animated gradient call-to-action
15. **Contact** - Full contact form with validation + map
16. **Footer** - 4-column footer with links

## Design System

- **Colors**: Navy (#0C2340), Gold (#D4A017), Off-white (#F7F9FC)
- **Fonts**: Poppins (headings), Inter (body), JetBrains Mono (mono)
- **Spacing**: Tailwind default scale
- **Shadows**: Custom shadow tokens for cards and glows

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## License

&copy; 2025 QAMS Global. All rights reserved.
