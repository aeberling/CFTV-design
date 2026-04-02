# CFTV, TCC & App — Master Launch Timeline

*Last updated: March 13, 2026*

---

## At a Glance

| Date | What | Milestone |
|------|------|-----------|
| End of March | **TCC Site** | Static/partial launch |
| April 1 | **CFTV Site** | Current WP site: donation redirects live |
| April 6 | **CFTV Site** | New static site launches (partial) |
| May 1–10 | **TCC Site** | Full site launch + race form |
| May 14 | **TCC Site** | NP intake form live |
| Mid-May | **CFTV Site** | Full static site launch |
| June 1 | **App** | Fully built and tested |
| June 12 | **TCC Site / App** | Campaign launch, donations open, cart live |
| Mid-July | **CFTV Site** | WordPress full site launches and replaces static |

---

# TCC Site Timeline

**URL:** https://tin-cup-challenge-design-2ml6o.kinsta.page/

### End of March — Partial/Static Launch
- Most of the site will be live and visible
- Hidden pages: nonprofits listing and individual nonprofit pages
- Links redirect to current live CFTV website for donations (CFTV/akoyaGO)
- Cart and app not connected yet

### May 1–10 — Full Site Launch + Race Form
- **⚠️ Need to confirm with dev team that this date is doable — TCC site is being built completely in React**
- All pages and content live except full nonprofit details
- **Race registration form** is the key deliverable driving this date
  - Form for signing up to run the race (info + optional payment)
  - Client wants ready by May 1–10; okay waiting until May 14 if necessary
  - **Plan:** Race form will be built and hosted through GoDonate for the entire duration (not just temporarily)
  - Everything connects to akoyaGO through GoDonate
  - Users will be redirected from TCC site to GoDonate form (no embed option — iframe may be possible but unconfirmed)
  - **The race form is and will always be separate from the cart** — it cannot be part of the cart checkout flow
  - Claire (client) will build out the initial form; we can assist if needed

### May 14 — NP Intake Form Live
- Nonprofit onboarding form available on TCC site
- Organizations begin submitting info and marketing materials ahead of June launch
- Form needs to be ready a few days before this date at minimum
- If the race form slips from May 1–10 window, it must be ready by this date

### June 12 — Campaign Start / Donations Open
- TCC cart goes live
- All participating nonprofits connected
- All donation flows ready to go
- **This is the hard launch date — everything must be functional**

---

# CFTV Site Timeline

**Current live site:** https://cftetonvalley.org/
**New WP dev site:** https://cftvcftetonvalleydev.kinsta.cloud/wp-admin/

### April 1 — Current WP Site: Donation Readiness
- GoDonate redirects live for direct donations and Challenger gifts
- Fund holder login redirected to GOfund
- Fastest path to donations live without risking a rushed build

### April 6 — New Static Site Launch (Partial)
- Static version of new CFTV site goes live on main domain
- May not include every page due to tight timeline — smaller version is okay
- Reservations functionality confirmed working beforehand (will redirect to current WP site for functionality)
- Current live WP site will need a staging site with only the pages we need, no header/footer, colors and/or design lightly matching the new branding.
- **Domain setup for old WP site must be resolved before this date** (see below)

### Mid-May — Full Static Site Complete
- All remaining pages and content built out and live
- Embedded akoyaGO forms for direct donations and Challenger gifts
- Static site remains live through the TCC campaign (June–July)

### Mid-July — WordPress CFTV Full Launch
- New WordPress version of CFTV site launches, replacing the static site
- WP build happens in the background during the TCC campaign
- Target: mid-July, likely mid-campaign

---

## Static-to-WP Bridge: Redirects & Functionality

While the static site is live (April 6 – mid-July), the following functionality will be handled via redirects to the current WordPress site:

- **Newsletter signup** — Redirect to WP page with FluentCRM connection
- **Contact form** — Redirect to existing WP contact page
- **Conference room reservations** — Redirect to WP reservation system
- **Event equipment rentals** — Redirect to WP rental system
- **Workshops** — Redirect to WP workshop pages (if applicable)

### Branding Adjustments on Old WP Site
- Remove header and footer from redirected pages
- Update styling to loosely match the new static site so the transition isn't jarring

### Management
- Client won't manage anything on the static site — all changes go through us
- Client continues using the backend of their old WordPress site for forms, reservations, workshops, etc.

### Domain Setup — TBD (Must Resolve Before April 6)
- The current WP site needs to remain accessible once the static site takes over the main domain
- Options: subdomain (e.g., `legacy.cftetonvalley.org`), separate hosting, etc.
- Use temporary (302) redirects — these go away when the new WP site launches in July

---

# App Timeline

### June 1 — Fully Built and Tested
- App complete with all features
- Nonprofits' full information added
- Final app connections and functionality completed in early June
- Buffer before donations open on June 12
- Note: Race registration form remains on GoDonate (separate from the app/cart)

### June 12 — Cart Live / TCC Campaign Start
- All participating nonprofits connected
- All donation flows functional
- Campaign officially begins

---

# Future Features (Post-Launch)

### Race Registration Module (App)

**Not part of current project scope — noting for future development.**

We may be able to build a dedicated module in the app to handle race registration. However, even if built, the race form would remain separate from the cart. The cart handles nonprofit donations and Challenger fund checkout — the race form cannot be part of that flow.

- Cart: nonprofits + Challenger fund (same checkout)
- Race registration: always separate (currently GoDonate, potentially a future app module)

---

### Challenger Level Toggle (App)

**Not part of current project scope — noting for future development.**

Add a manual toggle/checkbox in the app for marking individuals or businesses as part of a Challenger group. When a donor reaches a certain Challenger level, the client can manually confirm their Challenger status for that period (typically one year).

**Key requirements:**
- NOT fully automated — client must manually approve/assign Challenger status
- Reason: status is based on pledge amounts, not just completed payments
- Time-bound, one year
- Separate thresholds for individuals vs. businesses
- May already be partially in progress — confirm before building
