import { Hero } from "@/components/sections/hero";
import {
  CtaPanel,
  ImageAndTextBlocks,
  LatestNews,
  QuickLinks,
} from "@/components/sections/home-sections";

export default function HomePage() {
  return (
    <>
      <Hero />
      <QuickLinks />
      <ImageAndTextBlocks />
      <CtaPanel />
      <LatestNews />
    </>
  );
}
