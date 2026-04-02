# Nonprofit Job Board — Content Migration

> **Source:** https://cftetonvalley.org/community-impact/nonprofit-job-board/
> **Status:** Content needs manual extraction (WordPress dynamic content couldn't be scraped)
> **Target Page:** `/get-involved/job-board/`

## Migration Notes

The current CFTV WordPress site hosts a dynamic nonprofit job board. The content is rendered via WordPress plugins (likely WP Job Manager) and couldn't be automatically extracted.

### Action Items

1. **Manual content extraction** — Visit the source URL above and copy all active job listings
2. **Screenshot the page** for layout/design reference
3. **Document the data structure** for each listing:
   - Job title
   - Organization name
   - Job type (full-time, part-time, contract)
   - Location
   - Description/summary
   - Application link or contact info
   - Date posted / deadline

### Suggested WordPress Implementation

- Plugin: WP Job Manager or similar
- Custom post type: `nonprofit_job`
- Fields: title, organization, type, location, description, apply_url, deadline
- Gutenberg block for the listing page with search/filter

### Current Static Page

The static page at `/get-involved/job-board/` currently shows a "Coming Soon" message directing users to contact CFTV for current openings.
