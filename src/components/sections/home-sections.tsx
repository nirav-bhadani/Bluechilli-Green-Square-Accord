import Image from "next/image";
import { gsa } from "@/lib/site";

const quickLinks = [
  {
    icon: "fa-screwdriver-wrench",
    label: "Report a repair",
    href: gsa("/manage-your-home/repairs-and-maintenance/report-a-repair"),
  },
  {
    icon: "fa-money-check",
    label: "Pay your rent",
    href: gsa("/manage-your-home/rent-and-service-charges/how-to-pay-your-rent"),
  },
  { icon: "fa-key", label: "Manage your tenancy", href: gsa("/manage-your-home/customer-portal") },
];

export function QuickLinks() {
  return (
    <section className="region-s bg-light-grey">
      <div className="wrapper">
        <article className="quick-links center-text">
          <ul className="switcher gap-s-m">
            {quickLinks.map((l) => (
              <li key={l.label} className="quick-links__item gap-xs radius-l">
                <i className={`quick-links__icon fa-solid ${l.icon}`} aria-hidden="true" />
                <a href={l.href}>{l.label}</a>
                <i className="fa-solid fa-arrow-right" aria-hidden="true" />
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}

const features = [
  {
    title: "Manage your home",
    text: "Everything you need to know about repairing and maintaining your home, rent and service charges, and your tenancy agreement or lease.",
    cta: "Manage your home",
    href: gsa("/manage-your-home"),
    image: "/images/manage-your-home.jpg",
    alt: "A smiling GSA customer leans casually against a wall, looking directly at the camera with a warm expression",
    bg: "bg-light",
    reverse: true,
  },
  {
    title: "Find a home",
    text: "Whether you're looking to rent or buy your next home, we have the place for you.",
    cta: "Find a home",
    href: gsa("/find-a-home"),
    image: "/images/find-a-home.jpg",
    alt: "A family of three walking hand in hand along a garden path. A young child in a mustard-yellow jacket walks between two adults, who are smiling and looking down at him. They are outdoors in a residential setting with grass, a wooden fence, and brick buildings in the background.",
    bg: "bg-light-grey",
    reverse: false,
  },
  {
    title: "Care and support",
    text: "We offer a wide range of care and support services, including residential care, supported living, extra care schemes, community support and care in your own home.",
    cta: "Find a care and support service",
    href: gsa("/care-and-support"),
    image: "/images/care-and-support.jpg",
    alt: "An elderly woman with gray hair walks slowly down a well-lit corridor, supported by her daughter, who gently holds her arm for stability",
    bg: "bg-light",
    reverse: true,
  },
];

export function ImageAndTextBlocks() {
  return (
    <>
      {features.map((f) => (
        <section key={f.title} className={`region ${f.bg}`}>
          <div className="wrapper">
            <article className={`image-and-text switcher gap-m-xl${f.reverse ? " reverse" : ""}`}>
              <div className="image-and-text__summary flow">
                <h2 className="h3">{f.title}</h2>
                <p>{f.text}</p>
                <a href={f.href} className="button radius">
                  {f.cta}
                </a>
              </div>
              <figure>
                <Image
                  src={f.image}
                  alt={f.alt}
                  width={1024}
                  height={683}
                  sizes="(min-width: 1280px) 600px, (min-width: 980px) 45vw, 95vw"
                  className="image-and-text__image radius-l"
                />
              </figure>
            </article>
          </div>
        </section>
      ))}
    </>
  );
}

export function CtaPanel() {
  return (
    <section className="region bg-mid-grey">
      <div className="wrapper">
        <article className="cta-panel gap-m">
          <div className="flow">
            <h2>Save time, do it online!</h2>
            <p>
              Did you know you can view your balance, pay your rent and report repairs online on our
              customer portal? It only takes five minutes to create an account.
            </p>
          </div>
          <div>
            <p>
              <a className="button" href={gsa("/manage-your-home/customer-portal")}>
                Create an account
              </a>
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}

const news = [
  {
    date: "2026-10-07",
    label: "7 October 2026",
    title: "Update on the Regulator of Social Housing's latest judgement",
    summary: "Today, the Regulator of Social Housing (RSH) published its latest regulatory judgement for GSA.",
    href: gsa("/news/corporate/update-on-the-regulator-of-social-housings-latest-judgement"),
    image: "/images/news-1.png",
  },
  {
    date: "2026-10-05",
    label: "5 October 2026",
    title: "Mural brings splash of colour to Chippenham street",
    summary: "We supported this project through our Community Impact Fund",
    href: gsa("/news/community/mural-brings-splash-of-colour-to-chippenham-street"),
    image: "/images/news-2.jpg",
  },
  {
    date: "2026-09-30",
    label: "30 September 2026",
    title: "New customer-friendly Code of Conduct launched",
    summary: "What our customers can expect from us",
    href: gsa("/news/community/new-customer-friendly-code-of-conduct-launched"),
    image: "/images/news-3.png",
  },
];

export function LatestNews() {
  return (
    <section className="region bg-light">
      <div className="wrapper">
        <article className="latest-news">
          <div className="flow">
            <h2>Latest news</h2>
            <p>Some of our recent highlights.</p>
            <div className="mt-m-site">
              <ul className="auto-grid gap-m" style={{ ["--auto-grid-min-size" as string]: "20rem" }}>
                {news.map((n) => (
                  <li key={n.title}>
                    <article className="card flow">
                      <div className="frame radius">
                        <Image src={n.image} alt="" width={640} height={427} sizes="(min-width: 980px) 33vw, 95vw" />
                      </div>
                      <div className="card__content flow-s">
                        <time className="small bold color-secondary" dateTime={n.date}>
                          {n.label}
                        </time>
                        <h3 className="h4">
                          <a className="card__link" href={n.href}>
                            {n.title}
                          </a>
                        </h3>
                        <p>{n.summary}</p>
                        <p className="small bold">
                          <i className="icon-left fa-solid fa-arrow-right" aria-hidden="true" />
                          Read more
                        </p>
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
            </div>
            <p>
              <a className="button mt-s-site" href={gsa("/news")}>
                View all news
              </a>
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
