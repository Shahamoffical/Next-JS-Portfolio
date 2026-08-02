"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="header-section fixed top-0 left-0 w-full z-50 py-3 px-3 sm:px-6 md:px-8 transition-all duration-300 pointer-events-none">
      <div className="max-w-7xl mx-auto w-full pointer-events-auto">
        <div
          className={`header-main-bar flex items-center justify-between px-4 sm:px-6 md:px-8 py-2.5 sm:py-3.5 rounded-full border-2 border-white bg-white/95 backdrop-blur-xl transition-all duration-300 ${
            isScrolled ? "is-scrolled" : ""
          }`}
        >
          <Link
            href="/"
            onClick={handleNavClick}
            className="flex items-center gap-2.5 group shrink-0"
          >
            <img
              src="/Logo.webp"
              alt="DevShaham Logo"
              className="w-8 h-8 rounded-xl object-cover shadow-sm group-hover:scale-105 transition-transform"
            />
            <span className="text-lg sm:text-xl md:text-2xl font-bold font-mono tracking-tight text-text-heading group-hover:text-primary transition-colors">
              &lt;dev/<span className="text-primary">shaham</span>&gt;
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {[
              { name: "Services", path: "/services" },
              { name: "About", path: "/about" },
              { name: "Blog", path: "/blog" },
              { name: "Contact", path: "/contact" },
            ].map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`relative text-sm font-medium hover:text-primary transition-colors duration-200 py-1 ${
                    isActive ? "text-primary font-semibold" : "text-gray-600"
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary rounded-full"></span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-all duration-300 shadow-[0_4px_14px_rgba(192,0,0,0.35)] hover:shadow-[0_6px_20px_rgba(130,0,0,0.45)] hover:scale-[1.02]"
            >
              Let&apos;s Talk
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-text-heading hover:text-primary transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-x-4 top-20 bg-white/95 backdrop-blur-xl border-2 border-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.12),0_0_20px_rgba(255,255,255,1)] md:hidden pointer-events-auto z-40 transition-all duration-300 ${
          mobileMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col items-center justify-center py-8 space-y-6 px-6">
          {[
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" },
            { name: "About", path: "/about" },
            { name: "Blog", path: "/blog" },
            { name: "Contact", path: "/contact" },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.path}
              onClick={handleNavClick}
              className={`text-xl font-semibold transition-colors ${
                pathname === item.path ? "text-primary" : "text-text-secondary hover:text-primary"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={handleNavClick}
            className="w-full text-center py-3.5 rounded-full bg-primary text-white text-base font-bold hover:bg-primary-dark transition-all duration-300 shadow-[0_4px_14px_rgba(192,0,0,0.35)]"
          >
            Let&apos;s Talk ↗
          </Link>
        </nav>
      </div>
    </header>
  );
}
