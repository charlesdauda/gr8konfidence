import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";

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

const CATEGORIES = ["All", "Flyer", "Logo", "Event Flyer"] as const;
type Category = (typeof CATEGORIES)[number];

type Project = {
  id: number;
  title: string;
  category: Exclude<Category, "All">;
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

/* Adds a class once the element scrolls into view.
   Without IntersectionObserver, content is simply shown. */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -4% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, seen };
}

/* ---------- One gallery item: image first, caption in plain text ---------- */
function WorkItem({
  item,
  index,
  onOpen,
}: {
  item: Project;
  index: number;
  onOpen: () => void;
}) {
  const { ref, seen } = useReveal<HTMLElement>();

  return (
    <figure
      ref={ref}
      className={`reveal ${seen ? "is-in" : ""} break-inside-avoid mb-14 m-0`}
      style={{ transitionDelay: `${(index % 3) * 80}ms` } as CSSProperties}
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={`View ${item.title} full size`}
        className="work-open group relative block aspect-4/5 w-full cursor-pointer rounded-md overflow-hidden"
        style={{ backgroundColor: "var(--surface-soft)" }}
      >
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 block h-full w-full object-cover transition-transform duration-900 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        />
        <span
          aria-hidden
          className="absolute inset-0 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-500"
          style={{ background: "linear-gradient(180deg, transparent 55%, rgba(4,6,10,0.5))" }}
        />
        <span
          aria-hidden
          className="absolute right-4 top-4 grid place-items-center w-10 h-10 rounded-full opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:translate-y-0 transition-all duration-500"
          style={{ background: "rgba(255,255,255,0.94)", color: "#06210f" }}
        >
          <ArrowUpRight size={18} strokeWidth={2.3} />
        </span>
      </button>

      <figcaption className="mt-4 flex items-start justify-between gap-4">
        <div>
          <p className="font-semibold leading-snug" style={{ color: "var(--text-primary)" }}>
            {item.title}
          </p>
          <p className="text-sm mt-0.5" style={{ color: "var(--text-muted)" }}>
            {item.type}
          </p>
        </div>
        <p className="text-sm tabular-nums shrink-0" style={{ color: "var(--text-muted)" }}>
          {item.year}
        </p>
      </figcaption>
    </figure>
  );
}

/* ---------- Full-size viewer ---------- */
function Lightbox({
  projects,
  index,
  onClose,
  onChange,
}: {
  projects: Project[];
  index: number;
  onClose: () => void;
  onChange: (i: number) => void;
}) {
  const item = projects[index];
  const touchX = useRef<number | null>(null);

  const prev = useCallback(
    () => onChange((index - 1 + projects.length) % projects.length),
    [index, projects.length, onChange]
  );
  const next = useCallback(
    () => onChange((index + 1) % projects.length),
    [index, projects.length, onChange]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    const before = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = before;
    };
  }, [onClose, prev, next]);

  const ctrl =
    "grid place-items-center w-11 h-11 rounded-full border transition-colors duration-300 hover:border-(--color-green)";
  const ctrlStyle: CSSProperties = {
    color: "#fff",
    borderColor: "rgba(255,255,255,0.25)",
    background: "rgba(255,255,255,0.08)",
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      className="fixed inset-0 flex flex-col animate-fade-in"
      style={{ zIndex: 200, background: "rgba(4,6,10,0.95)", backdropFilter: "blur(10px)" }}
      onClick={onClose}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
      }}
    >
      <div className="flex items-center justify-between px-5 sm:px-8 py-5">
        <p className="text-sm tabular-nums" style={{ color: "rgba(255,255,255,0.55)" }}>
          {index + 1} / {projects.length}
        </p>
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          aria-label="Close"
          className={ctrl}
          style={ctrlStyle}
          autoFocus
        >
          <X size={18} />
        </button>
      </div>

      <div className="relative flex-1 min-h-0 flex items-center justify-center px-4 sm:px-24">
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); prev(); }}
          aria-label="Previous project"
          className={`${ctrl} hidden sm:grid absolute left-6`}
          style={ctrlStyle}
        >
          <ChevronLeft size={20} />
        </button>

        <img
          key={item.id}
          src={item.image}
          alt={item.title}
          onClick={(e) => e.stopPropagation()}
          className="animate-fade-in max-h-full max-w-full w-auto h-auto object-contain rounded-lg"
        />

        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); next(); }}
          aria-label="Next project"
          className={`${ctrl} hidden sm:grid absolute right-6`}
          style={ctrlStyle}
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="px-6 py-6 text-center" onClick={(e) => e.stopPropagation()}>
        <p className="font-display text-xl" style={{ color: "#fff" }}>
          {item.title}
        </p>
        <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.55)" }}>
          {item.type}, {item.year}
        </p>
      </div>
    </div>
  );
}

/* ---------- Section ---------- */
export default function Work() {
  const [active, setActive] = useState<Category>("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtered =
    active === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === active);

  const close = useCallback(() => setOpenIndex(null), []);

  return (
    <section
      id="work"
      className="relative pt-24 pb-8 sm:py-32 overflow-hidden"
      style={{ backgroundColor: "var(--page-bg)", color: "var(--text-primary)" }}
    >
      <div className="absolute -right-48 top-24 w-md h-112 rounded-full hero-glow -z-10" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Heading + filters */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <div>
            <h2
              className="font-display text-4xl sm:text-5xl xl:text-6xl leading-[1.05]"
              style={{ color: "var(--text-primary)" }}
            >
              Creative work
              <br />
              <span className="gradient-text">that speaks.</span>
            </h2>
            <p className="mt-5 max-w-md" style={{ color: "var(--text-secondary)" }}>
              Flyers, logos and event designs for brands, churches, creators and
              communities. Tap any piece to see it in full.
            </p>
          </div>

          <div role="tablist" aria-label="Filter projects" className="flex flex-wrap gap-x-8 gap-y-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={active === cat}
                onClick={() => setActive(cat)}
                className="work-tab"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="sm:hidden">
          <Swiper
            key={active}
            modules={[Autoplay]}
            slidesPerView={1.12}
            spaceBetween={16}
            loop={filtered.length > 1}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={600}
          >
            {filtered.map((item, i) => (
              <SwiperSlide key={item.id} className="h-auto!">
                <WorkItem item={item} index={i} onOpen={() => setOpenIndex(i)} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Gallery: consistent image frames keep every project the same size */}
        <div key={active} className="hidden sm:block sm:columns-2 lg:columns-4 gap-x-8 lg:gap-x-8">
          {filtered.map((item, i) => (
            <WorkItem key={item.id} item={item} index={i} onOpen={() => setOpenIndex(i)} />
          ))}
        </div>
      </div>

      {openIndex !== null && (
        <Lightbox
          projects={filtered}
          index={openIndex}
          onClose={close}
          onChange={setOpenIndex}
        />
      )}
    </section>
  );
}