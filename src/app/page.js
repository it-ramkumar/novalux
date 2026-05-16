"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import {
  Shield, Truck, CheckCircle, ArrowRight, ArrowUpRight,
  ChevronLeft, ChevronRight, RotateCcw,
  Users, Sparkles, Award, Wrench,
  Menu, X, Instagram, Facebook, Mail, Phone, MapPin, Clock as ClockIcon,
  Plus, Minus, Info, Home, Maximize,
  Layers, ShieldCheck, Send, Compass, Anchor, Zap,
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════════════════
   IMAGE PATHS
   ═══════════════════════════════════════════════════════════════════════════ */

const IMG = (key, i, ext = 'webp') => `/images/novalux/${key}-${i}.${ext}`;
const imgs = (key, count, ext = 'webp') =>
  Array.from({ length: count }, (_, i) => IMG(key, i + 1, ext));

const HERO_IMAGE = '/images/n2.png';

/* ═══════════════════════════════════════════════════════════════════════════
   LINKS — Van Parts Outlet
   - Footer Lineup links all go to /pages/seats (per user request)
   ═══════════════════════════════════════════════════════════════════════════ */

const SHOP_BASE = 'https://vanpartsoutlet.com';
const SEATS_PAGE = `${SHOP_BASE}/pages/seats`;
const SHOP_COLLECTION = `${SHOP_BASE}/collections/van-seats-1`;
const productUrl = (handle) => `${SHOP_BASE}/products/${handle}`;

const LINKS = {
  shopAll: SHOP_COLLECTION,
  contact: `${SHOP_BASE}/pages/contact`,
  about: `${SHOP_BASE}/pages/about-us`,
  faq: `${SHOP_BASE}/pages/faqs`,
  warranty: `${SHOP_BASE}/pages/warranty`,
  terms: `${SHOP_BASE}/pages/terms-of-service`,
  privacy: `${SHOP_BASE}/pages/privacy-policy`,
  returns: `${SHOP_BASE}/pages/return-policy`,
  email: 'mailto:Vanpartsoutlet@gmail.com',
  facebook: 'https://www.facebook.com/VanPartsOutlet',
  instagram: 'https://www.instagram.com/vanpartsoutlet/',
};

const BUSINESS = {
  address: '413 West Big Bear Blvd, Big Bear City, CA 92314 US',
  hours: 'Mon–Fri: 9am–5pm · Sat–Sun: Closed',
  phone: '+1 (951) 441-9719',
  email: 'Vanpartsoutlet@gmail.com',
};

/* ═══════════════════════════════════════════════════════════════════════════
   FLAGSHIP — Triple Van Seat
   ═══════════════════════════════════════════════════════════════════════════ */

const FLAGSHIP = {
  id: 'triple',
  name: 'NovaLux Triple Van Seat',
  tagline: 'Three-passenger seat. Six-foot bed. One transformation.',
  description:
    'Space-saving camper van seat with a 6-foot bed and a black leather finish. Engineered for real travel.',
  price: 3550,
  width: '120 cm / 47.2"',
  bedLength: '6 ft',
  capacity: '3 passengers',
  handle: 'novalux-triple-van-seat-with-recline-bed-conversion',
  status: 'Built to Order',
  images: imgs('triple', 6),
  features: [
    'Integrated 3-point seat belts on all three positions',
    'Rear child-seat anchor points (upper tether)',
    'Reclinable backrest converts to bed in seconds',
    'Swivel function for flexible van space',
    'Flush-sliding headrests engineered for vans',
    'Dedicated flat sleeping surface — true 6-foot bed',
    'Drop-down rear support panel (47" wide) for stability',
    '~8" slider for fine seat or bed positioning',
    'Bolt-in install — no specialty subfloor required',
    'Premium black leather upholstery',
  ],
};

/* ═══════════════════════════════════════════════════════════════════════════
   SEAT LINEUP
   ═══════════════════════════════════════════════════════════════════════════ */

const SEAT_LINEUP = [
  {
    id: 'duo-xr',
    name: 'NovaLux Duo XR',
    tagline: 'The ultimate convertible swivel double',
    blurb:
      'Top-tier dual-seat system engineered for premium builds. Swivel rotation, multi-position recline, and full seat-to-bed conversion with FMVSS 207/210 compliant construction.',
    price: 4400,
    width: 'Double',
    handle: 'novalux-duo-xr',
    inventory: 1,
    badge: 'Top Tier',
    images: imgs('duo-xr', 5),
    highlights: [
      'Full 360° swivel rotation',
      'Multi-position recline',
      'Seat-to-bed conversion',
      'FMVSS 207/210 compliant',
      'Premium upholstery',
    ],
  },
  {
    id: 'duo-sx',
    name: 'NovaLux Duo SX 33" (80cm)',
    tagline: 'Compact double seat-to-bed',
    blurb:
      'Premium dual-seat system designed for compact van layouts. 31.5" wide footprint converts to a flat sleeping platform for two — ideal for narrow Sprinter, Transit, and ProMaster builds.',
    price: 4100,
    width: '80 cm / 31.5"',
    handle: 'novalux-duo-sx-33-80cm',
    inventory: 1,
    badge: 'Compact',
    images: imgs('duo-sx', 8),
    highlights: [
      '31.5" compact width',
      'Seat-to-bed deployment',
      'Swivel base hardware',
      'Recline mechanism',
      'Black leather finish',
    ],
  },
  {
    id: 'duo-gt',
    name: 'NovaLux Duo GT',
    tagline: "Built because standard seats didn't fit van life",
    blurb:
      'A bench-style double designed by van builders, for van builders. Converts to a 61-inch flat sleeping platform. Slide-and-recline mechanism with FMVSS-compliant safety belts.',
    price: 3850,
    width: 'Double · 61" bed',
    handle: 'novalux-duo-gt',
    inventory: 1,
    badge: 'Builder Favorite',
    images: imgs('duo-gt', 6),
    highlights: [
      '61" flat sleeping platform',
      'Slide-and-recline system',
      'FMVSS-compliant belts',
      'Bench-style design',
      'Premium headrests',
    ],
  },
  {
    id: 'solo-captain',
    name: 'NovaLux Solo Captain',
    tagline: "Motorized 12V captain's chair",
    blurb:
      'Elite, fully motorized 12V seating system engineered for top-tier comfort. Left and right hand options available. Premium beige finish.',
    price: 3350,
    width: 'Single · Motorized',
    handle: 'novalux-solo-captain-seat-for-sprinter-transit-promaster',
    inventory: 2,
    badge: 'Motorized 12V',
    images: imgs('solo-captain', 10),
    highlights: [
      '12V motorized adjustments',
      'Left/right hand options',
      'Premium beige finish',
      "Captain's chair design",
      'Elite comfort engineering',
    ],
  },
  {
    id: 'solo-gt',
    name: 'NovaLux Solo GT',
    tagline: "The captain's chair, refined",
    blurb:
      'Single captain seat engineered by van builders. Swivel base, slide-and-recline mechanism, and premium beige leather. Space-saving footprint for compact builds.',
    price: 3150,
    width: 'Single',
    handle: 'novalux-solo-gt-seat',
    inventory: 1,
    badge: 'Compact Single',
    images: imgs('solo-gt', 9, 'png'),
    highlights: [
      'Swivel base hardware',
      'Slide-and-recline',
      'Premium leather finish',
      'Compact footprint',
      'FMVSS safety anchors',
    ],
  },
  {
    id: 'duo-rs',
    name: 'NovaLux Duo RS 35" (90cm)',
    tagline: "Dual captain's chairs that convert",
    blurb:
      "Dual-captain's chair configuration with the ultimate combination of comfort, versatility, and safety. Seat-to-bed deployment for full-size cargo van conversions.",
    price: 2860,
    width: '90 cm / 35"',
    handle: 'novalux-duo-rs-35-90cm-seat',
    inventory: 3,
    badge: 'Best Seller',
    images: imgs('duo-rs', 3),
    highlights: [
      'Dual captain configuration',
      'Seat-to-bed conversion',
      'FMVSS-compliant build',
      '35" comfortable width',
      'Premium upholstery',
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   FEATURES, USE CASES, SPECS
   ═══════════════════════════════════════════════════════════════════════════ */

const FEATURES = [
  { icon: <ShieldCheck className="w-5 h-5" strokeWidth={1.5} />, title: 'FMVSS-Compliant Safety', desc: 'Integrated 3-point seat belts, upper tether child-seat anchor points, and crash-rated automotive construction throughout.' },
  { icon: <Maximize className="w-5 h-5" strokeWidth={1.5} />, title: 'Seat-to-Bed Conversion', desc: 'Reclinable backrest converts the seat to a flat sleeping surface in seconds — separate dedicated sleeping side, not the seating surface.' },
  { icon: <RotateCcw className="w-5 h-5" strokeWidth={1.5} />, title: 'Swivel Functionality', desc: 'Full rotation transforms your driving area into a lounge. Engineered locking positions hold securely during travel.' },
  { icon: <Award className="w-5 h-5" strokeWidth={1.5} />, title: 'Premium Leather Finish', desc: 'All-black or beige premium upholstery. Durable, easy to clean, and designed for modern camper van interiors.' },
  { icon: <Wrench className="w-5 h-5" strokeWidth={1.5} />, title: 'Bolt-In Installation', desc: 'Slim footprint fits compact layouts. Bolt-in install for maximum safety — no specialty subfloor required when reinforced for through-bolting.' },
  { icon: <Layers className="w-5 h-5" strokeWidth={1.5} />, title: 'Built For Real Travel', desc: 'Engineered for Sprinter, Transit, ProMaster, and NV3500 conversions. Highway-tested, trail-proven, full-time-living ready.' },
];

const USE_CASES = [
  { icon: <Compass className="w-5 h-5" strokeWidth={1.5} />, title: 'Weekend Adventurers', desc: 'Convert your seat to a bed at the trailhead. Wake up ready for the next ridge — no separate platform required.' },
  { icon: <Users className="w-5 h-5" strokeWidth={1.5} />, title: 'Family Travelers', desc: 'Child-seat anchor points, 3-point belts across the bench, and extra sleeping capacity for traveling with kids.' },
  { icon: <Home className="w-5 h-5" strokeWidth={1.5} />, title: 'Full-Time Van Lifers', desc: 'Daily-driven, daily-slept-on. Built to hold up to years of conversion between travel and rest.' },
  { icon: <Anchor className="w-5 h-5" strokeWidth={1.5} />, title: 'Professional Builders', desc: 'FMVSS-compliant construction, repeatable factory-grade install, and consistent stock for high-volume conversion shops.' },
];

const SPECS = [
  ['Width Options', '80 cm / 90 cm / 120 cm available'],
  ['Bed Length (Triple)', '6 feet — true flat sleeping surface'],
  ['Bed Length (Duo)', '61–63 inches depending on model'],
  ['Frame', 'FMVSS-compliant automotive structure'],
  ['Upholstery', 'Premium leather — black or beige'],
  ['Seat Belts', 'Integrated 3-point per position'],
  ['Child Anchors', 'Upper tether anchor points'],
  ['Swivel', '360° rotation with locking positions'],
  ['Recline', 'Multi-position with bed conversion'],
  ['Slider', '~8" adjustment range'],
  ['Installation', 'Bolt-in (professional recommended)'],
  ['Compatibility', 'Sprinter · Transit · ProMaster · NV3500'],
];

/* ═══════════════════════════════════════════════════════════════════════════
   MOTION
   ═══════════════════════════════════════════════════════════════════════════ */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
};

const ACCENT_GRADIENT = 'linear-gradient(135deg, #a855f7 0%, #3b82f6 50%, #06b6d4 100%)';

/* ═══════════════════════════════════════════════════════════════════════════
   FLAGSHIP BLOCK — split layout with magnetic image hover
   ═══════════════════════════════════════════════════════════════════════════ */

function FlagshipBlock({ product }) {
  const [imgIndex, setImgIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  const next = () => setImgIndex((i) => (i + 1) % product.images.length);
  const prev = () => setImgIndex((i) => (i - 1 + product.images.length) % product.images.length);
  const total = (product.price * quantity).toFixed(2);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left - rect.width / 2) * 0.05);
    mouseY.set((e.clientY - rect.top - rect.height / 2) * 0.05);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={stagger}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16"
    >
      <motion.div variants={fadeUp} className="lg:col-span-7">
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 group"
          style={{ background: 'radial-gradient(circle at 30% 30%, rgba(168,85,247,0.15), transparent 60%), #0a0a0c' }}
        >
          <motion.div className="absolute inset-0" style={{ x: springX, y: springY }}>
            <AnimatePresence mode="wait">
              <motion.img
                key={imgIndex}
                src={product.images[imgIndex]}
                alt={product.name}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => (e.currentTarget.style.opacity = '0.2')}
              />
            </AnimatePresence>
          </motion.div>

          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/70 backdrop-blur-md border border-white/15 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-black hover:scale-110 text-white z-10"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/70 backdrop-blur-md border border-white/15 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-black hover:scale-110 text-white z-10"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <div className="absolute top-5 left-5 flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md" style={{ background: 'rgba(168,85,247,0.18)', border: '1px solid rgba(168,85,247,0.4)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-purple-200" style={{ fontFamily: 'var(--font-mono)' }}>
              Flagship Model
            </span>
          </div>

          <div className="absolute top-5 right-5 px-3 py-1.5 bg-black/70 backdrop-blur-md rounded-full">
            <span className="text-[10px] tracking-[0.25em] uppercase text-white" style={{ fontFamily: 'var(--font-mono)' }}>
              {String(imgIndex + 1).padStart(2, '0')} · {String(product.images.length).padStart(2, '0')}
            </span>
          </div>

          <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
            <div className="px-3 py-1.5 bg-white/95 backdrop-blur-md text-black rounded-full">
              <span className="text-[10px] tracking-[0.2em] uppercase font-medium" style={{ fontFamily: 'var(--font-mono)' }}>
                {product.width}
              </span>
            </div>
            <div className="flex gap-1">
              {product.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setImgIndex(i)}
                  className={`h-1 rounded-full transition-all ${i === imgIndex ? 'w-8 bg-white' : 'w-1 bg-white/40'}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-6 gap-2">
          {product.images.map((src, i) => (
            <button
              key={i}
              onClick={() => setImgIndex(i)}
              className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                i === imgIndex ? 'border-purple-500 scale-95' : 'border-white/10 hover:border-white/40'
              }`}
            >
              <img src={src} alt="" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.opacity = '0.2')} />
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="lg:col-span-5 flex flex-col">
        <div className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase mb-4 text-purple-300">
          <span className="w-4 h-px bg-purple-400" />
          Flagship · Triple Seat
        </div>

        <h3 className="text-3xl lg:text-4xl mb-3 leading-[1.05]" style={{ fontFamily: 'var(--font-display)', fontWeight: 600, letterSpacing: '-0.02em' }}>
          {product.name}
        </h3>

        <p className="text-base text-purple-200 mb-4" style={{ fontWeight: 400 }}>
          {product.tagline}
        </p>

        <p className="text-stone-300 mb-8 leading-relaxed text-sm" style={{ fontWeight: 300 }}>
          {product.description}
        </p>

        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            ['Width', product.width],
            ['Bed', product.bedLength],
            ['Capacity', product.capacity],
          ].map(([k, v]) => (
            <div key={k} className="p-3 rounded-xl border border-white/10 relative overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <div className="absolute top-0 left-0 w-full h-px" style={{ background: ACCENT_GRADIENT }} />
              <div className="text-[10px] tracking-[0.2em] uppercase text-stone-400 mb-1" style={{ fontFamily: 'var(--font-mono)' }}>{k}</div>
              <div className="text-sm font-semibold text-white">{v}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-2 mb-8">
          {product.features.slice(0, 6).map((f, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: 'rgba(168,85,247,0.15)', border: '1px solid rgba(168,85,247,0.35)' }}>
                <CheckCircle className="w-2.5 h-2.5 text-purple-300" strokeWidth={3} />
              </div>
              <span className="text-sm text-stone-200" style={{ fontWeight: 300 }}>{f}</span>
            </div>
          ))}
        </div>

        <div className="flex items-end justify-between py-5 border-y border-white/10 mb-6">
          <div>
            <div className="text-[10px] tracking-[0.3em] uppercase text-stone-400 mb-2">Quantity</div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center hover:border-white/40 hover:bg-white/5 transition-all"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="w-6 text-center text-lg" style={{ fontFamily: 'var(--font-mono)' }}>{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center hover:border-white/40 hover:bg-white/5 transition-all"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] tracking-[0.3em] uppercase text-stone-400 mb-1">Total</div>
            <div className="text-3xl text-white" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>${total}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-auto">
          <button
            onClick={() => window.open(productUrl(product.handle), '_blank')}
            className="px-6 py-4 border border-white/20 rounded-full text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-white/5 transition-all"
          >
            View Details
          </button>
          <button
            onClick={() => window.open(LINKS.contact, '_blank')}
            className="px-6 py-4 rounded-full text-[11px] tracking-[0.2em] uppercase font-semibold text-white transition-all hover:opacity-90"
            style={{ background: ACCENT_GRADIENT }}
          >
            Contact Sales
          </button>
        </div>

        <div className="flex items-center gap-2 mt-4 text-[11px] text-stone-400">
          <Info className="w-3.5 h-3.5" />
          {product.status} · Free shipping over $500
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SEAT ROW — horizontal full-width card, NOT alternating like Glacier View
   Image on left always, content right, with index counter on far left
   ═══════════════════════════════════════════════════════════════════════════ */

function SeatRow({ seat, index, total }) {
  const [imgIndex, setImgIndex] = useState(0);
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group relative py-12 lg:py-16 border-b border-white/[0.06] last:border-0"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Index number bg watermark */}
      <motion.div
        className="absolute top-1/2 -translate-y-1/2 left-0 lg:-left-4 select-none pointer-events-none"
        animate={{ opacity: hovered ? 0.04 : 0.02, x: hovered ? -8 : 0 }}
        transition={{ duration: 0.6 }}
      >
        <span
          className="text-[10rem] lg:text-[14rem] leading-none font-bold text-white"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center relative z-10">
        {/* Index + meta column */}
        <div className="hidden lg:flex lg:col-span-1 flex-col items-center">
          <div className="text-[10px] tracking-[0.3em] uppercase text-purple-300 mb-2" style={{ fontFamily: 'var(--font-mono)' }}>
            {String(index + 1).padStart(2, '0')}
          </div>
          <div className="text-[10px] text-stone-500 mb-2" style={{ fontFamily: 'var(--font-mono)' }}>/</div>
          <div className="text-[10px] text-stone-500" style={{ fontFamily: 'var(--font-mono)' }}>
            {String(total).padStart(2, '0')}
          </div>
          <div className="w-px h-12 mt-4 bg-gradient-to-b from-white/20 to-transparent" />
        </div>

        {/* Image */}
        <div className="lg:col-span-6">
          <motion.div
            className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 group/img"
            style={{ background: '#0a0a0c' }}
            animate={{ scale: hovered ? 1.01 : 1 }}
            transition={{ duration: 0.6 }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={imgIndex}
                src={seat.images[imgIndex]}
                alt={seat.name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => (e.currentTarget.style.opacity = '0.2')}
              />
            </AnimatePresence>

            {/* Vertical gradient overlay on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"
              animate={{ opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.4 }}
            />

            {seat.images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); setImgIndex((i) => (i - 1 + seat.images.length) % seat.images.length); }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/70 backdrop-blur-md border border-white/15 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-all hover:scale-110 text-white"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setImgIndex((i) => (i + 1) % seat.images.length); }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/70 backdrop-blur-md border border-white/15 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-all hover:scale-110 text-white"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </>
            )}

            <div className="absolute top-4 left-4 px-3 py-1.5 backdrop-blur-md rounded-full" style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.85), rgba(59,130,246,0.85))' }}>
              <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-white" style={{ fontFamily: 'var(--font-mono)' }}>
                {seat.badge}
              </span>
            </div>

            {/* Image pagination dots */}
            {seat.images.length > 1 && (
              <div className="absolute bottom-4 left-4 flex gap-1">
                {seat.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setImgIndex(i); }}
                    className={`h-1 rounded-full transition-all ${i === imgIndex ? 'w-6 bg-white' : 'w-1 bg-white/40 hover:bg-white/70'}`}
                  />
                ))}
              </div>
            )}

            <div className="absolute bottom-4 right-4 px-2.5 py-1 bg-black/70 backdrop-blur-md rounded-full">
              <span className="text-[10px] tracking-[0.2em] uppercase text-white" style={{ fontFamily: 'var(--font-mono)' }}>
                {String(imgIndex + 1).padStart(2, '0')} · {String(seat.images.length).padStart(2, '0')}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="lg:col-span-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-purple-300">
              <span className="w-4 h-px bg-purple-400" />
              {seat.width}
            </div>
            <div className="lg:hidden text-[10px] tracking-[0.3em] uppercase text-stone-500" style={{ fontFamily: 'var(--font-mono)' }}>
              {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </div>
          </div>

          <h3 className="text-2xl lg:text-[2rem] mb-2 leading-[1.1]" style={{ fontFamily: 'var(--font-display)', fontWeight: 600, letterSpacing: '-0.02em' }}>
            {seat.name}
          </h3>

          <p className="text-purple-200 mb-4 text-sm" style={{ fontWeight: 400 }}>
            {seat.tagline}
          </p>

          <p className="text-stone-300 leading-relaxed mb-6 text-sm" style={{ fontWeight: 300 }}>
            {seat.blurb}
          </p>

          {/* Highlights as inline chips */}
          <div className="flex flex-wrap gap-2 mb-6">
            {seat.highlights.map((h, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="text-[11px] px-3 py-1.5 rounded-full border border-white/10 text-stone-300 hover:border-purple-400/50 hover:text-white transition-all"
                style={{ background: 'rgba(255,255,255,0.02)', fontWeight: 300 }}
              >
                {h}
              </motion.span>
            ))}
          </div>

          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-stone-400 mb-1">Starting at</div>
              <div className="text-2xl text-white" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                ${seat.price.toLocaleString()}
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] tracking-[0.3em] uppercase text-stone-400 mb-1">Stock</div>
              <div className="flex items-center gap-1.5 text-sm text-emerald-300" style={{ fontFamily: 'var(--font-mono)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {seat.inventory} avail
              </div>
            </div>
          </div>

          <button
            onClick={() => window.open(productUrl(seat.handle), '_blank')}
            className="group/btn w-full px-5 py-3.5 rounded-full text-[11px] tracking-[0.2em] uppercase font-semibold text-white transition-all hover:opacity-90 flex items-center justify-center gap-2"
            style={{ background: ACCENT_GRADIENT }}
          >
            Shop {seat.name.replace('NovaLux ', '')}
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════════════════ */

export default function NovaLuxSeatPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [email, setEmail] = useState('');
  const heroRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const openExt = (url) => window.open(url, '_blank', 'noopener,noreferrer');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      window.location.href = `mailto:${BUSINESS.email}?subject=Subscribe%20to%20NovaLux%20Updates&body=Please%20add%20me%20to%20the%20NovaLux%20newsletter.%20My%20email%3A%20${encodeURIComponent(email)}`;
      setEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white antialiased" style={{ fontFamily: 'var(--font-body)' }}>
      {/* NAV */}
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'bg-black/85 backdrop-blur-xl border-b border-white/[0.06]' : 'bg-transparent'}`}>
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: ACCENT_GRADIENT }}>
              <Sparkles className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[14px] tracking-[0.2em] font-semibold uppercase" style={{ fontFamily: 'var(--font-display)' }}>NovaLux</span>
              <span className="text-[9px] tracking-[0.3em] text-stone-400 mt-0.5" style={{ fontFamily: 'var(--font-mono)' }}>Premium Seating</span>
            </div>
          </button>

          <div className="hidden lg:flex items-center gap-9 text-[13px] text-stone-200">
            {[['Flagship', 'flagship'], ['Lineup', 'lineup'], ['Engineering', 'features'], ['Built For', 'use-cases'], ['Specs', 'specs']].map(([label, id]) => (
              <button key={id} onClick={() => scrollTo(id)} className="hover:text-white transition-colors relative group" style={{ fontWeight: 400 }}>
                {label}
                <span className="absolute -bottom-1 left-0 h-px transition-all duration-300 w-0 group-hover:w-full" style={{ background: ACCENT_GRADIENT }} />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => openExt(LINKS.shopAll)} className="hidden md:flex items-center gap-2 px-5 py-2.5 text-[11px] tracking-[0.2em] uppercase rounded-full font-semibold text-white transition-all hover:opacity-90" style={{ background: ACCENT_GRADIENT }}>
              Shop All Seats
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden w-9 h-9 flex items-center justify-center rounded-full border border-white/15">
              {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="lg:hidden bg-black border-t border-white/[0.06] overflow-hidden">
              <div className="px-6 py-6 flex flex-col gap-3">
                {[['Flagship', 'flagship'], ['Lineup', 'lineup'], ['Engineering', 'features'], ['Built For', 'use-cases'], ['Specs', 'specs']].map(([label, id]) => (
                  <button key={id} onClick={() => scrollTo(id)} className="text-left text-stone-200 py-2">{label}</button>
                ))}
                <button onClick={() => openExt(LINKS.shopAll)} className="mt-3 px-4 py-3 text-[11px] tracking-[0.2em] uppercase font-semibold text-white rounded-full" style={{ background: ACCENT_GRADIENT }}>Shop All Seats</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO — same hero image, with horizontal stat strip across bottom */}
      <section ref={heroRef} className="relative h-[100vh] min-h-[720px] overflow-hidden">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0">
          <img
            src={HERO_IMAGE}
            alt="NovaLux Premium Van Seating"
            className="w-full h-full object-cover"
            style={{ filter: 'brightness(0.5) contrast(1.05)' }}
            onError={(e) => { e.currentTarget.style.background = 'linear-gradient(135deg, #0a0a0c, #1a1a1d)'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent" />
        </motion.div>

        <div className="absolute top-24 right-6 lg:right-10 z-10 hidden lg:block">
          <div className="w-36 px-4 py-3 border-l-2 border-purple-400">
            <div className="text-[10px] tracking-[0.3em] uppercase text-stone-300 mb-1">Engineered In</div>
            <div className="text-sm text-white" style={{ fontFamily: 'var(--font-mono)' }}>Big Bear, CA</div>
            <div className="text-sm text-white" style={{ fontFamily: 'var(--font-mono)' }}>34.24° N</div>
          </div>
        </div>

        <div className="relative z-10 h-full max-w-[1400px] mx-auto px-6 lg:px-10 flex flex-col justify-end pb-32 lg:pb-44">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} className="max-w-4xl">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              <span className="text-[11px] tracking-[0.35em] uppercase text-stone-300" style={{ fontFamily: 'var(--font-mono)' }}>
                Van Parts Outlet · NovaLux Seating
              </span>
            </div>

            <h1 className="text-[clamp(2.75rem,8vw,6.5rem)] leading-[0.95] tracking-[-0.03em] mb-8 text-white" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
              Seats that
              <br />
              <span style={{ background: ACCENT_GRADIENT, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                live the trip.
              </span>
            </h1>

            <p className="text-stone-200 text-lg leading-relaxed max-w-xl mb-10" style={{ fontWeight: 300 }}>
              FMVSS-compliant van seating engineered for real travel. Swivel, recline, and convert to a full bed — built for Sprinter, Transit, ProMaster, and NV3500 conversions.
            </p>

            <div className="flex flex-wrap gap-4">
              <button onClick={() => scrollTo('flagship')} className="group inline-flex items-center gap-3 px-8 py-4 rounded-full text-[12px] tracking-[0.2em] uppercase font-semibold text-white transition-all hover:opacity-90" style={{ background: ACCENT_GRADIENT }}>
                Explore the Lineup
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button onClick={() => openExt(LINKS.contact)} className="inline-flex items-center gap-3 px-8 py-4 border border-white/30 rounded-full text-[12px] tracking-[0.2em] uppercase font-medium hover:bg-white/10 transition-all">
                Speak to Sales
              </button>
            </div>
          </motion.div>
        </div>

        {/* Bottom stat strip — replaces white pillar section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="absolute bottom-0 inset-x-0 z-10 border-t border-white/10 backdrop-blur-md"
          style={{ background: 'rgba(0,0,0,0.6)' }}
        >
          <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-6 grid grid-cols-3 gap-6 lg:gap-12">
            {[
              { num: '6', label: 'Active Models' },
              { num: 'FMVSS', label: '207 / 210' },
              { num: '4', label: 'Van Platforms' },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="text-3xl lg:text-4xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 600, background: ACCENT_GRADIENT, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {s.num}
                </div>
                <div className="text-[10px] tracking-[0.25em] uppercase text-stone-300" style={{ fontFamily: 'var(--font-mono)' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* MANIFESTO STRIP — dark, replaces white pillars */}
      <section className="py-20 lg:py-28 px-6 lg:px-10" style={{ background: 'linear-gradient(180deg, #0a0a0c 0%, #0e0e12 100%)' }}>
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
          {[
            { num: '01', title: 'FMVSS-compliant safety', desc: '3-point belts, child anchors, and automotive-grade crash construction.' },
            { num: '02', title: 'Seat-to-bed in seconds', desc: 'Reclinable backrest converts the seat into a true flat sleeping surface.' },
            { num: '03', title: 'Real-travel engineering', desc: 'Built for Sprinter, Transit, ProMaster — daily-driven and trail-proven.' },
          ].map((p, i) => (
            <motion.div
              key={p.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex gap-5"
            >
              <span className="text-[11px] tracking-[0.2em] mt-1 text-purple-300" style={{ fontFamily: 'var(--font-mono)' }}>
                {p.num}
              </span>
              <div>
                <h3 className="text-xl mb-2 text-white" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>{p.title}</h3>
                <p className="text-sm leading-relaxed text-stone-400" style={{ fontWeight: 300 }}>{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FLAGSHIP */}
      <section id="flagship" className="py-24 lg:py-32 px-6 lg:px-10" style={{ background: 'linear-gradient(180deg, #0e0e12 0%, #131318 100%)' }}>
        <div className="max-w-[1400px] mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger} className="mb-12 max-w-2xl">
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-5">
              <div className="w-2 h-2 rounded-full bg-purple-400" />
              <span className="text-[11px] tracking-[0.3em] uppercase text-purple-300" style={{ fontFamily: 'var(--font-mono)' }}>
                Flagship · Triple Seat
              </span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-[clamp(2.25rem,5vw,4rem)] leading-[1] tracking-[-0.025em] mb-5" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
              The seat that <span style={{ background: ACCENT_GRADIENT, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>becomes a bed.</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-stone-300 leading-relaxed" style={{ fontWeight: 300 }}>
              Three-passenger seating, a true 6-foot sleeping surface, and a slim 47.2" width that fits the narrowest van layouts. Engineered for real travel.
            </motion.p>
          </motion.div>

          <FlagshipBlock product={FLAGSHIP} />
        </div>
      </section>

      {/* LINEUP — dark header, then vertical row layout */}
      <section id="lineup" className="py-24 lg:py-32 px-6 lg:px-10" style={{ background: 'linear-gradient(180deg, #131318 0%, #0e0e12 100%)' }}>
        <div className="max-w-[1400px] mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger} className="mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <motion.div variants={fadeUp} className="max-w-2xl">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-2 h-2 rounded-full bg-purple-400" />
                <span className="text-[11px] tracking-[0.3em] uppercase text-purple-300" style={{ fontFamily: 'var(--font-mono)' }}>
                  The Full Lineup
                </span>
              </div>
              <h2 className="text-[clamp(2.25rem,5vw,4rem)] leading-[1] tracking-[-0.025em] mb-5" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                Six configurations.
                <br />
                <span style={{ background: ACCENT_GRADIENT, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>One promise.</span>
              </h2>
              <p className="text-stone-300 leading-relaxed" style={{ fontWeight: 300 }}>
                From compact captain's chairs to dual seat-to-bed systems — every NovaLux seat shares the same FMVSS-grade safety construction and premium leather finish.
              </p>
            </motion.div>

            {/* Right-side: quick jump pills */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-2 lg:max-w-md">
              {SEAT_LINEUP.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => document.getElementById(`seat-${s.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                  className="group px-3 py-2 rounded-full border border-white/10 text-[10px] tracking-[0.15em] uppercase text-stone-300 hover:text-white hover:border-purple-400/60 transition-all flex items-center gap-2"
                  style={{ background: 'rgba(255,255,255,0.02)' }}
                >
                  <span style={{ fontFamily: 'var(--font-mono)' }}>{String(i + 1).padStart(2, '0')}</span>
                  <span>{s.name.replace('NovaLux ', '').split(' ')[0]}</span>
                </button>
              ))}
            </motion.div>
          </motion.div>

          {/* Vertical seat rows */}
          <div className="mt-10">
            {SEAT_LINEUP.map((s, i) => (
              <div key={s.id} id={`seat-${s.id}`}>
                <SeatRow seat={s} index={i} total={SEAT_LINEUP.length} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ENGINEERING — 6 feature grid, dark with subtle gradient bg */}
      <section id="features" className="py-24 lg:py-32 px-6 lg:px-10 border-y border-white/[0.06] relative overflow-hidden" style={{ background: '#000' }}>
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-[0.08] pointer-events-none" style={{ background: 'radial-gradient(circle, #a855f7, transparent)' }} />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-[0.08] pointer-events-none" style={{ background: 'radial-gradient(circle, #06b6d4, transparent)' }} />

        <div className="max-w-[1400px] mx-auto relative">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger} className="mb-16 max-w-2xl">
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-5">
              <div className="w-8 h-px bg-stone-500" />
              <span className="text-[11px] tracking-[0.3em] uppercase text-stone-300" style={{ fontFamily: 'var(--font-mono)' }}>Engineered Details</span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-[clamp(2.25rem,5vw,4rem)] leading-[1] tracking-[-0.025em] mb-5" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
              Six things every
              <br />
              <span style={{ background: ACCENT_GRADIENT, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>NovaLux shares.</span>
            </motion.h2>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={stagger} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06]">
            {FEATURES.map((f, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -2 }}
                className="bg-black p-8 lg:p-10 hover:bg-[#0a0a0c] transition-all duration-500 group/feat"
              >
                <div className="flex items-start justify-between mb-8">
                  <motion.div
                    className="w-12 h-12 rounded-full border border-white/15 flex items-center justify-center text-white"
                    whileHover={{ rotate: 12, borderColor: 'rgba(168,85,247,0.5)' }}
                    transition={{ duration: 0.3 }}
                  >
                    {f.icon}
                  </motion.div>
                  <span className="text-[10px] tracking-[0.2em] text-purple-300" style={{ fontFamily: 'var(--font-mono)' }}>
                    {String(i + 1).padStart(2, '0')} / 06
                  </span>
                </div>
                <h3 className="text-2xl mb-3" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>{f.title}</h3>
                <p className="text-sm text-stone-300 leading-relaxed" style={{ fontWeight: 300 }}>{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* BUILT FOR — dark, horizontal scroll-style cards */}
      <section id="use-cases" className="py-24 lg:py-32 px-6 lg:px-10" style={{ background: 'linear-gradient(180deg, #0a0a0c 0%, #0e0e12 100%)' }}>
        <div className="max-w-[1400px] mx-auto">
          <div className="mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-px bg-stone-500" />
                <span className="text-[11px] tracking-[0.3em] uppercase text-stone-300" style={{ fontFamily: 'var(--font-mono)' }}>Built For</span>
              </div>
              <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] leading-[1] tracking-[-0.025em] mb-5" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                Whoever you are
                <br />
                <span style={{ background: ACCENT_GRADIENT, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>on the road.</span>
              </h2>
              <p className="text-stone-300 leading-relaxed max-w-xl" style={{ fontWeight: 300 }}>
                Weekend trips, family travel, full-time van life, or professional conversions — NovaLux seats are engineered for the way you actually live in your van.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {USE_CASES.map((u, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="relative p-8 rounded-2xl border border-white/10 overflow-hidden group/case"
                style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0) 100%)' }}
              >
                {/* Hover gradient overlay */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover/case:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: 'radial-gradient(circle at 50% 0%, rgba(168,85,247,0.12), transparent 70%)' }}
                />

                {/* Index badge */}
                <div className="absolute top-4 right-4 text-[10px] tracking-[0.2em] uppercase text-stone-500" style={{ fontFamily: 'var(--font-mono)' }}>
                  {String(i + 1).padStart(2, '0')}
                </div>

                <motion.div
                  className="w-12 h-12 rounded-full border border-white/15 flex items-center justify-center mb-6 text-white relative z-10"
                  whileHover={{ scale: 1.05, borderColor: 'rgba(168,85,247,0.5)' }}
                >
                  {u.icon}
                </motion.div>
                <h3 className="text-xl mb-3 text-white relative z-10" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>{u.title}</h3>
                <p className="text-sm text-stone-300 leading-relaxed relative z-10" style={{ fontWeight: 300 }}>{u.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY NOVALUX */}
      <section className="py-24 lg:py-32 px-6 lg:px-10" style={{ background: 'linear-gradient(180deg, #141418 0%, #0e0e12 100%)' }}>
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-white/10" style={{ background: 'radial-gradient(circle at 30% 30%, rgba(168,85,247,0.2), transparent 60%)' }}>
              <img src={HERO_IMAGE} alt="NovaLux craftsmanship" className="w-full h-full object-cover" style={{ filter: 'brightness(0.85)' }} onError={(e) => (e.currentTarget.style.opacity = '0.2')} />
              <div className="absolute bottom-6 left-6 px-3 py-1.5 bg-black/70 backdrop-blur-md rounded-full">
                <span className="text-[10px] tracking-[0.25em] uppercase text-white" style={{ fontFamily: 'var(--font-mono)' }}>Designed in California</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-px bg-stone-500" />
              <span className="text-[11px] tracking-[0.3em] uppercase text-stone-300" style={{ fontFamily: 'var(--font-mono)' }}>Why NovaLux</span>
            </div>
            <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] leading-[1] tracking-[-0.025em] mb-10" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
              Three reasons builders
              <br />
              <span style={{ background: ACCENT_GRADIENT, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>keep coming back.</span>
            </h2>

            <div className="space-y-8">
              {[
                { num: '01', title: 'Engineered by van builders', desc: 'Designed for actual conversions — Sprinter, Transit, ProMaster, NV3500. Not adapted from RV or marine furniture.' },
                { num: '02', title: 'Safety without compromise', desc: 'FMVSS 207 and 210 compliant construction throughout. Real 3-point belts, real child anchor points, real automotive crash structure.' },
                { num: '03', title: 'Real-travel proven', desc: 'Highway speeds, rough trails, sub-zero nights, desert summers. Daily-driven, daily-slept-on, built to hold up.' },
              ].map((p) => (
                <motion.div key={p.num} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex gap-6 pb-8 border-b border-white/[0.08] last:border-0 last:pb-0">
                  <span className="text-[11px] tracking-[0.2em] text-purple-300" style={{ fontFamily: 'var(--font-mono)' }}>{p.num}</span>
                  <div>
                    <h3 className="text-xl mb-2 text-white" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>{p.title}</h3>
                    <p className="text-sm text-stone-300 leading-relaxed" style={{ fontWeight: 300 }}>{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SPECS */}
      <section id="specs" className="py-24 lg:py-32 px-6 lg:px-10 border-y border-white/[0.06]" style={{ background: '#0e0e12' }}>
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-px bg-stone-500" />
              <span className="text-[11px] tracking-[0.3em] uppercase text-stone-300" style={{ fontFamily: 'var(--font-mono)' }}>Specifications</span>
            </div>
            <h2 className="text-[clamp(2rem,4.5vw,3.5rem)] leading-[1] tracking-[-0.025em] mb-6" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
              The technical
              <br />
              <span style={{ background: ACCENT_GRADIENT, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>details.</span>
            </h2>
            <p className="text-stone-300 leading-relaxed mb-8" style={{ fontWeight: 300 }}>
              Premium materials and engineered tolerances. Compatible with every major van platform — bolt-in installable as a DIY project or by a pro outfitter.
            </p>
            <button onClick={() => openExt(LINKS.faq)} className="inline-flex items-center gap-2 text-[12px] tracking-[0.2em] uppercase border-b border-white/30 pb-1 hover:border-white transition-colors">
              Full Documentation
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="lg:col-span-8">
            <div className="border-t border-white/10">
              {SPECS.map(([label, value], i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.03 }} className="grid grid-cols-12 gap-4 py-5 border-b border-white/10 hover:bg-white/[0.02] transition-colors px-2 -mx-2">
                  <div className="col-span-1 text-[11px] text-stone-500 tracking-[0.15em] pt-1" style={{ fontFamily: 'var(--font-mono)' }}>{String(i + 1).padStart(2, '0')}</div>
                  <div className="col-span-5 text-[12px] tracking-[0.15em] uppercase text-stone-300" style={{ fontWeight: 500 }}>{label}</div>
                  <div className="col-span-6 text-white" style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 500 }}>{value}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GUARANTEES — dark, replaces light strip */}
      <section className="py-20 px-6 lg:px-10 border-y border-white/[0.06]" style={{ background: '#0a0a0c' }}>
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
          {[
            { icon: <Truck className="w-5 h-5" strokeWidth={1.5} />, title: 'Free Shipping', desc: 'On orders over $500. Fast, insured delivery across North America.' },
            { icon: <Shield className="w-5 h-5" strokeWidth={1.5} />, title: 'FMVSS Compliant', desc: 'Every seat meets U.S. federal safety standards 207 and 210.' },
            { icon: <RotateCcw className="w-5 h-5" strokeWidth={1.5} />, title: 'Pro Installation', desc: 'Optional in-shop installation available at our Big Bear facility.' },
          ].map((g, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex gap-5 items-start group/g"
            >
              <div className="w-11 h-11 rounded-full border border-white/15 flex items-center justify-center flex-shrink-0 group-hover/g:border-purple-400/50 transition-colors">
                {g.icon}
              </div>
              <div>
                <h3 className="text-lg mb-2 text-white" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>{g.title}</h3>
                <p className="text-sm text-stone-300 leading-relaxed" style={{ fontWeight: 300 }}>{g.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CLOSING CTA */}
      <section className="relative py-32 lg:py-40 px-6 lg:px-10 overflow-hidden" style={{ background: '#000' }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-3xl opacity-[0.12] pointer-events-none" style={{ background: 'radial-gradient(circle, #a855f7, #3b82f6, transparent)' }} />
        <div className="max-w-3xl mx-auto text-center relative">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-8 h-px bg-purple-400" />
            <Sparkles className="w-5 h-5 text-purple-400" strokeWidth={1.5} />
            <div className="w-8 h-px bg-blue-400" />
          </div>
          <h2 className="text-[clamp(2.5rem,7vw,5rem)] leading-[1] tracking-[-0.03em] mb-8" style={{ fontFamily: 'var(--font-display)', fontWeight: 600 }}>
            Your build deserves
            <br />
            <span style={{ background: ACCENT_GRADIENT, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>real seating.</span>
          </h2>
          <p className="text-stone-300 leading-relaxed mb-12 max-w-xl mx-auto" style={{ fontWeight: 300 }}>
            Built for the builders, the weekend travelers, and the full-timers who refuse to compromise on safety, comfort, or design.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => openExt(LINKS.shopAll)} className="group inline-flex items-center gap-3 px-8 py-4 rounded-full text-[12px] tracking-[0.2em] uppercase font-semibold text-white transition-all hover:opacity-90" style={{ background: ACCENT_GRADIENT }}>
              Shop All Seats
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button onClick={() => openExt(LINKS.contact)} className="inline-flex items-center gap-3 px-8 py-4 border border-white/30 rounded-full text-[12px] tracking-[0.2em] uppercase hover:bg-white/10 transition-all">
              Get In Touch
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0a0a0c] border-t border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 pt-20 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-14">
            <div className="md:col-span-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: ACCENT_GRADIENT }}>
                  <Sparkles className="w-4 h-4 text-white" strokeWidth={2.5} />
                </div>
                <div className="flex flex-col leading-none">
                  <span className="text-[14px] tracking-[0.2em] font-semibold uppercase" style={{ fontFamily: 'var(--font-display)' }}>NovaLux</span>
                  <span className="text-[9px] tracking-[0.3em] text-stone-400 mt-0.5" style={{ fontFamily: 'var(--font-mono)' }}>Premium Seating</span>
                </div>
              </div>
              <p className="text-sm text-stone-300 leading-relaxed max-w-sm" style={{ fontWeight: 300 }}>
                Premium van seating engineered for real travel.
                <br />
                A brand of Van Parts Outlet.
              </p>
            </div>

            <div className="md:col-span-2">
              <h4 className="text-[10px] tracking-[0.3em] uppercase text-stone-400 mb-5" style={{ fontFamily: 'var(--font-mono)' }}>Lineup</h4>
              <ul className="space-y-3 text-sm text-stone-200" style={{ fontWeight: 300 }}>
                <li><a href={SEATS_PAGE} className="hover:text-white transition-colors">Triple Seat</a></li>
                <li><a href={SEATS_PAGE} className="hover:text-white transition-colors">Duo Series</a></li>
                <li><a href={SEATS_PAGE} className="hover:text-white transition-colors">Solo Series</a></li>
                <li><a href={SEATS_PAGE} className="hover:text-white transition-colors">All Seats</a></li>
              </ul>
            </div>

            <div className="md:col-span-2">
              <h4 className="text-[10px] tracking-[0.3em] uppercase text-stone-400 mb-5" style={{ fontFamily: 'var(--font-mono)' }}>Company</h4>
              <ul className="space-y-3 text-sm text-stone-200" style={{ fontWeight: 300 }}>
                <li><a href={LINKS.about} className="hover:text-white transition-colors">About</a></li>
                <li><a href={LINKS.warranty} className="hover:text-white transition-colors">Warranty</a></li>
                <li><a href={LINKS.faq} className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href={LINKS.contact} className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            <div className="md:col-span-4">
              <h4 className="text-[10px] tracking-[0.3em] uppercase text-stone-400 mb-5" style={{ fontFamily: 'var(--font-mono)' }}>Follow</h4>
              <div className="flex gap-3 mb-6">
                <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center hover:border-white/50 hover:bg-white/5 transition-all">
                  <Instagram className="w-4 h-4" strokeWidth={1.5} />
                </a>
                <a href={LINKS.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center hover:border-white/50 hover:bg-white/5 transition-all">
                  <Facebook className="w-4 h-4" strokeWidth={1.5} />
                </a>
                <a href={LINKS.email} aria-label="Email" className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center hover:border-white/50 hover:bg-white/5 transition-all">
                  <Mail className="w-4 h-4" strokeWidth={1.5} />
                </a>
              </div>
              <p className="text-xs text-stone-400 leading-relaxed" style={{ fontWeight: 300 }}>
                Follow for van builds in the wild, install guides, and new product drops.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 py-10 border-y border-white/[0.06]">
            <div className="lg:col-span-7">
              <h4 className="text-[10px] tracking-[0.3em] uppercase text-stone-400 mb-6 flex items-center gap-3" style={{ fontFamily: 'var(--font-mono)' }}>
                <span className="w-1 h-3" style={{ background: ACCENT_GRADIENT }} />
                Business Info
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 text-sm" style={{ fontWeight: 300 }}>
                <div className="flex gap-3">
                  <MapPin className="w-4 h-4 text-stone-400 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <div>
                    <div className="text-stone-400 text-[10px] tracking-[0.25em] uppercase mb-1" style={{ fontFamily: 'var(--font-mono)' }}>Address</div>
                    <div className="text-stone-200 leading-relaxed">{BUSINESS.address}</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <ClockIcon className="w-4 h-4 text-stone-400 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <div>
                    <div className="text-stone-400 text-[10px] tracking-[0.25em] uppercase mb-1" style={{ fontFamily: 'var(--font-mono)' }}>Hours</div>
                    <div className="text-stone-200 leading-relaxed">{BUSINESS.hours}</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Phone className="w-4 h-4 text-stone-400 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <div>
                    <div className="text-stone-400 text-[10px] tracking-[0.25em] uppercase mb-1" style={{ fontFamily: 'var(--font-mono)' }}>Phone</div>
                    <a href={`tel:${BUSINESS.phone.replace(/[^+\d]/g, '')}`} className="text-stone-200 hover:text-white transition-colors">{BUSINESS.phone}</a>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Mail className="w-4 h-4 text-stone-400 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  <div>
                    <div className="text-stone-400 text-[10px] tracking-[0.25em] uppercase mb-1" style={{ fontFamily: 'var(--font-mono)' }}>Email</div>
                    <a href={LINKS.email} className="text-stone-200 hover:text-white transition-colors break-all">{BUSINESS.email}</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <h4 className="text-[10px] tracking-[0.3em] uppercase text-stone-400 mb-6 flex items-center gap-3" style={{ fontFamily: 'var(--font-mono)' }}>
                <span className="w-1 h-3" style={{ background: ACCENT_GRADIENT }} />
                Subscribe
              </h4>
              <p className="text-sm text-stone-300 mb-5 leading-relaxed" style={{ fontWeight: 300 }}>
                Latest seat drops, install tips, and exclusive offers — straight to your inbox.
              </p>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-5 py-3.5 bg-white/[0.05] border border-white/15 rounded-full text-sm text-white placeholder:text-stone-500 focus:outline-none focus:border-purple-400 focus:bg-white/[0.08] transition-all"
                  style={{ fontFamily: 'var(--font-body)' }}
                />
                <button type="submit" className="px-6 py-3.5 rounded-full text-[11px] tracking-[0.2em] uppercase font-semibold text-white transition-all hover:opacity-90 flex items-center justify-center gap-2" style={{ background: ACCENT_GRADIENT }}>
                  Subscribe
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
              <p className="text-[11px] text-stone-500 mt-3" style={{ fontWeight: 300 }}>No spam. Unsubscribe anytime.</p>
            </div>
          </div>

          <div className="pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <p className="text-[11px] text-stone-400 tracking-wide" style={{ fontFamily: 'var(--font-mono)' }}>© 2026 NovaLux · Van Parts Outlet</p>
            <div className="flex gap-6 text-[11px] text-stone-400 tracking-wide">
              <a href={LINKS.terms} className="hover:text-white transition-colors">Terms</a>
              <a href={LINKS.privacy} className="hover:text-white transition-colors">Privacy</a>
              <a href={LINKS.returns} className="hover:text-white transition-colors">Returns</a>
            </div>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@300;400;500&display=swap');

        :root {
          --font-display: 'Space Grotesk', system-ui, sans-serif;
          --font-body: 'Inter', system-ui, sans-serif;
          --font-mono: 'JetBrains Mono', ui-monospace, monospace;
        }

        html { scroll-behavior: smooth; }
        body {
          font-family: var(--font-body);
          font-feature-settings: 'ss01', 'cv01', 'cv02';
        }

        ::selection { background: #a855f7; color: #fff; }

        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(180deg, #a855f7, #3b82f6); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: linear-gradient(180deg, #9333ea, #2563eb); }

        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { scrollbar-width: none; }

        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
}
