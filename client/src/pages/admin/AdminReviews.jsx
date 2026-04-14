import { useEffect, useState } from "react";
import api from "../../utils/api";
import AdminSidebar from "../../components/admin/AdminSidebar";

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/reviews")
      .then((r) => setReviews(r.data.reviews || []))
      .finally(() => setLoading(false));
  }, []);

  async function remove(id) {
    if (!confirm("Delete this review?")) return;
    await api.delete(`/reviews/${id}`);
    setReviews((prev) => prev.filter((x) => x._id !== id));
  }

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="w-full px-8 py-10 max-w-6xl">
        <h1 className="text-3xl font-extrabold">
          Manage <span className="neon-text">Reviews</span>
        </h1>

        <div className="mt-10 space-y-4">
          {loading &&
            Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="glass border border-white/10 rounded-2xl p-6 animate-pulse">
                <div className="h-3 w-1/3 bg-white/10 rounded" />
                <div className="mt-4 h-3 w-full bg-white/10 rounded" />
              </div>
            ))}

          {!loading &&
            reviews.map((r) => (
              <div key={r._id} className="glass neon-border rounded-2xl p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-semibold">{r.name}</div>
                    <div className="text-xs text-white/55">{r.rating} ★</div>
                  </div>
                  <button
                    onClick={() => remove(r._id)}
                    className="glass border border-white/10 rounded-xl px-4 py-2 text-sm text-red-300 hover:scale-[1.02] transition"
                  >
                    Delete
                  </button>
                </div>
                <p className="mt-4 text-white/70">{r.message}</p>
              </div>
            ))}

          {!loading && reviews.length === 0 && (
            <div className="glass neon-border rounded-2xl p-7 text-white/70">
              No reviews yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
