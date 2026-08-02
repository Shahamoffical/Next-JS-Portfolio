"use client";

import React, { useEffect, useRef } from "react";
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import Services from "./components/Services";
import Projects from "./components/Projects";
import CaseStudies from "./components/CaseStudies";
import BlogSection from "./components/BlogSection";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import CTA from "./components/CTA";

export default function Home() {
  const progressBarRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const scrolled = (window.scrollY / totalScroll) * 100;
        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${scrolled}%`;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Scroll Progress Bar */}
      <div ref={progressBarRef} className="scroll-progress" />

      {/* Agency Single Page Homepage Sections */}
      <Hero />
      <AboutSection />
      <Services />
      <Projects />
      <CaseStudies />
      <BlogSection />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}
