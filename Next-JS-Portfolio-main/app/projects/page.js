"use client";

import React, { useEffect } from "react";
import Projects from "../components/Projects";

export default function ProjectsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-20 min-h-screen">
      <Projects />
    </div>
  );
}
