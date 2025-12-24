"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, Shield, Truck, Clock, CheckCircle, ArrowRight, 
  ChevronLeft, ChevronRight, Play, Pause, ShoppingCart, 
  CreditCard, Maximize, RotateCcw, Users, Bed, 
  Sparkles, Sun, Moon, Heart, Award, Zap, 
  Coffee, Grid, Package, Settings, Wrench,
  Menu, X, Instagram, Twitter, Facebook, Youtube,
  Linkedin, Mail, Phone, MapPin, ExternalLink,
  Plus, Minus, ChevronDown, ChevronUp,
  Info, Home, Car, Battery, Cpu,
  Users as UsersIcon, Bed as BedIcon, Volume2,
  Sun as SunIcon, Moon as MoonIcon, Layers,
  Award as AwardIcon, Target, Compass, Anchor,
  ShieldCheck, Wind, Thermometer, Droplets,
  Mountain, Snowflake, Waves, Globe,
  Cloud, CloudSnow, WindIcon, ThermometerSun
} from 'lucide-react';

// NovaLux Seat Images
const seatImages = [
  '/images/n1.jpg', '/images/n2.png', '/images/n3.jpg',
  '/images/n4.jpg', '/images/n5.jpg', '/images/n6.jpg',
  '/images/n7.jpg'
];

// Video file path - Using placeholder with preload
const SEAT_VIDEO = '/seatv.mov';

// External URLs - UPDATED SHOP ALL LINK
const EXTERNAL_URLS = {
  shopAll: "https://vankea.com/collections/van-seats-1",
  contact: "https://vankea.com/pages/contact",
  addToCart: "https://vankea.com/products/novalux-triple-van-seat",
  buyNow: "https://shop.app/checkout/62131929169/checkout/product",
  aboutUs: "https://vankea.com/pages/about-us",
  faq: "https://vankea.com/pages/faq",
  blog: "https://vankea.com/blogs/news",
  terms: "https://vankea.com/pages/terms-of-service",
  privacy: "https://vankea.com/pages/privacy-policy",
  returnPolicy: "https://vankea.com/pages/return-policy",
  installationGuide: "#",
  swivelSeats: "https://vankea.com/collections/van-seats-1"
};

// Related Products with detailed descriptions for modal
const relatedProducts = [
  {
    title: "Swivel Passenger & Driver Seats",
    description: "A swivel driver and passenger seat. Allows for flexible seating arrangements. Creates additional living space when rotated.",
    detailedDescription: "Our Swivel Passenger & Driver Seats revolutionize your van's interior layout. Featuring a smooth 360-degree rotation mechanism, these seats allow you to instantly transform your driving area into a social lounge or dining space. Made with premium automotive-grade materials and featuring adjustable recline, these seats offer both comfort during long drives and versatility when parked. The swivel mechanism is engineered for durability and safety, with integrated locking positions for secure travel.",
    keyFeatures: [
      "360-degree smooth swivel rotation",
      "Adjustable recline positions",
      "Automotive-grade safety construction",
      "Integrated locking mechanism for travel",
      "Premium upholstery options available",
      "Easy bolt-in installation"
    ],
    icon: <RotateCcw className="w-5 h-5" />,
    gradient: "from-blue-500/20 to-cyan-500/20",
    specs: [
      "Rotation: 360° smooth swivel",
      "Material: Premium automotive leather",
      "Safety: Integrated locking positions",
      "Installation: Bolt-in system"
    ]
  },
  {
    title: "Upgraded Double Passenger Seats",
    description: "Upgraded double seats at the passenger side that recline and can be flat to convert into an extra bed. Provides additional sleeping space. Comfortable for long journeys.",
    detailedDescription: "Transform your passenger space with our Upgraded Double Passenger Seats. These premium seats not only provide comfortable seating for two but also convert into an additional sleeping surface with a simple adjustment. Perfect for families or groups traveling together, the seats feature multi-position recline and a flat-bed conversion system. The memory foam cushioning ensures comfort on long journeys, while the durable construction withstands the rigors of travel.",
    keyFeatures: [
      "Converts to flat sleeping surface",
      "Memory foam cushioning",
      "Multi-position recline system",
      "Integrated seat belts",
      "Child seat anchor points",
      "Space-saving design"
    ],
    icon: <Users className="w-5 h-5" />,
    gradient: "from-purple-500/20 to-pink-500/20",
    specs: [
      "Seating: 2-person capacity",
      "Conversion: Flat bed system",
      "Padding: Premium memory foam",
      "Width: Standard van compatible"
    ]
  },
  {
    title: "Double Swivel Seats",
    description: "Double swivel seats in two sizes, 80 cm wide and 90 cm wide, with a recline feature. Offers flexible seating and sleeping options. Perfect for socializing and relaxing.",
    detailedDescription: "Our Double Swivel Seats combine the best of both worlds: comfortable double seating with versatile swivel functionality. Available in two widths (80cm and 90cm) to fit different van layouts, these seats feature smooth swivel rotation and adjustable recline. Perfect for creating a social area in your van, they rotate to face the interior for meals, conversation, or entertainment. The premium construction ensures durability while providing exceptional comfort for all passengers.",
    keyFeatures: [
      "Available in 80cm and 90cm widths",
      "Smooth swivel rotation",
      "Adjustable recline positions",
      "Premium upholstery options",
      "Integrated storage solutions",
      "Easy conversion system"
    ],
    icon: <Car className="w-5 h-5" />,
    gradient: "from-emerald-500/20 to-teal-500/20",
    specs: [
      "Sizes: 80cm & 90cm width options",
      "Rotation: Full 360° swivel",
      "Material: Premium automotive fabric",
      "Weight Capacity: 330 lbs per seat"
    ]
  },
  {
    title: "Double Swivel Seats that Convert into a Bed",
    description: "Double swivel seats that can unfold, recline, and convert into another bed. Maximizes sleeping capacity. Versatile and space-efficient.",
    detailedDescription: "Maximize your van's sleeping capacity with our Double Swivel Seats that Convert into a Bed. This innovative design combines comfortable double seating with a full sleeping surface. With simple adjustments, the seats transform into a spacious bed, perfect for accommodating guests or creating additional sleeping space. The swivel feature adds versatility, allowing the seats to face different directions when in seating mode. Engineered for comfort and durability, this solution is perfect for maximizing functionality in limited space.",
    keyFeatures: [
      "Dual function: seating and sleeping",
      "Smooth swivel mechanism",
      "Quick conversion system",
      "Premium mattress support",
      "Integrated storage compartments",
      "Space-optimized design"
    ],
    icon: <Bed className="w-5 h-5" />,
    gradient: "from-amber-500/20 to-orange-500/20",
    specs: [
      "Function: Seat + Bed conversion",
      "Swivel: 360° rotation",
      "Bed Size: Full double width",
      "Conversion Time: Under 2 minutes"
    ]
  },
  {
    title: "Front Bench Seating",
    description: "A front bench seating option. Provides additional seating capacity. Can often convert to additional sleeping space.",
    detailedDescription: "Our Front Bench Seating system reimagines the traditional van front area with enhanced functionality and comfort. This bench seating option provides comfortable seating for additional passengers while maintaining a sleek, integrated look. With optional conversion capabilities, it can transform into supplementary sleeping space when needed. The design integrates seamlessly with your van's interior while providing the comfort and support needed for long journeys. Perfect for larger families or groups who need maximum seating flexibility.",
    keyFeatures: [
      "Increased seating capacity",
      "Optional bed conversion",
      "Integrated seat belts",
      "Premium cushioning",
      "Custom upholstery options",
      "Space-efficient design"
    ],
    icon: <UsersIcon className="w-5 h-5" />,
    gradient: "from-indigo-500/20 to-blue-500/20",
    specs: [
      "Seating: Bench-style 2-3 person",
      "Conversion: Optional bed system",
      "Installation: Custom fit available",
      "Compatibility: Most van models"
    ]
  },
  {
    title: "Swivel Double Van Seat with Recline & Bed Conversion 80cm",
    description: "31.5 x 31.5 x 43.3 inches. Designed for both travel and relaxation, ready to turn your front van space into a living area.",
    detailedDescription: "This 80cm Swivel Double Van Seat is engineered for both travel comfort and living space versatility. Measuring 31.5 x 31.5 x 43.3 inches, it's perfectly sized for most van interiors while providing full functionality. The seat features smooth swivel rotation, multiple recline positions, and converts to a comfortable sleeping surface. Designed specifically for van life, it maximizes your available space while providing premium comfort whether you're driving, relaxing, or sleeping.",
    keyFeatures: [
      "80cm compact width design",
      "Full swivel functionality",
      "Bed conversion capability",
      "Multiple recline positions",
      "Premium materials throughout",
      "Space-optimized dimensions"
    ],
    icon: <Maximize className="w-5 h-5" />,
    gradient: "from-purple-500/20 to-violet-500/20",
    specs: [
      "Dimensions: 31.5\" x 31.5\" x 43.3\"",
      "Width: 80cm compact design",
      "Functions: Swivel + Recline + Bed",
      "Weight: Lightweight aluminum frame"
    ]
  },
  {
    title: "Swivel Double Van Seat with Recline & Bed Conversion 90cm",
    description: "35.4 x 31.5 x 43.4 inches. The ultimate upgrade your van needs with fully reclinable backrest and swivel feature.",
    detailedDescription: "Experience the ultimate in van seating luxury with our 90cm Swivel Double Van Seat. This premium option offers extra width for enhanced comfort while maintaining all the versatile features you need. With dimensions of 35.4 x 31.5 x 43.4 inches, it provides spacious seating that converts to a generous sleeping area. The fully reclinable backrest offers multiple comfort positions, while the smooth swivel mechanism creates flexible living arrangements. This is the ultimate upgrade for serious van lifers who value both comfort and functionality.",
    keyFeatures: [
      "90cm wider comfort design",
      "Fully reclinable backrest",
      "Premium swivel mechanism",
      "Convertible bed system",
      "Enhanced cushioning",
      "Premium finish options"
    ],
    icon: <Maximize className="w-5 h-5" />,
    gradient: "from-blue-500/20 to-indigo-500/20",
    specs: [
      "Dimensions: 35.4\" x 31.5\" x 43.4\"",
      "Width: 90cm comfort design",
      "Backrest: Full recline system",
      "Features: Swivel + Bed conversion"
    ]
  }
];

// Updated Product Data with your specific content
const product = {
  title: "NovaLux Triple Van Seat",
  subtitle: "Convertible triple van seat to Bed — 120 cm / 47.2\" Wide",
  description: "Space-Saving • camper van seat • 6-Foot Bed • Black Leather Finish",
  fullDescription: "Upgrade your camper van with a premium seat-bed engineered for real travel. This modular system provides secure automotive seating and a true 6-foot sleeping surface — all within a compact 47.2\" width perfect for narrow layouts and modern van conversions.",
  storageNote: "A black metal storage base is included for durable, built-in under-seat storage right out of the box.",
  price: "$3,550.00 USD",
  regularPrice: "$3,550.00 USD",
  monthly: "From $320.42/mo",
  availability: "sold-out",
  dimensions: "120 cm / 47.2\" Wide",
  tagline: "Engineered for real travel",
  
  features: [
    {
      title: "Practical, Secure Seating",
      items: [
        "Integrated 3-point seat belts",
        "Rear child-seat anchor points (upper tether anchors)"
      ],
      icon: <ShieldCheck className="w-4 h-4" />,
      color: "from-emerald-500/20 to-emerald-600/20"
    },
    {
      title: "Smart, Space-Efficient Design",
      items: [
        "Reclinable backrest — converts into a bed in seconds",
        "Swivel function — rotate the seat for more flexible space usage in your van",
        "Flush-sliding headrests designed specifically for vans",
        "6-foot bed length when fully extended",
        "Drop-down rear support panel (47\" wide) for extra stability",
        "Approx. 8\" slider adjustment to fine-tune seat or bed position"
      ],
      icon: <Maximize className="w-4 h-4" />,
      color: "from-blue-500/20 to-cyan-500/20"
    },
    {
      title: "A Clean, Comfortable Sleeping Surface",
      items: [
        "Separate sitting and sleeping surfaces for comfort and hygiene",
        "Dedicated flat sleeping side — not the seating surface",
        "Smooth, even, true flat bed without bumps or gaps",
        "Automotive support structure remains only on the seating side"
      ],
      icon: <Bed className="w-4 h-4" />,
      color: "from-purple-500/20 to-violet-500/20"
    },
    {
      title: "Camper-Van Friendly Installation",
      items: [
        "Slim 120 cm (47.2\") width fits compact layouts",
        "Bolt-in installation for maximum safety*",
        "No specialty subfloor required",
        "* Installation location must be structurally reinforced for through-bolting."
      ],
      icon: <Wrench className="w-4 h-4" />,
      color: "from-amber-500/20 to-orange-500/20"
    },
    {
      title: "Upholstery Finish: All-Black Leather",
      items: [
        "Durable, easy to clean, and designed for modern camper van interiors."
      ],
      icon: <Award className="w-4 h-4" />,
      color: "from-gray-500/20 to-slate-600/20"
    },
    {
      title: "Additional Feature: Reclinable Backrest & Swivel Function",
      items: [
        "With a fully reclinable backrest, the seat converts into a bed in seconds — perfect for road trips or when hosting guests for a sleepover inside your van."
      ],
      icon: <RotateCcw className="w-4 h-4" />,
      color: "from-indigo-500/20 to-blue-500/20"
    }
  ],

  optionalFeatures: {
    title: "Optional Professional Installation",
    description: "This seat-bed requires a secure, permanent installation. We offer professional installation at our Big Bear shop for an additional cost.",
    cost: "$190/hour",
    options: [
      "Seat only",
      "Seat + Professional Installation"
    ],
    note: "Contact us if you would like our team to install the seat for you."
  },

  perfectFor: [
    "Camper vans, Sprinters, Transits, ProMasters",
    "Adventure vans & family travel setups",
    "Narrow layouts needing a space-efficient seat-bed",
    "Anyone who wants a clean, flat, comfortable sleeping surface"
  ],

  specifications: [
    { label: "Width", value: "120 cm / 47.2 inches", icon: <Maximize className="w-3 h-3" /> },
    { label: "Bed Length", value: "6 feet (when fully extended)", icon: <Bed className="w-3 h-3" /> },
    { label: "Material", value: "Premium Black Leather", icon: <Award className="w-3 h-3" /> },
    { label: "Frame", value: "Aerospace-Grade Aluminum", icon: <Shield className="w-3 h-3" /> },
    { label: "Weight Capacity", value: "330 lbs per seat", icon: <Package className="w-3 h-3" /> },
    { label: "Installation", value: "Bolt-in (Professional Recommended)", icon: <Wrench className="w-3 h-3" /> },
    { label: "Warranty", value: "5 Years Structural, 3 Years Upholstery", icon: <ShieldCheck className="w-3 h-3" /> },
    { label: "Compatibility", value: "Sprinter, Transit, ProMaster, NV3500", icon: <Car className="w-3 h-3" /> }
  ],

  benefits: [
    {
      title: "Dual Functionality",
      description: "Seamlessly transforms from comfortable seating to full-length bed",
      icon: <Zap className="w-5 h-5" />,
      color: "text-purple-400",
      gradient: "from-purple-600/20 to-blue-600/20"
    },
    {
      title: "Space Optimized",
      description: "47.2\" slim design fits perfectly in narrow van layouts",
      icon: <Maximize className="w-5 h-5" />,
      color: "text-blue-400",
      gradient: "from-blue-600/20 to-cyan-600/20"
    },
    {
      title: "Premium Comfort",
      description: "Separate sleeping surface ensures optimal rest",
      icon: <Sparkles className="w-5 h-5" />,
      color: "text-amber-400",
      gradient: "from-amber-600/20 to-orange-600/20"
    },
    {
      title: "Easy Conversion",
      description: "Convert from seat to bed in under 60 seconds",
      icon: <Clock className="w-5 h-5" />,
      color: "text-emerald-400",
      gradient: "from-emerald-600/20 to-teal-600/20"
    }
  ],

  purchasingPower: {
    monthly: "$320.42/mo",
    term: "12 months",
    total: "$3,550.00"
  }
};

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const slideIn = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
};

const floatAnimation = {
  initial: { y: 0 },
  animate: { 
    y: [0, -8, 0],
    transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
  }
};

export default function NovaLuxSeatPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [showPurchasingPower, setShowPurchasingPower] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [activeSection, setActiveSection] = useState(null);
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [selectedOption, setSelectedOption] = useState('seat-only');
  const [isHovering, setIsHovering] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef(null);

  const totalImages = seatImages.length;

  // Auto-play image slider
  useEffect(() => {
    if (!isAutoPlaying || totalImages <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % totalImages);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalImages]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % totalImages);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
  };

  const handleExternalLink = (url) => {
    window.open(url, '_blank');
  };

  const handleScrollTo = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
    setActiveSection(sectionId);
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setEmailSubmitted(true);
      setEmail('');
      setTimeout(() => setEmailSubmitted(false), 3000);
    }
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  const closeProductModal = () => {
    setShowProductModal(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
    setVideoError(false);
  };

  const handleVideoError = () => {
    setIsVideoLoaded(true);
    setVideoError(true);
  };

  // Optimized video loading - only load when in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && videoRef.current) {
          videoRef.current.load();
        }
      },
      { threshold: 0.1 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  const totalPrice = {
    'seat-only': 3550,
    'seat-installation': 3550 + (190 * 2)
  }[selectedOption] * quantity;

  return (
    <div className="bg-gradient-to-b from-gray-950 via-black to-gray-900 text-white font-sans overflow-x-hidden">
      
      {/* Enhanced Cosmic Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, rgba(147, 51, 234, 0.1) 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.05) 0%, transparent 50%),
                            radial-gradient(circle at 40% 80%, rgba(236, 72, 153, 0.03) 0%, transparent 50%)`,
          }} />
        </div>
        
        {[...Array(60)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute rounded-full hidden sm:block"
            initial={{
              x: Math.random() * 100 + 'vw',
              y: Math.random() * 100 + 'vh',
              scale: Math.random() * 0.2 + 0.1
            }}
            animate={{
              x: [null, Math.random() * 100 + 'vw'],
              y: [null, Math.random() * 100 + 'vh'],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{
              duration: Math.random() * 15 + 15,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              background: `radial-gradient(circle, ${
                Math.random() > 0.5 ? 'rgba(147, 51, 234, 0.3)' : 'rgba(59, 130, 246, 0.3)'
              } 0%, transparent 70%)`,
            }}
          />
        ))}
        
        <div className="absolute inset-0 opacity-[0.03]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(147, 51, 234, 0.1)" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      {/* Premium Navigation Bar - Fixed Mobile Layout */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="fixed top-0 w-full z-50 flex justify-between items-center px-4 py-3 backdrop-blur-lg bg-gradient-to-b from-gray-900/95 to-gray-900/90 border-b border-white/5 shadow-lg"
      >
        <motion.div 
          className="flex items-center gap-2 group"
          whileHover={{ scale: 1.03 }}
        >
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="relative"
          >
            <div className="relative w-8 h-8 bg-gradient-to-br from-purple-600 via-blue-500 to-cyan-400 rounded-lg flex items-center justify-center shadow-md shadow-purple-500/20">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
          </motion.div>
          <div>
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-lg font-bold tracking-tight"
              style={{
                background: 'linear-gradient(135deg, #a855f7 0%, #3b82f6 50%, #06b6d4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '0.05em'
              }}
            >
              NOVALUX
            </motion.h1>
            <p className="text-[10px] text-gray-400 -mt-0.5 tracking-widest">PREMIUM SEATING</p>
          </div>
        </motion.div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          {['features', 'video', 'specs', 'installation', 'related'].map((section) => (
            <motion.button
              key={section}
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleScrollTo(section)}
              className={`relative px-2 py-1 text-gray-300 hover:text-white transition-colors uppercase tracking-wider text-xs ${
                activeSection === section ? 'text-white' : ''
              }`}
            >
              {section === 'related' ? 'Collection' : section}
              {activeSection === section && (
                <motion.div 
                  layoutId="nav-indicator"
                  className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.button>
          ))}
        </div>
        
        <div className="flex items-center gap-2">
          <motion.button 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleExternalLink(EXTERNAL_URLS.shopAll)}
            className="hidden sm:flex items-center gap-1.5 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-md shadow-purple-500/20 group"
          >
            <ShoppingCart className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            Shop All
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="md:hidden p-2 rounded-lg bg-gradient-to-br from-gray-900/50 to-black/50 border border-white/10 shadow-md"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute top-full left-0 right-0 bg-gradient-to-b from-gray-900/95 via-gray-900/95 to-black/95 backdrop-blur-lg border-b border-white/10 p-4 md:hidden shadow-lg"
            >
              <div className="flex flex-col gap-2">
                {['features', 'video', 'specs', 'installation', 'related'].map((section) => (
                  <motion.button
                    key={section}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    onClick={() => handleScrollTo(section)}
                    className="text-left py-3 px-4 rounded-lg hover:bg-gradient-to-r hover:from-purple-900/30 hover:to-blue-900/30 transition-all uppercase tracking-wider text-sm border border-white/5 hover:border-purple-500/30 group"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-blue-500" />
                      {section === 'related' ? 'Collection' : section}
                    </div>
                  </motion.button>
                ))}
                <motion.button
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  onClick={() => { handleExternalLink(EXTERNAL_URLS.shopAll); setIsMenuOpen(false); }}
                  className="bg-gradient-to-r from-purple-600 to-blue-500 text-white py-3 rounded-lg font-bold mt-1 text-sm shadow-md shadow-purple-500/20"
                >
                  Shop All Seats
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section - Fixed Mobile Layout */}
      <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden pt-16 px-4">
        {/* Animated Background with Darker Overlay */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-black/10 to-blue-900/10 z-10" />
          
          {/* Main Hero Image with Maximum Height */}
          <motion.div 
            className="absolute inset-0"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <img 
              src={seatImages[1]}  
              alt="NovaLux Triple Van Seat"
              className="w-full h-full object-cover object-center brightness-50"
              loading="eager"
            />
          </motion.div>
          
          {/* Additional Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/20 to-transparent z-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20 z-20" />
          
          {/* Subtle Particle Overlay */}
          <div className="absolute inset-0 z-30">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full hidden sm:block"
                initial={{
                  x: Math.random() * 100 + 'vw',
                  y: Math.random() * 100 + 'vh',
                }}
                animate={{
                  y: [null, Math.random() * 100 + 'vh'],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  width: `${Math.random() * 3 + 1}px`,
                  height: `${Math.random() * 3 + 1}px`,
                  background: 'rgba(255, 255, 255, 0.1)',
                  filter: 'blur(1px)'
                }}
              />
            ))}
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-40 w-full max-w-6xl mx-auto px-2 sm:px-4 mt-8">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-center"
          >
            {/* Premium Badge - Brighter */}
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-600/40 to-blue-600/40 border border-purple-400/40 backdrop-blur-lg text-white font-bold tracking-[0.1em] text-xs uppercase mb-6 shadow-lg group"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-3 h-3 text-white" />
              </motion.div>
              <span className="text-white font-bold drop-shadow-lg">
                Luxury Automotive Grade
              </span>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <Award className="w-3 h-3 text-white" />
              </motion.div>
            </motion.div>
            
            {/* Main Title - Much Brighter */}
            <div className="relative mb-4">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl font-bold mb-2 tracking-tight px-2"
              >
                <span className="relative">
                  <span className="bg-gradient-to-r from-white via-purple-100 to-blue-100 bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                    NOVALUX
                  </span>
                </span>
                <br />
                <span className="text-2xl md:text-4xl text-white font-bold drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                  TRIPLE VAN SEAT
                </span>
              </motion.h1>
            </div>
            
            {/* Subtitle - Brighter */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mb-4"
            >
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
                <span className="text-base md:text-lg text-white font-medium tracking-wide px-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  {product.subtitle}
                </span>
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
              </div>
            </motion.div>
            
            {/* Description - Brighter */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-sm md:text-base text-white/90 mb-6 max-w-2xl mx-auto leading-relaxed px-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)] font-medium"
            >
              {product.description}
            </motion.p>
            
            {/* CTA Buttons - Fixed Mobile Width */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center px-2"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleScrollTo('features')}
                className="group relative bg-gradient-to-r from-purple-600 via-purple-500 to-blue-500 text-white px-4 py-3 rounded-xl text-sm font-bold hover:shadow-[0_0_30px_rgba(147,51,234,0.6)] transition-all duration-300 overflow-hidden border border-purple-400 shadow-xl w-full max-w-xs sm:w-auto"
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-white/10 to-blue-500/0"
                  animate={{ 
                    x: ['-100%', '100%']
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span className="font-bold">View Key Features</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleExternalLink(EXTERNAL_URLS.contact)}
                className="group relative bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-lg border border-white/30 text-white px-4 py-3 rounded-xl text-sm font-bold hover:border-purple-400/60 hover:bg-white/15 hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] transition-all duration-300 shadow-lg w-full max-w-xs sm:w-auto"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span className="font-bold">Contact Advisor</span>
                </span>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 hidden sm:block z-40"
        >
          <div className="relative">
            <div className="w-6 h-8 border border-white/30 rounded-full flex justify-center backdrop-blur-sm">
              <motion.div 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-1 h-3 bg-gradient-to-b from-white to-blue-200 rounded-full mt-1.5"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Main Content Container - Fixed Mobile Padding */}
      <div className="relative z-10 max-w-6xl mx-auto px-3 sm:px-4 py-12 md:py-16">
        
        {/* Product Showcase */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 mb-16 md:mb-20">
          {/* Image Gallery */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideIn}
            className="space-y-6"
          >
            {/* Main Image */}
            <motion.div 
              variants={floatAnimation}
              className="relative aspect-[4/3] bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-2xl overflow-hidden border border-white/10 shadow-lg group"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <motion.img 
                key={currentImageIndex}
                src={seatImages[currentImageIndex]}
                alt={`NovaLux Seat ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: isHovering ? 1.02 : 1 }}
                transition={{ duration: 0.4 }}
                loading="lazy"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Navigation Buttons */}
              {totalImages > 1 && (
                <>
                  <motion.button 
                    onClick={prevImage}
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(147, 51, 234, 0.3)' }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-lg border border-white/20 flex items-center justify-center hover:border-purple-500/50 transition-all shadow-lg"
                  >
                    <ChevronLeft className="w-4 h-4 text-purple-300" />
                  </motion.button>
                  
                  <motion.button 
                    onClick={nextImage}
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(59, 130, 246, 0.3)' }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-lg border border-white/20 flex items-center justify-center hover:border-blue-500/50 transition-all shadow-lg"
                  >
                    <ChevronRight className="w-4 h-4 text-blue-300" />
                  </motion.button>
                  
                  {/* Auto-play Toggle */}
                  <motion.button 
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-lg border border-white/20 flex items-center justify-center hover:border-purple-500/50 transition-all shadow-md"
                    title={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
                  >
                    {isAutoPlaying ? (
                      <Pause className="w-3 h-3 text-purple-300" />
                    ) : (
                      <Play className="w-3 h-3 text-purple-300" />
                    )}
                  </motion.button>
                  
                  {/* Image Counter */}
                  <motion.div 
                    className="absolute top-3 left-3 bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-lg px-2.5 py-1 rounded-lg border border-white/20 shadow-md"
                  >
                    <p className="text-xs font-medium text-purple-300">
                      {currentImageIndex + 1} / {totalImages}
                    </p>
                  </motion.div>
                </>
              )}
            </motion.div>

            {/* Thumbnail Strip */}
            {totalImages > 1 && (
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
              >
                {seatImages.map((img, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-lg overflow-hidden border transition-all relative ${
                      index === currentImageIndex 
                        ? 'border-purple-500 scale-105 shadow-md shadow-purple-500/20' 
                        : 'border-white/10 hover:border-purple-400/40'
                    }`}
                  >
                    <img 
                      src={img} 
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </motion.button>
                ))}
              </motion.div>
            )}
          </motion.div>
          
          {/* Product Details */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="space-y-8"
          >
            {/* Price & Availability */}
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider mb-1">Regular price</div>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-1">$3,550.00 USD</div>
                </div>
                <motion.div 
                  className={`px-3 py-1 rounded-full backdrop-blur-sm border shadow-md text-sm ${
                    product.availability === 'sold-out' 
                      ? 'bg-gradient-to-r from-red-500/20 to-red-600/20 border-red-500/30 text-red-300' 
                      : 'bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 border-emerald-500/30 text-emerald-300'
                  }`}
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Sold out
                </motion.div>
              </div>
              
              <div className="text-gray-400 text-sm flex items-center gap-1.5">
                <Truck className="w-4 h-4" />
                Shipping calculated at checkout.
              </div>
              
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30">
                  <CreditCard className="w-4 h-4 text-blue-300" />
                </div>
                <div>
                  <div className="text-sm font-bold text-blue-400">{product.monthly} with</div>
                  <motion.button
                    onClick={() => setShowPurchasingPower(!showPurchasingPower)}
                    className="text-sm text-blue-300 hover:text-blue-200 transition-colors"
                  >
                    Check your purchasing power
                  </motion.button>
                </div>
              </div>
            </div>
            
            {/* Purchasing Power Section */}
            {showPurchasingPower && (
              <motion.div 
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                className="p-4 bg-gradient-to-br from-gray-900/40 to-black/40 rounded-xl border border-white/10 backdrop-blur-sm space-y-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-white text-sm">Your purchasing power is</h4>
                  <div className="px-2 py-0.5 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded border border-blue-500/30 text-blue-300 text-sm">
                    See plans
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-br from-gray-900/30 to-black/30">
                    <span className="text-gray-300 text-sm">Monthly Payment</span>
                    <span className="font-bold text-white text-lg">{product.purchasingPower.monthly}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-br from-purple-900/20 to-blue-900/20">
                    <span className="text-gray-300 text-sm">Term</span>
                    <span className="font-bold text-purple-300 text-base">{product.purchasingPower.term}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-gradient-to-br from-gray-900/30 to-black/30">
                    <span className="text-gray-300 text-sm">Total</span>
                    <span className="font-bold text-white">{product.purchasingPower.total}</span>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Dimensions Card */}
            <motion.div 
              whileHover={{ scale: 1.01, y: -2 }}
              className="p-4 bg-gradient-to-br from-gray-900/40 to-black/40 rounded-xl border border-white/10 hover:border-purple-500/30 transition-all backdrop-blur-sm group"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-gradient-to-br from-purple-600/20 to-blue-600/20">
                  <Maximize className="w-4 h-4 text-purple-300" />
                </div>
                <div>
                  <div className="text-xs text-gray-400 uppercase tracking-wider">Dimensions</div>
                  <div className="text-lg font-bold text-white">{product.dimensions}</div>
                </div>
              </div>
              <div className="text-gray-300 text-sm">
                Convertible triple van seat to Bed — Perfect for narrow layouts and modern van conversions
              </div>
            </motion.div>
            
            {/* Full Description */}
            <div>
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <Award className="w-4 h-4 text-purple-400" />
                Premium Engineering
              </h3>
              <p className="text-gray-300 leading-relaxed text-sm mb-4">
                {product.fullDescription}
              </p>
              <p className="text-gray-300 leading-relaxed text-sm bg-gradient-to-r from-gray-900/30 to-black/30 p-3 rounded-lg border border-white/5">
                {product.storageNote}
              </p>
            </div>
            
            {/* Key Features Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">Key Features</h3>
              <div className="space-y-3">
                {product.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -2, scale: 1.01 }}
                    className={`p-3 bg-gradient-to-br from-gray-900/30 to-black/30 rounded-xl border border-white/10 group hover:border-purple-500/30 transition-all`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-purple-600/20 to-blue-600/20 flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-white text-sm mb-2">{feature.title}</div>
                        <ul className="space-y-1.5">
                          {feature.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start gap-2">
                              <div className="w-1.5 h-1.5 mt-1.5 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex-shrink-0" />
                              <span className="text-gray-300 text-sm break-words">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Option Selection */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Settings className="w-4 h-4 text-purple-400" />
                {product.optionalFeatures.title}
              </h3>
              <p className="text-gray-300 text-sm">{product.optionalFeatures.description}</p>
              
              <div className="space-y-3">
                <div className="p-3 bg-gradient-to-br from-amber-900/20 to-orange-900/20 rounded-xl border border-amber-500/30">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-0">
                    <div>
                      <div className="text-xs text-amber-300 uppercase tracking-wider">Installation Cost</div>
                      <div className="text-lg font-bold text-white">{product.optionalFeatures.cost}</div>
                    </div>
                    <div className="text-sm text-gray-400">Available as an add-on option at checkout</div>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm font-bold text-white mb-2">Choose between:</div>
                  <div className="space-y-2">
                    {product.optionalFeatures.options.map((option, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-br from-gray-900/30 to-black/30 border border-white/10 hover:border-purple-500/30 transition-all"
                      >
                        <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500" />
                        <span className="text-white text-sm">{option}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                <div className="p-3 bg-gradient-to-br from-gray-900/40 to-black/40 rounded-xl border border-white/10">
                  <p className="text-gray-300 text-sm">{product.optionalFeatures.note}</p>
                </div>
              </div>
            </div>
            
            {/* Quantity & Total */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">Quantity</h3>
                <div className="text-right">
                  <div className="text-sm text-gray-400">Total</div>
                  <div className="text-xl font-bold text-white">${totalPrice.toFixed(2)}</div>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center gap-3 bg-gradient-to-br from-gray-900/40 to-black/40 rounded-xl p-3 border border-white/10">
                <div className="flex items-center gap-2 bg-gradient-to-br from-gray-900 to-black rounded-lg p-1.5 border border-white/10 w-full md:w-auto justify-center md:justify-start">
                  <motion.button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(147, 51, 234, 0.3)' }}
                    whileTap={{ scale: 0.9 }}
                    className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-purple-900/30 active:bg-purple-900/50 transition-colors text-purple-300"
                  >
                    <Minus className="w-3 h-3" />
                  </motion.button>
                  <motion.span 
                    key={quantity}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring" }}
                    className="w-8 text-center text-base font-bold text-white"
                  >
                    {quantity}
                  </motion.span>
                  <motion.button 
                    onClick={() => setQuantity(quantity + 1)}
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(59, 130, 246, 0.3)' }}
                    whileTap={{ scale: 0.9 }}
                    className="w-8 h-8 rounded-md flex items-center justify-center hover:bg-blue-900/30 active:bg-blue-900/50 transition-colors text-blue-300"
                  >
                    <Plus className="w-3 h-3" />
                  </motion.button>
                </div>
                
                <div className="text-center md:text-right md:ml-auto">
                  <div className="text-sm text-gray-400">Per Unit</div>
                  <div className="text-base font-bold text-white">$3,550.00</div>
                </div>
              </div>
            </div>
            
            {/* CTA Buttons - Fixed Mobile Width */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center p-6 bg-gradient-to-br from-gray-900/40 to-black/40 rounded-xl border border-white/10"
              >
                <div className="text-lg font-bold text-white mb-1">Currently Sold Out</div>
                <p className="text-gray-400 text-sm mb-3">This premium seat is currently out of stock</p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleExternalLink(EXTERNAL_URLS.contact)}
                  className="inline-flex items-center gap-1.5 bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-3 rounded-lg text-sm font-bold w-full max-w-xs md:w-auto justify-center mx-auto"
                >
                  <Mail className="w-4 h-4" />
                  Contact for Availability
                </motion.button>
              </motion.div>
              
              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10">
                {[
                  { icon: <ShieldCheck className="w-4 h-4" />, text: '5-Year Warranty' },
                  { icon: <Truck className="w-4 h-4" />, text: 'Secure Shipping' },
                  { icon: <RotateCcw className="w-4 h-4" />, text: '30-Day Returns' }
                ].map((badge, index) => (
                  <div key={index} className="text-center">
                    <div className="p-1.5 rounded-md bg-gradient-to-br from-gray-900/30 to-black/30 inline-flex items-center justify-center mb-1">
                      {badge.icon}
                    </div>
                    <div className="text-sm text-gray-400">{badge.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Video Showcase Section - Optimized */}
        <section id="video" className="mb-16 md:mb-20">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-8 md:mb-12"
          >
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="p-2 rounded-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-white/20"
              >
                <Play className="w-5 h-5 text-white" />
              </motion.div>
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-white to-transparent" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white via-purple-100 to-blue-100 bg-clip-text text-transparent drop-shadow-lg">
                Experience The Transformation
              </span>
            </h2>
            <p className="text-gray-300 text-sm max-w-xl mx-auto px-2">
              Watch our 8-second showcase of the NovaLux Triple Seat in action
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl group max-w-3xl mx-auto"
          >
            {/* Premium Video Container */}
            <div className="relative aspect-[16/9] bg-gradient-to-br from-gray-900 via-black to-gray-900">
              {/* Loading State */}
              {!isVideoLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-900/10 to-blue-900/10">
                  <motion.div
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-20 h-20 border-2 border-white/20 border-t-white rounded-full mb-4 mx-auto"
                    />
                    <p className="text-white/70 text-sm">Loading video...</p>
                  </motion.div>
                </div>
              )}
              
              {/* Video Element - Optimized with preload */}
              <video
                ref={videoRef}
                src={SEAT_VIDEO}
                className={`w-full h-full object-cover ${isVideoLoaded ? 'block' : 'hidden'}`}
                playsInline
                loop
                muted
                preload="metadata"
                onLoadedData={handleVideoLoad}
                onError={handleVideoError}
                onClick={toggleVideoPlay}
                poster={seatImages[0]}
                playsInline
                controls={false}
              />
              
              {/* Video Error State */}
              {videoError && (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-900/20 to-blue-900/20">
                  <div className="text-center p-6">
                    <div className="p-3 rounded-full bg-gradient-to-r from-red-600/20 to-red-500/20 border border-red-500/30 mb-4 mx-auto w-16 h-16 flex items-center justify-center">
                      <X className="w-6 h-6 text-red-400" />
                    </div>
                    <p className="text-white/80 text-sm mb-2">Video failed to load</p>
                    <p className="text-white/60 text-xs">Please check your connection</p>
                  </div>
                </div>
              )}
              
              {/* Premium Video Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-all duration-500 ${isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`}>
                {/* Premium Play Button */}
                <motion.button
                  onClick={toggleVideoPlay}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-r from-purple-600/90 to-blue-600/90 backdrop-blur-xl rounded-full border-2 border-white/40 flex items-center justify-center hover:shadow-[0_0_50px_rgba(147,51,234,0.9)] hover:border-white/60 transition-all duration-300 shadow-[0_0_30px_rgba(0,0,0,0.5)] group/play"
                >
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-full blur-xl group-hover/play:blur-2xl transition-all duration-300" />
                  
                  {/* Button Content */}
                  <div className="relative z-10 flex items-center justify-center">
                    {isPlaying ? (
                      <div className="relative">
                        <div className="w-6 h-6 bg-white rounded-sm" />
                      </div>
                    ) : (
                      <div className="relative ml-1">
                        <Play className="w-10 h-10 text-white" />
                      </div>
                    )}
                  </div>
                  
                  {/* Pulsing Ring */}
                  {!isPlaying && (
                    <motion.div
                      className="absolute inset-0 border-2 border-white/30 rounded-full"
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                </motion.button>
                
                {/* Premium Video Info Panel */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/80 to-transparent backdrop-blur-sm">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                    <div className="text-left">
                      <div className="flex items-center gap-2 mb-1">
                        <Sparkles className="w-4 h-4 text-purple-300" />
                        <h3 className="text-lg font-bold text-white">
                          NovaLux In-Van Demo
                        </h3>
                      </div>
                      <p className="text-gray-300 text-sm">
                        Watch the premium triple seat in its natural environment
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      {/* Video Stats */}
                      <div className="flex items-center gap-2 bg-gradient-to-r from-purple-900/50 to-blue-900/50 backdrop-blur-md rounded-full px-3 py-1.5 border border-white/10">
                        <Clock className="w-4 h-4 text-blue-300" />
                        <span className="text-sm font-medium text-blue-200">00:08</span>
                      </div>
                      
                      <div className="flex items-center gap-2 bg-gradient-to-r from-purple-900/50 to-blue-900/50 backdrop-blur-md rounded-full px-3 py-1.5 border border-white/10">
                        <Maximize className="w-4 h-4 text-purple-300" />
                        <span className="text-sm font-medium text-purple-200">HD</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Enhanced Progress Bar */}
                  <div className="mt-4">
                    <div className="h-1.5 w-full bg-gray-800/70 rounded-full overflow-hidden backdrop-blur-sm">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                        animate={{ width: isPlaying ? '100%' : '0%' }}
                        transition={{ duration: 8, ease: "linear" }}
                      />
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-gray-400">00:00</span>
                      <span className="text-xs text-gray-400">00:08</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Premium Video Controls */}
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <motion.button
                onClick={() => {
                  if (videoRef.current) {
                    videoRef.current.muted = !videoRef.current.muted;
                  }
                }}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 rounded-full bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border border-white/20 flex items-center justify-center hover:border-blue-400/60 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-300 shadow-lg"
                title="Toggle sound"
              >
                <Volume2 className="w-4 h-4 text-blue-300" />
              </motion.button>
              
              <motion.button
                onClick={toggleVideoPlay}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 rounded-full bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-xl border border-white/20 flex items-center justify-center hover:border-purple-400/60 hover:shadow-[0_0_20px_rgba(147,51,234,0.4)] transition-all duration-300 shadow-lg"
                title={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 text-purple-300" />
                ) : (
                  <Play className="w-4 h-4 text-purple-300" />
                )}
              </motion.button>
              
              {/* Loop Indicator */}
              <div className="hidden sm:flex items-center gap-1.5 bg-gradient-to-r from-purple-900/40 to-blue-900/40 backdrop-blur-md rounded-full px-2.5 py-1 border border-white/10">
                <RotateCcw className="w-3 h-3 text-cyan-300" />
                <span className="text-xs text-cyan-200 font-medium">Loop</span>
              </div>
            </div>
            
            {/* Premium Badge */}
            <div className="absolute top-4 left-4">
              <div className="flex items-center gap-2 bg-gradient-to-r from-purple-900/60 to-blue-900/60 backdrop-blur-xl rounded-full px-3 py-1.5 border border-white/20">
                <Sparkles className="w-3 h-3 text-white" />
                <span className="text-xs font-medium text-white">Premium Demo</span>
              </div>
            </div>
          </motion.div>
          
          {/* Video Features - Premium Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 max-w-3xl mx-auto">
            {[
              {
                title: "In-Van Placement",
                description: "See how it fits perfectly in your van",
                icon: <Car className="w-5 h-5" />,
                gradient: "from-purple-600/30 to-blue-600/30",
                delay: 0.1
              },
              {
                title: "Quick Conversion",
                description: "8-second transformation demo",
                icon: <Clock className="w-5 h-5" />,
                gradient: "from-blue-600/30 to-cyan-600/30",
                delay: 0.2
              },
              {
                title: "Premium Finish",
                description: "Showcasing black leather quality",
                icon: <Award className="w-5 h-5" />,
                gradient: "from-cyan-600/30 to-emerald-600/30",
                delay: 0.3
              },
              {
                title: "Real Environment",
                description: "Displayed in actual van setup",
                icon: <Home className="w-5 h-5" />,
                gradient: "from-emerald-600/30 to-purple-600/30",
                delay: 0.4
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: feature.delay }}
                viewport={{ once: true }}
                whileHover={{ y: -4, scale: 1.03 }}
                className={`group relative p-5 bg-gradient-to-br ${feature.gradient} via-black/40 to-gray-900/30 rounded-2xl border border-white/10 hover:border-white/30 transition-all duration-300 backdrop-blur-sm overflow-hidden`}
              >
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-opacity duration-500 from-purple-500/10 via-blue-500/10 to-cyan-500/10" />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <motion.div 
                      className={`p-2.5 rounded-xl bg-gradient-to-br ${feature.gradient} border border-white/20 group-hover:border-white/40 transition-colors`}
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                    >
                      <div className="text-white">
                        {feature.icon}
                      </div>
                    </motion.div>
                    <div className="text-base font-bold text-white">{feature.title}</div>
                  </div>
                  <p className="text-gray-200 text-sm group-hover:text-white transition-colors leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Video Call to Action - Fixed Mobile Width */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <p className="text-gray-400 text-sm mb-3 max-w-lg mx-auto px-2">
              This quick demo shows the NovaLux seat in its natural environment. 
              See how it transforms your van space.
            </p>
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleVideoPlay}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600/90 to-blue-600/90 text-white px-5 py-3 rounded-xl text-sm font-bold hover:shadow-[0_0_25px_rgba(147,51,234,0.4)] transition-all duration-300 backdrop-blur-sm border border-white/20 w-full max-w-xs sm:w-auto"
            >
              <Play className="w-4 h-4" />
              Play Demo Again
            </motion.button>
          </motion.div>
        </section>

        {/* Perfect For Section */}
        <section id="features" className="mb-16 md:mb-20">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-8 md:mb-12"
          >
            <motion.div 
              className="inline-flex items-center gap-3 mb-4"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
              <Sparkles className="w-5 h-5 text-purple-400" />
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
            </motion.div>
            <motion.h2 
              className="text-2xl md:text-3xl font-bold mb-4"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{
                background: 'linear-gradient(90deg, #a855f7 0%, #3b82f6 50%, #06b6d4 100%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Perfect For
            </motion.h2>
            <p className="text-gray-400 text-sm max-w-2xl mx-auto px-2">
              Designed for adventurers who demand the best from their mobile living spaces
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {product.perfectFor.map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -3, scale: 1.02 }}
                className="group relative p-4 bg-gradient-to-br from-gray-900/30 via-black/30 to-gray-900/30 rounded-xl border border-white/10 hover:border-purple-500/30 transition-all duration-300 overflow-hidden"
              >
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <motion.div 
                      className="p-2 rounded-lg bg-gradient-to-br from-purple-600/20 to-blue-600/20"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                    >
                      <CheckCircle className="w-4 h-4 text-purple-300" />
                    </motion.div>
                    <div className="text-sm text-purple-300 uppercase tracking-wider">Ideal For</div>
                  </div>
                  <p className="text-gray-300 group-hover:text-white transition-colors leading-relaxed text-sm">
                    {useCase}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* Related Products Section */}
        <section id="related" className="mb-16 md:mb-20">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                You May Also Like
              </span>
            </h2>
            <p className="text-gray-400 text-sm max-w-xl mx-auto px-2">
              Explore our collection of premium van seating solutions
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedProducts.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative p-4 bg-gradient-to-br from-gray-900/30 via-black/30 to-gray-900/30 rounded-xl border border-white/10 hover:border-purple-500/30 transition-all duration-300 overflow-hidden"
              >
                <motion.div 
                  className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />
                
                {/* Icon */}
                <motion.div 
                  className={`p-3 rounded-xl bg-gradient-to-br ${item.gradient} border border-white/10 mb-4 inline-flex`}
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
                >
                  <div className="text-white">
                    {item.icon}
                  </div>
                </motion.div>
                
                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-base font-bold text-white mb-3 line-clamp-2">{item.title}</h3>
                  <p className="text-gray-300 text-sm mb-4 group-hover:text-white transition-colors line-clamp-2">
                    {item.description}
                  </p>
                  
                  <motion.button
                    onClick={() => handleProductClick(item)}
                    whileHover={{ x: 3 }}
                    className="inline-flex items-center gap-1.5 text-purple-300 text-sm font-medium hover:text-purple-200 transition-colors"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-3 h-3" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Fixed Mobile Button Width */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-8"
          >
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleExternalLink(EXTERNAL_URLS.swivelSeats)}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-3 rounded-xl text-sm font-bold hover:shadow-[0_0_20px_rgba(147,51,234,0.2)] transition-all duration-300 shadow-lg w-full max-w-xs sm:w-auto justify-center mx-auto"
            >
              <Sparkles className="w-4 h-4" />
              View Complete Collection
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </section>
        
        {/* Specifications Section */}
        <section id="specs" className="mb-16 md:mb-20">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
              <Cpu className="w-5 h-5 text-purple-400" />
              <div className="w-8 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Technical Specifications
              </span>
            </h2>
            <p className="text-gray-400 text-sm max-w-xl mx-auto px-2">
              Premium materials and engineering for exceptional performance
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden border border-white/10 bg-gradient-to-b from-gray-900/30 via-black/30 to-gray-900/30 backdrop-blur-sm"
          >
            {product.specifications.map((spec, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -10 : 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className={`group flex flex-col md:flex-row items-start md:items-center p-4 hover:bg-white/5 transition-colors ${
                  index !== product.specifications.length - 1 ? 'border-b border-white/10' : ''
                }`}
              >
                <div className="w-full md:w-2/5 mb-2 md:mb-0">
                  <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-md bg-gradient-to-br from-purple-600/20 to-blue-600/20 text-purple-300">
                      {spec.icon}
                    </div>
                    <div className="text-gray-400 text-sm">{spec.label}</div>
                  </div>
                </div>
                <div className="w-full md:w-3/5 text-white font-semibold text-sm">
                  {spec.value}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>
        
        {/* Final CTA - Fixed Mobile Layout */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative p-6 md:p-8 rounded-2xl overflow-hidden mb-16 group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-black/40 to-blue-900/20" />
          
          <div className="relative z-10 text-center">
            <motion.h2 
              className="text-2xl md:text-3xl font-bold mb-6"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{
                background: 'linear-gradient(90deg, #a855f7 0%, #3b82f6 50%, #06b6d4 100%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Elevate Your Van Experience
            </motion.h2>
            
            <motion.p 
              className="text-gray-300 text-sm mb-8 max-w-2xl mx-auto leading-relaxed px-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Experience the perfect synergy of luxury, functionality, and innovation with NovaLux Premium Seating. Transform your van into a mobile sanctuary.
            </motion.p>
            
            {/* Fixed Mobile Button Widths */}
            <div className="flex flex-col md:flex-row gap-3 md:gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleExternalLink(EXTERNAL_URLS.contact)}
                className="group relative bg-gradient-to-r from-purple-600 via-purple-500 to-blue-500 text-white px-6 py-3 rounded-xl text-sm font-bold hover:shadow-[0_0_20px_rgba(147,51,234,0.3)] transition-all duration-300 overflow-hidden border border-purple-500/30 shadow-lg w-full max-w-xs md:w-auto"
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-blue-500/0"
                  animate={{ 
                    x: ['-100%', '100%']
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Contact for Custom Quote
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleExternalLink(EXTERNAL_URLS.shopAll)}
                className="group relative bg-gradient-to-br from-gray-900/50 via-black/50 to-gray-900/50 backdrop-blur-lg border border-white/20 text-white px-6 py-3 rounded-xl text-sm font-medium hover:border-purple-500/40 transition-all duration-300 w-full max-w-xs md:w-auto"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Car className="w-4 h-4" />
                  Browse All Seats
                </span>
              </motion.button>
            </div>
          </div>
        </motion.section>
      </div>

      {/* UPDATED FOOTER - Fixed Mobile Layout */}
      <footer className="bg-gradient-to-b from-black via-gray-950 to-gray-900 border-t border-white/10 pt-12 md:pt-16 pb-8 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 20% 80%, rgba(147, 51, 234, 0.3) 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.2) 0%, transparent 50%)`,
          }} />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4">
          {/* Footer Top Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
            {/* Brand Column */}
            <div className="space-y-4">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 group"
              >
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="relative"
                >
                  <div className="relative w-10 h-10 bg-gradient-to-br from-purple-600 via-blue-500 to-cyan-400 rounded-lg flex items-center justify-center shadow-lg">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">NOVALUX</h3>
                  <p className="text-xs text-gray-400 tracking-wider mt-0.5">PREMIUM SEATING</p>
                </div>
              </motion.div>
              
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
                className="text-gray-400 text-sm leading-relaxed"
              >
                Engineered for real travel. Premium van seating solutions built for comfort, safety, and versatility.
              </motion.p>
              
              {/* Social Media Icons */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
                className="flex gap-3 pt-4"
              >
                {[
                  { icon: <Instagram className="w-4 h-4" />, color: "hover:text-pink-400" },
                  { icon: <Facebook className="w-4 h-4" />, color: "hover:text-blue-400" },
                  { icon: <Twitter className="w-4 h-4" />, color: "hover:text-sky-400" },
                  { icon: <Youtube className="w-4 h-4" />, color: "hover:text-red-400" },
                  { icon: <Linkedin className="w-4 h-4" />, color: "hover:text-blue-500" }
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-2 rounded-lg bg-gradient-to-br from-gray-900/50 to-black/50 border border-white/10 text-gray-400 ${social.color} hover:border-purple-500/30 transition-all duration-300`}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </motion.div>
            </div>
            
            {/* Quick Links */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-base font-bold text-white mb-4 uppercase tracking-wider">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  { label: "Home", href: "#" },
                  { label: "Products", href: EXTERNAL_URLS.shopAll },
                  { label: "About Us", href: EXTERNAL_URLS.aboutUs },
                  { label: "Installation Guide", href: EXTERNAL_URLS.installationGuide },
                  { label: "FAQ", href: EXTERNAL_URLS.faq },
                  { label: "Blog", href: EXTERNAL_URLS.blog }
                ].map((link, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <a 
                      href={link.href}
                      onClick={(e) => {
                        if (link.href !== "#") {
                          e.preventDefault();
                          handleExternalLink(link.href);
                        }
                      }}
                      className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                    >
                      <motion.div 
                        className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
                        whileHover={{ scale: 1.5 }}
                      />
                      {link.label}
                      <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            {/* Support */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-base font-bold text-white mb-4 uppercase tracking-wider">Support</h4>
              <ul className="space-y-3">
                {[
                  { label: "Contact Us", href: EXTERNAL_URLS.contact },
                  { label: "Shipping Info", href: "#" },
                  { label: "Returns & Exchanges", href: EXTERNAL_URLS.returnPolicy },
                  { label: "Warranty Information", href: "#" },
                  { label: "Installation Services", href: "#" },
                  { label: "Product Care", href: "#" }
                ].map((link, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + index * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <a 
                      href={link.href}
                      onClick={(e) => {
                        if (link.href !== "#") {
                          e.preventDefault();
                          handleExternalLink(link.href);
                        }
                      }}
                      className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                    >
                      <motion.div 
                        className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
                        whileHover={{ scale: 1.5 }}
                      />
                      {link.label}
                      <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
            
            {/* Contact Info */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h4 className="text-base font-bold text-white mb-4 uppercase tracking-wider">Contact Info</h4>
              
              <div className="space-y-3">
                <motion.div 
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3 group"
                >
                  <div className="p-2 rounded-lg bg-gradient-to-br from-purple-600/20 to-blue-600/20 border border-purple-500/30 group-hover:border-purple-500/50 transition-colors">
                    <MapPin className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">Location</div>
                    <div className="text-gray-400 text-sm">Big Bear City, California</div>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.45 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3 group"
                >
                  <div className="p-2 rounded-lg bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-500/30 group-hover:border-blue-500/50 transition-colors">
                    <Phone className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">Phone</div>
                    <div className="text-gray-400 text-sm">+1 (951) 441-9719</div>
                  </div>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3 group"
                >
                  <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-600/20 to-teal-600/20 border border-cyan-500/30 group-hover:border-cyan-500/50 transition-colors">
                    <Mail className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">Email</div>
                    <div className="text-gray-400 text-sm">help.vankea@gmail.com</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
          
          {/* Newsletter Section - Fixed Mobile Width */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-6">
                <h4 className="text-lg font-bold text-white mb-2">Stay Updated</h4>
                <p className="text-gray-400 text-sm px-2">Subscribe to our newsletter for exclusive updates and offers</p>
              </div>
              
              <form onSubmit={handleEmailSubmit} className="relative px-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-5 py-3.5 bg-gradient-to-br from-gray-900/50 to-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/20 backdrop-blur-sm"
                    required
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-2 rounded-lg text-sm font-bold"
                  >
                    Subscribe
                  </motion.button>
                </div>
                {emailSubmitted && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-emerald-400 text-sm mt-3 text-center"
                  >
                    Thank you for subscribing to NovaLux updates!
                  </motion.p>
                )}
              </form>
            </div>
          </motion.div>
          
          {/* Payment Methods */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="text-center mb-4">
              <p className="text-gray-400 text-sm">We Accept</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {["Visa", "MasterCard", "PayPal", "Apple Pay"].map((method, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="px-3 py-1.5 bg-gradient-to-br from-gray-900/30 to-black/30 border border-white/10 rounded-lg hover:border-purple-500/30 transition-colors"
                >
                  <span className="text-gray-400 text-sm font-medium">{method}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* Footer Bottom */}
          <div className="pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              {/* Copyright */}
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-center md:text-left"
              >
                <div className="text-gray-400 text-sm">
                  <p>© 2024 NovaLux Premium Seating. All rights reserved.</p>
                  <p className="mt-1 text-xs text-gray-500">Engineered for real travel</p>
                </div>
              </motion.div>
              
              {/* Legal Links */}
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="flex flex-wrap justify-center gap-4 text-sm text-gray-400"
              >
                {[
                  { label: "Terms of Service", href: EXTERNAL_URLS.terms },
                  { label: "Privacy Policy", href: EXTERNAL_URLS.privacy },
                  { label: "Return Policy", href: EXTERNAL_URLS.returnPolicy }
                ].map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleExternalLink(link.href);
                    }}
                    className="hover:text-white transition-colors"
                    whileHover={{ y: -2 }}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </motion.div>
            </div>
            
            {/* Back to Top */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mt-6"
            >
              <motion.button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors text-sm"
              >
                <ChevronUp className="w-4 h-4" />
                Back to Top
              </motion.button>
            </motion.div>
          </div>
        </div>
        
        {/* Decorative Element */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </footer>

      {/* Product Detail Modal */}
      <AnimatePresence>
        {showProductModal && selectedProduct && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeProductModal}
              className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-lg"
            />
            
            {/* Modal - Fixed Mobile Width */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[101] w-[calc(100%-2rem)] max-w-3xl max-h-[90vh] overflow-y-auto mx-4"
            >
              <div className="bg-gradient-to-b from-gray-900 via-black to-gray-900 rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="relative p-6 border-b border-white/10 bg-gradient-to-r from-purple-900/20 via-black/40 to-blue-900/20">
                  <div className="flex items-center justify-between mb-4">
                    <motion.div 
                      className={`p-3 rounded-xl bg-gradient-to-br ${selectedProduct.gradient} border border-white/10`}
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {selectedProduct.icon}
                    </motion.div>
                    <motion.button
                      onClick={closeProductModal}
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 rounded-lg bg-gradient-to-br from-gray-900/50 to-black/50 border border-white/10 hover:border-red-500/30 transition-all"
                    >
                      <X className="w-4 h-4" />
                    </motion.button>
                  </div>
                  
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2">
                    {selectedProduct.title}
                  </h2>
                  <p className="text-gray-300 text-sm">
                    {selectedProduct.description}
                  </p>
                </div>
                
                {/* Content */}
                <div className="p-4 md:p-6">
                  {/* Detailed Description */}
                  <div className="mb-8">
                    <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-purple-400" />
                      Detailed Overview
                    </h3>
                    <p className="text-gray-300 leading-relaxed text-sm">
                      {selectedProduct.detailedDescription}
                    </p>
                  </div>
                  
                  {/* Key Features */}
                  <div className="mb-8">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      Key Features
                    </h3>
                    <div className="grid md:grid-cols-2 gap-3">
                      {selectedProduct.keyFeatures.map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="p-3 bg-gradient-to-br from-gray-900/30 to-black/30 rounded-lg border border-white/10 hover:border-purple-500/30 transition-all"
                        >
                          <div className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 mt-1.5 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex-shrink-0" />
                            <span className="text-gray-300 text-sm">{feature}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Specifications */}
                  <div className="mb-8">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <Award className="w-4 h-4 text-amber-400" />
                      Specifications
                    </h3>
                    <div className="space-y-3">
                      {selectedProduct.specs.map((spec, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-center justify-between p-3 bg-gradient-to-br from-gray-900/20 to-black/20 rounded-lg border border-white/10"
                        >
                          <span className="text-gray-400 text-sm">{spec}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  
                  {/* CTA - Fixed Mobile Buttons */}
                  <div className="pt-6 border-t border-white/10">
                    <div className="flex flex-col md:flex-row gap-4">
                      <motion.button
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleExternalLink(EXTERNAL_URLS.contact)}
                        className="flex-1 bg-gradient-to-r from-purple-600 to-blue-500 text-white px-4 py-3 rounded-xl text-sm font-bold hover:shadow-[0_0_20px_rgba(147,51,234,0.3)] transition-all duration-300"
                      >
                        <span className="flex items-center justify-center gap-2">
                          <Phone className="w-4 h-4" />
                          Contact for Pricing
                        </span>
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleExternalLink(EXTERNAL_URLS.shopAll)}
                        className="flex-1 bg-gradient-to-br from-gray-900/50 via-black/50 to-gray-900/50 backdrop-blur-lg border border-white/20 text-white px-4 py-3 rounded-xl text-sm font-medium hover:border-purple-500/40 transition-all duration-300"
                      >
                        <span className="flex items-center justify-center gap-2">
                          <ShoppingCart className="w-4 h-4" />
                          View Collection
                        </span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Custom Styles */}
      <style jsx global>{`
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(30, 30, 30, 0.5);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #a855f7 0%, #3b82f6 100%);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #9333ea 0%, #1d4ed8 100%);
        }
        
        /* Hide scrollbar for Chrome, Safari and Opera */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        /* Hide scrollbar for IE, Edge and Firefox */
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        /* Gradient text animation */
        .gradient-text {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        /* Line clamp utilities */
        .line-clamp-1 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
        }
        
        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        
        .line-clamp-3 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
        }
        
        /* Mobile optimizations */
        @media (max-width: 640px) {
          .text-balance {
            text-wrap: balance;
          }
          
          /* Fix mobile layout issues */
          .max-w-6xl {
            padding-left: 0.75rem;
            padding-right: 0.75rem;
          }
          
          /* Improve button sizes on mobile */
          button {
            min-height: 44px;
            min-width: 44px;
          }
          
          /* Improve touch targets */
          .touch-target {
            min-height: 48px;
            min-width: 48px;
          }
          
          /* Better text sizes for mobile */
          h1 {
            font-size: 2rem !important;
          }
          
          h2 {
            font-size: 1.5rem !important;
          }
          
          h3 {
            font-size: 1.25rem !important;
          }
          
          p, span {
            font-size: 14px !important;
          }
          
          /* Grid improvements */
          .grid {
            gap: 1rem;
          }
          
          /* Modal improvements */
          .modal-content {
            margin: 1rem;
            max-height: calc(100vh - 2rem);
          }
          
          /* Prevent content cutoff */
          body {
            overflow-x: hidden;
            width: 100%;
          }
          
          /* Fix button widths */
          .w-full.max-w-xs {
            max-width: 320px;
          }
        }
        
        /* Better focus styles for accessibility */
        *:focus-visible {
          outline: 2px solid rgba(147, 51, 234, 0.5);
          outline-offset: 2px;
        }
        
        /* Smooth transitions */
        * {
          transition: background-color 0.3s ease, border-color 0.3s ease;
        }
        
        /* Prevent horizontal overflow */
        body {
          overflow-x: hidden;
          width: 100%;
          position: relative;
        }
        
        /* Improve video loading */
        video {
          will-change: transform;
        }
        
        /* Mobile touch improvements */
        @media (hover: none) {
          .hover-effect {
            transform: none !important;
          }
        }
        
        /* Fix container widths on mobile */
        @media (max-width: 640px) {
          .px-3 {
            padding-left: 0.75rem;
            padding-right: 0.75rem;
          }
          
          .px-4 {
            padding-left: 1rem;
            padding-right: 1rem;
          }
          
          /* Ensure buttons don't overflow */
          button, .btn {
            max-width: 100%;
            white-space: normal;
          }
        }
      `}</style>
    </div>
  );
}