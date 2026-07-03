"use client";

import React, { useEffect, useRef } from "react";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Testimonials from "./components/Testimonials";

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

      {/* Sections */}
      <Hero />
      <Services />
      <Testimonials />
    </>
  );
}
