import { gsa } from "@/lib/site";
import { HeroChat } from "@/components/chat/hero-chat";

/**
 * Featured hero, as on greensquareaccord.co.uk: copy on the left and the
 * four-colour arcs on the right. The photo inside the circle is left out so
 * the assistant card sits cleanly on the dark background (desktop); on mobile
 * the card stacks under the copy with the arc band beneath it.
 */
export function Hero() {
  return (
    <header className="bg-dark featured-hero">
      <div className="region-s featured-hero__text">
        <div className="featured-hero__summary flow">
          <span className="hero__eyebrow color-tertiary">We thrive at home</span>
          <h1 className="h2">Welcome to GSA</h1>
          <p>
            We provide affordable homes and services that create a foundation from which people in
            our communities can thrive.
          </p>
          <a href={gsa("/about")} className="button color-light" data-variant="tertiary">
            Find out more about GSA
          </a>
        </div>
      </div>

      <div className="featured-hero__visual">
        <div className="featured-hero__figure" aria-hidden="true" />
        <div className="featured-hero__chat">
          <HeroChat />
        </div>
      </div>
    </header>
  );
}
