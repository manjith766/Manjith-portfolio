# Manjith Nagineni — Portfolio

A React + TypeScript + Tailwind CSS + Framer Motion portfolio with a **Firestore-backed
admin panel** — no custom backend server, but all content (bio, skills, projects,
experience, education, certifications, social links, stats) is editable live from
`/admin`, not hardcoded.

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # preview the production build
```

**First time?** See [`ADMIN_SETUP.md`](./ADMIN_SETUP.md) for the one-time Firebase
project setup (create project, enable Firestore + a single admin login, add your env
keys, seed your starter content). Until you do that, the site renders fine using the
bundled fallback content in `src/data/seed.ts`, but `/admin` won't be able to save
anything.

## Architecture

- **Public site** (`/`) — reads live from Firestore via `useFirestoreCollection` /
  `useProfile` / `useSocialLinks` (see `src/hooks/`), falling back to
  `src/data/seed.ts` if Firestore has nothing yet.
- **Admin panel** (`/admin/login`, `/admin`) — a Firebase-Auth-gated dashboard
  (`src/pages/AdminDashboard.tsx`) with generic add/edit/delete forms
  (`src/components/admin/CollectionEditor.tsx` for list data,
  `DocumentEditor.tsx` for the singleton profile/settings docs).
- **No custom backend** — the browser talks to Firestore directly using the Firebase
  client SDK (`src/lib/firebase.ts`, `src/lib/firestoreApi.ts`). Access is controlled by
  Firestore Security Rules (`firestore.rules`) and Firebase Auth, not by a server.
- **Contact form** — submits via `mailto:` (opens the visitor's own email client). No
  form backend involved.

## What's implemented

- **Hero** — animated typing effect over your tagline list, floating tech chips, gradient
  blobs, social links, resume/hire CTAs
- **Stats** — animated counters, editable as their own collection in `/admin`
- **About** — summary, objective, and "what I bring" panel
- **Skills** — animated progress bars grouped by category
- **Projects** — case-study cards with feature lists, stack tags, and GitHub/live links
- **Architecture** — a static animated SVG diagram of a typical microservice request flow
  (`src/data/profile.ts` — the one piece of content that isn't in Firestore, since it's a
  fixed illustration rather than rows you'd add/remove)
- **Experience timeline**, **Education**, **Certifications** — vertical/grid layouts,
  all editable from `/admin`
- **Contact** — mailto-based form plus direct email/LinkedIn/GitHub/WhatsApp links
- **Dark/light theme** — toggle in the navbar, persisted in `localStorage`
- **Scroll progress bar, back-to-top button, mobile nav, `prefers-reduced-motion` support**

## Deliberately left as placeholders

**Testimonials** renders clean, dashed-border empty slots — no client quotes were
supplied, so none were invented. Add a `testimonials` Firestore collection (the
`FsTestimonial` type already exists in `src/types/firestore.ts`) and a small
`CollectionEditor` section in `/admin` following the pattern of the others if you want
this editable too.

## Project structure

```
src/
  components/        One file per public section (Hero, Skills, Projects, ...)
  components/admin/   Generic CollectionEditor / DocumentEditor + ProtectedRoute
  pages/               AdminLogin, AdminDashboard
  context/             Theme (dark/light) + Auth providers
  data/                seed.ts — bundled fallback/starter content; profile.ts — the
                       static architecture-diagram layout
  hooks/               useFirestoreCollection / useFirestoreDocument / useProfile /
                       useSocialLinks / useInView
  lib/                 firebase.ts (SDK init), firestoreApi.ts (CRUD helpers),
                       seedDatabase.ts
  types/               firestore.ts (Fs* document shapes), api.ts, index.ts
```

## Design system

| Token       | Value                              |
|-------------|-------------------------------------|
| Primary     | `#2563EB`                          |
| Secondary   | `#06B6D4`                          |
| Accent      | `#8B5CF6`                          |
| Display font| Sora                                |
| Body font   | Inter                               |
| Mono font   | JetBrains Mono                      |

Glassmorphism (`glass` / `glass-card` utility classes), gradient text, rounded-2xl cards, and hover
glow/lift are defined once in `src/index.css` and reused everywhere — change them there to restyle
the whole site.
