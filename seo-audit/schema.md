# Schema.org Audit — mascotafood.com

Audited: 2026-04-16 · Source: `/tmp/mascotafood-home.html`

## 1. Detected JSON-LD Blocks

Three blocks found, all JSON-LD, all parseable:

| # | @type | Parseable | Required fields | Status |
|---|-------|-----------|-----------------|--------|
| 1 | `PetStore` | Yes | name, address, url, telephone | PASS |
| 2 | `WebSite` | Yes | name, url | PASS |
| 3 | `FAQPage` | Yes | mainEntity[].name, acceptedAnswer.text | PASS (see warning) |

### Validation details

**PetStore** — clean. Uses `https://schema.org`, absolute URLs, valid ISO times, proper `OpeningHoursSpecification` arrays, valid ISO 3166 country code `MX`. `priceRange` `$$` is accepted.

**WebSite** — minimal but valid. Missing `potentialAction` (SearchAction) — not applicable since this is a single-page site with no search endpoint.

**FAQPage** — structurally valid, but **CRITICAL WARNING**: Google restricted FAQ rich results in August 2023 to **government and healthcare authority sites only**. A pet store will not get rich results from this markup. It is not penalized, but it adds no SEO value. [SEVERITY: MEDIUM] Recommend removing the JSON-LD (keep the visible `<details>` HTML for UX).

## 2. Gaps and Opportunities

| Gap | Severity | Rationale |
|-----|----------|-----------|
| No `geo` coordinates on PetStore | HIGH | Local pack / Maps rely on lat/lng |
| No `areaServed` | HIGH | Business advertises home delivery; defines service radius |
| No `paymentAccepted` / `currenciesAccepted` | MEDIUM | FAQ answers Card/Transfer/Cash — surface it as data |
| `logo` as string, not `ImageObject` | LOW | Google prefers `ImageObject` with width/height for logo knowledge-panel eligibility |
| No `Service` for home delivery | MEDIUM | Key differentiator ("Servicio a domicilio gratis") |
| No `OfferCatalog` for 8 categories | MEDIUM | Gives crawlers a machine-readable product taxonomy on a single-page site |
| `BreadcrumbList` | SKIP | Single-page site with hash anchors — low value, do not add |
| No `hasMap` | LOW | Add a Google Maps URL once a public business profile exists |
| `@id` anchors missing across nodes | LOW | Linking nodes via `@id` improves entity graph clarity |

## 3. Recommended JSON-LD (copy-paste)

Consolidate into one graph. Replace the three existing blocks with the single `@graph` below.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://mascotafood.com/#organization",
      "name": "Mascota Food",
      "url": "https://mascotafood.com/",
      "logo": {
        "@type": "ImageObject",
        "url": "https://mascotafood.com/icons/LogoMascotaFood.gif",
        "width": 512,
        "height": 512
      },
      "email": "contacto@mascotafood.com",
      "telephone": "+525554941191",
      "sameAs": [
        "https://facebook.com/MascotaFoodVillas",
        "https://telegram.me/macotafood",
        "https://instagram.com/mascotafood",
        "https://wa.me/525554941191"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://mascotafood.com/#website",
      "url": "https://mascotafood.com/",
      "name": "Mascota Food",
      "inLanguage": "es-MX",
      "publisher": { "@id": "https://mascotafood.com/#organization" }
    },
    {
      "@type": "PetStore",
      "@id": "https://mascotafood.com/#petstore",
      "name": "Mascota Food",
      "description": "Tienda especializada en alimento premium para perros y gatos, accesorios, juguetes y artículos para mascotas en el Estado de México. Servicio a domicilio gratis.",
      "url": "https://mascotafood.com/",
      "image": "https://mascotafood.com/og-image.jpg",
      "logo": "https://mascotafood.com/icons/LogoMascotaFood.gif",
      "telephone": "+525554941191",
      "email": "contacto@mascotafood.com",
      "priceRange": "$$",
      "currenciesAccepted": "MXN",
      "paymentAccepted": "Cash, Credit Card, Debit Card, Bank Transfer",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Villas del Real",
        "addressRegion": "Estado de México",
        "addressCountry": "MX"
      },
      "areaServed": {
        "@type": "AdministrativeArea",
        "name": "Estado de México"
      },
      "sameAs": [
        "https://facebook.com/MascotaFoodVillas",
        "https://telegram.me/macotafood",
        "https://instagram.com/mascotafood"
      ],
      "openingHoursSpecification": [
        { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"], "opens": "09:00", "closes": "20:00" },
        { "@type": "OpeningHoursSpecification", "dayOfWeek": "Sunday", "opens": "10:00", "closes": "16:00" }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Catálogo Mascota Food",
        "itemListElement": [
          { "@type": "OfferCatalog", "name": "Alimento premium para perros" },
          { "@type": "OfferCatalog", "name": "Alimento para gatos" },
          { "@type": "OfferCatalog", "name": "Alimento a granel" },
          { "@type": "OfferCatalog", "name": "Premios y snacks" },
          { "@type": "OfferCatalog", "name": "Bandanas y accesorios" },
          { "@type": "OfferCatalog", "name": "Juguetes" },
          { "@type": "OfferCatalog", "name": "Camas y descanso" },
          { "@type": "OfferCatalog", "name": "Transportadoras" }
        ]
      },
      "makesOffer": {
        "@type": "Offer",
        "priceCurrency": "MXN",
        "price": "0",
        "itemOffered": {
          "@type": "Service",
          "name": "Servicio a domicilio gratis",
          "serviceType": "HomeDelivery",
          "provider": { "@id": "https://mascotafood.com/#organization" },
          "areaServed": { "@type": "AdministrativeArea", "name": "Estado de México" },
          "availableChannel": {
            "@type": "ServiceChannel",
            "serviceUrl": "https://wa.me/525554941191",
            "servicePhone": "+525554941191"
          }
        }
      }
    }
  ]
}
</script>
```

### Action list

1. [HIGH] Replace the three existing JSON-LD blocks with the `@graph` above.
2. [MEDIUM] Remove the `FAQPage` block — no rich-result eligibility; keep HTML `<details>`.
3. [HIGH] Add real `geo` lat/lng to PetStore once a GMB / Maps pin is chosen, plus `hasMap` pointing at the Maps URL.
4. [LOW] Once products have real SKUs/prices, promote categories from `OfferCatalog` name-only entries to full `Product` + `Offer` nodes.

Validate at: `https://search.google.com/test/rich-results?url=https://mascotafood.com/` and `https://validator.schema.org/`.

File: /Users/zarza/Documents/projects/mascota-food/seo-audit/schema.md
