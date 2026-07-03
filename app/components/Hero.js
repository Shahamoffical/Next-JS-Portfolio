"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { PhoneCall, ArrowDown } from "lucide-react";
import { FaGithub as Github } from "react-icons/fa";
import ThreeCanvas from "./ThreeCanvas";

export default function Hero() {
  const containerRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        ".badge-anim",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2 }
      )
        .fromTo(
          ".title-anim",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.15 },
          "-=0.6"
        )
        .fromTo(
          ".sub-anim",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          ".btn-anim",
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1 },
          "-=0.5"
        )
        .fromTo(
          ".stats-anim",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
          "-=0.4"
        )
        .fromTo(
          ".glass-card-anim",
          { opacity: 0, x: 50, rotation: 3 },
          { opacity: 1, x: 0, rotation: 0, duration: 1.2 },
          "-=1.2"
        )
        .fromTo(
          ".portrait-anim",
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 1.5 },
          "-=1.2"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleScrollTo = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden w-full"
    >
      {/* 3D Canvas Background */}
      <ThreeCanvas />

      {/* Content Wrapper */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 z-10">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
        {/* Left: Text & CTAs */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
          <div className="badge-anim inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-xs font-mono tracking-wider text-primary">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            AVAILABLE FOR CONTRACT & FULL-TIME
          </div>

          <h1 className="title-anim text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-text-heading leading-[1.1] font-sans m-0">
            Engineering Scalable <br className="hidden sm:inline" />
            <span className="gradient-text">Web Apps</span> & Premium{" "}
            <br className="hidden sm:inline" />
            WordPress Solutions
          </h1>

          <p className="sub-anim text-lg text-text-secondary max-w-xl font-light">
            Hi, I&apos;m{" "}
            <strong className="text-text-heading font-medium">
              Shaham Abbas
            </strong>
            . A Full Stack Architect combining advanced React logic with premium
            WordPress optimization. Specializing in high-performance digital
            experiences with international coding standards.
          </p>

          {/* Buttons */}
          <div className="btn-anim flex flex-wrap gap-4 pt-2">
            <a
              href="#cta"
              onClick={(e) => handleScrollTo(e, "cta")}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark transition-all duration-300 btn-glow shadow-[0_4px_16px_rgba(0,102,255,0.25)]"
            >
              <PhoneCall className="w-5 h-5" />
              Book a Call
            </a>

            <a
              href="#projects"
              onClick={(e) => handleScrollTo(e, "projects")}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl border border-border bg-white text-text-heading font-semibold hover:bg-bg-alt hover:border-border-hover transition-all duration-300 shadow-card"
            >
              <Github className="w-5 h-5" />
              View GitHub/Work
            </a>
          </div>

          {/* Stats */}
          <div className="stats-anim grid grid-cols-3 gap-6 sm:gap-12 pt-8 border-t border-border w-full max-w-lg">
            <div>
              <div className="text-3xl font-bold font-mono text-primary text-glow-blue">
                5+
              </div>
              <div className="text-xs text-text-secondary uppercase tracking-widest mt-1">
                Years Experience
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold font-mono text-primary text-glow-blue">
                50+
              </div>
              <div className="text-xs text-text-secondary uppercase tracking-widest mt-1">
                Projects Completed
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold font-mono text-primary text-glow-blue">
                99%
              </div>
              <div className="text-xs text-text-secondary uppercase tracking-widest mt-1">
                Client Satisfaction
              </div>
            </div>
          </div>
        </div>

        {/* Right: Portrait & Code Card */}
        <div className="lg:col-span-5 relative flex justify-center items-center h-[450px] lg:h-[600px] w-full">
          {/* Background glow */}
          <div className="absolute w-[80%] h-[80%] rounded-full radial-bg-blue filter blur-xl opacity-60 animate-pulse"></div>

          <div className="portrait-anim relative w-[280px] h-[340px] sm:w-[350px] sm:h-[420px] rounded-3xl overflow-hidden border border-border bg-gradient-to-b from-bg-alt to-white group shadow-elevated">
            <img
              src="/profession-photo.png"
              alt="Shaham Abbas"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent"></div>
          </div>

          {/* Floating Code Card */}
          <div className="glass-card-anim absolute -bottom-4 -left-2 sm:left-4 max-w-[280px] sm:max-w-[340px] rounded-2xl p-5 bg-white border border-border shadow-elevated select-none text-left font-mono">
            {/* Window Controls */}
            <div className="flex gap-1.5 mb-4">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56]"></span>
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e]"></span>
              <span className="w-3 h-3 rounded-full bg-[#27c93f]"></span>
            </div>

            <pre className="text-xs leading-relaxed text-text-secondary">
              <code>
                <span className="text-primary">const</span> dev = &#123;
                <br />
                &nbsp;&nbsp;name:{" "}
                <span className="text-amber-600">&quot;Shaham Abbas&quot;</span>,
                <br />
                &nbsp;&nbsp;role:{" "}
                <span className="text-amber-600">
                  &quot;Full-Stack Developer&quot;
                </span>
                ,<br />
                &nbsp;&nbsp;stack: [
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span className="text-primary">&quot;React&quot;</span>,{" "}
                <span className="text-primary">&quot;Node&quot;</span>,
                <br />
                &nbsp;&nbsp;&nbsp;&nbsp;
                <span className="text-primary">&quot;WordPress&quot;</span>,{" "}
                <span className="text-primary">&quot;GSAP&quot;</span>
                <br />
                &nbsp;&nbsp;],
                <br />
                &nbsp;&nbsp;focus:{" "}
                <span className="text-emerald-600">
                  &quot;Premium Experience&quot;
                </span>
                <br />
                &#125;;
              </code>
            </pre>
          </div>
        </div>
      </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer opacity-70 hover:opacity-100 transition-opacity">
        <a
          href="#services"
          onClick={(e) => handleScrollTo(e, "services")}
          className="flex flex-col items-center text-xs tracking-widest text-text-secondary uppercase hover:text-text-heading"
        >
          Explore More
          <ArrowDown className="w-4 h-4 mt-2 animate-bounce text-primary" />
        </a>
      </div>
    </section>
  );
}
