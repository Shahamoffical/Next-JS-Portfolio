"use client";

import React, { useEffect } from "react";
import CTA from "../components/CTA";

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-20 min-h-screen flex items-center justify-center">
      <div className="w-full">
        <CTA />
      </div>
    </div>
  );
}
