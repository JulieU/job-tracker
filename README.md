# Job Tracker

A full-stack Kanban board application for tracking job applications through the hiring process.

**Live Demo:** https://job-tracker-ck5rkwk66-julieus-projects.vercel.app

---

## Features

- Kanban board with 5 columns — Saved, Applied, Interview, Offer, Rejected
- Add job applications with title, company, location, salary, URL and notes
- Automatic company logo fetching via Logo.dev API
- Edit job details with a pre-filled form
- Delete job applications
- Drag and drop cards between columns with optimistic updates
- Click any card to view full details and notes

---

## Tech Stack

### Frontend

- React + TypeScript
- Vite
- Tailwind CSS
- dnd-kit (drag and drop)
- Axios

### Backend

- Node.js + Express + TypeScript
- Prisma ORM
- PostgreSQL
- Logo.dev API

### Deployment

- Frontend → Vercel
- Backend + Database → Railway

---

## Architecture

```
Vercel (React Frontend)
        ↓
Railway (Express REST API)
        ↓
Railway PostgreSQL Database
        ↓
Logo.dev API (company logos)
```

---

## API Endpoints

| Method | Endpoint               | Description                             |
| ------ | ---------------------- | --------------------------------------- |
| GET    | /api/boards            | Fetch all boards with columns and cards |
| POST   | /api/boards            | Create a new board                      |
| DELETE | /api/boards/:id        | Delete a board                          |
| POST   | /api/columns/:id/cards | Create a job card                       |
| PATCH  | /api/cards/:id         | Update or move a card                   |
| DELETE | /api/cards/:id         | Delete a card                           |
| GET    | /api/logo?company=X    | Fetch company logo                      |

---

## Running Locally

### Prerequisites

- Node.js 20+
- PostgreSQL

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder:

```bash
DATABASE_URL="postgresql://your_username@localhost:5432/jobtracker"
PORT=5000
LOGO_DEV_API_KEY=your_logo_dev_api_key
FRONTEND_URL=http://localhost:5173
```

Run migrations and start the server:

```bash
npx prisma@5.22.0 migrate dev
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env.local` file in the `frontend` folder:

```bash
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## Database Schema

```
Board
  └── Column (Saved, Applied, Interview, Offer, Rejected)
        └── Card (job application details)
```

### Models

**Board** — the main Kanban board

**Column** — each stage of the hiring process (Saved → Applied → Interview → Offer → Rejected)

**Card** — individual job application with the following fields:

- Title, Company, Location, Salary
- Job URL, Notes
- Company Logo URL (auto-fetched)
- Order (for drag and drop positioning)

---

## Project Structure

```
job-tracker/
├── backend/
│   ├── src/
│   │   ├── controllers/      # Route handlers
│   │   ├── routes/           # API routes
│   │   ├── services/         # Business logic (logo fetching)
│   │   ├── types/            # TypeScript interfaces
│   │   ├── lib/              # Prisma client
│   │   └── index.ts          # Express server entry point
│   └── prisma/
│       └── schema.prisma     # Database schema
└── frontend/
    └── src/
        ├── components/
        │   ├── Board/         # Kanban board container
        │   ├── Column/        # Individual columns
        │   ├── Card/          # Job cards
        │   └── Modal/         # Add, Edit and Detail modals
        ├── api/               # Backend API calls
        └── types/             # TypeScript interfaces
```

---

## What I Learned

- Building a REST API with Express and TypeScript
- Database schema design with Prisma ORM
- React component architecture and state management
- TypeScript interfaces and type safety across the full stack
- Drag and drop with optimistic UI updates
- Deploying a full stack application to Vercel and Railway
- Git version control and GitHub workflow
