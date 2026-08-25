import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import LogoImg from '../assets/images/logo.png'

const NAV_LINKS = ["Home", "About","Work", "Services", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("Home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: highlight whichever section is currently passing through a
  // thin band near the top of the viewport, so `active` tracks scroll
  // position and not just clicks. Drives both the desktop and mobile menus.
  useEffect(() => {
    const sections = NAV_LINKS
      .map((link) => document.getElementById(link.toLowerCase()))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const match = NAV_LINKS.find(
              (link) => link.toLowerCase() === entry.target.id
            );
            if (match) setActive(match);
          }
        });
      },
      {
        // Shrinks the detection area to a thin horizontal band roughly
        // 45%-50% down the viewport — whichever section crosses that band
        // becomes active.
        rootMargin: "-45% 0px -50% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? "bg-black/80 backdrop-blur-xl border-b border-white/5 py-3"
          : "py-5"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between">
        <a href="#home" className="flex items-center">
        <img 
            src={LogoImg}
            alt="Gr8Konfidence" 
            className="h-10 sm:h-12 w-auto object-contain" 
        />
        </a>

        <ul className="hidden lg:flex items-center gap-10 list-none">
          {NAV_LINKS.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                onClick={() => setActive(link)}
                className={`nav-link text-sm font-medium ${
                  active === link ? "text-white active" : "text-white/55 hover:text-white"
                }`}
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-2 pl-6 pr-2 py-2 rounded-full text-sm font-semibold text-black btn-gradient"
          >
            Let's Work Together
            <span className="grid place-items-center w-8 h-8 rounded-full bg-black/15">
              <ArrowUpRight size={15} strokeWidth={2.5} />
            </span>
          </a>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden grid place-items-center w-10 h-10 rounded-full border border-white/10 text-white"
            aria-label="Toggle menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 px-6 ${
          open ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
        }`}
      >
        {NAV_LINKS.map((link) => (
          <div key={link} className="border-b border-white/5">
            <a
              href={`#${link.toLowerCase()}`}
              onClick={() => {
                setActive(link);
                setOpen(false);
              }}
              className={`nav-link inline-block py-3 text-sm font-medium ${
                active === link ? "text-white active" : "text-white/60 hover:text-white"
              }`}
            >
              {link}
            </a>
          </div>
        ))}
      </div>
    </header>
  );
}