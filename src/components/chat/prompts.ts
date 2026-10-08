import { HeartHandshake, House, PoundSterling, Wrench } from "lucide-react";

/** Suggestion cards in the hero chat (empty state). */
export const HERO_SUGGESTIONS = [
  { icon: Wrench, label: "How do I report a repair?" },
  { icon: PoundSterling, label: "What are the ways to pay my rent?" },
  { icon: House, label: "How can I find a home to rent?" },
  { icon: HeartHandshake, label: "What care and support do you offer?" },
];

/** "Popular questions" in the full chat panel sidebar (desktop). */
export const POPULAR = [
  "How do I report a repair?",
  "What counts as an emergency repair?",
  "What are the ways to pay my rent?",
  "I'm struggling to pay my rent",
  "How does shared ownership work?",
  "How do I make a complaint?",
];

/** Suggestions in the full chat panel on smaller screens (no sidebar). */
export const MOBILE_SUGGESTIONS = [
  "How do I report a repair?",
  "What are the ways to pay my rent?",
  "How can I find a home to rent?",
  "How do I make a complaint?",
];
