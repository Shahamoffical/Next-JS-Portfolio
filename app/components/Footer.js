"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUp,
  User,
  Mail,
  Send,
  CheckCircle2
} from "lucide-react";
import {
  FaGithub as Github,
  FaLinkedin as Linkedin,
  FaFacebookF as Facebook,
  FaInstagram as Instagram,
  FaWhatsapp as Whatsapp,
  FaTwitter as Twitter
} from "react-icons/fa";

export default function Footer() {
  const pathname = usePathname();
  const [subscriberName, setSubscriberName] = useState("");
  const [subscriberEmail, setSubscriberEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (subscriberEmail) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscriberName("");
        setSubscriberEmail("");
        setSubscribed(false);
      }, 4000);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-section bg-gradient-to-b from-white via-slate-50 to-white text-slate-800 border-t border-slate-200/80 pt-20 pb-12 px-6 md:px-12 w-full relative overflow-hidden">
      {/* Background Soft Ambient Spots */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-red-100/40 rounded-full blur-[140px] pointer-events-none -z-10"></div>
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-red-50/50 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-slate-200/80 relative z-10">
        
        {/* Column 1: Brand Logo & Bio & Socials */}
        <div className="lg:col-span-4 space-y-6">
          <Link href="/" onClick={handleScrollTop} className="inline-block group">
            <img
              src="/Logo.webp"
              alt="Shaham Abbas Logo"
              className="h-12 w-auto max-w-[180px] object-contain group-hover:scale-105 transition-transform"
            />
          </Link>

          <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed max-w-sm">
            Full-stack developer crafting high-performance websites, e-commerce stores, and modern web applications that drive real business results.
          </p>

          {/* Social Icons inside rounded light boxes matching Light Theme */}
          <div className="flex items-center gap-2 pt-2">
            {[
              { href: "https://github.com/Shahamabbas", icon: <Github className="w-4 h-4" />, label: "GitHub" },
              { href: "https://www.linkedin.com/in/shahamabbas", icon: <Linkedin className="w-4 h-4" />, label: "LinkedIn" },
              { href: "https://www.facebook.com/share/1BnNJiiwi5/", icon: <Facebook className="w-4 h-4" />, label: "Facebook" },
              { href: "https://www.instagram.com/shahamabbasdev", icon: <Instagram className="w-4 h-4" />, label: "Instagram" },
              { href: "https://x.com/Shahamabbasdev", icon: <Twitter className="w-4 h-4" />, label: "Twitter / X" },
              { href: "https://wa.me/923213567058", icon: <Whatsapp className="w-4 h-4" />, label: "WhatsApp" }
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 hover:text-white hover:bg-primary hover:border-primary shadow-sm transition-all duration-300"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Column 2: QUICK LINKS */}
        <div className="lg:col-span-2 space-y-5">
          <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-900 mb-5">
            QUICK LINKS
          </h4>
          <ul className="space-y-3 text-xs sm:text-sm font-medium">
            <li>
              <Link href="/" onClick={handleScrollTop} className="text-primary font-bold hover:underline flex items-center gap-2">
                Home
              </Link>
            </li>
            <li>
              <Link href="/projects" className="text-slate-600 hover:text-primary transition-colors">
                Portfolio
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-slate-600 hover:text-primary transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="text-slate-600 hover:text-primary transition-colors">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-slate-600 hover:text-primary transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: SERVICES */}
        <div className="lg:col-span-3 space-y-5">
          <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-900 mb-5">
            SERVICES
          </h4>
          <ul className="space-y-3 text-xs sm:text-sm font-medium text-slate-600">
            <li>
              <Link href="/services/custom-development" className="hover:text-primary transition-colors">
                Frontend Development
              </Link>
            </li>
            <li>
              <Link href="/services/custom-development" className="hover:text-primary transition-colors">
                Backend Development
              </Link>
            </li>
            <li>
              <Link href="/services/custom-development" className="hover:text-primary transition-colors">
                Full Stack Solutions
              </Link>
            </li>
            <li>
              <Link href="/services/wordpress-woocommerce" className="hover:text-primary transition-colors">
                WordPress &amp; WooCommerce
              </Link>
            </li>
            <li>
              <Link href="/services/shopify-development" className="hover:text-primary transition-colors">
                Shopify &amp; Shopify Plus
              </Link>
            </li>
            <li>
              <Link href="/services/website-speed-seo" className="hover:text-primary transition-colors">
                SEO &amp; Performance
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: STAY IN THE LOOP (Newsletter & Direct Contact Light Theme) */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-slate-900 mb-5">
            STAY IN THE LOOP
          </h4>
          <p className="text-xs text-slate-600 font-light leading-relaxed">
            Get notified about new projects, articles, and exclusive offers directly to your inbox.
          </p>

          <form onSubmit={handleSubscribe} className="space-y-3">
            {/* Input 1: Name */}
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Your Name"
                value={subscriberName}
                onChange={(e) => setSubscriberName(e.target.value)}
                className="w-full bg-slate-100/90 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-primary focus:bg-white transition-colors"
                required
              />
            </div>

            {/* Input 2: Email */}
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="email"
                placeholder="Your Email Address"
                value={subscriberEmail}
                onChange={(e) => setSubscriberEmail(e.target.value)}
                className="w-full bg-slate-100/90 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-primary focus:bg-white transition-colors"
                required
              />
            </div>

            {/* Subscribe Button (Deep Crimson Gradient Scheme) */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-primary via-[#a00000] to-primary-dark text-white font-bold text-xs hover:from-primary-dark hover:to-primary transition-all shadow-[0_4px_16px_rgba(192,0,0,0.3)] flex items-center justify-center gap-2 cursor-pointer"
            >
              {subscribed ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-white" /> Subscribed!
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" /> Subscribe Now
                </>
              )}
            </button>
          </form>

          {/* Direct Contact Pills */}
          <div className="pt-2 space-y-2 text-xs">
            <a
              href="mailto:shahamabbasdev@gmail.com"
              className="w-full p-2.5 rounded-xl bg-slate-100/90 border border-slate-200 text-slate-700 hover:text-primary hover:border-primary/50 flex items-center gap-3 transition-colors"
            >
              <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary border border-primary/20 flex items-center justify-center shrink-0">
                <Mail className="w-3.5 h-3.5" />
              </div>
              <span className="truncate font-mono">shahamabbasdev@gmail.com</span>
            </a>

            <a
              href="https://wa.me/923213567058"
              target="_blank"
              rel="noreferrer"
              className="w-full p-2.5 rounded-xl bg-slate-100/90 border border-slate-200 text-slate-700 hover:text-emerald-600 hover:border-emerald-500/50 flex items-center gap-3 transition-colors"
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-600 border border-emerald-200 flex items-center justify-center shrink-0">
                <Whatsapp className="w-3.5 h-3.5" />
              </div>
              <span className="font-mono">WhatsApp Chat (+92 321 3567058)</span>
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Copyright & Back to Top */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-light relative z-10">
        <div>
          &copy; {currentYear} Shaham Abbas. All rights reserved. Built with Next.js &amp; GSAP.
        </div>

        <button
          onClick={handleScrollTop}
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-500 hover:text-primary transition-colors group cursor-pointer"
        >
          Back To Top
          <span className="p-2 rounded-lg bg-slate-100 border border-slate-200 group-hover:border-primary/40 group-hover:bg-primary/10 transition-all">
            <ArrowUp className="w-3.5 h-3.5 text-primary group-hover:animate-bounce" />
          </span>
        </button>
      </div>
    </footer>
  );
}
