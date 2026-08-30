import { ArrowUpRight, MessageCircle } from "lucide-react";
import { FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import HeroImge from "../assets/images/heroimage.png";

const SOCIALS = [FaInstagram, FaTwitter, FaLinkedin, FaGithub];

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen pt-36 pb-20 overflow-hidden">
      <div className="absolute inset-0 -z-10 hero-noise" />
      <div className="absolute top-16 -right-16 w-80 h-80 rounded-full hero-glow -z-10" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="hidden lg:flex flex-col items-center gap-5 absolute -left-16 top-1">
            {SOCIALS.map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 grid place-items-center rounded-full border border-white/10 text-white/50 hover:text-white hover:border-emerald-500 hover:-translate-y-1 transition-all duration-300"
              >
                <Icon size={15} />
              </a>
            ))}
            <span className="w-px h-16 bg-white/10" />
          </div>

          <p className="animate-fade-up delay-1 text-sm font-medium text-white/60 mb-5">
            Hello, I&apos;m <span className="text-brand-green font-bold">Gr8Konfidence</span>
          </p>

          <h1 className="animate-fade-up delay-2 font-display font-bold text-5xl sm:text-6xl xl:text-7xl leading-[1.08] tracking-tight text-white mb-6">
           I create designs
            <br />
            that <span className="gradient-text">Inspires.</span>
          </h1>

          <p className="animate-fade-up delay-3 text-white/55 text-base sm:text-lg max-w-md mb-10 leading-relaxed">
            I craft visually compelling designs that help brands communicate,
            stand out and grow one pixel at a time.
          </p>

          <div className="animate-fade-up delay-4 flex flex-wrap items-center gap-8">
            <a
              href="#work"
              className="group inline-flex items-center gap-2 pl-6 pr-2 py-2.5 rounded-full font-semibold text-sm text-black btn-gradient animate-pulse-glow"
            >
              View My Work
              <span className="grid place-items-center w-9 h-9 rounded-full bg-black/15 group-hover:rotate-45 transition-transform duration-300">
                <ArrowUpRight size={16} strokeWidth={2.5} />
              </span>
            </a>

            <a href= "#" className="group flex items-center gap-3 text-sm font-medium text-white/80">
              <span className="grid place-items-center w-12 h-12 rounded-full border border-white/15 group-hover:border-emerald-500 group-hover:bg-emerald-500/10 transition-all duration-300">
                <MessageCircle size={14} className="ml-0.5" fill="currentColor" />
              </span>
              Let's talk
            </a>
          </div>

          <div className="animate-fade-in delay-5 hidden sm:flex items-center gap-3 mt-20 text-white/35">
            <span className="w-6 h-9 rounded-full border border-white/15 flex justify-center pt-1.5">
              <span className="w-1 h-1.5 rounded-full bg-white/50 animate-bounce-dot" />
            </span>
            <span className="text-xs tracking-widest uppercase">Scroll Down</span>
          </div>
        </div>

        <div className="animate-fade-in delay-3 relative flex justify-center lg:justify-end">
          <div className="relative w-full max-w-xs sm:max-w-sm">
            <div className="absolute -inset-10 rounded-full blob-shape animate-float -z-10" />
            <div className="absolute -top-10 -left-10 w-36 h-36 dot-grid -z-10" />

            <div
              className="relative rounded-3xl p-px"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, rgba(16,185,129,0.6), rgba(59,130,246,0.6))",
              }}
            >
              <div className="relative aspect-4/5 rounded-[calc(1.5rem-1px)] overflow-hidden portrait-frame">
                <img
                  src={HeroImge}
                  alt="Portrait of Gr8Konfidence"
                  className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-black/70 to-transparent pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}