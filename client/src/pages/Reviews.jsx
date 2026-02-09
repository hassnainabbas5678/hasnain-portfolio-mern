import { useEffect, useState } from "react";
import api from "../utils/api";

function Stars({ value }) {
  const full = Math.max(1, Math.min(5, Number(value) || 0));
  return (
    <div className="text-primary text-sm tracking-wider">
      {"★".repeat(full)} <span className="text-white/40">{"★".repeat(5 - full)}</span>
    </div>
  );
}

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/reviews")
      .then((r) => setReviews(r.data.reviews || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="px-6 md:px-10 py-20 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div className="max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-extrabold">
            Client <span className="neon-text">Reviews</span>
          </h2>
          <p className="mt-5 text-white/65 text-lg">
            Social proof matters. Here’s what clients say about delivery, quality, and communication.
          </p>
        </div>

        <a href="/leave-review" className="neon-button px-6 py-4 text-base inline-flex justify-center">
          Leave a Review
        </a>
      </div>

      <div className="mt-12 grid md:grid-cols-2 gap-6">
        {loading &&
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="glass rounded-2xl p-7 border border-white/10 animate-pulse">
              <div className="h-4 w-1/3 bg-white/10 rounded" />
              <div className="mt-4 h-3 w-full bg-white/10 rounded" />
              <div className="mt-2 h-3 w-5/6 bg-white/10 rounded" />
            </div>
          ))}

        {!loading && reviews.map((r) => (
          <div key={r._id} className="glass neon-border rounded-2xl p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="font-semibold">{r.name}</div>
                <div className="text-white/45 text-xs">
                  {new Date(r.createdAt).toLocaleDateString()}
                </div>
              </div>
              <Stars value={r.rating} />
            </div>
            <p className="mt-4 text-white/70 leading-relaxed">{r.message}</p>
          </div>
        ))}
      </div>

      {!loading && reviews.length === 0 && (
        <div className="mt-10 glass neon-border rounded-2xl p-8 text-white/70">
          No reviews yet. Be the first to leave one.
        </div>
      )}
    </section>
  );
}
