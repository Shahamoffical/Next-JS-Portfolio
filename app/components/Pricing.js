"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const pricingPlans = [
  {
    name: "Basic Website",
    description: "Perfect for personal portfolios or small businesses.",
    price: "$999",
    features: [
      "Custom Design",
      "Up to 5 Pages",
      "Mobile Responsive",
      "Basic SEO",
      "Contact Form",
    ],
    popular: false,
  },
  {
    name: "E-Commerce",
    description: "Full-featured online store with payment gateways.",
    price: "$2,499",
    features: [
      "Custom E-Commerce Design",
      "Unlimited Products",
      "Payment Gateway Integration",
      "Advanced SEO",
      "Admin Dashboard",
      "1 Month Support",
    ],
    popular: true,
  },
  {
    name: "Custom Web App",
    description: "Complex web applications tailored to your business needs.",
    price: "Custom",
    features: [
      "Full-Stack Architecture",
      "Custom Database Design",
      "API Development & Integration",
      "User Authentication",
      "Scalable Infrastructure",
      "Ongoing Maintenance",
    ],
    popular: false,
  },
];

export default function Pricing() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".pricing-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 px-6 md:px-12 max-w-7xl mx-auto min-h-screen pt-32">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold font-sans tracking-tight text-text-heading mb-4">
          Simple, Transparent <span className="gradient-text">Pricing</span>
        </h2>
        <p className="text-text-secondary text-lg max-w-2xl mx-auto font-light">
          Choose the perfect plan for your digital needs. No hidden fees, just premium quality.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        {pricingPlans.map((plan, index) => (
          <div
            key={index}
            className={`pricing-card relative flex flex-col p-8 rounded-3xl border ${
              plan.popular
                ? "bg-gradient-to-b from-primary/10 to-transparent border-primary/50 shadow-[0_0_40px_rgba(0,102,255,0.15)] md:-translate-y-4"
                : "bg-white border-border shadow-elevated"
            }`}
          >
            {plan.popular && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 rounded-full bg-primary text-white text-xs font-bold tracking-wider uppercase">
                Most Popular
              </div>
            )}
            
            <h3 className="text-2xl font-bold text-text-heading mb-2">{plan.name}</h3>
            <p className="text-sm text-text-secondary mb-6 h-10">{plan.description}</p>
            
            <div className="text-4xl font-bold text-text-heading mb-8 font-mono">
              {plan.price}
            </div>
            
            <ul className="space-y-4 mb-8 flex-grow">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span className="text-sm text-text-secondary">{feature}</span>
                </li>
              ))}
            </ul>
            
            <a
              href="/contact"
              className={`w-full py-3 rounded-xl font-semibold text-center transition-all duration-300 ${
                plan.popular
                  ? "bg-primary text-white hover:bg-primary-dark btn-glow"
                  : "bg-bg-alt text-text-heading hover:bg-border border border-border"
              }`}
            >
              Get Started
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
