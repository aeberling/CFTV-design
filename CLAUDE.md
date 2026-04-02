# Claude Code Configuration

> **Full Documentation:** See [AGENTS.md](AGENTS.md) for comprehensive documentation of all agents, commands, and workflows available in this repository.

## Project Overview
A professional website built with Eleventy. Community Foundation of Teton Valley — connecting generosity to the causes, nonprofits, and people who make Teton Valley thrive.

## Tech Stack
- **Framework**: Eleventy 3.x
- **Template Engine**: Nunjucks
- **CSS**: Vanilla CSS with custom properties + Bootstrap (vendor)
- **JavaScript**: Vanilla ES6+ with jQuery (vendor)
- **Fonts**: Google Fonts (Barlow Condensed, Karla)
- **UI Libraries**: Slick carousel, WOW.js animations, CounterUp
- **Testing**: None
- **Image Format**: WebP for photos, SVG for icons/logos, PNG for favicon
- **Build Tool**: Eleventy CLI
- **Node Version**: 16+

## Default Behavior
I operate in **dev mode** by default: focused on your immediate task, fast iterations. I'll flag obvious issues but won't run full audits unless asked.

---

## Smart Review System

**IMPORTANT:** When the user indicates a task is complete with phrases like:
- "done" / "that works" / "looks good" / "ready to commit"
- "approved" / "all approved" / "updates are approved"
- "everything looks good" / "ship it" / "LGTM"

**Immediately and automatically** present a review menu based on what was modified:
```
Ready to review? Based on what we worked on:

- [ ] 1. `/responsive` - [reason based on changes]
- [ ] 2. `/ada` - [reason based on changes]

Reply: numbers (1, 2), "all", "skip", or add extras (1, and /seo)
```

### Selection Handling
| Input | Action |
|-------|--------|
| `1` or `1, 3` | Run selected agents in sequence |
| `all` | Run all suggested agents |
| `skip` / `none` | Continue without review |
| `1, and /seo` | Run selected + additional agent |
| `/ada` (direct) | Run just that agent |

### Suggest Agents Based On
| Modified | Suggest |
|----------|---------|
| CSS, layouts, breakpoints, spacing | `/responsive` |
| Interactive elements, forms, modals, navigation | `/ada` |
| Meta tags, content, pages, titles | `/seo` |
| Multiple files, refactoring, major changes | `/cleanup` |

---

## Documentation Workflow (Static-to-WordPress)

This project is a static-first build with Eleventy that will transition to **WordPress with Gutenberg Blocks**. This workflow creates a live component library and implementation documentation for seamless handoff.

### Design Source
Designs are converted from **HTML theme files** (Carelax theme). No design tool conversion factor is used — values are taken directly from the theme HTML/CSS.

### During Design & Build Phase

**As each section is built, immediately document it:**

1. **Add to Sitewide Sections Page** (`src/sitewide-sections.njk`)
   - Live HTML example of the section
   - Documents modifiers, image specs, optional elements
   - Serves as front-end design review page for stakeholders
   - URL: `localhost:8085/sitewide-sections/`

2. **Add to Implementation Guide** (`docs/IMPLEMENTATION-GUIDE.md`)
   - Field specifications (type, required, constraints)
   - Image dimensions and aspect ratios
   - Responsive behavior at each breakpoint
   - Accessibility requirements
   - Editorial guidelines

**Workflow for each new section:**
```
Build section CSS/HTML
    ↓
Run /section-catalog → adds to sitewide-sections.njk
    ↓
Run /implementation-docs → adds spec to IMPLEMENTATION-GUIDE.md
    ↓
Share sitewide-sections URL for design review
```

### Smart Triggers During Development

When you complete building a section, automatically suggest:
```
Section .content-split built. Document it?
- [ ] 1. /section-catalog - Add to component library
- [ ] 2. /implementation-docs - Generate block spec

Reply: 1, 2, all, or skip
```

### Documentation Flow Summary
1. `/section-catalog` - Add sections to sitewide-sections page (during build)
2. `/implementation-docs` - Generate block specs (during build)
3. `/page-notes` - Add implementation comments to pages (before handoff)
4. `/handoff-validator` - Validate completeness (before handoff)

### When to Run Documentation Agents
| Trigger | Agent |
|---------|-------|
| Built new CSS section | `/section-catalog` then `/implementation-docs` |
| Changed section HTML structure | `/implementation-docs` |
| Created new pages | `/page-notes` |
| Design review needed | Share `/sitewide-sections/` URL |
| Before milestone/handoff | `/handoff-validator` |

### Templates Available
- `templates/implementation-guide-template.md` - Block specifications document
- `templates/sections-page-template.njk` - Sitewide sections catalog page

---

## Available Agents

| Command | File | Purpose |
|---------|------|---------|
| `/responsive` | `.claude/agents/testing/responsive-testing.md` | Test all breakpoints and mobile behavior |
| `/ada` | `.claude/agents/accessibility/ada-compliance.md` | WCAG 2.1 AA accessibility audit |
| `/seo` | `.claude/agents/seo/seo-validation.md` | Meta tags, schema, performance |
| `/cleanup` | `.claude/agents/code-quality/cleanup.md` | Format and organize code |
| `/preflight` | `.claude/agents/workflow/preflight.md` | Full PR preparation checklist |
| `/section-catalog` | `.claude/agents/documentation/section-catalog.md` | Maintain sitewide-sections catalog |
| `/implementation-docs` | `.claude/agents/documentation/implementation-docs.md` | Create/update block implementation specs |
| `/page-notes` | `.claude/agents/documentation/page-notes.md` | Add inline HTML implementation comments |
| `/handoff-validator` | `.claude/agents/documentation/handoff-validator.md` | Validate documentation completeness |

---

## Available Commands

| Command | File | Purpose |
|---------|------|---------|
| `/commit` | `.claude/commands/git/commit.md` | Create commits with automatic version bumping for asset changes |
| `/deploy-to-forge` | `.claude/commands/server/deploy-to-forge.md` | Trigger Laravel Forge deployment |
| `/update` | `.claude/commands/maintenance/update.md` | Pull latest agents/commands |

---

## ClickUp Workflow Commands

> **Setup:** Run `/clickup-setup` to configure, or see `.claude/AGENTS.md` for details.

| Command | Purpose |
|---------|---------|
| `/clickup-setup` | **Configure ClickUp integration for your project** |
| `/clickup:advance-ticket` | Auto-detect workflow state and run next step |
| `/clickup:create-plan-file-from-ticket` | Create implementation plan from ticket |
| `/clickup:create-test-file-from-changes` | Generate test/documentation file |
| `/clickup:commit-update-tickets` | Commit and update ticket status |
| `/clickup:post-update-to-ticket` | Post status comment to ticket |
| `/clickup:close-clickup-ticket` | Close ticket and archive files |

---

## Project Structure
```
CFTV-design-main/
├── src/
│   ├── _includes/             # Reusable section components (hero, header, footer, etc.)
│   ├── _layouts/              # Page templates (base.njk, page.njk)
│   ├── assets/
│   │   ├── css/
│   │   │   ├── main.css       # Custom CFTV styles
│   │   │   └── vendor/        # Bootstrap, FontAwesome, Slick, etc.
│   │   ├── js/
│   │   │   ├── main.js        # Custom CFTV scripts
│   │   │   └── vendor/        # jQuery, Bootstrap, Slick, WOW, etc.
│   │   ├── images/            # Site images
│   │   └── fonts/             # Icon fonts (Flaticon)
│   ├── pages/                 # Subpages (style-guide.njk)
│   ├── index.njk              # Homepage
│   ├── nonprofits.njk         # Nonprofits page
│   └── sitewide-sections.njk  # Component library page
├── _site/                     # Generated output (gitignored)
├── carelax-theme/             # Source HTML theme files
├── docs/                      # Documentation
├── eleventy.config.js         # Eleventy configuration
└── package.json               # Dependencies and scripts
```

## Build Commands
```bash
# Development
npm start                      # Dev server on http://localhost:8085

# Production
npm run build                  # Build to _site/
npm run clean                  # Remove _site/
```

## Code Standards
- **Indentation**: 2 spaces
- **Quotes**: Single quotes for JS, double quotes for HTML
- **CSS**: Mobile-first approach, semantic naming, BEM for sections
- **Line Length**: No strict limit, prioritize readability
- **Comments**: Include helpful context, avoid obvious comments
- **File Naming**: kebab-case for files, camelCase for JS variables
- **Image Format**: WebP for photos, SVG for icons/logos

## Critical Project Context

### Design System
Custom design system with CSS custom properties:

**Brand Colors — Primary:**
- Dusk: `#3d3454` (--color-dusk)
- Plum: `#644b62` (--color-plum)
- Poppy: `#dd8b88` (--color-poppy / --color-primary)
- Cirrus: `#bdc8d2` (--color-cirrus)

**Brand Colors — Neutral:**
- Clay: `#a8886c` (--color-clay)
- Graphite: `#1d292e` (--color-graphite / --color-dark)
- Fog: `#dbdcdd` (--color-fog)
- Sand: `#e5cec3` (--color-sand)

**Brand Colors — Accent:**
- Dark Pine: `#164154` (--color-dark-pine / --color-secondary)
- Pine: `#415e68` (--color-pine / --color-body)
- Nimbus: `#415e68` (--color-nimbus)

**Typography:**
- Display/Company Name: DM Serif Display (400)
- Tagline: DM Serif Text Italic (400)
- Headings: Barlow Condensed (300-700)
- Body: Karla (300-700)

**Border Radius:** 0 — square corners on all elements

### Version Control & Cache Busting
- Package.json version is used for cache busting (`?v=1.0.0` on CSS/JS)
- Always bump version when modifying assets (patch/minor/major)
- **Use `/commit` command** - Automatically detects asset changes, prompts for version bump, creates commit

### Responsive Breakpoints
- Mobile: 320-767px
- Tablet: 768-991px
- Desktop: 992px+

### WordPress Handoff
This project will transition to WordPress with Gutenberg Blocks. Each section in `_includes/` maps to a future Gutenberg block. The implementation guide and sitewide-sections page serve as the developer handoff documentation.

---

## Quick Reference

### Common Tasks
- **Add new page**: Create `.njk` file in `src/` or `src/pages/` with frontmatter `layout: base.njk`
- **Add new section**: Create `.njk` partial in `src/_includes/`, include in page
- **Update styles**: Edit `src/assets/css/main.css`
- **Add image**: Place in `src/assets/images/`, use WebP format
- **Test changes**: `npm start` → http://localhost:8085
- **Commit changes**: Use `/commit` command

### Key Files
- `src/_layouts/base.njk` - HTML structure, meta tags, asset loading
- `src/assets/css/main.css` - All custom styles, organized by section
- `src/assets/js/main.js` - All custom JavaScript
- `eleventy.config.js` - Eleventy configuration
- `.claude/context/Static/architecture.md` - Project architecture documentation

---

## Documentation
Additional documentation in project:
- `docs/IMPLEMENTATION-GUIDE.md` - Block specifications for WordPress handoff
- `docs/timeline.md` - Project timeline
- `docs/timeline-client.md` - Client-facing timeline
- `docs/launch-tickets.md` - Launch checklist

---

**Last Updated**: 2026-03-24
**Current Version**: 1.0.0
