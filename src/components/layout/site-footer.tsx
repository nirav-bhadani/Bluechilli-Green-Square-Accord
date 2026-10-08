import { gsa } from "@/lib/site";

const quickLinks = [
  { label: "Manage your home", href: gsa("/manage-your-home/") },
  { label: "Find a home", href: gsa("/find-a-home/") },
  { label: "Care and support", href: gsa("/care-and-support/") },
  { label: "Communities", href: gsa("/communities/") },
  { label: "About", href: gsa("/about/") },
  { label: "Contact", href: gsa("/contact/") },
];

const socials = [
  { label: "Facebook", icon: "fa-facebook", href: "https://www.facebook.com/GreenSquareAccord/" },
  { label: "Instagram", icon: "fa-instagram", href: "https://www.instagram.com/greensqaccord/" },
  { label: "LinkedIn", icon: "fa-linkedin", href: "https://www.linkedin.com/company/greensquareaccord" },
];

const legal = [
  { label: "Accessibility statement", href: gsa("/accessibility-statement") },
  { label: "Cookie notice", href: gsa("/cookie-notice") },
  { label: "Modern slavery statement", href: gsa("/modern-slavery-statement") },
  { label: "Privacy notice", href: gsa("/privacy-notice") },
  { label: "Staff access", href: gsa("/access-for-authorised-staff") },
  { label: "Terms and conditions", href: gsa("/terms-and-conditions") },
];

export function SiteFooter() {
  return (
    <footer role="contentinfo" className="site-footer bg-dark">
      <div className="wrapper">
        <div className="region">
          <div className="switcher gap-l bg-dark small">
            <article className="flow">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                style={{ maxWidth: 225 }}
                src="/brand/strapline-white.png"
                alt="We thrive at home"
                loading="lazy"
                width={300}
                height={105}
              />
              <p>
                We provide affordable homes and services that create a foundation from which people in
                our communities can thrive.
              </p>
            </article>

            <article className="flow-l">
              <nav className="flow" aria-label="Footer">
                <h2 className="h5">Quick links</h2>
                <div>
                  <ul className="cluster gap-xs">
                    {quickLinks.map((l) => (
                      <li key={l.label}>
                        <a href={l.href}>{l.label}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              </nav>
              <div className="flow">
                <h2 className="h5">Follow us</h2>
                <div>
                  <ul className="cluster gap-xs">
                    {socials.map((s) => (
                      <li key={s.label}>
                        <a href={s.href}>
                          <i className={`fa-brands ${s.icon} icon-left`} aria-hidden="true" />
                          {s.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>

            <article className="flow">
              <h2 className="h5">GreenSquareAccord Limited</h2>
              <p>A registered society with exempt charitable status no. 27052R</p>
              <p>
                Registered address:
                <br />
                2nd Floor, 10 Brindleyplace, Birmingham, B1 2JB
              </p>
              <p>&copy; GreenSquareAccord {new Date().getFullYear()}</p>
            </article>
          </div>
        </div>
      </div>

      <section className="region-s site-footer__legal small">
        <div className="wrapper">
          <ul className="cluster gap-s">
            {legal.map((l) => (
              <li key={l.label}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </footer>
  );
}
