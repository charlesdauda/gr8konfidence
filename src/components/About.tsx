import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import portrait from "../assets/images/about.png";

const NAME = "Gr8 Konfidence";
const ROLE = "Creative Designer";
const LOCATION = "Accra, Ghana";

const LABEL = "About me";
const HEADLINE_ONE = "I turn ideas into";
const HEADLINE_TWO = "brands people remember.";

const PARAGRAPHS = [
  "I'm a creative director with over a decade of experience shaping brands, campaigns and digital products for startups, agencies and global names. I lead with a simple belief: great design is clear thinking made visible.",
  "My work sits where strategy meets craft. I guide teams from the first sketch to the final launch, keeping every decision tied to a bigger idea, so the result feels sharp, human and unmistakably yours.",
];

const STATS = [
  { value: 10, suffix: "+", label: "Years of experience" },
  { value: 120, suffix: "+", label: "Projects delivered" },
  { value: 40, suffix: "+", label: "Brands elevated" },
  { value: 20, suffix: "+", label: "Recommendations" },
];

const DISCIPLINES = [
  "Art Direction",
  "Brand Identity",
  "Campaigns",
  "Graphic Design",
  "Motion",
  "Web Design",
  "Logo Creation",
  "AI Movie Creation",
  "Creative Strategy",
];

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};

const lineReveal: Variants = {
  hidden: { y: "115%" },
  show: { y: 0, transition: { duration: 1, ease } },
};

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.8,
      ease,
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export default function About() {
  const photoRef = useRef<HTMLDivElement>(null);

  // Subtle parallax: the photo drifts slightly inside its frame as you scroll.
  const { scrollYProgress } = useScroll({
    target: photoRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section
      id="about"
      className="relative isolate overflow-hidden bg-black py-20 sm:py-28 lg:py-36"
    >
      {/* Oversized outlined word in the background */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-4%] top-8 -z-10 select-none font-gothic text-[clamp(8rem,28vw,26rem)] uppercase leading-none text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.06)]"
      >
        About
      </div>

      {/* Soft brand glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-10%] top-[20%] h-[55vmin] w-[55vmin] rounded-full bg-green/5 blur-[140px]" />
        <div className="absolute bottom-[0%] right-[-10%] h-[50vmin] w-[50vmin] rounded-full bg-blue-light/5 blur-[140px]" />
      </div>

      <div className="mx-auto grid w-full max-w-350 items-start gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-12">
        {/* ───────── Left: photo ───────── */}
        <motion.div
          ref={photoRef}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 1.1, ease }}
          className="relative mx-auto w-full max-w-md lg:sticky lg:top-28 lg:col-span-5 lg:max-w-none"
        >
          {/* Offset outline frame */}
          <div
            aria-hidden
            className="absolute -bottom-4 -right-4 h-full w-full rounded-sm border border-green/40 sm:-bottom-5 sm:-right-5"
          />

          <div className="relative aspect-4/5 w-full overflow-hidden rounded-sm bg-white/3">
            <motion.img
              src={portrait}
              alt={`Portrait of ${NAME}`}
              loading="lazy"
              decoding="async"
              style={{ y: imageY }}
              className="absolute inset-0 h-[112%] w-full translate-y-[-6%] scale-100 object-cover object-top grayscale transition-[filter,transform] duration-700 ease-out hover:scale-[1.03] hover:grayscale-0"
            />
            {/* Bottom fade for legibility */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/70 to-transparent"
            />
            {/* Corner brackets */}
            {[
              "left-3 top-3 border-l border-t",
              "right-3 top-3 border-r border-t",
              "bottom-3 left-3 border-b border-l",
              "bottom-3 right-3 border-b border-r",
            ].map((pos) => (
              <span
                key={pos}
                aria-hidden
                className={`pointer-events-none absolute h-5 w-5 border-white/70 ${pos}`}
              />
            ))}

            {/* Name tag */}
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
              <div>
                <p className="font-anton text-2xl uppercase leading-none tracking-wide text-white sm:text-3xl">
                  {NAME}
                </p>
                <p className="mt-1.5 font-oswald text-xs uppercase tracking-[0.2em] text-green-light sm:text-sm">
                  {ROLE}
                </p>
              </div>
              <p className="hidden font-oswald text-xs uppercase tracking-[0.2em] text-white/70 sm:block">
                {LOCATION}
              </p>
            </div>
          </div>
        </motion.div>

        {/* ───────── Right: content ───────── */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0px" }}
          className="lg:col-span-7 lg:pt-4"
        >
          <motion.p
            variants={fadeUp}
            className="font-oswald text-sm uppercase tracking-[0.2em] text-white/85"
          >
            <span className="mr-2 text-green">[</span>
            {LABEL}
            <span className="ml-2 text-green">]</span>
          </motion.p>

          <h2 className="mt-6">
            <span className="block overflow-hidden pb-[0.04em]">
              <motion.span
                variants={lineReveal}
                className="block font-anton text-[clamp(2.4rem,7.5vw,5.5rem)] uppercase leading-[0.98] tracking-[0.005em] text-white"
              >
                {HEADLINE_ONE}
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span
                variants={lineReveal}
                className="block w-fit bg-linear-to-r from-green via-green-light to-blue-light bg-clip-text font-anton text-[clamp(2.4rem,7.5vw,5.5rem)] uppercase leading-[0.98] tracking-[0.005em] text-transparent"
              >
                {HEADLINE_TWO}
              </motion.span>
            </span>
          </h2>

          <div className="mt-8 max-w-2xl space-y-5">
            {PARAGRAPHS.map((text) => (
              <motion.p
                key={text}
                variants={fadeUp}
                className="text-[0.95rem] leading-relaxed text-white/60 sm:text-base lg:text-[1.05rem]"
              >
                {text}
              </motion.p>
            ))}
          </div>

          {/* Stats */}
          <motion.dl
            variants={fadeUp}
            className="mt-12 grid grid-cols-2 border-y border-white/10 sm:grid-cols-4"
          >
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className={`px-1 py-6 sm:px-5 sm:py-8 ${
                  i % 2 === 1 ? "border-l border-white/10" : ""
                } ${i >= 2 ? "border-t border-white/10 sm:border-t-0" : ""} ${
                  i === 2 ? "sm:border-l sm:border-white/10" : ""
                } ${i === 0 ? "sm:pl-0" : ""}`}
              >
                <dt className="font-anton text-4xl leading-none text-white sm:text-5xl">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </dt>
                <dd className="mt-2 font-oswald text-[0.7rem] uppercase tracking-[0.18em] text-white/50 sm:text-xs">
                  {stat.label}
                </dd>
              </div>
            ))}
          </motion.dl>

          {/* Disciplines */}
          <motion.div variants={fadeUp} className="mt-10">
            <p className="font-oswald text-xs uppercase tracking-[0.2em] text-white/50">
              What I do
            </p>
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {DISCIPLINES.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-white/15 px-4 py-2 font-oswald text-xs uppercase tracking-[0.14em] text-white/80 transition-colors duration-300 hover:border-green hover:text-green-light sm:text-[0.8rem]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}