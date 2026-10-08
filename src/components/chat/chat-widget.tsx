"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GsaMark } from "@/components/brand/gsa-mark";
import { ChatPanel } from "./chat-panel";
import { hydrateStore } from "./chat-store";

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [pendingPrompt, setPendingPrompt] = useState<string | null>(null);

  useEffect(() => {
    hydrateStore();
  }, []);

  useEffect(() => {
    const onOpen = (e: Event) => {
      const prompt = (e as CustomEvent<{ prompt?: string }>).detail?.prompt;
      if (prompt) setPendingPrompt(prompt);
      setOpen(true);
    };
    window.addEventListener("openChat", onOpen);
    return () => window.removeEventListener("openChat", onOpen);
  }, []);

  // Hide the pill while the hero chat card sits in the bottom strip of the
  // viewport, so it never covers the card's composer. It returns on scroll.
  const [overHeroChat, setOverHeroChat] = useState(false);
  useEffect(() => {
    const card = document.querySelector("[data-hero-chat]");
    if (!card) return;
    const io = new IntersectionObserver(
      ([entry]) => setOverHeroChat(entry.isIntersecting),
      { rootMargin: "-82% 0px 0px 0px" }
    );
    io.observe(card);
    return () => io.disconnect();
  }, []);

  const close = useCallback(() => setOpen(false), []);
  const consumePrompt = useCallback(() => setPendingPrompt(null), []);

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-backdrop"
            aria-hidden="true"
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[69] bg-ink/45 backdrop-blur-md"
          />
        )}
        {open && (
          <ChatPanel
            key="chat-panel"
            onClose={close}
            initialPrompt={pendingPrompt}
            onPromptConsumed={consumePrompt}
          />
        )}
      </AnimatePresence>

      {/* Floating pill launcher (the open panel has its own close button) */}
      <AnimatePresence>
        {!open && !overHeroChat && (
          <motion.button
            key="chat-pill"
            onClick={() => setOpen(true)}
            aria-label="Open assistant"
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0, transition: { duration: 0.2 } }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="group fixed bottom-5 right-5 z-[71] flex items-center gap-3 rounded-pill border border-line bg-white/95 py-2 pl-2 pr-5 shadow-premium backdrop-blur-xl sm:bottom-6 sm:right-6"
          >
            <span className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink text-white">
              <GsaMark className="h-6 w-6" />
              <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-leaf" />
              <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-brand/30" />
            </span>
            <span className="flex flex-col items-start leading-tight">
              <span className="text-[0.7rem] font-semibold text-mute">GSA Assistant</span>
              <span className="text-sm font-bold text-brand">Ask me anything</span>
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
