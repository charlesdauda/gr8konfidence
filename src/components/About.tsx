// About.tsx — reverted, no floating icons
const STATS = [
  { value: "150+", label: "Projects Completed" },
  { value: "100+", label: "Happy Clients" },
  { value: "10+", label: "Awards Received" },
];

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="animate-fade-up text-xs font-bold tracking-widest uppercase text-brand-green mb-3">
              About Me
            </p>

            <h2 className="animate-fade-up delay-1 font-display font-bold text-4xl sm:text-5xl text-brand-ink leading-tight mb-6">
              Design is more
              <br />
              than visuals.
              <br />
              It's <span className="gradient-text">communication.</span>
            </h2>

            <p className="animate-fade-up delay-2 text-brand-ink/55 text-base sm:text-lg leading-relaxed max-w-lg">
              I'm <span className="text-brand-green font-semibold">Gr8Konfidence</span>, a
              creative designer with a passion for creating clean, impactful and timeless
              designs that help brands grow and connect with their audience.
            </p>
          </div>

          <div className="animate-fade-in delay-3 grid grid-cols-3 gap-4 sm:gap-6">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-brand-ink/10 bg-brand-ink/2 px-4 py-8 text-center hover:border-brand-green/40 transition-colors duration-300"
              >
                <p className="font-display font-bold text-3xl sm:text-4xl gradient-text mb-2">
                  {stat.value}
                </p>

                <p className="text-xs sm:text-sm text-brand-ink/50 leading-snug">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
