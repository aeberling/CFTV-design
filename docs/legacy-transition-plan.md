# Legacy Site Transition Plan

**Objective:** Convert `cftetonvalley.org` (WordPress) into `legacy.cftetonvalley.org` — a stripped-down version that only serves pages with active functionality (events, job board, rentals, support opportunities) while drafting everything else.

---

## Phase 1: Draft All Non-Essential Pages

**Action:** Set the following pages to **Draft** status in WordPress so they are no longer publicly accessible.

### Pages to Draft (57 pages)

#### Homepage & Top-Level
- `/` (Homepage)
- `/about/`
- `/ways-to-give/`
- `/grants-scholarships/`
- `/community-impact/`
- `/nonprofit-directory/`
- `/contact/`
- `/news/`
- `/calendar/`
- `/donate/`
- `/sitemap/`
- `/styleguide/`
- `/linktree/`
- `/testimonials/`

#### Grants & Scholarships Section
- `/grants-scholarships/tin-cup-challenge/`
- `/grants-scholarships/competitive-grants/`
- `/grants-scholarships/blake-chapman-young-eagles-scholarship/`
- `/grants-scholarships/youth-philanthropy/`

#### Annual Reports
- `/annual-reports/`
- `/annual-reports/2024-annual-report/`
- `/annual-reports/2023-annual-report/`
- `/annual-reports/2022-annual-report/`
- `/annual-reports/2021-annual-report/`
- `/annual-reports/2020-annual-report/`

#### Community Impact (non-essential)
- `/community-impact/nonprofit-support-dashboard/`

#### Tin Cup / Challengers
- `/register-to-run/`
- `/community-challengers/`
- `/business-challengers/`
- `/in-kind-donors-2/`

#### Funds & Giving
- `/fund-types-and-structures/`
- `/fund-holder-login/`
- `/donor-central/`
- `/stocks-bonds/`
- `/community-emergency-response-fund/`

#### Nonprofit Resources
- `/nonprofit-resources/`

#### Sector Pages
- `/sports-recreation/`
- `/health-human-services/`
- `/education/`
- `/conservation-environment/`
- `/civic-service/`
- `/arts-culture/`
- `/animal-rescue/`

#### Misc / Utility
- `/operation-independence/`
- `/media-kit/`
- `/sign-up-for-our-newsletter/`
- `/newsletter-thank-you/`
- `/farmers-market-signup/`
- `/booth-hosting-guidelines/`
- `/consent/`
- `/terms-conditions/`
- `/refund_returns/`

#### Blog Posts
- Draft all posts (accessible via `/news/` or direct URL)

#### Custom Post Types
- Draft all Nonprofit profiles
- Draft all Team member profiles
- Draft all Tin Cup Challenge entries (challenger levels, participants)

---

## Phase 2: Configure Remaining Live Pages

The following pages stay **Published** but are modified:

### Pages Staying Live (15+ pages)

| Page | URL |
|------|-----|
| Events Hub | `/events/` |
| Individual Events | `/event/*` (all downstream) |
| Nonprofit Job Board | `/community-impact/nonprofit-job-board/` |
| Post Support Opportunities | `/post-support-opportunities/` |
| Nonprofit Support Opportunities | `/community-impact/nonprofit-support-opportunities/` |
| Nonprofit Newsgroup | `/nonprofit-newsgroup/` |
| Rentals & Reservations | `/rentals-reservations/` |
| Services & Rentals | `/services-rentals/` |
| Conference Room | `/services-rentals/conference-room/` |
| Cocktail Tables | `/services-rentals/cocktail-tables/` |
| Epson Projector | `/services-rentals/epson-projector-portable-screen/` |
| 4ft Rectangle Tables | `/services-rentals/4-ft-rectangle-tables/` |
| 6ft Rectangle Tables | `/services-rentals/6-ft-rectangle-tables/` |
| 8ft Rectangle Tables | `/services-rentals/8-ft-rectangle-tables/` |
| 20x40 Pole Tent | `/services-rentals/20x40-pole-tent/` |
| 20x20 Pole Tent | `/services-rentals/20x20-pole-tent/` |
| 20x20 Frame Tent | `/services-rentals/20x20-frame-tent/` |
| 100qt Ice Coolers | `/services-rentals/100-qt-ice-coolers/` |
| Trash/Recycling Pop-ups | `/services-rentals/trash-recycling-pop-ups/` |
| Plastic Folding Chairs | `/services-rentals/plastic-folding-chairs/` |
| Metal Folding Chairs | `/services-rentals/metal-folding-chairs/` |
| Cart / Checkout | WooCommerce cart & checkout pages |

### Modifications to All Remaining Live Pages

Apply these changes globally to every page that stays published:

1. **Hide the Header** — Remove or hide the site header/navigation via CSS or template override
2. **Hide the Footer** — Remove or hide the site footer via CSS or template override
3. **Remove "We're Here to Help" CTA** — Remove the CTA section that appears above the footer on most pages

### Page-Specific Modifications

| Page | Additional Action |
|------|-------------------|
| `/community-impact/nonprofit-job-board/` | Remove the Hero section |
| `/community-impact/nonprofit-support-opportunities/` | Remove the Hero section |
| `/nonprofit-newsgroup/` | Remove the Hero section |

---

## Phase 3: DNS & Domain Configuration

1. Point `cftetonvalley.org` to the new Eleventy static site
2. Move the existing WordPress installation to `legacy.cftetonvalley.org`
3. Ensure all WooCommerce (rentals/cart/checkout), Events Calendar, and Job Board functionality continues to work on the legacy subdomain

---

## Implementation Approach

### Option A: CSS-Only (Fastest)
Add custom CSS to hide header, footer, and CTA globally:

```css
/* Hide header and footer on all legacy pages */
.site-header,
#site-header,
header { display: none !important; }

.site-footer,
#site-footer,
footer { display: none !important; }

/* Hide We're Here to Help CTA */
.here-to-help,
.cta-help,
[class*="here-to-help"] { display: none !important; }

/* Hide hero on specific pages */
body.page-id-JOBBOARD .hero,
body.page-id-SUPPORTOPPS .hero { display: none !important; }
```

> **Note:** Replace `.hero`, `.here-to-help`, and page body class selectors with the actual class names used in the WordPress theme. Page IDs for the body class can be found by inspecting the `<body>` tag on each page.

### Option B: Theme Template Override (Cleaner)
Create a custom page template (e.g., `page-legacy.php`) that:
- Excludes `get_header()` and `get_footer()`
- Excludes the "We're Here to Help" template part
- Apply this template to all remaining live pages

### Recommended: Option A
CSS-only is fastest to implement and easiest to revert. Since these pages are transitional and will eventually be decommissioned, a clean template override isn't necessary.

---

## Checklist

- [ ] Back up the WordPress database and files
- [ ] Draft all pages listed in Phase 1
- [ ] Draft all blog posts
- [ ] Draft all custom post types (nonprofits, team, challengers)
- [ ] Apply global CSS to hide header, footer, and CTA on remaining pages
- [ ] Remove hero on `/community-impact/nonprofit-job-board/`
- [ ] Remove hero on `/community-impact/nonprofit-support-opportunities/`
- [ ] Test all remaining live pages for functionality (events, rentals, job board, WooCommerce cart/checkout)
- [ ] Configure DNS: `cftetonvalley.org` → new static site
- [ ] Configure DNS: `legacy.cftetonvalley.org` → WordPress
- [ ] Update any hardcoded `cftetonvalley.org` links in the remaining WordPress pages to use `legacy.cftetonvalley.org`
- [ ] Test WooCommerce cart/checkout flow on legacy subdomain
- [ ] Test Events Calendar on legacy subdomain
- [ ] Verify drafted pages return 404 or redirect appropriately
