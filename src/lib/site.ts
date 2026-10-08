export const siteConfig = {
  name: "GreenSquareAccord",
  shortName: "GSA",
  description:
    "We provide affordable homes and services that create a foundation from which people in our communities can thrive.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  official: "https://greensquareaccord.co.uk",
  phone: "0300 111 7000",
  phoneHref: "tel:03001117000",
  email: "info@greensquareaccord.co.uk",
  emailHref: "mailto:info@greensquareaccord.co.uk",
} as const;

/** Absolute link to a page on the live GSA site. */
export const gsa = (path: string) => `${siteConfig.official}${path}`;
