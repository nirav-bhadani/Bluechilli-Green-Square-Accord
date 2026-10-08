/**
 * Opens the global GSA assistant. Optionally seeds it with a starting
 * prompt (e.g. from the hero input or a suggestion chip), which the panel
 * sends automatically on open.
 */
export function openChat(prompt?: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("openChat", { detail: prompt ? { prompt } : {} })
  );
}
