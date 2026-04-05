---
title: "Underground Resistance Visual Style Guide — LCRN-131"
description: "Поэтическая криптография + Cultural seismography + Underground communication visual DNA"
date_created: 2026-04-02
date_updated: 2026-04-02
status: execution_ready
phase: 2A
---

# Underground Resistance Visual Style Guide
**LCRN-131 Phase 2A — Visual Asset Development**

## 🎭 Visual DNA Core Elements

### Поэтическая Криптография
```
ICONOGRAPHY SYSTEM:
├── Cipher Wheels (primary symbol)
├── Stenographic Dots & Dashes
├── Hidden Message Overlays
├── Cultural Code Fragments
└── Resistance Network Nodes
```

### Cultural Seismography Elements
```
DATA VISUALIZATION PATTERNS:
├── Seismic Wave Forms (cultural impact measurement)
├── Network Graph Connections (underground communication)
├── Timeline Pulse Indicators (cultural moments)
├── Signal Detection Patterns (emerging trends)
└── Underground Flow Maps (resistance pathways)
```

## 🎨 Underground Resistance Color Palette

### Primary Palette
```css
:root {
  /* Core Underground Resistance Colors */
  --deep-charcoal: rgb(23, 20, 18);      /* Primary background, shadows */
  --muted-gold: rgb(184, 134, 11);       /* Cipher highlights, key elements */
  --encrypted-blue: rgb(37, 99, 144);    /* Network connections, data flow */
  --samizdat-gray: rgb(82, 76, 67);      /* Secondary text, subtle elements */

  /* Accent & State Colors */
  --cipher-amber: rgba(184, 134, 11, 0.8);  /* Active cipher elements */
  --resistance-teal: rgba(37, 99, 144, 0.6); /* Subtle network highlights */
  --underground-shadow: rgba(23, 20, 18, 0.9); /* Deep overlay effects */
  --coded-whisper: rgba(82, 76, 67, 0.4);   /* Gentle background patterns */
}
```

### Usage Guidelines
```
DEEP CHARCOAL (Primary):
├── Hero background gradients
├── Modal overlays
├── Navigation backgrounds
└── Primary text containers

MUTED GOLD (Accent):
├── Cipher wheel highlights
├── Important CTA buttons
├── Timeline markers
├── Evidence gallery frames
└── Resistance iconography

ENCRYPTED BLUE (Network):
├── Data connection lines
├── Timeline flow indicators
├── Network visualization
├── Link hover states
└── Cultural seismograph traces

SAMIZDAT GRAY (Support):
├── Secondary typography
├── Subtle border elements
├── Background pattern overlays
└── Disabled states
```

## 📝 Typography Hierarchy — Resistance Coded

### Font Stack Strategy
```css
/* Resistance Typography System */
.cipher-text {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  /* For cryptographic elements, code snippets, data */
}

.literature-text {
  font-family: 'Playfair Display', 'Times New Roman', serif;
  /* For poetic content, cultural analysis, narrative */
}

.investigation-text {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  /* For data, evidence, analytical content */
}
```

### Typography Scale
```css
/* Underground Resistance Typography Hierarchy */
.hero-title {
  font-size: clamp(2.5rem, 8vw, 4rem);
  font-family: var(--literature-text);
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--muted-gold);
}

.cipher-header {
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-family: var(--cipher-text);
  font-weight: 500;
  letter-spacing: 0.05em;
  color: var(--encrypted-blue);
}

.investigation-subhead {
  font-size: clamp(1.2rem, 3vw, 1.5rem);
  font-family: var(--investigation-text);
  font-weight: 600;
  color: var(--samizdat-gray);
}

.resistance-body {
  font-size: clamp(1rem, 2vw, 1.125rem);
  font-family: var(--investigation-text);
  line-height: 1.6;
  color: rgb(200, 200, 200);
}

.coded-caption {
  font-size: 0.875rem;
  font-family: var(--cipher-text);
  font-weight: 400;
  color: var(--samizdat-gray);
  letter-spacing: 0.02em;
}
```

## 🔧 Underground Resistance Iconography

### Cipher Wheel System
```html
<!-- Primary Cipher Wheel Icon -->
<svg class="cipher-wheel-icon" viewBox="0 0 100 100">
  <!-- Outer ring with resistance markers -->
  <circle cx="50" cy="50" r="45"
          fill="none"
          stroke="var(--muted-gold)"
          stroke-width="1.5"/>

  <!-- Inner cryptographic pattern -->
  <circle cx="50" cy="50" r="30"
          fill="var(--deep-charcoal)"
          stroke="var(--encrypted-blue)"
          stroke-width="1"/>

  <!-- Resistance markers (12 points) -->
  <g class="resistance-markers">
    <!-- Generate 12 markers around circumference -->
    <line x1="50" y1="5" x2="50" y2="15"
          stroke="var(--muted-gold)"
          stroke-width="1"
          transform="rotate(0 50 50)"/>
    <!-- Additional markers... -->
  </g>

  <!-- Central cipher element -->
  <circle cx="50" cy="50" r="8"
          fill="var(--muted-gold)"/>
</svg>
```

### Underground Network Pattern
```html
<!-- Network Connection Visual -->
<svg class="network-pattern" viewBox="0 0 200 100">
  <!-- Connection nodes -->
  <circle cx="20" cy="50" r="3" fill="var(--encrypted-blue)"/>
  <circle cx="80" cy="30" r="3" fill="var(--muted-gold)"/>
  <circle cx="120" cy="70" r="3" fill="var(--encrypted-blue)"/>
  <circle cx="180" cy="50" r="3" fill="var(--muted-gold)"/>

  <!-- Underground connection lines -->
  <path d="M 20 50 Q 50 20 80 30"
        stroke="var(--resistance-teal)"
        stroke-width="1"
        fill="none"
        stroke-dasharray="2,3"/>
  <path d="M 80 30 Q 100 80 120 70"
        stroke="var(--resistance-teal)"
        stroke-width="1"
        fill="none"
        stroke-dasharray="2,3"/>
  <path d="M 120 70 Q 150 40 180 50"
        stroke="var(--resistance-teal)"
        stroke-width="1"
        fill="none"
        stroke-dasharray="2,3"/>
</svg>
```

### Stenographic Dot Pattern
```css
/* Background stenographic pattern */
.steno-background {
  background-image:
    radial-gradient(circle at 20% 30%, var(--coded-whisper) 1px, transparent 1px),
    radial-gradient(circle at 80% 70%, var(--coded-whisper) 1px, transparent 1px),
    radial-gradient(circle at 40% 80%, var(--coded-whisper) 1px, transparent 1px);
  background-size: 60px 60px, 80px 80px, 100px 100px;
  background-position: 0 0, 30px 30px, 60px 60px;
}
```

## 🎯 Hero Section Composition

### Visual Hierarchy Layout
```
HERO SECTION STRUCTURE:
┌─ Deep Charcoal Background with Stenographic Pattern
│  ┌─ Cipher Wheel Navigation Icon (top-left)
│  ├─ Underground Network Pattern (subtle background)
│  ├─ HERO TITLE: "Организация" (Muted Gold, Literature Typography)
│  ├─ CIPHER SUBHEAD: "Поэтическая криптография культурного сопротивления"
│  │  (Encrypted Blue, Cipher Typography)
│  ├─ INVESTIGATION METADATA: Source attribution & timeline
│  │  (Samizdat Gray, Investigation Typography)
│  └─ RESISTANCE CTA: "Исследовать подпольные связи"
│     (Muted Gold Button with Cipher Wheel Icon)
└─ Cultural Seismograph Trace (bottom edge, subtle animation)
```

### Interactive States
```css
/* Cipher Wheel Hover Animation */
.cipher-wheel-icon:hover {
  transform: rotate(15deg);
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Underground Network Pulse */
@keyframes underground-pulse {
  0%, 100% {
    stroke-opacity: 0.3;
    stroke-width: 1;
  }
  50% {
    stroke-opacity: 0.8;
    stroke-width: 1.5;
  }
}

.network-pattern path {
  animation: underground-pulse 3s ease-in-out infinite;
  animation-delay: var(--pulse-delay, 0s);
}
```

## 📊 Performance Optimization

### CSS Custom Properties Strategy
```css
/* Underground Resistance CSS Architecture */
.resistance-theme {
  /* Color system */
  color-scheme: dark;

  /* Typography system */
  font-display: swap;

  /* Animation preferences */
  --motion-reduce: 0; /* Override with media query */
}

@media (prefers-reduced-motion: reduce) {
  .resistance-theme {
    --motion-reduce: 1;
  }

  .cipher-wheel-icon,
  .network-pattern path {
    animation: none;
    transition: none;
  }
}
```

### Asset Loading Priority
```html
<!-- Critical underground resistance assets -->
<link rel="preload" href="/fonts/jetbrains-mono.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/images/cipher-wheel-hero.webp" as="image">

<!-- Progressive enhancement -->
<link rel="modulepreload" href="/js/underground-resistance-animations.js">
```

## 🔐 Brand Integration Guidelines

### FolkUp Brand Harmony
```
UNDERGROUND RESISTANCE + FOLKUP BRAND:
├── Maintain FolkUp logo prominence (header/footer)
├── Use muted gold as bridge color to FolkUp amber
├── Preserve FolkUp Ko-fi donation CTA styling
├── Underground aesthetic as investigation-specific layer
└── Brand consistency: resistance enhances, not replaces
```

### Quality Assurance Protocol
```
RESISTANCE AESTHETIC CHECKLIST:
├── ✅ Cipher elements readable but mysterious
├── ✅ Network patterns suggest connection not confusion
├── ✅ Typography hierarchy guides investigation flow
├── ✅ Color contrast meets WCAG 2.1 AA standards
├── ✅ Underground theme supports narrative, not distracts
└── ✅ Performance budget maintained <25KB combined assets
```

---

**STATUS:** Phase 2A Visual Assets Development Complete
**NEXT:** Phase 2B CSS Implementation + Johnny Coordination
**QUALITY GATE:** Alpha+Beta Hostile Verification Required