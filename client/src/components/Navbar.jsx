import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/packages", label: "Packages" },
  { to: "/reviews", label: "Reviews" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" }
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50">
      <div className="glass border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <NavLink to="/" className="group flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl neon-border glass flex items-center justify-center">
              <span className="text-primary font-bold">H</span>
            </div>
            <div className="leading-tight">
              <div className="text-white font-semibold tracking-wide">
                Hasnain Abbas
              </div>
              <div className="text-white/55 text-xs">MERN • UI/UX • Performance</div>
            </div>
          </NavLink>

          <nav className="hidden lg:flex items-center gap-7 text-sm">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `relative transition ${
                    isActive ? "text-primary" : "text-white/70 hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{l.label}</span>
                    <span
                      className={`absolute left-1/2 -bottom-2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-primary transition-all duration-300 ${
                        isActive ? "w-full" : "group-hover:w-full"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="/contact"
              className="hidden sm:inline-flex neon-button px-5 py-3 text-sm"
            >
              Get a Quote
            </a>
            <a
              href="/portfolio"
              className="inline-flex glass neon-border px-5 py-3 text-sm rounded-xl hover:scale-[1.03] transition"
            >
              View Work
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
