# 301 Redirects — cftetonvalley.org Migration

Redirects from the old WordPress site URLs to the new Eleventy site URLs.

## Implementation

Redirects are implemented via Eleventy pagination in `src/redirects.njk` using data from `src/_data/redirects.json`. Each old URL generates an HTML page with:
- `<meta http-equiv="refresh">` for immediate redirect
- JavaScript `window.location.replace()` as backup
- `<link rel="canonical">` for SEO

## Excluded from Redirects (Still on Live Site)

These old site pages are still actively linked to from the new site and should NOT be redirected:

| Old URL | Reason |
|---------|--------|
| `/community-impact/nonprofit-support-opportunities/` | Linked from get-involved page |
| `/community-impact/nonprofit-job-board/` | Linked from get-involved page |
| `/services-rentals/conference-room/` | Linked from nonprofits/resources |
| `/rentals-reservations/` | Linked from nonprofits/resources |
| `/nonprofit-newsgroup/` | Linked from nonprofits/resources |
| `/events/` | Linked from news-events page |
| `/fund-holder-login/` | Authenticated portal |
| `/register-to-run/` | Event registration |
| `/post-support-opportunities/` | Form submission page |
| `/community-impact/nonprofit-support-dashboard/` | Authenticated portal |
| `/donor-central/` | Authenticated portal |

## Page Redirects (44 total)

| Old URL | New URL | Note |
|---------|---------|------|
| `/ways-to-give/` | `/give/` | Main giving page renamed |
| `/donate/` | `/give/` | Donate consolidated into give |
| `/grants-scholarships/` | `/funds-scholarships/` | Section renamed |
| `/grants-scholarships/tin-cup-challenge/` | `/give/tin-cup-challenger/` | Moved under give |
| `/grants-scholarships/competitive-grants/` | `/nonprofits/apply-for-grants/` | Moved under nonprofits |
| `/grants-scholarships/blake-chapman-young-eagles-scholarship/` | `/funds-scholarships/scholarships/` | Consolidated |
| `/grants-scholarships/youth-philanthropy/` | `/about/programs/` | Now under programs |
| `/news/` | `/news-events/` | Section renamed |
| `/annual-reports/` | `/about/annual-reports/` | Moved under about |
| `/annual-reports/2024-annual-report/` | `/about/annual-reports/` | Consolidated |
| `/annual-reports/2023-annual-report/` | `/about/annual-reports/` | Consolidated |
| `/annual-reports/2022-annual-report/` | `/about/annual-reports/` | Consolidated |
| `/annual-reports/2021-annual-report/` | `/about/annual-reports/` | Consolidated |
| `/annual-reports/2020-annual-report/` | `/about/annual-reports/` | Consolidated |
| `/fund-types-and-structures/` | `/give/start-a-fund/` | Moved under give |
| `/community-impact/` | `/about/programs/` | Consolidated into programs |
| `/nonprofit-resources/` | `/nonprofits/resources/` | Moved under nonprofits |
| `/calendar/` | `/get-involved/calendar/` | Moved under get-involved |
| `/sign-up-for-our-newsletter/` | `/get-involved/subscribe/` | Renamed and moved |
| `/stocks-bonds/` | `/give/leave-a-legacy/` | Consolidated into legacy giving |
| `/community-emergency-response-fund/` | `/give/` | Consolidated into give |
| `/testimonials/` | `/about/` | Consolidated into about |
| `/workshops-nonprofit-resources/` | `/nonprofits/workshops/` | Moved under nonprofits |
| `/community-challengers/` | `/give/tin-cup-challenger/` | Consolidated |
| `/business-challengers/` | `/give/tin-cup-challenger/` | Consolidated |
| `/in-kind-donors-2/` | `/give/tin-cup-challenger/` | Consolidated |
| `/media-kit/` | `/about/` | Consolidated into about |
| `/operation-independence/` | `/about/programs/` | Now under programs |
| `/styleguide/` | `/style-guide/` | URL format changed |
| `/newsletter-thank-you/` | `/get-involved/subscribe/` | Redirects to subscribe |
| `/refund_returns/` | `/contact/` | Redirects to contact |
| `/terms-conditions/` | `/contact/` | Redirects to contact |
| `/consent/` | `/contact/` | Redirects to contact |
| `/farmers-market-signup/` | `/get-involved/` | Consolidated |
| `/booth-hosting-guidelines/` | `/get-involved/` | Consolidated |
| `/sports-recreation/` | `/nonprofit-directory/` | Sector → directory |
| `/health-human-services/` | `/nonprofit-directory/` | Sector → directory |
| `/education/` | `/nonprofit-directory/` | Sector → directory |
| `/conservation-environment/` | `/nonprofit-directory/` | Sector → directory |
| `/civic-service/` | `/nonprofit-directory/` | Sector → directory |
| `/arts-culture/` | `/nonprofit-directory/` | Sector → directory |
| `/animal-rescue/` | `/nonprofit-directory/` | Sector → directory |
| `/linktree/` | `/` | Redirects to homepage |
| `/sitemap/` | `/` | Redirects to homepage |

## News Post Redirects (97 total)

All old news posts at root level (e.g., `/slug/`) redirect to `/news-events/slug/`.

See `src/_data/redirects.json` for the complete list.

## Production Nginx Config

For true 301 redirects on the server, add this to the Forge nginx config. The HTML meta redirects work as a fallback, but server-level 301s are better for SEO:

```nginx
# Page redirects
rewrite ^/ways-to-give/?$ /give/ permanent;
rewrite ^/donate/?$ /give/ permanent;
rewrite ^/grants-scholarships/?$ /funds-scholarships/ permanent;
rewrite ^/grants-scholarships/tin-cup-challenge/?$ /give/tin-cup-challenger/ permanent;
rewrite ^/grants-scholarships/competitive-grants/?$ /nonprofits/apply-for-grants/ permanent;
rewrite ^/grants-scholarships/blake-chapman-young-eagles-scholarship/?$ /funds-scholarships/scholarships/ permanent;
rewrite ^/grants-scholarships/youth-philanthropy/?$ /about/programs/ permanent;
rewrite ^/news/?$ /news-events/ permanent;
rewrite ^/annual-reports/?$ /about/annual-reports/ permanent;
rewrite ^/annual-reports/.+$ /about/annual-reports/ permanent;
rewrite ^/fund-types-and-structures/?$ /give/start-a-fund/ permanent;
rewrite ^/community-impact/?$ /about/programs/ permanent;
rewrite ^/nonprofit-resources/?$ /nonprofits/resources/ permanent;
rewrite ^/calendar/?$ /get-involved/calendar/ permanent;
rewrite ^/sign-up-for-our-newsletter/?$ /get-involved/subscribe/ permanent;
rewrite ^/stocks-bonds/?$ /give/leave-a-legacy/ permanent;
rewrite ^/community-emergency-response-fund/?$ /give/ permanent;
rewrite ^/testimonials/?$ /about/ permanent;
rewrite ^/workshops-nonprofit-resources/?$ /nonprofits/workshops/ permanent;
rewrite ^/community-challengers/?$ /give/tin-cup-challenger/ permanent;
rewrite ^/business-challengers/?$ /give/tin-cup-challenger/ permanent;
rewrite ^/in-kind-donors-2/?$ /give/tin-cup-challenger/ permanent;
rewrite ^/media-kit/?$ /about/ permanent;
rewrite ^/operation-independence/?$ /about/programs/ permanent;
rewrite ^/styleguide/?$ /style-guide/ permanent;
rewrite ^/newsletter-thank-you/?$ /get-involved/subscribe/ permanent;
rewrite ^/refund_returns/?$ /contact/ permanent;
rewrite ^/terms-conditions/?$ /contact/ permanent;
rewrite ^/consent/?$ /contact/ permanent;
rewrite ^/farmers-market-signup/?$ /get-involved/ permanent;
rewrite ^/booth-hosting-guidelines/?$ /get-involved/ permanent;
rewrite ^/sports-recreation/?$ /nonprofit-directory/ permanent;
rewrite ^/health-human-services/?$ /nonprofit-directory/ permanent;
rewrite ^/education/?$ /nonprofit-directory/ permanent;
rewrite ^/conservation-environment/?$ /nonprofit-directory/ permanent;
rewrite ^/civic-service/?$ /nonprofit-directory/ permanent;
rewrite ^/arts-culture/?$ /nonprofit-directory/ permanent;
rewrite ^/animal-rescue/?$ /nonprofit-directory/ permanent;
rewrite ^/linktree/?$ / permanent;
rewrite ^/sitemap/?$ / permanent;

# Catch-all: news posts that were at root level now live under /news-events/
# Only matches slugs that exist as news posts (not section pages)
location ~ ^/(?!give|about|contact|funds-scholarships|get-involved|nonprofits|news-events|nonprofit-directory|assets|style-guide|sitewide-sections)([a-z0-9-]+)/?$ {
  return 301 /news-events/$1/;
}
```
