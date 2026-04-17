export const SITE = {
  name: 'Mascota Food',
  alternateName: 'Mascota Food Villas',
  localBrand: 'Mascota Food Villas',
  shortName: 'Mascota Food',
  tagline: 'Lo mejor para tu mejor amigo',
  localTagline: 'Tu tienda de mascotas en Villas de la Hacienda, Atizapán',
  description:
    'Mascota Food Villas — tienda de alimento premium para perros, gatos, conejos, tortugas y peces en Villas de la Hacienda, Atizapán de Zaragoza. Accesorios, juguetes y envío gratis en un radio de 3 km.',
  foundingYear: 2021,
  url: 'https://mascotafood.com',
  locale: 'es_MX',
  phone: '+525554941191',
  phoneDisplay: '55 5494 1191',
  whatsapp: '525554941191',
  email: 'contacto@mascotafood.com',
  address: {
    streetAddress: 'Mz. 1 Lt. 3, Hacienda de la Luz',
    neighborhood: 'Villas de la Hacienda',
    locality: 'Atizapán de Zaragoza',
    region: 'Estado de México',
    postalCode: '52929',
    country: 'MX',
    full: 'Mz. 1 Lt. 3, Hacienda de la Luz, Villas de la Hacienda, 52929 Atizapán de Zaragoza, Estado de México',
  },
  geo: {
    latitude: 19.601954,
    longitude: -99.228176,
  },
  maps: {
    url: 'https://maps.app.goo.gl/EcqN7MKR88JDs7WW7',
    embed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3758.5924414856513!2d-99.22817592566852!3d19.60195383525235!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d21d20333d3459%3A0xad8386b533d886f4!2sMASCOTA-FOOD!5e0!3m2!1ses-419!2smx!4v1776371791559!5m2!1ses-419!2smx',
    directions: 'https://www.google.com/maps/dir/?api=1&destination=19.601954,-99.228176&destination_place_id=ChIJWTQ9MyAd0oURsgbYM7OWg60',
    writeReview: 'https://g.page/r/CfSG2DO1hoOtEBM/review',
  },
  social: {
    facebook: 'https://www.facebook.com/MascotaFoodVillas',
    instagram: 'https://www.instagram.com/mascotafoodmx/',
  },
  policies: {
    minOrderMXN: 150,
    freeDeliveryRadiusKm: 3,
    payments: ['Efectivo', 'Transferencia', 'Tarjeta de crédito', 'Tarjeta de débito'],
  },
  hours: [
    { days: 'Lunes a Sábado', opens: '09:00', closes: '19:00' },
    { days: 'Domingo', opens: null, closes: null, note: 'Cerrado' },
  ],
} as const;

export const BRANDS = [
  // Perros (15)
  { name: 'Nupec', category: 'perros', tagline: 'Nutrición canina científica' },
  { name: 'Pro Plan', category: 'perros', tagline: 'Purina · fórmula premium' },
  { name: 'Royal Canin', category: 'perros', tagline: 'Sobre pedido · razas específicas' },
  { name: "Hill's", category: 'perros', tagline: 'Sobre pedido · prescripción veterinaria' },
  { name: 'Dog Chow', category: 'perros', tagline: 'Purina · nutrición completa' },
  { name: 'Pedigree', category: 'perros', tagline: 'Adultos y cachorros' },
  { name: 'Nucan', category: 'perros', tagline: 'Alimento canino balanceado' },
  { name: 'Ganador', category: 'perros', tagline: 'Alimento accesible' },
  { name: 'Campeón', category: 'perros', tagline: 'Nutrición diaria' },
  { name: 'Top Choice', category: 'perros', tagline: 'Económico y balanceado' },
  { name: 'Poder Canino', category: 'perros', tagline: 'Para todas las razas' },
  { name: 'Súper Can', category: 'perros', tagline: 'Alimento completo' },
  { name: 'Shaggy', category: 'perros', tagline: 'Alimento canino' },
  { name: 'Nutrescan', category: 'perros', tagline: 'Alimento balanceado' },
  { name: 'Alfa Dog', category: 'perros', tagline: 'Para razas grandes y medianas' },

  // Gatos (5)
  { name: 'Cat Chow', category: 'gatos', tagline: 'Purina · cada etapa felina' },
  { name: 'Minino', category: 'gatos', tagline: 'Diario y accesible' },
  { name: 'Felix', category: 'gatos', tagline: 'Purina · sabores irresistibles' },
  { name: 'Gatina', category: 'gatos', tagline: 'Alimento felino' },
  { name: 'Nucat Perfect Sense', category: 'gatos', tagline: 'Nutrición especializada' },

  // Arena / cuidado (1)
  { name: 'Alfa Cat', category: 'arena', tagline: 'Arena para gato' },
] as const;

export const BRAND_CATEGORIES = {
  perros: { label: 'Perros', icon: 'dog' },
  gatos: { label: 'Gatos', icon: 'cat' },
  arena: { label: 'Arenas para gato', icon: 'paw' },
} as const;

export const SMALL_PETS = [
  'Alimento para conejo',
  'Alimento para tortuga',
  'Alimento para pez',
] as const;

export const DELIVERY_ZONES = [
  { name: 'Villas de la Hacienda', postalCode: '52929', highlight: true, tier: 'primary' },
  { name: 'Hacienda de la Luz', postalCode: '52929', tier: 'primary' },
  { name: 'Lomas de la Hacienda', postalCode: '52925', tier: 'primary' },
  { name: 'Hacienda del Pedregal', postalCode: '52916', tier: 'primary' },
  { name: 'Adolfo López Mateos', postalCode: '52910', tier: 'primary' },
  { name: 'Lomas de Atizapán', postalCode: '52977', tier: 'primary' },
  { name: 'Las Arboledas', postalCode: '52950', tier: 'primary' },
  { name: 'Bosques de Atizapán', postalCode: '52967', tier: 'primary' },
] as const;

export const NEARBY_ZONES = [
  { name: 'San José el Jaral', postalCode: '52924' },
  { name: 'Villa Jardín', postalCode: '52923' },
  { name: 'Villa San José', postalCode: '52926' },
  { name: 'Jardines de Monterrey', postalCode: '52926' },
  { name: 'San Miguel Xochimanga', postalCode: '52927' },
  { name: 'Lomas de San Miguel', postalCode: '52928' },
  { name: 'Prados de Ixtacala', postalCode: '52928' },
  { name: 'El Pedregal de Atizapán', postalCode: '52948' },
  { name: 'Rinconada de las Arboledas', postalCode: '52945' },
  { name: 'Vergel de Arboledas', postalCode: '52945' },
  { name: 'Calacoaya', postalCode: '52990' },
  { name: 'Las Alamedas', postalCode: '52970' },
  { name: 'México Nuevo', postalCode: '52966' },
  { name: 'Condado de Sayavedra', postalCode: '52938' },
] as const;

export const POSTAL_CODE_RANGE = {
  primary: '52910–52977',
  description: 'Atizapán de Zaragoza (colonias 529XX)',
} as const;

export const REVIEWS = [
  {
    author: 'Jesús Hernández Bravo',
    rating: 5,
    date: '2025-04-16',
    relativeTime: 'Hace un año',
    text: 'Muy recomendable por atención y variedad de croquetas. No encontraba Nupec cachorros y aquí sí la tuvo. Adicional compré más artículos a buen precio y buena calidad. Sigan así chicos.',
  },
  {
    author: 'Antonieta Verdejo',
    rating: 5,
    date: '2025-04-16',
    relativeTime: 'Hace un año',
    text: 'Siempre muy atentos. Si no tienen el alimento que precisa tu mascota lo consiguen. Mi lugar favorito para comprar el alimento de mis mascotas.',
  },
  {
    author: 'María De La Paz Velasco Del Valle',
    rating: 5,
    date: '2024-04-16',
    relativeTime: 'Hace 2 años',
    text: 'Excelente servicio y muy bien surtido con diferentes marcas de croquetas para gatos y perros.',
  },
  {
    author: 'Jacobo',
    rating: 5,
    date: '2024-04-16',
    relativeTime: 'Hace 2 años',
    text: 'Excelente opción para conseguir alimento Nupec.',
  },
  {
    author: 'Luis Enriquez',
    rating: 5,
    date: '2024-04-16',
    relativeTime: 'Hace 2 años',
    text: 'Buen lugar, buen trato, el personal sabe del negocio. Lo recomiendo.',
  },
  {
    author: 'Sandra Zarza',
    rating: 5,
    date: '2023-04-16',
    relativeTime: 'Hace 3 años',
    text: '¡Excelentes precios y variedad de productos! Muy buena experiencia de compra.',
  },
] as const;

export const REVIEWS_AGGREGATE = {
  ratingValue: 4.8,
  reviewCount: 15,
  bestRating: 5,
  worstRating: 1,
} as const;

export const NAV_LINKS = [
  { label: 'Productos', href: '#productos' },
  { label: 'Marcas', href: '#marcas' },
  { label: 'Entregas', href: '#zonas' },
  { label: 'Opiniones', href: '#opiniones' },
  { label: 'Ubicación', href: '#ubicacion' },
  { label: 'Contacto', href: '#contacto' },
] as const;

export const PRODUCTS = [
  {
    title: 'Alimento premium para perros',
    description:
      'Marcas nacionales e importadas para todas las razas, edades y necesidades especiales.',
    image: '/images/alimentos_1.jpeg',
    badge: 'Más vendido',
  },
  {
    title: 'Alimento para gatos',
    description:
      'Croquetas y húmedo premium seleccionado para cada etapa de vida de tu gato.',
    image: '/images/alimentos_2.jpeg',
  },
  {
    title: 'Alimento a granel',
    description:
      'La misma calidad premium en la cantidad exacta que necesitas, sin desperdicio.',
    image: '/images/alimentos_3.jpeg',
    badge: 'Ahorra más',
  },
  {
    title: 'Premios y snacks',
    description:
      'Recompensas naturales, galletas y snacks funcionales para consentir a tu mascota.',
    image: '/images/alimentos_4.jpeg',
  },
  {
    title: 'Bandanas y accesorios',
    description:
      'Bandanas tejidas a mano, collares y accesorios de diseño para lucir a tu peludo.',
    image: '/images/bandanas_dogfriend.jpeg',
  },
  {
    title: 'Juguetes',
    description:
      'Juguetes resistentes, interactivos y mordedores que estimulan a tu mascota.',
    image: '/images/articulos.jpeg',
  },
  {
    title: 'Camas y descanso',
    description:
      'Camas acolchadas, cojines y tapetes térmicos para el mejor descanso.',
    image: '/images/camas.jpeg',
  },
  {
    title: 'Transportadoras',
    description:
      'Llévalo a donde sea, pero seguro. Transportadoras cómodas y certificadas.',
    image: '/images/cargador.jpeg',
  },
] as const;

export const FAQS = [
  {
    q: '¿Hacen envíos a domicilio?',
    a: 'Sí. El envío es gratis dentro de un radio de 3 km desde nuestra tienda en Villas de la Hacienda. A distancias mayores aplica un costo de envío que te confirmamos por WhatsApp según tu dirección.',
  },
  {
    q: '¿Cuál es el pedido mínimo?',
    a: 'El pedido mínimo a domicilio es de $150 MXN. No hay mínimo para compras en tienda.',
  },
  {
    q: '¿Qué métodos de pago aceptan?',
    a: 'Aceptamos efectivo, transferencia bancaria y tarjeta de crédito o débito, tanto en tienda como en entregas a domicilio.',
  },
  {
    q: '¿Dónde están ubicados?',
    a: 'Nos encuentras en Mz. 1 Lt. 3, Hacienda de la Luz, dentro de Villas de la Hacienda, en Atizapán de Zaragoza, Estado de México (CP 52929). En la sección "Visítanos" puedes abrir la ruta directa en Google Maps o Waze.',
  },
  {
    q: '¿Cuál es su horario?',
    a: 'Atendemos de lunes a sábado de 9:00 a 19:00. Los domingos permanecemos cerrados.',
  },
  {
    q: '¿Qué marcas de alimento manejan?',
    a: 'Para perro: Nupec, Pro Plan, Dog Chow, Pedigree, Nucan, Ganador, Campeón, Top Choice, Poder Canino, Súper Can, Shaggy, Nutrescan, Alfa Dog y más. Royal Canin y Hill\'s los traemos sobre pedido. Para gato: Cat Chow, Minino, Felix, Gatina y Nucat Perfect Sense.',
  },
  {
    q: '¿Tienen Royal Canin o Hill\'s?',
    a: 'Sí, ambas marcas las manejamos sobre pedido. Escríbenos por WhatsApp con la presentación específica que necesitas y te confirmamos tiempo de entrega y precio.',
  },
  {
    q: '¿Venden alimento a granel?',
    a: 'Sí, ofrecemos alimento a granel para que lleves la cantidad exacta que necesitas, cuidando tu bolsillo y la frescura del producto.',
  },
  {
    q: '¿Tienen productos para gatos?',
    a: 'Sí: alimento premium (Cat Chow, Minino, Felix, Gatina, Nucat Perfect Sense), arena Alfa Cat, juguetes, rascadores y accesorios.',
  },
  {
    q: '¿Manejan productos para otras mascotas?',
    a: 'Sí, contamos con alimento para conejo, tortuga y pez. También accesorios, juguetes, transportadoras, casas y camas para tu mascota.',
  },
  {
    q: '¿A qué zonas llegan con el servicio a domicilio?',
    a: 'Entrega gratuita en un radio de 3 km alrededor de Villas de la Hacienda: principalmente Hacienda de la Luz, Lomas de la Hacienda, Adolfo López Mateos, Hacienda del Pedregal, Lomas de Atizapán, Las Arboledas y Bosques de Atizapán. A distancias mayores confirmamos costo de envío y tiempos por WhatsApp.',
  },
] as const;
