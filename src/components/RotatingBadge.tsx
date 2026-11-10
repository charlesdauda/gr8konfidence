import { useId } from "react";

const DEFAULT_TEXT = "Scroll to explore • Available for work • ";
const DEFAULT_HREF = "#work";

type RotatingBadgeProps = {
  text?: string;
  href?: string;
};

export default function RotatingBadge({
  text = DEFAULT_TEXT,
  href = DEFAULT_HREF,
}: RotatingBadgeProps) {
  const id = useId().replace(/:/g, "");

  return (
    <a
      href={href}
      aria-label="Scroll down"
      className="group relative grid h-28 w-28 shrink-0 place-items-center rounded-full lg:h-32 lg:w-32"
    >
      <svg
        viewBox="0 0 120 120"
        aria-hidden
        className="absolute inset-0 h-full w-full animate-spin-slow"
      >
        <defs>
          <path id={id} d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
        </defs>
        <text
          className="fill-white/80 font-bebas uppercase"
          fontSize="14"
          letterSpacing="1.6"
        >
          <textPath href={`#${id}`} textLength="286" lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>

      <svg
        viewBox="0 0 24 24"
        aria-hidden
        className="h-6 w-6 text-green transition-transform duration-500 group-hover:translate-y-1"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 5v14M6 13l6 6 6-6" />
      </svg>
    </a>
  );
}