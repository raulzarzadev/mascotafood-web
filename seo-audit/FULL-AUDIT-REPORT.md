# SEO Full Audit — mascotafood.com

**Auditado:** 2026-04-16
**URL:** https://mascotafood.com/
**Stack:** Astro 6 (static) + Tailwind CSS 4 + Vercel
**Tipo de negocio detectado:** PetStore / Local Business (Estado de México, MX) — landing de una sola página

---

## Executive Summary

### SEO Health Score: **70/100** — *Aceptable, con margen amplio de mejora*

| Categoría | Peso | Score | Ponderado |
|-----------|------|-------|-----------|
| Technical SEO | 25% | 82 | 20.5 |
| Content Quality / E-E-A-T | 25% | 52 | 13.0 |
| On-Page SEO | 20% | 75 | 15.0 |
| Schema / Structured Data | 10% | 75 | 7.5 |
| Performance (CWV) | 10% | 92 | 9.2 |
| Images | 5% | 55 | 2.75 |
| AI Search Readiness | 5% | 38 | 1.9 |
| **TOTAL** | **100%** | — | **69.85** |

**Fortalezas principales:**
- Arquitectura sólida: Astro estático con contenido en HTML inicial (crawlable sin JS).
- Core Web Vitals estimados dentro de umbrales "Good": TTFB 216 ms edge-cached, CLS controlado con width/height en todas las imágenes, INP excelente (cero JS first-party).
- JSON-LD válido (`PetStore`, `WebSite`, `FAQPage`) ya desplegado.
- Redirecciones `www → apex` limpias, HTTPS forzado con HSTS.

**Debilidades críticas:**
1. Señales E-E-A-T muy débiles: sin dirección real, sin marcas nombradas, sin historia ni testimonios.
2. Cabeceras de seguridad ausentes (CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy).
3. `og-image.jpg` devuelve 404 → previews sociales rotos.
4. Navegación móvil invisible (no hay hamburguesa).
5. Baja AI Citation: no se puede citar la página para preguntas específicas ("¿venden Royal Canin?", "¿llegan a Tecámac?").

### Top 5 Critical Issues

| # | Issue | Impacto |
|---|-------|---------|
| 1 | `og-image.jpg` 404 | Previews sociales rotos (Facebook/X/WhatsApp). |
| 2 | Cabeceras de seguridad ausentes (CSP, XFO, XCTO) | Penalización indirecta + riesgo clickjacking. |
| 3 | E-E-A-T: sin dirección completa, sin aviso de privacidad, sin testimonios | Ranking local y confianza. |
| 4 | Marcas de alimento no mencionadas (nunca aparece "Royal Canin", "Hill's", etc.) | Cero citation readiness para búsquedas long-tail. |
| 5 | Navegación mobile ausente (no hamburguesa) | UX móvil rota; 60–70% del tráfico local es mobile. |

### Top 5 Quick Wins (< 1 día c/u)

1. Generar y subir `/public/og-image.jpg` (1200×630, marca + tagline + logo).
2. Añadir cabeceras de seguridad vía `vercel.json` (snippet listo en `technical-seo.md`).
3. Corregir `alt=""` del logo en `Header.astro` y `Footer.astro` → `alt="Mascota Food logo"`.
4. Eliminar `meta name="keywords"` (Google lo ignora desde 2009).
5. Arreglar Telegram mal escrito: `macotafood` → `mascotafood`.

---

## 1. Technical SEO — Score 82/100

**Detalle completo:** [`technical-seo.md`](./technical-seo.md)

### Passing
- `robots.txt` permisivo con sitemap declarado.
- Canonical correcto (`https://mascotafood.com/`).
- `lang="es-MX"` + viewport + `theme-color` presentes.
- HTTPS + redirección `www → apex` limpia.
- Contenido visible en HTML inicial (SSR-equivalente Astro).

### Critical
- **Cabeceras de seguridad faltantes.** Solo `strict-transport-security`. Agregar vía `vercel.json`:
  ```json
  {
    "headers": [{
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=(self)" },
        { "key": "Strict-Transport-Security", "value": "max-age=63072000; includeSubDomains; preload" }
      ]
    }]
  }
  ```
- **`og-image.jpg` 404** → previews rotos.

### High
- `/favicon.ico` 404.
- Google Fonts con `preload as="style"` redundante; bloquea renderizado.

### Medium
- HSTS sin `includeSubDomains; preload`.
- 8 de 12 imágenes con `loading="eager"` — solo la LCP necesita eager.
- Imágenes JPEG/GIF crudas sin `srcset` ni WebP/AVIF.

### Low
- `<meta name="keywords">` irrelevante.
- `sitemap-index.xml` envuelve un solo `sitemap-0.xml` — un `sitemap.xml` plano bastaría.

---

## 2. Content Quality & E-E-A-T — Score 52/100

**Detalle completo:** [`content-quality.md`](./content-quality.md)

### Métricas
- **Palabras visibles totales:** ~510 (por debajo del estándar 800 para service/homepage).
- **E-E-A-T ponderado:** 4.3/10.
- **AI Citation Score:** 38/100.

### Critical
- **Sin dirección completa.** JSON-LD solo tiene `addressLocality: Villas del Real` sin calle, CP, `streetAddress`. Rompe ranking local.
- **Sin aviso de privacidad ni política de devoluciones.** Obligatorio por LFPDPPP (México).
- **Sin señales de Experience:** ni año de fundación, ni foto del local, ni historia del fundador.

### High
- **"Marcas premium" sin nombrar una sola marca.** La palabra aparece 6 veces pero nunca se lista Royal Canin, Hill's, Pro Plan, Nupec, etc. → un LLM no puede citar esta página para "¿dónde compro Royal Canin en Estado de México?".
- **"Zona de cobertura" mencionada 4 veces sin enumerar colonias ni códigos postales.**
- **FAQ muy corta:** 5 preguntas genéricas (~22 palabras/respuesta). Falta long-tail.
- **Stats sin respaldo:** "+30 marcas / 500+ productos" sin evidencia.

### Medium
- Sección "Nosotros" de solo 72 palabras.
- Sin `AggregateRating` ni testimonios visibles.
- Horario por día está en JSON-LD pero invisible en HTML.
- Handle Telegram mal escrito (`macotafood`) rompe consistencia de marca.

### Recomendaciones (ver reporte detallado)
- Reescribir "Nosotros" a ~280 palabras con historia + MVZ asesor + marcas literales.
- Expandir FAQ a 15 preguntas (añadir: CPs exactos, programa de lealtad, política de cambio, muestras, tiempos de entrega por zona).
- Sección de marcas con logos visibles.
- Mapa de cobertura (Tecámac, Ojo de Agua, Los Héroes, Ecatepec, etc.).
- Testimonios reales con nombre + colonia + foto de mascota.

---

## 3. On-Page SEO — Score 75/100

### Pass
- `<title>` descriptivo con marca + tagline + categoría principal (73 car).
- Meta description 155 car con keywords y CTA implícito.
- Un solo H1, jerarquía H2 → H3 coherente.
- Semántica: `<header>`, `<nav>`, `<main>`, `<section>` con `id` anclables, `<footer>`.
- Skip link para accesibilidad.

### Medium
- Falta linking interno (todo son anchors en la misma página — esperado en landing, pero limita profundidad).
- `<meta name="keywords">` puede removerse.
- Texto de enlaces "Consultar" se repite 8 veces — poco descriptivo para screen readers. Usar `aria-label` (ya implementado) pero diversificar el texto visible también ayuda.

### Low
- `<title>` de 73 car está bien, pero el sufijo "| Alimento premium para perros y gatos" podría acortarse para dejar sitio a marca en SERPs mobile.

---

## 4. Schema & Structured Data — Score 75/100

**Detalle completo:** [`schema.md`](./schema.md)

### Pass
- 3 bloques JSON-LD detectados y parseables: `PetStore`, `WebSite`, `FAQPage`.
- `openingHoursSpecification` bien estructurada.
- `sameAs` con Facebook, Telegram, Instagram.

### Medium
- **`FAQPage` sin utilidad real:** desde agosto 2023 Google restringió FAQ rich results a sitios de gobierno/salud. El markup es válido pero no genera rich snippets. Mantener el HTML `<details>` visible, retirar el JSON-LD.
- **Faltan propiedades de alto valor local:** `geo` (lat/long), `areaServed`, `paymentAccepted`, `currenciesAccepted`, `hasMap`.
- **Sin `Service` para "envío a domicilio gratis"** — diferenciador principal del negocio.
- **Sin `OfferCatalog` con las 8 categorías** visibles.

### Recomendación
Usar un `@graph` consolidado con `Organization` (logo como `ImageObject`), `WebSite` linkeado por `@id`, y `PetStore` enriquecido. Snippet completo listo en `schema.md`.

---

## 5. Performance (Core Web Vitals) — Score 92/100

**Detalle completo:** [`performance.md`](./performance.md)

| Métrica | Valor est. | Umbral "Good" | Estado |
|---------|-----------|---------------|--------|
| TTFB    | 216 ms    | < 800 ms      | ✅ |
| LCP     | ~1.5 s    | < 2.5 s       | ✅ |
| CLS     | ~0.01     | < 0.1         | ✅ |
| INP     | < 50 ms   | < 200 ms      | ✅ |

**Transferencia inicial:** ~210 KB (HTML 38 KB + CSS 30 KB + 3 JPEG eager 160 KB). Lighthouse Performance estimado: **90–96**.

### High
- **LCP hero sin `<link rel="preload">`.** Agregar en `Layout.astro`:
  ```html
  <link rel="preload" as="image" href="/images/mascota.jpeg" fetchpriority="high" />
  ```
  Ahorro estimado: 100–300 ms.

### Medium
- Imágenes JPEG/GIF sin WebP/AVIF ni `srcset`. Migrar a `astro:assets` → `<Image />` con `format={['avif','webp']}` recorta ~500 KB del peso total.
- Tarjetas de producto 1–4 con `loading="eager"` pero bajo el fold — compiten con LCP. Cambiar a `lazy`.
- Google Fonts: 5 pesos de Inter (400/500/600/700/800) es excesivo. Auto-hospedar vía `@fontsource-variable/inter` y reducir a 400/700.

### Low
- Logo GIF animado en header (7 KB) → SVG/WebP estático.

---

## 6. Images — Score 55/100

### Issues
- **10 imágenes JPEG/GIF crudas** sin `srcset`, sin WebP/AVIF, sin responsive sizes.
- **Logo con `alt=""`** en `Header.astro` y `Footer.astro` — es el mark principal de la marca, debe tener texto alternativo.
- **Imágenes pesadas:** `alimentos_4.jpeg` 130 KB, `camas.jpeg` 96 KB. Desktop-weight para móvil.
- **Sin lazy loading correcto:** 8 de 12 imágenes eager.

### Recomendaciones
- Migrar a `astro:assets` con el componente `<Image />`: genera WebP/AVIF + srcset automáticos.
- Establecer `loading="lazy"` para todo excepto el hero LCP.
- `alt` descriptivo: "Perro golden retriever con bandana roja de Mascota Food" en lugar de genéricos.

---

## 7. AI Search Readiness — Score 38/100

### Issues
- **Sin claims citables por LLMs.** Frases como "marcas premium" sin marcas listadas. "Zona de cobertura" sin colonias.
- **Sin `llms.txt`** (estándar emergente para LLM indexing).
- **Sin datos estructurados específicos** (`Product`, `Offer`, `Brand`, `Review`).
- **Sin respuestas directas** a preguntas frecuentes long-tail que los LLMs buscan citar.

### Recomendaciones
- Listar marcas literales (texto + logos): Royal Canin, Hill's, Pro Plan, Nupec, Eukanuba, etc.
- Enumerar colonias/CPs de entrega en una sección dedicada.
- Crear `/llms.txt` declarando secciones principales y permitiendo crawlers de IA.
- Reescribir FAQ para respuestas directas y específicas ("Sí, entregamos en Tecámac CP 55767 en 2 horas").

---

## 8. Visual / Mobile — Parcial

**Detalle completo:** [`visual.md`](./visual.md)

### High
- **Mobile sin hamburguesa ni nav visible.** Los 5 links (Inicio, Productos, Nosotros, Preguntas, Contacto) se ocultan con `hidden md:flex`. En 390×844 no hay forma de saltar a secciones desde el header.

### Medium
- Hero en mobile: H1 36px + párrafo de 5 líneas empuja el CTA "Ver productos" bajo el fold.
- Logo header `alt=""` + GIF 612×344 — reemplazar con SVG/WebP.

### OK
- Sin scroll horizontal.
- Body font 16 px.
- Tap targets CTA principal cumplen 44×44 (225×48, 159×50).
- Theme-color `#f97316` aplicado.

### Low
- Botón WhatsApp desktop 127×36 — alto < 44 px.
- Visual hero dominado por el logo GIF en lugar de la foto de mascota/producto.

---

## Archivos de esta auditoría

| Archivo | Contenido |
|---------|-----------|
| `FULL-AUDIT-REPORT.md` | Este reporte consolidado |
| `ACTION-PLAN.md` | Plan priorizado con estimaciones |
| `technical-seo.md` | Detalle técnico |
| `content-quality.md` | Detalle de contenido + E-E-A-T |
| `schema.md` | Validación JSON-LD + snippets |
| `sitemap.md` | Análisis del sitemap |
| `performance.md` | Core Web Vitals + optimizaciones |
| `visual.md` | Análisis visual + UX mobile |
| `screenshots/desktop.png` | Captura desktop 1440×900 |
| `screenshots/mobile.png` | Captura mobile 390×844 (viewport) |
| `screenshots/mobile-fullpage.png` | Captura mobile full page |

---

*Baseline capturado el 2026-04-16 sobre la primera versión productiva. Re-auditar tras aplicar el `ACTION-PLAN.md` para medir delta de score.*
