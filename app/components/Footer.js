"use client";

import React from "react";
import { ArrowUp, MessageSquare } from "lucide-react";
import { FaGithub as Github, FaLinkedin as Linkedin, FaTwitter as Twitter } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  const handleScrollTop = (e) => {
    // e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-bg-alt py-16 px-6 md:px-12 w-full relative">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-3">
          <Link
            href="/"
            onClick={handleScrollTop}
            className="text-2xl font-bold font-mono tracking-tight text-text-heading hover:text-primary transition-colors"
          >
            &lt;dev/
            <span className="text-primary">shaham</span>&gt;
          </Link>
          <p className="text-xs text-text-secondary font-light max-w-xs leading-relaxed">
            Building premium, performance-optimized, and clean digital
            experiences with international code standards.
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex flex-wrap justify-center gap-6 md:gap-10 text-xs font-semibold uppercase tracking-wider text-text-secondary">
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
              className="hover:text-text-heading transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Socials */}
        <div className="flex items-center gap-4">
          {[
            { href: "https://github.com", icon: <Github className="w-5 h-5" />, label: "GitHub" },
            { href: "https://linkedin.com", icon: <Linkedin className="w-5 h-5" />, label: "LinkedIn" },
            { href: "https://twitter.com", icon: <Twitter className="w-5 h-5" />, label: "Twitter" },
            { href: "https://stackoverflow.com", icon: <MessageSquare className="w-5 h-5" />, label: "Stack Overflow" },
          ].map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="p-3 rounded-xl border border-border bg-white text-text-secondary hover:text-primary hover:border-primary/20 transition-all duration-300 shadow-sm"
              aria-label={social.label}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-text-secondary font-light">
        <div>
          &copy; {currentYear} Shaham Abbas. All rights reserved. Built with
          Next.js & GSAP.
        </div>

        <a
          href="#home"
          onClick={handleScrollTop}
          className="inline-flex items-center gap-2 text-xs font-mono text-primary hover:text-primary-dark transition-colors group"
        >
          Back To Top
          <span className="p-2 rounded-lg bg-white border border-border group-hover:border-primary/20 transition-all shadow-sm">
            <ArrowUp className="w-4 h-4 text-primary group-hover:animate-bounce" />
          </span>
        </a>
      </div>
    </footer>
  );
}
