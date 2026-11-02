# Cynbit Technologies — Comprehensive Technical Engineering Report
## Smart Project Discovery System & Administrative CRM Architecture

**Candidate Role:** Senior Full-Stack Developer + UI/UX Engineer  
**Assessment:** Full Stack Developer Intern – Improve Cynbit's Website  
**Date:** November 2026  
**Target Organization:** Cynbit Technologies (Jaipur, India — [https://www.cynbit.in/](https://www.cynbit.in/))

---

## 1. Executive Summary

This report presents an architectural audit, product evaluation, and complete engineering implementation to enhance Cynbit Technologies’ digital presence. As a premier software and AI automation engineering firm based in Jaipur, Cynbit requires an intake and qualification experience matching its technical caliber.

Our analysis identified a critical conversion bottleneck on the existing website: prospective clients arriving with diverse requirements were offered only generic mailto links and phone numbers. To solve this, we engineered and deployed the **Cynbit Smart Project Discovery System**, a 5-step interactive scoping wizard coupled with an **Enquiry Transparency Tracker** and a **Protected Administrator CRM & Analytics Portal**.

The solution was built using **React 19**, **Vite**, **Tailwind CSS v4**, **Node.js v22**, **Express**, **JWT**, **Bcrypt**, and a portable **Dual-Engine Persistence Layer (SQLite + PostgreSQL)**. All requirements have been validated through 11 automated integration tests and full end-to-end browser verification.

---

## 2. Existing Website Analysis (Audit of cynbit.in)

### 2.1 Brand Identity & Design System Audit
- **Branding**: *"The optimistic architect"*, *"Architecting the future with AI automation"*, *"The speed of a startup. The rigor of an enterprise."*
- **Visual Aesthetic**: Dark slate backgrounds (`#0B0F19`, `#070a13`), vibrant indigo/cyan accents (`text-gradient-primary`), frosted glassmorphic navigation (`glass-nav`), and rounded container radii (`rounded-2xl`, `rounded-3xl`, `rounded-[2.5rem]`).
- **Typography**: Clean geometric typography (`Outfit` / `Inter`), uppercase tracked micro-labels (`tracking-widest text-[10px] uppercase`), and subtle glowing borders.
- **Service Offerings**:
  1. AI Automation & Autonomous AI Agents
  2. Full-Stack Web Development (Next.js, Node.js)
  3. Mobile App Development
  4. Custom IT Infrastructure & Cloud Systems
  5. Proprietary SaaS Suite (Cynbit Studio, Revio, TenantEase)
  6. BitElevate (60-day remote engineering internship)
  7. Social Impact (Manav Seva Trust partnership)

### 2.2 Usability, Conversion & UX Gaps Identified

| Area | Current Live Implementation | Architectural & Business Impact | Severity |
| :--- | :--- | :--- | :--- |
| **Hero Conversion Funnel** | Hero button *"Start discovery"* redirects directly to `/contact`. | Broken user expectation: visitors anticipate an interactive discovery tool, not a static contact page. | **High** |
| **Intake Mechanism** | `/contact` page has **no web form**, only `mailto:` and `tel:` links. | Massive drop-off rate. Potential clients on mobile or without desktop email clients cannot easily initiate contact. | **Critical** |
| **Scoping Granularity** | No structured intake for services, deliverables, budget, or timeline. | Engineering leads waste hours exchanging emails to clarify baseline requirements before providing quotes. | **High** |
| **Client Transparency** | Zero tracking or confirmation mechanisms. | Clients have no visibility into enquiry receipt, estimated review SLA, or current review stage. | **Medium** |
| **Internal CRM Tooling** | Inquiries scatter across multiple email inboxes. | No centralized pipeline view, no lead qualification metrics, and no audit trail for sales/engineering reviews. | **High** |

---

## 3. Identified Problem & Proposed Improvement

### 3.1 Problem Statement
Potential enterprise clients visiting Cynbit’s website frequently struggle to articulate their precise technical needs or determine whether they require autonomous AI agents, a custom SaaS web app, mobile capabilities, or cloud DevOps. Concurrently, a traditional contact form fails to collect sufficient structured data for technical architects to prepare actionable feasibility estimates.

### 3.2 Proposed Improvement: Smart Project Discovery System
An interactive, 5-step guided project discovery wizard that:
1. Guides users through capability selection (multi-select cards with feature tags).
2. Clarifies project scope, objectives, target audience, and key required features.
3. Quantifies investment budget tiers (in Indian Rupees `₹`) and target velocity/timelines upfront.
4. Gathers contact information with real-time validation and strict non-disclosure assurances.
5. Displays a structured architectural summary with instant submission, confetti confirmation, unique reference ID generation (`CYN-2026-XXXX`), and automated deduplication.
6. Empowers clients with a self-service **Tracking Portal** (`/track`).
7. Provides Cynbit leads with a **Protected Administrator CRM & Analytics Dashboard** (`/admin/dashboard`).

---

## 4. Technical Architecture & System Design

```mermaid
graph TB
    subgraph Client Tier [React 19 + Vite 6 + Tailwind CSS v4]
        Home[Home Landing Page]
        Wizard[5-Step Discovery Wizard]
        Tracker[Enquiry Reference Tracker]
        AdminLogin[Admin Login Portal]
        AdminCRM[Admin CRM Dashboard]
        APIClient[Universal Fetch API Client]
        AuthCtx[Auth Context - JWT Session]
        DiscCtx[Discovery Context - Auto-Save Draft]
    end

    subgraph Security & Middleware Tier [Express.js Engine]
        RateLimiter[Rate Limiters - IP Throttling]
        HelmetMid[Helmet - Security Headers]
        CorsMid[CORS Policy]
        InputValidator[Input Validation & Sanitization]
        JWTAuth[JWT Admin Verification]
        ErrHandler[Centralized Error & 404 Handler]
    end

    subgraph Controller & Business Logic Tier
        EnquiryCtrl[Enquiry Controller]
        AuthCtrl[Auth Controller - Bcrypt]
        StatsCtrl[KPI & Analytics Controller]
        RefGen[Unique Reference Generator]
    end

    subgraph Data Persistence Tier [Dual Engine Adapter]
        DBAdapter[Agnostic Query Wrapper]
        SQLite[(SQLite DB - Default Local)]
        Postgres[(PostgreSQL DB - Production URL)]
    end

    Wizard --> APIClient
    Tracker --> APIClient
    AdminLogin --> APIClient
    AdminCRM --> APIClient

    APIClient --> RateLimiter
    RateLimiter --> HelmetMid
    HelmetMid --> CorsMid

    CorsMid --> InputValidator
    CorsMid --> JWTAuth

    InputValidator --> EnquiryCtrl
    InputValidator --> AuthCtrl
    JWTAuth --> AdminCRM
    AdminCRM --> StatsCtrl

    EnquiryCtrl --> RefGen
    EnquiryCtrl --> DBAdapter
    AuthCtrl --> DBAdapter
    StatsCtrl --> DBAdapter

    DBAdapter --> SQLite
    DBAdapter --> Postgres
```

---

## 5. Technology Stack & Justification

| Technology | Selection | Architectural Justification |
| :--- | :--- | :--- |
| **Frontend Framework** | React 19 + Vite 6 | Provides declarative UI, sub-second HMR during development, and ultra-compact build bundles (~116 kB gzipped JS). |
| **Styling & Design System** | Tailwind CSS v4 | Provides atomic CSS utilities, zero runtime overhead, custom design tokens matching Cynbit’s brand palette, and fluid glassmorphism. |
| **Icons & Micro-interactions** | Lucide React + Canvas Confetti | Lucide offers high-aesthetic technical icons. Confetti provides rewarding psychological feedback upon discovery submission. |
| **Routing** | React Router v7 | Seamless client-side SPA routing with protected route guards for administrative dashboards. |
| **Backend Runtime** | Node.js v22 + Express.js | High-throughput asynchronous I/O, mature ecosystem, and rapid REST API assembly. |
| **Database Architecture** | Dual Engine: SQLite3 & PostgreSQL | Zero-config SQLite enables instant evaluation without installing database daemons; production PostgreSQL support enabled seamlessly via `DATABASE_URL`. |
| **Authentication** | JWT (JSON Web Tokens) + Bcrypt.js | Stateless, horizontally scalable session tokens with salted password hashing (10 rounds). |
| **API Security** | Helmet, CORS, Express-Rate-Limit | Mitigates OWASP Top 10 risks including DDoS, spam bots, XSS, and credential brute-forcing. |

---

## 6. Database Schema & Data Models

### 6.1 `enquiries` Table
Stores structured project discovery briefs submitted by prospective clients.

```sql
CREATE TABLE enquiries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,        -- Primary identifier
  reference_id TEXT UNIQUE NOT NULL,           -- Branded ID: CYN-2026-XXXXXX
  services TEXT NOT NULL,                      -- JSON array of selected services
  project_name TEXT NOT NULL,                  -- Name or title of venture
  project_desc TEXT NOT NULL,                  -- Detailed scope description
  objective TEXT NOT NULL,                     -- Primary objective (MVP, Automate, Scale)
  target_audience TEXT NOT NULL,               -- B2B, B2C, Internal, etc.
  features TEXT,                               -- JSON array of required features
  budget TEXT NOT NULL,                        -- e.g. ₹1,00,000–₹5,00,000
  timeline TEXT NOT NULL,                      -- e.g. 1–3 months, ASAP
  full_name TEXT NOT NULL,                     -- Client name
  email TEXT NOT NULL,                         -- Client business email
  phone TEXT NOT NULL,                         -- Client phone
  company TEXT,                                -- Client organization
  status TEXT NOT NULL DEFAULT 'New',          -- New, Contacted, In Progress, Completed, Rejected
  admin_notes TEXT DEFAULT '',                 -- Internal lead notes
  ip_address TEXT,                             -- Client IP address (spam audit)
  user_agent TEXT,                             -- Browser metadata
  created_at TEXT NOT NULL,                    -- ISO 8601 timestamp
  updated_at TEXT NOT NULL                     -- ISO 8601 timestamp
);
```

### 6.2 `admin_users` Table
Stores administrative credentials and profile metadata.

```sql
CREATE TABLE admin_users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,                 -- 10-round bcrypt hash
  full_name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin',
  created_at TEXT NOT NULL,
  last_login TEXT
);
```

### 6.3 `enquiry_status_logs` Table (Audit Trail)
Maintains an immutable historical record of pipeline status shifts.

```sql
CREATE TABLE enquiry_status_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  enquiry_id INTEGER NOT NULL,
  old_status TEXT NOT NULL,
  new_status TEXT NOT NULL,
  changed_by TEXT NOT NULL,                    -- Admin name & username
  note TEXT,                                   -- Reason for status transition
  created_at TEXT NOT NULL,
  FOREIGN KEY (enquiry_id) REFERENCES enquiries(id) ON DELETE CASCADE
);
```

---

## 7. REST API Specifications

### 7.1 Public API Endpoints

#### `POST /api/enquiries`
- **Purpose**: Ingests new project discovery brief.
- **Middleware**: `enquiryLimiter` (max 20/15m), `validateEnquiry`.
- **Duplicate Prevention**: Rejects duplicate submissions with identical email and project name submitted within 10 minutes (`409 Conflict`).
- **Success Response (`201 Created`)**:
  ```json
  {
    "success": true,
    "message": "Project discovery submitted successfully. Our lead architects will analyze your requirements.",
    "referenceId": "CYN-2026-55C8F8",
    "enquiryId": 4,
    "createdAt": "2026-11-02T13:42:00.000Z"
  }
  ```

#### `GET /api/enquiries/track/:refId`
- **Purpose**: Public lookup by reference ID.
- **Sanitization**: Masks confidential internal admin notes; exposes client-relevant progress stages and timestamps.
- **Success Response (`200 OK`)**:
  ```json
  {
    "success": true,
    "enquiry": {
      "referenceId": "CYN-2026-55C8F8",
      "projectName": "Enterprise AI Workflow Orchestrator",
      "services": ["AI Automation & AI Agents", "Web Development"],
      "status": "In Progress",
      "submittedAt": "2026-11-02T13:42:00.000Z",
      "lastUpdated": "2026-11-02T13:48:00.000Z"
    }
  }
  ```

### 7.2 Admin Authentication Endpoints

#### `POST /api/auth/login`
- **Purpose**: Authenticates administrative users.
- **Middleware**: `loginLimiter` (max 15/15m), `validateLogin`.
- **Payload**: `{ "identifier": "admin@cynbit.in", "password": "Admin@Cynbit2026!" }`
- **Success Response (`200 OK`)**:
  ```json
  {
    "success": true,
    "message": "Authentication successful. Welcome to Cynbit Admin Hub.",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "username": "admin",
      "email": "admin@cynbit.in",
      "fullName": "Cynbit Lead Architect",
      "role": "admin"
    }
  }
  ```

#### `GET /api/auth/me`
- **Purpose**: Validates active JWT session token and returns logged-in administrator profile.

### 7.3 Protected CRM Endpoints (`requireAuth`)

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/admin/stats` | `GET` | Returns aggregated metrics: total count, status breakdown, conversion rate %, budget distribution, timeline trends, and service popularity distribution. |
| `/api/admin/enquiries` | `GET` | Paginated enquiry records with query params: `search`, `status`, `service`, `budget`, `page`, `limit`, `sortBy`, `sortOrder`. |
| `/api/admin/enquiries/:id` | `GET` | Retrieves comprehensive enquiry details plus historical audit log records. |
| `/api/admin/enquiries/:id/status` | `PATCH` | Updates pipeline stage (`New`, `Contacted`, `In Progress`, `Completed`, `Rejected`), appends internal admin notes, and records audit trail. |
| `/api/admin/enquiries/:id` | `DELETE` | Cascading deletion of enquiry and related audit logs. |

---

## 8. Security Considerations & Threat Defense

1. **Anti-Spam & Denial-of-Service Defense**:
   - `express-rate-limit` enforces 20 submissions per 15-minute window per IP on public forms, preventing bot exhaustion.
   - Brute-force protection limits admin login attempts to 15 per 15-minute window.
2. **Duplicate Submission Mitigation**:
   - The frontend disables submit triggers and displays a progress spinner.
   - The backend checks for matching project submissions from the same email within the last 10 minutes, returning `409 Conflict` with the existing Reference ID if detected.
3. **Password Security**:
   - Stored using `bcryptjs` with 10 salt rounds. Plaintext credentials are never persisted or logged.
4. **Stateless JWT Authorization**:
   - Protected routes verify cryptographically signed tokens (`Bearer <JWT>`). Invalid, manipulated, or expired tokens receive `401 Unauthorized` or `403 Forbidden`.
5. **Input Validation & Data Sanitization**:
   - Multi-layer validation enforces strict length checks, allowed service arrays, valid email formats (`EMAIL_REGEX`), and phone numbers.
   - All text inputs are trimmed and sanitized before query execution.
6. **SQL Injection Defense**:
   - All queries use parameterized statements (`?` in SQLite and `$1, $2` in PostgreSQL). No dynamic string concatenation exists in database calls.
7. **Cross-Site Scripting (XSS) & Header Hardening**:
   - `helmet` configures HTTP protection headers (CSP, HSTS, frameguard, noSniff).
   - React’s JSX engine automatically escapes all interpolated user inputs.

---

## 9. Testing Methodology & Verification Results

### 9.1 Automated Integration Tests
The backend test suite (`server/tests/api.test.js`) runs via Node’s native test runner (`node:test`) with Supertest:

```
TAP version 13
ok 1 - GET /api/health should return 200 OK and healthy status (34ms)
ok 2 - POST /api/enquiries should reject empty or invalid payload with 400 (32ms)
ok 3 - POST /api/enquiries should successfully submit valid project discovery (21ms)
ok 4 - POST /api/enquiries should detect duplicate submissions (8ms)
ok 5 - GET /api/enquiries/track/:refId should return enquiry status for valid reference ID (7ms)
ok 6 - GET /api/enquiries/track/:refId should return 404 for non-existent reference ID (6ms)
ok 7 - POST /api/auth/login should reject invalid credentials with 401 (81ms)
ok 8 - POST /api/auth/login should authenticate seeded admin and return JWT (73ms)
ok 9 - GET /api/admin/enquiries should reject request without JWT with 401 (6ms)
ok 10 - GET /api/admin/enquiries should return enquiries list with valid JWT (10ms)
ok 11 - GET /api/admin/stats should return aggregated KPI analytics (9ms)

11 passed, 0 failed, duration: ~950ms.
```

### 9.2 End-to-End Browser Subagent Verification
An autonomous browser subagent conducted comprehensive user and admin test sessions:

1. **Discovery Wizard Submission**:
   - Navigated from Home page hero CTA to `/discovery`.
   - Selected *AI Automation* and *Web Development*.
   - Entered project parameters: `"Enterprise AI Workflow Orchestrator"`.
   - Selected budget *₹1,00,000–₹5,00,000* and timeline *1–3 months*.
   - Entered contact: `Karan Singhal` (`karan.singhal@enterpriseflow.io`).
   - Submitted and received generated Reference ID: `CYN-2026-55C8F8`.
2. **Client Reference Tracking**:
   - Navigated to `/track?ref=CYN-2026-55C8F8`.
   - Verified that status displayed `"New"` and the 4-stage pipeline visually highlighted Stage 1.
3. **Admin Authentication & CRM Operations**:
   - Authenticated via `/admin/login` using auto-fill credentials (`admin@cynbit.in`).
   - Inspected KPI cards: Total enquiries, conversion rate, and service distribution.
   - Filtered and searched for `"CYN-2026-55C8F8"`.
   - Opened the enquiry detail modal, updated pipeline status to `"In Progress"`, and added architect notes.
   - Verified the audit log updated and the main table reflected `"In Progress"`.
   - Verified CSV export generation.

---

## 10. Deployment & Infrastructure Guide

### 10.1 Single-Port Full-Stack Deployment
The Node/Express backend has been architected to host the compiled React SPA whenever `client/dist` is present.
1. Build the frontend: `npm run build`
2. Start the unified service: `npm start`
3. Access both API and frontend on a single unified port (default `5000`).

### 10.2 Production Environment Variables
```env
PORT=5000
NODE_ENV=production
JWT_SECRET=your_super_secure_jwt_secret_key_2026_xyz!
CORS_ORIGIN=https://your-domain.com

# Optional PostgreSQL database:
# DATABASE_URL=postgresql://user:password@host:5432/cynbit_db
```

---

## 11. Future Architectural Roadmap

1. **Automated AI Brief Generation**: Connect an LLM (e.g., Gemini 1.5 Pro) to synthesize submitted discovery requirements into a formatted 2-page Technical Proposal PDF immediately upon submission.
2. **Real-time WebSockets / SSE**: Push real-time notification toasts to the Admin Dashboard when new high-value enquiries arrive.
3. **Email Notification Relay**: Connect SendGrid or AWS SES to dispatch branded confirmation receipts to clients and alert Cynbit engineering leads.
4. **Calendar Scheduling Integration**: Allow qualified leads in Step 5 to directly book a 30-minute discovery call via Google Calendar / Cal.com embed.

---

## 12. Conclusion

The implemented **Cynbit Smart Project Discovery System & Admin CRM** directly addresses the conversion and lead-qualification challenges of Cynbit’s public website. By providing structured scoping, transparent reference tracking, and a powerful administrative CRM, the solution elevates Cynbit’s brand authority, accelerates sales cycles, and demonstrates rigorous full-stack software engineering standards.
