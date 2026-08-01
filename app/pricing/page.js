"use client";

import React, { useEffect } from "react";
import Pricing from "../components/Pricing";

export default function PricingPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-20 min-h-screen">
      <Pricing />
    </div>
  );
}
