import { useState } from "react";
import api from "../utils/api";

export default function LeaveReview() {
  const [form, setForm] = useState({ name: "", rating: 5, message: "" });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, type: "success", text: "" });

  function showToast(type, text) {
    setToast({ show: true, type, text });
    setTimeout(() => setToast({ show: false, type: "success", text: "" }), 2200);
  }

  function onChange(e) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: name === "rating" ? Number(value) : value }));
  }

  async function submit(e) {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    try {
      await api.post("/reviews", form);
      setForm({ name: "", rating: 5, message: "" });
      showToast("success", "Thanks! Your review has been submitted.");
    } catch {
      showToast("error", "Couldn’t submit. Please try again.");
    } finally {
      setTimeout(() => setLoading(false), 450);
    }
  }

  return (
    <section className="px-6 md:px-10 py-20 max-w-5xl mx-auto relative">
      {toast.show && (
        <div className="fixed top-6 right-6 z-[999]">
          <div className={`glass neon-border rounded-2xl px-5 py-4 min-w-[320px] ${toast.type === "success" ? "" : "border-red-400/40"}`}>
            <div className="text-xs text-white/60">STATUS</div>
            <div className="mt-1 font-semibold">{toast.type === "success" ? "Submitted" : "Error"}</div>
            <div className="mt-1 text-white/70 text-sm">{toast.text}</div>
          </div>
        </div>
      )}

      <div className="max-w-3xl">
        <h2 className="text-4xl md:text-5xl font-extrabold">
          Leave a <span className="neon-text">Review</span>
        </h2>
        <p className="mt-5 text-white/65 text-lg">
          If you worked with me, your feedback helps future clients trust the decision.
        </p>
      </div>

      <form onSubmit={submit} className="mt-10 glass neon-border rounded-2xl p-8">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-white/55">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={onChange}
              required
              className="mt-2 w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none focus:border-primary/60"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="text-xs text-white/55">Rating</label>
            <select
              name="rating"
              value={form.rating}
              onChange={onChange}
              className="mt-2 w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none focus:border-primary/60"
            >
              {[5, 4, 3, 2, 1].map((n) => (
                <option key={n} value={n}>{n} Stars</option>
              ))}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="text-xs text-white/55">Review</label>
            <textarea
              name="message"
              value={form.message}
              onChange={onChange}
              required
              rows={6}
              className="mt-2 w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 outline-none focus:border-primary/60"
              placeholder="Share your experience..."
            />
          </div>
        </div>

        <button
          disabled={loading}
          className="mt-6 w-full neon-button px-6 py-4 text-base disabled:opacity-60 flex items-center justify-center gap-3"
        >
          {loading && (
            <span className="inline-block h-5 w-5 rounded-full border-2 border-black/40 border-t-black animate-spin" />
          )}
          {loading ? "Submitting" : "Submit Review"}
        </button>
      </form>
    </section>
  );
}
