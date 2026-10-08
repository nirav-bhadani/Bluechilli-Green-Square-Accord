"use client";

import { useEffect, useRef, useState } from "react";
import { FileText, ImageIcon, Paperclip } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Paperclip button with an "Add photos / Add files" popover, matching the
 * reference. Selecting a file reports its name via `onAttach` (referenced in
 * the composer input).
 */
export function Attach({
  onAttach,
  className,
}: {
  onAttach?: (fileName: string) => void;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const pick = (file?: File) => {
    if (file) onAttach?.(file.name);
    setOpen(false);
  };

  return (
    <div ref={wrapRef} className={cn("relative shrink-0", className)}>
      <button
        type="button"
        aria-label="Add photos or files"
        aria-expanded={open}
        aria-haspopup="menu"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "grid h-9 w-9 place-items-center rounded-full transition-colors",
          open ? "bg-teal-soft text-teal" : "text-mute hover:bg-surface hover:text-teal"
        )}
      >
        <Paperclip className="h-4.5 w-4.5" />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute bottom-full left-0 z-30 mb-2 w-44 overflow-hidden rounded-2xl border border-line bg-white p-1.5 shadow-card"
        >
          <button
            type="button"
            role="menuitem"
            onClick={() => photoRef.current?.click()}
            className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-ink transition-colors hover:bg-surface"
          >
            <ImageIcon className="h-4.5 w-4.5 text-teal" />
            Add photos
          </button>
          <button
            type="button"
            role="menuitem"
            onClick={() => fileRef.current?.click()}
            className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-ink transition-colors hover:bg-surface"
          >
            <FileText className="h-4.5 w-4.5 text-teal" />
            Add files
          </button>
        </div>
      )}

      <input
        ref={photoRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          pick(e.target.files?.[0]);
          e.target.value = "";
        }}
      />
      <input
        ref={fileRef}
        type="file"
        accept=".pdf,.doc,.docx,.txt,.csv,.xls,.xlsx"
        className="hidden"
        onChange={(e) => {
          pick(e.target.files?.[0]);
          e.target.value = "";
        }}
      />
    </div>
  );
}
