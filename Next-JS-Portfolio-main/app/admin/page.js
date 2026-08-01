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
  Eye
} from "lucide-react";
import { FaShopify, FaWordpress, FaReact, FaSlack } from "react-icons/fa";

// Custom Responsive UI Dropdown Component
function CustomDropdown({ value, onChange, options }) {
  const [isOpen, setIsOpen] = useState(false);
  const selectedOption = options.find((o) => o.value === value) || options[0];

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-semibold text-xs flex items-center justify-between hover:border-primary/50 focus:outline-none focus:border-primary transition-all shadow-sm"
      >
        <span>{selectedOption.label}</span>
        <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${isOpen ? "rotate-180 text-primary" : ""}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setIsOpen(false)}></div>
          <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-2xl border border-slate-200 shadow-2xl z-40 p-1.5 space-y-1 animate-in fade-in duration-150 max-h-60 overflow-y-auto">
            {options.map((opt) => (
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

// Initial Demo Data State
const initialProjects = [
  { id: 1, title: "MobileCart E-Commerce", url: "https://mobilecart.ca", category: "Shopify Plus", status: "Published", leads: 14, date: "July 28, 2026" },
  { id: 2, title: "Chateau Salon & Spa", url: "https://chateausalon.com", category: "WordPress & Booking", status: "Published", leads: 22, date: "July 22, 2026" },
  { id: 3, title: "Eat Arra Organic Store", url: "https://eatarra.com", category: "WooCommerce & WhatsApp", status: "Published", leads: 18, date: "July 15, 2026" },
  { id: 4, title: "Saferdot Cybersecurity", url: "https://saferdot.com", category: "MERN Stack Web App", status: "Published", leads: 9, date: "July 08, 2026" }
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

  // Data State (loaded from Supabase)
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

      setProjectsList(Array.isArray(projects) ? projects : []);
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
      ...activeArticle,
      status: finalStatus,
      title: activeArticle.title || "Untitled Blog Post",
      slug: activeArticle.slug || (activeArticle.title ? activeArticle.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : "new-post")
    };

    try {
      const isNew = !articlesList.find(a => a.id === postToSave.id);
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
            <div className="w-9 h-9 rounded-full bg-primary/20 text-primary border border-primary/40 flex items-center justify-center font-bold font-mono text-sm">
              SA
            </div>
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
                      <Plus className="w-4 h-4" /> + New Post
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
                          {filteredArticles.map((art) => (
                            <tr key={art.id} className="hover:bg-slate-50/80 transition-colors">
                              <td className="py-4 px-6">
                                <div className="font-bold text-slate-900 text-sm leading-snug cursor-pointer hover:text-primary" onClick={() => handleOpenEditPost(art)}>
                                  {art.title}
                                </div>
                                <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                                  /blog/{art.slug}/
                                </div>
                              </td>
                              <td className="py-4 px-4">
                                <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 font-mono text-[10px] font-bold border border-blue-100">
                                  {art.category}
                                </span>
                              </td>
                              <td className="py-4 px-4 text-slate-600">{art.author}</td>
                              <td className="py-4 px-4 font-mono text-slate-400">{art.views || "—"}</td>
                              <td className="py-4 px-4">
                                <span className={`px-2.5 py-1 rounded-full font-mono text-[10px] font-bold border ${
                                  art.status === "Published"
                                    ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                                    : "bg-amber-50 text-amber-600 border-amber-200"
                                }`}>
                                  {art.status.toLowerCase()}
                                </span>
                              </td>
                              <td className="py-4 px-4 font-mono text-slate-500">{art.date}</td>
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
                              value={activeArticle.title}
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
                              value={activeArticle.slug}
                              onChange={(e) => setActiveArticle({ ...activeArticle, slug: e.target.value })}
                              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs font-mono focus:outline-none focus:border-primary"
                            />
                            <div className="text-[11px] font-mono text-slate-400 mt-1">/blog/{activeArticle.slug}/</div>
                          </div>

                          <div>
                            <label className="block text-xs font-mono font-bold text-slate-700 mb-1.5">Content</label>
                            {/* Rich Markdown Toolbar */}
                            <div className="border border-slate-200 rounded-t-xl bg-slate-50 p-2 flex flex-wrap items-center gap-2 border-b-0 text-xs font-mono">
                              {["H2", "H3", "B", "I", "List", "1. List", "Quote", "Link", "Image"].map((btn, bIdx) => (
                                <button
                                  key={bIdx}
                                  type="button"
                                  onClick={() => {
                                    setActiveArticle({
                                      ...activeArticle,
                                      content: activeArticle.content + `\n\n## ${btn}`
                                    });
                                  }}
                                  className="px-2.5 py-1 rounded hover:bg-white text-slate-700 border border-slate-200/60 font-semibold"
                                >
                                  {btn}
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
                        <div className="flex items-center gap-4">
                          <div className="w-20 h-16 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center text-[10px] text-slate-400 font-mono overflow-hidden shrink-0">
                            {activeArticle.featuredImage ? (
                              <img src={activeArticle.featuredImage} alt="Cover" className="w-full h-full object-cover" />
                            ) : (
                              "No image"
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              const url = prompt("Enter Image URL:", "/portfolio-preview.jpg");
                              if (url) setActiveArticle({ ...activeArticle, featuredImage: url });
                            }}
                            className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
                          >
                            Choose image
                          </button>
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
                          title: "New Page",
                          slug: "/new-page/",
                          liveUrl: "devshaham.com/new-page/",
                          status: "Published",
                          content: "<p>New page content...</p>",
                          metaTitle: "",
                          metaDesc: "",
                          bannerImage: null
                        });
                        setPageSubView("editor");
                      }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-dark transition-all shadow-[0_4px_16px_rgba(192,0,0,0.3)] shrink-0"
                    >
                      <Plus className="w-4 h-4" /> + New Page
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

          {/* TAB 6: SEO DASHBOARD */}
          {activeTab === "seo" && (
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
                <button className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-[0_4px_14px_rgba(245,158,11,0.35)] hover:shadow-[0_6px_20px_rgba(245,158,11,0.45)] transition-all">
                  ✨ Auto-fill missing SEO
                </button>
              </div>

              {/* Stats Cards Row */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {[
                  { label: "Total Pages", value: pagesList.length + articlesList.length + projectsList.length, icon: "📄", color: "#f1f5f9" },
                  { label: "Products", value: projectsList.length, icon: "📦", color: "#fef3c7" },
                  { label: "Collections", value: "3", icon: "📁", color: "#dbeafe" },
                  { label: "Blog Posts", value: articlesList.length, icon: "✏️", color: "#dcfce7" },
                  { label: "Static Pages", value: pagesList.length, icon: "📑", color: "#f3e8ff" },
                  { label: "Schema Types", value: "8", icon: "🔧", color: "#fce7f3" }
                ].map((stat, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-slate-200/80 p-5 flex items-start justify-between shadow-sm hover:shadow-md transition-shadow">
                    <div>
                      <p className="text-[11px] text-slate-400 font-medium mb-1">{stat.label}</p>
                      <p className="text-2xl font-extrabold text-slate-900 tracking-tight">{stat.value}</p>
                    </div>
                    <span className="text-xl p-2 rounded-xl" style={{ backgroundColor: stat.color }}>{stat.icon}</span>
                  </div>
                ))}
              </div>

              {/* Quick Link Pills */}
              <div className="flex flex-wrap gap-3">
                {[
                  { label: "Metadata", color: "#10b981", icon: "📋" },
                  { label: "Schema", color: "#6366f1", icon: "🔗" },
                  { label: "Redirects", color: "#3b82f6", icon: "🔀" },
                  { label: "Sitemaps", color: "#14b8a6", icon: "🗺️" },
                  { label: "Robots.txt", color: "#a855f7", icon: "🤖" },
                  { label: "Internal Links", color: "#f59e0b", icon: "🔗" }
                ].map((pill, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      const subMap = { "Metadata": "seo-metadata", "Schema": "seo-schema", "Redirects": "seo-redirects", "Sitemaps": "seo-sitemap", "Robots.txt": "seo-robots", "Internal Links": "seo-interlinking" };
                      setActiveSeoSubTab(subMap[pill.label] || "seo-dashboard");
                    }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:border-primary/40 hover:shadow-md transition-all"
                  >
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: pill.color }}></span>
                    {pill.label}
                  </button>
                ))}
              </div>

              {/* Homepage SEO Card */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                <div className="p-6 flex items-start justify-between border-b border-slate-100">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      🏠 Homepage SEO
                    </h3>
                    <p className="text-[11px] text-slate-400 font-light mt-0.5">
                      The meta title &amp; description for devshaham.com (the home page itself)
                    </p>
                  </div>
                  <button className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-sm transition-all">
                    Save Homepage SEO
                  </button>
                </div>

                <div className="p-6 space-y-5">
                  {/* Meta Title */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-700">Meta Title</label>
                    <input
                      type="text"
                      value={pagesList.find(p => p.slug === "/")?.metaTitle || ""}
                      onChange={(e) => {
                        const updated = pagesList.map(p => p.slug === "/" ? { ...p, metaTitle: e.target.value } : p);
                        setPagesList(updated);
                      }}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 focus:outline-none focus:border-primary focus:bg-white transition-all"
                      placeholder="e.g. Premium Custom Website Development | Buy Online"
                    />
                    <p className="text-[10px] text-slate-400 font-mono">
                      <span className={`font-bold ${(pagesList.find(p => p.slug === "/")?.metaTitle?.length || 0) > 60 ? "text-rose-500" : "text-emerald-500"}`}>
                        {pagesList.find(p => p.slug === "/")?.metaTitle?.length || 0}/60
                      </span>
                      {" "}— shown as the blue link in Google. Leave blank to use the default.
                    </p>
                  </div>

                  {/* Meta Description */}
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-700">Meta Description</label>
                    <textarea
                      rows={3}
                      value={pagesList.find(p => p.slug === "/")?.metaDesc || ""}
                      onChange={(e) => {
                        const updated = pagesList.map(p => p.slug === "/" ? { ...p, metaDesc: e.target.value } : p);
                        setPagesList(updated);
                      }}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 focus:outline-none focus:border-primary focus:bg-white transition-all resize-none"
                      placeholder="e.g. Scaling E-commerce & Digital Experiences with custom Shopify Liquid and WordPress builds."
                    />
                    <p className="text-[10px] text-slate-400 font-mono">
                      <span className={`font-bold ${(pagesList.find(p => p.slug === "/")?.metaDesc?.length || 0) > 160 ? "text-rose-500" : "text-emerald-500"}`}>
                        {pagesList.find(p => p.slug === "/")?.metaDesc?.length || 0}/160
                      </span>
                      {" "}— the grey text under the link in Google. Leave blank to use the default.
                    </p>
                  </div>
                </div>
              </div>

              {/* SEO Pages Table */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                {/* Table Filter Tabs */}
                <div className="px-6 pt-5 pb-0 flex flex-wrap gap-4 border-b border-slate-100">
                  {[
                    { label: "All Pages", count: pagesList.length + articlesList.length + projectsList.length },
                    { label: "Static Pages", count: pagesList.length },
                    { label: "Blog Posts", count: articlesList.length },
                    { label: "Products", count: projectsList.length }
                  ].map((filterTab, i) => (
                    <button
                      key={i}
                      className={`pb-3 text-xs font-semibold border-b-2 transition-colors ${
                        i === 0
                          ? "border-primary text-primary"
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
                {pagesList.map((pg) => (
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
                        onClick={() => handleOpenEditPage(pg)}
                        className="px-3 py-1.5 rounded-lg border border-slate-200 text-[10px] font-semibold text-slate-600 hover:border-primary/40 hover:text-primary transition-colors"
                      >
                        Edit SEO
                      </button>
                      <button
                        onClick={() => handleOpenEditPage(pg)}
                        className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-primary hover:border-primary/40 transition-colors"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Table Rows — Blog Posts */}
                {articlesList.map((art) => (
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
                        onClick={() => handleOpenEditPost(art)}
                        className="px-3 py-1.5 rounded-lg border border-slate-200 text-[10px] font-semibold text-slate-600 hover:border-primary/40 hover:text-primary transition-colors"
                      >
                        Edit SEO
                      </button>
                      <button
                        onClick={() => handleOpenEditPost(art)}
                        className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-primary hover:border-primary/40 transition-colors"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Table Rows — Products */}
                {projectsList.map((proj) => (
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
                      <button className="px-3 py-1.5 rounded-lg border border-slate-200 text-[10px] font-semibold text-slate-600 hover:border-primary/40 hover:text-primary transition-colors">
                        Edit SEO
                      </button>
                      <button className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-primary hover:border-primary/40 transition-colors">
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: Settings / Reviews / Analytics Placeholder */}
          {(activeTab === "settings" || activeTab === "reviews" || activeTab === "analytics") && (
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
