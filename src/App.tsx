import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MapPin,
  Phone,
  Calendar,
  Clock,
  Utensils,
  Flame,
  Star,
  Check,
  ChevronDown,
  Menu,
  X,
  MessageCircle,
  Search,
  Sparkles,
  Map,
  Award,
  ChevronRight,
  ThumbsUp,
  Tv,
  Instagram
} from 'lucide-react';
import { MENU_ITEMS, BREAKFAST_ITEMS, RACION_ITEMS, BOCADILLO_ITEMS, EXTRA_TORTILLAS, WINE_BEER_ITEMS, REVIEWS, SPORTS_EVENTS, FAQ_ITEMS, IMAGES, LOCAL_SEO_KEYWORDS } from './data';
import { MenuItem, BreakfastItem, RacionItem, BocadilloItem, WineBeerItem, Review, SportsEvent, FAQItem } from './types';

const B64_PHONE = 'KzM0NjI2NDk3MzM3'; // '+34626497337'
const B64_PHONE_SPACED = 'KzM0IDYyNiA0OSA3MyAzNw=='; // '+34 626 49 73 37'
const B64_PHONE_SHORT = 'NjI2IDQ5IDczIDM3'; // '626 49 73 37'
const B64_EMAIL = 'd2Vic3ByaW50dEBnbWFpbC5jb20='; // 'websprintt@gmail.com'
const B64_WA_BASE = 'aHR0cHM6Ly93YS5tZS8zNDYyNjQ5NzMzNz90ZXh0PQ=='; // 'https://wa.me/34626497337?text='

export default function App() {
  // Navigation & Page State
  const [activeTab, setActiveTab] = useState<'inicio' | 'carta' | 'deportes' | 'opiniones' | 'contacto'>('inicio');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Anti-spam ofuscation interaction check to avoid scraping bots
  const [interacted, setInteracted] = useState(false);

  const triggerInteraction = () => {
    if (!interacted) setInteracted(true);
  };

  useEffect(() => {
    const act = () => setInteracted(true);
    window.addEventListener('scroll', act, { passive: true });
    window.addEventListener('click', act, { passive: true });
    window.addEventListener('touchstart', act, { passive: true });
    window.addEventListener('mousemove', act, { passive: true });
    return () => {
      window.removeEventListener('scroll', act);
      window.removeEventListener('click', act);
      window.removeEventListener('touchstart', act);
      window.removeEventListener('mousemove', act);
    };
  }, []);

  const getSecurePhone = () => interacted ? `tel:${atob(B64_PHONE)}` : '#';
  const getSecurePhoneDisplay = (spaced = false) => interacted ? (spaced ? atob(B64_PHONE_SPACED) : atob(B64_PHONE_SHORT)) : '626 49 73 37';
  const getSecureEmail = () => interacted ? `mailto:${atob(B64_EMAIL)}` : '#';
  const getSecureWhatsapp = (message: string) => interacted ? `${atob(B64_WA_BASE)}${encodeURIComponent(message)}` : '#';

  // Booking Modal State
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedSportForBooking, setSelectedSportForBooking] = useState<string>('General / Cena');
  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    guests: '2',
    date: '',
    time: '21:00',
    extraInfo: ''
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Menu Search/Filtering State
  const [selectedMenuCategory, setSelectedMenuCategory] = useState<string>('todos');
  const [menuSearchQuery, setMenuSearchQuery] = useState('');
  const [menuOnlySpecialties, setMenuOnlySpecialties] = useState(false);
  const [menuOnlyPopular, setMenuOnlyPopular] = useState(false);

  // FAQs active state
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(null);

  // Dynamic Open/Closed Indicator based on custom check
  const [isOpenedNow, setIsOpenedNow] = useState(true);

  // Detect scroll offset for blurred floating header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Ingest LocalBusiness Structured Data JSON-LD for local SEO
  useEffect(() => {
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "BarOrPub",
      "name": "Bar Terra",
      "image": [
        "https://images.unsplash.com/photo-1544025162-d76694265947",
        "https://images.unsplash.com/photo-1509722747041-616f39b57569"
      ],
      "telephone": "+34626497337",
      "priceRange": "$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Calle Libertad, 8",
        "addressLocality": "Ciudad Real",
        "postalCode": "13003",
        "addressCountry": "ES"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "38.981882",
        "longitude": "-3.922114"
      },
      "url": window.location.href,
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday"],
          "opens": "12:00",
          "closes": "01:30"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Friday", "Saturday"],
          "opens": "11:30",
          "closes": "02:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Sunday"],
          "opens": "11:30",
          "closes": "01:30"
        }
      ],
      "servesCuisine": ["Spanish", "Tapas", "Raciones", "Bocadillos"],
      "acceptsReservations": "True"
    };

    const scriptId = 'bar-terra-seo-jsonld';
    let scriptElement = document.getElementById(scriptId) as HTMLScriptElement;
    
    if (!scriptElement) {
      scriptElement = document.createElement('script');
      scriptElement.id = scriptId;
      scriptElement.type = 'application/ld+json';
      document.head.appendChild(scriptElement);
    }
    scriptElement.text = JSON.stringify(jsonLd);

    // Simple open state mock indicator based on time
    const currentHour = new Date().getUTCHours() + 2; // Rough Spain Time approximation
    if (currentHour >= 2 && currentHour < 11) {
      setIsOpenedNow(false);
    } else {
      setIsOpenedNow(true);
    }
  }, []);

  // Handle Tab Switch and Auto Scroll to top
  const handleTabSwitch = (tab: 'inicio' | 'carta' | 'deportes' | 'opiniones' | 'contacto') => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Process WhatsApp booking link generator
  const triggerWhatsAppBooking = () => {
    const textBase = `¡Hola Bar Terra! Me gustaría reservar una mesa a nombre de *${bookingForm.name}* (Teléfono: ${bookingForm.phone}) para *${bookingForm.guests}* personas.\n\n📅 *Día:* ${bookingForm.date || 'Hoy'}\n⏰ *Hora:* ${bookingForm.time}\n📌 *Ocasión:* ${selectedSportForBooking}\n${bookingForm.extraInfo ? `📝 *Notas:* ${bookingForm.extraInfo}` : ''}`;
    const encodedUrl = getSecureWhatsapp(textBase);
    if (encodedUrl && encodedUrl !== '#') {
      window.open(encodedUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.phone) {
      alert('Por favor, indica tu nombre y un teléfono de contacto.');
      return;
    }
    setBookingSuccess(true);
  };

  // Open Reservation modal pre-populating target event metadata
  const openBookingForEvent = (eventTitle: string) => {
    setSelectedSportForBooking(eventTitle);
    setBookingSuccess(false);
    setBookingModalOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#fbfbf8] font-sans antialiased text-brand-charcoal overflow-x-hidden pb-12 sm:pb-0">
      
      {/* ULTRA-LIGHT GLOWING AMBIENT DECORATIONS (GPU friendly, zero lag) */}
      <div className="absolute top-[-150px] left-[-150px] w-96 h-96 rounded-full bg-brand-accent/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-[800px] right-[-150px] w-[500px] h-[500px] rounded-full bg-yellow-600/3 blur-[160px] pointer-events-none" />
      <div className="absolute bottom-[400px] left-[-200px] w-96 h-96 rounded-full bg-yellow-500/3 blur-[140px] pointer-events-none" />
      
      {/* LOCAL SEO HIDDEN TAGS FOR CRAWLERS */}
      <div className="sr-only">
        <h2>Bar Terra - El mejor bar de tapas en Ciudad Real</h2>
        <p>¿Buscas dónde comer tapas en Ciudad Real o un bar para ver fútbol y F1 en directo? Ven al Bar Terra en la Calle Libertad 8, especialistas en raciones copiosas, tortillas de patata deliciosas y las mejores croquetas de cecina en Ciudad Real.</p>
        <ul>
          {LOCAL_SEO_KEYWORDS.map((k, idx) => (
            <li key={idx}>{k}</li>
          ))}
        </ul>
      </div>

      {/* HEADER NAVBAR */}
      <nav
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-brand-charcoal/90 backdrop-blur-md shadow-lg border-b border-white/5 py-2.5'
            : 'bg-brand-charcoal py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo Brand */}
          <div 
            onClick={() => handleTabSwitch('inicio')} 
            className="flex items-center space-x-2.5 cursor-pointer group"
          >
            <div className="bg-brand-accent p-2 rounded-lg flex items-center justify-center shadow-md transition-transform duration-300 group-hover:rotate-12">
              <Utensils className="w-5 h-5 text-brand-charcoal font-bold" />
            </div>
            <div>
              <span className="font-display text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
                BAR TERRA
                <span className="inline-block w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
              </span>
              <span className="block text-[10px] font-mono text-brand-accent tracking-widest uppercase">
                Tapas & Deportes • Ciudad Real
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1.5 lg:space-x-2">
            {[
              { id: 'inicio', label: 'Inicio' },
              { id: 'carta', label: 'Ver Carta' },
              { id: 'deportes', label: 'Deportes en Directo' },
              { id: 'opiniones', label: 'Opiniones' },
              { id: 'contacto', label: 'Ubicación' },
            ].map((tab) => (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                onClick={() => handleTabSwitch(tab.id as any)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-brand-accent text-brand-charcoal shadow-sm'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Desktop CTA Action */}
          <div className="hidden md:flex items-center space-x-3">
            <button
              onClick={() => openBookingForEvent('General / Cena')}
              id="header-booking-btn"
              className="bg-zinc-800 text-white border border-zinc-700/80 px-4 py-2 rounded-full text-xs font-semibold hover:bg-zinc-700 transition-colors shadow-sm cursor-pointer"
            >
              Reservar Mesa
            </button>
            <a
              href={getSecureEmail()}
              onMouseEnter={triggerInteraction}
              onTouchStart={triggerInteraction}
              className="text-gray-400 hover:text-white text-xs transition-colors"
              title="Contacto Soporte"
            >
              Bar Terra ©
            </a>
          </div>

          {/* Mobile menu trigger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-trigger"
              className="p-3 my-1 -mr-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl focus:outline-none min-h-[48px] min-w-[48px] flex items-center justify-center transition-transform active:scale-90"
              aria-label="Abrir Menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </nav>

      {/* MOBILE NAV OVERLAY — BOTTOM SHEET DRAWER */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Smooth backdrop blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/70 backdrop-blur-xs z-45 md:hidden"
            />
            
            {/* Premium sheet drawer pulling up from below */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 24, stiffness: 220 }}
              className="fixed inset-x-0 bottom-0 z-50 rounded-t-[32px] bg-zinc-950 border-t border-white/10 flex flex-col p-6 pb-12 shadow-2xl md:hidden max-h-[85vh] overflow-y-auto"
            >
              {/* Native styling handle bar */}
              <div className="w-12 h-1.5 bg-zinc-700 rounded-full mx-auto mb-6 shrink-0" />
              
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-white font-display font-extrabold text-xl tracking-tight flex items-center gap-2">
                    BAR TERRA <span className="inline-block w-2 h-2 rounded-full bg-brand-accent animate-ping" />
                  </h3>
                  <p className="text-xs text-zinc-400">Navegación optimizada para móviles</p>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white p-3 rounded-full cursor-pointer min-h-[48px] min-w-[48px] flex items-center justify-center transition-colors"
                  aria-label="Cerrar Menú"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col space-y-2.5">
                {[
                  { id: 'inicio', label: 'Inicio', desc: 'Inicio y platos recomendados' },
                  { id: 'carta', label: 'Nuestra Carta', desc: 'Tapas, raciones y bodega digital' },
                  { id: 'deportes', label: 'Deportes', desc: 'Pantallas gigantes, F1 y fútbol' },
                  { id: 'opiniones', label: 'Opiniones', desc: 'Qué dicen los clientes' },
                  { id: 'contacto', label: 'Ubicación', desc: 'Situado en Calle Libertad 8' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleTabSwitch(item.id as any)}
                    className={`w-full text-left px-5 py-3 rounded-2xl flex items-center justify-between transition-all min-h-[52px] ${
                      activeTab === item.id
                        ? 'bg-brand-accent text-brand-charcoal font-bold'
                        : 'bg-white/5 text-gray-200 hover:bg-white/10'
                    }`}
                  >
                    <div>
                      <span className="block font-bold text-sm tracking-tight">{item.label}</span>
                      <span className={`block text-[10px] ${activeTab === item.id ? 'text-brand-charcoal/70' : 'text-zinc-500'}`}>{item.desc}</span>
                    </div>
                    <ChevronRight className="w-5 h-5 opacity-60" />
                  </button>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 flex flex-col space-y-3 shrink-0">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openBookingForEvent('Mesa para Hoy');
                  }}
                  className="w-full bg-brand-accent hover:bg-brand-accent-dark text-brand-charcoal text-center py-4 rounded-xl text-base font-extrabold transition-all shadow-md flex items-center justify-center gap-2 shine-effect active:scale-[0.98] min-h-[48px]"
                >
                  <Calendar className="w-5 h-5" />
                  Reservar por WhatsApp
                </button>
                <a
                  href="tel:+34626497337"
                  className="w-full bg-white/5 hover:bg-white/10 text-white text-center py-4 rounded-xl text-base font-bold transition-all border border-white/5 block flex items-center justify-center gap-2 active:scale-[0.98] min-h-[48px]"
                >
                  📞 Llamar al Bar: 626 49 73 37
                </a>
              </div>

              <div className="mt-6 text-center shrink-0">
                <p className="text-zinc-600 text-[10px] font-mono tracking-wider">CALLE LIBERTAD 8, CIUDAD REAL</p>
                <p className="text-zinc-700 text-[9px] mt-1">Abierto hasta la 1:30 AM • Fin de semana 2:00 AM</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* MAIN VIEWPORT BODY */}
      <main className="pt-[72px] pb-24 md:pb-12">
        <AnimatePresence mode="wait">
          
          {/* HOME / INICIO VIEW */}
          {activeTab === 'inicio' && (
            <motion.div
              key="inicio-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              
              {/* HERO SECTION */}
              <section className="relative bg-brand-charcoal text-white pt-12 pb-20 md:py-28 overflow-hidden">
                {/* Background graphic effect */}
                <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay">
                  <img
                    src={IMAGES.hero}
                    alt="Bar Terra fondo rústico"
                    className="w-full h-full object-cover filter blur-[2px]"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute inset-0 bg-linear-to-b from-brand-charcoal/90 via-brand-charcoal/70 to-brand-charcoal pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  
                  {/* Left content block */}
                  <div className="lg:col-span-7 flex flex-col space-y-6">
                    
                    {/* Trust indicators */}
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-brand-accent/20 text-brand-accent border border-brand-accent/30 font-mono">
                        ⭐ 4.4/5 Google Rating
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-gray-200 border border-white/5 font-mono">
                        📍 Libertad 8, Ciudad Real
                      </span>
                      {isOpenedNow && (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400 border border-green-500/30 animate-pulse">
                          ● ABIERTO AHORA
                        </span>
                      )}
                    </div>

                    <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white">
                      Tapas generosas, buen ambiente y <span className="text-brand-accent">cerveza fría</span> en el corazón de Ciudad Real
                    </h1>

                    <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-2xl">
                      Ven a disfrutar de tapas caseras, raciones abundantes y el mejor ambiente para ver F1, motos y fútbol en pantallas gigantes con amigos.
                    </p>

                    {/* Massive CRO CTA Buttons */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-3">
                      <a
                        href={getSecurePhone()}
                        onMouseEnter={triggerInteraction}
                        onTouchStart={triggerInteraction}
                        className="bg-brand-accent hover:bg-brand-accent-dark text-brand-charcoal px-8 py-4 rounded-xl text-base font-extrabold tracking-wide transition-all shadow-lg hover:shadow-brand-accent/20 hover:-translate-y-0.5 text-center flex items-center justify-center gap-2"
                      >
                        <Phone className="w-5 h-5 fill-brand-charcoal" />
                        Llamar ahora (Reservas)
                      </a>
                      
                      <a
                        href="https://maps.google.com/?q=Bar+Terra+Calle+Libertad+8+Ciudad+Real"
                        target="_blank"
                        rel="noopener noreferrer"
                        referrerPolicy="no-referrer"
                        className="bg-white/10 hover:bg-white/15 border border-white/20 text-white px-8 py-4 rounded-xl text-base font-bold transition-all text-center flex items-center justify-center gap-2"
                      >
                        <MapPin className="w-5 h-5 text-brand-accent" />
                        Cómo llegar
                      </a>

                      <button
                        onClick={() => handleTabSwitch('carta')}
                        className="bg-zinc-800 hover:bg-zinc-700/80 text-white px-8 py-4 rounded-xl text-sm font-bold transition-all text-center flex items-center justify-center gap-2 cursor-pointer"
                      >
                        🍻 Ver carta digital
                      </button>
                    </div>

                    <div className="flex items-center space-x-6 text-xs text-gray-400 pt-4 font-mono">
                      <span className="flex items-center gap-1.5">
                        <Check className="w-4 h-4 text-brand-accent" /> Oreja crujiente deliciosa
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Check className="w-4 h-4 text-brand-accent" /> Croquetas caseras melt
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Check className="w-4 h-4 text-brand-accent" /> Pantallas deportivas
                      </span>
                    </div>

                  </div>

                  {/* Right asset showcasing tapas */}
                  <div className="lg:col-span-5 relative mt-6 lg:mt-0">
                    <div className="absolute -inset-1.5 bg-linear-to-r from-brand-accent to-brand-accent-dark rounded-2xl blur-md opacity-32 animate-pulse" />
                    <div className="relative bg-zinc-900 rounded-2xl p-2 pb-4 shadow-2xl border border-white/10">
                      <img
                        src={IMAGES.hero}
                        alt="Tapas ricas en Bar Terra"
                        className="w-full aspect-16/10 object-cover rounded-xl shadow-md"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-5 right-5 bg-black/80 backdrop-blur-md text-brand-accent font-bold px-3 py-1.5 rounded-lg text-xs font-mono shadow-md border border-white/10">
                        🔥 Popular en Ciudad Real
                      </div>
                      <div className="px-3 pt-4">
                        <h4 className="text-white font-display font-bold text-lg mb-1 flex items-center gap-1.5">
                          Tapas abundantes y caseras
                        </h4>
                        <p className="text-gray-400 text-xs">
                          Tus cañas dobles siempre acompañadas del auténtico sabor tradicional. ¡Comer bien en Ciudad Real jamás fue tan fácil!
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </section>

              {/* LIVE EVENTS EVENT ROW TICKER */}
              <div className="bg-brand-accent text-brand-charcoal overflow-hidden py-3 font-mono text-sm font-bold border-y border-brand-charcoal flex items-center whitespace-nowrap">
                <div className="animate-infinite-scroll flex space-x-12 shrink-0">
                  <span>🏁 ESTE FIN DE SEMANA: GP DE F1 Y MOTOGP EN DIRECTO •</span>
                  <span>🏆 GRAN FINAL DE CHAMPIONS EN BAR TERRA •</span>
                  <span>🔥 LAS MEJORES CROQUETAS DE CECINA DE CIUDAD REAL •</span>
                  <span>🍺 CAÑA BIEN FRÍA CON TAPA GENEROSA •</span>
                  <span>📞 RESERVA TU MESA AL 626 49 73 37 •</span>
                </div>
                <div className="animate-infinite-scroll flex space-x-12 shrink-0 ml-12" aria-hidden="true">
                  <span>🏁 ESTE FIN DE SEMANA: GP DE F1 Y MOTOGP EN DIRECTO •</span>
                  <span>🏆 GRAN FINAL DE CHAMPIONS EN BAR TERRA •</span>
                  <span>🔥 LAS MEJORES CROQUETAS DE CECINA DE CIUDAD REAL •</span>
                  <span>🍺 CAÑA BIEN FRÍA CON TAPA GENEROSA •</span>
                  <span>📞 RESERVA TU MESA AL 626 49 73 37 •</span>
                </div>
              </div>

              {/* BLOQUE 2 — PRUEBA SOCIAL INMEDIATA */}
              <section className="py-12 bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-[#fbfbf8] p-6 sm:p-8 rounded-2xl border border-gray-200/60 shadow-sm">
                    <div className="flex items-center space-x-4">
                      <div className="bg-brand-accent text-brand-charcoal rounded-xl p-4 text-center select-none shadow-sm">
                        <span className="block font-display text-3xl font-extrabold">4.4</span>
                        <span className="block text-[10px] uppercase font-mono font-bold tracking-widest text-brand-charcoal/75">Google Stars</span>
                      </div>
                      <div>
                        <div className="flex items-center space-x-1 mb-1 text-brand-accent">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-current" />
                          ))}
                        </div>
                        <h4 className="text-zinc-800 font-display font-extrabold text-lg">Más de 150 opiniones reales en Ciudad Real</h4>
                        <p className="text-gray-500 text-sm">Nuestros clientes avalan el trato, el tamaño de las raciones y la atmósfera de motor.</p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                      <button
                        onClick={() => handleTabSwitch('opiniones')}
                        className="bg-brand-charcoal hover:bg-zinc-800 text-white px-6 py-3 rounded-xl text-sm font-semibold text-center transition-all shadow-sm"
                      >
                        Ver todas las opiniones
                      </button>
                    </div>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    {REVIEWS.slice(0, 3).map((review) => (
                      <div key={review.id} className="bg-[#fbfbf1]/40 hover:bg-[#fbfbf1]/90 transition-all p-5 rounded-xl border border-gray-100 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center space-x-1 text-brand-accent mb-3">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-current" />
                            ))}
                          </div>
                          <p className="text-gray-700 text-sm italic leading-relaxed">
                            "{review.text}"
                          </p>
                        </div>
                        <div className="flex items-center space-x-3 mt-4 pt-4 border-t border-gray-200/40">
                          <img
                            src={review.avatarUrl || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2'}
                            alt={review.author}
                            className="w-8 h-8 rounded-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <p className="text-xs font-bold text-gray-800">{review.author}</p>
                            <p className="text-[10px] text-gray-400 font-mono">{review.date} • Google Local Guide</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              </section>

              {/* BLOQUE 3 — ¿POR QUÉ VENIR A BAR TERRA? (PREMIUM ADAPTIVE BENTO GRID) */}
              <section className="py-20 bg-[#fbfbf8] relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                  
                  <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-brand-accent font-semibold font-mono text-xs tracking-widest uppercase bg-brand-accent/10 px-3.5 py-1.5 rounded-full border border-brand-accent/20">
                      LO QUE NOS HACE ÚNICOS
                    </span>
                    <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-brand-charcoal mt-4 tracking-tight leading-tight">
                      La auténtica experiencia de bar en Ciudad Real
                    </h2>
                    <p className="text-gray-600 mt-4 text-base sm:text-lg">
                      No somos solo un lugar para comer; somos el rincón donde se debaten las carreras del domingo, se disfrutan las mejores croquetas de cecina de la comarca y la cerveza se sirve helada.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    
                    {/* BENTO BLOCK 1: Sports & Motor (col-span-2, Dark themed for focus) */}
                    <motion.div 
                      whileHover={{ scale: 1.01, y: -2 }}
                      className="md:col-span-2 bg-brand-charcoal text-white p-8 rounded-3xl border border-white/5 relative overflow-hidden flex flex-col justify-between shadow-lg group transition-all duration-300"
                    >
                      <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-brand-accent/10 blur-2xl pointer-events-none" />
                      <div>
                        <div className="bg-brand-accent w-12 h-12 rounded-xl flex items-center justify-center mb-6 shadow-md shadow-brand-accent/10 transition-transform duration-300 group-hover:rotate-6">
                          <Tv className="w-6 h-6 text-brand-charcoal font-bold" />
                        </div>
                        <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-brand-accent bg-brand-accent/10 px-2.5 py-1 rounded-md">
                          La Meca del Motor y Fútbol
                        </span>
                        <h3 className="font-display font-extrabold text-2xl text-white mt-3 leading-tight">
                          Pantallas gigantes & Deportes en Vivo
                        </h3>
                        <p className="text-zinc-400 text-sm mt-2 leading-relaxed">
                          La mejor atmósfera de Ciudad Real para sintonizar carreras de Fórmula 1, MotoGP y los partidos decisivos con sonido ambiente estéreo. No lo veas solo en el sofá.
                        </p>
                      </div>
                      
                      <div className="mt-8 pt-5 border-t border-white/5 flex items-center justify-between">
                        <span className="text-xs font-mono text-zinc-500 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" /> Emisión HD Garantizada
                        </span>
                        <button
                          onClick={() => handleTabSwitch('deportes')}
                          className="text-xs font-bold text-brand-accent hover:underline flex items-center gap-1 cursor-pointer min-h-[44px] px-2"
                        >
                          Próximos eventos <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </motion.div>

                    {/* BENTO BLOCK 2: Tapas (col-span-2, Light themed) */}
                    <motion.div 
                      whileHover={{ scale: 1.01, y: -2 }}
                      className="md:col-span-2 bg-white p-8 rounded-3xl border border-gray-200/60 flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-300 group"
                    >
                      <div>
                        <div className="bg-brand-accent/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-105">
                          <Utensils className="w-6 h-6 text-brand-accent-dark" />
                        </div>
                        <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md">
                          Casero y Copioso
                        </span>
                        <h3 className="font-display font-extrabold text-2xl text-brand-charcoal mt-3 leading-tight">
                          Tapas tradicionales y abundantes
                        </h3>
                        <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                          Cada consumición se corona con una tapa casera abundante de verdad. Famosos por las croquetas sumamente cremosas de cecina y el point meloso de nuestras tortillas.
                        </p>
                      </div>

                      <div className="mt-8 pt-5 border-t border-gray-100 flex items-center justify-between">
                        <span className="text-xs font-mono text-gray-400">Cocina abierta a diario</span>
                        <button
                          onClick={() => handleTabSwitch('carta')}
                          className="text-xs font-extrabold text-brand-charcoal hover:text-brand-accent-dark flex items-center gap-1 cursor-pointer min-h-[44px] px-2"
                        >
                          Ver carta digital <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </motion.div>

                    {/* BENTO BLOCK 3: Precios (col-span-1, minimal card) */}
                    <motion.div 
                      whileHover={{ scale: 1.01, y: -2 }}
                      className="bg-white p-6 rounded-3xl border border-gray-200/60 flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-300 group"
                    >
                      <div>
                        <div className="bg-neutral-100 w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-brand-charcoal transition-colors group-hover:bg-brand-accent/15">
                          <ThumbsUp className="w-5 h-5 text-zinc-700" />
                        </div>
                        <h4 className="font-display font-extrabold text-lg text-brand-charcoal leading-snug">
                          Precios accesibles
                        </h4>
                        <p className="text-gray-500 text-xs mt-1.5 leading-relaxed">
                          Comer de lujo en la capital sin asustar tu bolsillo. Calidad de primera a precio popular.
                        </p>
                      </div>
                      <div className="mt-6 pt-3 border-t border-gray-50 flex items-center justify-between text-[10px] text-gray-450 font-mono">
                        <span>Tapas desde 2.50€</span>
                        <span>Precio Justo ✓</span>
                      </div>
                    </motion.div>

                    {/* BENTO BLOCK 4: Ambiente (col-span-1, minimal card) */}
                    <motion.div 
                      whileHover={{ scale: 1.01, y: -2 }}
                      className="bg-white p-6 rounded-3xl border border-gray-200/60 flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-300 group"
                    >
                      <div>
                        <div className="bg-neutral-100 w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-brand-charcoal transition-colors group-hover:bg-brand-accent/15">
                          <Sparkles className="w-5 h-5 text-zinc-700" />
                        </div>
                        <h4 className="font-display font-extrabold text-lg text-brand-charcoal leading-snug">
                          Atmósfera de Oro
                        </h4>
                        <p className="text-gray-500 text-xs mt-1.5 leading-relaxed">
                          El trato cercano, ágil e informal de un bar tradicional, donde el cliente es parte de la familia.
                        </p>
                      </div>
                      <div className="mt-6 pt-3 border-t border-gray-50 flex items-center justify-between text-[10px] text-gray-450 font-mono">
                        <span>Trato 10/10</span>
                        <span>Acogedor ★</span>
                      </div>
                    </motion.div>

                    {/* BENTO BLOCK 5: Ubicación y Accesos (col-span-2) */}
                    <motion.div 
                      whileHover={{ scale: 1.01, y: -2 }}
                      className="md:col-span-2 bg-yellow-50/40 p-6 sm:p-8 rounded-3xl border border-yellow-200/30 flex flex-col justify-between shadow-xs hover:shadow-md transition-all duration-350 group"
                    >
                      <div className="flex flex-col sm:flex-row gap-5 items-start">
                        <div className="bg-brand-accent/10 w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
                          <MapPin className="w-6 h-6 text-brand-accent-dark" />
                        </div>
                        <div>
                          <h4 className="font-display font-extrabold text-xl text-brand-charcoal">
                            Ubicación inmejorable
                          </h4>
                          <p className="text-gray-600 text-xs mt-1.5 leading-relaxed">
                            Situado en la Calle Libertad 8, Ciudad Real. Un entorno tranquilo con plazas fluidas para estacionar cómodamente el coche y accesos directos desde cualquier punto de la ronda.
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-6 pt-5 border-t border-yellow-200/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <span className="text-xs font-mono text-amber-800 font-semibold">
                          📍 Libertad 8, Ciudad Real
                        </span>
                        <a
                          href="https://maps.google.com/?q=Bar+Terra+Calle+Libertad+8+Ciudad+Real"
                          target="_blank"
                          rel="noopener noreferrer"
                          referrerPolicy="no-referrer"
                          className="bg-brand-charcoal text-white hover:bg-zinc-800 text-2xs font-extrabold px-4.5 py-3 rounded-xl transition-all inline-flex items-center gap-1.5 cursor-pointer max-w-max min-h-[44px]"
                        >
                          Abrir Mapa GPS <MapPin className="w-3.5 h-3.5 text-brand-accent" />
                        </a>
                      </div>
                    </motion.div>

                  </div>

                </div>
              </section>

              {/* BLOQUE 4 — TAPAS ESTRELLA */}
              <section className="py-20 bg-white border-t border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  
                  <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12">
                    <div>
                      <span className="text-brand-accent font-semibold font-mono text-xs tracking-widest uppercase">
                        SABOR AUTÉNTICO DE LA CASA
                      </span>
                      <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-charcoal mt-2 tracking-tight">
                        Nuestras Tapas & Raciones Estrella 🌟
                      </h2>
                    </div>
                    <button
                      onClick={() => handleTabSwitch('carta')}
                      className="mt-4 md:mt-0 inline-flex items-center text-sm font-extrabold text-brand-charcoal hover:text-brand-accent-dark group transition-colors cursor-pointer"
                    >
                      Ver carta completa 
                      <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                      {
                        name: 'Croquetas de cecina',
                        desc: 'Las favoritas de muchos clientes por su increíble relleno sedoso y exterior ultra-burbujeante.',
                        price: '2.50€ Pincho / 11.50€ Ración',
                        tags: ['Especialidad', 'Recomendado'],
                        image: IMAGES.tapasFeatured
                      },
                      {
                        name: 'Oreja de cerdo de la casa',
                        desc: 'Uno de los platos más recomendados. Se hace crujiente al grill con aliño casero de ajo y limón.',
                        price: '2.80€ Pincho / 12.00€ Ración',
                        tags: ['Señera', 'Para Compartir'],
                        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=400'
                      },
                      {
                        name: 'Huevos rotos campestres',
                        desc: 'Patatas fritas cortadas a mano al instante, tres huevos camperos y virutas crujientes de buen jamón.',
                        price: '11.00€ Ración Completa',
                        tags: ['Ideal Compartir'],
                        image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=400'
                      },
                      {
                        name: 'Tortilla de patatas al gusto',
                        desc: 'Una de las grandes sorpresas del local. Con su punto meloso y jugoso especial.',
                        price: '13.00€ Entera / 2.50 Pincho',
                        tags: ['Horneado Diario'],
                        image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&q=80&w=400'
                      }
                    ].map((dish, idx) => (
                      <div
                        key={idx}
                        className="bg-[#fbfbf8] rounded-2xl overflow-hidden border border-gray-200/80 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                      >
                        <div className="relative aspect-4/3 overflow-hidden">
                          <img
                            src={dish.image}
                            alt={dish.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                            {dish.tags.map((tag, tIdx) => (
                              <span key={tIdx} className="bg-brand-charcoal/90 text-brand-accent text-[9px] font-bold font-mono px-2 py-1 rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <span className="absolute bottom-3 right-3 bg-brand-accent text-brand-charcoal text-[11px] font-bold font-mono px-2 py-1 rounded-md">
                            {dish.price}
                          </span>
                        </div>

                        <div className="p-5 flex-1 flex flex-col justify-between pt-4">
                          <div>
                            <h3 className="font-display font-extrabold text-lg text-brand-charcoal mb-2">
                              {dish.name}
                            </h3>
                            <p className="text-gray-500 text-xs leading-relaxed">
                              {dish.desc}
                            </p>
                          </div>

                          <div className="pt-4 mt-4 border-t border-gray-200/40 flex items-center justify-between">
                            <span className="text-[10px] text-gray-400 font-mono">Disponibilidad: Diario</span>
                            <button
                              onClick={() => openBookingForEvent(`Cena para probar ${dish.name}`)}
                              className="text-xs font-bold text-brand-charcoal hover:text-brand-accent-dark flex items-center cursor-pointer"
                            >
                              Reservar mesa 
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-12 text-center">
                    <button
                      onClick={() => handleTabSwitch('carta')}
                      className="bg-brand-charcoal hover:bg-zinc-800 text-white font-bold px-8 py-4 rounded-xl text-sm transition-all shadow-md inline-flex items-center gap-2 cursor-pointer"
                    >
                      📖 Ver nuestra carta en formato digital interactivo
                    </button>
                  </div>

                </div>
              </section>

              {/* BLOQUE 5 — EXPERIENCIA / AMBIENTE */}
              <section className="bg-brand-charcoal text-white py-20 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  
                  {/* Visual Frame */}
                  <div className="lg:col-span-6 grid grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <img
                        src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=400"
                        alt="Ambiente rústico de tapas"
                        className="rounded-2xl w-full h-64 object-cover shadow-lg border border-white/5"
                        referrerPolicy="no-referrer"
                      />
                      <div className="bg-brand-accent p-4 rounded-2xl text-brand-charcoal select-none shadow-md">
                        <Award className="w-8 h-8 mb-2" />
                        <h4 className="font-display font-extrabold text-base">Auténtico local</h4>
                        <p className="text-[11px] leading-relaxed">Trato familiar de toda la vida en plena Libertad 8, Ciudad Real.</p>
                      </div>
                    </div>
                    <div className="space-y-4 pt-8">
                      <div className="bg-zinc-800 p-5 rounded-2xl border border-white/5">
                        <p className="text-brand-accent font-mono text-2xl font-black">2026</p>
                        <p className="text-xs text-gray-400 mt-1">Mejorando cada año para traerte el mejor motor y ambiente.</p>
                      </div>
                      <img
                        src={IMAGES.tapasFeatured}
                        alt="Tapas servidas"
                        className="rounded-2xl w-full h-64 object-cover shadow-lg border border-white/5"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>

                  {/* Text Details */}
                  <div className="lg:col-span-6 flex flex-col space-y-6">
                    <span className="text-brand-accent font-semibold font-mono text-xs tracking-widest uppercase">
                      EL PUNTO DE ENCUENTRO DE CIUDAD REAL
                    </span>
                    <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight">
                      El sitio perfecto para quedar con amigos
                    </h2>
                    <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                      Si buscas sencillez, platos contundentes, una caña generosa en espuma y poder comentar con sonido ambiente las carreras de Fórmula 1 y MotoGP, has llegado al sitio correcto. En Bar Terra respiramos pasión por la cercanía, la buena comida y el deporte.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4">
                      <div className="flex items-start space-x-3">
                        <div className="bg-brand-accent/10 border border-brand-accent/20 p-2 rounded-xl mt-1 text-brand-accent shrink-0">
                          <Check className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-white font-bold text-sm">Trato cercano e implicado</h4>
                          <p className="text-gray-400 text-xs mt-1">Nos desvivimos porque te sientas en casa desde el primer minuto.</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-3">
                        <div className="bg-brand-accent/10 border border-brand-accent/20 p-2 rounded-xl mt-1 text-brand-accent shrink-0">
                          <Check className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-white font-bold text-sm">Espacio para eventos</h4>
                          <p className="text-gray-400 text-xs mt-1">Pantallas de alta definición para no perderte de nada con tu hinchada.</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-zinc-800/80 flex flex-wrap gap-4 items-center">
                      <button
                        onClick={() => handleTabSwitch('deportes')}
                        className="bg-brand-accent hover:bg-brand-accent-dark text-brand-charcoal px-6 py-3.5 rounded-xl font-extrabold text-sm transition-all shadow-md cursor-pointer"
                      >
                        Ver próximos eventos deportivos 🏁
                      </button>
                    </div>

                  </div>

                </div>
              </section>

              {/* BLOQUE 6 — CTA DE CONVERSIÓN VISUAL AGRESIVO */}
              <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="relative bg-brand-charcoal rounded-3xl p-8 sm:p-12 lg:p-16 text-white text-center sm:text-left overflow-hidden shadow-2xl border border-white/5">
                    {/* Visual pattern effect */}
                    <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-brand-accent/10 blur-3xl pointer-events-none" />
                    
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                      <div className="lg:col-span-8 flex flex-col space-y-4">
                        <span className="text-brand-accent font-mono font-bold tracking-widest uppercase text-xs">
                          ¿TE VIENES HOY? PREPARAMOS TU SITIO
                        </span>
                        <h2 className="font-display font-extrabold text-3.5xl sm:text-4.5xl leading-tight">
                          El mejor ambiente está hoy en Bar Terra
                        </h2>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-sm text-gray-300">
                          <div className="flex items-center space-x-2.5 justify-center sm:justify-start">
                            <MapPin className="w-5 h-5 text-brand-accent" />
                            <span>Calle Libertad, 8, Ciudad Real</span>
                          </div>
                          <div className="flex items-center space-x-2.5 justify-center sm:justify-start">
                            <Clock className="w-5 h-5 text-brand-accent" />
                            <span>Abierto hasta la 1:30 AM</span>
                          </div>
                          <div className="flex items-center space-x-2.5 justify-center sm:justify-start">
                            <Phone className="w-5 h-5 text-brand-accent" />
                            <a
                              href={getSecurePhone()}
                              onMouseEnter={triggerInteraction}
                              onTouchStart={triggerInteraction}
                              className="hover:underline"
                            >
                              {getSecurePhoneDisplay(false)}
                            </a>
                          </div>
                        </div>
                      </div>

                      <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 w-full shrink-0">
                        <a
                          href={getSecurePhone()}
                          onMouseEnter={triggerInteraction}
                          onTouchStart={triggerInteraction}
                          className="w-full bg-brand-accent hover:bg-brand-accent-dark text-brand-charcoal text-center px-6 py-4 rounded-xl text-base font-extrabold transition-all shadow-md flex items-center justify-center gap-2"
                        >
                          <Phone className="w-5 h-5 fill-brand-charcoal" />
                          Llamar ahora (Reservar)
                        </a>
                        <a
                          href="https://maps.google.com/?q=Bar+Terra+Calle+Libertad+8+Ciudad+Real"
                          target="_blank"
                          rel="noopener noreferrer"
                          referrerPolicy="no-referrer"
                          className="w-full bg-white/10 hover:bg-white/15 text-white border border-white/20 text-center px-6 py-4 rounded-xl text-base font-bold transition-all flex items-center justify-center gap-2"
                        >
                          <Map className="w-5 h-5 text-brand-accent" />
                          Abrir Google Maps
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* BLOQUE 7 — FAQ (SEO & OBJECIONES) */}
              <section className="py-20 bg-[#fbfbf8] border-t border-gray-100">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                  
                  <div className="text-center mb-12">
                    <span className="text-brand-accent font-semibold font-mono text-xs tracking-widest uppercase">
                      RESOLVEMOS TUS DUDAS
                    </span>
                    <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-charcoal mt-2 tracking-tight">
                      Preguntas frecuentes - Bar Terra 🍻
                    </h2>
                    <p className="text-gray-500 text-sm mt-3">
                      Todo lo que necesitas saber antes de venir al rey de las tapas de Ciudad Real.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {FAQ_ITEMS.map((faq) => {
                      const isExpanded = expandedFaqId === faq.id;
                      return (
                        <div
                          key={faq.id}
                          className="bg-white rounded-2xl border border-gray-200/60 overflow-hidden shadow-xs transition-colors"
                        >
                          <button
                            onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                            className="w-full text-left p-6 flex justify-between items-center focus:outline-none cursor-pointer"
                          >
                            <span className="font-display font-bold text-zinc-800 text-base pr-4">
                              {faq.question}
                            </span>
                            <ChevronDown
                              className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-200 ${
                                isExpanded ? 'rotate-180 text-brand-accent' : ''
                              }`}
                            />
                          </button>

                          {isExpanded && (
                            <div className="px-6 pb-6 text-gray-600 text-sm leading-relaxed border-t border-gray-50 pt-4">
                              {faq.answer}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                </div>
              </section>

            </motion.div>
          )}

          {/* CARTA / MENÚ VIEW */}
          {activeTab === 'carta' && (
            <motion.div
              key="carta-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12"
            >
              
              {/* Header section of menu */}
              <div className="text-center max-w-2xl mx-auto mb-10">
                <span className="text-brand-accent font-semibold font-mono text-xs tracking-widest uppercase bg-brand-accent/10 px-3 py-1.5 rounded-full">
                  CARTA DE BAR TERRA
                </span>
                <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-charcoal mt-4 mb-3 tracking-tight">
                  Nuestra Carta & Especialidades
                </h2>
                <p className="text-gray-500 text-sm">
                  Sin PDFs incómodos ni descargas lentas. Filtra nuestras raciones abundantes, desayunos premium, bocadillos gigantes y excelente selección de vinos en un solo clic.
                </p>
              </div>

              {/* Filtering Controls box */}
              <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-xs mb-8 flex flex-col space-y-4">
                
                {/* Search / Text filter */}
                <div className="relative">
                  <Search className="w-5 h-5 text-gray-400 absolute left-4.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={menuSearchQuery}
                    onChange={(e) => setMenuSearchQuery(e.target.value)}
                    placeholder="Buscar plato o ingrediente (ej: oreja, lomo, ración, rioja, café...)"
                    className="w-full bg-[#fbfbf8] border border-gray-200 text-sm rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-1 focus:ring-brand-accent focus:border-brand-accent"
                  />
                  {menuSearchQuery && (
                    <button
                      onClick={() => setMenuSearchQuery('')}
                      className="absolute right-4.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-charcoal text-xs cursor-pointer"
                    >
                      Limpiar
                    </button>
                  )}
                </div>

                {/* Categories Tab Selectors */}
                <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
                  {[
                    { id: 'todos', label: '📖 Toda la Carta' },
                    { id: 'desayunos', label: '🍳 Desayunos y Ofertas' },
                    { id: 'raciones', label: '🍽️ Raciones Generosas' },
                    { id: 'bocadillos', label: '🥖 Pulgas, Montados y Bocadillos' },
                    { id: 'bebidas_vinos', label: '🍷 Bodega y Cervezas' }
                  ].map((category) => (
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      key={category.id}
                      onClick={() => setSelectedMenuCategory(category.id)}
                      className={`px-4 py-3 sm:py-2.5 rounded-xl text-xs font-bold cursor-pointer shrink-0 transition-all min-h-[48px] sm:min-h-0 flex items-center justify-center ${
                        selectedMenuCategory === category.id
                          ? 'bg-brand-charcoal text-white shadow-sm ring-1 ring-white/10'
                          : 'bg-[#f5f5f1] text-gray-650 hover:bg-neutral-100 hover:text-brand-charcoal'
                      }`}
                    >
                      {category.label}
                    </motion.button>
                  ))}
                </div>

                {/* Checkboxes indicators */}
                <div className="flex flex-wrap items-center gap-4 pt-1.5 border-t border-gray-100 text-xs text-gray-600">
                  <label className="flex items-center space-x-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={menuOnlySpecialties}
                      onChange={(e) => setMenuOnlySpecialties(e.target.checked)}
                      className="rounded border-gray-300 text-brand-accent focus:ring-brand-accent w-4 h-4 cursor-pointer"
                    />
                    <span className="flex items-center gap-1 font-medium">
                      🌟 Solo Especialidades de la Casa
                    </span>
                  </label>
                  
                  <label className="flex items-center space-x-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={menuOnlyPopular}
                      onChange={(e) => setMenuOnlyPopular(e.target.checked)}
                      className="rounded border-gray-300 text-brand-accent focus:ring-brand-accent w-4 h-4 cursor-pointer"
                    />
                    <span className="flex items-center gap-1 font-medium">
                      🔥 Solo Platos Más Pedidos
                    </span>
                  </label>
                </div>

              </div>

              {/* Menu lists rendering handler */}
              {(() => {
                // Filter helper
                const filterList = <T extends { name: string; description?: string; isSpecialty?: boolean; isPopular?: boolean }>(
                  arr: T[]
                ): T[] => {
                  return arr.filter((item) => {
                    if (menuOnlySpecialties && !item.isSpecialty) return false;
                    if (menuOnlyPopular && !item.isPopular) return false;
                    if (menuSearchQuery) {
                      const q = menuSearchQuery.toLowerCase();
                      const matchName = item.name.toLowerCase().includes(q);
                      const matchDesc = item.description?.toLowerCase().includes(q) || false;
                      return matchName || matchDesc;
                    }
                    return true;
                  });
                };

                const filteredBreakfasts = filterList(BREAKFAST_ITEMS);
                const filteredRaciones = filterList(RACION_ITEMS);
                const filteredBocadillos = filterList(BOCADILLO_ITEMS);
                const filteredWineBeers = filterList(WINE_BEER_ITEMS);

                const hasMatches = 
                  filteredBreakfasts.length > 0 || 
                  filteredRaciones.length > 0 || 
                  filteredBocadillos.length > 0 || 
                  filteredWineBeers.length > 0;

                if (!hasMatches) {
                  return (
                    <div className="text-center py-16 bg-white rounded-2xl border border-gray-200/60 p-8 shadow-xs">
                      <p className="text-gray-400 font-mono text-xs">SIN COINCIDENCIAS</p>
                      <h3 className="text-zinc-800 font-display font-bold text-lg mt-2">No encontramos platos con esos filtros de búsqueda</h3>
                      <button
                        onClick={() => {
                          setSelectedMenuCategory('todos');
                          setMenuSearchQuery('');
                          setMenuOnlySpecialties(false);
                          setMenuOnlyPopular(false);
                        }}
                        className="mt-4 bg-brand-accent hover:bg-brand-accent-dark text-brand-charcoal font-bold px-5 py-2.5 rounded-lg text-xs cursor-pointer"
                      >
                        Resetear Filtros
                      </button>
                    </div>
                  );
                }

                // Render lists based on selected target tab
                return (
                  <div className="space-y-12">
                    
                    {/* SECTION 1: BREAKFASTS */}
                    {(selectedMenuCategory === 'todos' || selectedMenuCategory === 'desayunos') && filteredBreakfasts.length > 0 && (
                      <div className="bg-white rounded-3xl border border-gray-200/60 p-6 sm:p-8 shadow-xs">
                        <div className="flex items-center space-x-3 mb-6 border-b border-gray-100 pb-4">
                          <span className="text-2xl">🍳</span>
                          <div>
                            <h3 className="font-display font-extrabold text-xl sm:text-2xl text-brand-charcoal">Desayunos y Ofertas</h3>
                            <p className="text-xs text-gray-400">Empezar el día al estilo Bar Terra de Ciudad Real</p>
                          </div>
                        </div>

                        {/* Breakfast sub-sections */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                          
                          {/* Cafetería / Bebidas Calientes */}
                          <div>
                            <h4 className="font-display font-bold text-base text-zinc-800 mb-4 flex items-center gap-2">
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-accent" />
                              Cafés e Infusiones
                            </h4>
                            <div className="space-y-4">
                              {filteredBreakfasts.filter(i => i.type === 'bebida').map(item => (
                                <div key={item.id} className="flex justify-between items-start border-b border-dashed border-gray-200 pb-3 hover:bg-neutral-50 px-2 rounded-lg transition-colors">
                                  <div>
                                    <h5 className="font-bold text-sm text-brand-charcoal">{item.name}</h5>
                                    {item.description && <p className="text-xs text-gray-400 mt-0.5">{item.description}</p>}
                                  </div>
                                  <span className="font-mono text-xs font-bold bg-brand-accent/20 px-2.5 py-1 rounded-md text-brand-charcoal shrink-0">
                                    {item.priceFull}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Tostadas y Sándwiches Table */}
                          <div>
                            <h4 className="font-display font-bold text-base text-zinc-800 mb-4 flex items-center gap-2">
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-accent" />
                              Tostadas y Sándwiches
                            </h4>
                            <div className="overflow-x-auto">
                              <table className="w-full text-left text-xs border-collapse">
                                <thead>
                                  <tr className="border-b border-gray-200 text-gray-400">
                                    <th className="py-2 font-semibold">Tostada / Sándwich</th>
                                    <th className="py-2 text-right font-semibold px-2">Media (1/2)</th>
                                    <th className="py-2 text-right font-semibold">Entera</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {filteredBreakfasts.filter(i => i.type === 'tostada').map(item => (
                                    <tr key={item.id} className="border-b border-gray-100 hover:bg-neutral-50 rounded-lg">
                                      <td className="py-3 pr-2">
                                        <p className="font-bold text-brand-charcoal text-sm">{item.name}</p>
                                        {item.description && <p className="text-2xs text-gray-400 mt-0.5 leading-relaxed">{item.description}</p>}
                                      </td>
                                      <td className="py-3 text-right text-sm font-mono font-bold text-gray-500 px-2">
                                        {item.priceHalf || "—"}
                                      </td>
                                      <td className="py-3 text-right text-sm font-mono font-bold text-brand-charcoal">
                                        {item.priceFull}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>

                        </div>

                        {/* Combos Oferta */}
                        {filteredBreakfasts.filter(i => i.type === 'combo').length > 0 && (
                          <div className="mt-8 border-t border-gray-100 pt-6">
                            <h4 className="font-display font-bold text-base text-zinc-800 mb-4 flex items-center gap-2">
                              <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-accent" />
                              Combos Oferta Especial de Desayuno (Café Incluido)
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {filteredBreakfasts.filter(i => i.type === 'combo').map(item => (
                                <div key={item.id} className="p-4 rounded-2xl bg-zinc-55 border border-brand-accent/20 bg-brand-accent/[0.04] flex flex-col justify-between hover:scale-[1.01] transition-transform">
                                  <div>
                                    <span className="text-[10px] uppercase font-mono font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded shadow-2xs mb-2 inline-block">
                                      ⚡ Combo Ahorro
                                    </span>
                                    <h5 className="font-bold text-sm text-brand-charcoal mb-1">{item.name}</h5>
                                    {item.description && <p className="text-xs text-gray-400 mb-3">{item.description}</p>}
                                  </div>
                                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-200/40">
                                    <span className="font-mono text-sm font-bold bg-brand-accent text-brand-charcoal px-3 py-1 rounded-lg">
                                      {item.priceFull}
                                    </span>
                                    <button 
                                      onClick={() => openBookingForEvent(`Desayunar un Combo: ${item.name}`)}
                                      className="text-xs font-bold text-zinc-600 hover:text-brand-charcoal"
                                    >
                                      Pedir Mesa 📱
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* SECTION 2: RACIONES GENEROSAS */}
                    {(selectedMenuCategory === 'todos' || selectedMenuCategory === 'raciones') && filteredRaciones.length > 0 && (
                      <div className="bg-white rounded-3xl border border-gray-200/60 p-6 sm:p-8 shadow-xs">
                        <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4 flex-wrap gap-2">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">🍽️</span>
                            <div>
                              <h3 className="font-display font-extrabold text-xl sm:text-2xl text-brand-charcoal">Raciones Generosas</h3>
                              <p className="text-xs text-gray-400">Platos tradicionales abundantes para compartir a cualquier hora</p>
                            </div>
                          </div>
                          <span className="bg-brand-charcoal text-white text-[10px] font-mono px-3 py-1 rounded-full uppercase">
                            {filteredRaciones.length} raciones confirmadas
                          </span>
                        </div>

                        {/* Raciones Desktop and Mobile friendly view */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          {filteredRaciones.map((item) => (
                            <div 
                              key={item.id} 
                              className="p-4 sm:p-5 rounded-2xl border border-gray-200/50 hover:border-brand-accent/40 bg-white hover:shadow-xs transition-all flex flex-col justify-between"
                            >
                              <div>
                                <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                                  {item.isSpecialty && (
                                    <span className="bg-amber-100 text-amber-800 text-[9px] uppercase font-bold font-mono px-2 py-0.5 rounded">
                                      🌟 Recomendación estrella
                                    </span>
                                  )}
                                  {item.isPopular && (
                                    <span className="bg-red-50 text-red-800 text-[9px] uppercase font-bold font-mono px-2 py-0.5 rounded animate-pulse">
                                      🔥 Más pedido
                                    </span>
                                  )}
                                </div>

                                <h4 className="font-display font-extrabold text-base text-zinc-800 mb-1 leading-tight flex items-center gap-1">
                                  {item.name}
                                </h4>
                                {item.description && (
                                  <p className="text-gray-400 text-xs leading-relaxed mb-4 pr-2">
                                    {item.description}
                                  </p>
                                )}
                              </div>

                              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                <div className="flex space-x-3 text-xs">
                                  {item.priceHalf && (
                                    <div className="flex flex-col">
                                      <span className="text-gray-400 text-[10px] font-mono select-none uppercase">Media Ración</span>
                                      <span className="font-mono font-bold text-gray-500 bg-neutral-100 px-2 py-0.5 rounded mt-0.5">
                                        {item.priceHalf}
                                      </span>
                                    </div>
                                  )}
                                  <div className="flex flex-col">
                                    <span className="text-gray-400 text-[10px] font-mono select-none uppercase">Ración Entera</span>
                                    <span className="font-mono font-bold text-brand-charcoal bg-brand-accent/25 px-2 py-0.5 rounded mt-0.5">
                                      {item.priceFull}
                                    </span>
                                  </div>
                                </div>

                                <button
                                  onClick={() => openBookingForEvent(`Ración de ${item.name}`)}
                                  className="text-xs font-bold text-gray-600 hover:text-brand-charcoal text-right leading-none cursor-pointer p-2 hover:bg-neutral-50 rounded"
                                  title="Reservar mesa para pedir"
                                >
                                  Reservar Mesa 📱
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* SECTION 3: PULGAS, MONTADOS Y BOCADILLOS */}
                    {(selectedMenuCategory === 'todos' || selectedMenuCategory === 'bocadillos') && filteredBocadillos.length > 0 && (
                      <div className="bg-white rounded-3xl border border-gray-200/60 p-6 sm:p-8 shadow-xs">
                        <div className="flex items-center space-x-3 mb-6 border-b border-gray-100 pb-4">
                          <span className="text-2xl">🥖</span>
                          <div>
                            <h3 className="font-display font-extrabold text-xl sm:text-2xl text-brand-charcoal">Pulgas, Montados y Bocadillos</h3>
                            <p className="text-xs text-gray-400">Pan rústico recién horneado con el embutido o asado de tu preferencia</p>
                          </div>
                        </div>

                        {/* Bocadillos table with responsive layout */}
                        <div className="overflow-x-auto mb-8">
                          <table className="w-full text-xs text-left border-collapse min-w-[500px]">
                            <thead>
                              <tr className="border-b border-gray-200 text-gray-400 text-[10px] uppercase font-mono">
                                <th className="py-2 text-gray-500">Ingrediente principal</th>
                                <th className="py-2 text-right px-2">Pulga (pequeño)</th>
                                <th className="py-2 text-right px-2">Montado (mediano)</th>
                                <th className="py-2 text-right">Bocadillo (gigante)</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredBocadillos.map((item) => (
                                <React.Fragment key={item.id}>
                                  {/* Normal Solo row */}
                                  <tr className="border-b border-gray-100 hover:bg-neutral-50/50">
                                    <td className="py-3">
                                      <div className="flex items-center gap-1.5">
                                        <p className="font-bold text-sm text-brand-charcoal">{item.name}</p>
                                        {item.isSpecialty && <span className="bg-amber-100 text-amber-800 text-[8px] font-bold uppercase rounded px-1">Especial</span>}
                                        {item.isPopular && <span className="bg-red-15 text-red-800 text-[8px] font-bold uppercase rounded px-1">Top</span>}
                                      </div>
                                      {item.description && <p className="text-gray-400 text-2xs mt-0.5">{item.description}</p>}
                                    </td>
                                    <td className="py-3 text-right font-mono font-bold text-gray-500 px-2">
                                      {item.pricePulga}
                                    </td>
                                    <td className="py-3 text-right font-mono font-bold text-gray-500 px-2">
                                      {item.priceMontado}
                                    </td>
                                    <td className="py-3 text-right font-mono font-bold text-brand-charcoal">
                                      {item.priceBocadillo}
                                    </td>
                                  </tr>

                                  {/* With Cheese Option Row */}
                                  {item.hasCheeseOption && item.pricePulgaCheese && (
                                    <tr className="border-b border-gray-100 bg-[#fbfbf8]/30 hover:bg-neutral-50/50">
                                      <td className="py-2 pl-3">
                                        <p className="text-xs text-zinc-600 font-medium flex items-center gap-1.5">
                                          <span>🧀 Con queso fundido</span>
                                        </p>
                                      </td>
                                      <td className="py-2 text-right font-mono text-xs text-gray-400 px-2 select-none">
                                        {item.pricePulgaCheese}
                                      </td>
                                      <td className="py-2 text-right font-mono text-xs text-gray-400 px-2 select-none">
                                        {item.priceMontadoCheese}
                                      </td>
                                      <td className="py-2 text-right font-mono text-xs font-bold text-amber-800">
                                        {item.priceBocadilloCheese}
                                      </td>
                                    </tr>
                                  )}
                                </React.Fragment>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        {/* Extras Tortilla */}
                        <div className="bg-neutral-50 rounded-2xl p-5 border border-gray-150">
                          <h4 className="font-display font-bold text-sm text-zinc-800 mb-3 flex items-center gap-2">
                            <span>🍳</span> Extras de Tortillas de la Casa
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                            {EXTRA_TORTILLAS.map((extra, idx) => (
                              <div key={idx} className="flex justify-between items-center bg-white p-3.5 rounded-xl border border-gray-200">
                                <div>
                                  <p className="font-bold text-brand-charcoal">{extra.name}</p>
                                  <p className="text-[10px] text-gray-400 mt-0.5">{extra.desc}</p>
                                </div>
                                <span className="font-mono font-black text-xs text-brand-charcoal bg-brand-accent/25 px-2 py-1 rounded">
                                  {extra.price}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>
                    )}

                    {/* SECTION 4: BODEGA Y CERVEZAS */}
                    {(selectedMenuCategory === 'todos' || selectedMenuCategory === 'bebidas_vinos') && filteredWineBeers.length > 0 && (
                      <div className="bg-white rounded-3xl border border-gray-200/60 p-6 sm:p-8 shadow-xs">
                        <div className="flex items-center space-x-3 mb-6 border-b border-gray-100 pb-4">
                          <span className="text-2xl">🍷</span>
                          <div>
                            <h3 className="font-display font-extrabold text-xl sm:text-2xl text-brand-charcoal">Nuestra Bodega & Cervezas</h3>
                            <p className="text-xs text-gray-400">Gran surtido de caldos de la tierra y cañas tiradas como manda la técnica</p>
                          </div>
                        </div>

                        {/* Wine-Beer sub grids */}
                        <div className="space-y-8">
                          
                          {/* Cervezas */}
                          {filteredWineBeers.filter(i => i.type === 'cerveza').length > 0 && (
                            <div>
                              <h4 className="font-display font-bold text-base text-zinc-800 mb-4 flex items-center gap-2 border-l-2 border-brand-accent pl-2.5">
                                Cervezas Especiales & Cañas Fofas
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {filteredWineBeers.filter(i => i.type === 'cerveza').map(item => (
                                  <div key={item.id} className="flex justify-between items-center border-b border-gray-100 pb-3 p-2 hover:bg-neutral-50 rounded-lg">
                                    <div>
                                      <p className="font-bold text-sm text-brand-charcoal flex items-center gap-1.5">
                                        {item.name}
                                        {item.isPopular && <span className="text-[8px] bg-red-100 text-red-800 px-1.5 py-0.5 rounded font-mono font-bold">TOP</span>}
                                      </p>
                                      {item.description && <p className="text-gray-400 text-2xs mt-0.5">{item.description}</p>}
                                    </div>
                                    <span className="font-mono text-xs font-bold bg-zinc-800 text-white px-2.5 py-1 rounded">
                                      {item.price}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Vinos Blancos */}
                          {filteredWineBeers.filter(i => i.type === 'vino_blanco').length > 0 && (
                            <div>
                              <h4 className="font-display font-bold text-base text-zinc-800 mb-4 flex items-center gap-2 border-l-2 border-brand-accent pl-2.5">
                                Vinos Blancos Selectos (Por Copa)
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {filteredWineBeers.filter(i => i.type === 'vino_blanco').map(item => (
                                  <div key={item.id} className="flex justify-between items-center border-b border-gray-100 pb-3 p-2 hover:bg-neutral-50 rounded-lg">
                                    <div>
                                      <p className="font-bold text-sm text-brand-charcoal">{item.name}</p>
                                      {item.description && <p className="text-gray-400 text-2xs mt-0.5">{item.description}</p>}
                                    </div>
                                    <span className="font-mono text-xs font-semibold bg-amber-50 text-amber-900 border border-amber-200 px-2.5 py-1 rounded">
                                      {item.price}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Vinos Tintos */}
                          {filteredWineBeers.filter(i => i.type === 'vino_tinto').length > 0 && (
                            <div>
                              <h4 className="font-display font-bold text-base text-zinc-800 mb-4 flex items-center gap-2 border-l-2 border-brand-accent pl-2.5">
                                Vinos Tintos de Denominación y Crianza (Por Copa)
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {filteredWineBeers.filter(i => i.type === 'vino_tinto').map(item => (
                                  <div key={item.id} className="bg-[#fbfbf8]/50 p-4 rounded-xl border border-gray-200/60 flex flex-col justify-between hover:border-zinc-300">
                                    <div>
                                      <div className="flex items-center justify-between gap-2 mb-1.5">
                                        <p className="font-bold text-sm text-brand-charcoal">{item.name}</p>
                                        <span className="font-mono text-xs font-bold text-zinc-800 bg-brand-accent px-2 py-0.5 rounded">
                                          {item.price}
                                        </span>
                                      </div>
                                      {item.description && <p className="text-gray-400 text-[11px] leading-relaxed mb-3">{item.description}</p>}
                                    </div>
                                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-100">
                                      {item.isSpecialty && <span className="bg-purple-100 text-purple-800 text-[8px] uppercase font-bold font-mono px-1 rounded">🍷 Selección Especial de Pago</span>}
                                      {item.isPopular && <span className="bg-red-50 text-red-800 text-[8px] uppercase font-bold font-mono px-1 rounded">🔥 Favorito de la casa</span>}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                        </div>
                      </div>
                    )}

                  </div>
                );
              })()}

              {/* Conversion warning */}
              <div className="bg-brand-charcoal text-white p-8 rounded-3xl text-center md:text-left mt-16 flex flex-col md:flex-row items-center justify-between gap-6 border border-white/5">
                <div>
                  <h3 className="font-display font-bold text-xl mb-1">¿Tienes alergias o intolerancias alimentarias?</h3>
                  <p className="text-gray-400 text-xs">Por favor, avísanos antes de realizar tu pedido para adaptar nuestros platos y garantizar la presencia o ausencia de alérgenos.</p>
                </div>
                <a
                  href="tel:+34626497337"
                  className="bg-brand-accent hover:bg-brand-accent-dark text-brand-charcoal font-black text-sm px-6 py-3.5 rounded-xl shrink-0 transition-all shadow-md block"
                >
                  Confirmar alérgenos con el Chef 👨‍🍳
                </a>
              </div>

            </motion.div>
          )}

          {/* EVENTOS & DEPORTES VIEW */}
          {activeTab === 'deportes' && (
            <motion.div
              key="deportes-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12"
            >
              
              {/* Event Header details */}
              <div className="text-center max-w-3xl mx-auto mb-12">
                <span className="text-brand-accent font-semibold font-mono text-xs tracking-widest uppercase bg-brand-accent/10 px-3 py-1.5 rounded-full">
                  DEPORTE Y CAÑA FRESCA
                </span>
                <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-charcoal mt-4 mb-3 tracking-tight">
                  Dónde ver F1, MotoGP y fútbol en Ciudad Real
                </h2>
                <p className="text-gray-500 text-sm">
                  No veas las carreras en el sofá de casa solo. En Bar Terra solemos reunirnos todos los fanáticos del motor y fútbol de la comarca con sonido de ruidos reales y cerveza helada. ¡Reserva tu sitio ante el televisor!
                </p>
              </div>

              {/* Countdown Ticker to next Grand Prix / Event */}
              <div className="bg-zinc-900 rounded-3xl p-6 sm:p-8 text-white border border-white/5 shadow-xl mb-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-brand-accent/5 blur-3xl pointer-events-none" />
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                  
                  <div className="flex items-center space-x-4">
                    <div className="bg-brand-accent w-14 h-14 rounded-2xl flex items-center justify-center text-brand-charcoal shrink-0 shadow-md">
                      <Tv className="w-8 h-8" />
                    </div>
                    <div>
                      <span className="bg-red-500/20 text-red-400 text-[10px] font-bold font-mono px-2 py-0.5 rounded tracking-widest uppercase block w-max mb-1">
                        PRÓXIMO EVENTO EN DIRECTO
                      </span>
                      <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white">
                        GP de España de Fórmula 1 (Clasificación & Carrera)
                      </h3>
                      <p className="text-gray-400 text-xs font-mono mt-1">
                        Sábado 30 de Mayo a las 15:00 - Pantalla Gigante Principal
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => openBookingForEvent('GP de España F1')}
                    className="bg-brand-accent hover:bg-brand-accent-dark text-brand-charcoal font-black px-6 py-4 rounded-xl text-sm transition-all shadow-md shrink-0 w-full md:w-auto text-center"
                  >
                    Reserva tu mesa favorita 🏎️
                  </button>

                </div>
              </div>

              {/* Schedule listing cards for sports */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {SPORTS_EVENTS.map((event) => (
                  <div
                    key={event.id}
                    className="bg-white rounded-2xl border border-gray-200/60 overflow-hidden shadow-xs flex flex-col justify-between hover:border-brand-accent/40 transition-colors"
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span className={`px-2.5 py-1 text-2xs font-bold font-mono uppercase rounded-md ${
                          event.category === 'F1'
                            ? 'bg-red-100 text-red-800'
                            : event.category === 'MotoGP'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {event.category} Event
                        </span>
                        {event.isLive && (
                          <span className="bg-red-500/10 text-red-500 border border-red-500/20 text-[10px] font-bold font-mono px-2 py-0.5 rounded-md flex items-center gap-1.5 animate-pulse">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500" /> retransmisión confirmada
                          </span>
                        )}
                      </div>

                      <h3 className="font-display font-extrabold text-xl text-brand-charcoal mb-2">
                        {event.title}
                      </h3>
                      
                      <div className="space-y-2 pt-2 text-xs text-gray-500">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-brand-accent shrink-0" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-brand-accent shrink-0" />
                          <span>Hora de emisión: <strong className="text-zinc-800">{event.time}</strong></span>
                        </div>
                        {event.location && (
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-brand-accent shrink-0" />
                            <span>{event.location}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="bg-neutral-50 px-6 py-4.5 border-t border-gray-200/40 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-gray-400">Sonido ambiente activado</span>
                      <button
                        onClick={() => openBookingForEvent(event.title)}
                        className="bg-brand-charcoal hover:bg-zinc-800 text-white font-bold text-xs px-4 py-2 rounded-lg transition-colors cursor-pointer"
                      >
                        Reservar mesa gratis 📱
                      </button>
                    </div>

                  </div>
                ))}
              </div>

              {/* Notice row to improve SEO */}
              <div className="mt-16 bg-[#fbfbf1]/40 border border-[#fbfbf1] rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-6">
                <div className="bg-brand-accent/20 p-3 rounded-xl text-brand-accent shrink-0">
                  <Flame className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-zinc-800 text-base mb-1">¿No ves tu carrera o partido programado?</h4>
                  <p className="text-gray-500 text-xs leading-relaxed">No te preocupes. Emitimos multitud de deportes. Si vienes a tomarte unas cañas con amigos y hay pantallas libres, puedes pedirnos amablemente el partido de tenis, fútbol o moto y lo sintonizaremos de inmediato.</p>
                </div>
              </div>

            </motion.div>
          )}

          {/* OPINIONES / TESTIMONIALS VIEW */}
          {activeTab === 'opiniones' && (
            <motion.div
              key="opiniones-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12"
            >
              
              {/* Header metrics */}
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="text-brand-accent font-semibold font-mono text-xs tracking-widest uppercase bg-brand-accent/10 px-3 py-1.5 rounded-full">
                  LA MEJOR RECOMENDACIÓN
                </span>
                <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-charcoal mt-4 mb-3 tracking-tight">
                  Lo que dicen nuestros clientes ⭐
                </h2>
                <p className="text-gray-500 text-sm">
                  Opiniones dejadas de forma pública en Google por vecinos y amantes de la Fórmula 1 y las raciones completas en Ciudad Real.
                </p>
              </div>

              {/* Meter Stats Box */}
              <div className="bg-white rounded-3xl border border-gray-200/80 p-6 sm:p-8 shadow-xs max-w-3xl mx-auto mb-12 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="text-center md:border-r border-gray-100 py-2">
                  <span className="font-display font-black text-5xl text-brand-charcoal">4.4</span>
                  <div className="flex items-center justify-center space-x-1 my-1.5 text-brand-accent">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-gray-400 font-mono">Puntuación Google</span>
                </div>

                <div className="space-y-2 md:col-span-2">
                  {[
                    { stars: 5, pct: '78%' },
                    { stars: 4, pct: '15%' },
                    { stars: 3, pct: '5%' },
                    { stars: 2, pct: '1%' },
                    { stars: 1, pct: '1%' }
                  ].map((bar, i) => (
                    <div key={i} className="flex items-center space-x-3 text-xs">
                      <span className="w-10 font-mono text-right text-gray-500">{bar.stars} estrellas</span>
                      <div className="flex-1 bg-neutral-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-brand-accent h-full rounded-full" style={{ width: bar.pct }} />
                      </div>
                      <span className="w-8 font-mono text-gray-400 text-right">{bar.pct}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews Cards List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {REVIEWS.map((review) => (
                  <div
                    key={review.id}
                    className="bg-white rounded-2xl border border-gray-200/60 p-6 shadow-xs flex flex-col justify-between hover:border-zinc-300 transition-colors"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-4 mb-4">
                        <div className="flex items-center space-x-3">
                          <img
                            src={review.avatarUrl || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2'}
                            alt={review.author}
                            className="w-10 h-10 rounded-full object-cover shadow-xs border border-neutral-100"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <p className="font-display font-extrabold text-sm text-brand-charcoal">{review.author}</p>
                            <p className="text-[10px] text-gray-400 font-mono">Usuario de Google Local Guide</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-0.5 text-brand-accent">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-current" />
                          ))}
                        </div>
                      </div>

                      <p className="text-gray-600 text-sm italic leading-relaxed">
                        "{review.text}"
                      </p>
                    </div>

                    <div className="pt-4 mt-6 border-t border-gray-100/60 flex items-center justify-between text-[11px] text-gray-400">
                      <span className="font-mono">Fecha: {review.date}</span>
                      <span className="bg-green-100 text-green-800 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase font-mono">
                        ✓ Reseña Verificada
                      </span>
                    </div>

                  </div>
                ))}
              </div>

              {/* Leave review redirection box */}
              <div className="bg-brand-charcoal rounded-3xl p-8 sm:p-12 text-center text-white mt-16 max-w-4xl mx-auto border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-brand-accent/5 blur-3xl pointer-events-none" />
                <h3 className="font-display font-extrabold text-2xl mb-2">¿Ya nos has visitado alguna vez? 🍻</h3>
                <p className="text-gray-400 text-sm max-w-xl mx-auto mb-6">Tu valoración en Google nos sirve de mucho para seguir mejorando. Si te encantan nuestras croquetas de cecina u oreja crunch, tómate 20 segundos para valorarnos.</p>
                
                <a
                  href="https://search.google.com/local/writereview?placeid=ChIJ8_KToHsc_g0R766O3P2G2Fk" 
                  target="_blank"
                  rel="noopener noreferrer"
                  referrerPolicy="no-referrer"
                  className="bg-brand-accent hover:bg-brand-accent-dark text-brand-charcoal hover:-translate-y-0.5 font-black text-sm px-8 py-4 rounded-xl inline-block transition-all shadow-md cursor-pointer"
                >
                  Dejar mi opinión en Google Maps ⭐
                </a>
              </div>

            </motion.div>
          )}

          {/* CONTACTO / UBICACIÓN VIEW */}
          {activeTab === 'contacto' && (
            <motion.div
              key="contacto-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12"
            >
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
                
                {/* Details left panel */}
                <div className="lg:col-span-5 flex flex-col justify-between space-y-8 h-full">
                  
                  <div className="space-y-4">
                    <span className="text-brand-accent font-semibold font-mono text-xs tracking-widest uppercase bg-brand-accent/10 px-3 py-1.5 rounded-full">
                      CÓMO LLEGAR Y HORARIOS
                    </span>
                    <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-charcoal tracking-tight">
                      Te esperamos en pleno Ciudad Real
                    </h2>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      El local cuenta con un trato inmejorable y aparcamiento fácil por la zona de Calle Libertad. Estamos muy cerca de las zonas más vivas de la capital.
                    </p>
                  </div>

                  <div className="space-y-4 bg-white p-6 rounded-2xl border border-gray-200/60 shadow-xs">
                    
                    <div className="flex items-start space-x-3.5">
                      <div className="bg-brand-accent/20 p-2.5 rounded-xl text-brand-charcoal mt-0.5">
                        <MapPin className="w-5 h-5 shrink-0" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-zinc-800">Ubicación física</h4>
                        <p className="text-xs text-gray-500 mt-1">Calle Libertad, 8, CP 13003, Ciudad Real, España</p>
                        <a
                          href="https://maps.google.com/?q=Bar+Terra+Calle+Libertad+8+Ciudad+Real"
                          target="_blank"
                          rel="noopener noreferrer"
                          referrerPolicy="no-referrer"
                          className="inline-flex items-center text-[11px] font-bold text-brand-accent-dark hover:underline mt-1 cursor-pointer"
                        >
                          Ver ruta interactiva en Maps
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3.5 pt-4 border-t border-gray-100">
                      <div className="bg-brand-accent/20 p-2.5 rounded-xl text-brand-charcoal mt-0.5">
                        <Phone className="w-5 h-5 shrink-0" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-zinc-800">Teléfono directo</h4>
                        <p className="text-xs text-gray-500 mt-1">Llama para encargos de comida para llevar o avisar para reservar mesa.</p>
                        <a
                          href={getSecurePhone()}
                          onMouseEnter={triggerInteraction}
                          onTouchStart={triggerInteraction}
                          className="inline-block text-sm font-bold text-zinc-800 hover:underline mt-1 font-mono"
                        >
                          {getSecurePhoneDisplay(true)}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3.5 pt-4 border-t border-gray-100">
                      <div className="bg-brand-accent/20 p-2.5 rounded-xl text-brand-charcoal mt-0.5">
                        <Clock className="w-5 h-5 shrink-0" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-zinc-800">Horarios de Apertura</h4>
                        <div className="text-xs text-gray-500 space-y-1 mt-1 font-mono">
                          <p className="flex justify-between"><span>De Lunes a Jueves:</span> <span>12:00 PM - 01:30 AM</span></p>
                          <p className="flex justify-between font-bold text-zinc-800"><span>Viernes y Sábados:</span> <span>11:30 AM - 02:00 AM</span></p>
                          <p className="flex justify-between"><span>Domingos:</span> <span>11:30 AM - 01:30 AM</span></p>
                        </div>
                      </div>
                    </div>

                  </div>

                  <div className="pt-4">
                    <button
                      onClick={() => openBookingForEvent('Mesa para cenar')}
                      className="w-full bg-brand-charcoal hover:bg-zinc-800 text-white font-extrabold py-4 rounded-xl text-center shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <MessageCircle className="w-5 h-5 text-brand-accent fill-brand-accent" />
                      Reservar Mesa por WhatsApp
                    </button>
                    <a
                      href="https://maps.google.com/?q=Bar+Terra+Calle+Libertad+8+Ciudad+Real"
                      target="_blank"
                      rel="noopener noreferrer"
                      referrerPolicy="no-referrer"
                      className="w-full bg-[#fbfbf8] hover:bg-neutral-100 text-zinc-800 border border-gray-200 mt-3 py-3.5 rounded-xl text-center font-bold text-xs flex items-center justify-center gap-2"
                    >
                      Cómo llegar con Google Maps
                    </a>
                  </div>

                </div>

                {/* Map right panel */}
                <div className="lg:col-span-7 h-full min-h-[350px] rounded-3xl overflow-hidden border border-gray-200/60 shadow-lg relative bg-white flex flex-col justify-between">
                  <div className="flex-1 w-full h-[380px] relative">
                    {/* Embedded Google Maps frame */}
                    <iframe
                      src="https://maps.google.com/maps?q=Bar%20Terra%20Calle%20Libertad%208%20Ciudad%20Real&t=&z=16&ie=UTF8&iwloc=&output=embed"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Ubicación Bar Terra en Ciudad Real"
                      className="rounded-t-3xl"
                    />
                  </div>
                  
                  <div className="p-5 bg-neutral-50/80 backdrop-blur-md border-t border-gray-200/60">
                    <p className="text-zinc-500 text-xs">
                      ¿Quieres comer las mejores croquetas de cecina o raciones abundantes de oreja recién cocinadas? Haz clic en la dirección para abrir la ruta ideal en tu aplicación preferida de GPS.
                    </p>
                  </div>
                </div>

              </div>

            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* FLOATING ACTION UTILITY — WHATSAPP CHAT */}
      <div className="fixed bottom-[84px] right-4 sm:bottom-6 sm:right-6 z-40">
        <motion.a
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.95 }}
          href={getSecureWhatsapp('Hola Bar Terra! Me gustaría reservar una mesa para hoy.')}
          onMouseEnter={triggerInteraction}
          onTouchStart={triggerInteraction}
          target="_blank"
          rel="noopener noreferrer"
          referrerPolicy="no-referrer"
          className="bg-emerald-500 hover:bg-emerald-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl transition-all relative"
          id="whatsapp-floating-btn"
        >
          {/* Pulsing ring indicator */}
          <span className="absolute -inset-1 rounded-full bg-emerald-500/30 animate-pulse pointer-events-none" />
          <MessageCircle className="w-7 h-7 fill-white text-emerald-500" />
          
          {/* Desktop pop tooltip */}
          <span className="hidden sm:block absolute right-16 scale-0 bg-brand-charcoal text-white text-xs font-bold font-mono px-3 py-1.5 rounded-lg shrink-0 shadow-lg border border-white/10 group-hover:scale-100 transition-all origin-right whitespace-nowrap">
            💬 ¡Reserva con WhatsApp en un clic!
          </span>
        </motion.a>
      </div>

      {/* MOBILE FLOAT NAVIGATION & CONTACT DOCK (CONVERSION CRO BOOSTER) */}
      <div className="fixed bottom-4 left-4 right-4 z-40 md:hidden">
        <div className="bg-zinc-950/90 backdrop-blur-xl border border-white/10 rounded-2xl p-1.5 flex items-center justify-between gap-1 shadow-2xl relative">
          
          {/* Tab: Inicio */}
          <button
            onClick={() => handleTabSwitch('inicio')}
            className={`flex-1 flex flex-col items-center justify-center py-2.5 rounded-xl transition-all duration-250 cursor-pointer min-h-[48px] ${
              activeTab === 'inicio' 
                ? 'text-brand-accent bg-white/5 font-bold' 
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Utensils className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-tight font-medium">Inicio</span>
          </button>

          {/* Tab: Carta */}
          <button
            onClick={() => handleTabSwitch('carta')}
            className={`flex-1 flex flex-col items-center justify-center py-2.5 rounded-xl transition-all duration-250 cursor-pointer min-h-[48px] ${
              activeTab === 'carta' 
                ? 'text-brand-accent bg-white/5 font-bold' 
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Clock className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-tight font-medium">Carta</span>
          </button>

          {/* Tab: Deportes */}
          <button
            onClick={() => handleTabSwitch('deportes')}
            className={`flex-1 flex flex-col items-center justify-center py-2.5 rounded-xl transition-all duration-250 cursor-pointer min-h-[48px] ${
              activeTab === 'deportes' 
                ? 'text-brand-accent bg-white/5 font-bold' 
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Tv className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-tight font-medium">Directos</span>
          </button>

          {/* Tab: Ubicación */}
          <button
            onClick={() => handleTabSwitch('contacto')}
            className={`flex-1 flex flex-col items-center justify-center py-2.5 rounded-xl transition-all duration-250 cursor-pointer min-h-[48px] ${
              activeTab === 'contacto' 
                ? 'text-brand-accent bg-white/5 font-bold' 
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <MapPin className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-tight font-medium">Llegar</span>
          </button>

          {/* Tab CTA: Reservas Modal */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => openBookingForEvent('General / Cena')}
            className="flex-1 bg-brand-accent text-brand-charcoal py-2.5 px-1.5 rounded-xl flex flex-col items-center justify-center transition-all duration-200 shadow-md shadow-brand-accent/10 hover:bg-brand-accent-dark font-extrabold cursor-pointer min-h-[48px] shine-effect shrink-0 ml-1"
          >
            <Calendar className="w-4 h-4 mb-0.5 text-brand-charcoal" />
            <span className="text-[10px] tracking-tight">Reservar</span>
          </motion.button>

        </div>
      </div>

      {/* FOOTER SECTION & LOCAL SEO OPTIMIZATION CARD */}
      <footer className="bg-brand-charcoal text-white pt-16 pb-32 md:pb-12 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            
            {/* NAP Block */}
            <div className="space-y-4">
              <span className="font-display font-black text-xl text-brand-accent">BAR TERRA</span>
              <p className="text-gray-400 text-xs leading-relaxed">
                El rincón auténtico donde disfrutar de generosas tapas tradicionales, raciones abundantes y retransmisión deportiva apasionada en Ciudad Real.
              </p>
              <div className="text-xs text-gray-400 space-y-1.5 font-mono">
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-brand-accent" />
                  <span>Calle Libertad 8, 13003 Ciudad Real</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-brand-accent" />
                  <a
                    href={getSecurePhone()}
                    onMouseEnter={triggerInteraction}
                    onTouchStart={triggerInteraction}
                    className="hover:underline"
                  >
                    {getSecurePhoneDisplay(true)}
                  </a>
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-display font-extrabold text-sm uppercase tracking-wider mb-4 text-brand-accent">Secciones</h4>
              <ul className="space-y-2.5 text-xs text-gray-400">
                {['inicio', 'carta', 'deportes', 'opiniones', 'contacto'].map((tab) => (
                  <li key={tab}>
                    <button
                      onClick={() => handleTabSwitch(tab as any)}
                      className="hover:text-white capitalize transition-colors cursor-pointer text-left"
                    >
                      {tab === 'deportes' ? 'Deportes en directo' : tab}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Structured local keywords for advanced crawler SEO */}
            <div>
              <h4 className="font-display font-extrabold text-sm uppercase tracking-wider mb-4 text-brand-accent">Enlaces locales</h4>
              <ul className="space-y-2 text-2xs text-gray-400 font-mono">
                {LOCAL_SEO_KEYWORDS.slice(0, 6).map((kw, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-brand-accent" />
                    <span>{kw}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Opening hours list */}
            <div>
              <h4 className="font-display font-extrabold text-sm uppercase tracking-wider mb-4 text-brand-accent">Horarios</h4>
              <div className="text-xs text-gray-400 space-y-1.5 font-mono">
                <p>Lunes - Jueves: 12:00 - 1:30 | Cocina abierta</p>
                <p className="text-white font-bold">Viernes - Sábado: 11:30 - 2:00</p>
                <p>Domingo: 11:30 - 1:30</p>
              </div>
            </div>

          </div>

          <div className="pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 font-mono">
            <p>© 2026 Bar Terra Ciudad Real. Todos los derechos reservados.</p>
            <p className="flex items-center gap-1.5 mt-4 sm:mt-0">
              Desarrollado con amor por la F1 y las buenas tapas.
            </p>
          </div>

        </div>
      </footer>

      {/* DYNAMIC BOOKING MODAL WITH INTERACTIVE DATA */}
      <AnimatePresence>
        {bookingModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            
            {/* Modal backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setBookingModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Modal dialog content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative z-10 border border-neutral-100"
            >
              
              {/* Header block */}
              <div className="bg-brand-charcoal text-white p-6 relative">
                <button
                  onClick={() => setBookingModalOpen(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white"
                  aria-label="Cerrar Reserva"
                >
                  <X className="w-5 h-5" />
                </button>
                <span className="text-brand-accent text-[9px] font-bold font-mono tracking-widest uppercase block mb-1">
                  Reserva online directa
                </span>
                <h3 className="font-display font-extrabold text-xl">
                  {bookingSuccess ? '¡Mesa Reservada con Éxito!' : `Reserva para: ${selectedSportForBooking}`}
                </h3>
              </div>

              {bookingSuccess ? (
                /* Success booking message */
                <div className="p-8 text-center space-y-6">
                  <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <Check className="w-10 h-10" />
                  </div>
                  <div>
                    <h4 className="font-display font-extrabold text-zinc-800 text-lg">Tu reserva provisional está lista</h4>
                    <p className="text-gray-500 text-xs leading-relaxed mt-2">
                      Para garantizar y confirmar de forma instantánea, pulsa en el botón de abajo para enviar los datos por WhatsApp a nuestro encargado del local. ¡Te contestaremos en menos de 5 minutos!
                    </p>
                  </div>

                  <div className="bg-neutral-50 p-4 rounded-xl border border-gray-100 text-left space-y-2 text-xs font-mono">
                    <p><strong>Titular:</strong> {bookingForm.name}</p>
                    <p><strong>Personas:</strong> {bookingForm.guests} personas</p>
                    <p><strong>Día:</strong> {bookingForm.date || 'Por defecto'}</p>
                    <p><strong>Hora:</strong> {bookingForm.time}</p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <button
                      onClick={triggerWhatsAppBooking}
                      className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 shadow-md transition-colors"
                    >
                      <MessageCircle className="w-5 h-5 fill-white" />
                      Enviar Reserva por WhatsApp
                    </button>
                    
                    <button
                      onClick={() => {
                        setBookingSuccess(false);
                        setBookingModalOpen(false);
                      }}
                      className="w-full text-zinc-500 hover:text-zinc-800 text-xs font-bold"
                    >
                      Volver a la web
                    </button>
                  </div>
                </div>
              ) : (
                /* Interactive Form block */
                <form onSubmit={handleBookingSubmit} className="p-6 space-y-4">
                  
                  {/* Name field */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Nombre del Titular *
                    </label>
                    <input
                      type="text"
                      required
                      value={bookingForm.name}
                      onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                      placeholder="Ej: Marcos García"
                      className="w-full bg-[#fbfbf8] border border-gray-200 text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-brand-accent focus:border-brand-accent"
                    />
                  </div>

                  {/* Phone field */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Teléfono de contacto *
                    </label>
                    <input
                      type="tel"
                      required
                      value={bookingForm.phone}
                      onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                      placeholder="Ej: 600 00 00 00"
                      className="w-full bg-[#fbfbf8] border border-gray-200 text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-brand-accent focus:border-brand-accent"
                    />
                  </div>

                  {/* Date & Time Row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                        Fecha deseada
                      </label>
                      <input
                        type="date"
                        value={bookingForm.date}
                        onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                        className="w-full bg-[#fbfbf8] border border-gray-200 text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-brand-accent focus:border-brand-accent"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                        Hora aprox.
                      </label>
                      <select
                        value={bookingForm.time}
                        onChange={(e) => setBookingForm({ ...bookingForm, time: e.target.value })}
                        className="w-full bg-[#fbfbf8] border border-gray-200 text-sm rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-brand-accent focus:border-brand-accent"
                      >
                        <option value="12:30">12:30 (Aperitivo)</option>
                        <option value="13:30">13:30 (Comida)</option>
                        <option value="15:00">15:00 (Carrera F1)</option>
                        <option value="20:00">20:00 (Cena Temprana)</option>
                        <option value="21:00">21:00 (Cena / Fútbol)</option>
                        <option value="22:00">22:00 (Cena tardía)</option>
                      </select>
                    </div>
                  </div>

                  {/* Quantity of guests selective slots */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Número de personas
                    </label>
                    <div className="grid grid-cols-5 gap-2">
                      {['1', '2', '3', '4', '5+'].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setBookingForm({ ...bookingForm, guests: num })}
                          className={`py-2 rounded-lg text-xs font-bold cursor-pointer transition-colors ${
                            bookingForm.guests === num
                              ? 'bg-brand-accent text-brand-charcoal'
                              : 'bg-neutral-100 hover:bg-neutral-200 text-gray-700'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Extra info text area */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                      Comentarios o Notas extras
                    </label>
                    <textarea
                      value={bookingForm.extraInfo}
                      onChange={(e) => setBookingForm({ ...bookingForm, extraInfo: e.target.value })}
                      placeholder="Ej: Quiero estar cerca de la pantalla de F1 / Alergias"
                      className="w-full bg-[#fbfbf8] border border-gray-200 text-sm rounded-xl px-4 py-2 h-16 resize-none focus:outline-none focus:ring-1 focus:ring-brand-accent focus:border-brand-accent"
                    />
                  </div>

                  <div className="pt-4 flex items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={() => setBookingModalOpen(false)}
                      className="flex-1 border border-gray-200 text-gray-500 py-3.5 rounded-xl text-xs font-bold hover:bg-neutral-50"
                    >
                      Cancelar
                    </button>
                    
                    <button
                      type="submit"
                      className="flex-1 bg-brand-accent hover:bg-brand-accent-dark text-brand-charcoal py-3.5 rounded-xl text-xs font-extrabold shadow-md transition-colors"
                    >
                      Siguiente: Confirmar
                    </button>
                  </div>

                </form>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
