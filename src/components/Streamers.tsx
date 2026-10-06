import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import made1 from "../assets/images/made1.png";
import carterefe from "../assets/images/carterefe.png";
import themgotalk from "../assets/images/themgotalk.png";
import kev1 from "../assets/images/kev1.png";
import kweku from "../assets/images/kwewkuaddo.png";
import eli from "../assets/images/eli1.png";
import kai from "../assets/images/kaicenat.png";
import made2 from "../assets/images/made2.png";
import made3 from "../assets/images/made3.png";
import kev3 from "../assets/images/kev3.png";
import skai from "../assets/images/skai.png";
import kev2 from "../assets/images/kev2.png";

type Streamer = {
  id: number;
  name: string;
  image: string;
};

const STREAMERS: Streamer[] = [
  { id: 1, name: "Made in Ghana", image: made1 },
  { id: 2, name: "Carterefe", image: carterefe },
  { id: 3, name: "ThemgoTalk", image: themgotalk },
  { id: 4, name: "Kev the Wave", image: kev1 },
  { id: 5, name: "Kweku Addo", image: kweku },
  { id: 6, name: "Cruise with Eli", image: eli },
  { id: 7, name: "Kev the Wave", image: kev2 },
  { id: 8, name: "Kai Cenat", image: kai },
  { id: 9, name: "Kev the Wave", image: kev3 },
  { id: 10, name: "Skai Jackson", image: skai },
  { id: 11, name: "Made in Ghana", image: made2 },
  { id: 12, name: "Made in Ghana", image: made3 },
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

function StreamerItem({
  item,
  index,
  onOpen,
}: {
  item: Streamer;
  index: number;
  onOpen: () => void;
}) {
  const { ref, seen } = useReveal<HTMLElement>();

  return (
    <figure
      ref={ref}
      className={`reveal ${seen ? "is-in" : ""} group m-0`}
      style={{ transitionDelay: `${(index % 4) * 80}ms` } as CSSProperties}
    >
      {/* The ratio is set inline so the box can never collapse to zero height */}
      <button
        type="button"
        onClick={onOpen}
        aria-label={`View ${item.name} image full size`}
        className="group relative block w-full cursor-pointer overflow-hidden rounded-md"
        style={{ aspectRatio: "4 / 5", backgroundColor: "var(--surface-soft)" }}
      >
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
        />
      </button>

      <figcaption
        className="mt-3 text-sm sm:text-base font-medium transition-colors duration-300 group-hover:text-[var(--color-green)]"
        style={{ color: "var(--text-primary)" }}
      >
        {item.name}
      </figcaption>
    </figure>
  );
}

function Lightbox({
  streamers,
  index,
  onClose,
  onChange,
}: {
  streamers: Streamer[];
  index: number;
  onClose: () => void;
  onChange: (index: number) => void;
}) {
  const item = streamers[index];
  const touchX = useRef<number | null>(null);

  const prev = useCallback(
    () => onChange((index - 1 + streamers.length) % streamers.length),
    [index, onChange, streamers.length]
  );
  const next = useCallback(
    () => onChange((index + 1) % streamers.length),
    [index, onChange, streamers.length]
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") prev();
      if (event.key === "ArrowRight") next();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [next, onClose, prev]);

  const controlClass =
    "grid place-items-center w-11 h-11 rounded-full border transition-colors duration-300 hover:border-[var(--color-green)]";
  const controlStyle = {
    color: "#fff",
    borderColor: "rgba(255,255,255,0.25)",
    background: "rgba(255,255,255,0.08)",
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.name}
      className="fixed inset-0 z-200 flex flex-col animate-fade-in"
      style={{ background: "rgba(4,6,10,0.95)", backdropFilter: "blur(10px)" }}
      onClick={onClose}
      onTouchStart={(event) => {
        touchX.current = event.touches[0].clientX;
      }}
      onTouchEnd={(event) => {
        if (touchX.current === null) return;
        const distance = event.changedTouches[0].clientX - touchX.current;
        touchX.current = null;
        if (Math.abs(distance) > 50) (distance < 0 ? next : prev)();
      }}
    >
      <div className="flex items-center justify-between px-5 sm:px-8 py-5">
        <p className="text-sm tabular-nums" style={{ color: "rgba(255,255,255,0.55)" }}>
          {index + 1} / {streamers.length}
        </p>
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onClose();
          }}
          aria-label="Close image viewer"
          className={controlClass}
          style={controlStyle}
          autoFocus
        >
          <X size={18} />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-24">
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            prev();
          }}
          aria-label="Previous streamer image"
          className={`${controlClass} absolute left-6 hidden sm:grid`}
          style={controlStyle}
        >
          <ChevronLeft size={20} />
        </button>

        <img
          key={item.id}
          src={item.image}
          alt={item.name}
          onClick={(event) => event.stopPropagation()}
          className="max-h-full max-w-full rounded-lg object-contain animate-fade-in"
        />

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            next();
          }}
          aria-label="Next streamer image"
          className={`${controlClass} absolute right-6 hidden sm:grid`}
          style={controlStyle}
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <p className="px-6 py-6 text-center font-display text-xl" style={{ color: "#fff" }}>
        {item.name}
      </p>
    </div>
  );
}

export default function Streamers() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const close = useCallback(() => setOpenIndex(null), []);

  return (
    <section
      id="streamers"
      className="relative pt-8 pb-24 sm:py-32 overflow-hidden"
      style={{ backgroundColor: "var(--page-bg)", color: "var(--text-primary)" }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="mb-14 sm:mb-16">
          <h2
            className="font-display text-4xl sm:text-5xl xl:text-6xl leading-[1.05]"
            style={{ color: "var(--text-primary)" }}
          >
            Streamers I&apos;ve
            <br />
            <span className="gradient-text">worked with.</span>
          </h2>
          <p className="mt-5 max-w-md" style={{ color: "var(--text-secondary)" }}>
            Creators and shows I&apos;ve designed thumbnails, banners and
            graphics for.
          </p>
        </div>

        <div className="sm:hidden">
          <Swiper
            modules={[Autoplay]}
            slidesPerView={1.12}
            spaceBetween={16}
            loop
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={600}
          >
            {STREAMERS.map((item, i) => (
              <SwiperSlide key={item.id} className="h-auto!">
                <StreamerItem item={item} index={i} onOpen={() => setOpenIndex(i)} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 lg:gap-x-8 gap-y-12">
          {STREAMERS.map((item, i) => (
            <StreamerItem item={item} index={i} onOpen={() => setOpenIndex(i)} />
          ))}
        </div>
      </div>

      {openIndex !== null && (
        <Lightbox
          streamers={STREAMERS}
          index={openIndex}
          onClose={close}
          onChange={setOpenIndex}
        />
      )}
    </section>
  );
}