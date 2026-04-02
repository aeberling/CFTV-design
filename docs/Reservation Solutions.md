# Reservation Solutions — CFTV

## Goal
Replace the current WooCommerce-based reservation system with a better solution for the new WordPress site. The new system should handle:
1. **Conference room reservations**
2. **Equipment rentals** (tables, chairs, tents, etc.) for events

**Constraint:** No WooCommerce. Open to plugins or custom-built solutions.

---

## Current System (WooCommerce)

*Documenting how the existing system works so we can identify what to keep, improve, or eliminate.*

### Conference Room Reservations

**User Flow:**

1. User visits the conference room booking page
2. A **calendar** is displayed with color-coded days:
   - **Open** — no reservations booked that day
   - **Partially booked** — some time slots still available
   - **Fully booked** — no availability
3. User selects a date from the calendar
4. Available **start times** and **end times** appear as dropdowns
   - Range: 8:00 AM – 7:00 PM
   - Only available (unbooked) time slots are shown
5. **501(c)(3) eligibility check** — two radio buttons:
   - "Yes, we are a Teton Valley-based 501(c)(3) nonprofit"
     - If yes → required field to enter **organization name**
   - "No, we're not"
     - If no → warning message: service is only available to 501(c)(3) organizations; **checkout is blocked**
6. **Event description** field (optional) — what the meeting/event is about
7. **Expected number of attendees** (required)
8. User clicks **"Book Now"**

**Post-Booking Flow (WooCommerce Cart/Checkout):**

9. User is taken to a **WooCommerce cart page** showing:
   - Conference room added as a "product"
   - Booking details: date, time, duration, meeting purpose
   - Cart total: **$0.00** (no cost for conference room)
   - Coupon code field ⚠️ *TODO: Check with client — is the coupon code feature actually used? May not be needed.*
10. From cart, user can:
    - **Continue shopping** — add more conference room bookings or equipment rentals
    - **Proceed to checkout**
11. Checkout page collects **billing details**:
    - Email address
    - First name, last name
    - Company/nonprofit name
    - Street address, city, state, zip code
    - Phone number
12. **Additional information** section (optional):
    - Meeting/event purpose ⚠️ *Note: This duplicates the event description field from step 6 — likely redundant*
    - Notes (optional)
13. **Order summary** column shows booking details and $0.00 total again
14. User checks box to **agree to terms and conditions**
15. User clicks **"Place Order"**

**After Order is Placed:**

16. **User receives confirmation email** with booking details
    - Includes a cancel/modify button ⚠️ *Pain point: Cancel may work but modify does NOT — user has to cancel and rebook entirely*
17. **Admin receives email notification** confirming the booking
18. **Reminder email** sent to user **1 day before** the booking date
19. **No automatic calendar sync currently** — bookings are NOT added to any calendar automatically
    - ✅ *Want for new system:* Auto-sync bookings to a **Microsoft 365 / Outlook calendar** so CFTV staff can see conference room availability at a glance

**User Self-Service (Current State):**
- Users currently have no reliable way to view, modify, or cancel their bookings after the initial email
- ✅ *Want for new system:* Users should be able to view their bookings and cancel/modify them — either via a login portal or email-linked access (approach TBD)

### Admin Back End (WooCommerce)

**Booking Data Storage:**
- All booking info is stored under **Bookings** in the WP admin
- Each booking has two separate IDs:
  - **Booking number** (e.g., #9487) — the individual line item/reservation
  - **Order number** (e.g., #9488) — the WooCommerce order that contains the booking(s)
  - ⚠️ *These are different numbers, which is confusing. Likely because WooCommerce treats the order as the parent and each booking as a child line item — matters more when an order contains multiple bookings (e.g., conference room + equipment)*

**Admin Capabilities:**
- Staff **can** manually create, edit, and cancel bookings from the back end
- Bookings are **auto-confirmed** (no admin approval step)
- **No blackout dates** currently — admin cannot block off holidays, maintenance, etc.
  - ✅ *Want for new system:* Admin should be able to set blackout dates
- **No recurring booking support** currently
  - ✅ *Want for new system:* Recurring bookings needed — CFTV staff themselves book the conference room for their own recurring meetings (e.g., monthly board meetings). Nonprofits generally book one-off.

**Attendee Tracking & Reporting:**
- At booking time, user enters **expected number of attendees** (required)
- **Post-event follow-up email sequence** (custom-built cron job, not WooCommerce):
  1. **Day after event** — Email #1: asks for actual number of attendees
  2. **1 day later** — Email #2 (reminder): same ask, sent if no response
  3. **1 day later** — Email #3 (final reminder): same ask, sent if still no response
  4. **After Email #3** — stop sending; if no response, actual attendance is not recorded
- The actual attendance number is recorded and stored when the user responds
- **Purpose:** At year-end, CFTV totals all actual attendees across all conference room bookings to report to the board — demonstrates community impact of providing the conference room for free
- ✅ *New system must support:*
  - Automated post-event email sequence (3 emails over 3 days)
  - Easy way for user to submit actual attendance (link in email → simple form)
  - Admin dashboard or report showing **year-end total attendees** at a glance
  - Ideally: ability to filter/export by date range, not just calendar year

### Equipment Rentals

**Browsing / Product Catalog:**
- On the Rentals & Reservations page, equipment is displayed as a **store-style grid**
- Each item shows: image, title, "Event Equipment" tag, and a "Read More" button
  - ⚠️ *Pain point: "Read More" is a bad label — should say something like "Reserve" or "View Details"*
- Clicking the image or button goes to a **product detail page** with photos

**Current Inventory:**
- Coolers
- Pull tents
- Frame tents
- Rectangular folding tables
- Round cocktail tables
- Projector & portable screen
- Metal chairs
- Plastic folding chairs
- Trash/recycling pop-up cardboard bins

**User Flow:**

1. User selects an equipment item from the grid
2. On the product page, a **calendar** is displayed (same style as conference room)
3. User selects a **start date** (pickup) and **end date** (return)
   - **No time slots** — equipment is booked by full day(s), not hourly
4. **501(c)(3) eligibility check** — same as conference room:
   - Yes → enter organization name (required)
   - No → warning, checkout blocked
5. **Meeting/event description** field — describe the purpose of the reservation (e.g., "Summer fundraiser event")
6. **No cost** — $0.00
7. User clicks **"Book Now"**

**Inventory & Quantity:**
- Each equipment item has a **total quantity** managed in the system
- User selects how many they want (e.g., "I need 8 chairs")
- Multiple nonprofits can book the same item type on the same date (as long as inventory allows)
- ⚠️ *Pain point: Currently user can enter a quantity HIGHER than what's available — they only find out at checkout when they get an error*
- ✅ *Want for new system:* Show available quantity upfront on the product page so the user knows immediately how many they can book. Prevent selecting more than available.

**Mixed Order Types:**
- Currently conference room + equipment CAN be on the same order
- ⚠️ *TODO: Check with client — should conference room and equipment bookings remain combinable on one order, or be separated?*

**Equipment Returns:**
- ⚠️ *TODO: Ask client — is there any tracking for whether items are returned on time and in good condition? Or is it honor system? Do we need return tracking in the new system?*

**Multi-Item Ordering (Current Flow & Pain Points):**
- After booking first item, user goes to cart → clicks "Continue Shopping"
  - ⚠️ *Pain point: "Continue Shopping" takes you back to the product you just booked, not the full equipment catalog*
  - ✅ *Want for new system:* Return to the full equipment grid so user can easily add more items
- To add a second item (e.g., tables after booking a tent), user must:
  - Navigate back to the equipment catalog
  - Select the new item
  - **Re-enter all the same info again** — dates, 501(c)(3) check, event description
  - ⚠️ *Pain point: This is redundant and frustrating. User already provided this info on the first item.*

**✅ Desired Multi-Item Flow for New System:**
- **One order = one event** — all equipment for a single event (same date range) should be on one order
- Once user books the first item and sets the date range, adding subsequent items should **inherit the same dates and org info** by default
- User should NOT have to re-enter dates, nonprofit status, or event description for each item
- The date from the first item should be shown (locked in) when adding more items to the same order
- **Different event = separate order** — if a nonprofit has a second event on different dates, they place a new order

**Current Problem with Mixed Dates:**
- ⚠️ *Pain point: Currently WooCommerce allows items with DIFFERENT dates on the same order (e.g., tent for Mar 31 + table for Mar 19). This makes the back end confusing and hard to manage — no clear way to distinguish which items belong to which event.*
- ✅ *Want for new system:* Enforce one date range per order, OR if mixed dates must be supported, clearly group items by event/date so they're distinguishable on the back end

**Post-Booking Flow:**
- Same WooCommerce cart → checkout flow as conference room (billing details, terms agreement, place order)
- **No attendee tracking** for equipment rentals (only conference room bookings need that)

**Equipment Email Sequence:**
1. **Confirmation email** — sent to user and admin after order is placed
2. **Reminder email** — sent to user **1 day before the start date** (pickup reminder)
3. *(No post-event attendee follow-up — that's conference room only)*

### Email Rules (Both Conference Room & Equipment)

- **If a user cancels:** they receive a **cancellation confirmation email** and then **no further emails** — all scheduled reminders and follow-ups for that booking are suppressed
- ✅ *New system must handle:* Cancellation should immediately stop all pending email sequences for that booking

### Pain Points Summary

**WooCommerce as a Platform:**
1. WooCommerce is overkill — this isn't e-commerce, it's a free reservation system shoehorned into a shopping cart
2. Cart/checkout flow feels wrong for $0 bookings — users go through a full "shopping" experience for a free service
3. Confusing dual IDs (booking # vs order #) on the back end
4. Back end is hard for staff to manage and understand

**User Experience:**
5. Modify booking doesn't work — user has to cancel and rebook
6. No reliable self-service portal for users to view/manage their bookings
7. "Continue Shopping" returns to the last product, not the full catalog
8. Must re-enter all info (dates, org, event description) for each additional item
9. "Read More" button label is misleading for a rental action
10. Equipment quantity — user can enter more than available, only gets error at checkout
11. Event description is asked twice (booking page + checkout page)
12. Mixed dates allowed on same order — confusing, no way to distinguish events

**Missing Features:**
13. No calendar sync to Microsoft 365 / Outlook
14. No blackout dates for admin
15. No recurring booking support (needed for CFTV staff meetings)
16. No upfront display of available quantity for equipment
17. No year-end reporting dashboard for attendee totals

---

## Open Questions for Client

| # | Question | Status |
|---|----------|--------|
| 1 | Are coupon codes used or needed? | TBD |
| 2 | Should conference room + equipment be combinable on one order? | TBD |
| 3 | Is there equipment return tracking? Do we need it? | TBD |
| 4 | Does the duplicate event description field at checkout serve a purpose? | TBD |

---

## Requirements for New System

### Must-Have
- Conference room booking with color-coded calendar and hourly time slots (8AM–7PM)
- Equipment rental with date range (full days), quantity selection, and inventory tracking
- 501(c)(3) eligibility gate (required for both booking types)
- Auto-confirmation (no admin approval needed)
- Admin can manually create, edit, and cancel bookings
- Admin can set blackout dates
- Recurring booking support (for CFTV staff)
- One order = one event (enforce single date range per order)
- Multi-item ordering without re-entering shared info
- Show available equipment quantity upfront, prevent over-booking
- Email sequence: confirmation → 1-day-before reminder → (conference room only) post-event attendee follow-up (3 emails over 3 days)
- Cancellation suppresses all future emails for that booking
- User self-service: view, modify, and cancel bookings (via login or email link)
- Auto-sync bookings to Microsoft 365 / Outlook calendar
- Year-end attendee reporting (total actual attendees, filterable by date range)
- Admin + user email notifications

### Nice-to-Have
- Equipment return tracking / condition logging
- Exportable reports (CSV/PDF)
- "Add to calendar" link in confirmation emails (iCal/.ics)
- Admin dashboard with at-a-glance booking overview

### Must NOT Have
- WooCommerce
- $0 shopping cart experience
- Redundant data entry for multi-item orders

---

## Solution Constraints

- **Budget**: Keep ongoing costs low (nonprofit). Open to custom build if plugins can't do it all.
- **Admin skill level**: ~6-7 out of 10. Capable once trained, but UI needs to be clear and intuitive.
- **Timeline**: Being built alongside the new WordPress site (not a later phase).

---

## Key Finding

**No single WordPress booking plugin handles BOTH hourly conference room scheduling AND multi-quantity equipment rental with inventory tracking.** These are architecturally different booking models:
- Room booking = time-slot reservation of a single resource
- Equipment rental = date-range reservation with quantity selection from inventory

Every plugin evaluated excels at one but not the other.

---

## Solution Options

### Option A: Two-Plugin Strategy — LatePoint + VikRentItems
*Fastest to deploy, covers ~80% of requirements*

**Conference Room → [LatePoint](https://latepoint.com/)** ($79/yr)
- Hourly time-slot booking with calendar
- Two-way Outlook/M365 calendar sync (included, no add-on)
- Custom fields (501(c)(3) check, org name, attendee count, event description)
- Recurring bookings
- Blackout dates via schedule management
- User self-service dashboard (view/modify/cancel)
- Email notifications with customizable templates
- Webhooks to Zapier for advanced automation (post-event follow-up sequence)
- All features included in all paid plans (no add-on upselling)

**Equipment Rental → [VikRentItems](https://vikwp.com/plugin/vik-rent-items/)** (~$109 one-time)
- Purpose-built for multi-quantity inventory rental
- Date-range booking (pickup/return)
- Tracks available quantities per item per date
- Multiple items per order
- Cron-based email and SMS alerts (Pro)
- No WooCommerce dependency

| Pros | Cons |
|------|------|
| Proven, maintained plugins | Two separate booking interfaces for users |
| Fast to deploy | No unified order combining room + equipment |
| Low cost (~$190 first year, ~$79/yr ongoing) | VikRentItems has no native Outlook sync |
| LatePoint has excellent Outlook sync | Post-event email sequence needs Zapier (~$20/mo or free tier) |
| | Custom fields and 501(c)(3) gating may need workarounds in VikRentItems |
| | Reporting split across two systems |

---

### Option B: LatePoint + Custom Equipment Form
*Simpler but less automated for equipment*

- **LatePoint** ($79/yr) for conference room (same as Option A)
- **Gravity Forms** (~$59/yr) or similar for equipment requests
  - Conditional logic for 501(c)(3) gating
  - Date pickers, quantity fields
  - Admin manually checks inventory availability
  - Email notifications built in

| Pros | Cons |
|------|------|
| Simple, fewer moving parts | Equipment side is a request form, not real-time availability |
| LatePoint handles the complex room booking | Admin has to manually manage equipment inventory |
| Lower cost (~$138/yr) | No color-coded calendar for equipment |
| | Doesn't scale well if equipment bookings increase |

---

### Option C: Fully Custom WordPress Plugin ⭐
*Best long-term fit — meets every requirement in a unified system*

A custom WordPress plugin built specifically for CFTV's reservation system.

**Technical Architecture:**
- **Custom Post Types**: `reservation`, `equipment_item` with REST API support
- **Calendar UI**: [FullCalendar.js](https://fullcalendar.io/) (open source, free) — color-coded, interactive, responsive
- **Inventory System**: Custom database table tracking total vs. reserved quantity per item per date range
- **Multi-Item Cart**: Session-based reservation builder — user sets event dates + org info once, then adds room and/or equipment to a single order
- **501(c)(3) Gate**: Built directly into the booking form with conditional logic
- **Email Automation**: WP-Cron for scheduled sequences (confirmation → reminder → post-event follow-up). Optional SendGrid/Mailgun integration for reliability.
- **Outlook/M365 Sync**: Microsoft Graph API integration (OAuth2, Azure AD app registration). This is the most complex piece (~20-30 dev hours alone).
- **User Portal**: Front-end pages for viewing/modifying/canceling bookings (via login or email-linked token)
- **Admin Dashboard**: Custom admin pages with booking management, inventory CRUD, calendar overview, and year-end attendee reporting with date-range filters and CSV export
- **Blackout Dates**: Admin UI to set blackout periods per resource type
- **Recurring Bookings**: Recurrence rules stored per booking, auto-generated instances

**Estimated Development:**
- **Dev time**: 120–200 hours
- **Cost**: $6,000–$15,000 (depending on developer rates)
- **Timeline**: 6–10 weeks for initial build
- **Ongoing**: ~$0/yr in licensing (just hosting + occasional maintenance)

| Pros | Cons |
|------|------|
| Meets 100% of requirements | Higher upfront cost |
| Unified experience — one booking flow for room + equipment | Longer to build (6-10 weeks) |
| One order = one event, enforced by design | Ongoing maintenance responsibility |
| No annual plugin licensing fees | M365 integration is complex |
| Admin UI built specifically for CFTV staff | Need a developer for future changes |
| Attendee reporting built to spec | |
| No WooCommerce "shopping cart" feel | |
| Multi-item ordering with inherited dates/info | |
| Full control over email sequences | |
| Can evolve with CFTV's needs | |

---

## Plugin Comparison Matrix

| Requirement | LatePoint | Amelia | Bookly | VikRentItems | Custom |
|---|---|---|---|---|---|
| Room booking (hourly) | ✅ | ✅ | ✅ | ⚠️ awkward | ✅ |
| Equipment inventory/qty | ❌ | ❌ | ❌ | ✅ | ✅ |
| No WooCommerce | ✅ | ✅ | ✅ | ✅ | ✅ |
| Custom fields (501c3) | ✅ | ✅ | ✅ (add-on $) | ⚠️ basic | ✅ |
| Multi-item orders | ❌ | ⚠️ packages | ❌ | ✅ | ✅ |
| Email sequences | ⚠️ via Zapier | ✅ | ✅ | ⚠️ basic | ✅ |
| Outlook 2-way sync | ✅ | ✅ | ✅ (add-on $) | ❌ | ✅ |
| Recurring bookings | ✅ | ✅ | ✅ (add-on $) | ❌ | ✅ |
| Blackout dates | ✅ | ✅ | ✅ | ✅ | ✅ |
| User self-service | ✅ | ✅ | ✅ | ⚠️ limited | ✅ |
| Reporting/export | ✅ | ✅ | ✅ | ⚠️ decent | ✅ |
| **Annual cost** | **$79** | **$149-299** | **$279+** | **$109 once** | **$0** |

---

## Recommendation

**Option C (Custom Plugin) is the strongest fit** if the budget allows the upfront investment. It's the only approach that delivers a unified booking experience for both room and equipment, eliminates the WooCommerce cart/checkout UX entirely, and meets every requirement without workarounds or Zapier glue.

**If budget is tight or timeline is urgent**, start with **Option A (LatePoint + VikRentItems)** to get something functional quickly (~$190), with the understanding that the two-system split is a compromise. This could also serve as a working prototype to refine requirements before investing in a custom build later.

**Not recommended:**
- Amelia, Bookly, Booknetic — all lack equipment inventory tracking and would still need a second solution
- Bookly's add-on pricing model gets expensive fast (~$400+/yr for all needed features)
- Team Booking — outdated, limited features, no Outlook sync
