export default function About() {
  return (
    <section className="px-6 md:px-10 py-20 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-10 items-start">
        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold">
            About <span className="neon-text">Me</span>
          </h2>
          <p className="mt-6 text-white/65 text-lg leading-relaxed">
            I’m a Full Stack MERN Developer focused on building modern, premium, and
            production-ready web applications. I care about UI/UX, security, and performance
            — because clients don’t just need code, they need results.
          </p>

          <div className="mt-10 grid sm:grid-cols-2 gap-4">
            <div className="glass neon-border rounded-2xl p-6">
              <div className="text-white/60 text-xs">CORE STACK</div>
              <div className="mt-2 font-semibold">React • Node • MongoDB</div>
              <div className="mt-1 text-white/60 text-sm">Clean architecture & scalable builds.</div>
            </div>
            <div className="glass neon-border rounded-2xl p-6">
              <div className="text-white/60 text-xs">SPECIALTY</div>
              <div className="mt-2 font-semibold">Premium UI/UX</div>
              <div className="mt-1 text-white/60 text-sm">Animations + micro-interactions.</div>
            </div>
            <div className="glass neon-border rounded-2xl p-6">
              <div className="text-white/60 text-xs">SECURITY</div>
              <div className="mt-2 font-semibold">JWT • Validation</div>
              <div className="mt-1 text-white/60 text-sm">Secure routes & clean API patterns.</div>
            </div>
            <div className="glass neon-border rounded-2xl p-6">
              <div className="text-white/60 text-xs">PERFORMANCE</div>
              <div className="mt-2 font-semibold">Fast & Smooth</div>
              <div className="mt-1 text-white/60 text-sm">Optimized UX and loading behavior.</div>
            </div>
          </div>

          <div className="mt-10 flex gap-4">
            <a href="/portfolio" className="neon-button px-7 py-4 text-base">
              See My Work
            </a>
            <a href="/contact" className="glass neon-border px-7 py-4 text-base rounded-xl hover:scale-[1.03] transition">
              Hire Me
            </a>
          </div>
        </div>

        <div className="glass neon-border rounded-2xl p-8">
          <div className="text-white/60 text-xs">WHY CLIENTS CHOOSE ME</div>
          <div className="mt-3 text-2xl font-semibold">Delivery + Quality + Clarity</div>

          <ul className="mt-6 space-y-4 text-white/70">
            <li className="flex gap-3">
              <span className="text-primary">✔</span>
              <span>Clear communication and structured project flow</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary">✔</span>
              <span>Premium UI that builds trust instantly</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary">✔</span>
              <span>Secure backend with clean API design</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary">✔</span>
              <span>Fast performance and smooth interactions</span>
            </li>
          </ul>

          <div className="mt-8 glass border border-white/10 rounded-2xl p-6">
            <div className="text-white/60 text-xs">NEXT STEP</div>
            <div className="mt-2 font-semibold">Send your requirements</div>
            <div className="mt-1 text-white/60 text-sm">
              I’ll reply with a plan, timeline, and quote.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
