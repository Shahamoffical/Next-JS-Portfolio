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

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "py-3 bg-white/80 backdrop-blur-xl border-b border-border shadow-[0_1px_8px_rgba(0,0,0,0.04)]"
          : "py-5 bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          onClick={handleNavClick}
          className="text-xl md:text-2xl font-bold font-mono tracking-tight text-text-heading hover:text-primary transition-colors"
        >
          &lt;dev/
          <span className="text-primary">shaham</span>&gt;
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {[
            { name: "Projects", path: "/projects" },
            { name: "About", path: "/about" },
            { name: "Pricing", path: "/pricing" },
            { name: "Contact", path: "/contact" },
          ].map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.name}
                href={item.path}
                className={`relative text-sm font-medium hover:text-text-heading transition-colors duration-200 group py-1 ${
                  isActive ? "text-primary" : "text-text-secondary"
                }`}
              >
                {item.name}
                <span
                  className={`absolute bottom-0 left-1/2 h-[2px] bg-primary transition-all duration-300 rounded-full ${
                    isActive ? "w-full left-0" : "w-0 group-hover:w-full group-hover:left-0"
                  }`}
                ></span>
              </Link>
            );
          })}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-all duration-300 btn-glow shadow-[0_2px_12px_rgba(0,102,255,0.2)]"
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

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 top-[57px] w-full bg-white/98 backdrop-blur-xl border-t border-border md:hidden z-40 transition-all duration-300 ${
          mobileMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        <nav className="flex flex-col items-center justify-center h-[70vh] space-y-8 px-6">
          {[
            { name: "Home", path: "/" },
            { name: "Projects", path: "/projects" },
            { name: "About", path: "/about" },
            { name: "Pricing", path: "/pricing" },
            { name: "Contact", path: "/contact" },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.path}
              onClick={handleNavClick}
              className={`text-2xl font-semibold transition-colors ${
                pathname === item.path ? "text-primary" : "text-text-secondary hover:text-primary"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={handleNavClick}
            className="w-full text-center py-4 rounded-full bg-primary text-white text-lg font-bold hover:bg-primary-dark transition-all duration-300"
          >
            Let&apos;s Talk
          </Link>
        </nav>
      </div>
    </header>
  );
}
