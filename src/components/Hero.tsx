import type { ReactNode } from "react";
import { motion, type Variants } from "framer-motion";
import RotatingBadge from "./RotatingBadge";

const TAG_LEFT = "Creative Designer";
const TAG_CENTER = "Brand · Motion · Digital";
const TAG_RIGHT = "Break the norm";

const LINE_ONE = "Bold ideas,";
const LINE_TWO = "directed";
const LINE_THREE = "with purpose.";

const DESCRIPTION =
  "I shape brands, campaigns and digital experiences that feel unmistakably human, blending artistic instinct with strategic clarity to leave a lasting impression.";

const CTA = {
  label: "Download CV",
  href: "/Emmanuel_Obiri_Odame_CV.pdf",
};
const TICKER = ["Art Direction", "Branding", "Campaigns", "Motion", "Web Design", "Strategy"];

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Headline lines slide up from behind a mask, one after another.
const lineReveal: Variants = {
  hidden: { y: "115%" },
  show: (i: number) => ({
    y: 0,
    transition: { duration: 1.05, ease, delay: 0.25 + i * 0.12 },
  }),
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease, delay },
  }),
};

function Bracketed({ children }: { children: ReactNode }) {
  return (
    <span className="whitespace-nowrap">
      <span className="mr-2 text-green">[</span>
      {children}
      <span className="ml-2 text-green">]</span>
    </span>
  );
}

function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export default function Hero() {
  return (
    <section id="home" className="relative isolate flex min-h-0 flex-col overflow-hidden bg-black lg:min-h-svh">
      {/* Faint vertical guide lines */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="mx-auto h-full w-full max-w-350 px-5 sm:px-8 lg:px-12">
          <div className="relative h-full">
            {["0%", "33.333%", "66.666%", "calc(100% - 1px)"].map((left, i) => (
              <motion.span
                key={left}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 1.6, ease, delay: 0.1 * i }}
                style={{ left }}
                className={`absolute inset-y-0 w-px origin-top bg-white/[0.07] ${
                  i === 1 || i === 2 ? "hidden md:block" : ""
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Very soft brand glow — base stays pure black. Delete this block for 100% flat black. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute bottom-[-30%] left-[5%] h-[60vmin] w-[70vmin] glow-green" />
        <div className="absolute bottom-[-35%] right-[0%] h-[55vmin] w-[70vmin] glow-blue" />
      </div>

      <div className="mx-auto flex w-full max-w-350 flex-none flex-col justify-start gap-8 px-5 pb-4 pt-24 sm:px-8 sm:pb-10 sm:pt-28 lg:flex-1 lg:justify-between lg:gap-12 lg:px-12">
        {/* Top tags */}
        <motion.div
          variants={fadeUp}
          custom={0.9}
          initial="hidden"
          animate="show"
          className="flex items-start justify-between gap-4 font-oswald text-xs uppercase tracking-[0.18em] text-white/85 sm:text-sm"
        >
          <Bracketed>{TAG_LEFT}</Bracketed>
          <span className="hidden text-white/55 md:block">{TAG_CENTER}</span>
          <Bracketed>{TAG_RIGHT}</Bracketed>
        </motion.div>

        {/* Headline + supporting content */}
        <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-8">
          <h1 className="lg:col-span-8">
            <span className="block overflow-hidden pb-[0.04em]">
              <motion.span
                variants={lineReveal}
                custom={0}
                initial="hidden"
                animate="show"
                className="block font-anton text-[clamp(3rem,13.5vw,11rem)] uppercase leading-[0.92] tracking-[0.005em] text-white lg:text-[min(11rem,11.5vw)]"
              >
                {LINE_ONE}
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.04em]">
              <motion.span
                variants={lineReveal}
                custom={1}
                initial="hidden"
                animate="show"
                className="block w-fit bg-linear-to-r from-green via-green-light to-blue-light bg-clip-text font-anton text-[clamp(3rem,13.5vw,11rem)] uppercase leading-[0.92] tracking-[0.005em] text-transparent lg:text-[min(11rem,11.5vw)]"
              >
                {LINE_TWO}
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.04em]">
              <motion.span
                variants={lineReveal}
                custom={2}
                initial="hidden"
                animate="show"
                className="block font-gothic text-[clamp(3.4rem,15.5vw,12.6rem)] uppercase leading-[0.85] tracking-[0.01em] text-transparent [-webkit-text-stroke:1.5px_var(--color-blue-light)] sm:[-webkit-text-stroke:2px_var(--color-blue-light)] lg:text-[min(12rem,13vw)]"
              >
                {LINE_THREE}
              </motion.span>
            </span>
          </h1>

          <div className="flex flex-col gap-8 lg:col-span-4 lg:pb-3">
            <motion.p
              variants={fadeUp}
              custom={0.8}
              initial="hidden"
              animate="show"
              className="max-w-md text-[0.95rem] leading-relaxed text-white/60 sm:text-base"
            >
              {DESCRIPTION}
            </motion.p>

            <motion.div
              variants={fadeUp}
              custom={1}
              initial="hidden"
              animate="show"
              className="flex items-end justify-between gap-6"
            >
              <a
                href={CTA.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2"
              >
                <span className="inline-flex h-12 items-center rounded-md bg-white px-6 font-oswald text-sm font-medium uppercase tracking-wider text-black transition-colors duration-300 group-hover:bg-green-light">
                  {CTA.label}
                </span>
                <span className="grid h-12 w-12 place-items-center rounded-md bg-green text-black transition-colors duration-300 group-hover:bg-blue-light">
                  <ArrowUpRight className="h-5 w-5 transition-transform duration-500 ease-out group-hover:rotate-45" />
                </span>
              </a>

              <div className="hidden sm:block">
                <RotatingBadge />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Services ticker */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="relative overflow-hidden border-t border-white/10 py-3.5 mask-[linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)] sm:py-4"
      >
        <div className="flex w-max animate-marquee whitespace-nowrap font-bebas text-xl tracking-[0.2em] sm:text-2xl">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex shrink-0 items-center">
              {TICKER.map((item) => (
                <li key={item} className="flex items-center">
                  <span className="px-6 text-white/70 sm:px-10">{item}</span>
                  <span className="text-green">✦</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </motion.div>
    </section>
  );
}