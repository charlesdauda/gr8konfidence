import { useState } from "react";
import {
  AnimatePresence,
  motion,
  type Variants,
} from "framer-motion";
import WorkLightbox from "./WorkLightbox"

const asUrls = (m: Record<string, unknown>) => m as Record<string, string>;
const FULL = asUrls(
  import.meta.glob("../assets/images/*.webp", { eager: true, query: "?url", import: "default" }),
);
const COVERS = asUrls(
  import.meta.glob("../assets/images/covers/*.webp", { eager: true, query: "?url", import: "default" }),
);
const THUMBS = asUrls(
  import.meta.glob("../assets/images/thumbs/*.webp", { eager: true, query: "?url", import: "default" }),
);

const pick = (map: Record<string, string>, prefix: string) =>
  Object.entries(map)
    .map(([path, url]) => {
      const m = path.match(/\/([A-Za-z]+)(\d+)\.webp$/);
      return m && m[1] === prefix ? { n: Number(m[2]), url } : null;
    })
    .filter((x): x is { n: number; url: string } => x !== null)
    .sort((a, b) => a.n - b.n)
    .map((x) => x.url);

const group = (prefix: string) => ({
  full: pick(FULL, prefix),
  covers: pick(COVERS, prefix),
  thumbs: pick(THUMBS, prefix),
});

const LOGOS = group("logo");
const FLYERS = group("flyer");
const STREAMERS = group("streamer");
const POSTERS = group("poster");

const LABEL = "Selected work";
const HEADLINE_ONE = "Designs that";
const HEADLINE_TWO = "speak for themselves.";
const INTRO =
  "A look at the logos, flyers, stream visuals and posters I've created. Pick a category to browse the full collection.";

type Category = {
  id: string;
  title: string;
  subtitle: string;
  folder: string;
  images: string[];
  thumbs: string[];
  cover?: string;
  span: string; 
  glow: string; 
};

const CATEGORIES: Category[] = [
  {
    id: "logos",
    title: "Logo designs",
    subtitle: "Brand identity",
    folder: "src/assets/images/work/logos",
    images: LOGOS.full,
    thumbs: LOGOS.thumbs,
    cover: LOGOS.covers[0],
    span: "md:col-span-5",
    glow: "glow-green-strong",
  },
  {
    id: "flyers",
    title: "Flyers",
    subtitle: "Print & digital promos",
    folder: "src/assets/images/work/flyers",
    images: FLYERS.full,
    thumbs: FLYERS.thumbs,
    cover: FLYERS.covers[0],
    span: "md:col-span-7",
    glow: "glow-blue",
  },
  {
    id: "streamers",
    title: "Streamer designs",
    subtitle: "Overlays, banners & branding",
    folder: "src/assets/images/work/streamers",
    images: STREAMERS.full,
    thumbs: STREAMERS.thumbs,
    cover: STREAMERS.covers[0],
    span: "md:col-span-7",
    glow: "glow-blue",
  },
  {
    id: "posters",
    title: "Posters",
    subtitle: "Events & campaigns",
    folder: "src/assets/images/work/posters",
    images: POSTERS.full,
    thumbs: POSTERS.thumbs,
    cover: POSTERS.covers[0],
    span: "md:col-span-5",
    glow: "glow-green-strong",
  },
];

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

function WorkCard({ category, onOpen }: { category: Category; onOpen: () => void }) {
  const { id, title, subtitle, cover, span, glow } = category;
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
        {cover ? (
          <img
            src={cover}
            alt=""
            loading="lazy"
            decoding="async"
            draggable={false}
            className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-1200 ease-out group-hover:scale-105"
          />
        ) : (
          <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden bg-neutral-950">
            <div className={`absolute -right-16 -top-16 h-80 w-80 ${glow}`} />
            <span className="absolute -bottom-4 right-4 select-none font-gothic text-[9rem] uppercase leading-none text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.1)] sm:text-[11rem]">
              {title.split(" ")[0]}
            </span>
          </div>
        )}

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

export default function Work() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = CATEGORIES.find((c) => c.id === activeId) ?? null;

  return (
    <section
      id="work"
      className="relative isolate overflow-hidden bg-black py-20 sm:py-28 lg:py-36"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-3%] top-6 -z-10 select-none font-gothic text-[clamp(8rem,28vw,26rem)] uppercase leading-none text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.05)]"
      >
        Work
      </div>
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-10%] top-[30%] h-[55vmin] w-[55vmin] glow-blue" />
        <div className="absolute bottom-[-5%] right-[-10%] h-[50vmin] w-[50vmin] glow-green" />
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

      <AnimatePresence>
        {active && (
          <WorkLightbox
            key={active.id}
            title={active.title}
            subtitle={active.subtitle}
            images={active.images}
            thumbs={active.thumbs}
            folderHint={active.folder}
            onClose={() => setActiveId(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}