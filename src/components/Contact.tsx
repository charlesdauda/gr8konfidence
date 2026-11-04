import { useState, type FormEvent, type ReactNode } from "react";
import { motion, type Variants } from "framer-motion";
import emailjs from "@emailjs/browser";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import type { IconType } from "react-icons";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaSnapchat,
  FaTelegram,
  FaThreads,
  FaTiktok,
  FaWhatsapp,
  FaXTwitter,
} from "react-icons/fa6";

/* ───────────── EDIT THESE ───────────── */

const NAME = "gr8.konfidence";

const EMAIL = "emmanuelobiri104@gmail.com";
const LOCATION = "Accra, Ghana";
const RESPONSE_TIME = "Within 24 hours";

// EmailJS (https://www.emailjs.com) — free plan is plenty for a portfolio.
// Fill these three in and the form sends real emails straight to your inbox.
// Until you do, the form falls back to opening the visitor's email app,
// pre-filled and addressed to EMAIL above, so it works from day one.
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";

type Social = { name: string; href: string; icon: IconType };

const SOCIALS: Social[] = [
  { name: "WhatsApp", href: "https://wa.me/233599794810", icon: FaWhatsapp },
  { name: "Instagram", href: "https://www.instagram.com/gr8.konfidence?exln=MW5qanlqNmh1dzkwcg%3D%3D&utm_source=qr", icon: FaInstagram },
  { name: "TikTok", href: "https://www.tiktok.com/@gr8.konfidence?_r=1&_t=ZP-9B663Xrnxmh", icon: FaTiktok },
  { name: "X", href: "https://x.com/gr8_konfidence?s=11", icon: FaXTwitter },
  { name: "Telegram", href: "https://t.me/gr8_konfidence", icon: FaTelegram },
  { name: "Snapchat", href: "https://snapchat.com/t/NjFviEhc", icon: FaSnapchat },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/emmanuel-obiri-13b83b410?utm_source=share_via&utm_content=profile&utm_medium=member_ios", icon: FaLinkedinIn },
  { name: "Facebook", href: "https://www.facebook.com/share/1F1skNmk2r/?mibextid=wwXIfr", icon: FaFacebookF },
  { name: "Threads", href: "https://www.threads.com/@gr8.konfidence?igshid=NTc4MTIwNjQ2YQ==", icon: FaThreads },
];

const PROJECT_TYPES = [
  "Brand identity",
  "Website design",
  "Campaign",
  "Logo design",
  "Motion & video",
  "Art direction",
  "Creative strategy",
  "Something else",
];

const BUDGETS = [
  "Under $1,000",
  "$1,000 – $5,000",
  "$5,000 – $10,000",
  "$10,000 – $25,000",
  "$25,000+",
  "Not sure yet",
];

const LABEL = "Let's work together";
const HEADLINE_ONE = "Let's create something";
const HEADLINE_TWO = "worth remembering.";
const INTRO =
  "Have a project in mind, or just want to say hello? Tell me a little about it and I'll get back to you personally.";

/* ───────────── Motion + helpers ───────────── */

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};

const lineReveal: Variants = {
  hidden: { y: "115%" },
  show: { y: 0, transition: { duration: 1, ease } },
};

const fieldClass =
  "w-full appearance-none rounded-none border-0 border-b border-white/15 bg-transparent py-3 text-[0.95rem] text-white outline-none transition-colors duration-300 placeholder:text-white/35 hover:border-white/30 focus:border-green focus-visible:outline-none";

function Field({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={id}
        className="font-oswald text-[0.8rem] uppercase tracking-[0.14em] text-white"
      >
        {label} <span className="text-green">*</span>
      </label>
      {children}
    </div>
  );
}

type Status = "idle" | "sending" | "sent" | "opened" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  const emailJsReady =
    !EMAILJS_SERVICE_ID.startsWith("YOUR_") &&
    !EMAILJS_TEMPLATE_ID.startsWith("YOUR_") &&
    !EMAILJS_PUBLIC_KEY.startsWith("YOUR_");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot: real visitors never fill this hidden field, bots usually do.
    if (data.get("company")) return;

    const values = {
      from_name: String(data.get("name") ?? "").trim(),
      from_email: String(data.get("email") ?? "").trim(),
      project_type: String(data.get("type") ?? ""),
      budget: String(data.get("budget") ?? ""),
      message: String(data.get("message") ?? "").trim(),
    };

    // Not configured yet → open the visitor's email app, pre-filled.
    if (!emailJsReady) {
      const subject = `New project enquiry — ${values.project_type}`;
      const body = [
        `Name: ${values.from_name}`,
        `Email: ${values.from_email}`,
        `Project type: ${values.project_type}`,
        `Budget: ${values.budget}`,
        "",
        values.message,
      ].join("\n");
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(
        subject,
      )}&body=${encodeURIComponent(body)}`;
      setStatus("opened");
      return;
    }

    setStatus("sending");
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, values, {
        publicKey: EMAILJS_PUBLIC_KEY,
      });
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const year = new Date().getFullYear();

  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden bg-black pt-20 sm:pt-28 lg:pt-36"
    >
      {/* Oversized outlined word */}
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-3%] top-6 -z-10 select-none font-gothic text-[clamp(8rem,28vw,26rem)] uppercase leading-none text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.05)]"
      >
        Contact
      </div>

      {/* Soft brand glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-10%] top-[10%] h-[55vmin] w-[55vmin] rounded-full bg-green/5 blur-[140px]" />
        <div className="absolute bottom-[0%] right-[-10%] h-[50vmin] w-[50vmin] rounded-full bg-blue-light/5 blur-[140px]" />
      </div>

      <div className="mx-auto grid w-full max-w-350 items-start gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-12">
        {/* ───────── Left: intro + details ───────── */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0px" }}
          className="lg:col-span-5 lg:sticky lg:top-28"
        >
          <motion.p
            variants={fadeUp}
            className="font-oswald text-sm uppercase tracking-[0.2em] text-white/85"
          >
            <span className="mr-2 text-green">[</span>
            {LABEL}
            <span className="ml-2 text-green">]</span>
          </motion.p>

          <h2 className="mt-6">
            <span className="block overflow-hidden pb-[0.04em]">
              <motion.span
                variants={lineReveal}
                className="block font-anton text-[clamp(2.4rem,7vw,4.75rem)] uppercase leading-[0.98] tracking-[0.005em] text-white"
              >
                {HEADLINE_ONE}
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-[0.06em]">
              <motion.span
                variants={lineReveal}
                className="block w-fit bg-linear-to-r from-green via-green-light to-blue-light bg-clip-text font-anton text-[clamp(2.4rem,7vw,4.75rem)] uppercase leading-[0.98] tracking-[0.005em] text-transparent"
              >
                {HEADLINE_TWO}
              </motion.span>
            </span>
          </h2>

          <motion.p
            variants={fadeUp}
            className="mt-7 max-w-md text-[0.95rem] leading-relaxed text-white/60 sm:text-base"
          >
            {INTRO}
          </motion.p>

          {/* Email */}
          <motion.div variants={fadeUp} className="mt-10">
            <p className="font-oswald text-xs uppercase tracking-[0.2em] text-white/50">
              Email me directly
            </p>
            <a
              href={`mailto:${EMAIL}`}
              className="group mt-2 inline-flex max-w-full items-center gap-3"
            >
              <span className="break-all font-anton text-[clamp(1.3rem,3.2vw,2rem)] tracking-wide text-white transition-colors duration-300 group-hover:text-green-light">
                {EMAIL}
              </span>
              <ArrowUpRight
                className="h-6 w-6 shrink-0 text-green transition-transform duration-500 ease-out group-hover:rotate-45"
                strokeWidth={1.8}
              />
            </a>
          </motion.div>

          {/* Details */}
          <motion.dl
            variants={fadeUp}
            className="mt-8 grid max-w-md grid-cols-2 gap-6 border-t border-white/10 pt-6"
          >
            <div>
              <dt className="font-oswald text-xs uppercase tracking-[0.2em] text-white/50">
                Based in
              </dt>
              <dd className="mt-1.5 text-[0.95rem] text-white">{LOCATION}</dd>
            </div>
            <div>
              <dt className="font-oswald text-xs uppercase tracking-[0.2em] text-white/50">
                Reply time
              </dt>
              <dd className="mt-1.5 text-[0.95rem] text-white">{RESPONSE_TIME}</dd>
            </div>
          </motion.dl>

          {/* Socials */}
          <motion.div variants={fadeUp} className="mt-10">
            <p className="font-oswald text-xs uppercase tracking-[0.2em] text-white/50">
              Find me online
            </p>
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {SOCIALS.map(({ name, href, icon: Icon }) => (
                <li key={name}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={name}
                    title={name}
                    className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white/80 transition-all duration-300 hover:-translate-y-1 hover:border-green hover:bg-green hover:text-black focus-visible:-translate-y-1"
                  >
                    <Icon className="h-[1.1rem] w-[1.1rem]" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* ───────── Right: form ───────── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8% 0px" }}
          transition={{ duration: 1, ease, delay: 0.1 }}
          className="lg:col-span-7"
        >
          <form
            onSubmit={handleSubmit}
            className="relative rounded-lg border border-white/10 bg-white/3 p-6 sm:p-10"
          >
            <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
              <Field id="name" label="Full name">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Your full name"
                  className={fieldClass}
                />
              </Field>

              <Field id="email" label="Email address">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  className={fieldClass}
                />
              </Field>

              <Field id="type" label="Project type">
                <div className="relative">
                  <select
                    id="type"
                    name="type"
                    required
                    defaultValue=""
                    className={`${fieldClass} cursor-pointer pr-8 invalid:text-white/35 [&>option]:bg-neutral-950 [&>option]:text-white`}
                  >
                    <option value="" disabled>
                      Select a project type
                    </option>
                    {PROJECT_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    aria-hidden
                    className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60"
                  />
                </div>
              </Field>

              <Field id="budget" label="Project budget">
                <div className="relative">
                  <select
                    id="budget"
                    name="budget"
                    required
                    defaultValue=""
                    className={`${fieldClass} cursor-pointer pr-8 invalid:text-white/35 [&>option]:bg-neutral-950 [&>option]:text-white`}
                  >
                    <option value="" disabled>
                      Select your budget
                    </option>
                    {BUDGETS.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    aria-hidden
                    className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60"
                  />
                </div>
              </Field>

              <div className="sm:col-span-2">
                <Field id="message" label="Tell me about your project">
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    minLength={10}
                    placeholder="Describe your project, goals, and requirements..."
                    className={`${fieldClass} resize-none`}
                  />
                </Field>
              </div>

              {/* Honeypot (hidden from people) */}
              <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
                <label htmlFor="company">Company</label>
                <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
              </div>
            </div>

            {/* Submit row */}
            <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                disabled={status === "sending"}
                className="group flex w-fit items-center gap-2 disabled:cursor-not-allowed disabled:opacity-70"
              >
                <span className="inline-flex h-12 items-center rounded-md bg-white px-6 font-oswald text-sm font-medium uppercase tracking-wider text-black transition-colors duration-300 group-hover:bg-green-light group-disabled:group-hover:bg-white">
                  {status === "sending" ? "Sending..." : "Send message"}
                </span>
                <span className="grid h-12 w-12 place-items-center rounded-md bg-green text-black transition-colors duration-300 group-hover:bg-blue-light group-disabled:group-hover:bg-green">
                  {status === "sending" ? (
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                  ) : (
                    <ArrowUpRight
                      className="h-5 w-5 transition-transform duration-500 ease-out group-hover:rotate-45"
                      strokeWidth={2}
                    />
                  )}
                </span>
              </button>

              <p
                role="status"
                aria-live="polite"
                className={`text-sm leading-relaxed ${
                  status === "error" ? "text-red-400" : "text-green-light"
                }`}
              >
                {status === "sent" &&
                  "Thank you! Your message is on its way — I'll reply soon."}
                {status === "opened" &&
                  "Your email app should now be open with your message ready to send."}
                {status === "error" &&
                  `Something went wrong. Please try again or email ${EMAIL} directly.`}
              </p>
            </div>
          </form>
        </motion.div>
      </div>

      {/* Footer strip */}
      <div className="mx-auto mt-20 w-full max-w-350 px-5 sm:mt-28 sm:px-8 lg:px-12">
        <div className="flex flex-col items-start justify-between gap-4 border-t border-white/10 py-7 font-oswald text-xs uppercase tracking-[0.18em] text-white/50 sm:flex-row sm:items-center">
          <p>
            © {year} {NAME}. All rights reserved.
          </p>
          <a href="#home" className="transition-colors duration-300 hover:text-green-light">
            Back to top ↑
          </a>
        </div>
      </div>
    </section>
  );
}