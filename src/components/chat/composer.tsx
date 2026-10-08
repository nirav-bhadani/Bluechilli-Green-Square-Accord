"use client";

import { Send, Square } from "lucide-react";
import { cn } from "@/lib/utils";
import { Attach } from "./attach";

/** Message input shared by the hero card and the full chat panel. */
export function Composer({
  value,
  onChange,
  onSubmit,
  onStop,
  isStreaming,
  placeholder,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onStop: () => void;
  isStreaming: boolean;
  placeholder: string;
  className?: string;
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className={cn(
        "flex items-end gap-2 rounded-[1.25rem] border border-line bg-white px-2.5 py-2 transition-colors focus-within:border-teal/50 focus-within:ring-2 focus-within:ring-teal/15",
        className
      )}
    >
      <Attach onAttach={(name) => onChange(value ? `${value} [${name}]` : `[${name}] `)} />
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSubmit();
          }
        }}
        rows={1}
        placeholder={placeholder}
        aria-label="Message the GSA assistant"
        className="max-h-28 min-h-[2.25rem] min-w-0 flex-1 resize-none bg-transparent py-1.5 text-[0.95rem] text-ink placeholder:text-mute focus:outline-none"
      />
      {isStreaming ? (
        <button
          type="button"
          onClick={onStop}
          aria-label="Stop"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink text-white transition-colors hover:bg-ink-deep"
        >
          <Square className="h-4 w-4 fill-current" />
        </button>
      ) : (
        <button
          type="submit"
          disabled={!value.trim()}
          aria-label="Send"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand text-white transition-colors hover:bg-brand-hover disabled:opacity-40 disabled:hover:bg-brand"
        >
          <Send className="h-4 w-4" />
        </button>
      )}
    </form>
  );
}
