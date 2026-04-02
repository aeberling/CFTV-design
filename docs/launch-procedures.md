# CFTV Static Site — Launch Procedures

*Quick-reference runbook for go-live. Work through each section in order.*

---

## Pre-Launch Checklist

- [ ] All priority pages built and content reviewed
- [ ] Domain strategy resolved (CFTV-02)
- [ ] Old WP site accessible at legacy URL
- [ ] 302 redirects configured (newsletter, contact, reservations, rentals)
- [ ] Old WP site branding adjustments complete (CFTV-04)
- [ ] Final build passes (`npm run build`) with no errors

---

## 1. Enable Google Analytics & Tag Manager

**Files:** `src/_layouts/base.njk`

Three commented-out blocks need to be uncommented. Search for `[LAUNCH]` in base.njk.

### a. GA4 + Google Ads (in `<head>`)
Uncomment the gtag.js script block:
- **GA4 Measurement ID:** `G-RPLQCMYREV`
- **Google Ads Conversion ID:** `AW-10800163766`
- **Cross-domain linker:** `cftetonvalley.org`

### b. Google Tag Manager — head snippet (in `<head>`)
Uncomment the GTM script block:
- **Container ID:** `GTM-PNT8N29`

### c. Google Tag Manager — noscript fallback (after `<body>`)
Uncomment the GTM noscript/iframe block:
- **Container ID:** `GTM-PNT8N29`

### Verification
After uncommenting and deploying:
1. Open the site and check browser DevTools > Network for requests to `googletagmanager.com`
2. Use [Google Tag Assistant](https://tagassistant.google.com/) to confirm tags are firing
3. Check GA4 Realtime report for incoming hits

---

## 2. DNS & Domain Cutover

- [ ] Point `cftetonvalley.org` to new static site hosting
- [ ] Verify SSL certificate is active
- [ ] Confirm old WP site is accessible at legacy URL (e.g., `legacy.cftetonvalley.org`)
- [ ] Test all 302 redirects from static site → old WP pages

---

## 3. Redirects to Old WP Site

These pages on the static site redirect to the old WP site until functionality is rebuilt:

| Static Site Link | Redirects To | WP Functionality |
|-----------------|-------------|-----------------|
| Newsletter signup | WP newsletter page | FluentCRM |
| Contact form | WP contact page | Contact form plugin |
| Conference room reservations | WP reservations page | Reservation system |
| Event equipment rentals | WP rentals page | Rental system |

- [ ] All redirect links tested and working
- [ ] WP landing pages styled per CFTV-04 (no header/footer, loose brand match)

---

## 4. Donation Links

- [ ] GoDonate redirect for direct donations is live
- [ ] GoDonate redirect for Challenger gifts is live
- [ ] Fund holder login redirects to GOfund
- [ ] All donation flows tested end-to-end

---

## 5. Cache Busting / Version Bump

- [ ] Bump `package.json` version before final deploy
- [ ] Verify CSS/JS URLs include updated `?v=` parameter

---

## 6. Post-Launch Verification

- [ ] All pages load without console errors
- [ ] Mobile responsive spot-check (320px, 768px, 1024px)
- [ ] All navigation links work (no 404s)
- [ ] Analytics confirmed receiving data (GA4 Realtime)
- [ ] GTM container verified firing
- [ ] Redirect pages load correctly on old WP site
- [ ] Donation links reach GoDonate
- [ ] Social/OG meta tags render correctly (test with sharing debugger)

---

## Rollback Plan

If critical issues are found after launch:
1. Revert DNS to point back to old WP site
2. Old WP site should remain fully functional at original domain until confirmed stable

---

## Reference

- **GA4 Property:** G-RPLQCMYREV
- **Google Ads:** AW-10800163766
- **GTM Container:** GTM-PNT8N29
- **Related tickets:** CFTV-02, CFTV-03, CFTV-04, CFTV-05
- **Launch tickets doc:** `docs/launch-tickets.md`
