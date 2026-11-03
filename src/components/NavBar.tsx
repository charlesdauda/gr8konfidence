import { useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import logo from "../assets/images/logo.png";

const NAME = "Your Name";
const EMAIL = "hello@yourname.com";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

const SECTION_IDS = NAV_LINKS.map((l) => l.href.slice(1));

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];
const menuEase: [number, number, number, number] = [0.76, 0, 0.24, 1];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(SECTION_IDS[0]);

  const headerRef = useRef<HTMLElement>(null);
  const scrollAnim = useRef<ReturnType<typeof animate> | null>(null);
  const autoScrolling = useRef(false);

  const getHeaderHeight = () => headerRef.current?.offsetHeight ?? 80;

  // ── Scroll-spy: highlight the link of the section currently in view ──
  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 24);
      if (autoScrolling.current) return; // don't flicker while a click-scroll runs

      const line = getHeaderHeight() + window.innerHeight * 0.25;
      let current = SECTION_IDS[0];
      let lastFound = SECTION_IDS[0];

      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue; // section not built yet — skip it
        lastFound = id;
        if (el.getBoundingClientRect().top <= line) current = id;
      }

      // At the very bottom of the page, the last section wins.
      const atBottom =
        window.scrollY > 0 &&
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) current = lastFound;

      setActive(current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // ── If the visitor scrolls manually mid-animation, hand control back ──
  useEffect(() => {
    const interrupt = () => {
      if (!autoScrolling.current) return;
      scrollAnim.current?.stop();
      autoScrolling.current = false;
    };
    window.addEventListener("wheel", interrupt, { passive: true });
    window.addEventListener("touchstart", interrupt, { passive: true });
    window.addEventListener("keydown", interrupt);
    return () => {
      window.removeEventListener("wheel", interrupt);
      window.removeEventListener("touchstart", interrupt);
      window.removeEventListener("keydown", interrupt);
      scrollAnim.current?.stop();
    };
  }, []);

  // ── Lock page scroll while the mobile menu is open + close on Escape ──
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // ── Close the mobile menu if the viewport grows to desktop size ──
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = (e: MediaQueryListEvent) => e.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // ── Smooth scroll to a section ──
  const goTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.slice(1);
    const el = document.getElementById(id);
    const menuWasOpen = open;

    setOpen(false);
    if (!el) return;

    setActive(id);
    history.replaceState(null, "", href);

    const run = () => {
      const top =
        id === SECTION_IDS[0]
          ? 0
          : Math.max(0, el.getBoundingClientRect().top + window.scrollY - getHeaderHeight() + 1);
      const from = window.scrollY;
      const distance = Math.abs(top - from);

      scrollAnim.current?.stop();
      autoScrolling.current = true;
      scrollAnim.current = animate(from, top, {
        duration: Math.min(1.5, Math.max(0.7, distance / 2200)),
        ease: [0.65, 0, 0.35, 1],
        onUpdate: (v) => window.scrollTo({ top: v, behavior: "instant" }),
        onComplete: () => {
          autoScrolling.current = false;
        },
      });
    };

    // Let the menu unlock the page and start closing before the scroll begins.
    if (menuWasOpen) window.setTimeout(run, 120);
    else run();
  };

  const headerState = open
    ? "border-transparent bg-black"
    : scrolled
      ? "border-white/10 bg-black/70 backdrop-blur-xl"
      : "border-transparent bg-transparent";

  return (
    <>
      <motion.header
        ref={headerRef}
        initial={{ y: "-100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease }}
        className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300 ${headerState}`}
      >
        <div className="mx-auto flex h-16 w-full max-w-350 items-center justify-between px-5 sm:px-8 md:h-20 lg:px-12">
          {/* Logo image (imported from src/assets/images) */}
          <a
            href="#home"
            aria-label={`${NAME} — back to top`}
            className="flex h-8 shrink-0 items-center sm:h-9 md:h-10"
            onClick={(e) => goTo(e, "#home")}
          >
            <img
              src={logo}
              alt={`${NAME} logo`}
              decoding="async"
              className="h-full w-auto max-w-35 object-contain object-left sm:max-w-42.5"
            />
          </a>

          {/* Desktop links */}
          <nav aria-label="Primary" className="hidden md:block">
            <ul className="flex items-center gap-7 lg:gap-10">
              {NAV_LINKS.map((item) => {
                const isActive = active === item.href.slice(1);
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={(e) => goTo(e, item.href)}
                      aria-current={isActive ? "location" : undefined}
                      className={`group relative block py-2 font-oswald text-[0.95rem] font-normal uppercase tracking-wide transition-colors duration-300 ${
                        isActive ? "text-white" : "text-white/60 hover:text-white"
                      }`}
                    >
                      {item.label}

                      {/* Hover underline (inactive links) */}
                      {!isActive && (
                        <span className="absolute inset-x-0 bottom-0.5 h-px origin-left scale-x-0 bg-white/40 transition-transform duration-500 ease-out group-hover:scale-x-100" />
                      )}

                      {/* Active underline — glides between links */}
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          transition={{ type: "spring", stiffness: 380, damping: 34 }}
                          className="absolute inset-x-0 bottom-0.5 h-px bg-green"
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Mobile toggle */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="-mr-1 grid h-11 w-11 place-items-center bg-transparent text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green md:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.span
                  key="close"
                  initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
                  transition={{ duration: 0.25, ease }}
                >
                  <X aria-hidden className="h-5 w-5" strokeWidth={1.8} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ opacity: 0, rotate: 90, scale: 0.7 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: -90, scale: 0.7 }}
                  transition={{ duration: 0.25, ease }}
                >
                  <Menu aria-hidden className="h-5 w-5" strokeWidth={1.8} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.65, ease: menuEase }}
            className="fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto bg-black px-5 pb-8 pt-28 sm:px-8 md:hidden"
          >
            <nav aria-label="Mobile">
              <ul className="flex flex-col">
                {NAV_LINKS.map((item, i) => {
                  const isActive = active === item.href.slice(1);
                  return (
                    <li key={item.href} className="overflow-hidden border-b border-white/10">
                      <motion.a
                        href={item.href}
                        onClick={(e) => goTo(e, item.href)}
                        aria-current={isActive ? "location" : undefined}
                        initial={{ y: "110%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.7, ease, delay: 0.25 + i * 0.07 }}
                        className={`flex items-baseline justify-between py-3.5 font-anton text-[clamp(2.5rem,12vw,4rem)] uppercase leading-none transition-colors active:text-green ${
                          isActive ? "text-green" : "text-white"
                        }`}
                      >
                        {item.label}
                        <span className="font-oswald text-sm tracking-widest text-green">
                          0{i + 1}
                        </span>
                      </motion.a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease, delay: 0.7 }}
              className="mt-10 flex flex-col gap-1 font-oswald text-sm uppercase tracking-widest text-white/60"
            >
              <span>Get in touch</span>
              <a href={`mailto:${EMAIL}`} className="break-all text-base text-green-light">
                {EMAIL}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}