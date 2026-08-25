import { motion, useReducedMotion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import {
  LayoutTemplate,
  PenTool,
  Sparkles,
  Camera,
  Video,
  Image as ImageIcon,
  type LucideIcon,
} from "lucide-react";

type Service = {
  id: string;
  title: string;
  icon: LucideIcon;
  accent: string;
  description: string;
  tags: string[];
};
const SERVICES: Service[] = [
  {
    id: "flyers",
    title: "Flyer Design",
    icon: LayoutTemplate,
    accent: "#48ce85",
    description:
      "Eye-catching flyers designed to grab attention and get your message seen for events, promotions, and campaigns.",
    tags: ["Event Flyers", "Promotional Flyers", "Print & Digital", "Social Media Flyers"],
  },
  {
    id: "logo",
    title: "Logo Design",
    icon: PenTool,
    accent: "#45ba8b",
    description:
      "Distinctive logos and brand marks that give your business a face people remember.",
    tags: ["Brand Identity", "Logo Variations", "Style Guides", "Icon Design"],
  },
  {
    id: "ai-animations",
    title: "AI Animations",
    icon: Sparkles,
    accent: "#41a591",
    description:
      "AI-powered motion and animated content that brings static designs to life, fast.",
    tags: ["Motion Graphics", "AI-Generated Visuals", "Animated Ads", "Social Reels"],
  },
  {
    id: "photoshoot",
    title: "Photoshoot",
    icon: Camera,
    accent: "#3e9196",
    description:
      "Professional photography that captures your brand, products, or moments with intention.",
    tags: ["Product Photography", "Portrait Sessions", "Event Coverage", "Photo Editing"],
  },
  {
    id: "videography",
    title: "Videography",
    icon: Video,
    accent: "#3a7c9c",
    description:
      "Cinematic video production from concept to final cut commercials, events, and brand stories.",
    tags: ["Brand Videos", "Event Coverage", "Commercial Ads", "Video Editing"],
  },
  {
    id: "posters",
    title: "Posters",
    icon: ImageIcon,
    accent: "#3768a2",
    description:
      "Bold poster designs built to stand out on a wall, a feed, or a storefront window.",
    tags: ["Event Posters", "Concert Posters", "Movie Posters", "Print-Ready Files"],
  },
];

export default function ServicesSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative w-full overflow-hidden bg-black px-6 py-24 text-white" id="services">
      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="mb-3 text-sm font-bold tracking-[0.15em] text-[#16a34a]">
            SELECTED SERVICES
          </p>
          <h2 className="text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl">
            What I{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(90deg, #48ce85, #3768a2)" }}
            >
              Offer.
            </span>
          </h2>
          <p className="mt-4 max-w-xl text-balance text-[#8b8b96]">
            Comprehensive creative services tailored to bring your brand to life. From
            concept to final delivery, I create bold, memorable visuals.
          </p>
        </motion.div>

        <div className="md:hidden">
          <Swiper
            modules={[Autoplay, Pagination]}
            slidesPerView={1.12}
            spaceBetween={16}
            loop
            autoplay={
              prefersReducedMotion
                ? false
                : { delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }
            }
            speed={prefersReducedMotion ? 0 : 500}
            pagination={{
              el: ".services-pagination",
              clickable: true,
              renderBullet: (index, className) =>
                `<span class="${className}" style="background:${SERVICES[index % SERVICES.length].accent}"></span>`,
            }}
          >
            {SERVICES.map((service) => (
              <SwiperSlide key={service.id} className="h-auto! py-1">
                <ServiceCard service={service} />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="services-pagination mt-6 flex flex-wrap justify-center gap-2" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="hidden md:grid md:grid-cols-2 md:gap-5 lg:grid-cols-3"
        >
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </motion.div>
      </div>

      <style>{`
        .services-pagination.swiper-pagination {
          position: static !important;
        }
        .services-pagination .swiper-pagination-bullet {
          width: 6px;
          height: 6px;
          border-radius: 9999px;
          opacity: 0.35;
          margin: 0 !important;
          transition: width 0.3s ease, opacity 0.3s ease;
        }
        .services-pagination .swiper-pagination-bullet-active {
          width: 24px;
          opacity: 1;
        }
      `}</style>
    </section>
  );
}

function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;
  return (
    <div className="group relative h-full overflow-hidden rounded-2xl border border-white/8 bg-[#0a0a0a] p-6 transition-colors duration-300 hover:border-white/16">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-0.75"
      />

      <div
        className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl"
        style={{ backgroundColor: `${service.accent}1a`, color: service.accent }}
      >
        <Icon size={20} strokeWidth={2.25} />
      </div>

      <h3 className="mb-2 text-lg font-extrabold tracking-tight text-white">{service.title}</h3>
      <p className="mb-6 text-sm leading-relaxed text-[#8b8b96]">{service.description}</p>

      <div className="flex flex-wrap gap-2">
        {service.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/8 bg-white/2 px-2.5 py-1 text-[11px] font-medium text-[#c4c4cc]"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}