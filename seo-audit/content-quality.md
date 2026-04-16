# Auditoría de Calidad de Contenido y E-E-A-T — mascotafood.com

**Fecha:** 2026-04-16 | **Tipo:** Landing single-page (es-MX) | **Vertical:** Retail mascotas local
**Puntuación global de contenido:** 52/100 | **AI Citation Readiness:** 38/100

---

## 1. Puntuación E-E-A-T

| Factor | Peso | Score | Evidencia |
|---|---|---|---|
| Experience | 20% | 4/10 | Menciona "tienda familiar" y "también tiene mascota", pero **sin historia del fundador, años de operación, fotos reales del local o equipo**. |
| Expertise | 25% | 4/10 | Promete "asesoría de expertos" sin credenciales: no hay veterinario asociado, guías de alimentación, ni contenido educativo. |
| Authoritativeness | 25% | 3/10 | Sin marcas específicas listadas, sin sellos (Profeco, cámaras), sin prensa/menciones externas. |
| Trustworthiness | 30% | 6/10 | NAP parcial (tel + email + locality), Schema PetStore correcto, horarios estructurados. **Falta dirección completa, política de devoluciones, aviso de privacidad.** |

**E-E-A-T ponderado:** 4.3/10

---

## 2. Hallazgos por severidad

### CRÍTICO

- **[Trust] Sin dirección física completa.** Schema sólo incluye `addressLocality: "Villas del Real"`. Falta calle, número, CP y municipio. Rompe consistencia NAP con Google Business Profile y debilita E-A-T local.
- **[Trust] Sin aviso de privacidad / términos / política de devoluciones.** Obligatorio en MX (LFPDPPP) y exigido por QRG para e-commerce (YMYL adyacente: gasto recurrente + datos de pago).
- **[Experience] Cero señales de experiencia real.** No hay: año de fundación, foto del local, foto del equipo, historia del negocio, casos reales de clientes.
- **[AI Citation] Claims genéricos sin especificidad.** "Marcas premium nacionales e importadas" es no-citable. Un LLM no puede responder "¿venden Royal Canin en Villas del Real?" desde este contenido.

### ALTO

- **[Thin content] Sección "Nosotros" = 72 palabras.** Insuficiente para una landing que soporta todo el sitio. Recomendado: 250-350 palabras con historia + misión + diferenciadores concretos.
- **[Thin content] FAQ de sólo 5 preguntas genéricas.** Respuestas promedio de 22 palabras. Ver sección 5 para preguntas sugeridas.
- **[Expertise] "Asesoría personalizada" sin respaldo.** Sin nombre de asesor, sin certificación (MVZ, nutriólogo animal), sin ejemplos de casos resueltos.
- **[Local] "Zona de cobertura" indefinida.** La landing repite la frase 4 veces pero nunca enumera colonias/CPs. Bloquea búsquedas locales tipo "envío mascotas Coacalco" o "tienda mascotas Ecatepec".
- **[Authority] No lista marcas.** Las páginas que rankean por "tienda alimento premium" listan: Royal Canin, Hill's, Pro Plan, Diamond Naturals, Taste of the Wild, Nupec, Eukanuba, Acana. Aquí: cero.

### MEDIO

- **[Content] Conteo total de palabras visibles ~510.** Por debajo del mínimo homepage (500) sólo por un margen; y funciona como service page donde el piso es 800. Topical coverage insuficiente.
- **[Freshness] Sin señales de actualización.** No hay blog, ni fecha de "última actualización", ni precios/stock visibles que indiquen vida.
- **[Trust] Sin reseñas/testimonios.** Ni Schema `AggregateRating`, ni widget de Google, ni capturas. Un pet store local sin prueba social pierde conversión y E-A-T.
- **[AI Citation] Stat claims no verificables.** "+30 marcas" y "500+ productos" sin soporte ni página de catálogo. Riesgo de hallucination cruzada.
- **[Readability] Párrafos cortos (bien), pero headings H3 de tarjetas repetitivos** ("Consultar" x8). Sin jerarquía semántica que un LLM pueda mapear a intents.

### BAJO

- **[Local] Horario en Schema sí está por día** (bueno), pero **no aparece visible en el HTML** para usuarios/LLMs que no parsean JSON-LD.
- **[Brand] Telegram handle mal escrito** (`macotafood` en vez de `mascotafood`) — rompe consistencia de marca.
- **[Copyright] "© 2026"** — correcto para fecha actual, pero sin "desde 20XX" que genere señal de antigüedad.

---

## 3. Substancia por sección (palabras visibles)

| Sección | Palabras | Veredicto |
|---|---|---|
| Hero | 48 | OK para hero |
| Value props (4 cards) | 52 | Delgada: 13 pal/card |
| Productos (8 cards) | 128 | Delgada: 16 pal/card, sin precios/marcas |
| Nosotros | 72 | **Insuficiente** |
| FAQ | 145 | **Insuficiente** (5 Q cortas) |
| Contacto | 35 | OK |
| **Total** | **~510** | Por debajo del estándar para landing única |

---

## 4. Sugerencias concretas de copy

### 4.1 Reescritura de "Nosotros" (de 72 → ~280 palabras)

> **Mascota Food nació en 2021 en Villas del Real, Tecámac, cuando [Nombre], después de años trabajando con [experiencia], no encontraba alimento premium accesible para su propia perra [Nombre]. Lo que empezó como pedidos compartidos con vecinos, hoy es una tienda familiar que atiende a más de [N] familias en Tecámac, Ojo de Agua, Los Héroes y Ecatepec.**
>
> **Trabajamos con más de 30 marcas —entre ellas Royal Canin, Hill's Science Diet, Pro Plan, Nupec, Diamond Naturals y Taste of the Wild— seleccionadas con la asesoría de [MVZ Nombre, Cédula XXXXX], nuestro médico veterinario de cabecera.**
>
> **Cada pedido llega a tu puerta sin costo en un rango de 7 km, el mismo día si nos escribes antes de las 2:00 pm...**

### 4.2 FAQ a agregar (para AI citation + long-tail)

1. ¿Qué colonias cubre el envío gratis? (lista con CPs: 55749, 55764, 55770…)
2. ¿Cuánto tarda la entrega a domicilio?
3. ¿Qué marcas de alimento premium manejan? (lista literal)
4. ¿Tienen alimento para cachorros / senior / razas pequeñas / esterilizados?
5. ¿Dan muestras o probadores antes de comprar un saco completo?
6. ¿Tienen programa de lealtad o descuentos por saco frecuente?
7. ¿Qué pasa si mi mascota no acepta el alimento? (política de cambio)
8. ¿Venden arena para gatos, correas, bozales, ropa?
9. ¿Cuál es el pedido mínimo para envío gratis?
10. ¿Puedo agendar entregas recurrentes mensuales?

### 4.3 Elementos que faltan vs. competidores (Petco, Maskota, +Kota local)

- Testimonios con nombre + colonia + foto de mascota (Schema `Review`)
- Logos de marcas que vende (section "Nuestras marcas")
- Mapa embebido de zona de cobertura
- Horario visible por día (no sólo en JSON-LD)
- Blog con 3-5 artículos de nutrición (señal E-E-A-T + freshness)
- Sello "Servicio desde [año]"
- Programa de lealtad / referidos
- Política de devoluciones y cambios

---

## 5. Readiness para citación por LLMs

**Preguntas que la página NO puede responder hoy:**
- "¿Dónde comprar Royal Canin en Estado de México con envío gratis?" → No menciona marcas.
- "¿Qué colonias cubre Mascota Food?" → "Zona de cobertura" sin enumerar.
- "¿Cuál es el horario de Mascota Food los domingos?" → Sólo en JSON-LD, no en HTML visible.
- "¿Mascota Food vende alimento para cachorros golden retriever?" → Sin taxonomía de productos por raza/edad.

**Acciones para subir AI citation a 70+:**
1. Listar marcas literales en HTML (no sólo imágenes).
2. Agregar tabla de zona de cobertura con colonias + CP.
3. Publicar horario visible debajo del footer.
4. Agregar `AggregateRating` con reseñas reales (mín. 10).
5. Incluir rangos de precio por categoría ("Croquetas premium desde $450 / 4kg").

---

## 6. Recomendación de prioridad

1. **[Semana 1]** Dirección completa + aviso de privacidad + horario visible + listar marcas.
2. **[Semana 2]** Reescribir "Nosotros" con historia + MVZ asesor + zonas con CP.
3. **[Semana 3]** FAQ expandido a 10-12 preguntas + sección de testimonios con Schema.
4. **[Mes 2]** Blog `/blog/` con 5 artículos seed (nutrición canina, transición de alimento, FAQ por raza).

**Impacto estimado en score:** 52 → 78 tras semanas 1-3.
