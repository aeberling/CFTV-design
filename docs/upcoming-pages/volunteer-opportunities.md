# Volunteer Opportunities — Content Migration

> **Source:** https://cftetonvalley.org/community-impact/nonprofit-support-opportunities/
> **Status:** Content needs manual extraction (WordPress dynamic content couldn't be scraped)
> **Target Page:** `/get-involved/volunteer/`

## Migration Notes

The current CFTV WordPress site hosts volunteer/nonprofit support opportunities. The content is rendered dynamically and couldn't be automatically extracted.

### Action Items

1. **Manual content extraction** — Visit the source URL above and copy all active volunteer opportunities
2. **Screenshot the page** for layout/design reference
3. **Document the data structure** for each listing:
   - Opportunity title
   - Organization name
   - Commitment type (one-time, ongoing, seasonal)
   - Location
   - Description/summary
   - Sign-up link or contact info
   - Date posted / deadline

### Suggested WordPress Implementation

- Plugin: WP Job Manager (volunteer variant) or custom post type
- Custom post type: `volunteer_opportunity`
- Fields: title, organization, commitment_type, location, description, signup_url, deadline
- Gutenberg block for the listing page with search/filter by cause area

### Current Static Page

The static page at `/get-involved/volunteer/` currently shows a "Coming Soon" message directing users to contact Brian Thysell for current opportunities.
