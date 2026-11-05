import { useEffect, useRef, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, Keyboard } from "swiper/modules";
import type SwiperCore from "swiper";
import "swiper/css";
import { Star } from "lucide-react";
import { FaQuoteRight } from "react-icons/fa6";

/* ───────────── EDIT THESE ───────────── */

const LABEL = "Testimonials";
const HEADLINE_ONE = "Kind words from";
const HEADLINE_TWO = "people I've worked with.";
const INTRO =
  "Great work is a team effort. Here's what clients and collaborators say about working together.";

const AUTOPLAY_DELAY = 4500;
const MAX_RATING = 5;

type Testimonial = {
  quote: string;
  name: string;
  role: string; // job title, company
  rating?: number; // 1–5 (defaults to 5)
};

// These are placeholders — replace them with real client feedback.
const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Working with him completely changed how people see our brand. He took a vague idea and turned it into an identity we're proud of, and the response from our customers has been incredible.",
    name: "Amara Osei",
    role: "Founder, Lumen Studio",
  },
  {
    quote:
      "Sharp eye, calm leadership and zero ego. He guided our whole team through a full rebrand, on time, and the result is better than anything we imagined.",
    name: "Daniel Mensah",
    role: "Marketing Director, Kora Foods",
  },
  {
    quote:
      "The campaign visuals he directed doubled our engagement in the first month. He understands both the creative side and what the business actually needs.",
    name: "Sofia Ramirez",
    role: "Brand Manager, Northwind",
  },
  {
    quote:
      "From the first call I knew we were in good hands. Clear communication, fast turnarounds and design that genuinely stands out from everyone else in our space.",
    name: "Kwame Boateng",
    role: "CEO, Atlas Events",
  },
  {
    quote:
      "He designed our stream overlays and logo, and our community loved them instantly. Professional, creative, and a pleasure to work with from start to finish.",
    name: "Jordan Blake",
    role: "Streamer & Creator",
  },
  {
    quote:
      "Rare to find someone who is this creative and this reliable. Every deliverable felt considered, polished and completely on brand.",
    name: "Priya Nair",
    role: "Product Lead, Sunrise Labs",
  },
];

/* ───────────── Motion + helpers ───────────── */

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

const initials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .filter((initial): initial is string => Boolean(initial))
    .slice(0, 2)
    .join("")
    .toUpperCase();

const getRating = (rating?: number) => {
  const normalizedRating =
    typeof rating === "number" && Number.isFinite(rating) ? rating : MAX_RATING;
  return Math.min(MAX_RATING, Math.max(0, Math.round(normalizedRating)));
};

/* ───────────── Section ───────────── */

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const [swiper, setSwiper] = useState<SwiperCore | null>(null);

  const inView = useInView(sectionRef, { amount: 0.25 });

  // Respect the visitor's "reduce motion" setting: no auto-swiping for them.
  const [reduceMotion, setReduceMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateReduceMotion = () => setReduceMotion(mediaQuery.matches);

    updateReduceMotion();
    mediaQuery.addEventListener("change", updateReduceMotion);
    return () => mediaQuery.removeEventListener("change", updateReduceMotion);
  }, []);

  // Only auto-swipe while the section is actually on screen.
  useEffect(() => {
    if (!swiper || swiper.destroyed || !swiper.autoplay || reduceMotion) return;
    if (inView) swiper.autoplay.start();
    else swiper.autoplay.stop();
  }, [inView, swiper, reduceMotion]);

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative isolate overflow-hidden bg-black py-20 sm:py-28 lg:py-36"
    >
      {/* Oversized outlined word */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-[-3%] top-6 -z-10 select-none font-gothic text-[clamp(8rem,26vw,24rem)] uppercase leading-none text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.05)]"
      >
        Praise
      </div>

      {/* Soft brand glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-[-10%] top-[20%] h-[55vmin] w-[55vmin] glow-green" />
        <div className="absolute bottom-[-10%] left-[5%] h-[50vmin] w-[50vmin] glow-blue" />
      </div>

      <div className="mx-auto w-full max-w-350 px-5 sm:px-8 lg:px-12">
        {/* ───────── Header ───────── */}
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

        {/* ───────── Carousel ───────── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8% 0px" }}
          transition={{ duration: 1, ease, delay: 0.1 }}
          className="mt-12 sm:mt-16"
        >
          <Swiper
            modules={[Autoplay, Keyboard, A11y]}
            onSwiper={setSwiper}
            loop
            grabCursor
            speed={900}
            longSwipesRatio={0.2}
            keyboard={{ enabled: true }}
            autoplay={
              reduceMotion
                ? false
                : {
                    delay: AUTOPLAY_DELAY,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }
            }
            breakpoints={{
              0: { slidesPerView: 1.08, spaceBetween: 14 },
              768: { slidesPerView: 1.9, spaceBetween: 18 },
              1280: { slidesPerView: 2.5, spaceBetween: 22 },
            }}
            a11y={{
              prevSlideMessage: "Previous testimonial",
              nextSlideMessage: "Next testimonial",
            }}
          >
            {TESTIMONIALS.map((t) => (
              <SwiperSlide key={t.name} style={{ height: "auto" }}>
                <figure className="group relative flex h-full select-none flex-col overflow-hidden rounded-lg border border-white/10 bg-white/3 p-6 transition-colors duration-500 hover:border-green/50 sm:p-8 lg:p-10">
                  {/* Hover glow */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 glow-green-strong opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                  />

                  {/* Top row: stars (left) + quote mark (right) */}
                  <div className="relative flex items-start justify-between">
                    <div
                      className="flex gap-1 text-green"
                      role="img"
                      aria-label={`${getRating(t.rating)} out of 5 stars`}
                    >
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < getRating(t.rating) ? "" : "opacity-25"}`}
                          fill="currentColor"
                          strokeWidth={0}
                        />
                      ))}
                    </div>

                    <FaQuoteRight
                      aria-hidden
                      className="h-10 w-10 text-green/80 transition-colors duration-500 group-hover:text-green-light sm:h-12 sm:w-12"
                    />
                  </div>

                  {/* Quote */}
                  <blockquote className="relative mt-7 text-[1rem] leading-relaxed text-white/80 sm:text-[1.1rem] sm:leading-[1.7]">
                    {t.quote}
                  </blockquote>

                  {/* Person (under the quote) */}
                  <figcaption className="relative mt-auto flex items-center gap-4 border-t border-white/10 pt-6 sm:pt-7">
                    <span
                      aria-hidden
                      className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-linear-to-br from-green to-blue-light font-anton text-base tracking-wide text-black"
                    >
                      {initials(t.name)}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate font-anton text-lg uppercase leading-none tracking-wide text-white sm:text-xl">
                        {t.name}
                      </p>
                      <p className="mt-1.5 truncate font-oswald text-[0.7rem] uppercase tracking-[0.18em] text-white/50 sm:text-xs">
                        {t.role}
                      </p>
                    </div>
                  </figcaption>
                </figure>
              </SwiperSlide>
            ))}
          </Swiper>

        </motion.div>
      </div>
    </section>
  );
}
