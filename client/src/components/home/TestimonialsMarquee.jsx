import { useEffect, useState } from "react";
import api from "../../utils/api";

function Stars({ n }) {
  const v = Math.max(1, Math.min(5, Number(n) || 0));
  return (
    <div className="text-primary text-sm">
      {"★".repeat(v)} <span className="text-white/35">{"★".repeat(5 - v)}</span>
    </div>
  );
}

export default function TestimonialsMarquee() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    api.get("/reviews").then((r) => setReviews(r.data.reviews || []));
  }, []);

  const data = reviews.length
    ? reviews.slice(0, 12)
    : [
        { _id: "d1", name: "Client A", rating: 5, message: "Premium design + fast delivery. Looks expensive." },
        { _id: "d2", name: "Client B", rating: 5, message: "Super smooth website. Communication was great." },
        { _id: "d3", name: "Client C", rating: 5, message: "Clean admin panel and a professional layout." },
        { _id: "d4", name: "Client D", rating: 5, message: "Great performance, fast load, and polished UI." }
      ];

  const list = [...data, ...data]; // seamless loop

  return (
    <section className="py-20">
      <div className="px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div className="max-w-3xl">
              <div className="inline-flex glass neon-border rounded-full px-4 py-2 text-xs text-white/70">
                Social Proof
              </div>
              <h2 className="mt-5 text-3xl md:text-4xl font-extrabold">
                Client <span className="neon-text">Testimonials</span>
              </h2>
              <p className="mt-4 text-white/65 text-lg">
                A portfolio is trusted faster when real clients speak.
              </p>
            </div>

            <div className="flex gap-3">
              <a
                href="/reviews"
                className="glass neon-border px-6 py-3 rounded-xl hover:scale-[1.03] transition"
              >
                View All ↗
              </a>
              <a href="/leave-review" className="neon-button px-6 py-3 rounded-xl">
                Leave a Review
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* FULL-WIDTH MARQUEE (no box) */}
      <div className="mt-10 marquee-full">
        <div className="marquee-track marquee-pause flex gap-6 py-2">
          {list.map((t, i) => (
            <div
              key={`${t._id}-${i}`}
              className="marquee-card glass border border-white/10 rounded-2xl p-6 hover:scale-[1.02] transition"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs text-white/55">REVIEW</div>
                  <div className="mt-2 font-semibold">{t.name}</div>
                </div>
                <Stars n={t.rating} />
              </div>

              <p className="mt-4 text-white/70 text-sm leading-relaxed line-clamp-4">
                {t.message}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
