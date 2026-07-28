# Session Notes — Gentle Brooks Bathing: Vercel/Supabase/GitHub Setup

Date: 2026-07-24 (updated 2026-07-25)
Purpose: Handoff/context doc so a new chat session can pick up where this one left off.

## 2026-07-25 update: all three open items from last session are RESOLVED
- Custom domain `gentlebrooksbathingservices.com` is attached to the `gentle-brooks-bathing` Vercel project and serving the live site (verified via WebFetch — correct title, no errors).
- Supabase project `nihylsfrwtgaupbbjmdq` status is `ACTIVE_HEALTHY` (no longer paused).
- GitHub repo `leighbrooks358-cmyk6/gentlebrooks` has 6 commits and all files pushed, including a `supabase/migrations/` directory not previously tracked here.
- Remaining open items are the "Known site content caveats" below (Calendly, Stripe, contact email, testimonials) — nothing infra-related left outstanding.

## What this session covered

Connected the **Gentle Brooks Bathing Service** static website (`C:\Users\Leigh\gentle-brooks-bathing`) to Vercel, started connecting a custom domain, checked on Supabase, and started setting up a GitHub repo for the project.

## Current state (as of end of session)

### 1. Vercel deployment — DONE
- Project: `gentle-brooks-bathing` (id `prj_lXeehnDVqE8jRIPxrb6CYnJGEj9V`)
- Team: `leighbrooks358-6460's projects` (id `team_ZEFdFBIp67W9cu6E97PyPZCP`)
- Deployed to **production** via `deploy_to_vercel` (no GitHub repo used for this deploy — files were pushed directly from local disk).
- Live at: `https://gentle-brooks-bathing.vercel.app`
- All 11 site files deployed: `index.html`, `services.html`, `pricing.html`, `about.html`, `booking.html`, `contact.html`, `assets/css/style.css`, `assets/js/main.js`, `assets/js/forms.js`, `assets/images/icon.svg`, `assets/images/logo.svg`.

### 2. Custom domain — IN PROGRESS, NOT YET RESOLVED
- Domain: `gentlebrooksbathingservices.com`
- Already registered under the user's Vercel account (personal scope, **not** the team), auto-renews **Jul 10, 2027**.
- It was initially attached to a *different* Vercel project (a project with slashes in the name, per user — likely under the personal/non-team scope). User removed it from that project.
- **Still not attached to the `gentle-brooks-bathing` project** as of last check (`get_project` on `prj_lXeehnDVqE8jRIPxrb6CYnJGEj9V` only shows the two default `.vercel.app` domains, no custom domain).
- **Next step**: user needs to go to the Vercel team Domains page, click **Configure** next to `gentlebrooksbathingservices.com`, and select **gentle-brooks-bathing** as the target project this time. Then re-verify with `get_project`.
- Note: WebFetch of `https://gentlebrooksbathingservices.com/` earlier did return Gentle Brooks content, but that was likely from whatever project it was attached to at the time (before removal) — not confirmed as this project.

### 3. Supabase — ATTENTION NEEDED
- Project: "Gentle Brooks" (ref `nihylsfrwtgaupbbjmdq`, region `ca-central-1`, org `vazhlvgkkbfsssasmsze`)
- Used by `assets/js/forms.js` for the booking/contact forms (`booking_requests` and `contact_messages` tables, RLS insert-only for anon).
- **Status came back `INACTIVE`** (likely auto-paused from disuse on free tier). While paused, the live site's booking/contact forms will fail silently to the "something went wrong" error message.
- **Next step**: user needs to resume/restore the project from the Supabase dashboard. Not yet confirmed as fixed.
- User mentioned "supabase didn't have a repo set up but it's done now" — unclear exactly what this refers to (possibly a GitHub integration for migrations). Not independently verified — no tool available to check GitHub-link status for a Supabase project.

### 4. GitHub repo — CREATED BUT EMPTY, PUSH NOT YET DONE
- Repo: `https://github.com/leighbrooks358-cmyk6/gentlebrooks`
- Confirmed via WebFetch: repo exists but is **empty** (no files, 0 commits).
- User asked to push the site files into it.
- **Blocker**: Neither `git` nor `gh` (GitHub CLI) is installed on this machine (checked via PowerShell — both commands not found).
- **Next step**:
  1. Install Git for Windows: `winget install --id Git.Git -e --source winget` (user has not yet confirmed this install).
  2. Then from `C:\Users\Leigh\gentle-brooks-bathing`: `git init`, `git add .`, `git commit -m "Initial site"`, `git branch -M main`, `git remote add origin https://github.com/leighbrooks358-cmyk6/gentlebrooks.git`, `git push -u origin main`.
  3. Push will likely trigger a browser-based GitHub login via Git Credential Manager (bundled with Git for Windows) since no `gh` CLI auth exists yet.
  4. Once pushed, could optionally connect this repo to the Vercel project via Vercel's Git integration for auto-deploy on push (currently deploys are manual via direct file upload, not git-connected).

## Known site content caveats (from README, still unaddressed)
- `booking.html`: Calendly embed and Stripe payment link are both **placeholders** — need real Calendly account + event link, and real Stripe Payment Link.
- ~~Contact email `hello@gentlebrooksbathing.com` is a placeholder~~ — replaced site-wide with `support@gentlebrooksbathingservices.com`.
- Two testimonials on `index.html` are explicitly marked as sample/placeholder copy — must not be presented as real quotes; replace with real ones (with permission) before wider promotion.
- Pricing (`pricing.html`) uses the owner's real committed rates — no change needed there.

## Open questions for the user (pick up next session)
1. Did they successfully click "Configure" and attach `gentlebrooksbathingservices.com` to the `gentle-brooks-bathing` project?
2. Did they resume the paused Supabase project?
3. Do they want to proceed with installing Git for Windows to push to the GitHub repo?
4. What did "supabase repo... done now" refer to — anything needing follow-up?

## Reminders about environment
- Working directory `C:\Users\Leigh` is **not** a git repository at the top level.
- Vercel team ID: `team_ZEFdFBIp67W9cu6E97PyPZCP` (slug `leighbrooks358-6460s-projects`).
- Supabase project ref: `nihylsfrwtgaupbbjmdq`.
- No git/gh CLI installed as of this session.
