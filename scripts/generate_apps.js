import fs from 'fs';
import path from 'path';

// Helper to create beautiful SVGs
function createSvgIcon({
  bgStart = '#0f172a',
  bgEnd = '#020617',
  accentStart = '#3b82f6',
  accentEnd = '#8b5cf6',
  borderColor = '#334155',
  symbolSvg = '',
  title = '',
  subtitle = ''
}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${bgStart}" />
      <stop offset="100%" stop-color="${bgEnd}" />
    </linearGradient>
    <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${accentStart}" />
      <stop offset="100%" stop-color="${accentEnd}" />
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="${accentStart}" flood-opacity="0.35"/>
    </filter>
  </defs>

  <!-- Rounded Base Canvas -->
  <rect width="512" height="512" rx="112" fill="url(#bgGrad)"/>
  <rect width="504" height="504" x="4" y="4" rx="108" fill="none" stroke="${borderColor}" stroke-width="4"/>

  <!-- Symbol Art with Glow -->
  <g filter="url(#glow)">
    ${symbolSvg}
  </g>

  <!-- Title Badge Bottom -->
  ${title ? `
  <rect x="76" y="416" width="360" height="58" rx="16" fill="#090d16" stroke="${accentStart}" stroke-width="2.5" opacity="0.95"/>
  <text x="256" y="453" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="800" fill="#ffffff" text-anchor="middle" letter-spacing="2">${title}</text>
  ` : ''}
</svg>`;
}

const appsData = [
  {
    id: "vishlink",
    name: "VishLink",
    tagline: "Interactive 3D birthday cake, fireworks & secret notes",
    category: "Celebration",
    icon: "/apps/vishlink/icon.png",
    url: "https://vishlink.vercel.app/",
    github: "https://github.com/Kunal18sm/VishLink",
    description: `VishLink is a personalized wishing and celebration web application.

Create interactive 3D virtual birthday experiences with customizable cake cutting, fireworks, background songs, animated photo memories, secret love notes, and unique shareable links for special occasions.`,
    screenshots: [
      "/apps/vishlink/preview1.png",
      "/apps/vishlink/preview2.png",
      "/apps/vishlink/preview3.png"
    ]
  },
  {
    id: "ometrain",
    name: "OmeTrain",
    tagline: "Real-time anonymous 3D train messaging & photos",
    category: "Games",
    icon: "/apps/ometrain/icon.png",
    url: "https://ometrain.onrender.com/",
    github: "https://github.com/Kunal18sm",
    description: `OmeTrain is an interactive real-time anonymous train messaging platform.

Board 3D virtual express trains, meet new people, share photos, and send anonymous messages in real-time while traveling along virtual routes around the world.`,
    screenshots: [
      "/apps/ometrain/preview1.png",
      "/apps/ometrain/preview2.png",
      "/apps/ometrain/preview3.png"
    ]
  },
  {
    id: "jungle-escape-3d",
    name: "Jungle Escape 3D",
    tagline: "3D night jungle adventure map, obstacle missions & waterfall escape",
    category: "Games",
    icon: "/apps/junglegame/icon.svg",
    url: "https://kunal18sm.github.io/game/",
    github: "https://github.com/Kunal18sm/game",
    description: `Jungle Escape 3D is an immersive in-browser 3D adventure game.

Navigate through an interactive 3D night jungle map, leap across hazardous terrains, avoid dangerous wildlife obstacles, collect boost power-ups, and conquer missions to escape to the waterfall.`,
    screenshots: [
      "/apps/junglegame/preview1.png",
      "/apps/junglegame/preview2.png",
      "/apps/junglegame/preview3.png"
    ]
  },
  {
    id: "ultimate-pdf",
    name: "Ultimate PDF",
    tagline: "In-browser PDF reader, annotator, stamps & editor tool",
    category: "Tools",
    icon: "/apps/ultimatepdf/icon.svg",
    url: "https://ultimate-pdf-viewer.vercel.app/",
    github: "https://github.com/Kunal18sm/Ultimate-PDF-viewer",
    description: `Ultimate PDF is a powerful, client-side PDF viewer and editor web application.

Annotate, highlight, stamp, sign, reorder, manage, and export PDF documents directly in the browser with high performance and complete data privacy.`,
    screenshots: [
      "/apps/ultimatepdf/preview1.png",
      "/apps/ultimatepdf/preview2.png"
    ]
  },
  {
    id: "campus-beast",
    name: "CampusBeast",
    tagline: "College innovation, campus projects & student social platform",
    category: "Creative",
    icon: "/apps/campusbeast/icon.png",
    url: "https://campus-beast.vercel.app/",
    github: "https://github.com/Kunal18sm",
    description: `CampusBeast is a modern student network and college innovation platform.

Share ideas, showcase university projects, discover campus tech events, connect with fellow student innovators, and build your digital college legacy.`,
    screenshots: [
      "/apps/campusbeast/preview1.png",
      "/apps/campusbeast/preview2.png"
    ]
  },
  {
    id: "kaamsaathi",
    name: "KaamSaathi (SevaSetu)",
    tagline: "Cooperative local services, technician booking & fair worker platform",
    category: "Utilities",
    icon: "/apps/kaamsaathi/icon.svg",
    url: "https://kaamsathi-eight.vercel.app",
    github: "https://github.com/Kunal18sm/KaamSaathi",
    description: `KaamSaathi (SevaSetu) is a cooperative-first local services platform connecting customers directly with technicians and skilled service workers.

Features transparent pricing, technician assignment alerts, real-time job acceptance, material billing, and welfare tracking for community service cooperatives.`,
    screenshots: [
      "/apps/kaamsaathi/icon.svg"
    ]
  },
  {
    id: "mohitomart",
    name: "MohitoMart",
    tagline: "Modern full-stack e-commerce storefront & marketplace",
    category: "Tools",
    icon: "/apps/mohitomart/icon.svg",
    url: "https://mohito-mart-frontend.vercel.app",
    github: "https://github.com/Kunal18sm/MohitoMart",
    description: `MohitoMart is a full-featured modern online store with lightning fast product search, category browsing, shopping cart state management, and seamless order checkout workflows.`,
    screenshots: [
      "/apps/mohitomart/icon.svg"
    ]
  },
  {
    id: "studyplay",
    name: "StudyPlay PRO",
    tagline: "Smart YouTube playlist study & daily target pacing hub",
    category: "Tools",
    icon: "/apps/studyplay/icon.svg",
    url: "https://studyplay-omega.vercel.app",
    github: "https://github.com/Kunal18sm/StudyPlay",
    description: `StudyPlay PRO is a dedicated dark-themed web platform for systematic studying through YouTube playlists.

Features automatic playlist metadata detection, video duration calculations, daily completion pace targets, and 100% zero-server browser LocalStorage persistence.`,
    screenshots: [
      "/apps/studyplay/icon.svg"
    ]
  },
  {
    id: "youtube-transcript",
    name: "YouTube Transcript Pro",
    tagline: "Instant YouTube video transcript generator with clickable timestamps",
    category: "Tools",
    icon: "/apps/youtubetranscript/icon.svg",
    url: "https://youtube-transcript-rouge.vercel.app",
    github: "https://github.com/Kunal18sm/Youtube-Transcript",
    description: `YouTube Transcript Pro is a super-fast transcript extractor capable of parsing 2 to 5 hour long video transcripts in seconds.

Offers interactive timeline view, clickable timestamps that seek YouTube playback directly, searchable text, and one-click export.`,
    screenshots: [
      "/apps/youtubetranscript/icon.svg"
    ]
  },
  {
    id: "dsa-visualizer",
    name: "DSA Visualizer",
    tagline: "Interactive Data Structures & Algorithms visualizer with C++ simulations",
    category: "Tools",
    icon: "/apps/dsavisualizer/icon.svg",
    url: "https://dsa-visualizer-sable.vercel.app/",
    github: "https://github.com/Kunal18sm/DSA-Visualizer",
    description: `Interactive open-source web platform that visualizes Data Structures and Algorithms through real-time step-by-step animations and side-by-side C++ code implementations.

Helps developers and students intuitively master sorting, graphs, trees, and pathfinding logic through color-coded simulations.`,
    screenshots: [
      "/apps/dsavisualizer/icon.svg"
    ]
  },
  {
    id: "realtime-chatapp",
    name: "Realtime Chatapp",
    tagline: "Instant messaging & image sharing with 32+ DaisyUI themes",
    category: "Creative",
    icon: "/apps/realtimechatapp/icon.svg",
    url: "https://realtime-chatapp-seven.vercel.app",
    github: "https://github.com/Kunal18sm/Realtime-Chatapp",
    description: `Full-stack real-time chat application built with MERN stack, Socket.io, JWT authentication, instant online status indicators, image sharing, and over 32 customizable themes.`,
    screenshots: [
      "/apps/realtimechatapp/icon.svg"
    ]
  },
  {
    id: "jgec-gym-bros",
    name: "JGEC Gym Bros",
    tagline: "College gym community portal, workouts & fitness tracker",
    category: "Utilities",
    icon: "/apps/jgecgym/icon.svg",
    url: "https://jgec-gym-bros.vercel.app",
    github: "https://github.com/Kunal18sm/JGEC_GYM_BROS",
    description: `A college fitness and gym management web application built for students and gym-goers to organize workout regimens, track personal bests, and build campus camaraderie.`,
    screenshots: [
      "/apps/jgecgym/icon.svg"
    ]
  },
  {
    id: "skill-route",
    name: "Skill-Route",
    tagline: "Developer career roadmap & skill pathway navigator",
    category: "Tools",
    icon: "/apps/skillroute/icon.svg",
    url: "https://sage-crumble-177299.netlify.app/",
    github: "https://github.com/Kunal18sm/Skill-Route",
    description: `Skill-Route maps out clear, step-by-step learning journeys for budding developers and engineering students across frontend, backend, AI, and DevOps specializations.`,
    screenshots: [
      "/apps/skillroute/icon.svg"
    ]
  },
  {
    id: "sunset",
    name: "Sunset Ambient Canvas",
    tagline: "Aesthetic interactive sunset visualizer & relaxing ambient canvas",
    category: "Creative",
    icon: "/apps/sunset/icon.svg",
    url: "https://kunal18sm.github.io/sunset/",
    github: "https://github.com/Kunal18sm/sunset",
    description: `An artistic interactive web experience replicating golden hour sunlight, dynamic horizon gradients, and atmospheric lighting using pure HTML5 Canvas and CSS animations.`,
    screenshots: [
      "/apps/sunset/icon.svg"
    ]
  },
  {
    id: "quizee",
    name: "Quizee Microlearning",
    tagline: "Intelligent daily exam target mastery & spaced repetition quiz",
    category: "Tools",
    icon: "/apps/quizee/icon.svg",
    url: "https://kunal18sm.github.io/Quizee/",
    github: "https://github.com/Kunal18sm/Quizee",
    description: `Quizee is an intelligent microlearning system designed for exam prep (SSC CGL, CHSL, Railways).

Features structured daily target question banks (20-30 questions), sequential curriculum progression, and mistake-priority spaced repetition algorithms.`,
    screenshots: [
      "/apps/quizee/icon.svg"
    ]
  },
  {
    id: "ssc-shorts",
    name: "SSC Shorts",
    tagline: "Distraction-free exam study feed with curated concept shorts",
    category: "Utilities",
    icon: "/apps/sscshorts/icon.svg",
    url: "https://kunal18sm.github.io/SSC-Shorts/",
    github: "https://github.com/Kunal18sm/SSC-Shorts",
    description: `A fast, minimalist, and distraction-free Progressive Web App (PWA) designed for competitive exam aspirants.

Delivers curated short-form vertical lessons covering Maths calculation shortcuts, Reasoning figure counting tricks, and English grammar rules without endless social media distractions.`,
    screenshots: [
      "/apps/sscshorts/icon.svg"
    ]
  },
  {
    id: "portfolio",
    name: "Kunal.Dev Portfolio",
    tagline: "Official personal developer portfolio & MERN creations",
    category: "Creative",
    icon: "/apps/portfolio/icon.svg",
    url: "https://kunal18sm.github.io/Portfolio/",
    github: "https://github.com/Kunal18sm/Portfolio",
    description: `Official personal portfolio website of Kunal, highlighting full-stack MERN stack developments, interactive web experiences, algorithmic visualizers, and contact channels.`,
    screenshots: [
      "/apps/portfolio/icon.svg"
    ]
  },
  {
    id: "wonderlust",
    name: "WonderLust Stays",
    tagline: "Full-stack vacation rental marketplace & travel booking platform",
    category: "Creative",
    icon: "/apps/wonderlust/icon.svg",
    url: "https://github.com/Kunal18sm/WonderLust-airbnb",
    github: "https://github.com/Kunal18sm/WonderLust-airbnb",
    description: `Full-stack vacation rental platform inspired by Airbnb.

Built with Express, Node.js, MongoDB, and EJS. Includes listing creation with image uploads, interactive location maps, user reviews, booking authentication, and secure session management.`,
    screenshots: [
      "/apps/wonderlust/icon.svg"
    ]
  },
  {
    id: "mygpt",
    name: "myGPT Assistant",
    tagline: "Custom AI conversation interface & chatbot assistant",
    category: "Tools",
    icon: "/apps/mygpt/icon.svg",
    url: "https://github.com/Kunal18sm/myGPT",
    github: "https://github.com/Kunal18sm/myGPT",
    description: `A personal full-stack generative AI chat application with custom prompting, markdown rendering, message history persistence, and responsive mobile-first UI.`,
    screenshots: [
      "/apps/mygpt/icon.svg"
    ]
  },
  {
    id: "game90",
    name: "Game90 3D City",
    tagline: "Multiplayer 3D city browser game with real-time Socket.io sync",
    category: "Games",
    icon: "/apps/game90/icon.svg",
    url: "https://github.com/Kunal18sm/Game90",
    github: "https://github.com/Kunal18sm/Game90",
    description: `Multiplayer 3D city browser game with Three.js rendering on the React + Vite frontend and an Express + Socket.IO backend for real-time player movement and multiplayer synchronization.`,
    screenshots: [
      "/apps/game90/icon.svg"
    ]
  },
  {
    id: "vishlinkgames",
    name: "Vishlink Dilemma",
    tagline: "2-player real-time psychological trust dilemma & deception game",
    category: "Games",
    icon: "/apps/vishlinkgames/icon.svg",
    url: "https://github.com/Kunal18sm/VishlinkGames",
    github: "https://github.com/Kunal18sm/VishlinkGames",
    description: `Two-player deceptive trust game built with Node.js, Express, Socket.IO, and MongoDB. Players enter room codes, make split-second cooperative decisions, and discover truth-board revelations.`,
    screenshots: [
      "/apps/vishlinkgames/icon.svg"
    ]
  },
  {
    id: "securepro",
    name: "SecurePro Shield",
    tagline: "Modern client-side authentication & security dashboard",
    category: "Utilities",
    icon: "/apps/securepro/icon.svg",
    url: "https://github.com/Kunal18sm/SecurePro",
    github: "https://github.com/Kunal18sm/SecurePro",
    description: `Comprehensive authentication and user security management dashboard built with React, Vite, and Tailwind CSS. Demonstrates role-based access, token management, and modern UX patterns.`,
    screenshots: [
      "/apps/securepro/icon.svg"
    ]
  },
  {
    id: "miniprojects",
    name: "Mini Projects Hub",
    tagline: "Creative frontend mini-apps & interactive UI widgets",
    category: "Creative",
    icon: "/apps/miniprojects/icon.svg",
    url: "https://kunal18sm.github.io/Mini_PROJECTS/",
    github: "https://github.com/Kunal18sm/Mini_PROJECTS",
    description: `Curated assortment of creative HTML/CSS/JavaScript interactive micro-applications, CSS animation experiments, calculators, and UI prototypes.`,
    screenshots: [
      "/apps/miniprojects/icon.svg"
    ]
  },
  {
    id: "miniwebsites",
    name: "Mini Websites Showcase",
    tagline: "Curated standalone web experiments & HTML5 landing pages",
    category: "Creative",
    icon: "/apps/miniwebsites/icon.svg",
    url: "https://kunal18sm.github.io/mini-websites/",
    github: "https://github.com/Kunal18sm/mini-websites",
    description: `Collection of standalone landing pages, microsites, and design explorations crafted to test creative layouts, typography, and responsive grid structures.`,
    screenshots: [
      "/apps/miniwebsites/icon.svg"
    ]
  },
  {
    id: "reactpractice",
    name: "React Pattern Practice",
    tagline: "Practical React patterns, hooks & UI engineering exercises",
    category: "Tools",
    icon: "/apps/reactpractice/icon.svg",
    url: "https://github.com/Kunal18sm/react-practice",
    github: "https://github.com/Kunal18sm/react-practice",
    description: `Collection of focused mini-projects created to master modern React fundamentals, custom hooks, state machines, and real-world UI design patterns.`,
    screenshots: [
      "/apps/reactpractice/icon.svg"
    ]
  },
  {
    id: "wish-link",
    name: "WishLink Classic",
    tagline: "Personalized greeting link engine for festive celebrations",
    category: "Celebration",
    icon: "/apps/wishlink/icon.svg",
    url: "https://github.com/Kunal18sm/wish-link",
    github: "https://github.com/Kunal18sm/wish-link",
    description: `Original dynamic celebratory greeting generator built with EJS and Node.js. Allows users to craft custom personalized wishes and share instant links with loved ones.`,
    screenshots: [
      "/apps/wishlink/icon.svg"
    ]
  },
  {
    id: "jarvis",
    name: "Jarvis AI Assistant",
    tagline: "Advanced AI computer control model & automation interface",
    category: "Tools",
    icon: "/apps/jarvis/icon.svg",
    url: "https://github.com/Kunal18sm/Jarvis",
    github: "https://github.com/Kunal18sm/Jarvis",
    description: `Advanced automation model and intelligent assistant designed to orchestrate system operations, voice commands, and automated task execution.`,
    screenshots: [
      "/apps/jarvis/icon.svg"
    ]
  },
  {
    id: "ecommerce",
    name: "Java E-Commerce Core",
    tagline: "Enterprise Java e-commerce backend & inventory architecture",
    category: "Tools",
    icon: "/apps/ecommerce/icon.svg",
    url: "https://github.com/Kunal18sm/e-commerce",
    github: "https://github.com/Kunal18sm/e-commerce",
    description: `Enterprise-grade Java backend architecture supporting shopping carts, inventory tracking, secure payments, order processing, and customer accounts.`,
    screenshots: [
      "/apps/ecommerce/icon.svg"
    ]
  },
  {
    id: "cglprep",
    name: "CGL 2026 Roadmap",
    tagline: "Target planner, study schedule & syllabus tracker",
    category: "Utilities",
    icon: "/apps/cglprep/icon.svg",
    url: "https://github.com/Kunal18sm/CGL2026",
    github: "https://github.com/Kunal18sm/CGL2026",
    description: `Target planner and syllabus tracker designed in Python for SSC CGL 2026 preparation, featuring subject weightage breakdowns and daily revision tracking.`,
    screenshots: [
      "/apps/cglprep/icon.svg"
    ]
  },
  {
    id: "nodejs-assignment",
    name: "Node.js Backend Lab",
    tagline: "RESTful API services, authentication & middleware pipeline",
    category: "Tools",
    icon: "/apps/nodejslab/icon.svg",
    url: "https://github.com/Kunal18sm/Node-JS-Assignment",
    github: "https://github.com/Kunal18sm/Node-JS-Assignment",
    description: `Comprehensive Node.js and Express backend architecture showcasing REST API conventions, JWT authentication, schema validation, and database operations.`,
    screenshots: [
      "/apps/nodejslab/icon.svg"
    ]
  }
];

// SVG Icon definitions for each app
const iconConfigs = {
  kaamsaathi: {
    bgStart: "#022c22",
    bgEnd: "#064e3b",
    accentStart: "#10b981",
    accentEnd: "#34d399",
    borderColor: "#059669",
    title: "KAAM SAATHI",
    symbolSvg: `
      <!-- Tool & handshake illustration -->
      <circle cx="256" cy="230" r="110" fill="#065f46" stroke="#10b981" stroke-width="6"/>
      <path d="M190 270 L240 210 L270 240 L320 180" fill="none" stroke="#6ee7b7" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="190" cy="270" r="14" fill="#34d399"/>
      <circle cx="240" cy="210" r="14" fill="#34d399"/>
      <circle cx="270" cy="240" r="14" fill="#34d399"/>
      <circle cx="320" cy="180" r="14" fill="#34d399"/>
      <rect x="236" y="290" width="40" height="60" rx="10" fill="#10b981"/>
      <path d="M216 320 L296 320" stroke="#064e3b" stroke-width="8" stroke-linecap="round"/>
    `
  },
  mohitomart: {
    bgStart: "#1e1b4b",
    bgEnd: "#0f172a",
    accentStart: "#6366f1",
    accentEnd: "#ec4899",
    borderColor: "#4f46e5",
    title: "MOHITO MART",
    symbolSvg: `
      <!-- Shopping Bag & Cart Symbol -->
      <rect x="176" y="180" width="160" height="180" rx="36" fill="#312e81" stroke="#818cf8" stroke-width="8"/>
      <path d="M216 180 V140 A40 40 0 0 1 296 140 V180" fill="none" stroke="#ec4899" stroke-width="10" stroke-linecap="round"/>
      <circle cx="256" cy="270" r="32" fill="#ec4899"/>
      <path d="M244 270 L254 280 L270 260" fill="none" stroke="#ffffff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
    `
  },
  studyplay: {
    bgStart: "#18181b",
    bgEnd: "#09090b",
    accentStart: "#ef4444",
    accentEnd: "#f97316",
    borderColor: "#dc2626",
    title: "STUDYPLAY PRO",
    symbolSvg: `
      <!-- Graduation cap + Play button -->
      <polygon points="256,120 380,180 256,240 132,180" fill="#ef4444" stroke="#fca5a5" stroke-width="4"/>
      <polygon points="216,210 216,330 336,270" fill="#ffffff" filter="url(#glow)"/>
      <path d="M380 180 V260" stroke="#f97316" stroke-width="8" stroke-linecap="round"/>
      <circle cx="380" cy="270" r="8" fill="#f97316"/>
    `
  },
  youtubetranscript: {
    bgStart: "#450a0a",
    bgEnd: "#1c1917",
    accentStart: "#f43f5e",
    accentEnd: "#fb7185",
    borderColor: "#e11d48",
    title: "YT TRANSCRIPT",
    symbolSvg: `
      <!-- Video card with text lines -->
      <rect x="146" y="140" width="220" height="230" rx="28" fill="#1e1b4b" stroke="#f43f5e" stroke-width="7"/>
      <polygon points="236,180 236,230 286,205" fill="#f43f5e"/>
      <rect x="180" y="260" width="152" height="12" rx="6" fill="#fda4af"/>
      <rect x="180" y="290" width="120" height="12" rx="6" fill="#fda4af"/>
      <rect x="180" y="320" width="140" height="12" rx="6" fill="#fda4af"/>
    `
  },
  dsavisualizer: {
    bgStart: "#030712",
    bgEnd: "#111827",
    accentStart: "#06b6d4",
    accentEnd: "#3b82f6",
    borderColor: "#0891b2",
    title: "DSA VISUALIZER",
    symbolSvg: `
      <!-- Tree / Graph nodes with animated connection lines -->
      <line x1="256" y1="150" x2="180" y2="240" stroke="#06b6d4" stroke-width="8"/>
      <line x1="256" y1="150" x2="332" y2="240" stroke="#06b6d4" stroke-width="8"/>
      <line x1="180" y1="240" x2="140" y2="330" stroke="#3b82f6" stroke-width="8"/>
      <line x1="180" y1="240" x2="220" y2="330" stroke="#3b82f6" stroke-width="8"/>
      <line x1="332" y1="240" x2="372" y2="330" stroke="#3b82f6" stroke-width="8"/>
      
      <circle cx="256" cy="150" r="32" fill="#0891b2" stroke="#ffffff" stroke-width="4"/>
      <circle cx="180" cy="240" r="28" fill="#0284c7" stroke="#ffffff" stroke-width="4"/>
      <circle cx="332" cy="240" r="28" fill="#0284c7" stroke="#ffffff" stroke-width="4"/>
      <circle cx="140" cy="330" r="24" fill="#2563eb" stroke="#ffffff" stroke-width="4"/>
      <circle cx="220" cy="330" r="24" fill="#2563eb" stroke="#ffffff" stroke-width="4"/>
      <circle cx="372" cy="330" r="24" fill="#2563eb" stroke="#ffffff" stroke-width="4"/>
    `
  },
  realtimechatapp: {
    bgStart: "#1e1b4b",
    bgEnd: "#0f172a",
    accentStart: "#8b5cf6",
    accentEnd: "#d946ef",
    borderColor: "#7c3aed",
    title: "REALTIME CHAT",
    symbolSvg: `
      <!-- Chat bubbles overlapping -->
      <rect x="140" y="150" width="180" height="120" rx="30" fill="#6d28d9" stroke="#c084fc" stroke-width="6"/>
      <circle cx="190" cy="210" r="10" fill="#ffffff"/>
      <circle cx="230" cy="210" r="10" fill="#ffffff"/>
      <circle cx="270" cy="210" r="10" fill="#ffffff"/>
      
      <rect x="210" y="220" width="170" height="110" rx="28" fill="#be185d" stroke="#f472b6" stroke-width="6"/>
      <path d="M250 275 H340" stroke="#ffffff" stroke-width="6" stroke-linecap="round"/>
      <path d="M250 295 H310" stroke="#ffffff" stroke-width="6" stroke-linecap="round"/>
    `
  },
  jgecgym: {
    bgStart: "#18181b",
    bgEnd: "#09090b",
    accentStart: "#f59e0b",
    accentEnd: "#ea580c",
    borderColor: "#d97706",
    title: "JGEC GYM BROS",
    symbolSvg: `
      <!-- Barbell / Muscle badge -->
      <rect x="116" y="244" width="280" height="24" rx="12" fill="#d97706"/>
      <rect x="140" y="190" width="28" height="132" rx="10" fill="#f59e0b" stroke="#78350f" stroke-width="4"/>
      <rect x="168" y="170" width="28" height="172" rx="10" fill="#f59e0b" stroke="#78350f" stroke-width="4"/>
      <rect x="344" y="190" width="28" height="132" rx="10" fill="#f59e0b" stroke="#78350f" stroke-width="4"/>
      <rect x="316" y="170" width="28" height="172" rx="10" fill="#f59e0b" stroke="#78350f" stroke-width="4"/>
      <circle cx="256" cy="256" r="38" fill="#78350f" stroke="#f59e0b" stroke-width="6"/>
      <text x="256" y="266" font-family="system-ui, sans-serif" font-size="28" font-weight="900" fill="#fef3c7" text-anchor="middle">G</text>
    `
  },
  skillroute: {
    bgStart: "#022c22",
    bgEnd: "#020617",
    accentStart: "#14b8a6",
    accentEnd: "#06b6d4",
    borderColor: "#0d9488",
    title: "SKILL ROUTE",
    symbolSvg: `
      <!-- Compass / Map Route -->
      <circle cx="256" cy="240" r="100" fill="#042f2e" stroke="#14b8a6" stroke-width="8"/>
      <polygon points="256,160 286,240 256,230 226,240" fill="#14b8a6"/>
      <polygon points="256,320 286,240 256,250 226,240" fill="#f43f5e"/>
      <circle cx="256" cy="240" r="16" fill="#ffffff"/>
    `
  },
  sunset: {
    bgStart: "#450a0a",
    bgEnd: "#1e1b4b",
    accentStart: "#f97316",
    accentEnd: "#e11d48",
    borderColor: "#ea580c",
    title: "SUNSET CANVAS",
    symbolSvg: `
      <!-- Glowing half sun over horizon & water reflection -->
      <path d="M156 260 A100 100 0 0 1 356 260 Z" fill="#fbbf24"/>
      <line x1="106" y1="264" x2="406" y2="264" stroke="#f97316" stroke-width="8" stroke-linecap="round"/>
      <line x1="136" y1="290" x2="376" y2="290" stroke="#f43f5e" stroke-width="6" stroke-linecap="round"/>
      <line x1="166" y1="316" x2="346" y2="316" stroke="#fb7185" stroke-width="6" stroke-linecap="round"/>
      <line x1="196" y1="340" x2="316" y2="340" stroke="#e11d48" stroke-width="6" stroke-linecap="round"/>
    `
  },
  quizee: {
    bgStart: "#1e1b4b",
    bgEnd: "#090d16",
    accentStart: "#a855f7",
    accentEnd: "#6366f1",
    borderColor: "#9333ea",
    title: "QUIZEE",
    symbolSvg: `
      <!-- Shield with Question mark & checkmark -->
      <polygon points="256,120 370,160 370,270 256,360 142,270 142,160" fill="#581c87" stroke="#c084fc" stroke-width="8"/>
      <text x="256" y="270" font-family="system-ui, sans-serif" font-size="110" font-weight="900" fill="#ffffff" text-anchor="middle">?</text>
    `
  },
  sscshorts: {
    bgStart: "#111827",
    bgEnd: "#030712",
    accentStart: "#eab308",
    accentEnd: "#f97316",
    borderColor: "#ca8a04",
    title: "SSC SHORTS",
    symbolSvg: `
      <!-- Phone shape with play lightning bolt -->
      <rect x="176" y="130" width="160" height="250" rx="32" fill="#1f2937" stroke="#eab308" stroke-width="8"/>
      <polygon points="270,170 220,250 256,250 240,310 294,230 258,230" fill="#facc15"/>
    `
  },
  portfolio: {
    bgStart: "#030712",
    bgEnd: "#0f172a",
    accentStart: "#38bdf8",
    accentEnd: "#818cf8",
    borderColor: "#0284c7",
    title: "KUNAL.DEV",
    symbolSvg: `
      <!-- Code bracket & initials -->
      <path d="M180 200 L120 256 L180 312" fill="none" stroke="#38bdf8" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M332 200 L392 256 L332 312" fill="none" stroke="#38bdf8" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="256" y="280" font-family="system-ui, sans-serif" font-size="76" font-weight="900" fill="#ffffff" text-anchor="middle">K</text>
    `
  },
  wonderlust: {
    bgStart: "#31101e",
    bgEnd: "#0f172a",
    accentStart: "#f43f5e",
    accentEnd: "#fb7185",
    borderColor: "#e11d48",
    title: "WONDERLUST",
    symbolSvg: `
      <!-- Vacation cabin / Tent / Location pin -->
      <path d="M256 130 C190 130 146 180 146 240 C146 310 256 370 256 370 C256 370 366 310 366 240 C366 180 322 130 256 130 Z" fill="#be123c" stroke="#fda4af" stroke-width="6"/>
      <circle cx="256" cy="230" r="36" fill="#ffffff"/>
      <polygon points="256,205 275,245 237,245" fill="#be123c"/>
    `
  },
  mygpt: {
    bgStart: "#022c22",
    bgEnd: "#020617",
    accentStart: "#10b981",
    accentEnd: "#06b6d4",
    borderColor: "#059669",
    title: "MY GPT",
    symbolSvg: `
      <!-- AI Neural Spark / Brain Chat -->
      <circle cx="256" cy="240" r="90" fill="#064e3b" stroke="#34d399" stroke-width="8"/>
      <circle cx="256" cy="240" r="30" fill="#34d399"/>
      <circle cx="206" cy="190" r="16" fill="#6ee7b7"/>
      <circle cx="306" cy="190" r="16" fill="#6ee7b7"/>
      <circle cx="206" cy="290" r="16" fill="#6ee7b7"/>
      <circle cx="306" cy="290" r="16" fill="#6ee7b7"/>
      <line x1="206" y1="190" x2="256" y2="240" stroke="#34d399" stroke-width="6"/>
      <line x1="306" y1="190" x2="256" y2="240" stroke="#34d399" stroke-width="6"/>
      <line x1="206" y1="290" x2="256" y2="240" stroke="#34d399" stroke-width="6"/>
      <line x1="306" y1="290" x2="256" y2="240" stroke="#34d399" stroke-width="6"/>
    `
  },
  game90: {
    bgStart: "#172554",
    bgEnd: "#020617",
    accentStart: "#3b82f6",
    accentEnd: "#60a5fa",
    borderColor: "#2563eb",
    title: "GAME 90 3D",
    symbolSvg: `
      <!-- 3D City Isometric Buildings -->
      <polygon points="256,140 336,186 256,232 176,186" fill="#60a5fa"/>
      <polygon points="176,186 256,232 256,350 176,304" fill="#1d4ed8"/>
      <polygon points="336,186 256,232 256,350 336,304" fill="#2563eb"/>
      <polygon points="256,190 286,206 256,222 226,206" fill="#ffffff"/>
    `
  },
  vishlinkgames: {
    bgStart: "#2e1065",
    bgEnd: "#0f172a",
    accentStart: "#c084fc",
    accentEnd: "#f43f5e",
    borderColor: "#9333ea",
    title: "2PG DILEMMA",
    symbolSvg: `
      <!-- Two face silhouettes / Split mask -->
      <circle cx="216" cy="240" r="70" fill="#581c87" stroke="#c084fc" stroke-width="6"/>
      <circle cx="296" cy="240" r="70" fill="#9f1239" stroke="#fb7185" stroke-width="6"/>
      <path d="M256 170 V310" stroke="#ffffff" stroke-width="6" stroke-dasharray="8 8"/>
    `
  },
  securepro: {
    bgStart: "#042f2e",
    bgEnd: "#0f172a",
    accentStart: "#0d9488",
    accentEnd: "#14b8a6",
    borderColor: "#115e59",
    title: "SECURE PRO",
    symbolSvg: `
      <!-- Padlock inside shield -->
      <path d="M256 120 L370 160 V260 C370 330 256 370 256 370 C256 370 142 330 142 260 V160 Z" fill="#0f766e" stroke="#2dd4bf" stroke-width="8"/>
      <rect x="220" y="240" width="72" height="60" rx="12" fill="#ffffff"/>
      <path d="M232 240 V210 A24 24 0 0 1 280 210 V240" fill="none" stroke="#ffffff" stroke-width="8"/>
    `
  },
  miniprojects: {
    bgStart: "#1e293b",
    bgEnd: "#0f172a",
    accentStart: "#f59e0b",
    accentEnd: "#10b981",
    borderColor: "#475569",
    title: "MINI PROJECTS",
    symbolSvg: `
      <!-- 4 colorful square app tiles -->
      <rect x="160" y="160" width="80" height="80" rx="20" fill="#f59e0b"/>
      <rect x="272" y="160" width="80" height="80" rx="20" fill="#3b82f6"/>
      <rect x="160" y="272" width="80" height="80" rx="20" fill="#10b981"/>
      <rect x="272" y="272" width="80" height="80" rx="20" fill="#ec4899"/>
    `
  },
  miniwebsites: {
    bgStart: "#111827",
    bgEnd: "#030712",
    accentStart: "#38bdf8",
    accentEnd: "#a855f7",
    borderColor: "#374151",
    title: "MINI WEBSITES",
    symbolSvg: `
      <!-- Browser window with webpage layout -->
      <rect x="136" y="140" width="240" height="220" rx="28" fill="#1f2937" stroke="#60a5fa" stroke-width="8"/>
      <circle cx="170" cy="170" r="8" fill="#ef4444"/>
      <circle cx="194" cy="170" r="8" fill="#f59e0b"/>
      <circle cx="218" cy="170" r="8" fill="#10b981"/>
      <rect x="160" y="204" width="192" height="60" rx="12" fill="#3b82f6"/>
      <rect x="160" y="280" width="90" height="50" rx="10" fill="#a855f7"/>
      <rect x="262" y="280" width="90" height="50" rx="10" fill="#10b981"/>
    `
  },
  reactpractice: {
    bgStart: "#082f49",
    bgEnd: "#030712",
    accentStart: "#0ea5e9",
    accentEnd: "#38bdf8",
    borderColor: "#0284c7",
    title: "REACT PATTERNS",
    symbolSvg: `
      <!-- Atom symbol for React -->
      <ellipse cx="256" cy="240" rx="100" ry="40" fill="none" stroke="#38bdf8" stroke-width="8" transform="rotate(0 256 240)"/>
      <ellipse cx="256" cy="240" rx="100" ry="40" fill="none" stroke="#38bdf8" stroke-width="8" transform="rotate(60 256 240)"/>
      <ellipse cx="256" cy="240" rx="100" ry="40" fill="none" stroke="#38bdf8" stroke-width="8" transform="rotate(120 256 240)"/>
      <circle cx="256" cy="240" r="20" fill="#38bdf8"/>
    `
  },
  wishlink: {
    bgStart: "#3b0764",
    bgEnd: "#1e1b4b",
    accentStart: "#d946ef",
    accentEnd: "#ec4899",
    borderColor: "#a21caf",
    title: "WISHLINK",
    symbolSvg: `
      <!-- Gift Box with Ribbon & Stars -->
      <rect x="166" y="200" width="180" height="150" rx="24" fill="#a21caf" stroke="#f472b6" stroke-width="8"/>
      <rect x="150" y="170" width="212" height="40" rx="14" fill="#db2777" stroke="#f472b6" stroke-width="6"/>
      <rect x="244" y="170" width="24" height="180" fill="#fdf2f8"/>
      <circle cx="220" cy="150" r="20" fill="none" stroke="#fdf2f8" stroke-width="8"/>
      <circle cx="292" cy="150" r="20" fill="none" stroke="#fdf2f8" stroke-width="8"/>
    `
  },
  jarvis: {
    bgStart: "#022c22",
    bgEnd: "#020617",
    accentStart: "#06b6d4",
    accentEnd: "#3b82f6",
    borderColor: "#0891b2",
    title: "JARVIS AI",
    symbolSvg: `
      <!-- Arc Reactor / AI core -->
      <circle cx="256" cy="240" r="90" fill="none" stroke="#0891b2" stroke-width="12"/>
      <circle cx="256" cy="240" r="50" fill="#0891b2" stroke="#22d3ee" stroke-width="8"/>
      <circle cx="256" cy="240" r="24" fill="#ffffff"/>
      <line x1="256" y1="130" x2="256" y2="170" stroke="#22d3ee" stroke-width="8"/>
      <line x1="256" y1="310" x2="256" y2="350" stroke="#22d3ee" stroke-width="8"/>
      <line x1="146" y1="240" x2="186" y2="240" stroke="#22d3ee" stroke-width="8"/>
      <line x1="326" y1="240" x2="366" y2="240" stroke="#22d3ee" stroke-width="8"/>
    `
  },
  ecommerce: {
    bgStart: "#14532d",
    bgEnd: "#052e16",
    accentStart: "#22c55e",
    accentEnd: "#4ade80",
    borderColor: "#16a34a",
    title: "E-COMMERCE",
    symbolSvg: `
      <!-- Shopping Cart & Java coffee cup -->
      <path d="M140 170 H180 L216 290 H330 L360 200 H200" fill="none" stroke="#4ade80" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="230" cy="330" r="18" fill="#22c55e"/>
      <circle cx="316" cy="330" r="18" fill="#22c55e"/>
    `
  },
  cglprep: {
    bgStart: "#1f2937",
    bgEnd: "#0f172a",
    accentStart: "#3b82f6",
    accentEnd: "#60a5fa",
    borderColor: "#2563eb",
    title: "CGL 2026",
    symbolSvg: `
      <!-- Target Bullseye & Checkmarks -->
      <circle cx="256" cy="240" r="90" fill="#1e3a8a" stroke="#60a5fa" stroke-width="8"/>
      <circle cx="256" cy="240" r="60" fill="#1d4ed8" stroke="#93c5fd" stroke-width="6"/>
      <circle cx="256" cy="240" r="30" fill="#ffffff"/>
      <polygon points="256,140 270,180 310,180 280,205 290,245 256,220 222,245 232,205 202,180 242,180" fill="#fbbf24"/>
    `
  },
  nodejslab: {
    bgStart: "#052e16",
    bgEnd: "#022c22",
    accentStart: "#22c55e",
    accentEnd: "#15803d",
    borderColor: "#16a34a",
    title: "NODE.JS LAB",
    symbolSvg: `
      <!-- Hexagon Node.js Icon -->
      <polygon points="256,130 350,184 350,292 256,346 162,292 162,184" fill="#15803d" stroke="#86efac" stroke-width="8"/>
      <text x="256" y="270" font-family="system-ui, sans-serif" font-size="76" font-weight="900" fill="#ffffff" text-anchor="middle">JS</text>
    `
  }
};

// 1. Create directory structures and SVGs in public/apps/
for (const [key, cfg] of Object.entries(iconConfigs)) {
  const dirPath = path.join(process.cwd(), 'public', 'apps', key);
  fs.mkdirSync(dirPath, { recursive: true });
  const svg = createSvgIcon(cfg);
  fs.writeFileSync(path.join(dirPath, 'icon.svg'), svg, 'utf8');
}

console.log(`Generated all SVG icons in public/apps/!`);

// 2. Generate appsData.js
const appsDataJs = `/**
 * APPMUSEUM - Categories & Real Websites Data
 * =========================================================================
 * Full collection of personal GitHub repositories & deployed applications
 * Total Projects: ${appsData.length}
 */

export const categoriesList = [
  "All",
  "Celebration",
  "Games",
  "Tools",
  "Utilities",
  "Creative",
  "Other"
];

export const initialApps = ${JSON.stringify(appsData, null, 2)};
`;

fs.writeFileSync(path.join(process.cwd(), 'src', 'data', 'appsData.js'), appsDataJs, 'utf8');
console.log(`Updated src/data/appsData.js with ${appsData.length} projects!`);
