const plans = [
  {
    name: "Starter",
    price: "$149",
    note: "For simple landing / portfolio",
    features: ["1–3 pages", "Modern UI", "Responsive", "Basic SEO", "Fast delivery"],
    highlight: false
  },
  {
    name: "Professional",
    price: "$349",
    note: "Best for business websites",
    features: ["Up to 7 pages", "Premium UI/UX", "Animations", "SEO setup", "Performance optimization"],
    highlight: true
  },
  {
    name: "MERN Pro",
    price: "$699+",
    note: "Full-stack app + admin panel",
    features: ["MERN app", "Admin panel", "Auth + CRUD", "Database", "Deployment support"],
    highlight: false
  }
];

export default function Packages() {
  return (
    <section className="px-6 md:px-10 py-20 max-w-7xl mx-auto">
      <div className="max-w-3xl">
        <h2 className="text-4xl md:text-5xl font-extrabold">
          Packages that <span className="neon-text">convert</span>
        </h2>
        <p className="mt-5 text-white/65 text-lg">
          Choose a package based on your goals. If you’re unsure, message me and I’ll recommend the best option.
        </p>
      </div>

      <div className="mt-12 grid md:grid-cols-3 gap-6">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`rounded-2xl p-8 transition hover:scale-[1.01] ${
              p.highlight ? "glass neon-border" : "glass border border-white/10"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-white/60 text-xs">PACKAGE</div>
                <div className="text-2xl font-semibold mt-1">{p.name}</div>
                <div className="text-white/55 text-sm mt-1">{p.note}</div>
              </div>
              {p.highlight && (
                <span className="text-xs px-3 py-1 rounded-full glass border border-white/10 text-primary">
                  Popular
                </span>
              )}
            </div>

            <div className="mt-6 text-4xl font-extrabold neon-text">{p.price}</div>

            <ul className="mt-6 space-y-3 text-white/70 text-sm">
              {p.features.map((f) => (
                <li key={f} className="flex items-center gap-3">
                  <span className="text-primary">✔</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <a href="/contact" className="mt-8 inline-flex w-full justify-center neon-button px-6 py-4 text-base">
              Get Started
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
