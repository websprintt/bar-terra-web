import { MenuItem, BreakfastItem, RacionItem, BocadilloItem, WineBeerItem, Review, SportsEvent, FAQItem } from './types';

export const IMAGES = {
  hero: 'src/assets/images/bar_terra_hero_1779824535578.png',
  tapasFeatured: 'src/assets/images/bar_terra_tapas_1779824555012.png',
  raciones: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=600',
  bocadillos: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&q=80&w=600',
  tortillas: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=600',
  bebidas: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&q=80&w=600',
};

// Original MENU_ITEMS kept as fallback or for featured list
export const MENU_ITEMS: MenuItem[] = [
  {
    id: 't1',
    name: 'Croquetas de Cecina',
    description: 'Nuestra especialidad estrella: súper crujientes por fuera, extremadamente cremosas y melosas por dentro, con el toque inconfundible de cecina de León seleccionada.',
    price: '7.00€ Media ración / 12.00€ Ración',
    category: 'tapas',
    isPopular: true,
    isSpecialty: true
  },
  {
    id: 't2',
    name: 'Tapa de Oreja Adobada',
    description: 'Señera de Bar Terra. Crujiente, perfectamente dorada con ajo, perejil y un toque secreto de guindilla.',
    price: '8.00€ Media ración / 15.00€ Ración',
    category: 'tapas',
    isPopular: true,
    isSpecialty: true
  },
  {
    id: 't3',
    name: 'Torreznos Soria',
    description: 'Crujientes y tiernos cortes de torrezno con una textura excepcional.',
    price: '8.00€ Media ración / 15.00€ Ración',
    category: 'tapas',
    isPopular: true
  }
];

// --- 🍳 DESAYUNOS Y OFERTAS ---
export const BREAKFAST_ITEMS: BreakfastItem[] = [
  // Bebidas
  { id: 'b_caf', name: 'Café', type: 'bebida', priceFull: '1.50€', description: 'Café premium de tueste natural cortado, solo o con leche.' },
  { id: 'b_bom', name: 'Café Bombón', type: 'bebida', priceFull: '1.80€', description: 'Deliciosa combinación de café con leche condensada.' },
  { id: 'b_inf', name: 'Infusiones', type: 'bebida', priceFull: '1.50€', description: 'Manzanilla, menta poleo, té verde o té negro.' },
  { id: 'b_roo', name: 'Rooibos', type: 'bebida', priceFull: '2.20€', description: 'Exótica infusión dulce libre de teína.' },
  { id: 'b_col', name: 'Cola Cao', type: 'bebida', priceFull: '1.80€', description: 'El tradicional batido de cacao caliente reconfortante.' },

  // Tostadas
  { id: 't_tom', name: 'Tostada con Tomate / Mantequilla / Mermelada', type: 'tostada', priceHalf: '1.80€', priceFull: '3.00€', description: 'Aceite de oliva virgen extra y tomate tamizado natural, o mantequilla de Soria con mermelada.' },
  { id: 't_jam', name: 'Tostada con Jamón', type: 'tostada', priceHalf: '2.50€', priceFull: '4.00€', description: 'Con tomate rallado y láminas finas de jamón de bodega.' },
  { id: 't_com', name: 'Tostada con Bacon / Lomo / Magreta / York', type: 'tostada', priceHalf: '2.00€', priceFull: '3.50€', description: 'Tu ingrediente preferido recién hecho a la plancha sobre pan rústico.' },
  { id: 't_san', name: 'Sándwich Vegetal o Mixto', type: 'tostada', priceFull: '3.50€', description: 'Preparado al momento con ingredientes seleccionados.' },

  // Combos de Oferta
  { id: 'c_to1', name: 'Café + 1/2 Tostada', type: 'combo', priceFull: '3.00€', description: 'Tu desayuno estándar ideal para comenzar el día.' },
  { id: 'c_to2', name: 'Café + 1/2 Tostada de Jamón', type: 'combo', priceFull: '3.50€', description: 'Desayuno completo con el toque ibérico apetecible.' },
  { id: 'c_pulg', name: 'Café + Pulga', type: 'combo', priceFull: '3.50€', description: 'Café acompañado de una pulguita caliente a elegir.' },
  { id: 'c_puljam', name: 'Café + Pulga de Jamón', type: 'combo', priceFull: '3.70€', description: 'La opción predilecta de nuestros mañaneros.' },
  { id: 'c_port', name: 'Café + Pincho de Tortilla', type: 'combo', priceFull: '4.00€', description: 'La clásica tortilla cremosa de Bar Terra junto a tu café caliente.' }
];

// --- 🍽️ RACIONES ---
export const RACION_ITEMS: RacionItem[] = [
  { id: 'rac_bra', name: 'Bravas / Ali Oli', priceHalf: '6.00€', priceFull: '10.00€', description: 'Patatas fritas rústicas cortadas a mano con salsa brava o alioli tradicional.' },
  { id: 'rac_ens', name: 'Ensalada Mixta', priceHalf: '7.00€', priceFull: '12.00€', description: 'Lechuga fresca, tomate, cebolla, huevo duro, aceitunas y atún de calidad.' },
  { id: 'rac_nug', name: 'Nuggets / Fingers / Salchichas', priceHalf: '7.00€', priceFull: '12.00€', description: 'Excelente plato infantil o para picar con patatas fritas crujientes.' },
  { id: 'rac_ali', name: 'Alitas de Pollo', priceHalf: '7.00€', priceFull: '12.00€', description: 'Alitas bien adobadas fritas hasta quedar súper crujientes con patatas.' },
  { id: 'rac_cro', name: 'Croquetas de la Casa', priceHalf: '7.00€', priceFull: '12.00€', isPopular: true, isSpecialty: true, description: 'Ración de nuestras croquetas melosas de cecina u jamón.' },
  { id: 'rac_jam', name: 'Jamón Crujiente Bodega', priceHalf: '10.00€', priceFull: '18.00€', description: 'Finas y sabrosas lonchas de jamón curado cortado al momento.' },
  { id: 'rac_que', name: 'Queso Manchego Curado', priceHalf: '8.00€', priceFull: '15.00€', description: 'Auténtico sabor de la tierra, curado a la perfección.' },
  { id: 'rac_jq', name: 'Surtido Jamón y Queso', priceHalf: '9.00€', priceFull: '16.00€', description: 'La combinación ideal del embutido nacional por excelencia.' },
  { id: 'rac_rot', name: 'Huevos Rotos con Jamón o Chorizo de Venao', priceHalf: '9.00€', priceFull: '16.00€', isPopular: true, description: 'Cama de patatas, huevos fritos camperos y aderezo a elegir.' },
  { id: 'rac_tor', name: 'Torreznos Soria', priceHalf: '8.00€', priceFull: '15.00€', isPopular: true, description: 'Corte gordo con corteza burbujeante y crujiente, jugosos por dentro.' },
  { id: 'rac_ore', name: 'Oreja Adobada al Grill', priceHalf: '8.00€', priceFull: '15.00€', isPopular: true, isSpecialty: true, description: 'La receta mítica de Bar Terra: tierna por dentro y crujiente en plancha.' },
  { id: 'rac_rej', name: 'Rejos Crujientes', priceHalf: '8.00€', priceFull: '15.00€', description: 'Rejos tiernos enharinados y fritos al estilo andaluz.' },
  { id: 'rac_cal', name: 'Calamares a la Plancha o Romana', priceHalf: '8.00€', priceFull: '15.00€', description: 'Tiernas anillas de calamar acompañadas de alioli artesanal.' },
  { id: 'rac_boq', name: 'Boquerones Fritos', priceHalf: '8.00€', priceFull: '15.00€', description: 'Boquerones fresquísimos, fritos en un rebozado finísimo sin grasa.' },
  { id: 'rac_gam', name: 'Gambas Rebozadas', priceHalf: '8.00€', priceFull: '15.00€', description: 'Gambas jugosas rebozadas en tempura crujiente.' },
  { id: 'rac_caz', name: 'Cazón en Adobo', priceHalf: '8.00€', priceFull: '15.00€', isPopular: true, description: 'Especialidad de pescado adobado con vinagre de jerez, orégano y frito.' },
  { id: 'rac_tor_pat', name: 'Tortilla de Patata al gusto', priceFull: '16.00€', isSpecialty: true, description: 'Entera hecha al momento (rellena, con o sin cebolla) jugosa para compartir.' }
];

// --- 🥖 PULGAS, MONTADOS Y BOCADILLOS ---
export const BOCADILLO_ITEMS: BocadilloItem[] = [
  {
    id: 'boc_jam',
    name: 'Jamón de Bodega',
    pricePulga: '2.70€',
    priceMontado: '4.00€',
    priceBocadillo: '7.00€',
    description: 'Jamón cortado fino con tomate rallado natural.',
    isPopular: true
  },
  {
    id: 'boc_los',
    name: 'Lomo / Panceta / Magreta / Bacon / York / Pollo',
    pricePulga: '2.50€',
    priceMontado: '3.50€',
    priceBocadillo: '6.00€',
    description: 'Ingredientes de primera calidad cocinados al punto sobre la plancha.',
    hasCheeseOption: true,
    pricePulgaCheese: '2.70€',
    priceMontadoCheese: '4.00€',
    priceBocadilloCheese: '7.00€'
  },
  {
    id: 'boc_sal',
    name: 'Salchichón / Chorizo / Morcilla',
    pricePulga: '2.50€',
    priceMontado: '3.50€',
    priceBocadillo: '6.00€',
    description: 'Tradición local en panes artesanos deliciosos.'
  },
  {
    id: 'boc_ven',
    name: 'Chorizo de Venao',
    pricePulga: '2.70€',
    priceMontado: '4.00€',
    priceBocadillo: '7.00€',
    description: 'Embutido serrano potente, típico de nuestra serranía.',
    isSpecialty: true,
    isPopular: true
  },
  {
    id: 'boc_atu',
    name: 'Atún del Norte',
    pricePulga: '2.50€',
    priceMontado: '3.50€',
    priceBocadillo: '6.00€',
    description: 'Con pimientos rojos asados de la huerta.'
  },
  {
    id: 'boc_cal',
    name: 'Calamares Fritos',
    pricePulga: '2.70€',
    priceMontado: '4.00€',
    priceBocadillo: '7.00€',
    description: 'El clásico bocadillo madrileño con un toque de alioli.',
    isPopular: true
  },
  {
    id: 'boc_tor',
    name: 'Tortilla de Patatas',
    pricePulga: '2.50€',
    priceMontado: '3.50€',
    priceBocadillo: '6.00€',
    description: 'Un trozo generoso de nuestra icónica y jugosa tortilla de patatas clásica.'
  }
];

// Extras de Tortilla extras
export const EXTRA_TORTILLAS = [
  { name: 'Pincho de Tortilla', price: '3.50€', desc: 'Un trozo generoso calentito servido con tu caña.' },
  { name: 'Mini Tortilla al gusto hecha al momento', price: '4.00€', desc: 'Con cebolla, chorizo, queso de cabra u cecina.' }
];

// --- 🍷 BEBIDAS (CERVEZAS Y VINOS) ---
export const WINE_BEER_ITEMS: WineBeerItem[] = [
  // Cervezas Especiales
  { id: 'wb_c_mae', name: 'Mahou Maestra', type: 'cerveza', price: '3.20€', isPopular: true, description: 'Cerveza tostada de doble lúpulo con gran cuerpo y sabor intenso.' },
  { id: 'wb_c_res', name: 'Mahou Reserva', type: 'cerveza', price: '3.20€', description: 'Intensidad equilibrada de malta caramelo seleccionada.' },
  { id: 'wb_c_alh', name: 'Alhambra Especial', type: 'cerveza', price: '3.20€', description: 'Una lager de baja fermentación, icónica y refrescante.' },
  { id: 'wb_c_cor', name: 'Coronita Extra', type: 'cerveza', price: '3.20€', description: 'La popular cerveza mexicana servida con su rodajita de lima.' },

  // Vinos Blancos
  { id: 'wb_vb_jfe', name: 'J. Fernando (Blanco)', type: 'vino_blanco', price: '2.50€', description: 'Fresco e ideal para acompañar tus frituras y pescados.' },
  { id: 'wb_vb_mma', name: 'Mucho Más (Blanco)', type: 'vino_blanco', price: '2.50€', description: 'Fácil de beber, afrutado, floral y muy refrescante.' },
  { id: 'wb_vb_vcu', name: 'Viña Cuerva (Blanco)', type: 'vino_blanco', price: '2.50€', description: 'Vino de la comarca con notas cítricas balanceadas.' },
  { id: 'wb_vb_vxe', name: 'Viña Xetar (Blanco Dulce)', type: 'vino_blanco', price: '2.50€', description: 'Refrescante, con aguja natural dulce.' },
  { id: 'wb_vb_yug', name: 'Yugo (Blanco)', type: 'vino_blanco', price: '2.50€', description: 'Auténtico Airén manchego con gran frescura.' },

  // Vinos Tintos
  { id: 'wb_vt_dca', name: 'Dehesa del Carrizal', type: 'vino_tinto', price: '3.50€', isSpecialty: true, description: 'Pago Selección excepcional de Ciudad Real, intenso y complejo.' },
  { id: 'wb_vt_pca', name: 'Pago de los Capellanes', type: 'vino_tinto', price: '3.50€', isPopular: true, description: 'Ribera del Duero emblemático, equilibrio elegante.' },
  { id: 'wb_vt_lay', name: 'Laya Tinto', type: 'vino_tinto', price: '3.00€', description: 'Garnacha Tintorera carnosa, sabrosa y golosa.' },
  { id: 'wb_vt_rbi', name: 'Ramón Bilbao (Crianza)', type: 'vino_tinto', price: '3.00€', description: 'El Rioja clásico por excelencia que nunca falla.' },
  { id: 'wb_vt_res', name: 'Rupestre Esencia', type: 'vino_tinto', price: '3.00€', description: 'Excelente tinto de Almansa con notas amaderadas.' },
  { id: 'wb_vt_cor', name: 'Corcovo (Tinto)', type: 'vino_tinto', price: '2.50€', description: 'Valdepeñas tinto joven de gran suavidad.' },
  { id: 'wb_vt_mma', name: 'Mucho Más (Tinto)', type: 'vino_tinto', price: '2.50€', description: 'Tempranillo-Syrah sedoso, goloso y aromático.' },
  { id: 'wb_vt_ppa', name: 'Paso a Paso', type: 'vino_tinto', price: '2.50€', description: 'Tempranillo ecológico de viñedos viejos.' },
  { id: 'wb_vt_rup', name: 'Rupestre (Tinto)', type: 'vino_tinto', price: '2.50€', description: 'Syrah-Monastrell de excelente trago diario.' },
  { id: 'wb_vt_vxe', name: 'Viña Xetar (Tinto Dulce)', type: 'vino_tinto', price: '2.50€', description: 'Vino tinto de aguja dulce y afrutado.' },
  { id: 'wb_vt_yug', name: 'Yugo (Tinto)', type: 'vino_tinto', price: '2.50€', description: 'Tempranillo de selección con crianza breve, muy redondo.' }
];

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    author: 'Alberto G. O.',
    rating: 5,
    text: 'Muy buen trato, buenas tapas, raciones copas y bocatas gigantes. Da gusto pasarte los fines de semana a tomar la caña.',
    date: 'Hace 3 semanas',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100'
  },
  {
    id: 'r2',
    author: 'Elena Ruiz',
    rating: 5,
    text: 'Recomiendo muchísimo la oreja adobada a la plancha (espectacular de crujiente) y las croquetas que están ultra cremosas. Calidad-precio de 10 en Ciudad Real.',
    date: 'Hace 1 mes',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100'
  },
  {
    id: 'r3',
    author: 'José Manuel S.',
    rating: 5,
    text: 'Un buen sitio donde ver la F1, las motos en MotoGP y tomarse unas cervezas Mahou fresquitas. El ambiente de deporte y motor es de lo mejor.',
    date: 'Hace 2 meses',
    avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=100'
  },
  {
    id: 'r4',
    author: 'María José Castro',
    rating: 4,
    text: 'Las raciones de oreja y los torreznos son súper abundantes y el personal es muy cercano. La tortilla rellena te da una grata sorpresa.',
    date: 'Hace 1 mes',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100'
  }
];

export const SPORTS_EVENTS: SportsEvent[] = [
  {
    id: 'e1',
    title: 'G.P. de España - Clasificación y Carrera',
    category: 'F1',
    date: 'Sábado 30 y Domingo 31 de Mayo',
    time: '15:00',
    location: 'Circuito de Barcelona-Catalunya',
    isLive: true
  },
  {
    id: 'e2',
    title: 'G.P. de Italia (Mugello) - Todo el Fin de Semana',
    category: 'MotoGP',
    date: 'Sábado 6 y Domingo 7 de Junio',
    time: '11:00 am (Carrera de MotoGP a las 14:00)',
    location: 'Circuito de Mugello',
    isLive: true
  },
  {
    id: 'e3',
    title: 'Gran Final de la UEFA Champions League',
    category: 'Fútbol',
    date: 'Sábado 30 de Mayo',
    time: '21:00',
    location: 'Asistencia con reservación, Pantallas Gigantes',
    isLive: true
  },
  {
    id: 'e4',
    title: 'G.P. de Canadá - Clasificación y Carrera',
    category: 'F1',
    date: 'Domingo 14 de Junio',
    time: '20:00',
    location: 'Circuito Gilles Villeneuve (Horario Tarde/Noche)',
    isLive: false
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq1',
    question: '¿Las consumiciones incluyen tapas abundantes?',
    answer: '¡Por supuesto! Como marca la mejor tradición de Ciudad Real, con cada caña, refresco, tinto de verano o copa te servimos una tapa generosa casera para que disfrutes de comida de verdad.'
  },
  {
    id: 'faq2',
    question: '¿Retransmiten los campeonatos de F1, MotoGP y el Fútbol?',
    answer: 'Sí. Somos el punto de encuentro líder de aficionados en Ciudad Real. Retransmitimos las clasificaciones y carreras de F1 y MotoGP, además de los grandes choques de Champions League y Liga española en pantallas premium con excelente sonido.'
  },
  {
    id: 'faq3',
    question: '¿Tienen la carta disponible para llevar?',
    answer: 'Sí, todas nuestras raciones abundantes (oreja, bravas, croquetas, torreznos) o bocadillos gigantes se preparan para llevar. Llámanos previamente al 626 49 73 37 para tenerlo listo.'
  },
  {
    id: 'faq4',
    question: '¿Se requiere reserva para ver los eventos deportivos?',
    answer: 'No es estrictamente obligatorio, pero se llena rápido. Te recomendamos reservar tu mesa por WhatsApp o avisarnos por teléfono para asegurarte asiento frente a las pantallas gigantes.'
  },
  {
    id: 'faq5',
    question: '¿Dónde están ubicados exactamente en Ciudad Real?',
    answer: 'Nos encontramos en la emblemática Calle Libertad, 8 (Código Postal 13003, Ciudad Real). A solo unos pasos del centro.'
  }
];

export const LOCAL_SEO_KEYWORDS = [
  'Bar de tapas en Ciudad Real',
  'Dónde comer tapas en Ciudad Real',
  'Mejores croquetas de Ciudad Real',
  'Bar para ver fútbol en Ciudad Real',
  'Dónde ver F1 en Ciudad Real',
  'Tapas caseras en Ciudad Real',
  'Bar para tomar cervezas en Ciudad Real',
  'Comer barato en Ciudad Real',
  'Raciones abundantes Ciudad Real'
];
