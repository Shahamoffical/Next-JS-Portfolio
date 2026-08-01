"use client";

import React, { useEffect } from "react";
import Skills from "../components/Skills";
import Experience from "../components/Experience";

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-16 min-h-screen">
      <Skills />
      <Experience />
    </div>
  );
}
