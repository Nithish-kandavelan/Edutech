# Personalized Learning Copilot for Core Courses

Single React frontend application providing three role-based interfaces (User, Admin, Client) in one codebase. TailwindCSS for styling, React Router for routing. UI-only auth and AI placeholders ready for future RAG/backend integration.

## Tech Stack
- React 18 (functional components)
- React Router 6
- Tailwind CSS 3
- Vite 5

## Getting Started
1. Install dependencies
   - `npm install`
2. Start dev server
   - `npm run dev`
3. Open http://localhost:5173

## Authentication (UI-only)
- Sign in at `/login` with any email/password.
- Choose a role: `User (Student)`, `Admin`, or `Client (Institution)`.
- Signup available for User and Client at `/signup` (includes Institution Name for Client role).

## Routes
- `/login`, `/signup`
- `/user/*` (Student)
- `/admin/*` (Admin)
- `/client/*` (Client)

## Structure
```
src/
  components/ (ui, common)
  data/ (dummy academic JSON)
  layouts/ (shared dashboards)
  pages/
    auth/ user/ admin/ client/
  routes/ (AuthContext, ProtectedRoute)
```

## Design & Accessibility
- Neutral academic palette, soft shadows, rounded cards, consistent spacing.
- Keyboard focus styles, labeled form controls, semantic tables.
- Fully responsive layouts.

## AI & Backend Placeholders
- Clearly labeled buttons: "Retrieve Snippets (RAG)", analytics placeholders, charts placeholders.
- No backend logic is implemented; components are structured to accept future API data.
