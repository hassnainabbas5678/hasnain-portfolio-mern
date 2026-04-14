const services = [
  {
    title: "Full-Stack MERN Apps",
    desc: "End-to-end web applications: React frontend + secure Node/Express backend + MongoDB.",
    tags: ["MERN", "Clean Architecture", "Scalable"]
  },
  {
    title: "Admin Panels & Dashboards",
    desc: "Modern dashboards with protected routes, CRUD, analytics, and role-ready structure.",
    tags: ["JWT", "CRUD", "Admin UX"]
  },
  {
    title: "High-Converting Landing Pages",
    desc: "Premium UI, strong CTA placement, trust elements, and conversion-first layout decisions.",
    tags: ["UI/UX", "Copy", "Conversion"]
  },
  {
    title: "Performance & SEO",
    desc: "Fast load time, smooth transitions, clean routing, and SEO-friendly structure.",
    tags: ["Speed", "Core Web Vitals", "SEO"]
  }
];

export default function Services() {
  return (
    <section className="px-6 md:px-10 py-20 max-w-7xl mx-auto">
      <div className="max-w-3xl">
        <h2 className="text-4xl md:text-5xl font-extrabold">
          Services that <span className="neon-text">ship results</span>
        </h2>
        <p className="mt-5 text-white/65 text-lg">
          I don’t just “build websites”. I build reliable systems that look premium,
          run fast, and help clients convert visitors into customers.
        </p>
      </div>

      <div className="mt-12 grid md:grid-cols-2 gap-6">
        {services.map((s, i) => (
          <div key={i} className="glass neon-border rounded-2xl p-7 hover:scale-[1.01] transition">
            <div className="flex items-start justify-between gap-6">
              <h3 className="text-xl md:text-2xl font-semibold">{s.title}</h3>
              <div className="h-10 w-10 rounded-xl glass neon-border flex items-center justify-center">
                <span className="text-primary font-bold">↗</span>
              </div>
            </div>
            <p className="mt-3 text-white/65 leading-relaxed">{s.desc}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {s.tags.map((t) => (
                <span
                  key={t}
                  className="text-xs px-3 py-1 rounded-full glass border border-white/10 text-white/70"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-14 glass neon-border rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="text-2xl font-semibold">Want a site like this?</div>
          <div className="text-white/65 mt-2">
            Send your requirements and I’ll reply with a clear plan + quote.
          </div>
        </div>
        <a href="/contact" className="neon-button px-7 py-4 text-base">
          Get a Quote
        </a>
      </div>
    </section>
  );
}
