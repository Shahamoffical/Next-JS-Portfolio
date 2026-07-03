import "./globals.css";

export const metadata = {
  title: "Shaham Abbas | Senior Full-Stack & WordPress Developer",
  description:
    "Premium developer portfolio of Shaham Abbas, Senior Full-Stack & WordPress Developer. Showcasing interactive web experiences, custom theme architectures, and high-performance applications.",
  keywords:
    "Full Stack Developer, WordPress Developer, React Developer, Shopify Developer, Portfolio",
  authors: [{ name: "Shaham Abbas" }],
  openGraph: {
    type: "website",
    title: "Shaham Abbas | Senior Full-Stack & WordPress Developer",
    description:
      "A high-fidelity developer portfolio showcasing premium full-stack architectures, interactive custom WordPress themes, and high-performance UI designs.",
    images: ["/portfolio-preview.jpg"],
  },
};

import Header from "./components/Header";
import Footer from "./components/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;700&family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body className="bg-bg text-text-primary overflow-x-hidden antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
