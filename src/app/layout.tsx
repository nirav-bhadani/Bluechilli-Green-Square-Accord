import type { Metadata, Viewport } from "next";
import { Figtree } from "next/font/google";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./globals.css";
import { siteConfig } from "@/lib/site";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ChatWidget } from "@/components/chat/chat-widget";

// The live site uses Proxima Nova (Adobe Fonts, domain-locked). Figtree is the
// closest free match in shape and width, and is the fallback in the font stack.
const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-fallback",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: "Home | GreenSquareAccord",
  description: siteConfig.description,
  // Private client preview: never index (also enforced by robots.txt,
  // the X-Robots-Tag header in next.config and the password gate).
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false, noimageindex: true },
  },
  icons: {
    icon: [
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/icons/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: siteConfig.name,
    title: "Home",
    description: siteConfig.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#2d363a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={figtree.variable}>
      <body>
        <div className="site-wrapper">
          <SiteHeader />
          <main tabIndex={-1} id="main-content" className="outline-none">
            {children}
          </main>
          <SiteFooter />
        </div>
        <ChatWidget />
      </body>
    </html>
  );
}
