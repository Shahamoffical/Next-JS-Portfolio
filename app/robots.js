export default function robots() {
  const baseUrl = "https://next-js-portfolio-one-bay.vercel.app";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/admin/*", "/api/*"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
