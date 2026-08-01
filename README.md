<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19.2-61dafb?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.0-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/GSAP-3.15-88ce02?style=for-the-badge&logo=greensock&logoColor=white" alt="GSAP" />
  <img src="https://img.shields.io/badge/Three.js-r185-black?style=for-the-badge&logo=three.js&logoColor=white" alt="Three.js" />
</p>

# 🚀 DevShaham — SEO-Optimized Portfolio & Admin CMS Dashboard

A **premium, high-performance portfolio website** built with **Next.js 16 App Router**, featuring a full-featured **Admin CMS Dashboard**, **Technical SEO infrastructure**, and **5 core website pages** — designed for a professional Shopify & WordPress development agency.

> **Live URL**: [devshaham.com](https://devshaham.com)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Core Pages](#-core-pages)
- [Services Offered](#-services-offered)
- [Admin CMS Dashboard](#-admin-cms-dashboard)
- [SEO Architecture](#-seo-architecture)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Deployment](#-deployment)
- [License](#-license)

---

## 🌐 Overview

This project is a **production-ready digital agency portfolio** that combines a stunning public-facing website with a powerful **Admin CMS Dashboard** for managing every aspect of the site — from blog posts and pages to SEO metadata and media assets.

### Key Highlights

- ⚡ **Sub-2 second load times** with Next.js SSG/SSR and optimized asset delivery
- 🎨 **Premium UI/UX** with GSAP scroll animations, glassmorphism, and micro-interactions
- 🔍 **Technical SEO infrastructure** with meta tags, JSON-LD schema, and Core Web Vitals optimization
- 📱 **Fully responsive** across all breakpoints (480px, 768px, 1024px, 1440px)
- 🛠️ **Full Admin CMS** with blog editor, page manager, SEO dashboard, and analytics

---

## 📄 Core Pages

The website is structured around **5 core pages**, each SEO-optimized with unique meta titles, descriptions, and semantic HTML:

| Page | Route | Description |
|------|-------|-------------|
| **Home Page** | `/` | Hero section with 3D canvas, services overview, case studies, testimonials, and CTA |
| **Services Page** | `/services` | Specialized engineering services (Shopify Plus, WordPress, MERN, SEO) with pricing packages |
| **About Page** | `/about` | Agency story, technical expertise, experience timeline, and skills showcase |
| **Blog Page** | `/blog` | Technical articles, guides & SEO insights with category filtering |
| **Contact Page** | `/contact` | Project inquiry form with direct communication channels |

### Navigation Structure

```
Header:  Services → About → Blog → Contact → [Let's Talk CTA]
Footer:  Home → Services → About → Blog → Contact
```

---

## 🛠️ Services Offered

The agency specializes in **4 core engineering verticals**:

### 1. Shopify & Shopify Plus Development
- Custom Liquid theme engineering & section rendering
- Shopify Plus checkout extensions & replatforming
- Sub-2s speed optimization & app integrations
- **Categories**: `Shopify Developer`, `Shopify Expert`, `Shopify Development`, `Shopify Store Development`, `Shopify Theme Customization`, `Shopify SEO`

### 2. WordPress & WooCommerce Engineering
- Decoupled headless architectures with WPGraphQL
- Elementor Pro customization & custom plugin development
- WooCommerce automation & Vagaro/Make.com webhooks
- **Categories**: `WordPress Developer`, `WordPress Development`, `WooCommerce Developer`, `Elementor Expert`

### 3. MERN Stack Web Applications
- Full-stack React, Next.js, Node.js & MongoDB platforms
- REST & GraphQL API development
- Secure admin portals & user authentication
- **Categories**: `PHP Developer`, `Custom Web Development`, `eCommerce Developer`

### 4. Technical SEO & Speed Optimization
- Core Web Vitals (LCP, CLS, INP) optimization
- JSON-LD structured schema markup
- Google Maps rank dominance & local SEO
- **Categories**: `Technical SEO`, `Website Speed Optimization`

### Pricing Packages

| Package | Price | Includes |
|---------|-------|----------|
| **Basic Website** | $999 | Custom design, up to 5 pages, mobile responsive, basic SEO, contact form |
| **E-Commerce** | $2,499 | Custom e-commerce design, unlimited products, payment gateway, advanced SEO, admin dashboard, 1 month support |
| **Custom Web App** | Custom | Full-stack architecture, custom database, API development, user auth, scalable infrastructure, ongoing maintenance |

---

## 🖥️ Admin CMS Dashboard

The Admin CMS (`/admin`) is a **full-featured content management system** with a dark navy sidebar, amber accent highlights, and a comprehensive set of management tools.

### Sidebar Navigation

```
📊 Dashboard              — Overview stats & quick actions
📦 Catalog / Products     — Project portfolio management
📝 Blog                   — Blog post editor with Markdown toolbar
📄 Pages                  — Core page content & SEO management
💼 Services & Pricing     — Service offerings configuration
🔍 SEO (Expandable ▼)     — Full SEO infrastructure suite
   ├── SEO Dashboard      — Central SEO index with stats & Homepage SEO editor
   ├── Metadata Manager   — Page-level meta titles & descriptions
   ├── Schema Manager     — JSON-LD structured data configuration
   ├── Redirect Manager   — 301/302 redirect rules
   ├── Sitemap Manager    — XML sitemap generation & settings
   ├── Robots Manager     — robots.txt configuration
   ├── Site Verification  — Google Search Console & Bing verification
   └── Internal Linking   — Internal link structure optimization
💬 WhatsApp Leads         — Lead capture & conversion tracking
⭐ Reviews                — Client testimonials management
📈 Analytics              — Performance metrics & traffic data
⚙️ Settings               — Brand colors, typography & configuration
```

### Blog Editor Features

- **2-View System**: List View (table with filters) ↔ Editor View (rich content editor)
- **Rich Markdown Toolbar**: Bold, italic, headings, links, images, code blocks, lists
- **16 Post Categories**: Covering Shopify, WordPress, WooCommerce, SEO, and more
- **Full SEO Suite Per Post**:
  - Meta Title (0/60 character counter)
  - Meta Description (0/160 character counter)
  - Focus Keyword with title/description inclusion check
  - Canonical URL
  - `noindex` visibility toggle
  - Live SEO Score (0-100) with 10-point checklist
  - Excerpt character counter (0/300)
  - Featured cover image chooser

### Pages Management

- **5 Core Pages**: Home, Services, About, Blog, Contact
- **Page Editor**: Title, slug, HTML content, publish status, banner image, and SEO meta controls
- **Live URL Preview**: Green banner showing `🔗 Live: devshaham.com/[slug]`

### SEO Dashboard

- **Stats Cards**: Total Pages, Products, Collections, Blog Posts, Static Pages, Schema Types
- **Quick Links**: Metadata, Schema, Redirects, Sitemaps, Robots.txt, Internal Links
- **Homepage SEO Editor**: Inline meta title (0/60) and meta description (0/160) editor with character counters
- **SEO Pages Table**: Filterable table (All Pages / Static Pages / Blog Posts / Products) with type badges and "Edit SEO" actions

---

## 🔍 SEO Architecture

This project implements **enterprise-grade Technical SEO** across every page:

### On-Page SEO

| Feature | Implementation |
|---------|---------------|
| **Meta Titles** | Unique per page, 50-60 characters, keyword-optimized |
| **Meta Descriptions** | Unique per page, 120-160 characters, compelling CTAs |
| **Heading Hierarchy** | Single `<h1>` per page with proper `<h2>`–`<h6>` nesting |
| **Semantic HTML** | `<header>`, `<main>`, `<section>`, `<article>`, `<footer>` |
| **Image Optimization** | Next.js `<Image>` with lazy loading, WebP, and alt text |
| **Internal Linking** | Strategic cross-linking between services, blog, and pages |

### Technical SEO

| Feature | Implementation |
|---------|---------------|
| **Core Web Vitals** | LCP < 2.5s, CLS < 0.1, INP < 200ms |
| **Static Generation** | All 11 routes pre-rendered as static HTML at build time |
| **Font Optimization** | `next/font` with Plus Jakarta Sans & Inter (zero layout shift) |
| **Code Splitting** | Automatic per-route code splitting via Next.js App Router |
| **Minification** | CSS & JS minified in production builds |

### Blog SEO (Per Post)

- Focus keyword tracking with title & description inclusion scoring
- Canonical URL support to prevent duplicate content
- `noindex` toggle for draft/staging content
- SEO Score algorithm (0-100) with 10 weighted factors
- Excerpt optimization (0/300 characters)
- Featured image for Open Graph & Twitter Cards

---

## ⚙️ Tech Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| **Next.js** | 16.2.10 | React framework with App Router, SSG/SSR, and file-based routing |
| **React** | 19.2.4 | UI component library with hooks and server components |
| **Tailwind CSS** | 4.0 | Utility-first CSS framework for rapid, responsive styling |
| **GSAP** | 3.15 | High-performance scroll animations and micro-interactions |
| **Three.js** | r185 | 3D WebGL canvas for hero section visual effects |
| **@react-three/fiber** | 9.6 | React renderer for Three.js declarative 3D scenes |
| **Lucide React** | 1.23 | Modern icon library (200+ icons used across UI) |
| **React Icons** | 5.7 | Brand icons (Shopify, WordPress, React, Slack) |

### Design System

| Token | Value |
|-------|-------|
| **Primary Color** | `#c00000` (Deep Crimson) |
| **Primary Hover** | `#820000` (Dark Crimson) |
| **Admin Sidebar** | `#0f172a` (Dark Navy) |
| **Active Accent** | `amber-400` (Gold) |
| **Heading Font** | Plus Jakarta Sans |
| **Body Font** | Inter |
| **Breakpoints** | 480px → 768px → 1024px → 1440px |

---

## 📁 Project Structure

```
app/
├── page.js                          # Home Page (/)
├── layout.js                        # Root layout with Header & Footer
├── globals.css                      # Global styles & design tokens
├── about/
│   └── page.js                      # About Page (/about)
├── admin/
│   └── page.js                      # Admin CMS Dashboard (/admin)
├── blog/
│   └── page.js                      # Blog Page (/blog)
├── contact/
│   └── page.js                      # Contact Page (/contact)
├── services/
│   └── page.js                      # Services Page (/services)
├── pricing/
│   └── page.js                      # Pricing Page (/pricing)
├── projects/
│   └── page.js                      # Projects Page (/projects)
└── components/
    ├── Header.js                    # Responsive header with nav links
    ├── Footer.js                    # Footer with navigation & social links
    ├── Hero.js                      # Hero section with 3D canvas
    ├── Services.js                  # Services grid with icon cards
    ├── ServicesOverview.js          # Detailed services overview component
    ├── Pricing.js                   # Pricing packages cards
    ├── Projects.js                  # Portfolio project showcase
    ├── AboutSection.js              # About section with experience
    ├── Experience.js                # Work experience timeline
    ├── Skills.js                    # Technical skills grid
    ├── CaseStudies.js               # Client case studies
    ├── Testimonials.js              # Client testimonials carousel
    ├── BlogSection.js               # Blog preview cards
    ├── CTA.js                       # Call-to-action section
    └── ThreeCanvas.js               # Three.js 3D scene component
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ (LTS recommended)
- **npm** 9+ or **yarn** 1.22+

### Installation

```bash
# Clone the repository
git clone https://github.com/Shahamoffical/Next-JS-Portfolio.git

# Navigate to the project directory
cd Next-JS-Portfolio/Next-JS-Portfolio-main

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Create optimized production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint for code quality checks |

### Build Output

```
Route (app)
┌ ○ /                  # Home Page
├ ○ /about             # About Page
├ ○ /admin             # Admin CMS Dashboard
├ ○ /blog              # Blog Page
├ ○ /contact           # Contact Page
├ ○ /pricing           # Pricing Page
├ ○ /projects          # Projects Page
└ ○ /services          # Services Page

○  (Static)  prerendered as static content
```

---

## 🌍 Deployment

### Deploy on Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)

1. Push your code to GitHub
2. Import the repository on [Vercel](https://vercel.com)
3. Vercel auto-detects Next.js and deploys with zero configuration
4. Custom domain setup via Vercel DNS

### Deploy on Netlify

```bash
npm run build
# Deploy the .next/ directory
```

### Self-Hosted (Docker / VPS)

```bash
npm run build
npm run start
# Serves on port 3000 by default
```

---

## 📊 Performance Metrics

| Metric | Score | Target |
|--------|-------|--------|
| **PageSpeed (Desktop)** | 98/100 | 95+ |
| **PageSpeed (Mobile)** | 95/100 | 90+ |
| **LCP** | < 1.8s | < 2.5s |
| **CLS** | < 0.05 | < 0.1 |
| **INP** | < 150ms | < 200ms |
| **Build Time** | ~14s | < 30s |
| **Static Routes** | 11/11 | All routes pre-rendered |

---

## 📜 License

This project is proprietary software developed for **DevShaham Digital Agency**. All rights reserved.

---

<p align="center">
  Built with ❤️ by <a href="https://devshaham.com">Shaham Abbas</a> — Scaling E-commerce & Digital Experiences
</p>
