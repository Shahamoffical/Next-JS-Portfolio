"use client";

import React, { useEffect } from "react";
import Pricing from "../components/Pricing";
import ServicesOverview from "../components/ServicesOverview";

export default function ServicesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24 min-h-screen space-y-16 pb-20">
      <ServicesOverview />
      <Pricing />
    </div>
  );
}
