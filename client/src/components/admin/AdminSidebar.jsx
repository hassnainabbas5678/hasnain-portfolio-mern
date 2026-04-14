import { NavLink } from "react-router-dom";
import { logout } from "../../hooks/useAuth";

const items = [
  { to: "/admin/dashboard", label: "Dashboard" },
  { to: "/admin/projects", label: "Projects" },
  { to: "/admin/reviews", label: "Reviews" },
  { to: "/admin/contacts", label: "Contacts" }
];

export default function AdminSidebar() {
  return (
    <aside className="w-[280px] min-h-screen sticky top-0 glass border-r border-white/10 p-6">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl neon-border glass flex items-center justify-center">
          <span className="text-primary font-bold">A</span>
        </div>
        <div>
          <div className="font-semibold">Admin Panel</div>
          <div className="text-xs text-white/55">Manage Portfolio Content</div>
        </div>
      </div>

      <div className="mt-8 space-y-2">
        {items.map((x) => (
          <NavLink
            key={x.to}
            to={x.to}
            className={({ isActive }) =>
              `block px-4 py-3 rounded-xl transition border ${
                isActive
                  ? "border-primary/50 bg-white/5 text-primary"
                  : "border-white/10 text-white/75 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            {x.label}
          </NavLink>
        ))}
      </div>

      <button
        onClick={logout}
        className="mt-10 w-full glass neon-border rounded-xl px-4 py-3 text-sm text-red-300 hover:scale-[1.01] transition"
      >
        Logout
      </button>

      <div className="mt-10 text-xs text-white/45">
        Tip: Keep admin route hidden. Share portfolio link only.
      </div>
    </aside>
  );
}
