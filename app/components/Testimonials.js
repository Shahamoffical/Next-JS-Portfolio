"use client";

import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    rating: 5,
    quote:
      "had a great experience working with Be Ryven on my website. They delivered quality work, communicated well and understood what I was looking for. I'm happy with the results and would recommend them for future projects.",
    author: "Maryam Khalid",
    role: "SQA Expert",
    initials: "MK",
  },
  {
    rating: 5,
    quote:
      "Shaham's implementation of our dashboards was absolutely flawless. He writes exceptionally clean code, sets realistic timelines, and communicates transparently. A top-tier developer.",
    author: "Sarah Jenkins",
    role: "Lead Product Manager",
    initials: "SJ",
  },
  {
    rating: 5,
    quote:
      "The setup Shaham engineered has completely transformed our performance metrics. Page speed increased by 300%, and our marketing team can easily edit blocks without developer assistance.",
    author: "David Miller",
    role: "Founder & CEO",
    initials: "DM",
  },
  {
    rating: 5,
    quote:
      "Shaham is that rare senior engineer who possesses both deep full-stack architecture skills and a meticulous eye for pixel-perfect layout detail. Highly recommended.",
    author: "Sophia Rodriguez",
    role: "Chief Technology Officer",
    initials: "SR",
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const slideRef = useRef(null);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  useEffect(() => {
    if (slideRef.current) {
      gsap.fromTo(
        slideRef.current,
        { opacity: 0, x: 20 },
        { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [activeIndex]);

  return (
    <section id="testimonials" className="py-24 px-6 md:px-12 max-w-7xl mx-auto bg-white">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        {/* Left Column */}
        <div className="md:col-span-5">
          <h2 className="text-4xl md:text-5xl font-black text-black leading-tight mb-4">
            Happy Clients
            <br />
            <span className="text-primary font-accent">Testimonials</span>
          </h2>
          
          <p className="text-gray-500 mb-8 max-w-sm leading-relaxed">
            We focus on building websites that load under 2 seconds, convert visitors to clients, and get top Google Maps rankings.
          </p>

          <div className="bg-white rounded-3xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-gray-100 max-w-sm">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-5xl font-bold text-black">5.0</div>
              <div>
                <div className="flex gap-1 text-[#ff4f4f] mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <div className="text-[10px] text-gray-400 font-semibold tracking-wider uppercase">
                  Client Satisfaction
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Trusted by local brands & startups across Dubai, Sharjah, and Abu Dhabi.
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="md:col-span-7 relative pt-8 md:pt-12">
          {/* Floating Quote Icon */}
          <div className="absolute top-0 left-[-20px] text-[#ffe5e5] z-0">
            <Quote className="w-20 h-20 rotate-180 fill-current" strokeWidth={0} />
          </div>

          {/* Testimonial Card */}
          <div className="relative z-10 bg-white rounded-3xl p-8 md:p-10 shadow-[0_4px_32px_rgba(0,0,0,0.06)] border border-gray-50 mb-8 min-h-[250px] flex flex-col justify-between">
            <div ref={slideRef}>
              <div className="flex gap-1 text-[#ff4f4f] mb-6">
                {[...Array(testimonials[activeIndex].rating)].map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-current" />
                ))}
              </div>

              <p className="text-gray-300 text-lg md:text-xl font-light leading-relaxed mb-8">
                {testimonials[activeIndex].quote}
              </p>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 font-bold overflow-hidden">
                  {testimonials[activeIndex].initials}
                </div>
                <div>
                  <div className="font-semibold text-gray-800 text-sm">
                    {testimonials[activeIndex].author}
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5">
                    {testimonials[activeIndex].role}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-6 ml-4">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-black hover:border-gray-300 transition-colors bg-white"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 -ml-0.5" />
            </button>
            
            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === activeIndex
                      ? "w-4 bg-[#ff4f4f]"
                      : "w-2 bg-gray-200"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-black hover:border-gray-300 transition-colors bg-white"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 -mr-0.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
