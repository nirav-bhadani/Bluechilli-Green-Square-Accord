"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, History, Phone, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { gsa, siteConfig } from "@/lib/site";
import { GsaMark } from "@/components/brand/gsa-mark";
import { AssistantAvatar } from "./assistant-avatar";
import { ChatMessage } from "./chat-message";
import { Composer } from "./composer";
import { createThread, setActiveThread, useChatStore } from "./chat-store";
import { MOBILE_SUGGESTIONS, POPULAR } from "./prompts";
import { useChat } from "./use-chat";

export function ChatPanel({
  onClose,
  initialPrompt,
  onPromptConsumed,
}: {
  onClose: () => void;
  initialPrompt?: string | null;
  onPromptConsumed?: () => void;
}) {
  const [showRecent, setShowRecent] = useState(false);
  const [input, setInput] = useState("");
  const { messages, send, stop, isStreaming } = useChat();
  const { threads } = useChatStore();
  const scrollRef = useRef<HTMLDivElement>(null);
  const seededRef = useRef(false);

  // Seed the panel with a prompt handed in from a CTA elsewhere on the page.
  useEffect(() => {
    if (initialPrompt && !seededRef.current) {
      seededRef.current = true;
      createThread();
      send(initialPrompt);
      onPromptConsumed?.();
    }
  }, [initialPrompt, send, onPromptConsumed]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  // Lock page scroll behind the overlay; Escape closes it.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const submit = () => {
    if (!input.trim()) return;
    send(input);
    setInput("");
  };

  const ask = (q: string) => {
    send(q);
    setShowRecent(false);
  };

  const empty = messages.length === 0;

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="GSA Assistant"
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 24, scale: 0.98 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-2 z-[70] flex flex-col overflow-hidden rounded-2xl border border-line bg-white text-ink shadow-premium sm:inset-4 min-[1200px]:inset-6"
    >
      {/* ---------- Header ---------- */}
      <div className="flex items-center justify-between gap-2 border-b border-line bg-white px-4 py-3 sm:px-5">
        <div className="flex items-center gap-3">
          <AssistantAvatar size="sm" />
          <div className="leading-tight">
            <p className="text-sm font-bold text-ink">GSA Assistant</p>
            <p className="text-xs font-semibold text-teal">Online · replies instantly</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowRecent((v) => !v)}
            aria-label="Recent chats"
            aria-pressed={showRecent}
            className={cn(
              "flex h-9 items-center gap-1.5 rounded-pill px-2.5 text-xs font-bold transition-colors sm:px-3",
              showRecent ? "bg-ink text-white" : "text-ink hover:bg-surface"
            )}
          >
            <History className="h-4 w-4" />
            <span className="hidden min-[576px]:inline">Recent</span>
          </button>
          <button
            onClick={() => {
              createThread();
              setShowRecent(false);
            }}
            aria-label="New chat"
            className="flex h-9 items-center gap-1.5 rounded-pill px-2.5 text-xs font-bold text-ink transition-colors hover:bg-surface sm:px-3"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden min-[576px]:inline">New chat</span>
          </button>
          <button
            onClick={onClose}
            aria-label="Close chat"
            className="grid h-9 w-9 place-items-center rounded-full text-ink transition-colors hover:bg-surface"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>

      {/* ---------- Body: conversation + sidebar ---------- */}
      <div className="relative flex flex-1 overflow-hidden">
        {/* Recent overlay */}
        {showRecent && (
          <div className="absolute inset-0 z-20 overflow-y-auto bg-white p-4 sm:p-6">
            <p className="mx-auto mb-3 max-w-2xl text-xs font-bold uppercase tracking-wider text-mute">
              Recent chats
            </p>
            {threads.length === 0 ? (
              <p className="mx-auto max-w-2xl text-sm text-mute">No conversations yet.</p>
            ) : (
              <ul className="mx-auto flex max-w-2xl flex-col gap-1.5">
                {threads.map((t) => (
                  <li key={t.id}>
                    <button
                      onClick={() => {
                        setActiveThread(t.id);
                        setShowRecent(false);
                      }}
                      className="w-full truncate rounded-xl border border-line bg-white px-3 py-2.5 text-left text-sm font-medium text-ink transition-colors hover:border-teal/40"
                    >
                      {t.title || "New chat"}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Conversation column */}
        <div className="flex min-w-0 flex-1 flex-col bg-surface/60">
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 sm:p-6">
            {empty ? (
              <div className="mx-auto flex h-full max-w-2xl flex-col items-center justify-center gap-6 text-center">
                <AssistantAvatar size="lg" online={false} className="shadow-card" />
                <div>
                  <p className="mx-auto max-w-none text-xs font-bold uppercase tracking-[0.2em] text-teal">
                    GSA Assistant
                  </p>
                  <h3 className="mx-auto mt-2 text-2xl font-bold text-ink">How can we help today?</h3>
                  <p className="mx-auto mt-2 max-w-md text-sm text-mute">
                    I can help with repairs, paying your rent, your tenancy, finding a home, and our
                    care and support services.
                  </p>
                </div>
                {/* Suggestions on smaller screens (desktop uses the sidebar) */}
                <div className="grid w-full gap-2.5 min-[560px]:grid-cols-2 min-[1024px]:hidden">
                  {MOBILE_SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => ask(s)}
                      className="group flex items-center justify-between gap-3 rounded-xl border border-line bg-white px-4 py-3 text-left text-sm font-semibold text-ink shadow-xs transition-all hover:border-teal/40 hover:shadow-soft"
                    >
                      {s}
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-mute transition-colors group-hover:text-brand" />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mx-auto flex max-w-2xl flex-col gap-4">
                {messages.map((m) => (
                  <ChatMessage key={m.id} message={m} />
                ))}
              </div>
            )}
          </div>

          {/* Composer */}
          <div className="border-t border-line bg-white p-3 sm:p-4">
            <Composer
              value={input}
              onChange={setInput}
              onSubmit={submit}
              onStop={stop}
              isStreaming={isStreaming}
              placeholder="Type your question…"
              className="mx-auto max-w-2xl bg-surface focus-within:bg-white"
            />
            <p className="mx-auto mt-2 max-w-2xl text-center text-[0.68rem] text-mute">
              AI assistant - for general guidance only. It can&apos;t see your account. In an
              emergency call {siteConfig.phone}, or 999 if life is at risk.
            </p>
          </div>
        </div>

        {/* Sidebar (desktop) */}
        <aside className="relative hidden w-[340px] shrink-0 flex-col overflow-hidden bg-ink p-6 text-white/80 min-[1024px]:flex">
          {/* GSA four-colour arcs, echoing the hero */}
          <div
            aria-hidden="true"
            className="chat-arc pointer-events-none absolute -bottom-36 -right-44 h-[18rem] w-[18rem] opacity-50"
          />

          <span className="relative grid h-14 w-14 place-items-center rounded-xl bg-white/10 ring-1 ring-white/15">
            <GsaMark className="h-8 w-8" />
          </span>
          <h3 className="relative mt-5 text-xl font-bold text-white">We thrive at home</h3>
          <p className="relative mt-2 text-sm leading-relaxed">
            Quick answers on repairs, rent, your tenancy, finding a home and care and support.
          </p>

          <p className="relative mt-7 text-xs font-bold uppercase tracking-[0.18em] text-orange">
            Popular questions
          </p>
          <div className="relative mt-3 flex flex-1 flex-col gap-2 overflow-y-auto pr-1">
            {POPULAR.map((q) => (
              <button
                key={q}
                onClick={() => ask(q)}
                className="group flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-left text-sm font-semibold text-white transition-colors hover:border-orange/60 hover:bg-white/10"
              >
                {q}
                <ArrowUpRight className="h-4 w-4 shrink-0 text-white/50 transition-colors group-hover:text-orange" />
              </button>
            ))}
          </div>

          <a
            href={siteConfig.phoneHref}
            className="relative mt-5 flex items-center gap-3 border-t border-white/10 pt-5 text-white transition-colors hover:text-orange"
          >
            <span className="grid h-10 w-10 place-items-center rounded-full bg-white/10">
              <Phone className="h-4 w-4 text-orange" />
            </span>
            <span className="leading-tight">
              <span className="block text-base font-bold">{siteConfig.phone}</span>
              <span className="block text-xs text-white/70">Mon–Fri, 8am–6pm · emergencies 24/7</span>
            </span>
          </a>
          <a
            href={gsa("/manage-your-home/customer-portal")}
            className="relative mt-3 text-xs font-semibold text-white/80 underline underline-offset-2 hover:text-white"
          >
            Sign in to myGSA to view your account
          </a>
        </aside>
      </div>
    </motion.div>
  );
}
