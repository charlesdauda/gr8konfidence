import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Keyboard, Zoom } from "swiper/modules";
import type SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/zoom";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

type Props = {
  title: string;
  subtitle: string;
  images: string[];
  /** Small versions for the thumbnail strip (same order as `images`). */
  thumbs?: string[];
  folderHint: string;
  onClose: () => void;
};

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];
const pad = (n: number) => String(n).padStart(2, "0");

export default function WorkLightbox({ title, subtitle, images, thumbs, folderHint, onClose }: Props) {
  const [swiper, setSwiper] = useState<SwiperCore | null>(null);
  const [index, setIndex] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(images.length <= 1);

  const closeRef = useRef<HTMLButtonElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const thumbRefs = useRef<Array<HTMLButtonElement | null>>([]);

  // Lock page scroll while open, and put focus on the close button.
  useEffect(() => {
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, []);

  // Escape closes.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Keep the active thumbnail centred in the strip.
  useEffect(() => {
    const strip = stripRef.current;
    const thumb = thumbRefs.current[index];
    if (!strip || !thumb) return;
    strip.scrollTo({
      left: thumb.offsetLeft - strip.clientWidth / 2 + thumb.clientWidth / 2,
      behavior: "smooth",
    });
  }, [index]);

  const hasImages = images.length > 0;

  return createPortal(
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${title} gallery`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease }}
      className="fixed inset-0 z-100 flex flex-col bg-black"
    >
      {/* Top bar */}
      <div className="flex h-16 shrink-0 items-center justify-between gap-4 px-5 sm:h-20 sm:px-8">
        <div className="min-w-0">
          <h3 className="truncate font-anton text-xl uppercase leading-none tracking-wide text-white sm:text-2xl">
            {title}
          </h3>
          <p className="mt-1 truncate font-oswald text-[0.7rem] uppercase tracking-[0.2em] text-white/50 sm:text-xs">
            {subtitle}
          </p>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          {hasImages && (
            <p className="font-anton text-lg leading-none tracking-wider text-white sm:text-xl">
              {pad(index + 1)}
              <span className="text-white/30"> / {pad(images.length)}</span>
            </p>
          )}
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close gallery"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white transition-colors duration-300 hover:border-green hover:bg-green hover:text-black active:scale-95 sm:h-12 sm:w-12"
          >
            <X className="h-5 w-5" strokeWidth={1.8} />
          </button>
        </div>
      </div>

      {/* Slides */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.5, ease }}
        className="relative min-h-0 flex-1"
      >
        {hasImages ? (
          <>
            <Swiper
              modules={[Keyboard, A11y, Zoom]}
              onSwiper={setSwiper}
              onSlideChange={(s) => {
                setIndex(s.activeIndex);
                setAtStart(s.isBeginning);
                setAtEnd(s.isEnd);
              }}
              keyboard={{ enabled: true }}
              zoom={{ maxRatio: 3 }}
              grabCursor
              longSwipesRatio={0.12}
              threshold={4}
              speed={450}
              spaceBetween={24}
              className="h-full w-full"
              a11y={{ prevSlideMessage: "Previous image", nextSlideMessage: "Next image" }}
            >
              {images.map((src, i) => (
                <SwiperSlide key={src}>
                  <div
                    className="swiper-zoom-container px-4 py-2 sm:px-20 sm:py-4"
                    onClick={(e) => {
                      // Click on the empty area around the image closes the lightbox.
                      if (e.target === e.currentTarget) onClose();
                    }}
                  >
                    {/* Only the current slide and its neighbours get a real <img>.
                        Mounting all of them made iPhones decode every full-size image. */}
                    {Math.abs(i - index) <= 1 && (
                      <img
                        src={src}
                        alt={`${title} ${i + 1}`}
                        draggable={false}
                        decoding="async"
                        className="select-none rounded-md object-contain shadow-2xl shadow-black/60"
                      />
                    )}
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Prev / next (desktop + tablet; touch users swipe) */}
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => swiper?.slidePrev()}
                  disabled={atStart}
                  aria-label="Previous image"
                  className="absolute left-3 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/70 text-white transition-all duration-300 hover:border-green hover:bg-green hover:text-black disabled:pointer-events-none disabled:opacity-25 sm:grid lg:left-6 lg:h-14 lg:w-14"
                >
                  <ArrowLeft className="h-5 w-5" strokeWidth={1.8} />
                </button>
                <button
                  type="button"
                  onClick={() => swiper?.slideNext()}
                  disabled={atEnd}
                  aria-label="Next image"
                  className="absolute right-3 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/70 text-white transition-all duration-300 hover:border-green hover:bg-green hover:text-black disabled:pointer-events-none disabled:opacity-25 sm:grid lg:right-6 lg:h-14 lg:w-14"
                >
                  <ArrowRight className="h-5 w-5" strokeWidth={1.8} />
                </button>
              </>
            )}
          </>
        ) : (
          <div className="grid h-full place-items-center px-8 text-center">
            <div>
              <p className="font-anton text-3xl uppercase tracking-wide text-white sm:text-4xl">
                Coming soon
              </p>
              <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/50">
                No images yet. Add files to <span className="text-green-light">{folderHint}</span> and
                they will appear here automatically.
              </p>
            </div>
          </div>
        )}
      </motion.div>

      {/* Thumbnails */}
      {hasImages && images.length > 1 && (
        <div
          ref={stripRef}
          className="flex shrink-0 snap-x gap-2.5 overflow-x-auto px-5 pb-5 pt-3 scrollbar-none sm:justify-center sm:px-8 sm:pb-6 [&::-webkit-scrollbar]:hidden"
        >
          {images.map((src, i) => (
            <button
              key={src}
              ref={(el) => {
                thumbRefs.current[i] = el;
              }}
              type="button"
              onClick={() => swiper?.slideTo(i)}
              aria-label={`Go to image ${i + 1}`}
              aria-current={i === index}
              className={`relative h-14 w-14 shrink-0 snap-center overflow-hidden rounded-md border-2 transition-all duration-300 sm:h-16 sm:w-16 ${
                i === index
                  ? "border-green opacity-100"
                  : "border-transparent opacity-45 hover:opacity-80"
              }`}
            >
              <img
                src={thumbs?.[i] ?? src}
                alt=""
                loading="lazy"
                decoding="async"
                draggable={false}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </motion.div>,
    document.body,
  );
}