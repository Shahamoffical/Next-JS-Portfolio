"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUp,
  User,
  Mail,
  Send,
  MessageCircle,
  MessageSquare,
  CheckCircle2
} from "lucide-react";
import {
  FaGithub as Github,
  FaLinkedin as Linkedin,
  FaFacebookF as Facebook,
  FaInstagram as Instagram,
  FaWhatsapp as Whatsapp
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
    <footer className="footer-section bg-[#070b15] text-slate-300 border-t border-slate-800/80 pt-20 pb-12 px-6 md:px-12 w-full relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-slate-800/80">
        
        {/* Column 1: Brand Logo & Bio & Socials */}
        <div className="lg:col-span-4 space-y-6">
          <Link href="/" onClick={handleScrollTop} className="inline-block group">
            <img
              src="/Logo.webp"
              alt="Shaham Abbas Logo"
              className="h-12 w-auto max-w-[180px] object-contain group-hover:scale-105 transition-transform"
            />
          </Link>

          <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed max-w-sm">
            Full-stack developer crafting high-performance websites, e-commerce stores, and modern web applications that drive real business results.
          </p>

          {/* Social Icons inside rounded dark boxes */}
          <div className="flex items-center gap-2.5 pt-2">
            {[
              { href: "https://github.com", icon: <Github className="w-4 h-4" />, label: "GitHub" },
              { href: "https://linkedin.com", icon: <Linkedin className="w-4 h-4" />, label: "LinkedIn" },
              { href: "https://facebook.com", icon: <Facebook className="w-4 h-4" />, label: "Facebook" },
              { href: "https://instagram.com", icon: <Instagram className="w-4 h-4" />, label: "Instagram" },
              { href: "https://wa.me/923000000000", icon: <Whatsapp className="w-4 h-4" />, label: "WhatsApp" }
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="w-10 h-10 rounded-xl bg-[#131b2e] border border-slate-800/80 flex items-center justify-center text-slate-400 hover:text-white hover:bg-primary hover:border-primary transition-all duration-300 shadow-sm"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Column 2: QUICK LINKS */}
        <div className="lg:col-span-2 space-y-5">
          <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-white m-0">
            QUICK LINKS
          </h4>
          <ul className="space-y-3 text-xs sm:text-sm font-medium">
            <li>
              <Link href="/" onClick={handleScrollTop} className="text-primary hover:underline flex items-center gap-2 font-bold">
                <span className="text-primary">—</span> Home
              </Link>
            </li>
            <li>
              <Link href="/projects" className="text-slate-400 hover:text-white transition-colors">
                Portfolio
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-slate-400 hover:text-white transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="text-slate-400 hover:text-white transition-colors">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-slate-400 hover:text-white transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: SERVICES */}
        <div className="lg:col-span-3 space-y-5">
          <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-white m-0">
            SERVICES
          </h4>
          <ul className="space-y-3 text-xs sm:text-sm font-medium text-slate-400">
            <li>
              <Link href="/services/custom-development" className="hover:text-white transition-colors">
                Frontend Development
              </Link>
            </li>
            <li>
              <Link href="/services/custom-development" className="hover:text-white transition-colors">
                Backend Development
              </Link>
            </li>
            <li>
              <Link href="/services/custom-development" className="hover:text-white transition-colors">
                Full Stack Solutions
              </Link>
            </li>
            <li>
              <Link href="/services/wordpress-woocommerce" className="hover:text-white transition-colors">
                WordPress &amp; WooCommerce
              </Link>
            </li>
            <li>
              <Link href="/services/shopify-development" className="hover:text-white transition-colors">
                Shopify &amp; Shopify Plus
              </Link>
            </li>
            <li>
              <Link href="/services/website-speed-seo" className="hover:text-white transition-colors">
                SEO &amp; Performance
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: STAY IN THE LOOP (Newsletter & Direct Contact) */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-white m-0">
            STAY IN THE LOOP
          </h4>
          <p className="text-xs text-slate-400 font-light leading-relaxed">
            Get notified about new projects, articles, and exclusive offers directly to your inbox.
          </p>

          <form onSubmit={handleSubscribe} className="space-y-3">
            {/* Input 1: Name */}
            <div className="relative">
              <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Your Name"
                value={subscriberName}
                onChange={(e) => setSubscriberName(e.target.value)}
                className="w-full bg-[#131c31] border border-slate-800/80 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-primary transition-colors"
                required
              />
            </div>

            {/* Input 2: Email */}
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="email"
                placeholder="Your Email Address"
                value={subscriberEmail}
                onChange={(e) => setSubscriberEmail(e.target.value)}
                className="w-full bg-[#131c31] border border-slate-800/80 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-primary transition-colors"
                required
              />
            </div>

            {/* Subscribe Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold text-xs hover:opacity-95 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              {subscribed ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" /> Subscribed!
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
              className="w-full p-2.5 rounded-xl bg-[#131c31] border border-slate-800/80 text-slate-300 hover:text-white hover:border-slate-700 flex items-center gap-3 transition-colors"
            >
              <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center shrink-0">
                <Mail className="w-3.5 h-3.5 text-slate-300" />
              </div>
              <span className="truncate font-mono">shahamabbasdev@gmail.com</span>
            </a>

            <a
              href="https://wa.me/923000000000"
              target="_blank"
              rel="noreferrer"
              className="w-full p-2.5 rounded-xl bg-[#131c31] border border-slate-800/80 text-slate-300 hover:text-white hover:border-slate-700 flex items-center gap-3 transition-colors"
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-950 text-emerald-400 flex items-center justify-center shrink-0">
                <Whatsapp className="w-3.5 h-3.5" />
              </div>
              <span className="font-mono">WhatsApp Chat</span>
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Copyright & Back to Top */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-light">
        <div>
          &copy; {currentYear} Shaham Abbas. All rights reserved. Built with Next.js &amp; GSAP.
        </div>

        <button
          onClick={handleScrollTop}
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors group cursor-pointer"
        >
          Back To Top
          <span className="p-2 rounded-lg bg-[#131c31] border border-slate-800 group-hover:border-slate-600 transition-all">
            <ArrowUp className="w-3.5 h-3.5 text-primary group-hover:animate-bounce" />
          </span>
        </button>
      </div>
    </footer>
  );
}
