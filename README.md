# Almas Estates — Full MERN Property Platform

A complete real-estate marketplace (inspired by the general layout and feature set of sites like PropertyFinder.ae) built with **MongoDB, Express, React, Node** — including a full admin panel for managing every listing, agent, and page's editable content.

> Branding note: this is an original platform ("Almas Estates") with its own name, palette and copy — it does not reuse PropertyFinder's logo, trademarks, or copyrighted content.

## Features

**Public site**
- Home page with animated hero (skyline SVG + floating search card), featured listings, stats
- Buy / Rent listing pages with filters (city, type, bedrooms, max price) + pagination
- Property detail page with image gallery, amenities, agent contact card
- Agents directory + individual agent profile with their active listings
- About & Contact pages (copy is admin-editable)

**Admin panel** (`/admin/login`)
- JWT-authenticated login
- Dashboard with live stats (total listings, for sale/rent counts, most-viewed)
- Full CRUD for listings (create/edit/delete, image upload, feature toggle, status)
- Full CRUD for agents
- Editable site copy for Home / About / Contact pages — no redeploy needed

## Tech stack
- **Backend**: Node.js, Express, MongoDB (Mongoose), JWT auth, Multer (image uploads)
- **Frontend**: React 18, React Router, Tailwind CSS, Framer Motion, Axios, lucide-react icons

## Getting started

### 1. Prerequisites
- Node.js 18+
- MongoDB running locally (or an Atlas connection string)

### 2. Backend setup
```bash
cd backend
npm install
cp .env.example .env
# edit .env: set MONGO_URI, JWT_SECRET
npm run seed     # populates sample properties, agents, admin user, page content
npm run dev      # starts API on http://localhost:5000
```

Seeded admin login:
- **Email:** admin@almasestates.com
- **Password:** Admin@123

### 3. Frontend setup
```bash
cd frontend
npm install
npm run dev      # starts React app on http://localhost:5173
```

The frontend dev server proxies `/api` and `/uploads` requests to `http://localhost:5000`, so both must be running together.

### 4. Build for production
```bash
cd frontend
npm run build    # outputs static files to frontend/dist
```
Serve `frontend/dist` with any static host, and deploy `backend/` (with a real MongoDB URI and JWT secret) to your Node host of choice.

## Project structure
```
almas-estates/
├── backend/
│   ├── config/db.js
│   ├── models/            (Property, Agent, Admin, Page)
│   ├── routes/            (auth, properties, agents, pages, stats)
│   ├── middleware/        (JWT auth, image upload)
│   ├── seed.js
│   └── server.js
└── frontend/
    └── src/
        ├── api/api.js
        ├── context/AuthContext.jsx
        ├── components/    (Navbar, Footer, Hero, PropertyCard, SearchFilters, AdminSidebar, ProtectedRoute)
        └── pages/
            ├── Home, Listings, PropertyDetail, Agents, AgentDetail, About, Contact
            └── admin/     (AdminLogin, AdminDashboard, ManageListings, ListingForm, ManageAgents, ManagePages)
```

## Notes & next steps you may want
- Swap the placeholder `coverImage`/`images` for a real CDN/S3 setup if deploying publicly (uploads currently save to `backend/uploads` on local disk).
- Add rate-limiting / helmet to `server.js` before production deployment.
- Add a "contact this agent" lead-capture endpoint if you want inquiries to persist in the DB rather than just showing a toast.
- The design uses a "skyline SVG" as a distinct signature element — swap the path data in `Hero.jsx` if you want a different city silhouette.
