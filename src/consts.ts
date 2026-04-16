export const SITE = {
  name: 'Mascota Food',
  shortName: 'Mascota Food',
  tagline: 'Lo mejor para tu mejor amigo',
  description:
    'Tienda especializada en alimento premium para perros y gatos, accesorios, juguetes y artículos para mascotas en el Estado de México. Servicio a domicilio gratis.',
  url: 'https://mascotafood.com',
  locale: 'es_MX',
  phone: '+525554941191',
  phoneDisplay: '55 5494 1191',
  whatsapp: '525554941191',
  email: 'contacto@mascotafood.com',
  address: {
    locality: 'Villas del Real',
    region: 'Estado de México',
    country: 'MX',
  },
  social: {
    facebook: 'https://facebook.com/MascotaFoodVillas',
    telegram: 'https://telegram.me/macotafood',
    instagram: 'https://instagram.com/mascotafood',
  },
} as const;

export const NAV_LINKS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Productos', href: '#productos' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Preguntas', href: '#faq' },
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
    a: 'Sí, contamos con servicio a domicilio gratis dentro de nuestra zona de cobertura en el Estado de México. Pregunta por WhatsApp si tu colonia aplica.',
  },
  {
    q: '¿Qué marcas de alimento manejan?',
    a: 'Manejamos las principales marcas premium nacionales e importadas para perros y gatos, incluyendo opciones para razas específicas, cachorros, adultos, senior y dietas especiales.',
  },
  {
    q: '¿Venden alimento a granel?',
    a: 'Sí, ofrecemos alimento a granel de alta calidad para que lleves la cantidad exacta que necesitas, cuidando tu bolsillo y la frescura del producto.',
  },
  {
    q: '¿Puedo pagar con tarjeta?',
    a: 'Aceptamos pagos con tarjeta de crédito y débito, transferencia y efectivo, tanto en tienda como en entregas a domicilio.',
  },
  {
    q: '¿Tienen productos para gatos?',
    a: '¡Por supuesto! Contamos con alimento premium, arenas, juguetes, rascadores y accesorios especialmente pensados para gatos.',
  },
] as const;
