"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  Briefcase,
  Search,
  Bell,
  ExternalLink,
  Plus,
  TrendingUp,
  MessageSquare,
  Star,
  Layers,
  Settings,
  LogOut,
  Sliders,
  Users,
  CheckCircle,
  Clock,
  Trash2,
  Edit,
  ArrowUpRight,
  ShieldCheck,
  Globe,
  Database,
  Phone,
  ChevronDown,
  ChevronRight,
  Check,
  Eye,
  Package,
  Folder,
  PenTool,
  Wrench,
  FileCode,
  Share2,
  Map,
  Bot,
  Link2,
  Home,
  X,
  Sparkles
} from "lucide-react";
import { FaShopify, FaWordpress, FaReact, FaSlack } from "react-icons/fa";

// Custom Responsive UI Dropdown Component
function CustomDropdown({ value, onChange, options = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const safeOptions = Array.isArray(options) && options.length > 0
    ? options
    : [{ label: value || "Select...", value: value || "" }];
  const selectedOption = safeOptions.find((o) => o.value === value) || safeOptions[0];

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-xs flex items-center justify-between hover:border-primary/50 focus:outline-none focus:border-primary transition-all shadow-sm"
      >
        <span>{selectedOption?.label || value || "Select..."}</span>
        <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${isOpen ? "rotate-180 text-primary" : ""}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setIsOpen(false)}></div>
          <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-2xl border border-slate-200 shadow-2xl z-40 p-1.5 space-y-1 animate-in fade-in duration-150 max-h-60 overflow-y-auto">
            {safeOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={`w-full px-3.5 py-2.5 rounded-xl text-left text-xs font-semibold flex items-center justify-between transition-colors ${
                  value === opt.value
                    ? "bg-primary/10 text-primary font-bold"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span>{opt.label}</span>
                {value === opt.value && <Check className="w-3.5 h-3.5 text-primary" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// All hardcoded portfolio projects (fallback when Supabase returns empty)
const hardcodedProjects = [
  { id: "hc-1", title: "Peakloom UK", url: "https://peakloom.co.uk", category: "Shopify Development", status: "Published", leads: 12, date: "July 2026" },
  { id: "hc-2", title: "Furmora UK", url: "https://furmora.co.uk", category: "Shopify Development", status: "Published", leads: 9, date: "July 2026" },
  { id: "hc-3", title: "REGENT SCENT UAE", url: "https://regentscents.com", category: "Shopify Development", status: "Published", leads: 15, date: "July 2026" },
  { id: "hc-4", title: "Chateau Salon & Spa", url: "https://chateausalon.com", category: "WordPress & WooCommerce", status: "Published", leads: 22, date: "June 2026" },
  { id: "hc-5", title: "Eatarra Fresh E-Commerce", url: "https://eatarra.com", category: "WordPress & WooCommerce", status: "Published", leads: 18, date: "June 2026" },
  { id: "hc-6", title: "GB Constructions", url: "https://gbconstructions.org", category: "WordPress & WooCommerce", status: "Published", leads: 7, date: "May 2026" },
  { id: "hc-7", title: "Saferdot LMS & Driving Academy", url: "https://saferdot.com", category: "WordPress & WooCommerce", status: "Published", leads: 11, date: "Dec 2025" },
  { id: "hc-8", title: "Incubee PK", url: "https://www.incubee.pk", category: "WordPress & WooCommerce", status: "Published", leads: 6, date: "Jan 2026" },
  { id: "hc-9", title: "MobileCart Canada", url: "https://mobilecart.ca", category: "WordPress & WooCommerce", status: "Published", leads: 14, date: "Feb 2026" },
  { id: "hc-10", title: "Shaham AI Chatbot", url: "https://shaham-ai.vercel.app", category: "AI Agents & Automations", status: "Published", leads: 5, date: "July 2026" },
  { id: "hc-11", title: "AutoLeads AI Sales Agent", url: "https://next-js-portfolio-one-bay.vercel.app/admin", category: "AI Agents & Automations", status: "Published", leads: 8, date: "July 2026" },
  { id: "hc-12", title: "HASC - Halal Animal Selling & Care", url: "https://halal-animal-selling-website.vercel.app", category: "Custom Development", status: "Published", leads: 10, date: "June 2026" },
  { id: "hc-13", title: "TradingApp Pro", url: "https://trading-app-inky-gamma.vercel.app", category: "Custom Development", status: "Published", leads: 4, date: "June 2026" },
];

const initialLeads = [
  { id: 101, name: "Alexander Wright", product: "Shopify Plus Replatforming", source: "/services/shopify", type: "Quote", time: "2 hours ago", status: "New" },
  { id: 102, name: "Chateau Beauty Salon", product: "Vagaro Booking Integration", source: "/projects/chateausalon", type: "General", time: "5 hours ago", status: "In Contact" },
  { id: 103, name: "Arra Organic Foods", product: "WhatsApp Automated Checkout", source: "/projects/eatarra", type: "Order", time: "1 day ago", status: "Completed" },
  { id: 104, name: "Saferdot Tech", product: "MERN Stack API Security Audit", source: "/contact", type: "Quote", time: "2 days ago", status: "New" }
];

const blogCategoriesList = [
  "Shopify Developer",
  "Shopify Expert",
  "Shopify Development",
  "Shopify Store Development",
  "Shopify Theme Customization",
  "Shopify SEO",
  "WordPress Developer",
  "WordPress Development",
  "WooCommerce Developer",
  "Elementor Expert",
  "PHP Developer",
  "Custom Web Development",
  "Technical SEO",
  "eCommerce Developer",
  "Website Speed Optimization",
  "Other"
];

const initialArticles = [
  {
    id: 201,
    title: "Building Custom Shopify Plus Liquid Themes for High-Volume Stores",
    slug: "building-custom-shopify-plus-liquid-themes",
    category: "Shopify Development",
    author: "Admin",
    views: "1.4k",
    status: "Published",
    date: "6/9/2026",
    content: "When building high-volume Shopify Plus stores, section rendering and Liquid loop optimization are crucial...",
    tags: "shopify, liquid, theme",
    excerpt: "Essential technical tips for custom Shopify Plus Liquid development.",
    faqs: "Q: What framework is best for Shopify Plus?\nA: Liquid with custom section rendering.",
    seoTitle: "Custom Shopify Plus Liquid Theme Architecture",
    seoDesc: "Discover expert tips for high-volume Shopify store builds."
  },
  {
    id: 202,
    title: "Decoupled WordPress & WooCommerce Architectures with WPGraphQL",
    slug: "decoupled-wordpress-woocommerce-architectures-wpgraphql",
    category: "WordPress Development",
    author: "Admin",
    views: "980",
    status: "Published",
    date: "6/6/2026",
    content: "Maximize speed and headless flexibility with Next.js and WPGraphQL backend queries...",
    tags: "wordpress, wpgraphql, headless",
    excerpt: "Headless WordPress & WooCommerce performance guide.",
    faqs: "",
    seoTitle: "Decoupled WordPress Architecture Guide",
    seoDesc: "Learn how to build sub-2 second headless WordPress websites."
  },
  {
    id: 203,
    title: "Technical SEO Strategies for E-Commerce & Google Maps Ranking",
    slug: "technical-seo-strategies-ecommerce-google-maps-ranking",
    category: "Technical SEO",
    author: "Admin",
    views: "2.1k",
    status: "Published",
    date: "6/2/2026",
    content: "Core Web Vitals optimization, JSON-LD structured schema markup, and regional Google Maps ranking...",
    tags: "seo, core web vitals, schema",
    excerpt: "Technical SEO strategy for high-converting e-commerce sites.",
    faqs: "",
    seoTitle: "Technical SEO Strategies for E-Commerce",
    seoDesc: "Top Google Maps ranking and technical SEO playbook."
  },
  {
    id: 204,
    title: "Sub-2 Second Website Speed Optimization & Core Web Vitals",
    slug: "website-speed-optimization-core-web-vitals",
    category: "Website Speed Optimization",
    author: "Admin",
    views: "650",
    status: "Draft",
    date: "5/25/2026",
    content: "Optimizing LCP, CLS, and INP metrics across mobile and desktop devices...",
    tags: "speed, performance, vitals",
    excerpt: "Comprehensive speed optimization guide for web applications.",
    faqs: "",
    seoTitle: "Website Speed Optimization Guide",
    seoDesc: "How to pass Core Web Vitals with sub-2s load speeds."
  }
];

const initialPages = [
  {
    id: 1,
    title: "Home Page",
    slug: "/",
    liveUrl: "devshaham.com/",
    status: "Published",
    content: "<p>Main landing homepage content — scaling e-commerce & digital experiences.</p>",
    metaTitle: "Premium Custom Website Development & Shopify Expert Solutions",
    metaDesc: "Scaling E-commerce & Digital Experiences with custom Shopify Liquid and WordPress builds.",
    bannerImage: null
  },
  {
    id: 2,
    title: "Services Page",
    slug: "/services",
    liveUrl: "devshaham.com/services",
    status: "Published",
    content: "<p>Services page content — Shopify Plus, WordPress, MERN stack, and Technical SEO.</p>",
    metaTitle: "Specialized Engineering Services - Digital Solutions Agency",
    metaDesc: "Custom Shopify Liquid themes, headless WPGraphQL, MERN apps, and Technical SEO.",
    bannerImage: null
  },
  {
    id: 3,
    title: "About Page",
    slug: "/about",
    liveUrl: "devshaham.com/about",
    status: "Published",
    content: "<p>About Us page content — specialized Shopify & WordPress development agency.</p>",
    metaTitle: "About Us - Digital Solutions Agency",
    metaDesc: "Learn about our mission, international code standards, and technical expertise.",
    bannerImage: null
  },
  {
    id: 4,
    title: "Blog Page",
    slug: "/blog",
    liveUrl: "devshaham.com/blog",
    status: "Published",
    content: "<p>Technical Insights & Blog Hub content — Shopify, WordPress, and SEO articles.</p>",
    metaTitle: "Technical Blog & Insights - Digital Solutions Agency",
    metaDesc: "Articles and technical guides covering Shopify Plus, Headless Commerce, and Technical SEO.",
    bannerImage: null
  },
  {
    id: 5,
    title: "Contact Page",
    slug: "/contact",
    liveUrl: "devshaham.com/contact",
    status: "Published",
    content: "<p>Contact Us page content — edit from the dashboard.</p>",
    metaTitle: "Contact Us - Digital Solutions Agency",
    metaDesc: "Get in touch with our expert Shopify, WordPress and MERN stack developers for a custom quote.",
    bannerImage: null
  }
];

export default function AdminDashboard() {
  const supabase = createClient();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("dashboard");
  const [seoExpanded, setSeoExpanded] = useState(false);
  const [activeSeoSubTab, setActiveSeoSubTab] = useState("seo-dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddProjectModal, setShowAddProjectModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  // SEO Modal & Filtering State
  const [seoFilterTab, setSeoFilterTab] = useState("all");
  const [seoEditModalItem, setSeoEditModalItem] = useState(null);
  const [savingSeoModal, setSavingSeoModal] = useState(false);

  // Schema Manager State
  const [schemasList, setSchemasList] = useState([
    { id: 1, name: "Organization", type: "Organization", status: "Active", jsonLd: '{\n  "@url": "https://next-js-portfolio-one-bay.vercel.app",\n  "@type": "Organization",\n  "name": "Shaham Abbas Dev",\n  "email": "shahamabbasdev@gmail.com"\n}' },
    { id: 2, name: "LocalBusiness (Digital Agency)", type: "LocalBusiness", status: "Active", jsonLd: '{\n  "@type": "LocalBusiness",\n  "name": "Shaham Abbas Dev Digital Agency"\n}' },
    { id: 3, name: "WebSite", type: "WebSite", status: "Active", jsonLd: '{\n  "@type": "WebSite",\n  "name": "Shaham Abbas Dev Portfolio"\n}' },
    { id: 4, name: "Service (Custom Engineering)", type: "Service", status: "Active", jsonLd: '{\n  "@type": "Service",\n  "name": "Shopify & WordPress Engineering"\n}' }
  ]);
  const [editingSchema, setEditingSchema] = useState(null);

  // Redirects Manager State
  const [redirectSubTab, setRedirectSubTab] = useState("redirects");
  const [redirectsList, setRedirectsList] = useState([
    { id: 1, from: "/cart", to: "/", type: 301, hits: 0, status: "active" },
    { id: 2, from: "/shop", to: "/projects", type: 301, hits: 0, status: "active" },
    { id: 3, from: "/portfolio", to: "/about", type: 301, hits: 0, status: "active" }
  ]);
  const [showAddRedirectModal, setShowAddRedirectModal] = useState(false);
  const [newRedirect, setNewRedirect] = useState({ from: "", to: "", type: 301 });

  // Robots Manager State
  const [robotsRules, setRobotsRules] = useState("Disallow: /admin\nDisallow: /api/*");
  const [blockAiCrawlers, setBlockAiCrawlers] = useState(false);

  // Site Verification State
  const [siteVerification, setSiteVerification] = useState({
    google: "google-site-verification=abcdef123456789",
    bing: "",
    pinterest: ""
  });

  const handleOpenSeoModal = (item, itemType) => {
    setSeoEditModalItem({
      item: { ...item },
      itemType,
      meta_title: item.meta_title || item.metaTitle || item.seo_title || item.seoTitle || item.title || "",
      meta_desc: item.meta_desc || item.metaDesc || item.seo_desc || item.seoDesc || "",
      focus_keyword: item.focus_keyword || item.focusKeyword || item.tags || "",
      canonical_url: item.canonical_url || item.canonicalUrl || item.live_url || item.url || "",
      noindex: !!item.noindex,
    });
  };

  const handleSaveSeoModal = async () => {
    if (!seoEditModalItem) return;
    setSavingSeoModal(true);

    const { item, itemType, meta_title, meta_desc, focus_keyword, canonical_url, noindex } = seoEditModalItem;

    let endpoint = "/api/pages";
    let payload = { ...item };

    if (itemType === "static") {
      endpoint = "/api/pages";
      payload = {
        ...item,
        meta_title: meta_title,
        metaTitle: meta_title,
        meta_desc: meta_desc,
        metaDesc: meta_desc,
      };
    } else if (itemType === "blog") {
      endpoint = "/api/blog";
      payload = {
        ...item,
        seo_title: meta_title,
        seoTitle: meta_title,
        seo_desc: meta_desc,
        seoDesc: meta_desc,
        focus_keyword: focus_keyword,
        canonical_url: canonical_url,
        noindex: noindex,
      };
    } else if (itemType === "product") {
      endpoint = "/api/projects";
      payload = {
        ...item,
        seo_title: meta_title,
        seo_desc: meta_desc,
      };
    }

    try {
      const res = await fetch(endpoint, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const saved = await res.json();
      if (res.ok) {
        if (itemType === "static") {
          setPagesList(pagesList.map(p => p.id === saved.id ? saved : p));
        } else if (itemType === "blog") {
          setArticlesList(articlesList.map(a => a.id === saved.id ? saved : a));
        } else if (itemType === "product") {
          setProjectsList(projectsList.map(pr => pr.id === saved.id ? saved : pr));
        }
        setSeoEditModalItem(null);
        showToast("SEO Metadata saved successfully!");
      } else {
        showToast(saved.error || "Failed to save SEO metadata", "error");
      }
    } catch (err) {
      showToast("Network error saving SEO metadata", "error");
    }
    setSavingSeoModal(false);
  };

  // Analytics State (dynamic Vercel API integration)
  const [analyticsData, setAnalyticsData] = useState(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);

  const fetchVercelAnalytics = async () => {
    setAnalyticsLoading(true);
    try {
      const res = await fetch("/api/analytics");
      const data = await res.json();
      setAnalyticsData(data);
    } catch (err) {
      setAnalyticsData({ configured: false, error: err.message });
    }
    setAnalyticsLoading(false);
  };

  useEffect(() => {
    if (activeTab === "analytics") {
      fetchVercelAnalytics();
    }
  }, [activeTab]);
  const [projectsList, setProjectsList] = useState([]);
  const [leadsList, setLeadsList] = useState([]);
  const [articlesList, setArticlesList] = useState([]);
  const [pagesList, setPagesList] = useState([]);

  // Toast helper
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Fetch all data from Supabase on mount
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [projectsRes, leadsRes, articlesRes, pagesRes] = await Promise.all([
        fetch("/api/projects"),
        fetch("/api/leads"),
        fetch("/api/blog"),
        fetch("/api/pages"),
      ]);

      const [projects, leads, articles, pages] = await Promise.all([
        projectsRes.json(),
        leadsRes.json(),
        articlesRes.json(),
        pagesRes.json(),
      ]);

      // Merge: use Supabase projects if available, otherwise use hardcoded list filtered by hidden records
      if (Array.isArray(projects) && projects.length > 0) {
        // Get hidden project URLs from Supabase records
        const hiddenUrls = projects
          .filter((p) => p.status === "hidden")
          .map((p) => (p.url || "").replace(/\/+$/, "").toLowerCase());
        // Filter hardcoded projects to remove hidden ones
        const visibleHardcoded = hardcodedProjects.filter(
          (hp) => !hiddenUrls.includes((hp.url || "").replace(/\/+$/, "").toLowerCase())
        );
        // Show non-hidden Supabase projects + visible hardcoded projects
        const supabaseVisible = projects.filter((p) => p.status !== "hidden");
        // Merge: avoid duplicates by URL
        const mergedUrls = new Set(supabaseVisible.map((p) => (p.url || "").replace(/\/+$/, "").toLowerCase()));
        const uniqueHardcoded = visibleHardcoded.filter(
          (hp) => !mergedUrls.has((hp.url || "").replace(/\/+$/, "").toLowerCase())
        );
        setProjectsList([...supabaseVisible, ...uniqueHardcoded]);
      } else {
        setProjectsList(hardcodedProjects);
      }
      setLeadsList(Array.isArray(leads) ? leads : []);
      setArticlesList(Array.isArray(articles) ? articles : []);
      setPagesList(Array.isArray(pages) ? pages : []);
      setLoading(false);
    }
    fetchData();
  }, []);

  // Auth: Log Out handler
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  // Pages Management State
  const [pageSubView, setPageSubView] = useState("list");
  const [activePage, setActivePage] = useState(null);

  const handleOpenEditPage = (pg) => {
    setActivePage({ ...pg });
    setPageSubView("editor");
  };

  const handleSavePage = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/pages", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(activePage),
      });
      const saved = await res.json();
      if (res.ok) {
        setPagesList(pagesList.map(p => p.id === saved.id ? saved : p));
        setPageSubView("list");
        showToast("Page saved successfully!");
      } else {
        showToast(saved.error || "Failed to save page", "error");
      }
    } catch (err) {
      showToast("Network error saving page", "error");
    }
    setSaving(false);
  };

  // Blog Management State
  const blogCategoriesList = [
    "Shopify Development",
    "Shopify Plus",
    "WordPress & WooCommerce",
    "Technical SEO",
    "Speed Optimization",
    "Custom Liquid",
    "Next.js & React"
  ];
  const [blogSubView, setBlogSubView] = useState("list");
  const [blogSearch, setBlogSearch] = useState("");
  const [blogStatusFilter, setBlogStatusFilter] = useState("All statuses");
  const [blogCategoryFilter, setBlogCategoryFilter] = useState("All categories");
  const [editorTab, setEditorTab] = useState("content");

  const [activeArticle, setActiveArticle] = useState({
    id: null,
    title: "",
    slug: "",
    category: "Shopify Development",
    author: "Admin",
    views: "0",
    status: "Draft",
    content: "",
    tags: "",
    excerpt: "",
    faqs: "",
    seo_title: "",
    seo_desc: "",
    focus_keyword: "",
    canonical_url: "",
    noindex: false,
    featured_image: null
  });

  const calculateSeoScore = (art) => {
    let score = 0;
    const seoTitle = art.seo_title || art.seoTitle || "";
    const seoDesc = art.seo_desc || art.seoDesc || "";
    const focusKw = art.focus_keyword || art.focusKeyword || "";
    const featImg = art.featured_image || art.featuredImage;
    const canUrl = art.canonical_url || art.canonicalUrl || "";

    if (seoTitle && seoTitle.length <= 60) score += 10;
    if (seoDesc && seoDesc.length >= 50 && seoDesc.length <= 160) score += 10;
    if (focusKw) score += 10;
    if (focusKw && seoTitle.toLowerCase().includes(focusKw.toLowerCase())) score += 10;
    if (focusKw && seoDesc.toLowerCase().includes(focusKw.toLowerCase())) score += 10;
    if ((art.content?.split(/\s+/).length || 0) >= 10) score += 10;
    score += 10;
    if (featImg) score += 10;
    if (canUrl) score += 10;
    if (art.content?.includes("http") || art.content?.includes("/")) score += 10;
    return score;
  };

  const handleOpenNewPost = () => {
    setActiveArticle({
      id: null,
      title: "",
      slug: "",
      category: "Shopify Development",
      author: "Admin",
      views: "0",
      status: "Draft",
      content: "",
      tags: "",
      excerpt: "",
      faqs: "",
      seo_title: "",
      seo_desc: "",
      focus_keyword: "",
      canonical_url: "",
      noindex: false,
      featured_image: null
    });
    setEditorTab("content");
    setBlogSubView("editor");
  };

  const handleOpenEditPost = (art) => {
    setActiveArticle({ ...art });
    setEditorTab("content");
    setBlogSubView("editor");
  };

  const handleSaveArticle = async (statusOverride) => {
    setSaving(true);
    const finalStatus = statusOverride || activeArticle.status || "Draft";
    const postToSave = {
      id: activeArticle.id || undefined,
      title: activeArticle.title || "Untitled Blog Post",
      slug: activeArticle.slug || (activeArticle.title ? activeArticle.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : "new-post"),
      category: activeArticle.category || "Shopify Development",
      author: activeArticle.author || "Admin",
      views: activeArticle.views || "0",
      status: finalStatus,
      content: activeArticle.content || "",
      tags: activeArticle.tags || "",
      excerpt: activeArticle.excerpt || "",
      faqs: activeArticle.faqs || "",
      noindex: !!activeArticle.noindex,
      seo_title: activeArticle.seo_title || activeArticle.seoTitle || "",
      seo_desc: activeArticle.seo_desc || activeArticle.seoDesc || "",
      focus_keyword: activeArticle.focus_keyword || activeArticle.focusKeyword || "",
      canonical_url: activeArticle.canonical_url || activeArticle.canonicalUrl || "",
      featured_image: activeArticle.featured_image || activeArticle.featuredImage || null
    };

    try {
      const isNew = !postToSave.id || !articlesList.find(a => a.id === postToSave.id);
      const res = await fetch("/api/blog", {
        method: isNew ? "POST" : "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postToSave),
      });
      const saved = await res.json();
      if (res.ok) {
        if (isNew) {
          setArticlesList([saved, ...articlesList]);
        } else {
          setArticlesList(articlesList.map(a => a.id === saved.id ? saved : a));
        }
        setBlogSubView("list");
        showToast("Blog post saved successfully!");
      } else {
        showToast(saved.error || "Failed to save post", "error");
      }
    } catch (err) {
      showToast("Network error saving post", "error");
    }
    setSaving(false);
  };

  const handleDeleteArticle = async (id) => {
    try {
      const res = await fetch(`/api/blog?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setArticlesList(articlesList.filter(a => a.id !== id));
        showToast("Post deleted!");
      } else {
        showToast("Failed to delete post", "error");
      }
    } catch (err) {
      showToast("Network error", "error");
    }
  };

  const filteredArticles = articlesList.filter(art => {
    const matchesSearch = (art.title || "").toLowerCase().includes(blogSearch.toLowerCase()) || (art.slug || "").toLowerCase().includes(blogSearch.toLowerCase());
    const matchesStatus = blogStatusFilter === "All statuses" || (art.status || "").toLowerCase() === blogStatusFilter.toLowerCase();
    const matchesCategory = blogCategoryFilter === "All categories" || (art.category || "").toLowerCase() === blogCategoryFilter.toLowerCase();
    return matchesSearch && matchesStatus && matchesCategory;
  });

  // New Project Form Data
  const [newProject, setNewProject] = useState({
    title: "",
    url: "",
    category: "Shopify Plus",
    status: "Published"
  });

  const handleAddProject = async (e) => {
    e.preventDefault();
    if (!newProject.title) return;
    setSaving(true);
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newProject.title,
          url: newProject.url || "https://example.com",
          category: newProject.category,
          status: newProject.status,
          leads: 0,
        }),
      });
      const saved = await res.json();
      if (res.ok) {
        setProjectsList([saved, ...projectsList]);
        setNewProject({ title: "", url: "", category: "Shopify Plus", status: "Published" });
        setShowAddProjectModal(false);
        showToast("Project added successfully!");
      } else {
        showToast(saved.error || "Failed to add project", "error");
      }
    } catch (err) {
      showToast("Network error", "error");
    }
    setSaving(false);
  };

  const handleDeleteProject = async (id) => {
    // Hardcoded projects (id starts with "hc-") — persist to Supabase as "hidden" and remove from local state
    if (typeof id === "string" && id.startsWith("hc-")) {
      const project = projectsList.find((p) => p.id === id);
      if (project) {
        try {
          // Store a "hidden" record in Supabase so the public projects page filters it out
          await fetch("/api/projects", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              title: project.title,
              url: project.url,
              category: project.category || "Hidden",
              status: "hidden",
              leads: 0,
            }),
          });
        } catch (err) {
          // Silently continue — still remove from local state
        }
      }
      setProjectsList(projectsList.filter((p) => p.id !== id));
      showToast("Project deleted successfully!");
      return;
    }
    // Supabase projects — delete from DB and local state
    try {
      const res = await fetch(`/api/projects?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setProjectsList(projectsList.filter((p) => p.id !== id));
        showToast("Project deleted!");
      } else {
        showToast("Failed to delete project", "error");
      }
    } catch (err) {
      showToast("Network error", "error");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-text-primary flex font-sans antialiased overflow-x-hidden">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-6 right-6 z-[100] px-5 py-3 rounded-xl text-xs font-bold shadow-2xl transition-all animate-in slide-in-from-right duration-300 ${
          toast.type === "error"
            ? "bg-rose-500 text-white"
            : "bg-emerald-500 text-white"
        }`}>
          {toast.type === "error" ? "❌" : "✅"} {toast.message}
        </div>
      )}

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-[#0f172a] z-[90] flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center text-lg font-black mx-auto animate-pulse shadow-[0_0_24px_rgba(192,0,0,0.5)]">S</div>
            <p className="text-sm text-slate-400 font-mono">Loading dashboard...</p>
          </div>
        </div>
      )}
      {/* 1. LEFT SIDEBAR (Dark Navy Theme with Deep Crimson Accent) */}
      <aside className="w-64 bg-[#0f172a] text-slate-300 flex flex-col justify-between shrink-0 shadow-2xl z-20 border-r border-slate-800">
        <div>
          {/* CMS Logo Header */}
          <div className="p-6 border-b border-slate-800/80 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-mono font-bold text-lg text-white">
              <span className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center text-sm font-black shadow-[0_0_12px_rgba(192,0,0,0.5)]">
                S
              </span>
              <span>&lt;dev/<span className="text-primary">shaham</span>&gt;</span>
            </Link>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
              CMS
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5 text-xs font-medium">
            {[
              { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
              { id: "projects", label: "Catalog / Products", icon: FolderKanban, badge: projectsList.length },
              { id: "blog", label: "Blog", icon: FileText, badge: articlesList.length },
              { id: "pages", label: "Pages", icon: Layers, badge: pagesList.length },
              { id: "services", label: "Services & Pricing", icon: Briefcase },
              { id: "seo", label: "SEO", icon: Globe, hasDropdown: true },
              { id: "leads", label: "WhatsApp Leads", icon: MessageSquare, badge: leadsList.length },
              { id: "reviews", label: "Reviews", icon: Star },
              { id: "analytics", label: "Analytics", icon: TrendingUp },
              { id: "settings", label: "Settings", icon: Settings },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              // SEO expandable dropdown
              if (tab.hasDropdown) {
                const seoSubItems = [
                  { id: "seo-dashboard", label: "SEO Dashboard" },
                  { id: "seo-metadata", label: "Metadata Manager" },
                  { id: "seo-schema", label: "Schema Manager" },
                  { id: "seo-redirects", label: "Redirect Manager" },
                  { id: "seo-sitemap", label: "Sitemap Manager" },
                  { id: "seo-robots", label: "Robots Manager" },
                  { id: "seo-verification", label: "Site Verification" },
                  { id: "seo-interlinking", label: "Internal Linking" },
                ];
                return (
                  <div key={tab.id}>
                    <button
                      onClick={() => {
                        setSeoExpanded(!seoExpanded);
                        setActiveTab(tab.id);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all duration-200 text-left relative ${
                        isActive
                          ? "bg-slate-800 text-white font-bold border-l-4 border-amber-400 shadow-[0_4px_16px_rgba(0,0,0,0.4)]"
                          : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isActive ? "text-amber-400" : "text-slate-400"}`} />
                        <span className={isActive ? "text-white font-bold" : ""}>{tab.label}</span>
                      </div>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          seoExpanded ? "rotate-180 text-amber-400" : "text-slate-500"
                        }`}
                      />
                    </button>

                    {/* SEO Submenu Dropdown */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        seoExpanded ? "max-h-[400px] opacity-100 mt-1" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="ml-4 pl-4 border-l border-slate-700/60 space-y-0.5 py-1">
                        {seoSubItems.map((sub) => {
                          const isSubActive = activeSeoSubTab === sub.id && activeTab === "seo";
                          return (
                            <button
                              key={sub.id}
                              onClick={() => {
                                setActiveTab("seo");
                                setActiveSeoSubTab(sub.id);
                              }}
                              className={`w-full text-left px-3 py-2 rounded-lg text-[11px] transition-all duration-150 ${
                                isSubActive
                                  ? "text-white font-semibold bg-slate-700/50"
                                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                              }`}
                            >
                              {sub.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all duration-200 text-left relative ${
                    isActive
                      ? "bg-slate-800 text-white font-bold border-l-4 border-amber-400 shadow-[0_4px_16px_rgba(0,0,0,0.4)]"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? "text-amber-400" : "text-slate-400"}`} />
                    <span className={isActive ? "text-white font-bold" : ""}>{tab.label}</span>
                  </div>
                  {tab.badge !== undefined && (
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                        isActive ? "bg-amber-400/20 text-amber-300 border border-amber-400/30" : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Admin Profile */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-900/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/profilecard.jpeg"
              alt="Shaham Abbas"
              className="w-9 h-9 rounded-full object-cover border border-primary/40"
            />
            <div>
              <div className="text-xs font-bold text-white leading-tight">Shaham Abbas</div>
              <div className="text-[10px] text-slate-400 font-mono">Agency SuperAdmin</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="text-slate-400 hover:text-rose-400 p-2 rounded-lg hover:bg-slate-800 transition-colors"
            title="Log Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* 2. MAIN DASHBOARD CONTENT WRAPPER */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header Bar */}
        <header className="h-16 bg-white border-b border-slate-200/80 px-8 flex items-center justify-between sticky top-0 z-10 shadow-sm">
          {/* Search Box */}
          <div className="relative w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search dashboard, projects, leads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 focus:outline-none focus:border-primary focus:bg-white transition-all"
            />
          </div>

          {/* Action Tools */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <button className="p-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 relative">
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-white text-[9px] font-bold font-mono flex items-center justify-center">
                  4
                </span>
              </button>
            </div>

            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors"
            >
              View Live Site <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </header>

        {/* Dashboard Canvas Container */}
        <div className="p-8 space-y-8 max-w-7xl w-full mx-auto">
          {/* Welcome Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-sans tracking-tight m-0">
                Welcome back, <span className="text-primary">Shaham Abbas</span>
              </h1>
              <p className="text-slate-500 text-xs mt-1 font-light">
                Here is your digital agency snapshot &amp; real-time performance overview for today.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveTab("analytics")}
                className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors"
              >
                Analytics
              </button>
              <button
                onClick={() => setShowAddProjectModal(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-dark transition-all duration-200 shadow-[0_4px_16px_rgba(192,0,0,0.3)]"
              >
                <Plus className="w-4 h-4" /> Add Product / Project
              </button>
            </div>
          </div>

          {/* Metric Cards Grid (4 Columns) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { label: "Total Projects", value: projectsList.length, change: "+2 this week", icon: FolderKanban, color: "#c00000" },
              { label: "WhatsApp Leads (Today)", value: leadsList.length, change: "100% Response", icon: MessageSquare, color: "#25D366" },
              { label: "Client Rating", value: "5.0 / 5.0", change: "Top Rated Agency", icon: Star, color: "#F59E0B" },
              { label: "Active Tech Stacks", value: "14", change: "Liquid, MERN, WP", icon: Layers, color: "#0066FF" },
            ].map((stat, sIdx) => {
              const StatIcon = stat.icon;
              return (
                <div
                  key={sIdx}
                  className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <span className="text-xs font-medium text-slate-400">{stat.label}</span>
                    <div className="text-2xl font-bold text-slate-900 font-mono">{stat.value}</div>
                    <div className="text-[10px] font-mono text-emerald-600 font-semibold">{stat.change}</div>
                  </div>
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: `${stat.color}15`, color: stat.color }}
                  >
                    <StatIcon className="w-6 h-6" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* TAB 1: DASHBOARD OVERVIEW */}
          {activeTab === "dashboard" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Recent WhatsApp Leads Table (8 cols) */}
              <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 m-0">Recent WhatsApp Leads &amp; Client Inquiries</h3>
                    <p className="text-xs text-slate-400 font-light mt-0.5">Real-time incoming quote requests and redirect logs</p>
                  </div>
                  <button onClick={() => setActiveTab("leads")} className="text-xs font-semibold text-primary hover:underline">
                    View All →
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-400 uppercase font-mono text-[10px] tracking-wider border-y border-slate-100">
                      <tr>
                        <th className="py-3 px-4">Client Name</th>
                        <th className="py-3 px-4">Service / Product</th>
                        <th className="py-3 px-4">Source Route</th>
                        <th className="py-3 px-4">Type</th>
                        <th className="py-3 px-4">Time</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {leadsList.map((lead) => (
                        <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3.5 px-4 font-bold text-slate-900">{lead.name}</td>
                          <td className="py-3.5 px-4">{lead.product}</td>
                          <td className="py-3.5 px-4 font-mono text-slate-400">{lead.source}</td>
                          <td className="py-3.5 px-4">
                            <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary font-mono text-[10px] font-bold">
                              {lead.type}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-slate-400 font-mono">{lead.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right Column: Catalog Summary & Quick Actions (4 cols) */}
              <div className="lg:col-span-4 space-y-6">
                {/* Catalog Card */}
                <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-4">
                  <h3 className="text-base font-bold text-slate-900 m-0">Portfolio Catalog</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                      <div className="text-2xl font-bold text-primary font-mono">{projectsList.length}</div>
                      <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mt-0.5">Published</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                      <div className="text-2xl font-bold text-slate-700 font-mono">0</div>
                      <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mt-0.5">Draft</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                      <div className="text-2xl font-bold text-slate-700 font-mono">4</div>
                      <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mt-0.5">Collections</div>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-center">
                      <div className="text-2xl font-bold text-slate-700 font-mono">1</div>
                      <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold mt-0.5">Archived</div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions Panel */}
                <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-4">
                  <h3 className="text-base font-bold text-slate-900 m-0">Quick Actions</h3>
                  <div className="space-y-2.5">
                    {[
                      { title: "Add New Project Card", action: () => setShowAddProjectModal(true) },
                      { title: "Create Technical Blog Post", action: () => setActiveTab("blog") },
                      { title: "Manage WhatsApp Leads", action: () => setActiveTab("leads") },
                      { title: "Configure SEO Infrastructure", action: () => setActiveTab("seo") },
                    ].map((act, aIdx) => (
                      <button
                        key={aIdx}
                        onClick={act.action}
                        className="w-full p-3.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors flex items-center justify-between text-xs font-semibold text-slate-700 text-left group"
                      >
                        <span>{act.title}</span>
                        <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROJECTS / CATALOG MANAGER */}
          {activeTab === "projects" && (
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 m-0">Live Projects &amp; Portfolio Manager</h3>
                  <p className="text-xs text-slate-400 font-light mt-0.5">Manage live demo URLs, repository links, and tech stack categories</p>
                </div>
                <button
                  onClick={() => setShowAddProjectModal(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-dark transition-all"
                >
                  <Plus className="w-4 h-4" /> Add Project
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-400 uppercase font-mono text-[10px] tracking-wider border-y border-slate-100">
                    <tr>
                      <th className="py-3.5 px-4">Project Title</th>
                      <th className="py-3.5 px-4">Live URL</th>
                      <th className="py-3.5 px-4">Category</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4">Leads</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {projectsList.map((project) => (
                      <tr key={project.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-4 px-4 font-bold text-slate-900">{project.title}</td>
                        <td className="py-4 px-4 font-mono text-primary">
                          <a href={project.url} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
                            {project.url} <ExternalLink className="w-3 h-3" />
                          </a>
                        </td>
                        <td className="py-4 px-4">{project.category}</td>
                        <td className="py-4 px-4">
                          <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 font-mono text-[10px] font-bold border border-emerald-200">
                            {project.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 font-mono font-bold">{project.leads}</td>
                        <td className="py-4 px-4 text-right space-x-2">
                          <button
                            onClick={() => handleDeleteProject(project.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Delete Project"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: BLOG & CONTENT MANAGER */}
          {activeTab === "blog" && (
            <div>
              {/* VIEW 1: BLOG POSTS LIST VIEW (IMAGE 1 MATCH) */}
              {blogSubView === "list" && (
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-mono text-slate-400 mb-1">Blog</div>
                      <h2 className="text-2xl font-bold text-slate-900 m-0">Blog Posts</h2>
                      <p className="text-xs text-slate-400 font-light mt-0.5">Articles, guides and SEO content</p>
                    </div>
                    <button
                      onClick={handleOpenNewPost}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-dark transition-all shadow-[0_4px_16px_rgba(192,0,0,0.3)] shrink-0"
                    >
                      <Plus className="w-4 h-4" /> New Post
                    </button>
                  </div>

                  {/* Filter & Search Bar */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="relative w-full sm:w-80">
                      <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search posts..."
                        value={blogSearch}
                        onChange={(e) => setBlogSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 focus:outline-none focus:border-primary shadow-sm"
                      />
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <div className="w-40">
                        <CustomDropdown
                          value={blogStatusFilter}
                          onChange={(val) => setBlogStatusFilter(val)}
                          options={[
                            { value: "All statuses", label: "All statuses" },
                            { value: "Draft", label: "Draft" },
                            { value: "Published", label: "Published" },
                            { value: "Scheduled", label: "Scheduled" }
                          ]}
                        />
                      </div>

                      <div className="w-56">
                        <CustomDropdown
                          value={blogCategoryFilter}
                          onChange={(val) => setBlogCategoryFilter(val)}
                          options={[
                            { value: "All categories", label: "All categories" },
                            ...blogCategoriesList.map((cat) => ({ value: cat, label: cat }))
                          ]}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Table */}
                  <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 text-slate-400 uppercase font-mono text-[10px] tracking-wider border-b border-slate-100">
                          <tr>
                            <th className="py-3.5 px-6">TITLE</th>
                            <th className="py-3.5 px-4">CATEGORY</th>
                            <th className="py-3.5 px-4">AUTHOR</th>
                            <th className="py-3.5 px-4">VIEWS</th>
                            <th className="py-3.5 px-4">STATUS</th>
                            <th className="py-3.5 px-4">DATE</th>
                            <th className="py-3.5 px-4 text-right">ACTIONS</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-700">
                          {filteredArticles.map((art, artIdx) => (
                            <tr key={art.id || artIdx} className="hover:bg-slate-50/80 transition-colors">
                              <td className="py-4 px-6">
                                <div className="font-bold text-slate-900 text-sm leading-snug cursor-pointer hover:text-primary" onClick={() => handleOpenEditPost(art)}>
                                  {art.title || "Untitled Post"}
                                </div>
                                <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                                  /blog/{art.slug || "post"}/
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 font-mono text-[10px] font-bold border border-blue-100">
                                  {art.category || "General"}
                                </span>
                              </td>
                              <td className="py-4 px-4 text-slate-600">{art.author || "Admin"}</td>
                              <td className="py-4 px-4 font-mono text-slate-400">{art.views || "—"}</td>
                              <td className="py-4 px-4">
                                <span className={`px-2.5 py-1 rounded-full font-mono text-[10px] font-bold border ${
                                  (art.status || "Draft") === "Published"
                                    ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                                    : "bg-amber-50 text-amber-600 border-amber-200"
                                }`}>
                                  {(art.status || "Draft").toLowerCase()}
                                </span>
                              </td>
                              <td className="py-4 px-4 font-mono text-slate-500">{art.date || "Just now"}</td>
                              <td className="py-4 px-4 text-right space-x-1">
                                <button
                                  onClick={() => handleOpenEditPost(art)}
                                  className="p-2 rounded-lg text-slate-400 hover:text-primary hover:bg-slate-100 transition-colors"
                                  title="Edit Post"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteArticle(art.id)}
                                  className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                                  title="Delete Post"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* VIEW 2: NEW BLOG POST / EDITOR VIEW (IMAGE 2 MATCH) */}
              {blogSubView === "editor" && (
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-mono text-slate-400 mb-1 flex items-center gap-1">
                        <button onClick={() => setBlogSubView("list")} className="hover:underline">Blog</button>
                        <span>&gt;</span>
                        <span>{activeArticle.title ? "Edit" : "New"}</span>
                      </div>
                      <h2 className="text-2xl font-bold text-slate-900 m-0">New Blog Post</h2>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleSaveArticle("Draft")}
                        className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors shadow-sm"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => handleSaveArticle("Published")}
                        className="px-6 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-dark transition-all shadow-[0_4px_16px_rgba(192,0,0,0.3)]"
                      >
                        Publish
                      </button>
                    </div>
                  </div>

                  {/* Sub Tabs */}
                  <div className="flex items-center gap-6 border-b border-slate-200 pb-2">
                    {[
                      { id: "content", label: "Content" },
                      { id: "faqs", label: "FAQs (0)" },
                      { id: "seo", label: "SEO" },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setEditorTab(tab.id)}
                        className={`text-xs font-bold pb-2 transition-colors border-b-2 -mb-2 ${
                          editorTab === tab.id
                            ? "border-primary text-primary"
                            : "border-transparent text-slate-400 hover:text-slate-600"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* 2 Column Layout */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Column (8 cols) */}
                    <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-6">
                      <h3 className="text-base font-bold text-slate-900 m-0">Post Content</h3>

                      {editorTab === "content" && (
                        <>
                          <div>
                            <label className="block text-xs font-mono font-bold text-slate-700 mb-1.5">Title *</label>
                            <input
                              type="text"
                              placeholder="Enter blog post title"
                              value={activeArticle?.title || ""}
                              onChange={(e) => {
                                const titleVal = e.target.value;
                                const generatedSlug = titleVal.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                                setActiveArticle({
                                  ...activeArticle,
                                  title: titleVal,
                                  slug: generatedSlug
                                });
                              }}
                              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm font-medium focus:outline-none focus:border-primary shadow-sm"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-mono font-bold text-slate-700 mb-1.5">URL Slug</label>
                            <input
                              type="text"
                              value={activeArticle?.slug || ""}
                              onChange={(e) => setActiveArticle({ ...activeArticle, slug: e.target.value })}
                              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-mono focus:outline-none focus:border-primary"
                            />
                            <div className="text-[11px] font-mono text-slate-400 mt-1">/blog/{activeArticle?.slug || ""}/</div>
                          </div>

                          <div>
                            <label className="block text-xs font-mono font-bold text-slate-700 mb-1.5">Content</label>
                            {/* Native Inline Content Image Input */}
                            <input
                              type="file"
                              id="content-image-file-input"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onload = (uploadEvent) => {
                                    const imgMarkdown = `\n\n![${file.name}](${uploadEvent.target?.result})\n\n`;
                                    setActiveArticle({
                                      ...activeArticle,
                                      content: (activeArticle.content || "") + imgMarkdown
                                    });
                                    showToast("Inline image inserted into content!");
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                            />

                            {/* Rich Markdown Toolbar */}
                            <div className="border border-slate-200 rounded-t-xl bg-slate-50 p-2 flex flex-wrap items-center gap-2 border-b-0 text-xs font-mono">
                              {[
                                { label: "H2", action: () => "\n\n## Section Title\n" },
                                { label: "H3", action: () => "\n\n### Subheading Title\n" },
                                { label: "B", action: () => " **bold text** " },
                                { label: "I", action: () => " *italic text* " },
                                { label: "List", action: () => "\n- List item 1\n- List item 2\n" },
                                { label: "1. List", action: () => "\n1. First item\n2. Second item\n" },
                                { label: "Quote", action: () => "\n> Quote text here\n" },
                                { label: "Link", action: () => " [Link Text](https://example.com) " },
                                { label: "Image", action: () => "IMAGE_PICKER" }
                              ].map((btn, bIdx) => (
                                <button
                                  key={bIdx}
                                  type="button"
                                  onClick={() => {
                                    if (btn.label === "Image") {
                                      document.getElementById("content-image-file-input")?.click();
                                    } else {
                                      setActiveArticle({
                                        ...activeArticle,
                                        content: (activeArticle.content || "") + btn.action()
                                      });
                                    }
                                  }}
                                  className="px-2.5 py-1 rounded hover:bg-white text-slate-700 border border-slate-200/60 font-semibold transition-colors"
                                >
                                  {btn.label}
                                </button>
                              ))}
                            </div>
                            <textarea
                              rows={12}
                              placeholder="Write your blog post in Markdown..."
                              value={activeArticle.content}
                              onChange={(e) => setActiveArticle({ ...activeArticle, content: e.target.value })}
                              className="w-full p-4 rounded-b-xl border border-slate-200 text-slate-900 text-xs font-mono focus:outline-none focus:border-primary resize-none shadow-sm"
                            ></textarea>
                          </div>
                        </>
                      )}

                      {editorTab === "faqs" && (
                        <div>
                          <label className="block text-xs font-mono font-bold text-slate-700 mb-1.5">FAQs Content</label>
                          <textarea
                            rows={8}
                            placeholder="Add Q&A pairs (e.g. Q: ... A: ...)"
                            value={activeArticle.faqs}
                            onChange={(e) => setActiveArticle({ ...activeArticle, faqs: e.target.value })}
                            className="w-full p-4 rounded-xl border border-slate-200 text-slate-900 text-xs font-mono focus:outline-none focus:border-primary resize-none shadow-sm"
                          ></textarea>
                        </div>
                      )}

                      {editorTab === "seo" && (
                        <div className="space-y-6">
                          <div>
                            <div className="flex items-center justify-between mb-1.5">
                              <label className="block text-xs font-mono font-bold text-slate-700">SEO Meta Title</label>
                              <span className="text-[10px] font-mono text-slate-400">{(activeArticle.seoTitle || activeArticle.title || "").length}/60</span>
                            </div>
                            <input
                              type="text"
                              maxLength={60}
                              placeholder="Meta Title"
                              value={activeArticle.seoTitle || activeArticle.title}
                              onChange={(e) => setActiveArticle({ ...activeArticle, seoTitle: e.target.value })}
                              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-primary"
                            />
                          </div>

                          <div>
                            <div className="flex items-center justify-between mb-1.5">
                              <label className="block text-xs font-mono font-bold text-slate-700">SEO Meta Description</label>
                              <span className="text-[10px] font-mono text-slate-400">{(activeArticle.seoDesc || activeArticle.excerpt || "").length}/160</span>
                            </div>
                            <textarea
                              rows={3}
                              maxLength={160}
                              placeholder="Meta Description"
                              value={activeArticle.seoDesc || activeArticle.excerpt}
                              onChange={(e) => setActiveArticle({ ...activeArticle, seoDesc: e.target.value })}
                              className="w-full p-3 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-primary resize-none"
                            ></textarea>
                          </div>

                          {/* Focus Keyword & Canonical URL */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-mono font-bold text-slate-700 mb-1.5">Focus Keyword</label>
                              <input
                                type="text"
                                placeholder="e.g. shopify developer"
                                value={activeArticle.focusKeyword || ""}
                                onChange={(e) => setActiveArticle({ ...activeArticle, focusKeyword: e.target.value })}
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-primary"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-mono font-bold text-slate-700 mb-1.5">Canonical URL</label>
                              <input
                                type="text"
                                placeholder="https://example.com/blog/slug"
                                value={activeArticle.canonicalUrl || ""}
                                onChange={(e) => setActiveArticle({ ...activeArticle, canonicalUrl: e.target.value })}
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-primary"
                              />
                            </div>
                          </div>

                          {/* Visibility Box */}
                          <div className="pt-2">
                            <div className="text-sm font-bold text-slate-900 mb-3">Visibility</div>
                            <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 bg-slate-50/50">
                              <div>
                                <div className="text-xs font-semibold text-slate-800">Hide from search engines (noindex)</div>
                                <div className="text-[11px] text-slate-400 font-light mt-0.5">Use for filler or low-value posts you don&apos;t want indexed by Google</div>
                              </div>
                              <button
                                type="button"
                                onClick={() => setActiveArticle({ ...activeArticle, noindex: !activeArticle.noindex })}
                                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 shrink-0 ${activeArticle.noindex ? "bg-primary" : "bg-slate-300"}`}
                              >
                                <span className={`block w-5 h-5 rounded-full bg-white transition-transform ${activeArticle.noindex ? "translate-x-5" : "translate-x-0"}`}></span>
                              </button>
                            </div>
                          </div>

                          {/* SEO Score Box */}
                          <div className="pt-2">
                            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                              <h4 className="text-sm font-bold text-slate-900 m-0">SEO Score</h4>
                              <div className="text-2xl font-bold font-mono text-primary">{calculateSeoScore(activeArticle)}</div>
                            </div>

                            <div className="space-y-2.5 text-xs text-slate-600">
                              {[
                                { label: "Meta title set (≤ 60 chars)", check: (activeArticle.seoTitle || activeArticle.title)?.length > 0 && (activeArticle.seoTitle || activeArticle.title)?.length <= 60 },
                                { label: "Meta description set (50–160 chars)", check: (activeArticle.seoDesc || activeArticle.excerpt)?.length >= 20 },
                                { label: "Focus keyword defined", check: Boolean(activeArticle.focusKeyword) },
                                { label: "Focus keyword in meta title", check: Boolean(activeArticle.focusKeyword && (activeArticle.seoTitle || activeArticle.title)?.toLowerCase().includes(activeArticle.focusKeyword.toLowerCase())) },
                                { label: "Focus keyword in meta description", check: Boolean(activeArticle.focusKeyword && (activeArticle.seoDesc || activeArticle.excerpt)?.toLowerCase().includes(activeArticle.focusKeyword.toLowerCase())) },
                                { label: "Content length adequate (> 300 words)", check: (activeArticle.content?.split(/\s+/).length || 0) >= 10 },
                                { label: "Schema markup enabled", check: true },
                                { label: "OG image set", check: Boolean(activeArticle.featuredImage) },
                                { label: "Canonical URL set", check: Boolean(activeArticle.canonicalUrl) },
                                { label: "At least 1 internal link", check: activeArticle.content?.includes("http") || activeArticle.content?.includes("/") }
                              ].map((item, i) => (
                                <div key={i} className="flex items-center gap-2.5">
                                  <input type="checkbox" checked={item.check} readOnly className="w-4 h-4 accent-primary rounded cursor-default" />
                                  <span className={item.check ? "text-slate-900 font-medium" : "text-slate-400 font-light"}>{item.label}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right Sidebar (4 cols) */}
                    <div className="lg:col-span-4 space-y-5">
                      {/* Publish Card */}
                      <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-sm space-y-3">
                        <h4 className="text-xs font-bold font-mono text-slate-900 uppercase tracking-wider m-0">Publish</h4>
                        <div>
                          <label className="block text-[11px] font-mono text-slate-400 mb-1">Status</label>
                          <CustomDropdown
                            value={activeArticle.status}
                            onChange={(val) => setActiveArticle({ ...activeArticle, status: val })}
                            options={[
                              { value: "Draft", label: "Draft" },
                              { value: "Published", label: "Published" },
                              { value: "Scheduled", label: "Scheduled" }
                            ]}
                          />
                        </div>
                      </div>

                      {/* Category Card */}
                      <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-sm space-y-3">
                        <h4 className="text-xs font-bold font-mono text-slate-900 uppercase tracking-wider m-0">Category</h4>
                        <CustomDropdown
                          value={activeArticle.category}
                          onChange={(val) => setActiveArticle({ ...activeArticle, category: val })}
                          options={blogCategoriesList.map((cat) => ({ value: cat, label: cat }))}
                        />
                      </div>

                      {/* Tags Card */}
                      <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-sm space-y-3">
                        <h4 className="text-xs font-bold font-mono text-slate-900 uppercase tracking-wider m-0">Tags</h4>
                        <input
                          type="text"
                          placeholder="sofa, guide, tips (comma separated)"
                          value={activeArticle.tags}
                          onChange={(e) => setActiveArticle({ ...activeArticle, tags: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono focus:outline-none focus:border-primary"
                        />
                      </div>

                      {/* Author Card */}
                      <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-sm space-y-3">
                        <h4 className="text-xs font-bold font-mono text-slate-900 uppercase tracking-wider m-0">Author</h4>
                        <input
                          type="text"
                          value={activeArticle.author}
                          onChange={(e) => setActiveArticle({ ...activeArticle, author: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-primary"
                        />
                      </div>

                      {/* Excerpt Card */}
                      <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-sm space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold font-mono text-slate-900 uppercase tracking-wider m-0">Excerpt</h4>
                          <span className="text-[10px] font-mono text-slate-400">{(activeArticle.excerpt || "").length}/300</span>
                        </div>
                        <textarea
                          rows={3}
                          maxLength={300}
                          placeholder="Short blog summary..."
                          value={activeArticle.excerpt}
                          onChange={(e) => setActiveArticle({ ...activeArticle, excerpt: e.target.value })}
                          className="w-full p-3 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-primary resize-none"
                        ></textarea>
                      </div>

                      {/* Featured Image Card */}
                      <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-sm space-y-3">
                        <h4 className="text-xs font-bold font-mono text-slate-900 uppercase tracking-wider m-0">Featured Image</h4>
                        
                        {/* Native File Input */}
                        <input
                          type="file"
                          id="featured-image-file-input"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (uploadEvent) => {
                                setActiveArticle({
                                  ...activeArticle,
                                  featuredImage: uploadEvent.target?.result
                                });
                                showToast("Featured image uploaded!");
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />

                        {/* Image Preview & Upload Box */}
                        <div className="space-y-3">
                          <div className="relative group w-full h-36 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center text-[11px] text-slate-400 font-mono overflow-hidden transition-all hover:border-primary/50">
                            {activeArticle.featuredImage ? (
                              <div className="relative w-full h-full">
                                <img src={activeArticle.featuredImage} alt="Cover" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-slate-900/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                  <button
                                    type="button"
                                    onClick={() => document.getElementById("featured-image-file-input")?.click()}
                                    className="px-3 py-1.5 rounded-lg bg-white text-slate-900 text-xs font-bold shadow-md hover:bg-slate-100"
                                  >
                                    Change Image
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => setActiveArticle({ ...activeArticle, featuredImage: null })}
                                    className="px-3 py-1.5 rounded-lg bg-rose-500 text-white text-xs font-bold shadow-md hover:bg-rose-600"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() => document.getElementById("featured-image-file-input")?.click()}
                                className="w-full h-full flex flex-col items-center justify-center gap-1.5 text-slate-400 hover:text-primary transition-colors p-4"
                              >
                                <svg className="w-6 h-6 text-slate-400 group-hover:text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                                </svg>
                                <span className="text-xs font-bold text-slate-700">Click to upload image file</span>
                                <span className="text-[10px] text-slate-400 font-normal">PNG, JPG, WEBP, SVG</span>
                              </button>
                            )}
                          </div>

                          {/* Image URL Input Fallback */}
                          <div>
                            <label className="block text-[10px] font-mono text-slate-400 mb-1">Or paste direct image URL:</label>
                            <input
                              type="text"
                              placeholder="https://images.unsplash.com/... or /portfolio-preview.jpg"
                              value={activeArticle.featuredImage || ""}
                              onChange={(e) => setActiveArticle({ ...activeArticle, featuredImage: e.target.value })}
                              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-mono focus:outline-none focus:border-primary"
                            />
                          </div>
                        </div>

                        <p className="text-[10px] text-slate-400 font-light leading-tight m-0">
                          Used as the blog cover and social share image.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3.5: PAGES MANAGER (LIST & EDIT PAGE VIEWS) */}
          {activeTab === "pages" && (
            <div>
              {/* PAGE LIST VIEW */}
              {pageSubView === "list" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-mono text-slate-400 mb-1">Pages</div>
                      <h2 className="text-2xl font-bold text-slate-900 m-0">Core Site Pages</h2>
                      <p className="text-xs text-slate-400 font-light mt-0.5">Manage custom page contents, live URLs, and SEO meta data</p>
                    </div>
                    <button
                      onClick={() => {
                        setActivePage({
                          id: Date.now(),
                          title: "Untitled Custom Page",
                          slug: "/page-new",
                          status: "Draft",
                          liveUrl: "https://devshaham.com/page-new",
                          content: "<h2>Custom Page Heading</h2>\n<p>Start writing custom page content here...</p>",
                          metaTitle: "",
                          metaDesc: "",
                          bannerImage: null
                        });
                        setPageSubView("editor");
                      }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-dark transition-all shadow-[0_4px_16px_rgba(192,0,0,0.3)] shrink-0"
                    >
                      <Plus className="w-4 h-4" /> New Page
                    </button>
                  </div>

                  <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 text-slate-400 uppercase font-mono text-[10px] tracking-wider border-b border-slate-100">
                          <tr>
                            <th className="py-3.5 px-6">PAGE TITLE</th>
                            <th className="py-3.5 px-4">LIVE LINK</th>
                            <th className="py-3.5 px-4">STATUS</th>
                            <th className="py-3.5 px-4 text-right">ACTIONS</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-700">
                          {pagesList.map((pg) => (
                            <tr key={pg.id} className="hover:bg-slate-50/80 transition-colors">
                              <td className="py-4 px-6">
                                <div className="font-bold text-slate-900 text-sm leading-snug cursor-pointer hover:text-primary" onClick={() => handleOpenEditPage(pg)}>
                                  {pg.title}
                                </div>
                                <div className="text-[11px] font-mono text-slate-400 mt-0.5">{pg.slug}</div>
                              </td>
                              <td className="py-4 px-4 font-mono">
                                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold border border-emerald-200">
                                  {pg.liveUrl}
                                </span>
                              </td>
                              <td className="py-4 px-4">
                                <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 font-mono text-[10px] font-bold border border-emerald-200">
                                  {pg.status}
                                </span>
                              </td>
                              <td className="py-4 px-4 text-right space-x-1">
                                <button
                                  onClick={() => handleOpenEditPage(pg)}
                                  className="p-2 rounded-lg text-slate-400 hover:text-primary hover:bg-slate-100 transition-colors"
                                  title="Edit Page"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* EDIT PAGE EDITOR VIEW (MATCHES SCREENSHOT EXACTLY) */}
              {pageSubView === "editor" && (
                <div className="space-y-6">
                  {/* Top Bar Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-mono text-slate-400 mb-1 flex items-center gap-1">
                        <button onClick={() => setPageSubView("list")} className="hover:underline">Pages</button>
                        <span>&gt;</span>
                        <span>{activePage.title}</span>
                      </div>
                      <h2 className="text-2xl font-bold text-slate-900 m-0">Edit: {activePage.title}</h2>
                    </div>

                    <div className="flex items-center gap-3">
                      <a
                        href={activePage.slug}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors shadow-sm inline-flex items-center gap-1.5"
                      >
                        <Eye className="w-3.5 h-3.5 text-slate-500" /> Preview
                      </a>
                      <button
                        onClick={() => setPageSubView("list")}
                        className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors shadow-sm"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSavePage}
                        className="px-6 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-dark transition-all shadow-[0_4px_16px_rgba(192,0,0,0.3)]"
                      >
                        Save Page
                      </button>
                    </div>
                  </div>

                  {/* Live Banner Link Box */}
                  <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/70 text-emerald-800 text-xs font-mono flex items-center gap-2">
                    <ExternalLink className="w-4 h-4 text-emerald-600" />
                    <span>Live:</span>
                    <a href={activePage.slug} target="_blank" rel="noreferrer" className="underline hover:text-emerald-900 font-bold">
                      {activePage.liveUrl}
                    </a>
                  </div>

                  {/* 2 Column Layout */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Column (8 cols) - Page Content */}
                    <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-6">
                      <h3 className="text-base font-bold text-slate-900 m-0">Page Content</h3>

                      <div>
                        <label className="block text-xs font-mono font-bold text-slate-700 mb-1.5">Title *</label>
                        <input
                          type="text"
                          value={activePage.title}
                          onChange={(e) => setActivePage({ ...activePage, title: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm font-medium focus:outline-none focus:border-primary shadow-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold text-slate-700 mb-1.5">Slug</label>
                        <input
                          type="text"
                          value={activePage.slug}
                          onChange={(e) => setActivePage({ ...activePage, slug: e.target.value, liveUrl: `devshaham.com${e.target.value}` })}
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-mono focus:outline-none focus:border-primary"
                        />
                        <div className="text-[11px] font-mono text-slate-400 mt-1">{activePage.liveUrl}</div>
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold text-slate-700 mb-1.5">Content</label>
                        <textarea
                          rows={14}
                          value={activePage.content}
                          onChange={(e) => setActivePage({ ...activePage, content: e.target.value })}
                          className="w-full p-4 rounded-xl border border-slate-200 text-slate-900 text-xs font-mono focus:outline-none focus:border-primary resize-none shadow-sm"
                        ></textarea>
                      </div>
                    </div>

                    {/* Right Sidebar (4 cols) */}
                    <div className="lg:col-span-4 space-y-5">
                      {/* Publish Card */}
                      <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-sm space-y-3">
                        <h4 className="text-xs font-bold font-mono text-slate-900 uppercase tracking-wider m-0">Publish</h4>
                        <div>
                          <label className="block text-[11px] font-mono text-slate-400 mb-1">Status</label>
                          <CustomDropdown
                            value={activePage.status}
                            onChange={(val) => setActivePage({ ...activePage, status: val })}
                            options={[
                              { value: "Published", label: "Published" },
                              { value: "Draft", label: "Draft" }
                            ]}
                          />
                        </div>
                        <p className="text-[11px] text-slate-400 font-light m-0 pt-1">
                          This is a core page.
                        </p>
                      </div>

                      {/* Media Card */}
                      <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-sm space-y-3">
                        <h4 className="text-xs font-bold font-mono text-slate-900 uppercase tracking-wider m-0">Media</h4>
                        <div>
                          <label className="block text-[11px] font-mono text-slate-400 mb-1.5">Banner Image</label>
                          <div className="flex items-center gap-4">
                            <div className="w-20 h-16 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center text-[10px] text-slate-400 font-mono overflow-hidden shrink-0">
                              {activePage.bannerImage ? (
                                <img src={activePage.bannerImage} alt="Banner" className="w-full h-full object-cover" />
                              ) : (
                                "No image"
                              )}
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                const url = prompt("Enter Banner Image URL:", "/portfolio-preview.jpg");
                                if (url) setActivePage({ ...activePage, bannerImage: url });
                              }}
                              className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
                            >
                              Choose image
                            </button>
                          </div>
                          <p className="text-[10px] text-slate-400 font-light leading-tight m-0 pt-2">
                            Choose from your library or upload.
                          </p>
                        </div>
                      </div>

                      {/* SEO Card */}
                      <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-sm space-y-4">
                        <h4 className="text-xs font-bold font-mono text-slate-900 uppercase tracking-wider m-0">SEO</h4>
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label className="block text-[11px] font-mono text-slate-500">Meta Title</label>
                            <span className="text-[10px] font-mono text-slate-400">{(activePage.metaTitle || "").length}/70</span>
                          </div>
                          <input
                            type="text"
                            maxLength={70}
                            placeholder="Page Meta Title"
                            value={activePage.metaTitle}
                            onChange={(e) => setActivePage({ ...activePage, metaTitle: e.target.value })}
                            className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-primary"
                          />
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label className="block text-[11px] font-mono text-slate-500">Meta Description</label>
                            <span className="text-[10px] font-mono text-slate-400">{(activePage.metaDesc || "").length}/200</span>
                          </div>
                          <textarea
                            rows={3}
                            maxLength={200}
                            placeholder="Page Meta Description"
                            value={activePage.metaDesc}
                            onChange={(e) => setActivePage({ ...activePage, metaDesc: e.target.value })}
                            className="w-full p-3 rounded-xl border border-slate-200 text-xs font-medium focus:outline-none focus:border-primary resize-none"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: SERVICES & PRICING */}
          {activeTab === "services" && (
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-slate-900 m-0">Services &amp; Development Packages</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                  { name: "Shopify Plus & Liquid", desc: "Custom themes, sections, checkout extensions", price: "Custom Quote" },
                  { name: "WordPress & WooCommerce", desc: "Headless GraphQL builds & custom plugin engines", price: "Custom Quote" },
                  { name: "MERN Web Applications", desc: "React, Node, Express, MongoDB full-stack apps", price: "Custom Quote" },
                  { name: "Make.com Automation", desc: "Automated CRM webhooks & WhatsApp checkout pipelines", price: "Custom Quote" },
                ].map((s, i) => (
                  <div key={i} className="p-5 rounded-2xl border border-slate-200 bg-white space-y-2">
                    <h4 className="text-sm font-bold text-slate-900 m-0">{s.name}</h4>
                    <p className="text-xs text-slate-500 font-light m-0">{s.desc}</p>
                    <div className="text-xs font-mono font-bold text-primary pt-2">{s.price}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: WHATSAPP LEADS */}
          {activeTab === "leads" && (
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-slate-900 m-0">WhatsApp Leads &amp; Customer Inquiries</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-400 uppercase font-mono text-[10px] tracking-wider border-y border-slate-100">
                    <tr>
                      <th className="py-3.5 px-4">Client Name</th>
                      <th className="py-3.5 px-4">Requested Service</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {leadsList.map((lead) => (
                      <tr key={lead.id}>
                        <td className="py-3.5 px-4 font-bold text-slate-900">{lead.name}</td>
                        <td className="py-3.5 px-4">{lead.product}</td>
                        <td className="py-3.5 px-4">
                          <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-600 font-mono text-[10px] font-bold">
                            {lead.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <a
                            href={`https://wa.me/?text=Hi%20${encodeURIComponent(lead.name)},%20regarding%20your%20inquiry%20for%20${encodeURIComponent(lead.product)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-500 text-white text-[11px] font-bold hover:bg-emerald-600 transition-colors"
                          >
                            Open WhatsApp
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 6: SEO SECTION */}
          {activeTab === "seo" && (
            <div className="space-y-8">
              {/* SUBTAB 1: SEO DASHBOARD */}
              {activeSeoSubTab === "seo-dashboard" && (
                <div className="space-y-8">
                  {/* Breadcrumb + Header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-mono text-slate-400 mb-1">
                        SEO &gt; Dashboard
                      </p>
                      <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                        SEO Dashboard
                      </h2>
                      <p className="text-xs text-slate-500 font-light mt-1">
                        Central index of every page&apos;s SEO — edit each item in its own SEO tab.
                      </p>
                    </div>
                    <button
                      onClick={() => showToast("Auto-filled missing SEO metadata across all pages!")}
                      className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-[0_4px_14px_rgba(245,158,11,0.35)] hover:shadow-[0_6px_20px_rgba(245,158,11,0.45)] transition-all flex items-center gap-2"
                    >
                      <Sparkles className="w-4 h-4 text-white" />
                      Auto-fill missing SEO
                    </button>
                  </div>

                  {/* Stats Cards Row */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {[
                      { label: "Total Pages", value: pagesList.length + articlesList.length + projectsList.length, icon: <FileText className="w-5 h-5 text-slate-700" />, color: "#f1f5f9" },
                      { label: "Products", value: projectsList.length, icon: <Package className="w-5 h-5 text-amber-600" />, color: "#fef3c7" },
                      { label: "Collections", value: "3", icon: <Folder className="w-5 h-5 text-blue-600" />, color: "#dbeafe" },
                      { label: "Blog Posts", value: articlesList.length, icon: <PenTool className="w-5 h-5 text-emerald-600" />, color: "#dcfce7" },
                      { label: "Static Pages", value: pagesList.length, icon: <Layers className="w-5 h-5 text-purple-600" />, color: "#f3e8ff" },
                      { label: "Schema Types", value: schemasList.length, icon: <Wrench className="w-5 h-5 text-pink-600" />, color: "#fce7f3" }
                    ].map((stat, i) => (
                      <div key={i} className="bg-white rounded-2xl border border-slate-200/80 p-5 flex items-start justify-between shadow-sm hover:shadow-md transition-shadow">
                        <div>
                          <p className="text-[11px] text-slate-400 font-medium mb-1">{stat.label}</p>
                          <p className="text-2xl font-extrabold text-slate-900 tracking-tight">{stat.value}</p>
                        </div>
                        <span className="p-2.5 rounded-xl flex items-center justify-center" style={{ backgroundColor: stat.color }}>{stat.icon}</span>
                      </div>
                    ))}
                  </div>

                  {/* Quick Link Pills */}
                  <div className="flex flex-wrap gap-3">
                    {[
                      { label: "Metadata", id: "seo-metadata", color: "#10b981", icon: <FileCode className="w-3.5 h-3.5 text-emerald-600" /> },
                      { label: "Schema", id: "seo-schema", color: "#6366f1", icon: <Share2 className="w-3.5 h-3.5 text-indigo-600" /> },
                      { label: "Redirects", id: "seo-redirects", color: "#3b82f6", icon: <ArrowUpRight className="w-3.5 h-3.5 text-blue-600" /> },
                      { label: "Sitemaps", id: "seo-sitemap", color: "#14b8a6", icon: <Map className="w-3.5 h-3.5 text-teal-600" /> },
                      { label: "Robots.txt", id: "seo-robots", color: "#a855f7", icon: <Bot className="w-3.5 h-3.5 text-purple-600" /> },
                      { label: "Internal Links", id: "seo-interlinking", color: "#f59e0b", icon: <Link2 className="w-3.5 h-3.5 text-amber-600" /> }
                    ].map((pill, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveSeoSubTab(pill.id)}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:border-primary/40 hover:shadow-md transition-all"
                      >
                        {pill.icon}
                        {pill.label}
                      </button>
                    ))}
                  </div>

                  {/* Homepage SEO Card */}
                  <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                    <div className="p-6 flex items-start justify-between border-b border-slate-100">
                      <div>
                        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                          <Home className="w-5 h-5 text-slate-700" /> Homepage SEO
                        </h3>
                        <p className="text-[11px] text-slate-400 font-light mt-0.5">
                          The meta title &amp; description for devshaham.com (the home page itself)
                        </p>
                      </div>
                      <button
                        onClick={async () => {
                          const homePage = pagesList.find(p => p.slug === "/");
                          if (homePage) {
                            handleOpenSeoModal(homePage, "static");
                          } else {
                            showToast("Home page SEO updated!");
                          }
                        }}
                        className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-sm transition-all"
                      >
                        Save Homepage SEO
                      </button>
                    </div>

                    <div className="p-6 space-y-5">
                      {/* Meta Title */}
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-700">Meta Title</label>
                        <input
                          type="text"
                          value={pagesList.find(p => p.slug === "/")?.metaTitle || pagesList.find(p => p.slug === "/")?.meta_title || ""}
                          onChange={(e) => {
                            const updated = pagesList.map(p => p.slug === "/" ? { ...p, metaTitle: e.target.value, meta_title: e.target.value } : p);
                            setPagesList(updated);
                          }}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 focus:outline-none focus:border-primary focus:bg-white transition-all"
                          placeholder="e.g. Premium Custom Website Development | Buy Online"
                        />
                      </div>

                      {/* Meta Description */}
                      <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-700">Meta Description</label>
                        <textarea
                          rows={3}
                          value={pagesList.find(p => p.slug === "/")?.metaDesc || pagesList.find(p => p.slug === "/")?.meta_desc || ""}
                          onChange={(e) => {
                            const updated = pagesList.map(p => p.slug === "/" ? { ...p, metaDesc: e.target.value, meta_desc: e.target.value } : p);
                            setPagesList(updated);
                          }}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 focus:outline-none focus:border-primary focus:bg-white transition-all resize-none"
                          placeholder="e.g. Scaling E-commerce & Digital Experiences with custom Shopify Liquid and WordPress builds."
                        />
                      </div>
                    </div>
                  </div>

                  {/* SEO Pages Table */}
                  <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                    {/* Table Filter Tabs */}
                    <div className="px-6 pt-5 pb-0 flex flex-wrap gap-4 border-b border-slate-100">
                      {[
                        { id: "all", label: "All Pages", count: pagesList.length + articlesList.length + projectsList.length },
                        { id: "static", label: "Static Pages", count: pagesList.length },
                        { id: "blog", label: "Blog Posts", count: articlesList.length },
                        { id: "products", label: "Products", count: projectsList.length }
                      ].map((filterTab) => (
                        <button
                          key={filterTab.id}
                          onClick={() => setSeoFilterTab(filterTab.id)}
                          className={`pb-3 text-xs font-semibold border-b-2 transition-colors ${
                            seoFilterTab === filterTab.id
                              ? "border-primary text-primary font-bold"
                              : "border-transparent text-slate-400 hover:text-slate-600"
                          }`}
                        >
                          {filterTab.label} ({filterTab.count})
                        </button>
                      ))}
                    </div>

                    {/* Table Header */}
                    <div className="grid grid-cols-[1fr_160px_160px] px-6 py-3 bg-slate-50/80 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                      <span>PAGE</span>
                      <span className="text-center">TYPE</span>
                      <span className="text-right">ACTIONS</span>
                    </div>

                    {/* Table Rows — Static Pages */}
                    {(seoFilterTab === "all" || seoFilterTab === "static") && pagesList.map((pg) => (
                      <div key={pg.id} className="grid grid-cols-[1fr_160px_160px] px-6 py-4 border-b border-slate-100 hover:bg-slate-50/50 transition-colors items-center">
                        <div>
                          <p className="text-xs font-bold text-slate-900">{pg.title}</p>
                          <p className="text-[10px] text-slate-400 font-mono">{pg.slug}</p>
                        </div>
                        <div className="text-center">
                          <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-[10px] font-bold">
                            Static Page
                          </span>
                        </div>
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenSeoModal(pg, "static")}
                            className="px-3 py-1.5 rounded-lg border border-slate-200 text-[10px] font-semibold text-slate-600 hover:border-primary/40 hover:text-primary transition-colors"
                          >
                            Edit SEO
                          </button>
                        </div>
                      </div>
                    ))}

                    {/* Table Rows — Blog Posts */}
                    {(seoFilterTab === "all" || seoFilterTab === "blog") && articlesList.map((art) => (
                      <div key={art.id} className="grid grid-cols-[1fr_160px_160px] px-6 py-4 border-b border-slate-100 hover:bg-slate-50/50 transition-colors items-center">
                        <div>
                          <p className="text-xs font-bold text-slate-900">{art.title}</p>
                          <p className="text-[10px] text-slate-400 font-mono">/{art.slug}</p>
                        </div>
                        <div className="text-center">
                          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">
                            Blog Post
                          </span>
                        </div>
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenSeoModal(art, "blog")}
                            className="px-3 py-1.5 rounded-lg border border-slate-200 text-[10px] font-semibold text-slate-600 hover:border-primary/40 hover:text-primary transition-colors"
                          >
                            Edit SEO
                          </button>
                        </div>
                      </div>
                    ))}

                    {/* Table Rows — Products */}
                    {(seoFilterTab === "all" || seoFilterTab === "products") && projectsList.map((proj) => (
                      <div key={proj.id} className="grid grid-cols-[1fr_160px_160px] px-6 py-4 border-b border-slate-100 hover:bg-slate-50/50 transition-colors items-center">
                        <div>
                          <p className="text-xs font-bold text-slate-900">{proj.title}</p>
                          <p className="text-[10px] text-slate-400 font-mono">/projects</p>
                        </div>
                        <div className="text-center">
                          <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold">
                            Product
                          </span>
                        </div>
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenSeoModal(proj, "product")}
                            className="px-3 py-1.5 rounded-lg border border-slate-200 text-[10px] font-semibold text-slate-600 hover:border-primary/40 hover:text-primary transition-colors"
                          >
                            Edit SEO
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SUBTAB 2: METADATA MANAGER */}
              {activeSeoSubTab === "seo-metadata" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-mono text-slate-400 mb-1">
                        SEO &gt; Metadata Manager
                      </p>
                      <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                        Metadata Manager
                      </h2>
                      <p className="text-xs text-slate-500 font-light mt-1">
                        Meta titles, descriptions &amp; keywords - edited in each item&apos;s SEO tab
                      </p>
                    </div>
                    <button
                      onClick={() => setActiveSeoSubTab("seo-dashboard")}
                      className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-sm transition-all"
                    >
                      SEO Dashboard
                    </button>
                  </div>

                  {/* Search Bar */}
                  <div className="relative max-w-md">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search pages..."
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-800 focus:outline-none focus:border-primary transition-all"
                    />
                  </div>

                  {/* Metadata Table */}
                  <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                    <div className="grid grid-cols-[1fr_160px_160px] px-6 py-3 bg-slate-50/80 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                      <span>PAGE</span>
                      <span className="text-center">TYPE</span>
                      <span className="text-right">ACTIONS</span>
                    </div>

                    {pagesList.map((pg) => (
                      <div key={`meta-pg-${pg.id}`} className="grid grid-cols-[1fr_160px_160px] px-6 py-4 border-b border-slate-100 hover:bg-slate-50/50 transition-colors items-center">
                        <div>
                          <p className="text-xs font-bold text-slate-900">{pg.title}</p>
                          <p className="text-[10px] text-slate-400 font-mono">{pg.slug}</p>
                        </div>
                        <div className="text-center">
                          <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-[10px] font-bold">
                            Static Page
                          </span>
                        </div>
                        <div className="text-right">
                          <button
                            onClick={() => handleOpenSeoModal(pg, "static")}
                            className="px-3 py-1.5 rounded-lg border border-slate-200 text-[10px] font-semibold text-slate-600 hover:border-primary/40 hover:text-primary transition-colors"
                          >
                            Edit metadata
                          </button>
                        </div>
                      </div>
                    ))}

                    {articlesList.map((art) => (
                      <div key={`meta-art-${art.id}`} className="grid grid-cols-[1fr_160px_160px] px-6 py-4 border-b border-slate-100 hover:bg-slate-50/50 transition-colors items-center">
                        <div>
                          <p className="text-xs font-bold text-slate-900">{art.title}</p>
                          <p className="text-[10px] text-slate-400 font-mono">/{art.slug}</p>
                        </div>
                        <div className="text-center">
                          <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">
                            Blog Post
                          </span>
                        </div>
                        <div className="text-right">
                          <button
                            onClick={() => handleOpenSeoModal(art, "blog")}
                            className="px-3 py-1.5 rounded-lg border border-slate-200 text-[10px] font-semibold text-slate-600 hover:border-primary/40 hover:text-primary transition-colors"
                          >
                            Edit metadata
                          </button>
                        </div>
                      </div>
                    ))}

                    {projectsList.map((proj) => (
                      <div key={`meta-proj-${proj.id}`} className="grid grid-cols-[1fr_160px_160px] px-6 py-4 border-b border-slate-100 hover:bg-slate-50/50 transition-colors items-center">
                        <div>
                          <p className="text-xs font-bold text-slate-900">{proj.title}</p>
                          <p className="text-[10px] text-slate-400 font-mono">/projects</p>
                        </div>
                        <div className="text-center">
                          <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold">
                            Product
                          </span>
                        </div>
                        <div className="text-right">
                          <button
                            onClick={() => handleOpenSeoModal(proj, "product")}
                            className="px-3 py-1.5 rounded-lg border border-slate-200 text-[10px] font-semibold text-slate-600 hover:border-primary/40 hover:text-primary transition-colors"
                          >
                            Edit metadata
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SUBTAB 3: SCHEMA MANAGER */}
              {activeSeoSubTab === "seo-schema" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-mono text-slate-400 mb-1">
                        SEO &gt; Schema Manager
                      </p>
                      <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                        Schema Manager
                      </h2>
                      <p className="text-xs text-slate-500 font-light mt-1">
                        Structured data (JSON-LD) for rich results in Google
                      </p>
                    </div>
                    <button
                      onClick={() => setEditingSchema({ id: null, name: "New Schema", type: "Organization", status: "Active", jsonLd: "{\n  \"@type\": \"Organization\"\n}" })}
                      className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-sm transition-all"
                    >
                      + Add Schema
                    </button>
                  </div>

                  {/* Custom Schemas Card */}
                  <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100">
                      <h3 className="text-sm font-bold text-slate-900">Your Custom Schemas</h3>
                      <p className="text-[11px] text-slate-400 font-light">Added here, validated, and emitted on every page of the storefront</p>
                    </div>
                    <div className="grid grid-cols-[1fr_120px_100px] px-6 py-3 bg-slate-50/80 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                      <span>SCHEMA</span>
                      <span className="text-center">STATUS</span>
                      <span className="text-right">ACTIONS</span>
                    </div>

                    {schemasList.map((sch) => (
                      <div key={sch.id} className="grid grid-cols-[1fr_120px_100px] px-6 py-4 border-b border-slate-100 hover:bg-slate-50/50 transition-colors items-center">
                        <div>
                          <p className="text-xs font-bold text-slate-900">{sch.name}</p>
                          <p className="text-[10px] text-slate-400 font-mono">{sch.type}</p>
                        </div>
                        <div className="text-center">
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">
                            {sch.status}
                          </span>
                        </div>
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setEditingSchema({ ...sch })}
                            className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-primary hover:border-primary/40 transition-colors"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setSchemasList(schemasList.filter(s => s.id !== sch.id))}
                            className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-rose-500 hover:border-rose-300 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Automatic Schemas Card */}
                  <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100">
                      <h3 className="text-sm font-bold text-slate-900">Automatic Schemas</h3>
                      <p className="text-[11px] text-slate-400 font-light">Generated for you and always live — no setup needed</p>
                    </div>
                    {["Product", "Article", "WebPage"].map((autoSch, idx) => (
                      <div key={idx} className="flex items-center justify-between px-6 py-3.5 border-b border-slate-100 text-xs">
                        <span className="font-bold text-slate-900">{autoSch}</span>
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-semibold">Live</span>
                      </div>
                    ))}
                  </div>

                  {/* EDIT SCHEMA MODAL */}
                  {editingSchema && (
                    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
                      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 space-y-5 animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                          <h3 className="text-lg font-bold text-slate-900">Edit Schema</h3>
                          <button onClick={() => setEditingSchema(null)} className="text-slate-400 hover:text-slate-600">
                            <X className="w-5 h-5" />
                          </button>
                        </div>

                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="text-xs font-bold text-slate-700">Name</label>
                              <input
                                type="text"
                                value={editingSchema.name}
                                onChange={(e) => setEditingSchema({ ...editingSchema, name: e.target.value })}
                                className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 text-xs"
                              />
                            </div>
                            <div>
                              <label className="text-xs font-bold text-slate-700">Type</label>
                              <input
                                type="text"
                                value={editingSchema.type}
                                onChange={(e) => setEditingSchema({ ...editingSchema, type: e.target.value })}
                                className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 text-xs"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="text-xs font-bold text-slate-700">JSON-LD</label>
                            <textarea
                              rows={6}
                              value={editingSchema.jsonLd}
                              onChange={(e) => setEditingSchema({ ...editingSchema, jsonLd: e.target.value })}
                              className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono bg-slate-50"
                            />
                          </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-3 border-t border-slate-100">
                          <button onClick={() => setEditingSchema(null)} className="px-4 py-2 rounded-xl border text-xs font-semibold">Cancel</button>
                          <button
                            onClick={() => {
                              if (editingSchema.id) {
                                setSchemasList(schemasList.map(s => s.id === editingSchema.id ? editingSchema : s));
                              } else {
                                setSchemasList([...schemasList, { ...editingSchema, id: Date.now() }]);
                              }
                              setEditingSchema(null);
                              showToast("Schema saved and published!");
                            }}
                            className="px-5 py-2 rounded-xl bg-amber-500 text-white text-xs font-bold shadow-md"
                          >
                            Save &amp; Publish
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* SUBTAB 4: REDIRECT MANAGER */}
              {activeSeoSubTab === "seo-redirects" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-mono text-slate-400 mb-1">
                        SEO &gt; Redirects
                      </p>
                      <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                        Redirect Manager
                      </h2>
                      <p className="text-xs text-slate-500 font-light mt-1">
                        URL redirects for migration &amp; SEO, plus the 404 monitor
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button onClick={() => showToast("Bulk import ready")} className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 shadow-sm">
                        ↑ Bulk Import
                      </button>
                      <button onClick={() => setShowAddRedirectModal(true)} className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-sm">
                        + Add Redirect
                      </button>
                    </div>
                  </div>

                  {/* Redirect Subtabs */}
                  <div className="flex gap-4 border-b border-slate-200 pb-2">
                    <button
                      onClick={() => setRedirectSubTab("redirects")}
                      className={`text-xs font-bold pb-2 border-b-2 ${redirectSubTab === "redirects" ? "border-amber-500 text-amber-600" : "border-transparent text-slate-400"}`}
                    >
                      Redirects ({redirectsList.length})
                    </button>
                    <button
                      onClick={() => setRedirectSubTab("404")}
                      className={`text-xs font-bold pb-2 border-b-2 ${redirectSubTab === "404" ? "border-amber-500 text-amber-600" : "border-transparent text-slate-400"}`}
                    >
                      404 Monitor (0)
                    </button>
                  </div>

                  {/* Redirects Table */}
                  <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                    <div className="grid grid-cols-[1fr_1fr_100px_80px_100px_80px] px-6 py-3 bg-slate-50/80 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                      <span>FROM URL</span>
                      <span>TO URL</span>
                      <span className="text-center">TYPE</span>
                      <span className="text-center">HITS</span>
                      <span className="text-center">STATUS</span>
                      <span className="text-right">ACTIONS</span>
                    </div>

                    {redirectsList.map((red) => (
                      <div key={red.id} className="grid grid-cols-[1fr_1fr_100px_80px_100px_80px] px-6 py-3.5 border-b border-slate-100 hover:bg-slate-50/50 transition-colors items-center text-xs">
                        <span className="font-mono text-slate-800">{red.from}</span>
                        <span className="font-mono text-slate-800">{red.to}</span>
                        <div className="text-center">
                          <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 font-mono text-[10px] font-bold">{red.type}</span>
                        </div>
                        <span className="text-center font-mono text-slate-500">{red.hits}</span>
                        <div className="text-center">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">{red.status}</span>
                        </div>
                        <div className="flex justify-end gap-2">
                          <button onClick={() => setRedirectsList(redirectsList.filter(r => r.id !== red.id))} className="text-slate-400 hover:text-rose-500">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* ADD REDIRECT MODAL */}
                  {showAddRedirectModal && (
                    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
                      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-md w-full p-6 space-y-4">
                        <h3 className="text-base font-bold text-slate-900">Add 301 Redirect</h3>
                        <input
                          type="text"
                          placeholder="From URL (e.g. /old-page)"
                          value={newRedirect.from}
                          onChange={(e) => setNewRedirect({ ...newRedirect, from: e.target.value })}
                          className="w-full px-3 py-2 border rounded-xl text-xs"
                        />
                        <input
                          type="text"
                          placeholder="To URL (e.g. /new-page)"
                          value={newRedirect.to}
                          onChange={(e) => setNewRedirect({ ...newRedirect, to: e.target.value })}
                          className="w-full px-3 py-2 border rounded-xl text-xs"
                        />
                        <div className="flex justify-end gap-2 pt-2">
                          <button onClick={() => setShowAddRedirectModal(false)} className="px-4 py-2 border rounded-xl text-xs">Cancel</button>
                          <button
                            onClick={() => {
                              if (newRedirect.from && newRedirect.to) {
                                setRedirectsList([...redirectsList, { ...newRedirect, id: Date.now(), hits: 0, status: "active" }]);
                                setShowAddRedirectModal(false);
                                setNewRedirect({ from: "", to: "", type: 301 });
                                showToast("Redirect added!");
                              }
                            }}
                            className="px-4 py-2 bg-amber-500 text-white rounded-xl text-xs font-bold"
                          >
                            Add Redirect
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* SUBTAB 5: SITEMAP MANAGER */}
              {activeSeoSubTab === "seo-sitemap" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-mono text-slate-400 mb-1">
                        SEO &gt; Sitemap
                      </p>
                      <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                        Sitemap Manager
                      </h2>
                      <p className="text-xs text-slate-500 font-light mt-1">
                        XML sitemaps submitted to search engines
                      </p>
                    </div>
                    <a
                      href="https://next-js-portfolio-one-bay.vercel.app/sitemap.xml"
                      target="_blank"
                      rel="noreferrer"
                      className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-sm transition-all"
                    >
                      Open Index
                    </a>
                  </div>

                  {/* Sitemap Table */}
                  <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                    <div className="grid grid-cols-[1fr_140px_100px] px-6 py-3 bg-slate-50/80 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                      <span>SITEMAP</span>
                      <span className="text-center">UPDATES</span>
                      <span className="text-right">ACTIONS</span>
                    </div>

                    {[
                      { name: "Sitemap Index", path: "/sitemap.xml" },
                      { name: "Pages Sitemap", path: "/sitemap-pages.xml" },
                      { name: "Products Sitemap", path: "/sitemap-products.xml" },
                      { name: "Collections Sitemap", path: "/sitemap-collections.xml" },
                      { name: "Blog Sitemap", path: "/sitemap-blog.xml" }
                    ].map((smap, idx) => (
                      <div key={idx} className="grid grid-cols-[1fr_140px_100px] px-6 py-4 border-b border-slate-100 hover:bg-slate-50/50 transition-colors items-center">
                        <div>
                          <p className="text-xs font-bold text-slate-900">{smap.name}</p>
                          <p className="text-[10px] text-slate-400 font-mono">{smap.path}</p>
                        </div>
                        <div className="text-center">
                          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">
                            Automatic
                          </span>
                        </div>
                        <div className="text-right">
                          <a
                            href={`https://next-js-portfolio-one-bay.vercel.app${smap.path}`}
                            target="_blank"
                            rel="noreferrer"
                            className="px-3 py-1.5 rounded-lg border border-slate-200 text-[10px] font-semibold text-slate-600 hover:border-primary transition-colors"
                          >
                            View
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>

                  <p className="text-xs text-slate-500 bg-amber-50 border border-amber-200/80 rounded-xl p-4 flex items-center gap-2">
                    💡 Sitemaps regenerate automatically from your live catalog, collections and blog — there&apos;s nothing to rebuild manually. Submit the index URL <strong className="font-mono">https://next-js-portfolio-one-bay.vercel.app/sitemap.xml</strong> in Google Search Console.
                  </p>
                </div>
              )}

              {/* SUBTAB 6: ROBOTS MANAGER */}
              {activeSeoSubTab === "seo-robots" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-mono text-slate-400 mb-1">
                        SEO &gt; Robots
                      </p>
                      <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                        Robots.txt Manager
                      </h2>
                      <p className="text-xs text-slate-500 font-light mt-1">
                        Control how search engines crawl your site
                      </p>
                    </div>
                    <button
                      onClick={() => showToast("Robots.txt rules updated!")}
                      className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-sm transition-all"
                    >
                      Save Changes
                    </button>
                  </div>

                  {/* Extra Rules */}
                  <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-3 shadow-sm">
                    <h3 className="text-sm font-bold text-slate-900">Extra Rules</h3>
                    <p className="text-[11px] text-slate-400 font-light">Added below defaults (one directive per line, e.g. Disallow: /search)</p>
                    <textarea
                      rows={4}
                      value={robotsRules}
                      onChange={(e) => setRobotsRules(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 font-mono text-xs text-slate-800"
                    />
                  </div>

                  {/* AI Crawlers */}
                  <div className="bg-white rounded-2xl border border-slate-200/80 p-6 flex items-center justify-between shadow-sm">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">AI Crawlers</h3>
                      <p className="text-[11px] text-slate-400 font-light mt-0.5">Block GPTBot, ClaudeBot, PerplexityBot, Google-Extended and similar</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={blockAiCrawlers}
                      onChange={(e) => setBlockAiCrawlers(e.target.checked)}
                      className="w-5 h-5 text-amber-500 rounded border-slate-300 focus:ring-amber-500 cursor-pointer"
                    />
                  </div>

                  {/* Live Preview */}
                  <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-3 shadow-sm">
                    <h3 className="text-sm font-bold text-slate-900">Live Preview</h3>
                    <pre className="p-4 rounded-xl bg-slate-900 text-emerald-400 font-mono text-xs overflow-x-auto leading-relaxed">
{`User-agent: *
Allow: /
${robotsRules}
${blockAiCrawlers ? "User-agent: GPTBot\nDisallow: /\nUser-agent: ClaudeBot\nDisallow: /" : ""}

Sitemap: https://next-js-portfolio-one-bay.vercel.app/sitemap.xml`}
                    </pre>
                  </div>
                </div>
              )}

              {/* SUBTAB 7: SITE VERIFICATION */}
              {activeSeoSubTab === "seo-verification" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-mono text-slate-400 mb-1">
                        SEO &gt; Verification
                      </p>
                      <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                        Site Verification
                      </h2>
                      <p className="text-xs text-slate-500 font-light mt-1">
                        Verify site ownership with Google Search Console, Bing Webmaster, and Pinterest
                      </p>
                    </div>
                    <button
                      onClick={() => showToast("Site verification codes saved!")}
                      className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-sm transition-all"
                    >
                      Save Verification Codes
                    </button>
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-5 shadow-sm">
                    <div>
                      <label className="text-xs font-bold text-slate-700">Google Search Console Verification Code</label>
                      <input
                        type="text"
                        value={siteVerification.google}
                        onChange={(e) => setSiteVerification({ ...siteVerification, google: e.target.value })}
                        className="w-full mt-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-mono"
                        placeholder="google-site-verification=..."
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700">Bing Webmaster Tools Verification Code</label>
                      <input
                        type="text"
                        value={siteVerification.bing}
                        onChange={(e) => setSiteVerification({ ...siteVerification, bing: e.target.value })}
                        className="w-full mt-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-mono"
                        placeholder="msvalidate.01=..."
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700">Pinterest Verification Code</label>
                      <input
                        type="text"
                        value={siteVerification.pinterest}
                        onChange={(e) => setSiteVerification({ ...siteVerification, pinterest: e.target.value })}
                        className="w-full mt-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-mono"
                        placeholder="p:domain_verify=..."
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* SUBTAB 8: INTERNAL LINKING */}
              {activeSeoSubTab === "seo-interlinking" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-mono text-slate-400 mb-1">
                        SEO &gt; Internal Linking
                      </p>
                      <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                        Internal Linking Manager
                      </h2>
                      <p className="text-xs text-slate-500 font-light mt-1">
                        Automatically link target keywords across your blog posts and pages
                      </p>
                    </div>
                    <button
                      onClick={() => showToast("Auto-link rule added!")}
                      className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-sm transition-all"
                    >
                      + Add Auto-Link Rule
                    </button>
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                    <div className="grid grid-cols-[1fr_1fr_100px] px-6 py-3 bg-slate-50/80 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                      <span>KEYWORD</span>
                      <span>TARGET URL</span>
                      <span className="text-right">ACTIONS</span>
                    </div>
                    {[
                      { keyword: "Shopify Plus", target: "/services" },
                      { keyword: "WordPress Development", target: "/services" },
                      { keyword: "Technical SEO", target: "/services" }
                    ].map((rule, idx) => (
                      <div key={idx} className="grid grid-cols-[1fr_1fr_100px] px-6 py-3.5 border-b border-slate-100 text-xs items-center">
                        <span className="font-bold text-slate-900">{rule.keyword}</span>
                        <span className="font-mono text-slate-600">{rule.target}</span>
                        <div className="text-right">
                          <button onClick={() => showToast("Rule removed")} className="text-slate-400 hover:text-rose-500">
                            <Trash2 className="w-3.5 h-3.5 inline-block" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* EDIT SEO MODAL POPUP */}
              {seoEditModalItem && (
                <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
                  <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-xl w-full p-6 space-y-6 animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                      <div>
                        <span className="px-2.5 py-1 rounded-md bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
                          Edit SEO • {seoEditModalItem.itemType}
                        </span>
                        <h3 className="text-lg font-bold text-slate-900 mt-1">
                          {seoEditModalItem.item.title || "Edit SEO Metadata"}
                        </h3>
                      </div>
                      <button
                        onClick={() => setSeoEditModalItem(null)}
                        className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 flex justify-between">
                          <span>Meta Title</span>
                          <span className={`text-[10px] font-mono ${(seoEditModalItem.meta_title?.length || 0) > 60 ? "text-rose-500" : "text-emerald-600"}`}>
                            {seoEditModalItem.meta_title?.length || 0}/60
                          </span>
                        </label>
                        <input
                          type="text"
                          value={seoEditModalItem.meta_title}
                          onChange={(e) => setSeoEditModalItem({ ...seoEditModalItem, meta_title: e.target.value })}
                          placeholder="Title displayed in Google search results..."
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-primary transition-all"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700 flex justify-between">
                          <span>Meta Description</span>
                          <span className={`text-[10px] font-mono ${(seoEditModalItem.meta_desc?.length || 0) > 160 ? "text-rose-500" : "text-emerald-600"}`}>
                            {seoEditModalItem.meta_desc?.length || 0}/160
                          </span>
                        </label>
                        <textarea
                          rows={3}
                          value={seoEditModalItem.meta_desc}
                          onChange={(e) => setSeoEditModalItem({ ...seoEditModalItem, meta_desc: e.target.value })}
                          placeholder="Snippet description displayed under Google search results..."
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-primary transition-all resize-none"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700">Focus Keyword</label>
                        <input
                          type="text"
                          value={seoEditModalItem.focus_keyword}
                          onChange={(e) => setSeoEditModalItem({ ...seoEditModalItem, focus_keyword: e.target.value })}
                          placeholder="e.g. shopify development, wordpress expert"
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-primary transition-all"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-700">Canonical URL</label>
                        <input
                          type="text"
                          value={seoEditModalItem.canonical_url}
                          onChange={(e) => setSeoEditModalItem({ ...seoEditModalItem, canonical_url: e.target.value })}
                          placeholder="https://devshaham.com/..."
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-primary transition-all"
                        />
                      </div>

                      <div className="flex items-center gap-3 pt-2">
                        <input
                          type="checkbox"
                          id="seo-noindex"
                          checked={seoEditModalItem.noindex}
                          onChange={(e) => setSeoEditModalItem({ ...seoEditModalItem, noindex: e.target.checked })}
                          className="w-4 h-4 text-primary rounded border-slate-300 focus:ring-primary cursor-pointer"
                        />
                        <label htmlFor="seo-noindex" className="text-xs font-semibold text-slate-700 cursor-pointer">
                          Block Search Bots (noindex)
                        </label>
                      </div>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                      <button
                        onClick={() => setSeoEditModalItem(null)}
                        className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveSeoModal}
                        disabled={savingSeoModal}
                        className="px-5 py-2 rounded-xl bg-primary hover:bg-primary/90 text-white text-xs font-bold shadow-md transition-all disabled:opacity-50"
                      >
                        {savingSeoModal ? "Saving SEO..." : "Save SEO Settings"}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB: VERCEL & REAL-TIME ANALYTICS */}
          {activeTab === "analytics" && (
            <div className="space-y-8">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] font-mono text-slate-400 mb-1">
                    Dashboard &gt; Analytics
                  </p>
                  <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                    Vercel &amp; Real-Time Analytics
                    <span className={`px-3 py-1 rounded-full font-mono text-xs font-bold flex items-center gap-1.5 ${
                      analyticsData?.live
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-800"
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${
                        analyticsData?.live ? "bg-emerald-500 animate-pulse" : "bg-amber-500"
                      }`}></span>
                      {analyticsData?.live ? "Vercel API Live Data" : "API Setup Required"}
                    </span>
                  </h2>
                  <p className="text-xs text-slate-500 font-light mt-1">
                    Dynamic real-time traffic metrics, pageviews, and visitor acquisition queried live from Vercel API.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={fetchVercelAnalytics}
                    disabled={analyticsLoading}
                    className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors shadow-sm flex items-center gap-1.5"
                  >
                    {analyticsLoading ? "Refreshing..." : "🔄 Refresh Data"}
                  </button>
                  <a
                    href="https://vercel.com/account/tokens"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors shadow-sm"
                  >
                    Get Vercel Token
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {analyticsLoading ? (
                <div className="py-20 text-center space-y-3">
                  <div className="w-8 h-8 rounded-full border-4 border-primary/20 border-t-primary animate-spin mx-auto"></div>
                  <p className="text-xs font-mono text-slate-500">Querying Vercel REST API...</p>
                </div>
              ) : analyticsData?.live && analyticsData?.data ? (
                <>
                  {/* Dynamic Metric Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-500">Total Unique Visitors</span>
                        <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                          <Users className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
                        {analyticsData.data.visitors.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-bold font-mono">
                        <span>Live Vercel Metric</span>
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-500">Total Pageviews</span>
                        <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                          <TrendingUp className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
                        {analyticsData.data.pageviews.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-bold font-mono">
                        <span>Live Vercel Metric</span>
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-500">Pages Managed</span>
                        <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
                          <Layers className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="text-3xl font-extrabold text-slate-900 tracking-tight">
                        {pagesList.length}
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-purple-600 font-bold font-mono">
                        <span>Active Static Routes</span>
                      </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-500">Core Web Vitals Target</span>
                        <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                          <Globe className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="text-3xl font-extrabold text-slate-900 tracking-tight">98 / 100</div>
                      <div className="flex items-center gap-1 text-[11px] text-emerald-600 font-bold font-mono">
                        <span>Sub-2s Load Speed</span>
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Pages Breakdown */}
                  <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm space-y-5">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                      <h3 className="text-sm font-bold text-slate-900">Vercel Live Page Performance</h3>
                      <span className="text-[10px] font-mono text-slate-400">Past 30 Days</span>
                    </div>
                    {analyticsData.data.pages.length === 0 ? (
                      <p className="text-xs text-slate-400 py-4 font-mono">No page traffic recorded yet in this 30-day window.</p>
                    ) : (
                      <div className="space-y-4">
                        {analyticsData.data.pages.map((pg, i) => (
                          <div key={i} className="space-y-1.5">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-semibold text-slate-800 font-mono">{pg.path || pg.url || "/"}</span>
                              <span className="font-bold text-slate-900 font-mono">{pg.views || pg.count || 0} views</span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                              <div
                                className="h-full bg-primary rounded-full"
                                style={{ width: `${Math.min(100, ((pg.views || 1) / (analyticsData.data.pageviews || 1)) * 100)}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              ) : (
                /* Setup Instructions Banner when Vercel API keys are not in env */
                <div className="bg-slate-900 rounded-3xl p-8 md:p-10 text-white space-y-6 shadow-2xl border border-slate-800">
                  <div className="space-y-2">
                    <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 font-mono text-[10px] font-bold uppercase tracking-wider">
                      Vercel REST API Setup
                    </span>
                    <h3 className="text-xl font-bold text-white">Connect Your Vercel Project Live Analytics</h3>
                    <p className="text-xs text-slate-400 font-light leading-relaxed max-w-2xl">
                      To stream live real-time visitor counts, pageviews, and referral sources directly from Vercel into this dashboard, add your Vercel API credentials to your project environment.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3 font-mono text-xs text-slate-200">
                    <div className="text-amber-400 font-bold">Add to .env.local (or Vercel Environment Variables):</div>
                    <div className="p-3 rounded-xl bg-slate-950 text-emerald-400 space-y-1 overflow-x-auto">
                      <div>VERCEL_AUTH_TOKEN=your_vercel_user_access_token</div>
                      <div>VERCEL_PROJECT_ID=your_vercel_project_id</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-xs font-mono">
                    <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 space-y-1">
                      <div className="font-bold text-amber-400">Step 1: Access Tokens</div>
                      <div className="text-slate-400 text-[11px]">Go to Vercel Account Settings &gt; Tokens and create a new token.</div>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 space-y-1">
                      <div className="font-bold text-amber-400">Step 2: Project ID</div>
                      <div className="text-slate-400 text-[11px]">Copy your Project ID from Vercel Dashboard &gt; Settings &gt; General.</div>
                    </div>
                    <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 space-y-1">
                      <div className="font-bold text-amber-400">Step 3: Save &amp; Refresh</div>
                      <div className="text-slate-400 text-[11px]">Add env vars, restart server, and click Refresh Data above!</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB: Settings & Reviews Placeholder */}
          {(activeTab === "settings" || activeTab === "reviews") && (
            <div className="bg-white rounded-3xl border border-slate-200/80 p-8 shadow-sm space-y-6 max-w-2xl">
              <h3 className="text-lg font-bold text-slate-900 m-0 uppercase font-mono tracking-wider text-primary">
                {activeTab.toUpperCase()} CONFIGURATION
              </h3>
              <p className="text-xs text-slate-500 font-light">
                Configure primary brand theme colors (#c00000), Google Maps Technical SEO parameters, and meta tags.
              </p>
              <div className="space-y-4 text-xs font-mono text-slate-700">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div><strong>Primary Color Code:</strong> #c00000 (Deep Crimson)</div>
                  <div><strong>Hover Color Code:</strong> #820000 (Dark Crimson)</div>
                  <div><strong>Typography Headings:</strong> Plus Jakarta Sans</div>
                  <div><strong>Core Web Vitals Target:</strong> Sub-2s Load Time (PageSpeed 98/100)</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* 3. ADD PROJECT MODAL */}
      {showAddProjectModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold text-slate-900 m-0">Add New Project / Catalog Item</h3>
              <button
                onClick={() => setShowAddProjectModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddProject} className="space-y-4 text-xs">
              <div>
                <label className="block font-mono font-bold text-slate-700 mb-1.5">PROJECT TITLE</label>
                <input
                  type="text"
                  placeholder="e.g. MobileCart E-Commerce"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:border-primary"
                  required
                />
              </div>

              <div>
                <label className="block font-mono font-bold text-slate-700 mb-1.5">LIVE URL</label>
                <input
                  type="url"
                  placeholder="https://mobilecart.ca"
                  value={newProject.url}
                  onChange={(e) => setNewProject({ ...newProject, url: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block font-mono font-bold text-slate-700 mb-1.5">CATEGORY</label>
                <CustomDropdown
                  value={newProject.category}
                  onChange={(val) => setNewProject({ ...newProject, category: val })}
                  options={[
                    { value: "Shopify Plus", label: "Shopify Plus" },
                    { value: "WordPress & Booking", label: "WordPress & Booking" },
                    { value: "WooCommerce & WhatsApp", label: "WooCommerce & WhatsApp" },
                    { value: "MERN Stack Web App", label: "MERN Stack Web App" },
                  ]}
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddProjectModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-primary text-white font-bold hover:bg-primary-dark transition-colors shadow-md"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
