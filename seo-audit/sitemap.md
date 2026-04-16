# Sitemap Architecture Audit — mascotafood.com

**Date:** 2026-04-16
**Scope:** `sitemap-index.xml`, `sitemap-0.xml`, `robots.txt`
**Site type:** Single-page Astro landing (PetStore, es-MX)

---

## 1. Fetched Artifacts

**`/sitemap-index.xml`** (HTTP 200)
```xml
<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>https://mascotafood.com/sitemap-0.xml</loc></sitemap>
</sitemapindex>
```

**`/sitemap-0.xml`** (HTTP 200)
```xml
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ...>
  <url>
    <loc>https://mascotafood.com/</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

**`/robots.txt`** (HTTP 200)
```
User-agent: *
Allow: /
Sitemap: https://mascotafood.com/sitemap-index.xml
```

---

## 2. Validation Matrix

| # | Check | Result | Severity |
|---|---|---|---|
| 1 | XML well-formed + UTF-8 | PASS | — |
| 2 | Correct `sitemaps.org/schemas/sitemap/0.9` namespace | PASS | — |
| 3 | Index points to `sitemap-0.xml` (200 OK) | PASS | — |
| 4 | URL is absolute + HTTPS | PASS | — |
| 5 | `<loc>` matches canonical (`https://mascotafood.com/`) | PASS | — |
| 6 | Referenced in `robots.txt` | PASS | — |
| 7 | URL count within 50k limit (1 URL) | PASS | — |
| 8 | Response codes of listed URLs (200) | PASS | — |
| 9 | No noindex / redirect on listed URLs | PASS | — |
| 10 | `<lastmod>` present | **FAIL** | Medium |
| 11 | `<changefreq>` used (deprecated signal, Google ignores) | WARN | Info |
| 12 | `<priority>` used (deprecated signal, Google ignores) | WARN | Info |
| 13 | Image sitemap extension declared but unused | WARN | Low |
| 14 | News/Video extensions declared but unused (noise) | WARN | Info |

---

## 3. Severity-Tagged Findings

- **[Medium] Missing `<lastmod>`.** Google treats `lastmod` as the single most valuable sitemap hint. The home page was last modified `2026-04-16 20:05:39 GMT` (per `Last-Modified` header) — surface it.
- **[Info] `changefreq` / `priority` are dead weight.** Google has publicly ignored both since 2017. Safe to remove; keeping them is not harmful, only noisy.
- **[Low] Unused XML namespaces.** `xmlns:news`, `xmlns:xhtml`, `xmlns:image`, `xmlns:video` are declared but no corresponding tags appear. Drop what you are not using to keep the file tidy.
- **[Low] Image sitemap opportunity missed.** Home page renders 10+ product images (`/images/alimentos_1.jpeg` … `/images/camas.jpeg`, `/images/mascota.jpeg`, etc.) that are crawl-worthy and commerce-relevant. Add `<image:image>` entries to improve Google Images discovery.
- **[Info] Single-page site overhead.** A `sitemap-index.xml` wrapping one child sitemap containing one URL is technically overkill — but it is Astro's `@astrojs/sitemap` default and causes zero harm. Keep it; it becomes useful the moment a second route ships.

---

## 4. Is a Sitemap Necessary Here?

**Strictly necessary:** No. With one URL, a well-linked internal nav, and a valid canonical, Googlebot discovers the page immediately. **Recommended:** Yes — it gives Search Console a clean "Submitted/Indexed" coverage signal and future-proofs the site.

---

## 5. Future Structure (when blog / products / articles arrive)

Keep the index pattern. Split by content type so each file has an independent `lastmod` cadence:

```
/sitemap-index.xml
  -> /sitemap-pages.xml       (home, /nosotros, /contacto, /terminos)
  -> /sitemap-products.xml    (one URL per product detail page)
  -> /sitemap-blog.xml        (articles / guides)
  -> /sitemap-images.xml      (optional, if image volume > ~500)
```

Rules:
- Per-file cap: stay well under 50k URLs and 50 MB uncompressed.
- Ping via Search Console on publish; the old `/ping` endpoint is deprecated.
- Avoid programmatic location pages ("tienda-mascotas-[ciudad]"). At 30+ expect a warning; at 50+ expect a doorway-page penalty unless each page has 60 percent+ unique content (local inventory, real address, local reviews).
- Blog slugs: `/blog/{slug}` — real `lastmod` from the CMS, no `priority`, no `changefreq`.

---

## 6. Recommended `sitemap-0.xml` (drop-in replacement)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>https://mascotafood.com/</loc>
    <lastmod>2026-04-16</lastmod>
    <image:image><image:loc>https://mascotafood.com/og-image.jpg</image:loc></image:image>
    <image:image><image:loc>https://mascotafood.com/images/mascota.jpeg</image:loc></image:image>
    <image:image><image:loc>https://mascotafood.com/images/alimentos_1.jpeg</image:loc></image:image>
    <image:image><image:loc>https://mascotafood.com/images/alimentos_2.jpeg</image:loc></image:image>
    <image:image><image:loc>https://mascotafood.com/images/alimentos_3.jpeg</image:loc></image:image>
    <image:image><image:loc>https://mascotafood.com/images/alimentos_4.jpeg</image:loc></image:image>
    <image:image><image:loc>https://mascotafood.com/images/bandanas_dogfriend.jpeg</image:loc></image:image>
    <image:image><image:loc>https://mascotafood.com/images/articulos.jpeg</image:loc></image:image>
    <image:image><image:loc>https://mascotafood.com/images/camas.jpeg</image:loc></image:image>
    <image:image><image:loc>https://mascotafood.com/images/cargador.jpeg</image:loc></image:image>
    <image:image><image:loc>https://mascotafood.com/images/mascota_a_dom.jpeg</image:loc></image:image>
  </url>
</urlset>
```

In `astro.config.mjs`, set `@astrojs/sitemap` to emit `lastmod: true`, drop `changefreq`/`priority`, and add a `serialize()` hook that appends the `<image:image>` entries for `/`.

---

## 7. Action Items (priority order)

1. Add real `<lastmod>` via Astro sitemap config.
2. Add `<image:image>` entries for product images.
3. Remove `changefreq`, `priority`, and unused `news` / `video` / `xhtml` namespaces.
4. Submit `https://mascotafood.com/sitemap-index.xml` in Google Search Console.
5. When routes are added, split by content type per Section 5.
