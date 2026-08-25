import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, CheckCircle2, AlertCircle } from "lucide-react";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";

// Shown as the direct-contact fallback next to the heading
const CONTACT_EMAIL = "hello@yourdomain.com";

type Status = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        { name: form.name, email: form.email, message: form.message },
        EMAILJS_PUBLIC_KEY
      );
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("EmailJS send failed:", err);
      setStatus("error");
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-black px-6 py-24 text-white" id="contact">
      <div className="relative mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="mb-3 text-sm font-bold tracking-[0.15em] text-[#16a34a]">
            GET IN TOUCH
          </p>
          <h2 className="text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl">
            Let&apos;s Create Something{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(90deg, #48ce85, #3768a2)" }}
            >
              Great.
            </span>
          </h2>
          <p className="mt-4 max-w-md text-balance text-[#8b8b96]">
            Have a project in mind? Tell me about it and I&apos;ll get back to you
            within a day or two.
          </p>

          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition-colors hover:text-white"
          >
            <Mail size={16} className="text-[#48ce85]" />
            {CONTACT_EMAIL}
          </a>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative overflow-hidden rounded-2xl border border-white/8 bg-[#0a0a0a] p-6 sm:p-8"
        >
          <div
            aria-hidden
            className="absolute inset-x-0 top-0 h-0.75"
          />

          <div className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#8b8b96]"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full rounded-xl border border-white/8 bg-white/3 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-[#55555f] focus:border-[#48ce85]"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#8b8b96]"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-white/8 bg-white/3 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-[#55555f] focus:border-[#48ce85]"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#8b8b96]"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project..."
                className="w-full resize-none rounded-xl border border-white/8 bg-white/8 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-[#55555f] focus:border-[#48ce85]"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-black transition-opacity disabled:cursor-not-allowed disabled:opacity-60"
              style={{ backgroundImage: "linear-gradient(90deg, #48ce85, #3768a2)" }}
            >
              {status === "sending" ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                  Sending...
                </>
              ) : (
                <>
                  Send Message
                  <Send size={16} />
                </>
              )}
            </button>

            {status === "success" && (
              <p className="flex items-center gap-2 text-sm font-medium text-[#48ce85]">
                <CheckCircle2 size={16} />
                Message sent — I&apos;ll get back to you soon.
              </p>
            )}
            {status === "error" && (
              <p className="flex items-center gap-2 text-sm font-medium text-[#f87171]">
                <AlertCircle size={16} />
                Something went wrong. Try again, or email me directly.
              </p>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  );
}