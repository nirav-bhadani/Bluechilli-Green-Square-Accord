import type { MetadataRoute } from "next";

/**
 * Site is blocked from search engine indexing.
 * Reinforced by the `X-Robots-Tag` header in next.config, the `robots`
 * metadata in the root layout and the password gate in middleware.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", disallow: "/" }],
  };
}
