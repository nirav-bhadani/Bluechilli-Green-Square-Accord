"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { GsaMark } from "@/components/brand/gsa-mark";
import { cn } from "@/lib/utils";
import type { ChatMessage as Msg } from "./chat-store";

export function ChatMessage({ message }: { message: Msg }) {
  const isUser = message.role === "user";

  return (
    <div className={cn("flex gap-2.5", isUser ? "flex-row-reverse" : "flex-row")}>
      <span
        className={cn(
          "mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full",
          isUser ? "bg-brand text-white" : "bg-ink"
        )}
      >
        {isUser ? (
          <span className="text-[0.7rem] font-bold">You</span>
        ) : (
          <GsaMark className="h-4.5 w-4.5" />
        )}
      </span>
      <div
        className={cn(
          "min-w-0 max-w-[82%] overflow-hidden break-words rounded-2xl px-4 py-2.5 text-sm shadow-soft [overflow-wrap:anywhere]",
          isUser
            ? "rounded-tr-sm bg-brand text-white"
            : "rounded-tl-sm border border-line bg-white text-ink"
        )}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
        ) : message.content ? (
          <div className="prose-chat">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                a: ({ node: _node, ...props }) => (
                  <a {...props} target="_blank" rel="noopener noreferrer" />
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        ) : (
          <span className="flex items-center gap-1.5 py-1 text-mute">
            <span className="flex gap-1">
              <span className="typing-dot" />
              <span className="typing-dot" style={{ animationDelay: "0.15s" }} />
              <span className="typing-dot" style={{ animationDelay: "0.3s" }} />
            </span>
          </span>
        )}
      </div>
    </div>
  );
}
