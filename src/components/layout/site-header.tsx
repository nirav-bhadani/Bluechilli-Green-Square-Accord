"use client";

import { useEffect, useRef, useState } from "react";
import { gsa } from "@/lib/site";

const utilityLinks = [
  { label: "Accessibility", icon: "fa-circle-info", href: gsa("/accessibility-statement") },
  {
    label: "Translation",
    icon: "fa-language",
    href: "https://greensquareaccord-co-uk.translate.goog/?_x_tr_sl=auto&_x_tr_tl=en&_x_tr_hl=en&_x_tr_pto=wapp",
  },
  { label: "Feedback and complaints", icon: "fa-comment", href: gsa("/contact/feedback-and-complaints") },
  { label: "Careers", icon: "fa-briefcase", href: gsa("/about/work-with-us/careers") },
  { label: "News", icon: "fa-newspaper", href: gsa("/news") },
  { label: "Search", icon: "fa-magnifying-glass", href: gsa("/search") },
  { label: "Sign in", icon: "fa-user", href: gsa("/manage-your-home/customer-portal") },
];

type NavItem = {
  label: string;
  href: string;
  alignRight?: boolean;
  children: { label: string; href: string }[];
};

const navItems: NavItem[] = [
  {
    label: "Manage your home",
    href: gsa("/manage-your-home"),
    children: [
      { label: "Repairs and maintenance", href: gsa("/manage-your-home/repairs-and-maintenance") },
      { label: "Rent and service charges", href: gsa("/manage-your-home/rent-and-service-charges") },
      { label: "Your tenancy", href: gsa("/manage-your-home/your-tenancy") },
      { label: "Homeowners", href: gsa("/manage-your-home/homeowners") },
      { label: "Home safety", href: gsa("/manage-your-home/home-safety") },
      { label: "Help and advice", href: gsa("/manage-your-home/help-and-advice") },
    ],
  },
  {
    label: "Find a home",
    href: gsa("/find-a-home"),
    children: [
      { label: "Rent a home", href: gsa("/find-a-home/rent-a-home") },
      { label: "Shared ownership", href: gsa("/find-a-home/shared-ownership") },
      { label: "New developments", href: gsa("/find-a-home/new-developments") },
    ],
  },
  {
    label: "Care and support",
    href: gsa("/care-and-support"),
    children: [
      { label: "Find a service", href: gsa("/care-and-support/find-a-service") },
      { label: "Safeguarding", href: gsa("/care-and-support/safeguarding") },
      { label: "Quality", href: gsa("/care-and-support/quality") },
    ],
  },
  {
    label: "Communities",
    href: gsa("/communities"),
    children: [
      { label: "Ways to get involved", href: gsa("/communities/ways-to-get-involved") },
      { label: "Our Customer Panel", href: gsa("/communities/our-customer-panel") },
      {
        label: "Our Customer Involvement and Empowerment Strategy",
        href: gsa("/communities/our-customer-involvement-and-empowerment-strategy"),
      },
      { label: "Community Impact Fund", href: gsa("/communities/community-impact-fund") },
      { label: "Community investment", href: gsa("/communities/community-investment") },
      { label: "Listening to your feedback", href: gsa("/communities/listening-to-your-feedback") },
    ],
  },
  {
    label: "About",
    href: gsa("/about"),
    alignRight: true,
    children: [
      { label: "Who we are", href: gsa("/about/who-we-are") },
      { label: "Governance and leadership", href: gsa("/about/governance-and-leadership") },
      { label: "Strategy and performance", href: gsa("/about/strategy-and-performance") },
      { label: "Work with us", href: gsa("/about/work-with-us") },
      { label: "Policies and publications", href: gsa("/about/policies-and-publications") },
    ],
  },
  {
    label: "Contact",
    href: gsa("/contact"),
    alignRight: true,
    children: [{ label: "Feedback and complaints", href: gsa("/contact/feedback-and-complaints") }],
  },
];

function Chevron() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="presentation"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export function SiteHeader() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // Close dropdowns on outside click / Escape (desktop behaviour).
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setExpanded(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setExpanded(null);
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  // Lock page scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="site-head bg-dark" role="banner">
      <a className="skip-link button" href="#main-content">
        Skip to content
      </a>
      <div className="wrapper">
        <div className="site-head__inner">
          <a href="/" aria-label="GreenSquareAccord - home" className="site-head__brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/gsa-light.svg" alt="Home" width={150} height={59} />
          </a>

          <div className="burger-menu" data-status={menuOpen ? "open" : "closed"}>
            <button
              className="burger-menu__trigger"
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span className="burger-menu__bar" aria-hidden="true" />
            </button>

            <div className="burger-menu__panel">
              <div className="site-head__actions">
                <nav aria-label="Utility">
                  <ul className="cluster gap-m small" style={{ justifyContent: "space-between" }}>
                    {utilityLinks.map((l) => (
                      <li key={l.label}>
                        <a href={l.href}>
                          <span className={`icon-left fa-solid fa-fw ${l.icon}`} aria-hidden="true" />
                          {l.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              <nav className="navigation" aria-label="Primary" ref={navRef}>
                <ul className="cluster gap-xs small" role="list" style={{ justifyContent: "space-between" }}>
                  {navItems.map((item) => {
                    const isOpen = expanded === item.label;
                    return (
                      <li
                        key={item.label}
                        className={`navigation__item${item.alignRight ? " navigation__item--align-right" : ""}`}
                        data-expanded={isOpen}
                      >
                        <div className="navigation__label">
                          <a href={item.href} className="navigation__link">
                            {item.label}
                          </a>
                          <button
                            className="navigation__button"
                            aria-label={`Submenu of ${item.label}`}
                            aria-expanded={isOpen}
                            onClick={() => setExpanded(isOpen ? null : item.label)}
                          >
                            <Chevron />
                          </button>
                        </div>
                        <ul aria-hidden={!isOpen} className="navigation__submenu">
                          {item.children.map((c) => (
                            <li key={c.label}>
                              <a href={c.href}>{c.label}</a>
                            </li>
                          ))}
                        </ul>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
