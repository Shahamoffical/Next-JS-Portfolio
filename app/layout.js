import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://devshaham.com"),
  title: "Premium Custom Website Development & Shopify Expert Solutions",
  description:
    "Specialized Digital Solutions Agency offering custom Shopify development, Shopify Plus, WordPress & WooCommerce, MERN stack web applications, and Technical SEO optimization.",
  keywords:
    "Shopify Developer, Shopify Expert, Shopify Development, Shopify Plus Developer, WordPress Developer, WooCommerce Developer, Custom Website Development, Headless Commerce, Technical SEO",
  authors: [{ name: "Digital Solutions Agency" }],
  openGraph: {
    type: "website",
    title: "Premium Custom Website Development & Shopify Expert Solutions",
    description:
      "Scaling E-commerce & Digital Experiences with custom Shopify Liquid, WordPress, MERN stack, and automated Make.com workflow integrations.",
    images: ["/portfolio-preview.jpg"],
  },
};

import Header from "./components/Header";
import Footer from "./components/Footer";
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;700&family=Inter:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="preload" as="image" href="/Profile.jpeg" fetchPriority="high" />
        <link rel="preload" as="image" href="/profilecard.jpeg" />
      </head>
      <body className="bg-bg text-text-primary overflow-x-hidden antialiased" suppressHydrationWarning>
        <Header />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
