# SEO Action Plan — mascotafood.com

**Base score:** 70/100 · **Target tras plan:** 88–92/100
**Esfuerzo total estimado:** ~3 semanas · **Impact: Alto**

Ordenado por prioridad: **Critical → High → Medium → Low**.
Cada ítem declara esfuerzo (XS/S/M/L), impacto estimado (+pts) y el archivo exacto a tocar.

---

## 🔴 CRITICAL — fijar en ≤ 72 h (impacto ~+10 pts)

### C1. Crear `og-image.jpg` (1200×630)
- **Archivo:** `public/og-image.jpg`
- **Esfuerzo:** XS (30 min con Figma/Canva)
- **Impacto:** +1 SEO, +mucho CTR social
- **Spec:** logo + tagline "Lo mejor para tu mejor amigo" + foto de mascota + fondo brand orange (#f97316). WebP también (`og-image.webp`) como alternativa.

### C2. Añadir cabeceras de seguridad vía `vercel.json`
- **Archivo nuevo:** `vercel.json` en raíz del repo
- **Esfuerzo:** S (10 min)
- **Impacto:** +3 Technical
- **Snippet:**
  ```json
  {
    "headers": [{
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=(self)" },
        { "key": "Strict-Transport-Security", "value": "max-age=63072000; includeSubDomains; preload" },
        { "key": "Content-Security-Policy", "value": "default-src 'self'; script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com https://_vercel.vercel-scripts.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://vitals.vercel-insights.com; frame-ancestors 'self';" }
      ]
    }]
  }
  ```

### C3. Aviso de privacidad + política de devoluciones (obligatorio LFPDPPP México)
- **Archivos nuevos:** `src/pages/privacidad.astro`, `src/pages/devoluciones.astro`
- **Links:** añadir en `Footer.astro`
- **Esfuerzo:** M (2 h con plantilla Profeco/LFPDPPP)
- **Impacto:** +3 Content/Trust, cumplimiento legal.

### C4. Corregir datos NAP (Name/Address/Phone) completos
- **Archivo:** `src/consts.ts` — completar `streetAddress`, `postalCode`, coordenadas `geo`.
- **Esfuerzo:** XS (5 min con dirección real)
- **Impacto:** +3 Local SEO / E-E-A-T

### C5. Arreglar handle Telegram
- **Archivo:** `src/consts.ts`
- **Cambio:** `telegram.me/macotafood` → `telegram.me/mascotafood` (verificar cuál existe realmente)
- **Esfuerzo:** XS · **Impacto:** +1 Trust

---

## 🟠 HIGH — semana 1 (impacto ~+8 pts)

### H1. Listar marcas literales (Royal Canin, Hill's, Pro Plan, Nupec, etc.)
- **Archivo:** crear `src/components/Brands.astro` y añadir a `index.astro`
- **Assets:** logos en `public/brands/*.svg`
- **Esfuerzo:** M (3 h)
- **Impacto:** +5 AI Citation + long-tail rankings

### H2. Enumerar zonas de entrega con CPs
- **Archivo:** nueva sección `src/components/DeliveryArea.astro`
- **Contenido sugerido:** lista de colonias (Tecámac, Ojo de Agua, Los Héroes, Ecatepec…) con códigos postales, tiempos estimados.
- **Esfuerzo:** M (2 h)
- **Impacto:** +3 Local + AI Citation

### H3. Expandir FAQ de 5 a 15 preguntas long-tail
- **Archivo:** `src/consts.ts` → `FAQS` array
- **Preguntas sugeridas:** pago con tarjeta específica, tiempo de entrega por zona, pedido mínimo, alimento para razas específicas, muestras gratis, programa de lealtad, política de cambio, alimento medicado con receta, suscripción recurrente, horario de entrega, envío fuera de zona.
- **Esfuerzo:** M (2 h)
- **Impacto:** +3 Content + AI Citation

### H4. Reescribir sección "Nosotros" (72 → ~280 palabras)
- **Archivo:** `src/components/About.astro`
- **Incluir:** año de fundación, foto real del local, nombre del fundador/MVZ asesor, filosofía. Sustituir imágenes genéricas por foto real del establecimiento.
- **Esfuerzo:** M (3 h + sesión fotográfica separada)
- **Impacto:** +4 Experience/Expertise

### H5. Navegación móvil (hamburguesa)
- **Archivo:** `src/components/Header.astro`
- **Solución:** Drawer con `<details>` o Astro island mínima con Alpine/petite-vue.
- **Esfuerzo:** M (2 h)
- **Impacto:** +2 UX mobile; desbloquea scroll a secciones.

### H6. Preload del LCP hero
- **Archivo:** `src/layouts/Layout.astro` `<head>`
- **Snippet:**
  ```html
  <link rel="preload" as="image" href="/images/mascota.jpeg" fetchpriority="high" />
  ```
- **Esfuerzo:** XS · **Impacto:** +1 Performance (LCP ↓100–300 ms)

### H7. Arreglar 404s
- `/favicon.ico` → añadir o redirect a `/icons/icon.png`
- `og-image.jpg` → ya cubierto en C1
- **Esfuerzo:** XS

---

## 🟡 MEDIUM — semana 2–3 (impacto ~+6 pts)

### M1. Migrar imágenes a `astro:assets`
- **Archivos:** convertir `<img src="/images/...">` a `<Image src={...} />` en `Hero.astro`, `Products.astro`, `About.astro`, `Footer.astro`.
- Crear `src/assets/images.ts` exportando imports tipados.
- **Esfuerzo:** L (4 h)
- **Impacto:** +3 Performance + Images (WebP/AVIF + srcset automáticos, −500 KB total).

### M2. Lazy loading correcto en tarjetas de producto 1–4
- **Archivo:** `src/components/Products.astro`
- **Cambio:** `loading={idx < 4 ? 'eager' : 'lazy'}` → `loading={idx === 0 ? 'eager' : 'lazy'}` (solo hero LCP eager).
- **Esfuerzo:** XS

### M3. Consolidar Schema.org con `@graph`
- **Archivo:** `src/layouts/Layout.astro`
- **Acción:** remplazar los 3 bloques JSON-LD separados por un único `@graph` con `Organization` (logo `ImageObject`), `WebSite` (`@id`-linked), `PetStore` enriquecido con `geo`, `areaServed`, `paymentAccepted`, `currenciesAccepted`, `OfferCatalog` (8 categorías), `makesOffer` → `Service` para envío a domicilio.
- **Retirar** `FAQPage` JSON-LD (mantener HTML visible).
- Snippet listo en `schema.md`.
- **Esfuerzo:** M (2 h) · **Impacto:** +2 Schema

### M4. Horario visible en HTML (no solo en JSON-LD)
- **Archivo:** `src/components/Contact.astro` — añadir bloque "Horario" con días y horas.
- **Esfuerzo:** S (30 min) · **Impacto:** +1 Content + UX

### M5. Auto-hospedar Inter (reducir pesos de 5 a 2)
- **Acción:** `pnpm add @fontsource-variable/inter`, importar solo weights 400 y 700 en `global.css`. Eliminar links a Google Fonts en `Layout.astro`.
- **Esfuerzo:** S (30 min) · **Impacto:** +1 Performance, −2 request externos.

### M6. Eliminar `<meta name="keywords">`
- **Archivo:** `src/layouts/Layout.astro`
- **Esfuerzo:** XS · **Impacto:** neutro SEO, cleanup.

### M7. Arreglar `alt=""` del logo
- **Archivos:** `Header.astro` línea 14, `Footer.astro` línea 11
- **Cambio:** `alt=""` → `alt="Mascota Food"`
- **Esfuerzo:** XS · **Impacto:** +1 Images/A11y

### M8. Sitemap con `<lastmod>` real y `<image:image>`
- **Archivo:** `astro.config.mjs` — ajustar `@astrojs/sitemap` o servir sitemap custom con entradas de imagen.
- Remover `changefreq` y `priority` (ignorados por Google desde 2017).
- **Esfuerzo:** S (1 h)
- **Impacto:** +1 Sitemap.

### M9. Testimonios + `AggregateRating`
- **Archivo:** nueva sección `src/components/Testimonials.astro` con 3–5 reseñas reales (nombre, colonia, foto mascota).
- Añadir `aggregateRating` al JSON-LD de `PetStore` con `ratingValue` real basado en Google/Facebook.
- **Esfuerzo:** M (3 h, requiere recolectar reseñas)
- **Impacto:** +3 Trust + estrellas en SERP si Google las muestra.

---

## 🟢 LOW — backlog (impacto ~+2 pts)

### L1. Logo SVG en lugar de GIF
- Reemplazar `/icons/LogoMascotaFood.gif` con SVG (o WebP estático si la marca es bitmap).
- **Esfuerzo:** S (1 h si hay original vector).

### L2. Sitemap plano (quitar sitemap-index)
- Para un sitio de <1000 URLs, un `sitemap.xml` plano basta. Configurar en `@astrojs/sitemap`.
- **Esfuerzo:** XS

### L3. Diversificar CTAs "Consultar"
- Variar texto de enlaces en productos: "Consultar alimento para perros", "Ver bandanas", etc., para mejor UX/a11y además del `aria-label`.
- **Esfuerzo:** S

### L4. `/llms.txt` para AI crawlers
- **Archivo nuevo:** `public/llms.txt`
- **Contenido mínimo:**
  ```
  # Mascota Food
  > Tienda de alimento premium y accesorios para perros y gatos en Estado de México. Envío a domicilio gratis.

  ## Contacto
  - WhatsApp: https://wa.me/525554941191
  - Email: contacto@mascotafood.com

  ## Zonas de entrega
  [enumerar]
  ```
- **Esfuerzo:** XS · **Impacto:** +1 AI Search Readiness.

### L5. Desktop WhatsApp button a 44 px mínimo
- **Archivo:** `src/components/Header.astro` — cambiar `py-2` → `py-3` o añadir `min-h-[44px]`.
- **Esfuerzo:** XS

### L6. Remover namespaces no usados del sitemap
- **Esfuerzo:** XS

---

## Plan de ejecución sugerido

| Semana | Entregables | Score esperado |
|--------|-------------|----------------|
| 1 (Critical) | C1, C2, C3, C4, C5, H6, H7 | 70 → 78 |
| 2 (High) | H1, H2, H3, H4, H5 | 78 → 85 |
| 3 (Medium) | M1, M2, M3, M4, M5, M7, M9 | 85 → 90 |
| Backlog (Low) | L1–L6 | 90 → 92 |

## KPIs a monitorizar post-implementación

- Google Search Console: impresiones, CTR, posición promedio para "alimento premium mascotas Estado de México", "veterinaria [colonia]".
- Core Web Vitals (PageSpeed Insights + CrUX).
- Rich results: verificar que `PetStore` pase en [Rich Results Test](https://search.google.com/test/rich-results).
- Google Business Profile: reseñas, clicks a llamadas/direcciones.
- Citations en LLMs: probar "¿dónde comprar alimento premium en Tecámac?" en ChatGPT / Perplexity / Google AI Overviews antes y después.

---

*Plan generado 2026-04-16 a partir de `FULL-AUDIT-REPORT.md`. Re-auditar cada 4 semanas durante la implementación.*
