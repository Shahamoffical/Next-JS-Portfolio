"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Brain, Code2, TrendingUp, Layout, Box, Cloud, Database, Lock } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    num: "01",
    icon: <Brain strokeWidth={1.5} className="w-6 h-6" />,
    title: "AI Applied",
    subtitle: "Neural Networks & Machine Learning",
    proficiency: 88,
    color: "#a855f7", // Purple
    tags: ["TENSORFLOW", "PYTORCH", "NLP"],
  },
  {
    num: "02",
    icon: <Code2 strokeWidth={1.5} className="w-6 h-6" />,
    title: "Software Dev",
    subtitle: "Full Stack Engineering",
    proficiency: 92,
    color: "#06b6d4", // Cyan
    tags: ["REACT", "NODE.JS", "TYPESCRIPT"],
  },
  {
    num: "03",
    icon: <TrendingUp strokeWidth={1.5} className="w-6 h-6" />,
    title: "Digital Strategy",
    subtitle: "Product Vision & Growth",
    proficiency: 80,
    color: "#3b82f6", // Blue
    tags: ["ANALYTICS", "SEO", "KPIS"],
  },
  {
    num: "04",
    icon: <Layout strokeWidth={1.5} className="w-6 h-6" />,
    title: "UI/UX Design",
    subtitle: "User Experience & Interfaces",
    proficiency: 90,
    color: "#ec4899", // Pink
    tags: ["FIGMA", "PROTOTYPING", "RESEARCH"],
  },
  {
    num: "05",
    icon: <Box strokeWidth={1.5} className="w-6 h-6" />,
    title: "3D & WebGL",
    subtitle: "Immersive Environments",
    proficiency: 75,
    color: "#f59e0b", // Orange
    tags: ["THREE.JS", "BLENDER", "GLSL"],
  },
  {
    num: "06",
    icon: <Cloud strokeWidth={1.5} className="w-6 h-6" />,
    title: "Cloud Ops",
    subtitle: "AWS & CI/CD Pipelines",
    proficiency: 78,
    color: "#10b981", // Green
    tags: ["AWS", "DOCKER", "DEVOPS"],
  },
  {
    num: "07",
    icon: <Database strokeWidth={1.5} className="w-6 h-6" />,
    title: "Data Science",
    subtitle: "Analytics & Intelligence",
    proficiency: 85,
    color: "#8b5cf6", // Indigo
    tags: ["PANDAS", "SQL", "VISUALIZATION"],
  },
  {
    num: "08",
    icon: <Lock strokeWidth={1.5} className="w-6 h-6" />,
    title: "Cybersecurity",
    subtitle: "Threat Modeling & Auth",
    proficiency: 72,
    color: "#ef4444", // Red
    tags: ["PEN TESTING", "OAUTH", "FIREWALLS"],
  },
];

export default function Services() {
  const sectionRef = useRef();
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".services-title",
        { opacity: 0, y: 30 },
        {
          scrollTrigger: { trigger: ".services-title", start: "top 90%", toggleActions: "play none none none" },
          opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
        }
      );

      gsap.fromTo(
        ".service-card",
        { opacity: 0, y: 40 },
        {
          scrollTrigger: { trigger: ".services-grid", start: "top 85%", toggleActions: "play none none none" },
          opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out",
        }
      );
      
      // Animate progress bars
      gsap.fromTo(
        ".progress-bar-fill",
        { width: "0%" },
        {
          scrollTrigger: { trigger: ".services-grid", start: "top 75%", toggleActions: "play none none none" },
          width: (i, target) => target.dataset.width,
          duration: 1.5,
          ease: "power3.out",
          stagger: 0.1
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-24 px-6 md:px-12 max-w-7xl mx-auto relative overflow-hidden"
    >
      {/* Background decorations - soft blurred spots */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-red-50/40 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-red-100/30 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      {/* Header */}
      <div className="services-title text-center mb-16">
        <h2 className="text-4xl md:text-5xl lg:text-[54px] font-black tracking-tighter uppercase mb-6 text-gray-900 flex items-center justify-center gap-3">
          TECHNICAL 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-600">
            ARSENAL
          </span>
        </h2>
        <div className="w-16 h-[2px] mx-auto bg-gradient-to-r from-red-500 to-red-600 rounded-full"></div>
      </div>

      {/* Grid */}
      <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8 relative z-10">
        {services.map((svc, i) => (
          <div
            key={i}
            onClick={() => setActiveCard(i)}
            onMouseEnter={() => setActiveCard(i)}
            onMouseLeave={() => setActiveCard(null)}
            className="service-card group relative bg-white rounded-3xl p-7 transition-all duration-500 cursor-pointer"
            style={{ 
              boxShadow: activeCard === i ? `0 12px 30px ${svc.color}25` : "0 2px 20px rgba(0,0,0,0.03)",
              borderColor: activeCard === i ? `${svc.color}60` : "rgba(0,0,0,0.04)",
              borderWidth: "1px",
              borderStyle: "solid",
              transform: activeCard === i ? "translateY(-4px)" : "translateY(0)"
            }}
          >
            {/* Active background gradient */}
            <div 
              className="absolute inset-0 transition-opacity duration-500 rounded-3xl z-0 pointer-events-none"
              style={{
                background: `linear-gradient(to bottom right, ${svc.color}15, white)`,
                opacity: activeCard === i ? 1 : 0
              }}
            ></div>

            <div className="relative z-10 flex flex-col h-full">
              {/* Top Row: Icon and Number */}
              <div className="flex justify-between items-start mb-8">
                <div 
                  className="p-3.5 rounded-2xl transition-colors duration-300 shadow-sm"
                  style={{ color: svc.color, backgroundColor: `${svc.color}15` }}
                >
                  {svc.icon}
                </div>
                <span className="text-gray-300 font-bold text-sm tracking-widest">{svc.num}</span>
              </div>

              {/* Title and Subtitle */}
              <div className="mb-10">
                <h3 className="text-[19px] font-bold text-gray-900 mb-1.5">{svc.title}</h3>
                <p className="text-[13px] font-medium text-gray-500">{svc.subtitle}</p>
              </div>

              <div className="mt-auto">
                {/* Proficiency Header */}
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-bold text-gray-400 tracking-[0.15em] uppercase">PROFICIENCY</span>
                  <span className="text-xs font-bold" style={{ color: svc.color }}>{svc.proficiency}%</span>
                </div>
                
                {/* Progress Bar */}
                <div className="h-1 w-full bg-gray-100 rounded-full mb-6 overflow-hidden">
                  <div 
                    className="progress-bar-fill h-full rounded-full"
                    data-width={`${svc.proficiency}%`}
                    style={{ backgroundColor: svc.color }}
                  ></div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {svc.tags.map((tag, idx) => (
                    <span 
                      key={idx} 
                      className="text-[9px] font-bold px-3 py-1.5 rounded-full border transition-all duration-300 tracking-wider whitespace-nowrap"
                      style={{
                         backgroundColor: activeCard === i ? `${svc.color}15` : '#f9fafb',
                         color: activeCard === i ? svc.color : '#9ca3af',
                         borderColor: activeCard === i ? 'transparent' : '#f3f4f6'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

