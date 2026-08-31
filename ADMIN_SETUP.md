# Setting up the admin panel (Firebase)

This site reads all of its content — bio, skills, projects, experience,
education, certifications, social links, stats, site settings — from
**Firestore** (a NoSQL database) instead of hardcoded files. `/admin` is a
login-protected page in the app where you add/edit/delete that content
through forms, no code changes or redeploys needed.

There's no custom backend server — the React app talks to Firestore
directly using Firebase's client SDK. Access control is handled by
Firebase Authentication (only you can sign in) and Firestore Security
Rules (public read, authenticated write) — not by hiding a server
somewhere.

## 1. Create a Firebase project

1. Go to <https://console.firebase.google.com> and click **Add project**.
2. Give it any name (e.g. `manjith-portfolio`). Google Analytics is
   optional — you can skip it.

## 2. Enable Firestore

1. In the left sidebar: **Build > Firestore Database > Create database**.
2. Choose **Start in production mode** (the security rules below cover
   this — don't use test mode, it expires after 30 days).
3. Pick any region close to you.

Once created, open the **Rules** tab and replace the contents with what's
in `firestore.rules` in this project, then click **Publish**.

## 3. Enable Authentication (email/password)

1. **Build > Authentication > Get started**.
2. Under **Sign-in method**, enable **Email/Password**.
3. Go to the **Users** tab and click **Add user**. Enter the email and
   password you want to sign in to `/admin` with. This is a manual,
   one-time step — there's no public sign-up page, so this is the only
   account that can ever exist.

## 4. Get your web app config

1. **Project settings** (gear icon) **> General**.
2. Under "Your apps", click the **</>** (web) icon to register a web app
   (any nickname is fine; you don't need Firebase Hosting set up yet).
3. Copy the `firebaseConfig` values shown.

## 5. Add the config to the project

Copy `.env.example` to `.env.local` and fill in the values from step 4:

```bash
cp .env.example .env.local
```

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

These values aren't secret (they ship in the browser bundle either way —
that's normal for Firebase web apps) but `.env.local` is git-ignored so
you don't have to think about it.

## 6. Run it and seed your starter content

```bash
npm install
npm run dev
```

1. Visit `http://localhost:5173/admin/login` and sign in with the user
   you created in step 3.
2. Click **Import starter content** in the sidebar. This pushes the
   bundled content in `src/data/seed.ts` (your current bio, the
   Multi-Vendor E-Commerce project, both jobs, education, certifications)
   into Firestore, once.
3. Refresh the site (`/`) — it now reads live from Firestore instead of
   the bundled fallback.

From here on, add/edit/delete everything from `/admin` — skills, projects,
experience, education, certifications, social links, stats, and your
profile bio. Changes show up on the public site immediately (it's a live
subscription, not a cache).

**Don't click "Import starter content" a second time** once you've started
editing — it always *adds* new rows to the list collections (skills,
projects, etc.), so re-running it duplicates everything. It's safe to
re-run only on a Firestore project that's still completely empty.

## 7. Deploying

The site is still a static build (`npm run build` → `dist/`) — Firebase
just needs the SPA to fall back to `index.html` for the `/admin` routes to
work on a hard refresh. Pick whichever host you like:

- **Firebase Hosting** (same project, simplest): `firebase deploy --only hosting`
  using the `firebase.json` already in this project (needs the
  [Firebase CLI](https://firebase.google.com/docs/cli), `firebase login`,
  then `firebase use --add` to link this project).
- **Netlify**: the `public/_redirects` file in this project handles the
  SPA fallback automatically.
- **Vercel**: `vercel.json` in this project handles it.

Whichever host you pick, set the same `VITE_FIREBASE_*` environment
variables in that host's dashboard (Vite bakes them in at build time).
