import { ArrowUpRight, MessageCircle } from "lucide-react";
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const SOCIALS = [
  { label: "Instagram", href: "#", Icon: FaInstagram },
  { label: "LinkedIn", href: "#", Icon: FaLinkedin },
  { label: "Twitter", href: "#", Icon: FaTwitter },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-32 pb-24 overflow-hidden"
    >
      {/* soft background: dotted texture + one centered glow */}
      <div className="absolute inset-0 -z-10 hero-noise" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[34rem] h-[34rem] max-w-[90vw] rounded-full hero-glow -z-10" />

      <div className="max-w-4xl mx-auto px-6 lg:px-10 flex flex-col items-center text-center">
        <p className="animate-fade-up delay-1 text-lg font-medium text-brand-blue mb-4">
          Hello
        </p>

        <h1 className="animate-fade-up delay-2 font-display text-5xl sm:text-7xl xl:text-8xl leading-[1.02] text-primary mb-5">
          <span className="font-light">I&apos;m </span>
          <span className="gradient-text">Gr8Konfidence</span>
        </h1>

        <p className="animate-fade-up delay-2 text-xl sm:text-2xl font-medium text-primary mb-6">
         A Creative <span className="text-brand-blue">Designer</span>
        </p>

        <p className="animate-fade-up delay-3 text-secondary text-base sm:text-lg max-w-xl mb-12">
          I craft visually compelling designs that help brands communicate,
          stand out and grow one pixel at a time.
        </p>

        <div className="animate-fade-up delay-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-6">
          <a
            href="#work"
            className="group inline-flex items-center gap-2 pl-6 pr-2 py-2.5 rounded-full font-semibold text-sm btn-gradient"
            style={{ color: "#06210f" }}
          >
            View My Work
            <span className="grid place-items-center w-9 h-9 rounded-full bg-black/15 group-hover:rotate-45 transition-transform duration-300">
              <ArrowUpRight size={16} strokeWidth={2.5} />
            </span>
          </a>

          <a
            href="https://wa.me/+23359794810"
            className="group flex items-center gap-3 text-sm font-medium text-secondary hover:text-primary"
          >
            <span className="social-link grid place-items-center w-11 h-11 rounded-full">
              <MessageCircle size={14} className="ml-0.5" fill="currentColor" />
            </span>
            Let&apos;s talk
          </a>
        </div>

        <ul className="animate-fade-up delay-5 flex items-center justify-center gap-4 list-none mt-12">
          {SOCIALS.map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                aria-label={label}
                className="social-link grid place-items-center w-10 h-10 rounded-full"
              >
                <Icon size={18} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}