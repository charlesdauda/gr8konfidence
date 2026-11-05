import { useEffect, useRef, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, Keyboard } from "swiper/modules";
import type SwiperCore from "swiper";
import "swiper/css";
import {
  ArrowUpRight,
  Clapperboard,
  Compass,
  Fingerprint,
  Megaphone,
  MonitorSmartphone,
  Palette,
  type LucideIcon,
} from "lucide-react";

const LABEL = "Services";
const HEADLINE_ONE = "Crafted to make brands";
const HEADLINE_TWO = "impossible to ignore.";
const INTRO =
  "From the first spark of an idea to the final pixel, I partner with ambitious teams to build creative work that looks exceptional and performs even better.";

const CTA = { label: "Discuss a project", href: "https://wa.me/233599794810" };
const AUTOPLAY_DELAY = 3500;

type Service = {
  title: string;
  description: string;
  items: string[];
  icon: LucideIcon;
};

const SERVICES: Service[] = [
  {
    title: "Art Direction",
    description:
      "A clear visual point of view that unites every touchpoint, from the first concept to the final delivery.",
    items: ["Concept development", "Visual language", "Creative leadership"],
    icon: Palette,
  },
  {
    title: "Brand Identity",
    description:
      "Distinctive identities and flexible systems that make your brand instantly recognisable and easy to scale.",
    items: ["Logo & wordmark", "Brand guidelines", "Tone of voice"],
    icon: Fingerprint,
  },
  {
    title: "Campaigns",
    description:
      "Big ideas, built to travel. Integrated campaigns that capture attention and move people to act.",
    items: ["Campaign concepts", "Social & digital", "Launch creative"],
    icon: Megaphone,
  },
  {
    title: "Motion & Video",
    description:
      "Story-led motion design and film direction that bring your brand to life across every screen.",
    items: ["Brand films", "Motion graphics", "Social video"],
    icon: Clapperboard,
  },
  {
    title: "Web & Digital Design",
    description:
      "Fast, elegant websites and digital products designed around real people and real business goals.",
    items: ["Website design", "UI / UX", "Design systems"],
    icon: MonitorSmartphone,
  },
  {
    title: "Creative Strategy",
    description:
      "Insight-driven thinking that turns a business challenge into a sharp, ownable creative direction.",
    items: ["Brand positioning", "Audience insight", "Creative roadmaps"],
    icon: Compass,
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

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const [swiper, setSwiper] = useState<SwiperCore | null>(null);

  const inView = useInView(sectionRef, { amount: 0.25 });

  // Respect the visitor's "reduce motion" setting: no auto-swiping for them.
  const [reduceMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  // Only auto-swipe while the section is actually on screen.
  useEffect(() => {
    if (!swiper || swiper.destroyed || !swiper.autoplay || reduceMotion) return;
    if (inView) swiper.autoplay.start();
    else swiper.autoplay.stop();
  }, [inView, swiper, reduceMotion]);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative isolate overflow-hidden bg-black py-20 sm:py-28 lg:py-36"
    >
      {/* Oversized outlined word in the background */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-[-3%] bottom-4 -z-10 select-none font-gothic text-[clamp(8rem,26vw,24rem)] uppercase leading-none text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.05)]"
      >
        Services
      </div>

      {/* Soft brand glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-[-10%] top-[5%] h-[55vmin] w-[55vmin] glow-blue" />
        <div className="absolute bottom-[-10%] left-[10%] h-[50vmin] w-[50vmin] glow-green" />    
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
                  className="block font-anton text-[clamp(2.4rem,7.5vw,5.5rem)] xl:text-[clamp(3rem,4.6vw,4.75rem)] uppercase leading-[0.98] tracking-[0.005em] text-white"
                >
                  {HEADLINE_ONE}
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  variants={lineReveal}
                  className="block w-fit bg-linear-to-r from-green via-green-light to-blue-light bg-clip-text font-anton text-[clamp(2.4rem,7.5vw,5.5rem)] xl:text-[clamp(3rem,4.6vw,4.75rem)] uppercase leading-[0.98] tracking-[0.005em] text-transparent"
                >
                  {HEADLINE_TWO}
                </motion.span>
              </span>
            </h2>
          </div>

          <div className="flex max-w-md flex-col gap-6 xl:pb-2">
            <motion.p
              variants={fadeUp}
              className="text-[0.95rem] leading-relaxed text-white/60 sm:text-base"
            >
              {INTRO}
            </motion.p>
            <motion.a
              variants={fadeUp}
              href={CTA.href}
              className="group flex w-fit items-center gap-2"
            >
              <span className="inline-flex h-12 items-center rounded-md bg-white px-6 font-oswald text-sm font-medium uppercase tracking-wider text-black transition-colors duration-300 group-hover:bg-green-light">
                {CTA.label}
              </span>
              <span className="grid h-12 w-12 place-items-center rounded-md bg-green text-black transition-colors duration-300 group-hover:bg-blue-light">
                <ArrowUpRight
                  className="h-5 w-5 transition-transform duration-500 ease-out group-hover:rotate-45"
                  strokeWidth={2}
                />
              </span>
            </motion.a>
          </div>
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
              0: { slidesPerView: 1.12, spaceBetween: 14 },
              640: { slidesPerView: 2.1, spaceBetween: 18 },
              1024: { slidesPerView: 3.1, spaceBetween: 22 },
            }}
            a11y={{ prevSlideMessage: "Previous service", nextSlideMessage: "Next service" }}
          >
            {SERVICES.map((service, i) => {
              const Icon = service.icon;
              return (
                <SwiperSlide key={service.title} style={{ height: "auto" }}>
                  <article className="group relative flex h-full select-none flex-col overflow-hidden rounded-lg border border-white/10 bg-white/3 p-6 transition-colors duration-500 hover:border-green/50 sm:p-8">
                    {/* Hover glow */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 glow-green-strong opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                    />

                    {/* Top row: icon + number */}
                    <div className="relative flex items-start justify-between">
                      <span className="grid h-14 w-14 place-items-center rounded-full border border-white/15 bg-black text-green transition-colors duration-500 group-hover:border-green group-hover:bg-green group-hover:text-black">
                        <Icon className="h-6 w-6" strokeWidth={1.6} />
                      </span>
                      <span className="font-gothic text-6xl leading-none text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.25)] transition-[-webkit-text-stroke-color] duration-500 group-hover:[-webkit-text-stroke:1px_var(--color-green-light)] sm:text-7xl">
                        {pad(i + 1)}
                      </span>
                    </div>

                    {/* Title + description */}
                    <h3 className="relative mt-10 font-anton text-[1.75rem] uppercase leading-[1.05] tracking-wide text-white sm:text-3xl">
                      {service.title}
                    </h3>
                    <p className="relative mt-4 text-[0.92rem] leading-relaxed text-white/60 sm:text-[0.95rem]">
                      {service.description}
                    </p>

                    {/* Deliverables */}
                    <ul className="relative mt-7 space-y-3 border-t border-white/10 pt-6">
                      {service.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-3 font-oswald text-[0.8rem] uppercase tracking-[0.14em] text-white/80"
                        >
                          <span className="h-1.5 w-1.5 shrink-0 bg-green" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    {/* Footer link */}
                    <a
                      href="#contact"
                      draggable={false}
                      className="relative mt-auto flex items-center justify-between pt-8 font-oswald text-xs uppercase tracking-[0.18em] text-white/50 transition-colors duration-300 group-hover:text-white"
                    >
                      Start this project
                      <ArrowUpRight
                        className="h-5 w-5 text-green transition-transform duration-500 ease-out group-hover:rotate-45"
                        strokeWidth={1.8}
                      />
                    </a>
                  </article>
                </SwiperSlide>
              );
            })}
          </Swiper>

        </motion.div>
      </div>
    </section>
  );
}