# GreenHubRCA Frontend Description

---

## 1. Project Overview

**GreenHubRCA** is the official digital platform of the **RCA GreenTech Initiative** at **Rwanda Coding Academy (RCA)**.

It is a collaborative, role-based frontend prototype that brings together students, teachers, department heads, administrators, and external partners into a unified space for environmental innovation and community impact.

The platform covers:

- **Environmental project publishing** by students and teams
- **Teacher mentorship and endorsement** workflows
- **Department support coordination** across three departments
- **Nyabihu District community outreach** project visibility
- **Green Impact Points** — a recognition system for environmental contributions
- **Investor and partner discovery** of approved public projects

Rwanda Coding Academy is a government-supported school focused on coding excellence and real-world innovation. GreenHubRCA extends that mission into environmental sustainability, giving every student a professional space to turn ideas into documented, supported, and impactful projects.

---

## 2. Purpose of the Platform

GreenHubRCA solves a set of real coordination and visibility problems for the RCA GreenTech Initiative:

| Problem | What GreenHubRCA provides |
|---|---|
| No central place for project ideas | A feed-based project submission and discovery system |
| No structured teacher feedback | A mentorship review system with endorsement actions |
| No department coordination for support | Role-specific department portals with support request routing |
| No visibility for investors or partners | A public-facing project discovery portal |
| No recognition system for contributions | Green Impact Points — measurable, categorized, growing |
| No tracking of student progress | Per-student portfolio with activity stats |
| No structured community outreach record | Dedicated Nyabihu District project tracking |

---

## 3. User Roles

GreenHubRCA supports **nine distinct user roles**, each with a dedicated portal:

### Student
Posts environmental projects and ideas, chooses categories and departments for support, tracks progress, and earns Green Impact Points.

### Teacher
Reviews submitted projects, provides structured feedback, endorses strong ideas, and recommends projects for department support or investor discovery.

### Web Development Department Head
Manages web-based project support requests, assigns department members, tracks hosting and UI/UX needs, and marks projects as demo-ready.

### Embedded Systems Department Head
Coordinates IoT and hardware prototype support, handles material requests (sensors, Arduino boards, casings), and manages prototype testing logistics.

### School & Community Environment Department Head
Oversees campus environment actions (gardens, cleanups, waste handling) and Nyabihu District outreach projects. Manages volunteer coordination and budget requests.

### Secretary
Creates platform announcements, writes meeting notes, manages initiative records, and produces monthly impact reports.

### Finance Officer
Reviews and approves budget requests and material procurement needs. Tracks approved spending and manages partner support leads.

### Head of All Departments
Monitors all three departments, approves cross-department collaborations, reviews escalations, and features high-impact projects.

### Investor / Partner
Discovers approved public projects, browses impact metrics and Green Impact Points, and expresses support or partnership interest.

---

## 4. Frontend Flow

The application follows this page-level flow:

```
Landing Page (/)
    ↓
Login / Register (/login  /register)
    ↓
Role Selection
    ↓
Role-Based Portal (e.g. /student, /teacher, /departments/web)
    ↓
Project Feed → Project Detail (/projects/:id)
    ↓
Post Project (/student/post-project)
    ↓
Support Request (/student/support-requests)
    ↓
Teacher Review / Endorsement
    ↓
Department Support Approval
    ↓
Finance Budget Request
    ↓
Investor Discovery
```

Each portal is a fully independent feed experience. No portal shares content or layout with another.

---

## 5. Landing Page Flow

The landing page (`/`) uses a **pinned horizontal scroll journey**.

### How it works:
- A tall outer `div` creates vertical scroll distance (7 × 100vh)
- A sticky inner viewport pins to the screen height
- A horizontal track is translated left by JavaScript as the user scrolls down
- The user scrolls **normally** (mouse wheel or trackpad)
- The visual experience is **horizontal movement** between full-screen sections
- Each section is designed as a **rich vertical web composition**, not a slide

### Sections (in order):

| # | Section | Description |
|---|---|---|
| 1 | **Hero** | Full-screen RCA building background, cinematic glassmorphism card, floating stat badges |
| 2 | **About GreenHubRCA** | Left heading + CTA, right stacked glass cards explaining the platform |
| 3 | **Project Categories** | 4-card category gallery with icons, descriptions, and base Green Impact Points |
| 4 | **How It Works** | 6-step connected timeline of the project lifecycle |
| 5 | **Portals** | 9 portal cards in a grid with icons, descriptions, and direct links |
| 6 | **Green Impact Points** | Point tier list + boost conditions card with animated values |
| 7 | **Final CTA** | Full-screen call to action with glass card, green glow, floating badges |

### Scroll progress indicator:
A dot/pill row at the bottom of the viewport shows which section is currently active.

---

## 6. Portal Design System

All portals follow a **social platform / job feed** layout — not a sidebar dashboard.

### Layout structure:

```
┌─────────────────────────────────────────────────────┐
│                   TOP NAVBAR                        │
│   Logo   Search Bar   Nav Links   Notifications     │
├────────────┬────────────────────┬───────────────────┤
│            │                    │                   │
│  LEFT      │   CENTER FEED      │  RIGHT INSIGHTS   │
│  Profile   │   Tabs + Cards     │  Insight Cards    │
│  Stats     │   Project/Content  │  Events           │
│  Links     │   Feed             │  Top Projects     │
│            │                    │                   │
└────────────┴────────────────────┴───────────────────┘
```

### Portal hero header:
Each portal opens with a full-width hero banner (gradient background, eyebrow label, large title, description) that provides immediate role context.

### Card design:
- `glass-card`: `background: rgba(255,255,255,0.76)`, `backdrop-filter: blur(18px)`, soft shadow
- `glass-card-green`: Same but with green accent tint
- All cards use `rounded-[28px]` and hover lift animations

### Tabs:
A horizontal scrollable tab bar with a spring-animated green pill for the active tab.

---

## 7. Green Impact Points

Green Impact Points (GIP) measure how much a project contributes to innovation, environmental improvement, collaboration, and community impact.

**Base point values by category:**

| Category | Base Points |
|---|---|
| Idea / Proposal | 25 |
| Web Platform | 50 |
| Embedded / IoT Project | 75 |
| RCA Campus Environment Action | 100 |
| Nyabihu District Community Project | 120 |

**Points also increase through:**
- Student collaboration and team support
- Teacher endorsement
- Department approval
- Prototype completion
- Implementation at RCA
- Community impact in Nyabihu District
- Investor or partner support

The total GIP across all projects is displayed on the landing page and in portal insight cards.

---

## 8. Routes

| Path | Component | Description |
|---|---|---|
| `/` | `LandingPage` | Horizontal scroll landing |
| `/login` | `LoginPage` | Authentication |
| `/register` | `RegisterPage` | Registration / role selection |
| `/student` | `PortalPage` (student) | Student project feed |
| `/student/post-project` | `PostProjectPage` | Submit a new project |
| `/student/projects` | `PortalPage` (student) | Student's own projects |
| `/student/support-requests` | `PortalPage` (student) | Active support requests |
| `/teacher` | `PortalPage` (teacher) | Teacher review feed |
| `/teacher/reviews` | `PortalPage` (teacher) | Review queue |
| `/teacher/mentorship` | `PortalPage` (teacher) | Mentorship feed |
| `/teacher/endorsed-projects` | `PortalPage` (teacher) | Endorsed projects |
| `/departments` | `DepartmentsPage` | Department overview |
| `/departments/web` | `PortalPage` (web) | Web department portal |
| `/departments/embedded` | `PortalPage` (embedded) | Embedded systems portal |
| `/departments/environment` | `PortalPage` (environment) | Environment department portal |
| `/head-departments` | `PortalPage` (head) | Head of departments portal |
| `/secretary` | `PortalPage` (secretary) | Secretary portal |
| `/secretary/announcements` | `PortalPage` (secretary) | Announcements feed |
| `/secretary/reports` | `PortalPage` (secretary) | Reports |
| `/secretary/meetings` | `PortalPage` (secretary) | Meeting notes |
| `/finance` | `PortalPage` (finance) | Finance portal |
| `/finance/requests` | `PortalPage` (finance) | Budget requests |
| `/finance/materials` | `PortalPage` (finance) | Material requests |
| `/finance/partner-support` | `PortalPage` (finance) | Partner support |
| `/investor` | `PortalPage` (investor) | Investor discovery feed |
| `/investor/projects` | `PortalPage` (investor) | Public projects |
| `/investor/impact` | `PortalPage` (investor) | Impact metrics |
| `/investor/support` | `PortalPage` (investor) | Support interest |
| `/projects/:id` | `ProjectDetailPage` | Project detail view |

---

## 9. Tech Stack

| Technology | Purpose |
|---|---|
| **React.js** | UI component library |
| **Vite** | Build tool and dev server |
| **Tailwind CSS v4** | Utility-first styling |
| **Framer Motion** | Animations and transitions |
| **React Router DOM** | Client-side routing |
| **Lucide React** | Icon library |
| **Mock data** | Local JS files simulate all backend data |

**Key design decisions:**
- No backend — all data is imported from `src/data/mockData.js` and `src/data/portalConfigs.jsx`
- Horizontal scroll is implemented purely with CSS sticky positioning and JS scroll event translation (no external library)
- All portals share the same `PortalPage` + `PortalShell` components, configured via `portalConfigs`
- Animations use Framer Motion's `whileHover`, `whileInView`, and `motion.div`

---

## 10. Current Status

The current version is a **frontend-only prototype** using mock data.

- All routes are functional and navigable
- All portals display mock project, support, budget, and announcement data
- All interactions (tab switching, project filtering) work on the frontend
- No real authentication — login and register are prototype flows
- No API calls — all data is static and local
- No persistent state — refreshing the page resets UI state

**Backend integration is planned for a future phase:**
- Real authentication (JWT or session-based)
- PostgreSQL or MySQL database
- REST API or GraphQL
- File upload for project images
- Real-time notifications

---

## 11. How to Run

**Prerequisites:** Node.js 18+ and npm

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173` by default.

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

**Project entry points:**
- `index.html` — Vite entry HTML
- `src/main.jsx` — React root mount
- `src/App.jsx` — AnimatePresence + router wrapper
- `src/routes/AppRoutes.jsx` — All route definitions
- `src/index.css` — Global design system and CSS tokens
