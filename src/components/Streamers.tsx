import { useRef, useState, type CSSProperties } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import type { Swiper as SwiperClass } from "swiper";

// Replace these with your real photos — same import pattern as Work.tsx.
// Two per streamer is just a placeholder count, add/remove as needed.
import Kweku1 from "../assets/images/post1.png";
import Kweku2 from "../assets/images/post1.png";
import Eli1 from "../assets/images/post1.png";
import Eli2 from "../assets/images/post1.png";
import Mig1 from "../assets/images/post1.png";
import Mig2 from "../assets/images/post1.png";
import Sarah1 from "../assets/images/post1.png";
import Sarah2 from "../assets/images/post1.png";

const CATEGORIES = ["All", "Kweku Addo", "Cruise with Eli", "Made in Ghana", "Sarah Jackson"];

type Streamer = {
  id: number;
  name: string;
  streamer: string;
  image: string;
};

const STREAMERS: Streamer[] = [
  { id: 1, name: "Kweku Addo", streamer: "Kweku Addo", image: Kweku1 },
  { id: 2, name: "Kweku Addo", streamer: "Kweku Addo", image: Kweku2 },
  { id: 3, name: "Cruise with Eli", streamer: "Cruise with Eli", image: Eli1 },
  { id: 4, name: "Cruise with Eli", streamer: "Cruise with Eli", image: Eli2 },
  { id: 5, name: "Made in Ghana", streamer: "Made in Ghana", image: Mig1 },
  { id: 6, name: "Made in Ghana", streamer: "Made in Ghana", image: Mig2 },
  { id: 7, name: "Sarah Jackson", streamer: "Sarah Jackson", image: Sarah1 },
  { id: 8, name: "Sarah Jackson", streamer: "Sarah Jackson", image: Sarah2 },
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

function StreamerImage({ item, index }: { item: Streamer; index: number }) {
  return (
    <div
      className={`animate-fade-up ${DELAYS[index % DELAYS.length]} group relative aspect-portrait overflow-hidden rounded-2xl border border-white/10 hover:border-emerald-500/40 transition-colors duration-500`}
    >
      <img
        src={item.image}
        alt={item.name}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* caption: always visible on mobile (no hover there), reveals on hover from sm up */}
      <div className="absolute inset-0 bg-linear-to-t from-black/70 to-transparent opacity-100 transition-opacity duration-500 sm:opacity-0 sm:group-hover:opacity-100" />
      <span className="absolute bottom-4 left-4 text-sm font-medium text-white transition-all duration-300 sm:translate-y-1 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
        {item.name}
      </span>
    </div>
  );
}

export default function Streamers() {
  const [active, setActive] = useState<string>("All");
  const paginationRef = useRef<HTMLDivElement | null>(null);
  const swiperRef = useRef<SwiperClass | null>(null);

  const filtered: Streamer[] =
    active === "All" ? STREAMERS : STREAMERS.filter((s) => s.streamer === active);

  return (
    <section id="streamers" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-brand-green mb-3">
              Collaborations
            </p>
            <h2 className="font-display font-bold text-4xl sm:text-5xl text-white leading-tight">
              Streamers I&apos;ve
              <br className="hidden sm:block" /> Worked{" "}
              <span className="gradient-text">With.</span>
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

        {/* grid — tablet & desktop, images only, no card chrome */}
        <div key={active} className="hidden sm:grid sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((item, i) => (
            <StreamerImage key={item.id} item={item} index={i} />
          ))}
        </div>

        {/* swiper — mobile only, autoplaying */}
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
              swiperRef.current = s;
            }}
            onBeforeInit={(swiper) => {
              if (swiper.params.pagination && typeof swiper.params.pagination !== "boolean") {
                swiper.params.pagination.el = paginationRef.current;
              }
            }}
          >
            {filtered.map((item, i) => (
              <SwiperSlide key={item.id}>
                <StreamerImage item={item} index={i} />
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
    </section>
  );
}