# Performance & Core Web Vitals Audit — mascotafood.com

Audited 2026-04-16. Method: heuristic analysis of `/tmp/mascotafood-home.html` + `curl` resource sizing (PSI API key not provided; no lab run possible in this environment). Estimates below assume 4G/desktop; validate with PSI / CrUX before sign-off.

## Summary

| Metric | Estimate | Status |
|---|---|---|
| LCP | ~1.4–2.0s | Good |
| INP | <50ms (zero client JS on critical path) | Good |
| CLS | <0.05 (all `<img>` have width/height) | Good |
| TTFB | 216ms (Vercel edge, `x-vercel-cache: HIT`, `age: 891`) | Good |
| Total initial transfer | HTML 38KB + CSS 30KB + 3 eager JPEGs 140KB ≈ 210KB | Good |
| Lighthouse Perf estimate | 90–96 | Good |

Overall the site is healthy. All findings are optimization, not remediation.

## Measurements

- TTFB: DNS 3ms · Connect 38ms · TLS 126ms · TTFB 216ms · Total 281ms
- Vercel cache: HIT, age 891s — edge-cached HTML
- Images (bytes): mascota 28,165 · alimentos_1 55,620 · alimentos_2 56,289 · alimentos_3 86,467 · alimentos_4 132,896 · bandanas_dogfriend 76,056 · articulos 79,847 · camas 96,141 · cargador 75,381 · mascota_a_dom 55,712 (total ~743KB as JPEG)
- Above-the-fold eager images: `mascota.jpeg` (28KB) + `alimentos_1.jpeg` (56KB) + `bandanas_dogfriend.jpeg` (76KB) = 160KB
- CSS: single bundled file 29,554B (good — no render-blocking chain)
- JS: zero first-party bundles; only deferred Vercel Analytics beacon
- Fonts: Inter via Google Fonts with `display=swap` and preconnect to both `fonts.googleapis.com` and `fonts.gstatic.com` (crossorigin)

## Findings

### High — Hero image not `<link rel="preload">`'d
`mascota.jpeg` is the LCP candidate and already has `fetchpriority="high"` + `loading="eager"`. But the browser only discovers it after CSS parse. Adding a preload shaves 100–300ms off LCP on slow networks.
Fix in `src/layouts/Layout.astro` head:
```html
<link rel="preload" as="image" href="/images/mascota.jpeg" fetchpriority="high">
```
When you migrate to `astro:assets` (below), preload the hashed output instead.

### Medium — Raw `<img>` tags bypass Astro's image optimization
All 10 product images ship as JPEG with no responsive `srcset`. `alimentos_4.jpeg` (130KB) and `camas.jpeg` (96KB) are the worst offenders. AVIF/WebP typically cuts 40–70%.
Fix: wrap imports in `src/content/images.ts`:
```ts
import mascota from '../../public/images/mascota.jpeg';
import alimentos1 from '../../public/images/alimentos_1.jpeg';
// ...
export const productImages = { mascota, alimentos1, /* ... */ } as const;
```
Then in `.astro` files:
```astro
---
import { Image } from 'astro:assets';
import { productImages } from '@/content/images';
---
<Image src={productImages.mascota} alt="Perro feliz…"
       widths={[400, 800, 1200]} sizes="(min-width:1024px) 50vw, 100vw"
       formats={['avif','webp']} loading="eager" fetchpriority="high" />
```
Move files from `/public/images/` to `/src/assets/images/` so Astro hashes and optimizes them. Expected payload reduction: 500–600KB.

### Medium — Three above-the-fold images marked `loading="eager"`, plus six product cards also eager
Cards in the `#productos` grid (`alimentos_1`, `_2`, `_3`, `_4`) are eager but off-screen on mobile (they sit ~1–1.5 viewports below hero). They compete with the LCP image for bandwidth.
Fix: keep `loading="eager"` only on `mascota.jpeg` (LCP), `alimentos_1.jpeg`, and `bandanas_dogfriend.jpeg` (the hero collage). Set everything inside `#productos` to `loading="lazy"` — you already do this for cards 5–8; apply to cards 1–4 too.

### Medium — Google Fonts on critical path
Two external origins (`fonts.googleapis.com`, `fonts.gstatic.com`) add ~150ms of connection overhead even with preconnect. `display=swap` is present (good — no FOIT), but the stylesheet itself is render-blocking.
Fix options, best to worst:
1. Self-host Inter via `@fontsource-variable/inter` + Tailwind `fontFamily` override. Eliminates both origins.
2. Or add `<link rel="preload" as="font" type="font/woff2" crossorigin href="…inter-…woff2">` for the 400/700 weights only (drop 500/600/800 — they're rarely used and each weight is ~25KB).

### Low — Animated GIF logo
`LogoMascotaFoodSigno.gif` (7KB) renders in the sticky header with `loading="eager"`. Fine at this size, but GIF decodes on the main thread. Convert to static SVG or WebP (<2KB) when redesigning.

### Low — `<img>` dimensions use rendered px, not intrinsic
`mascota.jpeg` declares `width="800" height="500"` but the source file is likely larger. Aspect ratio is preserved so CLS is safe, but specifying intrinsic dimensions helps the browser pick the right `srcset` candidate once you add one.

### Low — `/og-image.jpg` referenced but not verified
Ensure it exists at root (separate audit item — not performance-critical for LCP).

## Priority action list

1. Preload `/images/mascota.jpeg` (5 min, 100–300ms LCP win).
2. Set `loading="lazy"` on product cards 1–4 (5 min, frees bandwidth for LCP).
3. Migrate to `astro:assets` + `<Image />` via `src/content/images.ts` (1–2h, ~500KB payload cut, AVIF/WebP).
4. Self-host Inter with `@fontsource-variable/inter` (30 min, removes 2 external origins).

Files reviewed: `/tmp/mascotafood-home.html`
Report: `/Users/zarza/Documents/projects/mascota-food/seo-audit/performance.md`
