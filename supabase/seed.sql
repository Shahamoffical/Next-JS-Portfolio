-- ============================================
-- Shaham Abbas Dev Portfolio — Safe Idempotent Seed Data
-- Run AFTER migration.sql in Supabase SQL Editor
-- ============================================

-- PROJECTS
INSERT INTO projects (title, url, category, status, leads, date) VALUES
  ('MobileCart E-Commerce', 'https://mobilecart.ca', 'Shopify Plus', 'Published', 14, '2026-07-28'),
  ('Chateau Salon & Spa', 'https://chateausalon.com', 'WordPress & Booking', 'Published', 22, '2026-07-22'),
  ('Eat Arra Organic Store', 'https://eatarra.com', 'WooCommerce & WhatsApp', 'Published', 18, '2026-07-15'),
  ('Saferdot Cybersecurity', 'https://saferdot.com', 'MERN Stack Web App', 'Published', 9, '2026-07-08')
ON CONFLICT DO NOTHING;

-- BLOG POSTS
INSERT INTO blog_posts (title, slug, category, author, views, status, content, tags, excerpt, faqs, seo_title, seo_desc) VALUES
  ('Building Custom Shopify Plus Liquid Themes for High-Volume Stores',
   'building-custom-shopify-plus-liquid-themes',
   'Shopify Development', 'Admin', '1.4k', 'Published',
   'When building high-volume Shopify Plus stores, section rendering and Liquid loop optimization are crucial...',
   'shopify, liquid, theme',
   'Essential technical tips for custom Shopify Plus Liquid development.',
   'Q: What framework is best for Shopify Plus?\nA: Liquid with custom section rendering.',
   'Custom Shopify Plus Liquid Theme Architecture',
   'Discover expert tips for high-volume Shopify store builds.'),

  ('Decoupled WordPress & WooCommerce Architectures with WPGraphQL',
   'decoupled-wordpress-woocommerce-architectures-wpgraphql',
   'WordPress Development', 'Admin', '980', 'Published',
   'Maximize speed and headless flexibility with Next.js and WPGraphQL backend queries...',
   'wordpress, wpgraphql, headless',
   'Headless WordPress & WooCommerce performance guide.',
   '',
   'Decoupled WordPress Architecture Guide',
   'Learn how to build sub-2 second headless WordPress websites.'),

  ('Technical SEO Strategies for E-Commerce & Google Maps Ranking',
   'technical-seo-strategies-ecommerce-google-maps-ranking',
   'Technical SEO', 'Admin', '2.1k', 'Published',
   'Core Web Vitals optimization, JSON-LD structured schema markup, and regional Google Maps ranking...',
   'seo, core web vitals, schema',
   'Technical SEO strategy for high-converting e-commerce sites.',
   '',
   'Technical SEO Strategies for E-Commerce',
   'Top Google Maps ranking and technical SEO playbook.'),

  ('Sub-2 Second Website Speed Optimization & Core Web Vitals',
   'website-speed-optimization-core-web-vitals',
   'Website Speed Optimization', 'Admin', '650', 'Draft',
   'Optimizing LCP, CLS, and INP metrics across mobile and desktop devices...',
   'speed, performance, vitals',
   'Comprehensive speed optimization guide for web applications.',
   '',
   'Website Speed Optimization Guide',
   'How to pass Core Web Vitals with sub-2s load speeds.')
ON CONFLICT (slug) DO NOTHING;

-- PAGES
INSERT INTO pages (title, slug, live_url, status, content, meta_title, meta_desc) VALUES
  ('Home Page', '/', 'devshaham.com/', 'Published',
   '<p>Main landing homepage content — scaling e-commerce & digital experiences.</p>',
   'Premium Custom Website Development & Shopify Expert Solutions',
   'Scaling E-commerce & Digital Experiences with custom Shopify Liquid and WordPress builds.'),

  ('Services Page', '/services', 'devshaham.com/services', 'Published',
   '<p>Services page content — Shopify Plus, WordPress, MERN stack, and Technical SEO.</p>',
   'Specialized Engineering Services - Digital Solutions Agency',
   'Custom Shopify Liquid themes, headless WPGraphQL, MERN apps, and Technical SEO.'),

  ('About Page', '/about', 'devshaham.com/about', 'Published',
   '<p>About Us page content — specialized Shopify & WordPress development agency.</p>',
   'About Us - Digital Solutions Agency',
   'Learn about our mission, international code standards, and technical expertise.'),

  ('Blog Page', '/blog', 'devshaham.com/blog', 'Published',
   '<p>Technical Insights & Blog Hub content — Shopify, WordPress, and SEO articles.</p>',
   'Technical Blog & Insights - Digital Solutions Agency',
   'Articles and technical guides covering Shopify Plus, Headless Commerce, and Technical SEO.'),

  ('Contact Page', '/contact', 'devshaham.com/contact', 'Published',
   '<p>Contact Us page content — edit from the dashboard.</p>',
   'Contact Us - Digital Solutions Agency',
   'Get in touch with our expert Shopify, WordPress and MERN stack developers for a custom quote.')
ON CONFLICT (slug) DO NOTHING;

-- LEADS
INSERT INTO leads (name, product, source, type, status) VALUES
  ('Alexander Wright', 'Shopify Plus Replatforming', '/services/shopify', 'Quote', 'New'),
  ('Chateau Beauty Salon', 'Vagaro Booking Integration', '/projects/chateausalon', 'General', 'In Contact'),
  ('Arra Organic Foods', 'WhatsApp Automated Checkout', '/projects/eatarra', 'Order', 'Completed'),
  ('Saferdot Tech', 'MERN Stack API Security Audit', '/contact', 'Quote', 'New')
ON CONFLICT DO NOTHING;

-- SETTINGS
INSERT INTO settings (key, value) VALUES
  ('brand', '{"primaryColor": "#c00000", "hoverColor": "#820000", "headingFont": "Plus Jakarta Sans", "bodyFont": "Inter"}'),
  ('seo', '{"defaultTitle": "Shaham Abbas Dev - Premium Custom Website Development", "defaultDesc": "Scaling E-commerce & Digital Experiences", "coreWebVitalsTarget": "Sub-2s"}')
ON CONFLICT (key) DO NOTHING;
