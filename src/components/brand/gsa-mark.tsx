/**
 * The four-square GSA symbol, taken from the brand logo SVG.
 * Full colour by default; pass `mono` for a single-colour version.
 */
export function GsaMark({
  className,
  mono,
}: {
  className?: string;
  mono?: string;
}) {
  const teal = mono ?? "#009a93";
  const magenta = mono ?? "#e5007e";
  return (
    <svg viewBox="0 0 41.26 42.91" className={className} aria-hidden="true">
      <polygon fill={teal} points="19.6 36.47 6.45 36.47 6.45 23.32 0 16.87 0 42.91 26.05 42.91 19.6 36.47" />
      <polygon fill={teal} points="22.38 27.3 15.46 27.3 15.46 20.4 9.01 13.95 9.01 33.75 28.83 33.75 22.38 27.3" />
      <polygon fill={magenta} points="21.66 7.52 34.81 7.52 34.81 20.66 41.26 27.11 41.26 1.07 15.21 1.07 21.66 7.52" />
      <polygon fill={magenta} points="18.6 16.96 25.53 16.96 25.53 23.86 31.98 30.31 31.98 10.51 12.15 10.51 18.6 16.96" />
    </svg>
  );
}
