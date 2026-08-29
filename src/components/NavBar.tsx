import { useEffect, useState } from "react";
import {
  Menu,
  X,
  ArrowUpRight,
  Moon,
  Sun,
  Download,
} from "lucide-react";

import LogoImg from "../assets/images/logo.png";

const NAV_LINKS = ["Home", "About", "Work", "Services", "Contact"];

type Theme = "dark" | "light";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const [active, setActive] = useState("Home");

  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") {
      return "dark";
    }

    const savedTheme = localStorage.getItem("gk-theme");

    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme;
    }

    return "dark";
  });

  useEffect(() => {
    const root = document.documentElement;

    root.classList.remove("dark", "light");
    root.classList.add(theme);

    localStorage.setItem("gk-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (window.innerWidth < 1024) {
      document.body.style.overflow = open ? "hidden" : "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);


  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16);
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS
      .map((link) =>
        document.getElementById(link.toLowerCase())
      )
      .filter(
        (el): el is HTMLElement =>
          el !== null
      );

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const match = NAV_LINKS.find(
              (link) =>
                link.toLowerCase() ===
                entry.target.id
            );

            if (match) {
              setActive(match);
            }
          }
        });
      },
      {
        rootMargin: "-45% 0px -50% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    setTheme((current) =>
      current === "dark"
        ? "light"
        : "dark"
    );
  };

  const downloadCV = () => {
    const link = document.createElement("a");

    link.href = "/cv.pdf";
    link.download = "Emmanuel_Obiri_Odame_CV.pdf";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleMobileNavigation = (link: string) => {
    setActive(link);
    setOpen(false);
  };


  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled || open
            ? "navbar-scrolled backdrop-blur-xl border-b py-3"
            : "py-5"
        }`}
      >

        <nav className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between">
          <a
            href="#home"
            className="flex items-center"
          >
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
                    active === link
                      ? "nav-active"
                      : "nav-inactive"
                  }`}
                >
                  {link}
                </a>
              </li>
            ))}

          </ul>

          <div className="hidden lg:flex items-center gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
              title={
                theme === "dark"
                  ? "Light mode"
                  : "Dark mode"
              }
              className="theme-toggle grid place-items-center w-10 h-10 rounded-full border transition-all duration-300"
            >
              {theme === "dark" ? (
                <Moon
                  size={17}
                  strokeWidth={1.8}
                />
              ) : (
                <Sun
                  size={18}
                  strokeWidth={1.8}
                />
              )}
            </button>

            <button
              type="button"
              onClick={downloadCV}
              className="inline-flex items-center gap-2 pl-6 pr-2 py-2 rounded-full text-sm font-semibold text-black btn-gradient"
            >
              CV

              <span className="grid place-items-center w-8 h-8 rounded-full bg-black/15">
                <ArrowUpRight
                  size={15}
                  strokeWidth={2.5}
                />
              </span>
            </button>
          </div>

          <div className="flex lg:hidden items-center gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode"
              }
              title={
                theme === "dark"
                  ? "Light mode"
                  : "Dark mode"
              }
              className="theme-toggle grid place-items-center w-10 h-10 rounded-full border transition-all duration-300"
            >
              {theme === "dark" ? (
                <Moon
                  size={17}
                  strokeWidth={1.8}
                />
              ) : (
                <Sun
                  size={18}
                  strokeWidth={1.8}
                />
              )}
            </button>

            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="menu-toggle grid place-items-center w-10 h-10 rounded-full border transition-all duration-300"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? (
                <X size={18} />
              ) : (
                <Menu size={18} />
              )}
            </button>
          </div>
        </nav>

        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 px-6 ${
            open
              ? "max-h-96 opacity-100 mt-4"
              : "max-h-0 opacity-0"
          }`}
        >

          {NAV_LINKS.map((link) => (
            <div
              key={link}
              className="mobile-menu-item"
            >

              <a
                href={`#${link.toLowerCase()}`}
                onClick={() =>
                  handleMobileNavigation(link)
                }
                className={`nav-link inline-block py-3 text-sm font-medium ${
                  active === link
                    ? "nav-active"
                    : "nav-inactive"
                }`}
              >
                {link}
              </a>

            </div>
          ))}

        </div>
      </header>

      <button
        type="button"
        onClick={downloadCV}
        aria-label="Download CV"
        title="Download CV"
        className="lg:hidden fixed right-5 bottom-6 z-100 grid place-items-center w-14 h-14 rounded-full btn-gradient
         text-black shadow-lg cv-floating border">
        <Download
          size={20}
          strokeWidth={2.2}
        />
      </button>

    </>
  );
}