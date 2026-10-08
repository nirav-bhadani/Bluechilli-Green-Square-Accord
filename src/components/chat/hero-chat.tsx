"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Maximize2, Plus } from "lucide-react";
import { gsa } from "@/lib/site";
import { cn } from "@/lib/utils";
import { AssistantAvatar } from "./assistant-avatar";
import { ChatMessage } from "./chat-message";
import { Composer } from "./composer";
import { createThread } from "./chat-store";
import { openChat } from "./open-chat";
import { HERO_SUGGESTIONS } from "./prompts";
import { useChat } from "./use-chat";

/**
 * Inline assistant card for the hero. Replies stream right here in the card;
 * the expand button (and the floating pill) open the full-screen panel, which
 * continues the same conversation.
 */
export function HeroChat() {
  const [value, setValue] = useState("");
  const { messages, send, stop, isStreaming } = useChat();
  const scrollRef = useRef<HTMLDivElement>(null);

  const empty = messages.length === 0;

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const submit = () => {
    const q = value.trim();
    if (!q) return;
    send(q);
    setValue("");
  };

  return (
    <div className="relative w-full">
      <div
        data-hero-chat
        className={cn(
          "flex h-[34rem] flex-col overflow-hidden rounded-2xl border border-white/40 bg-white/95 text-ink shadow-premium backdrop-blur-xl sm:h-[36rem]",
          // On small screens the welcome state sizes to its content.
          empty && "max-[960px]:h-auto"
        )}
      >
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-line px-5 py-4">
          <AssistantAvatar />
          <div className="min-w-0 flex-1 leading-tight">
            <p className="text-[0.95rem] font-bold text-ink">GSA Assistant</p>
            <p className="truncate text-xs font-semibold text-teal">Online · here to help 24/7</p>
          </div>
          {!empty && (
            <button
              onClick={() => {
                createThread();
                setValue("");
              }}
              className="flex h-9 shrink-0 items-center gap-1.5 rounded-pill px-3 text-xs font-bold text-ink transition-colors hover:bg-surface"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden min-[400px]:inline">New chat</span>
            </button>
          )}
          <button
            onClick={() => openChat()}
            aria-label="Open full-screen chat"
            title="Open full-screen chat"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-ink transition-colors hover:bg-surface"
          >
            <Maximize2 className="h-4 w-4" />
          </button>
        </div>

        {/* Body: welcome + suggestions, or the inline conversation */}
        {empty ? (
          <div className="flex flex-1 flex-col overflow-y-auto px-5 py-5">
            <div className="mt-auto text-center">
              <p className="mx-auto max-w-none text-[0.7rem] font-bold uppercase tracking-[0.2em] text-teal">
                Ask the GSA Assistant
              </p>
              <h2 className="mx-auto mt-2 text-[1.45rem] font-bold leading-tight text-ink">
                How can we help you today?
              </h2>
              <p className="mx-auto mt-2 max-w-sm text-sm text-mute">
                Repairs, rent, your tenancy, finding a home or care and support - just ask.
              </p>
            </div>

            <div className="mb-auto mt-5 grid gap-2.5 min-[420px]:grid-cols-2">
              {HERO_SUGGESTIONS.map((s) => (
                <motion.button
                  key={s.label}
                  onClick={() => send(s.label)}
                  whileTap={{ scale: 0.98 }}
                  className="group flex items-center gap-3 rounded-xl border border-line bg-white px-3.5 py-3 text-left transition-all hover:border-teal/40 hover:shadow-soft"
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-teal-soft text-teal transition-colors group-hover:bg-teal group-hover:text-white">
                    <s.icon className="h-4.5 w-4.5" />
                  </span>
                  <span className="flex-1 text-[0.82rem] font-semibold leading-snug text-ink">
                    {s.label}
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-mute transition-colors group-hover:text-brand" />
                </motion.button>
              ))}
            </div>
          </div>
        ) : (
          <div ref={scrollRef} className="flex flex-1 flex-col gap-4 overflow-y-auto bg-surface/60 px-4 py-5">
            {messages.map((m) => (
              <ChatMessage key={m.id} message={m} />
            ))}
          </div>
        )}

        {/* Composer */}
        <div className="border-t border-line px-4 pb-3 pt-3">
          <Composer
            value={value}
            onChange={setValue}
            onSubmit={submit}
            onStop={stop}
            isStreaming={isStreaming}
            placeholder="Type your question…"
          />
          <p className="mt-2 text-center text-[0.68rem] leading-relaxed text-mute">
            AI assistant - can make mistakes. Don&apos;t share personal or bank details.{" "}
            <a href={gsa("/privacy-notice")} className="font-semibold text-ink underline">
              Privacy notice
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
