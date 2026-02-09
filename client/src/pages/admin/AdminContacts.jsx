import { useEffect, useState } from "react";
import api from "../../utils/api";
import AdminSidebar from "../../components/admin/AdminSidebar";

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/contact")
      .then((r) => setContacts(r.data.contacts || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="w-full px-8 py-10 max-w-6xl">
        <h1 className="text-3xl font-extrabold">
          Client <span className="neon-text">Messages</span>
        </h1>
        <p className="mt-3 text-white/60">
          All contact form submissions from the website.
        </p>

        <div className="mt-10 space-y-4">
          {loading &&
            Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="glass border border-white/10 rounded-2xl p-6 animate-pulse">
                <div className="h-3 w-1/3 bg-white/10 rounded" />
                <div className="mt-4 h-3 w-full bg-white/10 rounded" />
                <div className="mt-2 h-3 w-5/6 bg-white/10 rounded" />
              </div>
            ))}

          {!loading &&
            contacts.map((c) => (
              <div key={c._id} className="glass neon-border rounded-2xl p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div>
                    <div className="font-semibold">{c.name}</div>
                    <div className="text-xs text-white/55">
                      {c.email} {c.phone ? `• ${c.phone}` : ""}
                    </div>
                  </div>
                  <div className="text-xs text-white/45">
                    {new Date(c.createdAt).toLocaleString()}
                  </div>
                </div>
                <p className="mt-4 text-white/70 leading-relaxed">{c.message}</p>
              </div>
            ))}

          {!loading && contacts.length === 0 && (
            <div className="glass neon-border rounded-2xl p-7 text-white/70">
              No messages yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
