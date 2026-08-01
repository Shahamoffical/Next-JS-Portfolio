export default async function sitemap() {
  const baseUrl = "https://next-js-portfolio-one-bay.vercel.app";

  const routes = [
    "",
    "/about",
    "/services",
    "/projects",
    "/blog",
    "/pricing",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  return routes;
}
