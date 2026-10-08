import Image from "next/image";
import { gsa } from "@/lib/site";
import { HeroChat } from "@/components/chat/hero-chat";

/**
 * Featured hero, as on greensquareaccord.co.uk: copy on the left, the
 * circle-masked photo with the four-colour arcs on the right. The assistant
 * card floats over the photo on desktop and stacks above it on mobile.
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
        <figure className="featured-hero__figure">
          <Image
            src="/images/hero.jpg"
            alt="A mother and her young son sitting together on a cozy sofa"
            fill
            priority
            sizes="(min-width: 1280px) 750px, (min-width: 980px) 50vw, 100vw"
            className="featured-hero__image"
          />
        </figure>
        <div className="featured-hero__chat">
          <HeroChat />
        </div>
      </div>
    </header>
  );
}
