import { useRef, type CSSProperties } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import type { Swiper as SwiperClass } from "swiper";

import made1 from "../assets/images/made1.png";
import carterefe from "../assets/images/carterefe.png";
import themgotalk from "../assets/images/themgotalk.png"
import kev1 from "../assets/images/kev1.png";
import kweku from "../assets/images/kwewkuaddo.png"
import eli from "../assets/images/eli1.png"
import kai from "../assets/images/kaicenat.png"
import made2 from "../assets/images/made2.png";
import made3 from "../assets/images/made3.png";
import kev3 from "../assets/images/kev3.png";
import skai from "../assets/images/skai.png"
import kev2 from "../assets/images/kev2.png";


type Streamer = {
  id: number;
  name: string;
  image: string;
};

const STREAMERS: Streamer[] = [
  { id: 1, name: "Made in Ghana", image: made1 },
  { id: 2, name: "Carterefe", image: carterefe},
  { id: 3, name: "ThemgoTalk", image: themgotalk},
  { id: 4, name: "Kev the Wave", image: kev1},
  { id: 5, name: "Kweku Addo", image: kweku},
  { id: 6, name: "Cruise with Eli", image: eli},
  { id: 7, name: "Kev the Wave", image: kev2},
  { id: 8, name: "Kai Cenat", image: kai},
  { id: 9, name: "Kev the Wave", image: kev3},
  { id: 10, name: "Skai Jackson", image: skai},
  { id: 11, name: "Made in Ghana", image: made2 },
  { id: 12, name: "Made in Ghana", image: made3 },
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
        decoding="async"
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
  const paginationRef = useRef<HTMLDivElement | null>(null);
  const swiperRef = useRef<SwiperClass | null>(null);

  return (
    <section id="streamers" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* header */}
        <div className="mb-14">
          <p className="text-xs font-bold tracking-widest uppercase text-brand-green mb-3">
            Collaborations
          </p>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-white leading-tight">
            Streamers I&apos;ve
            <br className="hidden sm:block" /> Worked{" "}
            <span className="gradient-text">With.</span>
          </h2>
        </div>

        {/* grid — tablet & desktop, images only, no card chrome */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STREAMERS.map((item, i) => (
            <StreamerImage key={item.id} item={item} index={i} />
          ))}
        </div>

        {/* swiper — mobile only, autoplaying */}
        <div className="sm:hidden">
          <Swiper
            modules={[Autoplay, Pagination]}
            slidesPerView={1}
            spaceBetween={16}
            loop
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
            {STREAMERS.map((item, i) => (
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