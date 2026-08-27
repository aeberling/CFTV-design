# Community Foundation of Teton Valley — Implementation Guide

## Overview

Platform-agnostic implementation specifications for every site section/block. This guide is the developer handoff companion to the **live section catalog** at [`src/sitewide-sections.njk`](../src/sitewide-sections.njk) (`localhost:8085/sitewide-sections/`). The catalog shows what each section *looks like*; this guide tells you *what fields, constraints, image specs, and WordPress block strategy* to build.

**Read this first:** the [Gutenberg Block Strategy](#gutenberg-block-strategy) section below. The goal for this build is to **lean on core/native Gutenberg blocks and existing plugins wherever possible and only build custom blocks where the interaction or data model genuinely requires it.** Each section spec carries a **Maps to** line telling you which approach to take.

### Project Information

| Field | Value |
|-------|-------|
| Project | Community Foundation of Teton Valley |
| Target Platform | WordPress (Gutenberg / Full Site Editing) |
| Static Framework | Eleventy 3.x + Nunjucks |
| Source theme | Carelax (HTML) — values taken directly from theme CSS |
| Documentation Date | 2026-06-03 |

### Naming Conventions

| Context | Convention | Example |
|---------|------------|---------|
| CSS Classes | BEM | `.block__element--modifier` |
| File Names | kebab-case | `hero-split.css` |
| JS Variables | camelCase | `heroSplit` |
| Custom Blocks | namespaced | `cftv/hero-split` |

---

## Global Configuration

These tokens are the single source of truth and mirror [`src/assets/css/main.css`](../src/assets/css/main.css) `:root`. **Match these exactly when registering `theme.json` palette/typography.**

### Colors

All colors are defined as CSS custom properties in `:root`. In WordPress, register these as the `theme.json` color palette (same slugs).

**Primary**

| Name | Variable | Hex |
|------|----------|-----|
| Dusk | `--color-dusk` | `#3d3454` |
| Plum | `--color-plum` | `#644b62` |
| Poppy | `--color-poppy` | `#dd8b88` |
| Cirrus | `--color-cirrus` | `#bdc8d2` |

**Neutral**

| Name | Variable | Hex |
|------|----------|-----|
| Clay | `--color-clay` | `#a8886c` |
| Graphite | `--color-graphite` | `#1d292e` |
| Fog | `--color-fog` | `#dbdcdd` |
| Sand | `--color-sand` | `#e5cec3` |

**Accent**

| Name | Variable | Hex |
|------|----------|-----|
| Dark Pine | `--color-dark-pine` | `#164154` |
| Pine | `--color-pine` | `#415e68` |
| Nimbus | `--color-nimbus` | `#415e68` |
| Poppy Dark | `--color-poppy-dark` | `#c4665e` |

**Functional aliases** (use these in components rather than raw color names)

| Alias | Resolves to | Usage |
|-------|-------------|-------|
| `--color-primary` | `#C54337` | CTAs, links, accent words, hover states |
| `--color-secondary` | `--color-dark-pine` | Secondary buttons / accents |
| `--color-dark` | `--color-graphite` | Dark text / darkest backgrounds |
| `--color-dark-bg` | `--color-dusk` | Default dark section background |
| `--color-body` | `--color-pine` | Body text |
| `--color-white` | `#ffffff` | Page background |

> ✅ **Resolved:** `--color-grey-bg` is now defined in `:root` in `main.css` as an alias of **Sand (`#e5cec3`)** — the neutral section background behind content-split images, cards, and the team grid. In WordPress, expose this as a single "Light / Neutral" section background option mapped to Sand.

**Section background palette** (the selectable backgrounds offered on `content-split`, `cta-banner`, `impact-stats`, etc.): Dusk (default dark), Plum, Poppy, Dark Pine, Pine, Graphite, Sand (neutral light), White. Text color auto-inverts for contrast on dark backgrounds.

### Typography

| Role | Font Family | Variable | Weights |
|------|-------------|----------|---------|
| Display / Company name | DM Serif Display | `--font-display` | 400 |
| Tagline | DM Serif Text (italic) | `--font-tagline` | 400 italic |
| Headings | Barlow Condensed | `--font-heading` | 300–700 |
| Body | Karla | `--font-body` | 300–700 |

Loaded via Google Fonts. In WordPress, register the same four families in `theme.json` `typography.fontFamilies`.

### Layout Tokens

| Token | Variable | Value | Notes |
|-------|----------|-------|-------|
| Button radius | `--radius-btn` | `0` | **Square corners everywhere** |
| Card radius | `--radius-card` | `0` | Square corners |
| Header height | `--header-height` | `100px` | Sticky header offset |

### Buttons

| Variant | Class | Usage |
|---------|-------|-------|
| Primary (filled) | `.theme_btn .theme_btn_bg` | Main CTAs, form submissions |
| Primary on dark | `.theme_btn .theme_btn_bg .theme_btn--light` | CTA buttons on dark/colored banners |
| Alternate | `.theme_btn3` | Secondary action in content-split |
| Outline / ghost | `.theme_btn2` | Subtle buttons |
| Donate | `.d-btn` | Donate actions in nav |

Button markup carries a trailing `<span aria-hidden="true"></span>` used for the arrow/hover affordance — keep it but it is decorative.

**Button field specs:** Text ≤ 25 chars · Format: verb + noun ("Donate Now", "Learn More") · URL: internal path or external URL · Radius: 0. Empty button fields are **hidden** on the front end (conditional display is a sitewide pattern — see below).

### Conditional Display (sitewide pattern)

**Every optional field hides its element when empty.** Eyebrows, descriptions, buttons, images, attributions — if the editor leaves a field blank, the corresponding element is not rendered (no empty wrappers, no placeholder gaps). Build this into every block's `save`/render logic.

### Images

| Type | Format | Source Dimensions | Display | Loading |
|------|--------|-------------------|---------|---------|
| Page hero background | WebP | 1920×600 (min 1920×400) | `cover` | eager |
| Hero-split slide background | WebP | 1280×900 | `cover` (CSS bg) | eager (first), lazy (rest) |
| Content-split / Impact-story image | WebP | 960×640+ | `cover` (~5:4 panel) | lazy |
| Content-split `--contain` graphic | WebP/PNG/SVG | ≥800px wide | `contain`, 85% width | lazy |
| Content-split `--badge` seal | PNG/SVG | 195×195 | fixed 195px, centered | lazy |
| Quick-links card | WebP | 600×450 (4:3) | `cover` | lazy |
| Programs card | WebP | 600×400 (3:2) | `cover` | lazy |
| Team photo | WebP | 400×400 (1:1) | `cover` | lazy |
| Nonprofit logo | PNG/SVG/WebP | 200×200 | `contain` | lazy |
| Post / news card | WebP | 600×400 (3:2) min | `cover` (16:10 crop) | lazy |
| Post featured image | WebP | 1200×800 (3:2) | `width:100%` in 760px column | **eager** (LCP) |
| Post in-body figure | WebP | 1200×800 (3:2) photo · up to 960×960 (1:1) infographic | `width:100%`, capped 620px with `--stats` | lazy |
| Media-kit thumbnail | PNG | 240×240 | `cover` | lazy |
| Logo (header) | WebP/SVG | max-height 60px | — | eager |
| Icon | SVG / FontAwesome | 24×24 | inline | inline |

**All images require** descriptive `alt` text, explicit `width`/`height`, and `loading="lazy"` below the fold.

A news post's `newsImage` feeds **three** surfaces from one field — the news card (16:10 crop), the post's featured image, and `og:image`/`twitter:image` for social sharing — so it must be large enough for the featured slot and must read well cropped to 16:10. Infographics and other square assets belong in a `.post-detail__figure`, not in this field.

### Spacing

Section rhythm uses pixel-increment utility classes from the theme (Bootstrap-style), **not** a token scale: `pt-{n}` / `pb-{n}` / `mt-{n}` / `mb-{n}` / `pl-{n}` / `pr-{n}` where `{n}` is pixels in 5px steps (e.g. `pt-80 pb-80` for a standard section, `mb-50` for a section title, `mb-30` for a card). Standard full section padding is **80px top / 80px bottom** (`pt-80 pb-80`), reducing ~30% on mobile. In WordPress, map these to `theme.json` spacing presets or block spacing controls.

### Responsive Breakpoints

| Name | Range | Target |
|------|-------|--------|
| Mobile | 320–767px | Phones |
| Tablet | 768–991px | Tablets, small laptops |
| Desktop | 992px+ | Desktops, large screens |

**Patterns:** multi-column layouts stack to single column on mobile; section padding reduces ~30%; headings scale down; touch targets ≥ 44×44px; `utility-nav` and `content-split` 50/50 collapse below the relevant breakpoint.

---

## Gutenberg Block Strategy

**Principle: do not rebuild what Gutenberg or a maintained plugin already does well.** Custom blocks are a maintenance cost — register one only when a section needs custom interaction (sliders, flip, animated counters), a custom data model + filtering, or seasonal logic. Everything else should be a **core block, a block pattern (a saved arrangement of core blocks), a theme template part, or a plugin embed.**

### Decision summary

| Strategy | Sections | Why |
|----------|----------|-----|
| **Core block / pattern** (build with native blocks — no custom code) | `content-split`, `impact-story-area`, `page-hero`, `cta-banner`, `challenger-banner`, `tcc-banner`, `quick-links`, `programs-area`, `testimonial-section`, `contact-info`, `community-calendar`, `media-kit`, `fund-spotlight`, `faq-accordion`, `past-reports` | These are layout/content arrangements core blocks (Media & Text, Cover, Columns, Group, Buttons, Quote, File, Gallery, Embed, **Details** for accordions, **List** for archives) already cover. Ship them as **block patterns** with locked styles. |
| **Core Query Loop** | `post-grid` (News), `post-grid--alt` (Events), `team-preview` | Native Query Loop over Posts / a CPT. "Show More" = Query pagination or a load-more plugin. Do **not** hand-build a card grid. |
| **Plugin embed** (install, don't build) | `instagram-feed` (Smash Balloon / Instagram Feed), `footer-newsletter` (Mailchimp / WPForms / Gravity Forms), Events data (optional: The Events Calendar) | Maintained plugins handle the API, caching, and spam protection. |
| **Custom block** (justified) | `cftv/hero-split` (slider + repeater), `cftv/flip-cards` (flip interaction + per-card button repeater), `cftv/impact-stats` (animated counters), `cftv/nonprofit-directory` (CPT + AJAX sector filter), `cftv/seasonal-cta` (season-based content rotation) | Interaction, animation, custom data + filtering, or scheduled logic that core can't express. For `nonprofit-directory`, **FacetWP/SearchWP is an acceptable no-custom-code alternative.** |
| **Theme template part** (Site Editor, not a content block) | `header` (`#top-menu`), `utility-nav`, `cftv-footer`, `subpage-nav`, `login-panel` | Global chrome. Build as FSE template parts using `core/navigation` for menus. `login-panel` is an off-canvas element wired to the header. |
| **Custom (CPT-tied, not standalone)** | `team-modal` | JS bio modal bound to the Team CPT; ships as part of the team Query Loop block, not a separate insertable block. |

### Block style / pattern reuse notes

- **`content-split` and `impact-story-area` are the same primitive** — a reversible image+text 50/50. Both should be **one core `media-text` pattern** with block styles for background color and image fit (`cover` / `contain` / `badge`). Don't make two blocks.
- **`cta-banner`, `challenger-banner`, `seasonal-cta`** share a banner skeleton (heading + optional text + button on a colored background). The first two are a single Cover/Group pattern with a color control; only `seasonal-cta` needs custom logic.
- **Section background color** should be one reusable control (the [Section background palette](#colors)) shared across every banner/split/stats block, not re-implemented per block.
- **All menus** (utility, header, subpage, footer columns) use `core/navigation` pointing at registered menus (Appearance → Menus). The catalog notes each nav exposes a "select which menu" dropdown — that's the `core/navigation` menu selector.

---

## Block Reference

Sections are grouped to match the catalog categories. Each entry: **Maps to** (Gutenberg strategy) · **Used on** · fields · images · responsive · a11y · editorial.

---

## Hero

### Hero Split — `.hero-split`

**Maps to:** 🔧 **Custom block** `cftv/hero-split` · **Used on:** Home (`index.njk` via `hero.njk`)

Split-screen hero: static content/CTAs on the left, a seasonal promotional slider (Slick) on the right.

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| Left heading | Plain text | Yes | ≤ 60 chars |
| Left description | Rich text | No | ≤ 200 chars |
| Left buttons | Repeater (title + URL) | No | Max 3 — empty buttons hidden |
| Slides | Repeater | Yes | Each: background image, heading, text, button title, button URL |

**Images:** slide background 1280×900 WebP, CSS `background-image: cover`. First slide eager, rest lazy.

**Responsive:** two columns on desktop; stacks to single column on mobile (content above slider). **A11y:** slider needs accessible controls (pause, prev/next labels), heading order starts at `<h1>` on the page. **Editorial:** 1–4 slides; keep slide headings ≤ 40 chars.

### Page Hero — `.page-hero`

**Maps to:** ✅ **Core `cover`** (or template part fed by page title + featured image) · **Used on:** all subpages (`page-hero.njk`)

Full-width background image with dark overlay, centered `<h1>` and description. Driven by front matter `heroHeading`, `heroText`, `heroImage`.

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| heroHeading | Plain text | Yes | ≤ 60 chars → `<h1>` |
| heroText | Plain text | No | ≤ 160 chars — hidden if empty |
| heroImage | Image | No | 1920×600 (min 1920×400), `cover` — falls back to default if empty |

**Responsive:** full-bleed at all sizes, reduced height on mobile. **A11y:** overlay must preserve ≥ 4.5:1 text contrast; this is the page's single `<h1>`. **Editorial:** one line headline; text optional supporting sentence.

---

## Layout

### Content Split — `.content-split` (+ `--reverse`, image `--contain` / `--badge`)

**Maps to:** ✅ **Core `media-text`** as a locked pattern with block styles · **Used on:** about, give, get-involved, nonprofits, nonprofit-directory, funds-scholarships, + subpages

The most-used layout primitive. Two-column 50/50: image one side, content panel (eyebrow, heading, body, up to 2 buttons) the other. **Do not build a custom block — this is `core/media-text`.**

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| Eyebrow | Plain text | No | ≤ 30 chars, uppercase — hidden if empty |
| Heading | Plain text | Yes | ≤ 60 chars → `<h2>` |
| Body | Rich text | Yes | ≤ 500 chars |
| Button 1 | Link (text + URL) | No | `.theme_btn .theme_btn_bg` |
| Button 2 | Link (text + URL) | No | `.theme_btn3` |
| Image | Image | Yes | 960×640+ WebP |
| Content background | Select | No | Section background palette — default **Dusk** |
| Reversed | Boolean | No | `--reverse` → image right |
| Image fit | Select | No | default `cover` · `--contain` (charts/graphics, 85% width) · `--badge` (seals, 195px fixed) |

```html
<section class="content-split[ content-split--reverse]">
  <div class="content-split__image[ content-split__image--center|--contain|--badge]">
    <img src="…" alt="…" loading="lazy">
  </div>
  <div class="content-split__content" style="background: var(--color-dusk);">
    <span class="content-split__eyebrow">Eyebrow</span>
    <h2 class="content-split__heading">Heading</h2>
    <p class="content-split__text">Body…</p>
    <div class="content-split__buttons">
      <a href="/url/" class="theme_btn theme_btn_bg">Button 1 <span aria-hidden="true"></span></a>
    </div>
  </div>
</section>
```

**Responsive:** desktop side-by-side 50/50; mobile stacks image-on-top. `--contain`/`--badge` switch to `aspect-ratio:auto`, min-height 200px on mobile. **A11y:** descriptive alt; `<h2>` follows page order; clear link text. **Editorial:** body 2–3 sentences; image should crop well to square; use `--contain` for infographics, `--badge` for accreditation seals.

### Impact Story — `.impact-story-area` (+ `--reverse`)

**Maps to:** ✅ **Core `media-text`** (same primitive as content-split, edge-to-edge / full-width variant) · **Used on:** Home (`impact-story.njk`)

Full-width 50/50 with edge-to-edge image and a text column (eyebrow `.sub-title`, `<h2>`, body, optional CTA). Reversible via `--reverse`.

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| Eyebrow | Plain text | No | hidden if empty |
| Heading | Plain text | Yes | ≤ 60 chars |
| Body | Rich text | Yes | ≤ 500 chars |
| CTA button | Link | No | hidden if empty |
| Image | Image | Yes | 960×640+ `cover`, full-height column |
| Reversed | Boolean | No | `--reverse` |

**Responsive:** stacks on mobile. **A11y:** `<h2>`, descriptive alt. **Editorial:** reserve for one flagship story; pair with a strong full-bleed photo.

### Fund Spotlight — `.fund-spotlight`

**Maps to:** ✅ **Core pattern** — `columns` containing `core/quote` (left) + `core/list`/repeater (right) · **Used on:** Home, give (`fund-spotlight.njk`)

Centered heading above a two-column row: donor testimonial left, a repeater list of fund types with arrow links + CTA on the right.

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| Heading | Plain text | Yes | ≤ 60 chars, centered |
| Testimonial quote | Rich text | No | hidden if empty |
| Attribution | Plain text | No | hidden if empty |
| List heading | Plain text | No | e.g. "Fund Types" |
| Fund types | Repeater (title + URL) | Yes | Add as many items as needed |
| CTA button | Link | No | hidden if empty |

**Responsive:** two columns → stacked on mobile. **A11y:** use `<blockquote>` for the quote; list items are links with clear text. **Editorial:** quote ≤ 240 chars; 4–8 list items reads best.

---

## Cards

### Quick Links — `.quick-links`

**Maps to:** ✅ **Core pattern** — `columns` of linked `cover`/`group` cards · **Used on:** home, get-involved, nonprofits, funds-scholarships

Eyebrow + heading + 3-column grid of image cards (photo, dark teal bottom bar with title, description, arrow). Neutral background, hover lift.

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| Eyebrow | Plain text | No | hidden if empty |
| Heading | Plain text | Yes | ≤ 60 chars |
| Cards | Repeater | Yes | Each: image (600×450, 4:3), title, description, link URL |

**Responsive:** 3-col → stacks on mobile. **A11y:** whole card is one `<a>` with `aria-label`; image alt may be empty (decorative) when title repeats it. **Editorial:** 3 cards ideal; titles ≤ 30 chars; descriptions one line.

### Flip Cards — `.flip-cards-area`

**Maps to:** 🔧 **Custom block** `cftv/flip-cards` · **Used on:** Home (`flip-cards.njk`)

Three interactive flip cards. Front: FontAwesome icon, title, subtitle. Back: title + 1–3 CTA buttons. Flips on hover / tap / focus-within.

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| Cards | Repeater | Yes | 3 cards (responsive stack) |
| → Icon | Icon picker | No | FontAwesome class — hidden if empty |
| → Front title | Plain text | Yes | ≤ 30 chars |
| → Subtitle | Plain text | No | hidden if empty |
| → Back title | Plain text | Yes | ≤ 30 chars |
| → Back buttons | Repeater (title + URL) | Yes | Max 3 per card |

**Responsive:** 3-col → stacks; tap to flip on touch. **A11y:** `tabindex="0"` on each card, `focus-within` reveals back so keyboard users get content; ensure back links are reachable. **Editorial:** keep back to ≤ 3 links; icons should be distinct per card.

### Signature Programs — `.programs-area`

**Maps to:** ✅ **Core `columns`** pattern (or **Query Loop** if Programs becomes a CPT) · **Used on:** Home (`signature-programs.njk`)

Centered heading + 3-column card grid (`.cases`): image, linked title, description.

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| Heading | Plain text | Yes | centered |
| Cards | Repeater | Yes | Each: image (600×400, 3:2), title + link, description |

**Responsive:** 3-col → 2-col tablet → 1-col mobile. **A11y:** linked `<h3>` titles, descriptive alt. **Editorial:** 3 programs; one-sentence descriptions.

### Team Preview — `.team-preview` (+ `--dark`)

**Maps to:** ✅ **Core Query Loop** over a **Team CPT** (or pattern) · **Used on:** about, about/staff-board

Eyebrow + heading + description + 4-column grid of member cards (square photo, name, role) + CTA. On the full Staff & Board page, cards open the [Team Modal](#team-modal--team-modal).

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| Eyebrow / Heading / Description | Text | Heading req. | each hidden if empty |
| CTA button | Link | No | hidden if empty |
| Member cards | Query / repeater | Yes | Each: photo (400×400, 1:1), name, role |
| `--dark` | Block style | No | dark background variant |

**Responsive:** 4-col → 2-col tablet/mobile, reduced padding. **A11y:** square photos with name in alt or adjacent; cards that open the modal are `<button>`s with accessible names. **Editorial:** roles ≤ 40 chars; consistent headshot crop.

---

## Content

### Impact Stats — `.impact-stats-area`

**Maps to:** 🔧 **Custom block** `cftv/impact-stats` (animated counters) · **Used on:** Home (`impact-stats.njk`)

Four-column animated counter row. Each stat: icon, number, suffix modifier, label. Background + icon color selectable.

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| Stats | Repeater | Yes | 4 columns |
| → Icon | Icon picker | No | FontAwesome class — hidden if empty |
| → Number | Number | Yes | integer; animates via CounterUp on scroll |
| → Modifier | Plain text | No | suffix e.g. `+`, `M+`, `K+` |
| → Label | Plain text | Yes | ≤ 40 chars |
| Background | Select | No | Section background palette — default **Dusk** |
| Icon color | Select | No | palette — default **Cirrus** |

**Responsive:** 4-col → 2-col → 1-col. **A11y:** the final number must be present in the DOM for screen readers (animation is progressive enhancement); icons decorative (`aria-hidden`). **Editorial:** round numbers; keep labels to 2–3 words.

### FAQ Accordion — `.faq-accordion`

**Maps to:** ✅ **Group of `core/details`** blocks (native accordion — no custom block) · **Used on:** about/programs/tin-cup-challenge, about/programs/competitive-grants, about/programs/youth-philanthropy

Heading above a list of collapsible question/answer items. Currently built on Bootstrap collapse as a single-open group (`data-bs-parent`); in WordPress each item becomes a `core/details` block (or a `core/details` group with a "one open at a time" interactivity setting).

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| Heading | Plain text | Yes | → `<h2>` |
| Items | Repeater | Yes | each: Question (req) + Answer (rich text, req) |
| → Question | Plain text | Yes | becomes the `<summary>` / toggle button |
| → Answer | Rich text | Yes | supports multiple paragraphs |

**Responsive:** full-width at all sizes. **A11y:** toggle exposes `aria-expanded` / `aria-controls`; chevron icon is `aria-hidden`; keyboard operable (native `<details>` is keyboard-accessible by default). **Editorial:** keep questions short and scannable; one topic per item.

### Past Reports — `.past-reports`

**Maps to:** ✅ **Core `core/list`** (linked items) or repeated **`core/file`** — no custom block · **Used on:** about/impact-reports (under the current report)

Compact archive list of downloadable past report PDFs. Heading (`<h3>`, follows the report `<h2>` above) over a list of links, each opening a PDF with a download arrow icon.

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| Heading | Plain text | Yes | → `<h3>` |
| List | Repeater | Yes | each: Label (req) + PDF file |
| → Label | Plain text | Yes | e.g. "2024 Impact Report" |
| → File | File (PDF) | Yes | opens in new tab |

**Responsive:** full-width single column at all sizes. **A11y:** download arrow SVG is decorative (`aria-hidden`); link text carries the report name. **Editorial:** human-readable labels; newest first.

---

## Media

### Instagram Feed — `.instagram-feed`

**Maps to:** 🔌 **Plugin embed** (Smash Balloon / Instagram Feed) — do **not** build · **Used on:** catalog reference (drop onto pages as needed)

Full-width, edge-to-edge 6-image square grid with hover zoom and a centered label; all images link to the IG profile.

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| Label | Plain text | No | centered above grid |
| Account | Plugin setting | Yes | connected IG account |
| Count | Plugin setting | Yes | 6 (square thumbs) |

**Responsive:** 6-col → fewer columns on small screens (plugin handles). **A11y:** plugin must output alt text + accessible links. **Editorial:** configure once via plugin; no per-page content entry.

---

## CTA

### CTA Banner — `.cta-banner`

**Maps to:** ✅ **Core `cover`/`group` + `buttons`** pattern with color control · **Used on:** nearly every page

Full-width banner: heading (supports an accent-color `<span>`), optional text, outlined button. Heading + button inline on desktop, stacked mobile.

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| Heading | Rich text | Yes | wrap accent word(s) in `<span>` for primary color |
| Text | Plain text | No | hidden if empty |
| Button | Link | No | `.theme_btn .theme_btn_bg .theme_btn--light` — hidden if empty |
| Background | Select | No | palette — default **Dark Pine** |

```html
<section class="cta-banner">
  <div class="container">
    <div class="cta-banner__content">
      <h2 class="cta-banner__heading">Heading <span>accent</span> text.</h2>
      <p class="cta-banner__text">Optional supporting line.</p>
    </div>
    <div class="cta-banner__action">
      <a href="/url/" class="theme_btn theme_btn_bg theme_btn--light">Button <span aria-hidden="true"></span></a>
    </div>
  </div>
</section>
```

**Responsive:** inline → stacked. **A11y:** `<h2>`, accent span is presentational. **Editorial:** one short headline + one CTA; wrap 1–3 words in the accent span.

### Seasonal CTA — `.seasonal-cta`

**Maps to:** 🔧 **Custom block** `cftv/seasonal-cta` (content rotates by season) · **Used on:** Home (`seasonal-cta.njk`)

Centered heading/description/button whose content rotates: spring–summer (Tin Cup Challenge), fall (Grant Season), winter (Year-End Giving).

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| Season variants | Repeater (3) | Yes | Each: heading, text, button (title + URL) |
| Background | Select | No | palette — default **Plum** |
| Active season | Auto / override | No | JS by date; allow manual override |

**Responsive:** centered, full-width. **A11y:** ensure the rendered (active) variant is real DOM content, not visually-hidden swaps. **Editorial:** maintain all three variants; provide a manual override for campaigns.

### Challenger Banner — `.challenger-banner`

**Maps to:** ✅ **Core `group` + `buttons`** pattern · **Used on:** Home (`challenger-banner.njk`)

Compact single-row CTA: heading + button inline, centered.

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| Heading | Plain text | Yes | one line |
| Button | Link | No | hidden if empty |
| Background | Select | No | palette — default **Dark Pine** |

**Responsive:** inline → stacked. **A11y:** clear link text. **Editorial:** secondary CTAs only ("Become a Challenger").

### Tin Cup Challenge Banner — `.tcc-banner`

**Maps to:** ✅ **Core `group` + `buttons` + image** pattern · **Used on:** Home (`tcc-banner.njk`, directly under the hero)

Gold promo banner adapted from the Tin Cup Challenge site. Left: heading + supporting paragraph (left-aligned). Right: a single CTA button grouped with the Tinny mascot image. No custom block — a two-column Group pattern with a fixed gold background.

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| Heading | Plain text | Yes | one line → `<h2>` |
| Body | Rich text | No | 1–2 sentences — hidden if empty |
| Button | Link (text + URL) | No | hidden if empty (typically external → tincupchallenge.org) |
| Mascot image | Image | No | transparent PNG (`tinny-mascot.png`, ~900×740), `contain` — hidden if empty |

**Responsive:** content left / CTA + mascot right on desktop; stacks on mobile. **A11y:** descriptive `alt` on the mascot; external link uses `rel="noopener"`. **Editorial:** keep heading short; pair with a single primary CTA only.

---

## Forms

### Footer Newsletter — `.footer-newsletter`

**Maps to:** 🔌 **Plugin** (Mailchimp for WP / WPForms / Gravity Forms) embed · **Used on:** footer (sitewide), subscribe page

Centered label + email input + submit. Currently embedded in the footer; can be a standalone block.

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| Label | Plain text | No | "Subscribe to Our Newsletter" |
| Email | Email input | Yes | required, validated |
| Submit | Button | Yes | "Subscribe" |

**Responsive:** full-width centered. **A11y:** `<label for>` tied to the input (the static markup uses `for="…-email"`); show validation + success messaging. **Editorial:** connect to the org's mailing list provider; add spam protection (honeypot/reCAPTCHA).

---

## Page-Specific Sections

These were built on real pages and are **now documented here for the first time** (they are not yet in the catalog — see handoff note).

### Contact Info — `.contact-info`

**Maps to:** ✅ **Core pattern** — `columns`: a `group` of icon list items + `core/embed`/HTML map · **Used on:** contact (`contact.njk`)

Two-column: contact details (heading, intro, icon list — address, phone, email, hours) left; Google Maps iframe right.

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| Heading | Plain text | Yes | "Get in Touch" |
| Intro | Plain text | No | hidden if empty |
| Contact items | Repeater | Yes | Each: icon, label, content (rich, allows `tel:`/`mailto:` links) |
| Map embed | Embed/iframe URL | Yes | Google Maps, `loading="lazy"`, titled iframe |

**Responsive:** 2-col → stacked (details above map). **A11y:** iframe needs a `title`; phone/email are real `tel:`/`mailto:` links; label tags are matching `<h3>` (the earlier `<h3>…</h5>` mismatch is fixed). **Editorial:** keep to 4 items (visit/call/email/hours).

### Post Grid — `.post-grid` (News) & `.post-grid--alt` (Events)

**Maps to:** ✅ **Core Query Loop** — News = Posts; Events = Events CPT or The Events Calendar · **Used on:** news-events (`news-events.njk`)

Header (heading + text) + responsive card grid + "Show More" (reveals 6 at a time; WP AJAX/pagination in production). The `--alt` Events variant on this page is a heading + link to the events archive.

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| Heading / intro | Text | Heading req. | section header |
| Query | Query Loop | Yes | Posts (category ≠ events), orderby date DESC, 6/page |
| Card fields | per post | — | featured image (600×400), category tag, title, excerpt, date |
| Show More | Button | No | `aria-expanded` / `aria-controls`; load-more via AJAX |

**Responsive:** 3-col → 2-col → 1-col. **A11y:** card is a single `<a>` with `aria-label`; a visually-hidden `aria-live` region announces newly loaded cards (already in markup as `.post-grid__status`). **Editorial:** excerpts ~120 chars; ensure every post has a featured image + category.

### Post Detail — `.post-detail`

**Maps to:** ✅ **Core single-post template** (`single.html`) — no custom block · **Used on:** every news post (`news-events/*.njk`)

The single news post template: category tag + date, title, featured image, body copy, an optional in-body figure, and a back link. Front matter (`newsImage`, `newsTag`, `newsExcerpt`, `date`) drives both this page and the post's card in `.post-grid`, so one image field feeds the card, the featured image, and the social preview.

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| Title | Plain text | Yes | → `<h1 class="post-detail__title">` |
| Category tag | Taxonomy | Yes | → `.post-card__tag` (shared style with the card) |
| Date | Date | Yes | display format "August 25, 2026" |
| Featured image | Image (WebP) | Yes | 1200×800 (3:2); **eager** + explicit width/height — it is the LCP element |
| `newsImage` | Image (WebP) | Yes | same asset; also feeds the news card (16:10 crop) and `og:image` |
| `newsImageCropTop` | Boolean | No | top-anchors the **card** crop; only for square/portrait assets — omit for 3:2 photos |
| Body | Rich text | Yes | 18px / 29px line-height, 760px column |
| Figure | `.post-detail__figure` | No | see below |
| Back link | Button | Yes | returns to `/news-events/` |

**Responsive:** single 760px column, full-width below 992px. **A11y:** featured-image `alt` describes the photo (not the headline); the page currently renders **two `<h1>`s** — the page-hero "News & Events" plus the post title — and post body copy jumps `<h1>` → `<h3>`; fix both in the WP template (page-hero → `<p>`, About heading → `<h2>`). **Editorial:** excerpt ~120 chars; every post needs a real featured photo, since it is now the social share image.

#### Post Figure — `.post-detail__figure` (+ `--stats`)

**Maps to:** ✅ **Core `core/image`** with caption; register `--stats` as a **block style**

A standalone image inside the body copy — results infographics, charts, supporting photos — as opposed to the featured image at the top. Centered in the content column with an optional caption. `--stats` caps it at 620px so square infographics do not overpower the 760px column.

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| Image | Image | Yes | WebP; photos 1200×800 (3:2), infographics up to 960×960 (1:1) |
| Alt text | Plain text | Yes | must restate **every** figure in an infographic (see A11y) |
| Caption | Plain text | No | hidden if empty; omit when the graphic already labels itself |
| Style | Block style | No | `--stats` → max-width 620px |

**Responsive:** 620px capped (desktop/tablet) → fills the column below 768px; scales to 296px at 320px wide. **A11y:** an infographic's `alt` is the **only** channel for numbers that appear nowhere in the body copy — restate all of them, or move the figure into body text. **Editorial:** place results graphics at the end of the post so the story leads with a photo of people.

### Community Calendar — `.community-calendar`

**Maps to:** ✅ **Core `embed` / HTML** (iframe) · **Used on:** news-events

Eyebrow ("Hosted by…") + heading + text + full-width responsive iframe (Welcome Teton Valley / Downtown Driggs feed).

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| Hosted-by | Plain text | No | hidden if empty |
| Heading / text | Text | Heading req. | |
| Embed URL | iframe URL | Yes | external calendar, `loading="lazy"`, titled |

**Responsive:** responsive iframe container. **A11y:** `title` on iframe; provide a text link to the source calendar as a fallback. **Editorial:** URL-only; content is owned by the external host.

### Nonprofit Directory — `.np-directory`

**Maps to:** 🔧 **Custom dynamic block** `cftv/nonprofit-directory` (CPT + AJAX filter) — *or* **FacetWP/SearchWP** (no custom code) · **Used on:** nonprofit-directory

Sector filter bar + responsive card grid. **This page already carries a full CPT/taxonomy/ACF spec in its source comments — reproduce it here:**

**Custom Post Type:** `nonprofits` (singular Nonprofit). **Taxonomy:** `sector` (hierarchical). **Archive template:** this layout (filter + grid). **Single template:** not needed for launch (cards link to external sites). Query: `post_type=nonprofits, orderby=title ASC`. Filter: `sector` terms, AJAX (or query param) by term slug; "All" resets.

**ACF fields per nonprofit:**

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Logo | Image | No | 200×200, `contain`; placeholder heart icon if empty |
| Sector | Taxonomy term | Yes | drives filter + badge |
| Website URL | URL | No | makes the card a link |
| Email | Email | No | → `mailto:` icon |
| Phone | Text | No | → `tel:` icon |
| Address | Text | No | → Google Maps search icon |
| Tax ID / EIN | Text | No | optional |
| Facebook / Instagram / LinkedIn / Twitter / YouTube / GuideStar | URL | No | each → its icon, hidden if empty |

**Responsive:** 3-col → 2-col → 1-col grid; wrapping filter bar. **A11y:** filter bar is a labelled `role="group"` of buttons; active filter marked; a count label (`X of Y organizations shown`) provides status; each social icon link has an `aria-label`. **Editorial:** consistent square logos; assign exactly one sector per org. **Plugin alternative:** FacetWP or SearchWP can deliver the filtered grid without a custom block.

### Media Kit — `.media-kit`

**Maps to:** ✅ **Core pattern** — repeated `group` sections of `heading` + `buttons` + `core/file` (downloads) + `core/gallery` (thumbnails) · **Used on:** media-kit

A resource hub of stacked centered sections (Logos, Nonprofits, Guidelines, Tin Cup Challenge, Photographs, Marketing Contact). Each is heading + text + optional download buttons / numbered instructions / downloadable image thumbnails.

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| Section heading | Plain text | Yes | per block, also the anchor id |
| Body | Rich text | No | may contain `mailto:`/file links |
| Buttons | Repeater | No | `--single` (one primary) or `--grid` (file links with PDF icon) |
| Instructions | Repeater | No | numbered steps |
| Thumbnails | Gallery | No | 240×240 PNG, each a `download` link with label |

**Responsive:** centered single column; thumbnail grid wraps. **A11y:** download links carry `aria-label`; PDF icons `aria-hidden`; thumbnail alt describes the asset. **Editorial:** keep file names human-readable; mark external/download targets.

---

## Global / Navigation (Theme Template Parts)

These are **not insertable content blocks** — build as Full Site Editing template parts. Each menu uses `core/navigation` pointing at a registered menu (Appearance → Menus), which is the "select which menu" dropdown the catalog references.

### Subpage Nav — `.subpage-nav`

**Maps to:** ✅ **Core `navigation`** (anchor menu) · **Used on:** all subpages with in-page sections

Horizontal bar of anchor links to in-page sections; centered uppercase labels, hover underline, smooth scroll. Menu source = a registered menu dropdown. Fed on static side by `subpageNavItems` front matter.

### Utility Nav — `.utility-nav`

**Maps to:** 🧩 **Theme template part** + `core/navigation` · **Used on:** sitewide (desktop only)

Top utility bar: secondary links + highlighted Donate button (`.d-btn`). Hidden below the lg breakpoint. Also hosts the trigger for the [Login Panel](#login-panel--login-panel). Menu source = registered menu.

### Header — `#top-menu`

**Maps to:** 🧩 **Theme header template part** + `core/navigation` · **Used on:** sitewide

Logo (`cftv-logo.webp`, max-height 60px), primary nav, "Donate Now" CTA. Sticky (`--header-height: 100px`). Mobile hamburger → `.slide-bar` off-canvas. Primary nav = registered menu dropdown.

### Footer — `.cftv-footer`

**Maps to:** 🧩 **Theme footer template part** (`core/navigation` columns + newsletter) · **Used on:** sitewide

Four columns: org info + social, two link columns (each from a registered menu), Contact. Includes the centered [Footer Newsletter](#footer-newsletter--footer-newsletter) and a copyright/EIN line. Each link column = registered menu dropdown.

### Login Panel — `.login-panel`

**Maps to:** 🧩 **Theme global element** (off-canvas panel wired to utility nav) · **Used on:** sitewide (`login-panel.njk` via `base.njk`)

Slide-out `<aside role="dialog" aria-modal="true">` with external portal links (Fund Holder Login, Grant Portal, Board of Directors, Tin Cup Gift Report, Scholarships), email/phone buttons, physical + mailing addresses, and social icons. Triggered from the utility nav.

| Field | Type | Required | Constraints |
|-------|------|----------|-------------|
| Portal links | Repeater (title + URL) | Yes | external, `target="_blank" rel="noopener"` |
| Email / Phone | Link | Yes | `mailto:` / `tel:` |
| Physical + mailing address | Rich text | Yes | |
| Social links | Repeater | No | FB, IG, LinkedIn, YouTube |

**A11y:** `role="dialog"` + `aria-modal`, focus trap while open, close button with `aria-label`, Esc to close, return focus to trigger. **Editorial:** all links go to external portals; keep in sync with the live WordPress login panel.

### Team Modal — `.team-modal`

**Maps to:** 🔧 **Custom (CPT-tied)** — JS bio modal bound to the Team CPT; ships with the team Query Loop, not a standalone block · **Used on:** about/staff-board

Hidden `role="dialog"` populated on click from a team card: photo, name, role, optional contact, full bio.

| Field | Source | Notes |
|-------|--------|-------|
| Photo / Name / Role / Bio | Team CPT fields | injected into modal on open |
| Contact | optional | hidden if empty |

**A11y:** `aria-modal`, `aria-labelledby` the name, focus trap, Esc + overlay click to close, restore focus to the originating card. **Editorial:** bios are managed on the Team CPT, not in the modal.

---

## Accessibility Requirements (WCAG 2.1 AA)

| Requirement | Implementation |
|-------------|----------------|
| Color contrast | 4.5:1 text, 3:1 large text — verify every section-background/text pairing |
| Focus indicators | Visible focus ring on all interactive elements |
| Alt text | Descriptive alt on all content images; decorative images `alt=""` |
| Heading hierarchy | One `<h1>` per page (page-hero); sections use `<h2>`, cards `<h3>` |
| Keyboard nav | All interactive elements reachable; flip cards via focus-within; modals trap + restore focus |
| Link purpose | Clear from link text / `aria-label` |
| Form labels | Every input has an associated `<label>` |
| Live regions | Load-more / filter results announce via `aria-live` |
| Dialogs | `role="dialog"` + `aria-modal`, Esc to close, focus management (login-panel, team-modal) |

---

## WordPress Implementation Notes

### Build order (recommended)

1. **`theme.json`** — register the [color palette](#colors), [typography](#typography), spacing, and `--radius: 0` so square corners and brand colors are global defaults.
2. **Template parts** — header, utility-nav, footer, login-panel (the global chrome).
3. **Patterns** — register the core-block patterns (content-split/media-text, cta-banner, quick-links, programs, testimonial, contact-info, media-kit, fund-spotlight) with locked styles.
4. **CPTs + taxonomies** — `nonprofits` + `sector`; `team`; News uses core Posts; Events as CPT or The Events Calendar.
5. **Custom blocks** — only the five justified ones: `cftv/hero-split`, `cftv/flip-cards`, `cftv/impact-stats`, `cftv/nonprofit-directory`, `cftv/seasonal-cta`.
6. **Plugins** — Instagram feed, newsletter form, optional events/faceted-search.

### Custom block registration (only for the five)

```php
// theme/blocks/{block-name}/block.json
{
  "name": "cftv/{block-name}",
  "title": "Block Name",
  "category": "cftv-blocks",
  "supports": { "align": ["wide", "full"], "color": true }
}
```

### Static → WordPress mapping

| Static | WordPress |
|--------|-----------|
| BEM class | Block `className` / pattern |
| Nunjucks variable | Block attribute / ACF field |
| `{% include %}` partial | Template part, pattern, or inner blocks |
| `collections.*` loop | Query Loop / CPT query |
| `subpageNavItems` front matter | Registered menu via `core/navigation` |
| Conditional `{% if %}` field | Block render hides empty elements |

---

## Handoff Checklist

- [x] All sections have implementation specs in this document (33 sections; `post-detail` + `post-detail__figure` added)
- [x] Global tokens (colors, fonts, spacing, buttons) match `main.css`
- [x] Gutenberg block strategy defined (core vs. plugin vs. custom)
- [x] All sections cataloged in `sitewide-sections.njk` (all page-specific sections now have live examples; `tcc-banner`, `faq-accordion`, `past-reports`, and the `team-preview--dark` modifier added)
- [x] `--color-grey-bg` defined in `:root` (alias of `--color-sand`)
- [x] `contact-info` label tags fixed (`<h3>…</h3>`)
- [x] All pages have implementation comments (`past-reports` comment added; newest pages verified)
- [ ] No placeholder content in production pages (catalog uses intentional Lorem ipsum)
- [ ] All images have dimensions specified
- [ ] Responsive + accessibility verified per section

---

**Document Version**: 2.1
**Last Updated**: 2026-08-27
**Aligns with**: `src/sitewide-sections.njk` + `src/assets/css/main.css`
