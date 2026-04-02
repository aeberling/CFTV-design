#!/usr/bin/env node

/**
 * CFTV News Migration Script
 * Pulls all posts from cftetonvalley.org via WP REST API,
 * downloads featured images, and generates .njk files.
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const API_BASE = 'https://cftetonvalley.org/wp-json/wp/v2';
const OUTPUT_DIR = path.join(__dirname, '..', 'src', 'news-events');
const IMAGE_DIR = path.join(__dirname, '..', 'src', 'assets', 'images', 'news');

// --- HTTP helpers ---

function fetch(url) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    mod.get(url, { headers: { 'User-Agent': 'CFTV-Migration/1.0' } }, (res) => {
      // Follow redirects
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetch(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
      }
      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

function fetchJSON(url) {
  return fetch(url).then((buf) => JSON.parse(buf.toString()));
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(dest)) {
      return resolve(); // skip if already downloaded
    }
    const mod = url.startsWith('https') ? https : http;
    mod.get(url, { headers: { 'User-Agent': 'CFTV-Migration/1.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode} downloading ${url}`));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
      file.on('error', reject);
    }).on('error', reject);
  });
}

// --- Text helpers ---

function stripHtml(html) {
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&#038;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/\n/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function escapeYaml(str) {
  // Wrap in quotes if it contains special chars
  if (/[:"'#\[\]{}&*?|>!%@`]/.test(str) || str.startsWith('-') || str.startsWith(' ')) {
    return '"' + str.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"';
  }
  return str;
}

function cleanContentHtml(html) {
  // Remove WordPress-specific wrapper divs, inline styles, and classes
  // but preserve the structural HTML (p, h2, h3, ul, ol, li, a, img, blockquote)
  return html
    // Remove empty paragraphs
    .replace(/<p>\s*<\/p>/g, '')
    // Remove wp-block wrapper divs
    .replace(/<div class="wp-block[^"]*"[^>]*>/g, '')
    .replace(/<\/div>/g, '')
    // Remove figure/figcaption wrappers (we handle featured image separately)
    .replace(/<figure[^>]*>.*?<\/figure>/gs, '')
    // Remove inline styles
    .replace(/ style="[^"]*"/g, '')
    // Remove class attributes
    .replace(/ class="[^"]*"/g, '')
    // Remove data attributes
    .replace(/ data-[a-z-]+="[^"]*"/g, '')
    // Remove id attributes
    .replace(/ id="[^"]*"/g, '')
    // Clean up empty attributes
    .replace(/ +>/g, '>')
    // Remove WordPress image markup (handled by featured image)
    // Normalize whitespace
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

// --- Category mapping ---

function mapCategory(categoryNames) {
  // Map WP categories to our tag labels
  const name = categoryNames[0] || '';
  if (/tin cup/i.test(name)) return 'Tin Cup';
  if (/competitive grant/i.test(name)) return 'Grants';
  if (/scholarship/i.test(name)) return 'Scholarships';
  // Check secondary categories
  for (const c of categoryNames) {
    if (/tin cup/i.test(c)) return 'Tin Cup';
    if (/competitive grant/i.test(c)) return 'Grants';
    if (/scholarship/i.test(c)) return 'Scholarships';
  }
  return 'Foundation';
}

// --- Main ---

async function main() {
  console.log('=== CFTV News Migration ===\n');

  // 1. Fetch all categories
  console.log('Fetching categories...');
  const categories = await fetchJSON(`${API_BASE}/categories?per_page=100`);
  const catMap = {};
  categories.forEach((c) => { catMap[c.id] = c.name; });
  console.log(`  Found ${categories.length} categories`);

  // 2. Fetch all posts (paginated)
  console.log('Fetching posts...');
  let allPosts = [];
  let page = 1;
  while (true) {
    try {
      const posts = await fetchJSON(`${API_BASE}/posts?per_page=100&page=${page}`);
      if (!posts.length) break;
      allPosts = allPosts.concat(posts);
      console.log(`  Page ${page}: ${posts.length} posts (total: ${allPosts.length})`);
      page++;
    } catch (e) {
      // WP returns 400 when page exceeds total
      break;
    }
  }
  console.log(`  Total posts: ${allPosts.length}\n`);

  // 3. Collect unique featured media IDs
  const mediaIds = [...new Set(allPosts.map((p) => p.featured_media).filter(Boolean))];
  console.log(`Fetching ${mediaIds.length} featured images...`);

  const mediaMap = {};
  let downloaded = 0;
  for (const id of mediaIds) {
    try {
      const media = await fetchJSON(`${API_BASE}/media/${id}`);
      // Prefer medium_large or large size, fallback to full
      const sizes = media.media_details && media.media_details.sizes;
      let imageUrl = media.source_url;
      if (sizes) {
        if (sizes.medium_large) imageUrl = sizes.medium_large.source_url;
        else if (sizes.large) imageUrl = sizes.large.source_url;
      }

      const ext = path.extname(new URL(imageUrl).pathname) || '.jpg';
      const filename = `${id}${ext}`;
      const dest = path.join(IMAGE_DIR, filename);

      await downloadFile(imageUrl, dest);
      mediaMap[id] = `/assets/images/news/${filename}`;
      downloaded++;

      if (downloaded % 10 === 0) {
        console.log(`  Downloaded ${downloaded}/${mediaIds.length}`);
      }
    } catch (e) {
      console.warn(`  Warning: Could not fetch media ${id}: ${e.message}`);
      mediaMap[id] = '/assets/images/home/make-a-difference.jpg'; // fallback
    }
  }
  console.log(`  Downloaded ${downloaded} images\n`);

  // 4. Generate .njk files
  console.log('Generating .njk files...');
  let generated = 0;
  const slugs = new Set();

  for (const post of allPosts) {
    const title = stripHtml(post.title.rendered);
    const excerpt = stripHtml(post.excerpt.rendered).replace(/\[…\]$/, '…').replace(/\[&hellip;\]$/, '…');
    const content = cleanContentHtml(post.content.rendered);
    const date = post.date;
    const formattedDate = formatDate(date);
    const categoryNames = (post.categories || []).map((id) => catMap[id] || 'Uncategorized');
    const tag = mapCategory(categoryNames);
    const image = mediaMap[post.featured_media] || '/assets/images/home/make-a-difference.jpg';

    // Build slug from WP slug
    let slug = post.slug;
    // Deduplicate
    if (slugs.has(slug)) slug = `${slug}-${post.id}`;
    slugs.add(slug);

    const njkContent = `---
layout: base.njk
title: ${escapeYaml(title + ' - Community Foundation of Teton Valley')}
description: ${escapeYaml(excerpt.substring(0, 160))}
permalink: /news-events/${slug}/
date: ${date}
newsPost: true
newsTag: ${escapeYaml(tag)}
newsExcerpt: ${escapeYaml(excerpt.substring(0, 200))}
newsImage: ${escapeYaml(image)}
heroHeading: News & Events
heroText: ""
heroImage: ${escapeYaml(image)}
---
{% include "utility-nav.njk" %}
{% include "header.njk" %}

<main>
  {% include "page-hero.njk" %}

  <article class="post-detail">
    <div class="container">
      <div class="post-detail__inner">

        <div class="post-detail__meta">
          <span class="post-card__tag">${tag}</span>
          <span class="post-detail__date">${formattedDate}</span>
        </div>

        <h1 class="post-detail__title">${title}</h1>

        <div class="post-detail__featured-image">
          <img src="${image}" alt="${title.replace(/"/g, '&quot;')}" loading="lazy">
        </div>

        <div class="post-detail__content">
          ${content}
        </div>

        <div class="post-detail__back">
          <a href="/news-events/" class="theme_btn theme_btn_bg">Back to News & Events <span></span></a>
        </div>

      </div>
    </div>
  </article>

  <section class="cta-banner">
    <div class="container">
      <div class="cta-banner__content">
        <h2 class="cta-banner__heading">Stay <span>in the loop</span></h2>
        <p class="cta-banner__text">Subscribe to our newsletter for grant announcements, event invites, and community stories.</p>
      </div>
      <div class="cta-banner__action">
        <a href="/subscribe/" class="theme_btn theme_btn_bg theme_btn--light">Subscribe <span></span></a>
      </div>
    </div>
  </section>
</main>

{% include "footer.njk" %}
`;

    const outputPath = path.join(OUTPUT_DIR, `${slug}.njk`);
    fs.writeFileSync(outputPath, njkContent, 'utf8');
    generated++;
  }

  console.log(`  Generated ${generated} .njk files\n`);
  console.log('=== Migration complete ===');
  console.log(`  Posts: ${generated}`);
  console.log(`  Images: ${downloaded}`);
  console.log(`  Output: ${OUTPUT_DIR}`);
}

main().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
