# Community Foundation of Teton Valley Implementation Guide

## Overview

Platform-agnostic implementation specifications for all site sections/blocks. This guide enables smooth migration to WordPress, React, or other platforms.

### Project Information

| Field | Value |
|-------|-------|
| Project | Community Foundation of Teton Valley |
| Target Platform(s) | WordPress |
| Static Framework | Eleventy 3.0 |
| Documentation Date | 2026-03-16 |

### Target Platforms

- [ ] WordPress

### Naming Conventions

| Context | Convention | Example |
|---------|------------|---------|
| CSS Classes | BEM methodology | `.block__element--modifier` |
| File Names | kebab-case | `hero-section.css` |
| JS Variables | camelCase | `heroSection` |
| Components | PascalCase | `HeroSection` |

---

## Global Configuration

### Buttons

| Variant | Class | Usage |
|---------|-------|-------|
| Primary | `.theme_btn` | Main CTAs, form submissions |
| Secondary | `.theme_btn_bg_02` | Alternative actions |
| Outline | `.theme_btn2` | Subtle/ghost buttons |
| Donate | `.d-btn` | Donation actions |

**Button Field Specs:**
- Text: Max 25 characters
- Format: Verb + noun ("Donate Now", "Learn More")
- URL: Internal path or external URL
- Border radius: 0 (square corners)

### Images

| Type | Format | Dimensions | Quality | Loading |
|------|--------|------------|---------|---------|
| Hero | WebP | 1920x800 | 80% | eager |
| Section Background | WebP | 1920x600 | 80% | lazy |
| Content Image | WebP | 600x450 | 80% | lazy |
| Card Image | WebP | 600x375 | 80% | lazy |
| Logo | SVG/PNG | varies | - | eager |
| Icon | SVG | 24x24 | - | inline |

**Image Requirements:**
- All images must have `alt` text
- All images must have `width` and `height` attributes
- Use `loading="lazy"` for below-fold images

### Text Fields

| Field Type | Max Length | HTML Element | Notes |
|------------|------------|--------------|-------|
| Heading | 60 chars | `<h2>` | Primary section heading |
| Subheading | 120 chars | `<p>` | Supporting text below heading |
| Body | 500 chars | `<p>` | Main content, may be rich text |
| Button Text | 25 chars | `<a>` | Action-oriented |
| Caption | 100 chars | `<figcaption>` | Image/media captions |

### Colors

| Name | Variable | Hex | Usage |
|------|----------|-----|-------|
| Primary (Red) | `--color-primary` | #c64436 | CTAs, links, accents |
| Secondary (Teal) | `--color-secondary` | #164154 | Secondary elements |
| Dark Purple | `--color-dark-purple` | #3d3453 | Dark backgrounds, hover states |
| Light Purple | `--color-light-purple` | #6d4b63 | Accent elements |
| Pink | `--color-pink` | #dc8b88 | Soft accents |
| Dark Teal | `--color-dark-teal` | #13242b | Darkest backgrounds |
| Medium Teal | `--color-med-teal` | #164154 | Mid-tone backgrounds |
| Teal (Body) | `--color-body` | #425e69 | Body text |
| Gray Blue | `--color-gray-blue` | #8ea7bb | Muted elements |
| Light Blue | `--color-light-blue` | #bec8d2 | Borders, subtle backgrounds |
| Grey Background | `--color-grey-bg` | #f4f2f1 | Section backgrounds |
| White | `--color-white` | #ffffff | Page background |

### Typography

| Role | Font Family | Variable |
|------|-------------|----------|
| Headings | Barlow Condensed | `--font-heading` |
| Body | Karla | `--font-body` |

### Spacing Scale

| Size | Variable | Value | Usage |
|------|----------|-------|-------|
| XS | `--space-xs` | 0.5rem | Tight spacing |
| SM | `--space-sm` | 1rem | Small gaps |
| MD | `--space-md` | 2rem | Default spacing |
| LG | `--space-lg` | 4rem | Section padding |
| XL | `--space-xl` | 6rem | Large sections |

---

## Block Reference

<!--
  Blocks are added automatically by the /implementation-docs agent.
  Each block follows this structure:

  ## Block Name

  ### Overview
  Brief description of the block's purpose.

  ### Fields
  | Field | Type | Required | Options/Constraints |
  |-------|------|----------|---------------------|

  ### Image Specifications
  | Image | Dimensions | Aspect Ratio | Format |
  |-------|------------|--------------|--------|

  ### HTML Structure
  ```html
  <section class="block-name">
    ...
  </section>
  ```

  ### Responsive Behavior
  | Breakpoint | Behavior |
  |------------|----------|

  ### Accessibility
  | Requirement | Implementation |
  |-------------|----------------|

  ### Editorial Guidelines
  | Field | Guidelines |
  |-------|------------|
-->

### Content Split

#### Overview
Two-column 50/50 layout where each column appears square. Image on one side, content (eyebrow, heading, body text, buttons) on the other. Reversible via modifier class.

#### Fields

| Field | Type | Required | Options/Constraints |
|-------|------|----------|---------------------|
| Eyebrow | Plain text | No | Max 30 characters, uppercase display |
| Heading | Plain text | Yes | Max 60 characters |
| Body Text | Rich text | Yes | Max 500 characters |
| Button 1 | Link (text + URL) | No | Max 25 characters, uses `.theme_btn` |
| Button 2 | Link (text + URL) | No | Max 25 characters, uses `.theme_btn3` |
| Image | Image | Yes | Square aspect ratio, object-fit: cover |
| Background Color | Select | No | Darker Purple (#3d3453), Lighter Purple (#6d4b63), Pinky (#dc8b88), Dark Teal (#13242b), Medium Teal (#164154), Teal (#425e69). Default: Darker Purple. Text colors auto-adjust for contrast. |
| Reversed | Boolean | No | Flips image to right side (adds `--reverse` modifier) |

#### Image Specifications

| Image | Dimensions | Aspect Ratio | Format |
|-------|------------|--------------|--------|
| Content Split Image | 960x640 | 3:2 | WebP |

#### HTML Structure

```html
<!-- Default: image left, content right -->
<section class="content-split">
  <div class="content-split__image">
    <img src="image.webp" alt="Description" loading="lazy">
  </div>
  <div class="content-split__content">
    <span class="content-split__eyebrow">Eyebrow Text</span>
    <h2 class="content-split__heading">Heading Text</h2>
    <p class="content-split__text">Body text...</p>
    <div class="content-split__buttons">
      <a href="/url/" class="theme_btn theme_btn_bg">Button 1 <span></span></a>
      <a href="/url/" class="theme_btn theme_btn3">Button 2 <span></span></a>
    </div>
  </div>
</section>

<!-- Reversed: content left, image right -->
<section class="content-split content-split--reverse">
  <!-- same inner structure -->
</section>
```

#### Responsive Behavior

| Breakpoint | Behavior |
|------------|----------|
| Desktop (1025px+) | Side-by-side 50/50, landscape proportions (3:2) |
| Mobile (767px-) | Stacks vertically — image on top, content below |

#### Accessibility

| Requirement | Implementation |
|-------------|----------------|
| Image alt text | Descriptive alt text required |
| Heading hierarchy | Uses `<h2>` — must follow page heading order |
| Button text | Action-oriented, clear link purpose |

#### Editorial Guidelines

| Field | Guidelines |
|-------|------------|
| Eyebrow | Short category/label (e.g., "Subpage", "Programs", "Impact") |
| Heading | Descriptive section title |
| Body | 2-3 sentences describing the section topic |
| Buttons | Up to 2 — primary action first, secondary optional |
| Image | High-quality photo, works well cropped to square |

---

## Responsive Breakpoints

| Name | Range | Target |
|------|-------|--------|
| Mobile | 320px - 767px | Phones |
| Tablet | 768px - 1024px | Tablets, small laptops |
| Desktop | 1025px+ | Desktops, large screens |

### Responsive Patterns

- **Stack on mobile**: Multi-column layouts become single column
- **Reduce spacing**: Section padding reduces by ~30% on mobile
- **Scale typography**: Headings scale down on smaller screens
- **Touch targets**: Minimum 44x44px on mobile

---

## Accessibility Requirements

### WCAG 2.1 AA Compliance

| Requirement | Implementation |
|-------------|----------------|
| Color Contrast | 4.5:1 for text, 3:1 for large text |
| Focus Indicators | Visible focus ring on all interactive elements |
| Alt Text | Descriptive alt text for all images |
| Heading Hierarchy | Logical heading order (H1 → H2 → H3) |
| Keyboard Navigation | All interactive elements keyboard accessible |
| Link Purpose | Clear from link text alone |
| Form Labels | All inputs have associated labels |

---

## WordPress Implementation Notes

### Block Registration

Each section maps to a Gutenberg block:

```php
// theme/blocks/{block-name}/block.json
{
  "name": "theme/{block-name}",
  "title": "Block Name",
  "category": "theme-blocks",
  "supports": {
    "align": ["wide", "full"],
    "color": true
  }
}
```

### Common Patterns

| Static | WordPress |
|--------|-----------|
| BEM class | Block className |
| Nunjucks variable | Block attribute |
| Includes | Inner blocks or partials |
| Collections | Dynamic blocks with queries |

---

## Handoff Checklist

Before handoff, verify:

- [ ] All sections cataloged in sitewide-sections.njk
- [ ] All sections have implementation specs in this document
- [ ] All pages have implementation comments
- [ ] No placeholder content (TODO, Lorem ipsum)
- [ ] All images have dimensions specified
- [ ] Responsive behavior documented
- [ ] Accessibility requirements noted

---

**Document Version**: 1.0
**Last Updated**: 2026-03-16
**Generated by**: /init-docs command
