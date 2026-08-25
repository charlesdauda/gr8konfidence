import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { ArrowUpRight, X, ChevronLeft, ChevronRight, MousePointerClick } from "lucide-react";
import type { Swiper as SwiperClass } from "swiper";

import KonfBrand from "../assets/images/bus1.png";
import CharlBrand from "../assets/images/bus2.png";
import ShirlBrand from "../assets/images/bus3.png";
import Fries from "../assets/images/post1.png";
import Eli from "../assets/images/post2.png";
import Youth from "../assets/images/event1.png";
import Dress from "../assets/images/event2.png";
import Codm from "../assets/images/event3.png";
import Dark from "../assets/images/event4.png";
import Pod from "../assets/images/bus4.png";
import KB from "../assets/images/post3.png";
import TFK from "../assets/images/post4.png";

const CATEGORIES = ["All", "Flyer", "Logo", "Event Flyer"];

type Project = {
  id: number;
  title: string;
  category: string;
  type: string;
  year: string;
  image: string;
};

const PROJECTS: Project[] = [
  { id: 1, title: "JEMS Cook", category: "Flyer", type: "Catering Service", year: "2026", image: KonfBrand },
  { id: 2, title: "Lushed By Shirl", category: "Flyer", type: "Beauty", year: "2025", image: ShirlBrand },
  { id: 3, title: "Fridays", category: "Logo", type: "Logo Design", year: "2026", image: Fries },
  { id: 4, title: "Youth Camp", category: "Event Flyer", type: "Church Event", year: "2026", image: Youth },
  { id: 5, title: "Dark Rave", category: "Event Flyer", type: "House Party", year: "2024", image: Dark },
  { id: 6, title: "Charlie Tech", category: "Flyer", type: "IT Education", year: "2025", image: CharlBrand },
  { id: 7, title: "Cruise with Eli", category: "Logo", type: "Logo Design", year: "2026", image: Eli },
  { id: 8, title: "Dress Down", category: "Event Flyer", type: "Church Event", year: "2025", image: Dress },
  { id: 9, title: "CODM Tournament", category: "Event Flyer", type: "Game Event", year: "2024", image: Codm },
  { id: 10, title: "The Vibe Check", category: "Flyer", type: "Podcast", year: "2023", image: Pod },
  { id: 11, title: "Konfidence Blogs", category: "Logo", type: "Logo Design", year: "2026", image: KB },
  { id: 12, title: "TFK", category: "Logo", type: "Podcast", year: "2026", image: TFK },
];

const DELAYS = ["delay-1", "delay-2", "delay-3", "delay-4", "delay-5"];

interface SwiperCSSVars extends CSSProperties {
  "--swiper-pagination-color"?: string;
  "--swiper-pagination-bullet-inactive-color"?: string;
}

const swiperPaginationVars: SwiperCSSVars = {
  position: "static",
  "--swiper-pagination-color": "#16a34a",
  "--swiper-pagination-bullet-inactive-color": "rgba(255,255,255,0.35)",
};

interface ProjectCardProps {
  item: Project;
  index: number;
  onOpen?: () => void;
}

function ProjectCard({ item, index, onOpen }: ProjectCardProps) {
  return (
    <div
      className={`animate-fade-up ${DELAYS[index % DELAYS.length]} group relative rounded-3xl overflow-hidden border border-white/10 hover:border-emerald-500/40 transition-colors duration-500`}
    >
      <div
        className="relative aspect-card overflow-hidden cursor-pointer"
        onClick={onOpen}
        role="button"
        tabIndex={0}
        aria-label={`View full image of ${item.title}`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpen?.();
          }
        }}
      >
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover object-top scale-105 group-hover:object-bottom group-hover:scale-110"
          style={{ transition: "transform 700ms ease-out, object-position 3500ms ease-in-out" }}
        />

        <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/50 backdrop-blur border border-white/10 text-xs font-medium text-white/80">
          {item.type}
        </span>

        <span className="absolute top-4 right-4 grid place-items-center w-10 h-10 rounded-full bg-white/10 backdrop-blur border border-white/10 text-white opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <ArrowUpRight size={16} />
        </span>

        <div className="absolute inset-0 bg-linear-to-t from-black via-black/10 to-transparent" />
      </div>

      <div className="p-5">
        <h3 className="font-display font-semibold text-lg text-white mb-1">{item.title}</h3>
        <div className="flex items-center justify-between text-sm text-white/45">
          <span>{item.type}</span>
          <span>{item.year}</span>
        </div>
      </div>
    </div>
  );
}

interface LightboxProps {
  projects: Project[];
  initialIndex: number;
  onClose: () => void;
}

function Lightbox({ projects, initialIndex, onClose }: LightboxProps) {
  const swiperInstance = useRef<SwiperClass | null>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") swiperInstance.current?.slideNext();
      if (e.key === "ArrowLeft") swiperInstance.current?.slidePrev();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-100 bg-black/90 backdrop-blur-md flex items-center justify-center animate-fade-in"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-5 right-5 z-10 grid place-items-center w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-colors duration-300"
      >
        <X size={20} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          swiperInstance.current?.slidePrev();
        }}
        aria-label="Previous image"
        className="hidden sm:grid absolute left-5 top-1/2 -translate-y-1/2 z-10 place-items-center w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-colors duration-300"
      >
        <ChevronLeft size={20} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          swiperInstance.current?.slideNext();
        }}
        aria-label="Next image"
        className="hidden sm:grid absolute right-5 top-1/2 -translate-y-1/2 z-10 place-items-center w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white transition-colors duration-300"
      >
        <ChevronRight size={20} />
      </button>

      <div className="w-full h-full max-w-5xl max-h-[85vh] px-4" onClick={(e) => e.stopPropagation()}>
        <Swiper
          initialSlide={initialIndex}
          spaceBetween={24}
          slidesPerView={1}
          grabCursor
          onSwiper={(s) => {
            swiperInstance.current = s;
          }}
          className="w-full h-full"
        >
          {projects.map((item) => (
            <SwiperSlide key={item.id} className="flex items-center justify-center">
              <div className="flex flex-col items-center gap-4 max-h-full">
                <img
                  src={item.image}
                  alt={item.title}
                  className="max-h-[70vh] max-w-full w-auto h-auto object-contain rounded-2xl border border-white/10"
                />
                <div className="text-center">
                  <h3 className="font-display font-semibold text-lg text-white">{item.title}</h3>
                  <p className="text-sm text-white/50">
                    {item.type} · {item.year}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default function Work() {
  const [active, setActive] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);
  const paginationRef = useRef<HTMLDivElement | null>(null);
  const workSwiperRef = useRef<SwiperClass | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const hasShownHint = useRef(false);

  const filtered: Project[] =
    active === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === active);

  // one-time hint when the Work section scrolls into view
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasShownHint.current) {
            hasShownHint.current = true;
            setShowHint(true);
            setTimeout(() => setShowHint(false), 4000);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // pause the background mobile swiper's autoplay while the lightbox is open
  useEffect(() => {
    if (lightboxIndex !== null) {
      workSwiperRef.current?.autoplay?.stop();
    } else {
      workSwiperRef.current?.autoplay?.start();
    }
  }, [lightboxIndex]);

  return (
    <section id="work" ref={sectionRef} className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-brand-green mb-3">
              Selected Works
            </p>
            <h2 className="font-display font-bold text-4xl sm:text-5xl text-white leading-tight">
              Creative Work
              <br className="hidden sm:block" /> That{" "}
              <span className="gradient-text">Speaks.</span>
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`filter-pill px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  active === cat ? "active" : "text-white/55 hover:text-white hover:bg-white/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* grid — tablet & desktop, unchanged */}
        <div key={active} className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((item, i) => (
            <ProjectCard key={item.id} item={item} index={i} onOpen={() => setLightboxIndex(i)} />
          ))}
        </div>

        {/* swiper — mobile only, cards swipe one by one */}
        <div className="sm:hidden">
          <Swiper
            key={active}
            modules={[Autoplay, Pagination]}
            slidesPerView={1}
            spaceBetween={16}
            loop={filtered.length > 3}
            autoplay={{ delay: 3200, disableOnInteraction: false, pauseOnMouseEnter: true }}
            pagination={{ clickable: true, el: paginationRef.current }}
            onSwiper={(s) => {
              workSwiperRef.current = s;
            }}
            onBeforeInit={(swiper) => {
              if (swiper.params.pagination && typeof swiper.params.pagination !== "boolean") {
                swiper.params.pagination.el = paginationRef.current;
              }
            }}
          >
            {filtered.map((item, i) => (
              <SwiperSlide key={item.id}>
                <ProjectCard item={item} index={i} onOpen={() => setLightboxIndex(i)} />
              </SwiperSlide>
            ))}
          </Swiper>

          <div
            ref={paginationRef}
            className="flex items-center justify-center gap-2 mt-6"
            style={swiperPaginationVars}
          />
        </div>
      </div>

      {showHint && (
        <div className="fixed bottom-6 inset-x-0 z-60 flex justify-center px-6 animate-fade-in pointer-events-none">
          <div className="flex items-center gap-2 px-5 py-3 rounded-full bg-black/80 backdrop-blur-xl border border-white/10 text-sm text-white/85 shadow-lg">
            <MousePointerClick size={16} className="text-brand-green" />
            Tap a card to see the full image
          </div>
        </div>
      )}

      {lightboxIndex !== null && (
        <Lightbox
          projects={filtered}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </section>
  );
}