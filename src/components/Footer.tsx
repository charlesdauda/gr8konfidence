import { FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import Logo from "../assets/images/logo.png";

const SOCIALS = [
  { icon: FaInstagram, href: "#", label: "Instagram" },
  { icon: FaTwitter, href: "#", label: "Twitter" },
  { icon: FaLinkedin, href: "#", label: "LinkedIn" },
  { icon: FaGithub, href: "#", label: "GitHub" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-brand-ink/10 py-16">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <a href="#home" className="inline-block">
          <img src={Logo} alt="Gr8Konfidence" className="mx-auto h-9 w-auto" />
        </a>

        <p className="mx-auto mt-6 max-w-md text-sm text-brand-ink/50">
          Visually compelling designs that help brands communicate, stand out
          and grow.
        </p>

        <div className="mt-8 flex items-center justify-center gap-5">
          {SOCIALS.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="text-brand-ink/40 transition-colors hover:text-brand-green"
            >
              <Icon size={17} />
            </a>
          ))}
        </div>

        <p className="mt-6 text-xs text-brand-ink/30">© {year} Gr8Konfidence</p>
      </div>
    </footer>
  );
}