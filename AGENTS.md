# Coding Agents Documentation

This repository contains shared agents, commands, and context files for Claude Code projects. This branch (`template-static-sites`) includes additional documentation workflows for static site development with Eleventy.

---

## Quick Reference

### Code Quality Agents

| Command | Purpose | When to Use |
|---------|---------|-------------|
| `/responsive` | Test all breakpoints and mobile behavior | After CSS/layout changes |
| `/ada` | WCAG 2.1 AA accessibility audit | After interactive element changes |
| `/seo` | Meta tags, schema, performance audit | After content/page changes |
| `/cleanup` | Format and organize code | Before commits |
| `/preflight` | Full PR preparation checklist | Before PRs/deploys |
| `/design-conversion` | Validate design-to-web conversions | When using design conversion system |

### Documentation Agents (Static Sites)

| Command | Purpose | When to Use |
|---------|---------|-------------|
| `/section-catalog` | Add sections to sitewide-sections page | After building new CSS sections |
| `/implementation-docs` | Generate block specifications | After building sections |
| `/page-notes` | Add implementation comments to pages | Before handoff |
| `/handoff-validator` | Validate documentation completeness | Before handoff |

### Local Development Agents

| Command | Purpose |
|---------|---------|
| `/herd-wp` | Create WordPress site with Laravel Herd |

### Commands

| Command | Purpose |
|---------|---------|
| `/init-docs` | **Start here** - Initialize new Eleventy project with full setup |
| `/commit` | Create commits with automatic version bumping |
| `/project-setup` | Configure CLAUDE.md only (use `/init-docs` for new projects) |
| `/deploy-to-forge` | Trigger Laravel Forge deployment |
| `/update` | Pull latest agents/commands from repository |

### ClickUp Workflow Commands

| Command | Purpose |
|---------|---------|
| `/clickup-setup` | **Configure ClickUp integration for your project** |
| `/clickup:advance-ticket` | Auto-detect workflow state and run next step |
| `/clickup:create-plan-file-from-ticket` | Create implementation plan from ticket |
| `/clickup:update-plan-file-from-ticket` | Sync plan with latest ticket updates |
| `/clickup:create-test-file-from-changes` | Generate test/documentation file |
| `/clickup:commit-update-tickets` | Commit and update ticket status |
| `/clickup:post-update-to-ticket` | Post status comment to ticket |
| `/clickup:close-clickup-ticket` | Close ticket and archive files |

---

## Documentation Workflow (Static Sites)

This branch includes a specialized workflow for static-to-production projects transitioning to WordPress, React, or other platforms.

### Workflow Overview

```
/init-docs (project start)
    ↓
Build sections → /section-catalog → /implementation-docs
    ↓
Create pages → /page-notes
    ↓
/handoff-validator (before handoff)
```

### `/init-docs` - Initialize Project

The primary command for starting any new static site project. Creates:
- Complete Eleventy project structure
- CLAUDE.md with project configuration
- docs/IMPLEMENTATION-GUIDE.md
- src/sitewide-sections.njk (component library page)
- package.json, eleventy.config.js, .env, .gitignore

### `/section-catalog` - Section Catalog Agent

Maintains a live component library at `/sitewide-sections/`.

**What it does:**
- Scans CSS for BEM section classes
- Prompts for section metadata
- Adds live HTML examples to sitewide-sections.njk
- Documents modifiers, image specs, optional elements

### `/implementation-docs` - Implementation Docs Agent

Generates block specifications for handoff.

**What it documents:**
- Field specifications (type, required, constraints)
- Image dimensions and aspect ratios
- Responsive behavior at each breakpoint
- Accessibility requirements
- Editorial guidelines

### `/page-notes` - Page Notes Agent

Adds inline HTML comments to pages for implementation clarity.

### `/handoff-validator` - Handoff Validator Agent

Validates documentation completeness before handoff:
- All sections documented in catalog
- All blocks have implementation specs
- Pages have implementation notes
- No missing image specifications

---

## ClickUp Workflow

### Configuration

**Quick Setup:** Run `/clickup-setup` to configure interactively.

**Manual Setup:**
1. Copy template: `cp .claude/templates/coding-agents-config.env.example .claude/coding-agents-config.env`
2. Edit with your team's ClickUp IDs and status names

### Workflow States

```
NEEDS_PLAN → create-plan-file-from-ticket
    ↓
NEEDS_IMPLEMENTATION → (manual coding)
    ↓
NEEDS_TEST_FILE → create-test-file-from-changes
    ↓
NEEDS_COMMIT → commit-update-tickets
    ↓
NEEDS_UPDATE_POST → post-update-to-ticket
    ↓
AWAITING_REVIEW → (wait for feedback)
    ↓
READY_TO_CLOSE → close-clickup-ticket
```

---

## Code Quality Agents (Detailed)

### `/responsive` - Responsive Testing Agent
**File:** `agents/testing/responsive-testing.md`

Tests the website across all breakpoints.

**What it checks:**
- Layout integrity at each breakpoint
- No horizontal scroll or overflow
- Typography scaling
- Navigation behavior (desktop vs mobile)
- Touch targets (minimum 44x44px)
- Image scaling

### `/ada` - ADA Compliance Agent
**File:** `agents/accessibility/ada-compliance.md`

Performs WCAG 2.1 AA accessibility audit.

**What it checks:**
- Semantic HTML (heading hierarchy, landmarks)
- Keyboard navigation
- ARIA attributes
- Color contrast
- Form accessibility
- Image alt text

### `/seo` - SEO Validation Agent
**File:** `agents/seo/seo-validation.md`

Audits for search engine optimization.

**What it checks:**
- Meta tags (title, description, OG, Twitter)
- Heading hierarchy
- Image alt text
- robots.txt and sitemap
- Structured data

### `/cleanup` - Cleanup Agent
**File:** `agents/code-quality/cleanup.md`

Tidies and organizes code before commits.

**What it checks:**
- Code formatting
- Trailing whitespace
- Console.log statements
- Commented-out code
- File organization

### `/preflight` - Preflight Agent
**File:** `agents/workflow/preflight.md`

Comprehensive review before PRs or deployments.

**Process:**
1. Run cleanup agent
2. Run responsive agent
3. Run ADA agent
4. Run SEO agent (if content changed)
5. Build and test

### `/design-conversion` - Design Conversion Agent
**File:** `agents/design/design-conversion-check.md`

Verifies design-to-web conversions.

**What it checks:**
- Font size conversions
- Spacing conversions
- Border radius conversions
- Design reference comments

---

## Smart Review System

When you indicate a task is complete ("done", "looks good", "ready to commit"), Claude automatically suggests relevant agents.

### Trigger Phrases
- "done" / "that works" / "looks good"
- "ready to commit" / "ship it" / "LGTM"

### Agent Suggestions

| Modified | Suggested Agents |
|----------|------------------|
| CSS, layouts, breakpoints | `/responsive` |
| Interactive elements, forms | `/ada` |
| Meta tags, content, pages | `/seo` |
| New CSS sections | `/section-catalog`, `/implementation-docs` |
| Multiple files, refactoring | `/cleanup` |

---

## Repository Structure

```
coding-agents/
├── AGENTS.md                    # This documentation file
├── CLAUDE.md                    # Project template with static site workflow
├── agents/
│   ├── accessibility/
│   │   └── ada-compliance.md
│   ├── code-quality/
│   │   └── cleanup.md
│   ├── design/
│   │   └── design-conversion-check.md
│   ├── documentation/           # Static site specific
│   │   ├── handoff-validator.md
│   │   ├── implementation-docs.md
│   │   ├── page-notes.md
│   │   └── section-catalog.md
│   ├── local/
│   │   └── create-herd-wordpress-site.md
│   ├── seo/
│   │   └── seo-validation.md
│   ├── testing/
│   │   └── responsive-testing.md
│   └── workflow/
│       └── preflight.md
├── commands/
│   ├── clickup/
│   │   ├── advance-ticket.md
│   │   ├── close-clickup-ticket.md
│   │   ├── commit-update-tickets.md
│   │   ├── create-plan-file-from-ticket.md
│   │   ├── create-test-file-from-changes.md
│   │   ├── post-update-to-ticket.md
│   │   ├── setup.md
│   │   └── update-plan-file-from-ticket.md
│   ├── documentation/
│   │   └── init-docs.md
│   ├── git/
│   │   └── commit.md
│   ├── maintenance/
│   │   └── update.md
│   ├── server/
│   │   └── deploy-to-forge.md
│   └── setup/
│       └── project.md
├── context/
│   └── Static/
│       └── architecture.md
├── templates/
│   ├── coding-agents-config.env.example
│   ├── eleventy/
│   ├── implementation-guide-template.md
│   └── sections-page-template.njk
└── setup-project.sh
```

---

## Configuration Files

### ClickUp Configuration

**Location:** `.claude/coding-agents-config.env`
**Template:** `.claude/templates/coding-agents-config.env.example`

**Setup:** Run `/clickup-setup` or copy template manually.

```env
CLICKUP_DEV_ID=12345678
CLICKUP_DEV_NAME=Developer Name
CLICKUP_QA_ID=87654321
CLICKUP_QA_NAME=Reviewer Name
CLICKUP_STATUS_IN_PROGRESS=dev - in progress
CLICKUP_STATUS_IN_REVIEW=dev - qa
```

### Design Conversion (Optional)

```env
DESIGN_CONVERSION_FACTOR=0.70
DESIGN_SOURCE=Adobe Illustrator
```

---

**Last Updated:** 2026-01-28
**Version:** 2.0.0
**Branch:** template-static-sites
