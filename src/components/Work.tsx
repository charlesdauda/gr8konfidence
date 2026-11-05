import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  type Variants,
} from "framer-motion";
import WorkLightbox from "./WorkLightbox"
import logo1 from "../assets/images/logo1.png";
import logo2 from "../assets/images/logo2.png";
import logo3 from "../assets/images/logo3.png";

import flyer1 from "../assets/images/flyer1.png";
import flyer2 from "../assets/images/flyer2.png";
import flyer3 from "../assets/images/flyer3.png";
import flyer4 from "../assets/images/flyer4.png";
import flyer5 from "../assets/images/flyer5.png";

import streamer1 from "../assets/images/streamer1.png";
import streamer2 from "../assets/images/streamer2.png";
import streamer3 from "../assets/images/streamer3.png";
import streamer4 from "../assets/images/streamer4.png";
import streamer5 from "../assets/images/streamer5.png";
import streamer6 from "../assets/images/streamer6.png";
import streamer7 from "../assets/images/streamer7.png";
import streamer8 from "../assets/images/streamer8.png";
import streamer9 from "../assets/images/streamer9.png";
import streamer10 from "../assets/images/streamer10.png";
import streamer11 from "../assets/images/streamer11.png";
import streamer12 from "../assets/images/streamer12.png";

import poster1 from "../assets/images/poster1.png";
import poster2 from "../assets/images/poster2.png";
import poster3 from "../assets/images/poster3.png";
import poster4 from "../assets/images/poster4.png";
import poster5 from "../assets/images/poster5.png";

const LABEL = "Selected work";
const HEADLINE_ONE = "Designs that";
const HEADLINE_TWO = "speak for themselves.";
const INTRO =
  "A look at the logos, flyers, stream visuals and posters I've created. Pick a category to browse the full collection.";

const LOGOS = [logo1, logo2, logo3];
const FLYERS = [flyer1, flyer2, flyer3, flyer4, flyer5];
const STREAMERS = [
  streamer1,
  streamer2,
  streamer3,
  streamer4,
  streamer5,
  streamer6,
  streamer7,
  streamer8,
  streamer9,
  streamer10,
  streamer11,
  streamer12,
];
const POSTERS = [poster1, poster2, poster3, poster4, poster5];
const WORK_IMAGES = [...LOGOS, ...FLYERS, ...STREAMERS, ...POSTERS];

type Category = {
  id: string;
  title: string;
  subtitle: string;
  folder: string;
  images: string[];
  span: string; // grid width on tablet/desktop
  glow: string; // placeholder tint
};

const CATEGORIES: Category[] = [
  {
    id: "logos",
    title: "Logo designs",
    subtitle: "Brand identity",
    folder: "src/assets/images/work/logos",
    images: LOGOS,
    span: "md:col-span-5",
    glow: "bg-green/20",
  },
  {
    id: "flyers",
    title: "Flyers",
    subtitle: "Print & digital promos",
    folder: "src/assets/images/work/flyers",
    images: FLYERS,
    span: "md:col-span-7",
    glow: "bg-blue-light/20",
  },
  {
    id: "streamers",
    title: "Streamer designs",
    subtitle: "Overlays, banners & branding",
    folder: "src/assets/images/work/streamers",
    images: STREAMERS,
    span: "md:col-span-7",
    glow: "bg-blue-light/20",
  },
  {
    id: "posters",
    title: "Posters",
    subtitle: "Events & campaigns",
    folder: "src/assets/images/work/posters",
    images: POSTERS,
    span: "md:col-span-5",
    glow: "bg-green/20",
  },
];

/* ───────────── Motion ───────────── */

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};

const lineReveal: Variants = {
  hidden: { y: "115%" },
  show: { y: 0, transition: { duration: 1, ease } },
};

/* ───────────── Card ───────────── */

function WorkCard({ category, onOpen }: { category: Category; onOpen: () => void }) {
  const { id, title, subtitle, images, span, glow } = category;
  const cover = images[0];
  const isPortraitPreview = id === "streamers" || id === "posters";

  return (
    <motion.div variants={fadeUp} className={span}>
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open ${title} gallery`}
        className={`group relative isolate block w-full cursor-pointer overflow-hidden rounded-lg border border-white/10 bg-neutral-950 text-left ${
          isPortraitPreview
            ? "h-112 sm:h-136 lg:h-168"
            : "h-72 sm:h-80 lg:h-96"
        }`}
      >
        {/* Cover image or placeholder */}
        {cover ? (
          <img
            src={cover}
            alt=""
            loading={id === "logos" ? "eager" : "lazy"}
            decoding="async"
            draggable={false}
            className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-1200 ease-out group-hover:scale-105"
          />
        ) : (
          <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden bg-neutral-950">
            <div
              className={`absolute -right-10 -top-10 h-64 w-64 rounded-full blur-3xl transition-transform duration-1000 group-hover:scale-125 ${glow}`}
            />
            <span className="absolute -bottom-4 right-4 select-none font-gothic text-[9rem] uppercase leading-none text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.1)] sm:text-[11rem]">
              {title.split(" ")[0]}
            </span>
          </div>
        )}

        {/* Readability filter */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-linear-to-b from-black/50 via-black/10 to-black/45 transition-colors duration-700 group-hover:from-black/35 group-hover:to-black/25"
        />

        {/* Text */}
        <div className="absolute inset-x-0 top-0 p-5 sm:p-7">
          <h3 className="font-oswald text-xl font-normal uppercase tracking-wide text-white sm:text-2xl">
            {title}
          </h3>
          <p className="mt-1 text-sm text-white/60">{subtitle}</p>
        </div>

      </button>
    </motion.div>
  );
}

/* ───────────── Section ───────────── */

export default function Work() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = CATEGORIES.find((c) => c.id === activeId) ?? null;

  useEffect(() => {
    const connection = (
      navigator as Navigator & {
        connection?: {
          saveData?: boolean;
          effectiveType?: string;
        };
      }
    ).connection;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const isSlowConnection =
      connection?.saveData ||
      connection?.effectiveType === "slow-2g" ||
      connection?.effectiveType === "2g";

    let cancelled = false;
    let nextIndex = 0;
    let activeLoads = 0;
    const concurrency = isMobile || isSlowConnection ? 1 : 2;

    const loadNext = () => {
      if (cancelled || nextIndex >= WORK_IMAGES.length) return;

      const image = new Image();
      const finish = () => {
        activeLoads -= 1;
        loadNext();
      };

      image.decoding = "async";
      image.onload = finish;
      image.onerror = finish;
      image.src = WORK_IMAGES[nextIndex];
      nextIndex += 1;
      activeLoads += 1;

      if (activeLoads < concurrency) loadNext();
    };

    const startDelay = isMobile || isSlowConnection ? 3000 : 1200;
    const timeoutId = window.setTimeout(() => {
      for (let i = 0; i < concurrency; i += 1) loadNext();
    }, startDelay);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <section
      id="work"
      className="relative isolate overflow-hidden bg-black py-20 sm:py-28 lg:py-36"
    >
      {/* Oversized outlined word */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-3%] top-6 -z-10 select-none font-gothic text-[clamp(8rem,28vw,26rem)] uppercase leading-none text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.05)]"
      >
        Work
      </div>

      {/* Soft brand glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-10%] top-[30%] h-[55vmin] w-[55vmin] rounded-full bg-blue-light/5 blur-[140px]" />
        <div className="absolute bottom-[-5%] right-[-10%] h-[50vmin] w-[50vmin] rounded-full bg-green/5 blur-[140px]" />
      </div>

      <div className="mx-auto w-full max-w-350 px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0px" }}
          className="flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between xl:gap-16"
        >
          <div>
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
                  className="block font-anton text-[clamp(2.4rem,7.5vw,5.5rem)] uppercase leading-[0.98] tracking-[0.005em] text-white xl:text-[clamp(3rem,4.6vw,4.75rem)]"
                >
                  {HEADLINE_ONE}
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  variants={lineReveal}
                  className="block w-fit bg-linear-to-r from-green via-green-light to-blue-light bg-clip-text font-anton text-[clamp(2.4rem,7.5vw,5.5rem)] uppercase leading-[0.98] tracking-[0.005em] text-transparent xl:text-[clamp(3rem,4.6vw,4.75rem)]"
                >
                  {HEADLINE_TWO}
                </motion.span>
              </span>
            </h2>
          </div>

          <motion.p
            variants={fadeUp}
            className="max-w-md text-[0.95rem] leading-relaxed text-white/60 sm:text-base xl:pb-2"
          >
            {INTRO}
          </motion.p>
        </motion.div>

        {/* Category grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-8% 0px" }}
          className="mt-12 grid grid-cols-1 gap-4 sm:mt-16 sm:gap-5 md:grid-cols-12"
        >
          {CATEGORIES.map((category) => (
            <WorkCard
              key={category.id}
              category={category}
              onOpen={() => setActiveId(category.id)}
            />
          ))}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <WorkLightbox
            key={active.id}
            title={active.title}
            subtitle={active.subtitle}
            images={active.images}
            folderHint={active.folder}
            onClose={() => setActiveId(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}