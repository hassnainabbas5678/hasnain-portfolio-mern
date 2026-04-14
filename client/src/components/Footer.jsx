export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-10 grid md:grid-cols-3 gap-8">
        <div>
          <div className="text-lg font-semibold">Hasnain Abbas</div>
          <p className="mt-3 text-white/60 text-sm leading-relaxed">
            Full-stack MERN developer building premium, high-performance web apps
            with modern UI/UX, clean architecture, and conversion-focused design.
          </p>
          <div className="mt-5 flex gap-3">
            <a className="glass neon-border px-4 py-2 rounded-xl text-sm hover:scale-[1.03] transition" href="#">
              LinkedIn
            </a>
            <a className="glass neon-border px-4 py-2 rounded-xl text-sm hover:scale-[1.03] transition" href="#">
              GitHub
            </a>
            <a className="glass neon-border px-4 py-2 rounded-xl text-sm hover:scale-[1.03] transition" href="#">
              Instagram
            </a>
          </div>
        </div>

        <div>
          <div className="text-white/80 font-semibold">Navigation</div>
          <ul className="mt-3 space-y-2 text-sm text-white/60">
            <li><a className="hover:text-primary transition" href="/about">About</a></li>
            <li><a className="hover:text-primary transition" href="/services">Services</a></li>
            <li><a className="hover:text-primary transition" href="/portfolio">Portfolio</a></li>
            <li><a className="hover:text-primary transition" href="/packages">Packages</a></li>
            <li><a className="hover:text-primary transition" href="/contact">Contact</a></li>
          </ul>
        </div>

        <div>
          <div className="text-white/80 font-semibold">Contact</div>
          <div className="mt-3 text-sm text-white/60 space-y-2">
            <p>Email: your@email.com</p>
            <p>WhatsApp: +92 3xx xxxxxxx</p>
            <p className="text-white/45">
              Available for freelance, long-term, and agency collaborations.
            </p>
          </div>
        </div>
      </div>

      <div className="py-5 text-center text-xs text-white/45 border-t border-white/10">
        © {new Date().getFullYear()} Hasnain Abbas — Built with React + Tailwind
      </div>
    </footer>
  );
}
