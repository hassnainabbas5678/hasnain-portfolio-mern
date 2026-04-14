import { useEffect, useState } from "react";
import api from "../../utils/api";
import AdminSidebar from "../../components/admin/AdminSidebar";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ visits: 0, contacts: 0, reviews: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/analytics")
      .then((r) => setStats(r.data || { visits: 0, contacts: 0, reviews: 0 }))
      .finally(() => setLoading(false));
  }, []);

  const cards = [
    { label: "Page Views", value: stats.visits },
    { label: "Contacts", value: stats.contacts },
    { label: "Reviews", value: stats.reviews }
  ];

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="w-full px-8 py-10 max-w-6xl">
        <h1 className="text-3xl font-extrabold">
          Admin <span className="neon-text">Dashboard</span>
        </h1>
        <p className="mt-3 text-white/60">
          Manage projects, reviews, and client messages.
        </p>

        <div className="mt-10 grid md:grid-cols-3 gap-6">
          {(loading ? Array.from({ length: 3 }) : cards).map((c, i) => (
            <div
              key={i}
              className={`rounded-2xl p-7 ${
                loading ? "glass border border-white/10 animate-pulse" : "glass neon-border"
              }`}
            >
              {loading ? (
                <>
                  <div className="h-3 w-1/2 bg-white/10 rounded" />
                  <div className="mt-5 h-9 w-20 bg-white/10 rounded" />
                </>
              ) : (
                <>
                  <div className="text-white/60 text-xs">{c.label}</div>
                  <div className="mt-4 text-4xl font-extrabold neon-text">
                    {c.value ?? 0}
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 glass neon-border rounded-2xl p-7">
          <div className="text-white/60 text-xs">NEXT ACTION</div>
          <div className="mt-2 font-semibold">Add 6–10 projects</div>
          <div className="mt-1 text-white/60 text-sm">
            Your portfolio looks premium only when it’s filled with real work.
          </div>
        </div>
      </div>
    </div>
  );
}
