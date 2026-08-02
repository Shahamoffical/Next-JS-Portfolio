"use client";

import React, { useState } from "react";
import { ChevronDown, Zap, Clock, ShieldCheck, Cpu, Code2, Award, Sparkles, MessageSquare } from "lucide-react";
import Link from "next/link";

const homepageFAQs = [
  {
    q: "How efficiently do you complete custom web development projects?",
    a: "We work with streamlined agile sprints. Standard custom Shopify, WordPress, or React builds are delivered within 7 to 14 days, complete with performance audits, SEO schema injection, and mobile testing.",
    icon: Clock
  },
  {
    q: "How fast will my website load on mobile and desktop devices?",
    a: "We guarantee sub-2 second page load times across all mobile and desktop browsers. Every build passes Google Core Web Vitals benchmarks with 95+ PageSpeed scores.",
    icon: Zap
  },
  {
    q: "How quickly do you respond to new client lead inquiries?",
    a: "Our automated AI lead pipeline responds within 5 minutes of form submission. You will receive direct WhatsApp or email communication from Shaham Abbas within 1 business hour.",
    icon: MessageSquare
  },
  {
    q: "Can you automate our manual sales, inventory, and order workflows?",
    a: "Yes. Using Make.com scenarios, OpenAI GPT-4 API agents, and WhatsApp Business API bots, we eliminate repetitive manual data entry and automate 1-click checkout workflows.",
    icon: Cpu
  },
  {
    q: "Do you offer contract-based and full-time dedicated engineering services?",
    a: "Yes. Shaham Abbas is available for fixed-price project contracts as well as monthly dedicated engineering retentorships for scaling e-commerce brands.",
    icon: ShieldCheck
  },
  {
    q: "What technical stacks do you specialize in?",
    a: "We specialize in Shopify Plus & Liquid OS 2.0, WordPress & WooCommerce (Decoupled WPGraphQL), MERN Stack (React, Next.js, Node.js, MongoDB), and Make.com AI Automations.",
    icon: Code2
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-20 px-6 md:px-12 max-w-5xl mx-auto w-full">
      <div className="text-center space-y-4 mb-14">
        <span className="px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary font-mono text-xs font-extrabold uppercase tracking-wider inline-flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" /> Got Questions?
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight m-0">
          Frequently Asked Questions
        </h2>
        <p className="text-slate-500 font-light text-base max-w-xl mx-auto m-0">
          Everything you need to know about our engineering efficiency, sub-second performance guarantees, and project delivery workflows.
        </p>
      </div>

      {/* Accordion List Matching Reference Image */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-md divide-y divide-slate-200">
        {homepageFAQs.map((item, idx) => {
          const Icon = item.icon;
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="py-5 first:pt-0 last:pb-0 transition-colors">
              <button
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="w-full flex items-center justify-between text-left gap-4 group cursor-pointer focus:outline-none"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2.5 rounded-xl transition-colors shrink-0 ${
                    isOpen ? "bg-primary text-white" : "bg-slate-100 text-slate-900 group-hover:bg-primary group-hover:text-white"
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-primary transition-colors m-0">
                    {item.q}
                  </h3>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${
                    isOpen ? "rotate-180 text-primary" : "group-hover:text-slate-700"
                  }`}
                />
              </button>

              {isOpen && (
                <div className="pl-14 pt-3 text-xs sm:text-sm text-slate-600 font-light leading-relaxed animate-in fade-in duration-200">
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Consultation Box */}
      <div className="mt-10 p-6 rounded-2xl bg-slate-100 border border-slate-200 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-left">
          <h4 className="text-sm font-bold text-slate-900 m-0">Have a custom technical question?</h4>
          <p className="text-xs text-slate-500 font-light m-0">Send us your project details for an immediate technical evaluation.</p>
        </div>
        <Link
          href="/contact"
          className="px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary-dark transition-all shadow-md shrink-0"
        >
          Ask Shaham &rarr;
        </Link>
      </div>
    </section>
  );
}
