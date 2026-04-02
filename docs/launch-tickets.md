# CFTV, TCC & App — Launch Tickets

*Derived from Master Launch Timeline (March 13, 2026)*

---

## How to Use This Document

Each ticket below maps to a deliverable from the master timeline. Tickets are grouped by project (CFTV, TCC, App) and ordered by deadline. Use this to create tasks in ClickUp or your project management tool.

## ClickUp Lists

| Project | ClickUp List ID | URL |
|---------|----------------|-----|
| TCC Site | 901413203798 | https://app.clickup.com/2249826/v/li/901413203798 |
| CFTV Site | 901413530269 | https://app.clickup.com/2249826/v/li/901413530269 |
| App | 901413990336 | https://app.clickup.com/2249826/v/li/901413990336 |

**Mapping:**
- TCC-01 through TCC-05 → TCC Site list (901413203798)
- CFTV-01 through CFTV-07 → CFTV Site list (901413530269)
- APP-01, APP-02 → App list (901413990336)
- FUTURE-01, FUTURE-02 → Subtasks of ticket 86b8yg72z (https://app.clickup.com/t/86b8yg72z)

**Defaults for All Tickets:**
- **Assignee:** Joyce Vincent
- **Owner:** Joyce Vincent
- **Custom Field — Project Phase:** Phase 4 - Deploy
- **Priority:** Normal

**Due Dates:**

| Ticket | Due Date |
|--------|----------|
| TCC-01 | 2026-03-31 |
| TCC-02 | 2026-05-10 |
| TCC-03 | 2026-05-10 |
| TCC-04 | 2026-05-14 |
| TCC-05 | 2026-06-12 |
| CFTV-01 | 2026-04-01 |
| CFTV-02 | 2026-04-04 |
| CFTV-03 | 2026-04-06 |
| CFTV-04 | 2026-04-06 |
| CFTV-05 | 2026-04-06 |
| CFTV-06 | 2026-05-15 |
| CFTV-07 | 2026-07-15 |
| APP-01 | 2026-06-01 |
| APP-02 | 2026-06-12 |

---

## TCC Site Tickets

### TCC-01: Static/Partial Site Launch
- **Deadline:** End of March
- **Status:** Techsols done
- **Description:** Launch most of the TCC site publicly. Hide nonprofit listing and individual nonprofit pages. All donation links redirect to current live CFTV site (CFTV/akoyaGO). Cart and app are not connected yet.
- **Acceptance Criteria:**
  - [ ] All non-NP pages are live and accessible
  - [ ] NP listing and individual NP pages are hidden/unpublished
  - [ ] Donation links redirect to current CFTV site
  - [ ] No cart or app connections active

---

### TCC-02: Race Registration Form (GoDonate)
- **Deadline:** May 1–10 (hard deadline: May 14)
- **Status:** Techsols done
- **Owner:** Claire (client) builds initial form; team assists if needed
- **Description:** Race registration form built and hosted on GoDonate. Users redirected from TCC site to GoDonate form. Form connects to akoyaGO. This form is permanently separate from the cart — it is not part of the cart checkout flow.
- **Dependencies:** Confirm with dev team that May 1–10 is achievable for React-based TCC site
- **Acceptance Criteria:**
  - [ ] Race registration form live on GoDonate
  - [ ] TCC site links/redirects to GoDonate form
  - [ ] Form connects to akoyaGO
  - [ ] Form is separate from cart flow (confirmed)

---

### TCC-03: Full Site Launch (All Pages Live)
- **Deadline:** May 1–10
- **Status:** Techsols done
- **Description:** All TCC pages and content live except full nonprofit details. This is the full public launch of the site minus NP intake content.
- **Dependencies:** TCC-01 complete, TCC-02 in progress
- **Acceptance Criteria:**
  - [ ] All pages live and accessible
  - [ ] Content complete and reviewed
  - [ ] Race form accessible from site

---

### TCC-04: Nonprofit Intake/Onboarding Form
- **Deadline:** May 14 (ready a few days before)
- **Status:** Techsols building onboarding form + application form
- **Description:** Nonprofit onboarding form live on TCC site. Organizations begin submitting info and marketing materials ahead of June 12 campaign launch.
- **Acceptance Criteria:**
  - [ ] Onboarding form live and functional
  - [ ] Application form live and functional
  - [ ] Submissions are received and stored correctly
  - [ ] Form available a few days before May 14

---

### TCC-05: Campaign Launch — Cart Live, Donations Open
- **Deadline:** June 12 (HARD DEADLINE)
- **Status:** Techsols done
- **Description:** TCC cart goes live. All participating nonprofits connected. All donation flows ready. This is the hard launch — everything must be functional.
- **Dependencies:** TCC-04 complete, APP-01 complete
- **Acceptance Criteria:**
  - [ ] Cart is live and functional
  - [ ] All participating nonprofits connected
  - [ ] All donation flows tested and working
  - [ ] End-to-end donor experience verified

---

## CFTV Site Tickets

### CFTV-01: Donation Redirects on Current WP Site
- **Deadline:** April 1
- **Description:** Get donation functionality live on the current WordPress site as fast as possible. GoDonate redirects live for direct donations and Challenger gifts. Fund holder login redirected to GOfund.
- **Acceptance Criteria:**
  - [ ] GoDonate redirect for direct donations is live
  - [ ] GoDonate redirect for Challenger gifts is live
  - [ ] Fund holder login redirects to GOfund
  - [ ] All redirects tested and working

---

### CFTV-02: Domain Setup for Old WP Site
- **Deadline:** Before April 6 (BLOCKER for CFTV-03)
- **Description:** Resolve how the current WP site remains accessible once the static site takes over the main domain. Options: subdomain (e.g., `legacy.cftetonvalley.org`), separate hosting, etc. Use temporary (302) redirects — these go away when the new WP site launches in July.
- **Acceptance Criteria:**
  - [ ] Domain strategy decided (subdomain, separate hosting, etc.)
  - [ ] Old WP site accessible at new URL
  - [ ] 302 redirects configured
  - [ ] Tested and verified before April 6

---

### CFTV-03: New Static Site Launch (Partial)
- **Deadline:** April 6
- **Dependencies:** CFTV-02 must be resolved first
- **Description:** Static version of new CFTV site goes live on main domain. May not include every page — smaller version is okay. Reservations redirect to current WP site. Old WP site needs a staging version with only necessary pages, no header/footer, colors loosely matching new branding.
- **Acceptance Criteria:**
  - [ ] Static site live on main domain
  - [ ] Priority pages built and live
  - [ ] Reservation links redirect to WP site
  - [ ] Old WP staging site set up (no header/footer, light branding match)
  - [ ] All redirect flows tested (newsletter, contact, reservations, rentals)

---

### CFTV-04: Old WP Site Branding Adjustments
- **Deadline:** April 6 (alongside CFTV-03)
- **Description:** Update the old WP site pages that users will be redirected to. Remove header and footer. Update styling to loosely match the new static site so the transition isn't jarring.
- **Acceptance Criteria:**
  - [ ] Header and footer removed from redirected pages
  - [ ] Styling updated to approximate new branding
  - [ ] Transition between static site and WP pages is not jarring

---

### CFTV-05: Static Site Redirect Pages
- **Deadline:** April 6 (alongside CFTV-03)
- **Description:** Set up redirects from the static site to the old WP site for functionality that doesn't exist in static:
  - Newsletter signup → WP page with FluentCRM
  - Contact form → WP contact page
  - Conference room reservations → WP reservation system
  - Event equipment rentals → WP rental system
  - Workshops → WP workshop pages (if applicable)
- **Acceptance Criteria:**
  - [ ] All redirect links are functional
  - [ ] Each redirected page on WP is styled per CFTV-04
  - [ ] User flow is smooth and not confusing

---

### CFTV-06: Full Static Site Launch
- **Deadline:** Mid-May
- **Description:** All remaining pages and content built out and live. Embedded akoyaGO forms for direct donations and Challenger gifts. Static site remains live through the TCC campaign (June–July).
- **Acceptance Criteria:**
  - [ ] All pages built and live
  - [ ] akoyaGO donation forms embedded and functional
  - [ ] Challenger gift forms embedded and functional
  - [ ] Full site reviewed and approved

---

### CFTV-07: WordPress Full Site Launch
- **Deadline:** Mid-July
- **Description:** New WordPress version of CFTV site launches, replacing the static site. WP build happens in the background during the TCC campaign. All functionality migrated from static + old WP site to new WP.
- **Acceptance Criteria:**
  - [ ] New WP site live on main domain
  - [ ] Static site retired
  - [ ] Old WP site/staging retired
  - [ ] All 302 redirects removed
  - [ ] All forms and functionality working natively in new WP
  - [ ] Client can manage content via WP admin

---

## App Tickets

### APP-01: App Build Complete
- **Deadline:** June 1
- **Description:** App fully built with all features. All nonprofits' full information added. Final connections and functionality completed. Buffer before donations open on June 12. Note: Race registration form stays on GoDonate (separate from app/cart).
- **Dependencies:** TCC-04 (NP data from intake forms)
- **Acceptance Criteria:**
  - [ ] All app features built and functional
  - [ ] All nonprofit info populated
  - [ ] App connections to backend verified
  - [ ] Full QA/testing complete
  - [ ] Race form confirmed as separate (GoDonate)

---

### APP-02: Cart Live / Campaign Start
- **Deadline:** June 12 (HARD DEADLINE)
- **Description:** Cart goes live within the app. All participating nonprofits connected. All donation flows functional. Campaign officially begins.
- **Dependencies:** APP-01 complete, TCC-05 aligned
- **Acceptance Criteria:**
  - [ ] Cart functional in app
  - [ ] All nonprofits connected
  - [ ] Donation flows end-to-end tested
  - [ ] Campaign launch confirmed

---

## Future Features (Post-Launch, Not in Scope)

### FUTURE-01: Race Registration Module (App)
- **Description:** Dedicated module in the app for race registration. Even if built, race form remains separate from cart. Cart handles nonprofits + Challenger fund; race form is always separate.
- **Notes:** Currently handled by GoDonate. Evaluate post-launch.

---

### FUTURE-02: Challenger Level Toggle (App)
- **Description:** Manual toggle/checkbox for marking individuals or businesses as part of a Challenger group. Client manually approves/assigns Challenger status (not automated — based on pledge amounts, not completed payments). Time-bound (one year). Separate thresholds for individuals vs. businesses.
- **Notes:** May already be partially in progress — confirm before building.

---

## Ticket Summary

| ID | Ticket | Deadline | Project |
|----|--------|----------|---------|
| TCC-01 | Static/Partial Site Launch | End of March | TCC |
| TCC-02 | Race Registration Form (GoDonate) | May 1–10 | TCC |
| TCC-03 | Full Site Launch | May 1–10 | TCC |
| TCC-04 | NP Intake/Onboarding Form | May 14 | TCC |
| TCC-05 | Campaign Launch — Cart + Donations | June 12 | TCC |
| CFTV-01 | Donation Redirects on Current WP | April 1 | CFTV |
| CFTV-02 | Domain Setup for Old WP Site | Before April 6 | CFTV |
| CFTV-03 | New Static Site Launch (Partial) | April 6 | CFTV |
| CFTV-04 | Old WP Site Branding Adjustments | April 6 | CFTV |
| CFTV-05 | Static Site Redirect Pages | April 6 | CFTV |
| CFTV-06 | Full Static Site Launch | Mid-May | CFTV |
| CFTV-07 | WordPress Full Site Launch | Mid-July | CFTV |
| APP-01 | App Build Complete | June 1 | App |
| APP-02 | Cart Live / Campaign Start | June 12 | App |
| FUTURE-01 | Race Registration Module | Post-Launch | App |
| FUTURE-02 | Challenger Level Toggle | Post-Launch | App |

---

## Critical Path & Blockers

1. **CFTV-02 blocks CFTV-03** — Domain setup must be resolved before static site can launch on April 6
2. **June 12 is the hard deadline** — TCC-05 and APP-02 must be functional, no exceptions
3. **Race form is always separate from cart** — this is a permanent architecture decision, not a temporary workaround
4. **Client manages nothing on static site** — all changes go through the team until WP launches in July
