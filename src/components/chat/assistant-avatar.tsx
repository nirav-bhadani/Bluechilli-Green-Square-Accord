import { GsaMark } from "@/components/brand/gsa-mark";
import { cn } from "@/lib/utils";

/** Charcoal disc with the colour GSA mark and an optional "online" dot. */
export function AssistantAvatar({
  size = "md",
  online = true,
  className,
}: {
  size?: "sm" | "md" | "lg";
  online?: boolean;
  className?: string;
}) {
  const box = { sm: "h-10 w-10", md: "h-11 w-11", lg: "h-16 w-16 rounded-2xl" }[size];
  const mark = { sm: "h-5 w-5", md: "h-6 w-6", lg: "h-9 w-9" }[size];
  return (
    <span
      className={cn(
        "relative grid shrink-0 place-items-center rounded-full bg-ink text-white",
        box,
        className
      )}
    >
      <GsaMark className={mark} />
      {online && (
        <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-leaf" />
      )}
    </span>
  );
}
