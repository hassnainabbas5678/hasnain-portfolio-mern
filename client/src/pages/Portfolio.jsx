import { useEffect, useState } from "react";
import api from "../utils/api";

function TechChips({ tech }) {
  const list = (tech || "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
    .slice(0, 6);

  if (!list.length) return null;

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {list.map((t) => (
        <span
          key={t}
          className="px-3 py-1 rounded-full glass border border-white/10 text-xs text-white/75 hover:scale-[1.03] transition"
        >
          {t}
        </span>
      ))}
    </div>
  );
}

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/projects")
      .then((r) => setProjects(r.data.projects || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="px-6 md:px-10 py-20 max-w-7xl mx-auto">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold">
          My <span className="neon-text">Projects</span>
        </h1>
        <p className="mt-4 text-white/65 max-w-2xl mx-auto">
          Selected work showing premium UI and production-ready backend delivery.
        </p>
      </div>

      <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading &&
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="glass neon-border rounded-2xl p-6 animate-pulse">
              <div className="h-44 bg-white/10 rounded-xl" />
              <div className="mt-6 h-4 w-2/3 bg-white/10 rounded" />
              <div className="mt-3 h-3 w-full bg-white/10 rounded" />
            </div>
          ))}

        {!loading &&
          projects.map((p) => (
            <div key={p._id} className="glass neon-border rounded-2xl overflow-hidden hover:scale-[1.01] transition">
              <div className="relative group">
                <div className="h-48 bg-black/30">
                  {p.imageUrl ? (
                    <img
                      src={p.imageUrl}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-[1.06] transition duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="h-48 flex items-center justify-center text-white/40 text-sm">
                      No preview image
                    </div>
                  )}
                </div>

                {p.liveUrl && (
                  <a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(5,7,15,0.10), rgba(5,7,15,0.92))"
                    }}
                  >
                    <div className="neon-button px-6 py-3 text-sm">View Live ↗</div>
                  </a>
                )}
              </div>

              <div className="p-6">
                <div className="text-xs text-white/55">PROJECT</div>
                <div className="mt-2 font-semibold text-lg">{p.title}</div>
                <div className="mt-2 text-white/65 text-sm line-clamp-3">
                  {p.description}
                </div>

                {/* ✅ Tech chips */}
                <TechChips tech={p.tech} />
              </div>
            </div>
          ))}

        {!loading && projects.length === 0 && (
          <div className="glass neon-border rounded-2xl p-8 text-white/70 md:col-span-2 lg:col-span-3">
            No projects yet. Add them from Admin Panel.
          </div>
        )}
      </div>
    </section>
  );
}
