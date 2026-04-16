# Technical SEO Audit — mascotafood.com

**Date:** 2026-04-16 • **Stack:** Astro v6.1.7 + Tailwind on Vercel • **Scope:** Single-page landing

## Scorecard

| Category | Status | Score |
|---|---|---|
| Crawlability | Pass | 95 |
| Indexability | Pass | 95 |
| Security Headers | Fail (mostly missing) | 40 |
| URL Structure | Pass | 90 |
| Mobile | Pass | 90 |
| Core Web Vitals surface | Needs improvement | 70 |
| Structured Data | Pass | 95 |
| JS Rendering | Pass (static SSG) | 100 |
| **Overall** | — | **82** |

## Findings by Severity

### Critical

**C1. Missing security headers.** `curl -sI` returns only `strict-transport-security` (HSTS preloadable: `max-age=63072000`; missing `includeSubDomains; preload`). No `Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, or `Permissions-Policy`. Exposes clickjacking, MIME-sniff, referrer leakage, and feature-policy risks.

**C2. OG image 404.** `https://mascotafood.com/og-image.jpg` returns `HTTP/2 404`. Social shares will have no preview (Facebook, WhatsApp, Twitter/X). The URL is declared in both `og:image` and `twitter:image`.

### High

**H1. Favicon 404.** `/favicon.ico` returns 404. Browsers and several crawlers (Slackbot, Bingbot) still probe `/favicon.ico` and log failures. Only `/icons/icon.png` is linked.

**H2. Render-blocking Google Fonts.** Fonts are loaded via `<link rel="stylesheet">` from `fonts.googleapis.com` plus a redundant `<link rel="preload" as="style">` for the same URL. Blocks first paint and adds ~300–500 ms to LCP on 4G. A self-hosted Inter subset would remove an external round trip.

**H3. `og-image.jpg` missing dimensions.** Even once the file exists, declare `og:image:width` and `og:image:height` (1200x630 recommended) for reliable previews.

### Medium

**M1. HSTS directives incomplete.** Current: `max-age=63072000`. Add `includeSubDomains; preload` to be eligible for the HSTS preload list.

**M2. Sitemap `changefreq`/`priority` are ignored.** Google ignores both fields. Harmless, but remove for cleaner sitemaps and add `<lastmod>` (Google does honor it).

**M3. Too many `loading="eager"` images.** 8 of 12 images eager-load. Only the LCP hero (`/images/mascota.jpeg` with `fetchpriority="high"`) should be eager; the others push payload weight above the fold and risk LCP > 2.5 s on mobile.

**M4. Raw `.jpeg` / `.gif` assets, no modern formats.** Uses `/images/*.jpeg` and animated `LogoMascotaFood.gif`. Astro's `<Image />` / `<Picture />` components emit AVIF/WebP with responsive `srcset` automatically — none are present here.

**M5. No `srcset` / responsive images.** Every `<img>` uses a single `src`. On small viewports mobile users download desktop-sized files (e.g., `width="800"` hero).

**M6. Logo image has empty `alt=""`.** `LogoMascotaFoodSigno.gif` uses `alt=""` (decorative) yet is the site's brand mark in the header; should read `alt="Mascota Food"` for accessibility and brand-keyword signal.

### Low

**L1. Sitemap index for one URL.** `sitemap-index.xml` wrapping a single-URL `sitemap-0.xml` is overkill. A flat `sitemap.xml` is enough and reduces crawler round trips.

**L2. `<meta name="keywords">` present.** Ignored by Google/Bing since 2009. Harmless but dead weight (~400 bytes).

**L3. No `<link rel="alternate" hreflang>`.** Single locale `es-MX` — fine for now; add when you launch other markets. (See `seo-hreflang` skill.)

**L4. No 404 page validation.** Confirm `/404` renders your branded page and returns status 404 (not 200) on Vercel.

## Passed Checks

- `robots.txt` permissive, declares sitemap: `Allow: /` + `Sitemap: https://mascotafood.com/sitemap-index.xml`.
- Canonical: `<link rel="canonical" href="https://mascotafood.com/">` — self-referencing, correct.
- No `noindex` / `nofollow` signals.
- `HTTP -> HTTPS` and `www -> apex`: both resolve to `https://mascotafood.com/` with HTTP 200 final status.
- Clean URL structure, no trailing-slash duplication.
- Viewport meta: `width=device-width, initial-scale=1`.
- JS rendering: hero copy "Lo mejor para tu mejor amigo" present in initial HTML — Astro SSG confirmed, no hydration needed for crawlers.
- Structured data: `PetStore` + `WebSite` JSON-LD, both valid shape with `address`, `openingHoursSpecification`, `sameAs`.
- Single `<h1>`, clean heading hierarchy.
- `fetchpriority="high"` correctly applied to the LCP hero image.

## Quick Wins (ordered by ROI)

1. Upload `og-image.jpg` (1200x630) to `public/og-image.jpg`.
2. Add `public/favicon.ico`.
3. Add security headers via `vercel.json`.
4. Switch eager images (rows 2+) to `loading="lazy"`.
5. Self-host Inter or use `&display=swap` + preconnect only (drop the duplicated preload).
6. Migrate `<img>` to Astro `<Image />` for AVIF/WebP + `srcset`.

## Fix Snippets

### 1. `vercel.json` — security headers

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "Strict-Transport-Security", "value": "max-age=63072000; includeSubDomains; preload" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
        { "key": "Content-Security-Policy", "value": "default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com; connect-src 'self' https://vitals.vercel-insights.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'" }
      ]
    }
  ]
}
```

### 2. `astro.config.mjs` — sitemap + image service

```js
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://mascotafood.com',
  integrations: [sitemap({ changefreq: undefined, priority: undefined, lastmod: new Date() })],
  image: { service: { entrypoint: 'astro/assets/services/sharp' } },
});
```

### 3. Responsive hero image

```astro
---
import { Image } from 'astro:assets';
import hero from '../assets/mascota.jpeg';
---
<Image src={hero} alt="Perro feliz con productos Mascota Food"
  widths={[400, 800, 1200]} sizes="(max-width: 640px) 100vw, 800px"
  format="avif" loading="eager" fetchpriority="high" />
```

### 4. OG image dimensions

```html
<meta property="og:image" content="https://mascotafood.com/og-image.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:type" content="image/jpeg" />
```
