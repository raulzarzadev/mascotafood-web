# Visual Audit — mascotafood.com

**Date:** 2026-04-16
**URL:** https://mascotafood.com/
**Viewports tested:** Desktop 1440×900, Mobile 390×844 (iPhone 14 Pro)
**Screenshots:**
- `/seo-audit/screenshots/desktop.png`
- `/seo-audit/screenshots/mobile.png`
- `/seo-audit/screenshots/mobile-fullpage.png`

---

## 1. Above-the-fold

**[OK]** Desktop hero is well-structured: pill badge, two-line H1 ("Lo mejor para tu mejor amigo" + orange "Alimento premium y accesorios"), supporting paragraph, two CTAs, and stat row — all visible in 900px. LCP candidate (`mascota.jpeg`) has `loading=eager` and `fetchpriority=high`, which is correct.

**[MEDIUM]** Mobile fold shows value prop + description but **both CTAs are clipped**: "Pide por WhatsApp" appears near the bottom and "Ver productos" is partly below the 844px fold. Users must scroll to see the secondary CTA.
*Fix:* Tighten hero paragraph (5 lines on mobile is heavy) or reduce H1 `font-size` from 36px to ~30-32px on sm breakpoint so both CTAs sit above the fold.

**[LOW]** Hero card on desktop shows the logo GIF as the dominant visual (2 product thumbnails beneath). Using the brand signet as LCP weakens "product/pet food" recognition. Consider swapping to `mascota.jpeg` (happy dog) as the dominant hero image and moving the logo to the header only.

---

## 2. CTAs

**[OK]** Primary CTAs have strong orange-on-white contrast (`#ea580c` / `rgb(234,88,12)` on white = ~4.6:1 for large text; white text on orange = ~4.5:1 AA for 16px). Secondary "Ver productos" uses white bg + dark text (passes AA).

**[OK]** Tap-target sizes meet the 44×44 minimum:
- Mobile "Pide por WhatsApp": 225×48 — pass
- Mobile "Ver productos": 159×50 — pass
- Header "WhatsApp": 127×**36** on desktop — **[LOW]** below 44px height on desktop (acceptable for pointer, but upgrade to 44px for consistency and touch laptops).

**[OK]** Both CTAs have clear iconography (WhatsApp icon, arrow).

---

## 3. Mobile usability

**[HIGH]** **No hamburger / no nav on mobile.** The mobile header shows only the logo + brand text; "Inicio / Productos / Nosotros / Preguntas / Contacto" links are hidden with no menu toggle. Users cannot jump to FAQ or Productos from the header — they must scroll the entire page. Add a hamburger (`button[aria-label="Abrir menú"]`) that opens a sheet with the 5 nav links + WhatsApp CTA.

**[OK]** No horizontal scroll (`scrollWidth 390 == clientWidth 390`).

**[OK]** Body font-size 16px, H1 36px, H2 30px, H3 16px — scannable hierarchy. Line length in hero paragraph is ~35-40 chars, within comfortable range.

---

## 4. Visual hierarchy

**[OK]** Clear H1 → H2 → H3 cascade. Section H2s ("Variedad de alimentos…", "Cuidamos a tu mascota…", "Resolvemos tus dudas", "¿Listo para consentir…") are scannable in fullpage screenshot.

**[LOW]** The two-color H1 (black + orange) is effective, but the orange phrase is longer than the black phrase, visually outweighing the core value prop. Consider reversing emphasis or shortening to "Alimento premium + accesorios".

**[LOW]** Grid of 8 category cards (Alimento perros/gatos/granel, Premios, Bandanas, Juguetes, Camas, Transportadoras) is dense — on mobile these stack into a single column making the page long. Consider a 2-col grid on mobile for faster scanning.

---

## 5. Brand consistency

**[OK]** Logo present (header + hero card), brand orange (`#ea580c` / `#c2410c`) applied consistently across CTAs, headings, stats, and icon chips.
**[OK]** `meta[name=theme-color] = #f97316` matches brand — Android/Chrome toolbar will tint correctly.
**[LOW]** Logo `<img>` has empty `alt=""` (decorative) but is the primary brand mark in the header — set `alt="Mascota Food"` for screen readers and SEO image search. Also the logo is a **GIF** (612×344 scaled down); consider SVG or optimized PNG/WebP to reduce payload.

---

## 6. Accessibility surface

**[MEDIUM]** Nav links use `oklch(0.374 0.01 67.558)` on white — roughly #5b544f, contrast ~7:1 (AA pass). However WhatsApp button text is white on `#ea580c` which borders AA for normal text — verify with axe; bump to `#c2410c` if needed.
**[MEDIUM]** Cannot verify focus-visible states from static screenshots — manually tab through and ensure rings (2px orange/dark) are visible on all CTAs and nav links. Tailwind default focus rings are often removed by resets.
**[LOW]** Hero image `alt="Perro feliz con productos Mascota Food"` is descriptive — good. Logo alt empty (see above).
**[LOW]** Anchor nav uses `#inicio`, `#productos`, etc. — ensure each target section has a matching `id` and `scroll-margin-top` so the sticky header doesn't cover headings on jump.

---

## Priority fixes

1. **[HIGH]** Add mobile hamburger menu — nav currently inaccessible on phones.
2. **[MEDIUM]** Raise both hero CTAs above the 844px mobile fold (shorter copy or smaller H1 on sm).
3. **[MEDIUM]** Set `alt="Mascota Food"` on header logo; replace GIF with SVG/WebP.
4. **[LOW]** Verify focus-visible rings across all interactive elements.
5. **[LOW]** Increase header "WhatsApp" button to 44px height on desktop.
